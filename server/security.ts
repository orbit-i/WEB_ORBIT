import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// -----------------------------------------------------------------------------
// 1. HTTP SECURITY HEADERS & DEFENSIVE POSTURE
// -----------------------------------------------------------------------------

export function securityHeadersMiddleware(_req: Request, res: Response, next: NextFunction) {
  // Prevent MIME-type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Prevent Clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // Cross-site scripting filter
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Control referrer information sent in HTTP requests
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Restrict browser permissions/features
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

  // Enforce HTTPS when in production or on secure hosts
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Content-Security-Policy (Allow necessary Google Fonts, Vite scripts, and safe self-assets)
  const isDev = process.env.NODE_ENV !== 'production';
  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''} https://fonts.googleapis.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' ws: wss: https:",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
  ]
    .filter(Boolean)
    .join('; ');

  res.setHeader('Content-Security-Policy', cspDirectives);

  next();
}

// -----------------------------------------------------------------------------
// 2. IN-MEMORY RATE LIMITING (SLIDING WINDOW)
// -----------------------------------------------------------------------------

interface RateLimitRecord {
  timestamps: number[];
}

export function createRateLimiter(options: {
  windowMs: number;
  maxRequests: number;
  message: string;
}) {
  const ipStore = new Map<string, RateLimitRecord>();

  // Cleanup old records periodically to prevent memory leaks
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipStore.entries()) {
      const active = record.timestamps.filter((t) => now - t < options.windowMs);
      if (active.length === 0) {
        ipStore.delete(ip);
      } else {
        record.timestamps = active;
      }
    }
  }, Math.max(60000, options.windowMs));

  return (req: Request, res: Response, next: NextFunction): void => {
    // Determine client IP safely
    const forwarded = req.headers['x-forwarded-for'];
    const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : req.socket.remoteAddress) || 'unknown';

    const now = Date.now();
    const record = ipStore.get(ip) || { timestamps: [] };

    // Filter out timestamps outside the active window
    const recent = record.timestamps.filter((t) => now - t < options.windowMs);

    if (recent.length >= options.maxRequests) {
      const oldest = recent[0];
      const retryAfterSec = Math.ceil((oldest + options.windowMs - now) / 1000);
      res.setHeader('Retry-After', String(Math.max(1, retryAfterSec)));
      res.status(429).json({
        error: options.message,
        retryAfterSeconds: Math.max(1, retryAfterSec),
      });
      return;
    }

    recent.push(now);
    ipStore.set(ip, { timestamps: recent });
    next();
  };
}

// Strict Rate Limiter for Login (Max 5 attempts per 60 seconds)
export const authRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 5,
  message: 'Too many authentication attempts. Please wait 60 seconds before trying again.',
});

// Strict Rate Limiter for Contact Submissions (Max 5 inquiries per 10 minutes)
export const contactRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  maxRequests: 5,
  message: 'Inquiry submission limit reached. Please wait a few minutes or contact us directly via email.',
});

// General Public API Rate Limiter (Max 120 requests per minute)
export const apiRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 120,
  message: 'Rate limit exceeded. Please throttle your requests.',
});

// -----------------------------------------------------------------------------
// 3. CRYPTOGRAPHIC SESSION MANAGEMENT
// -----------------------------------------------------------------------------

export interface UserSession {
  token: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
  portalType: 'admin' | 'client';
  createdAt: number;
  expiresAt: number;
  lastActive: number;
}

// In-memory session registry
const activeSessions = new Map<string, UserSession>();

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Cleanup expired sessions every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of activeSessions.entries()) {
    if (session.expiresAt <= now) {
      activeSessions.delete(token);
    }
  }
}, 15 * 60 * 1000);

export function createSession(user: {
  name: string;
  email: string;
  role: 'admin' | 'client';
  portalType: 'admin' | 'client';
}): UserSession {
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  const session: UserSession = {
    token,
    name: user.name,
    email: user.email,
    role: user.role,
    portalType: user.portalType,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
    lastActive: now,
  };

  activeSessions.set(token, session);
  return session;
}

export function getSession(token: string): UserSession | null {
  if (!token) return null;
  const session = activeSessions.get(token);
  if (!session) return null;

  if (session.expiresAt <= Date.now()) {
    activeSessions.delete(token);
    return null;
  }

  session.lastActive = Date.now();
  return session;
}

export function revokeSession(token: string): boolean {
  return activeSessions.delete(token);
}

// -----------------------------------------------------------------------------
// 4. TIMING-SAFE CREDENTIAL COMPARISON
// -----------------------------------------------------------------------------

export function timingSafeCompare(candidate: string, secret: string): boolean {
  if (!candidate || !secret) return false;
  const hashA = crypto.createHash('sha256').update(candidate).digest();
  const hashB = crypto.createHash('sha256').update(secret).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

// -----------------------------------------------------------------------------
// 5. AUTHENTICATION & AUTHORIZATION MIDDLEWARE
// -----------------------------------------------------------------------------

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: UserSession;
    }
  }
}

export function extractAuthToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  // Also check query parameter (useful for secure direct file download links like export-sql)
  if (req.query && typeof req.query.token === 'string') {
    return req.query.token.trim();
  }

  return null;
}

export function requireAuth(allowedRoles?: ('admin' | 'client')[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = extractAuthToken(req);

    if (!token) {
      res.status(401).json({
        error: 'Unauthorized: Authentication token is required to access this resource.',
        code: 'AUTH_REQUIRED',
      });
      return;
    }

    const session = getSession(token);
    if (!session) {
      res.status(401).json({
        error: 'Unauthorized: Session is invalid or has expired. Please log in again.',
        code: 'SESSION_EXPIRED',
      });
      return;
    }

    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(session.role)) {
      res.status(403).json({
        error: 'Forbidden: You do not possess the required privileges to perform this action.',
        code: 'INSUFFICIENT_PERMISSIONS',
      });
      return;
    }

    req.user = session;
    next();
  };
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const token = extractAuthToken(req);
  if (token) {
    const session = getSession(token);
    if (session) {
      req.user = session;
    }
  }
  next();
}

// -----------------------------------------------------------------------------
// 6. INPUT SANITIZATION & DEFENSIVE HELPERS
// -----------------------------------------------------------------------------

export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/\0/g, '') // Strip null bytes
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Strip script tags
    .replace(/javascript:/gi, '') // Strip javascript pseudo-protocol
    .replace(/on\w+\s*=/gi, '') // Strip inline event handlers like onerror, onclick
    .trim();
}

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  // Strict RFC compliant email check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email) && email.length <= 120;
}
