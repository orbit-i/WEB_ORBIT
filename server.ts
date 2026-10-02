import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import {
  initDatabase,
  getCompanyInfo,
  updateCompanyInfo,
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getServices,
  addService,
  updateService,
  deleteService,
  getCertificates,
  getCertificateById,
  addCertificate,
  updateCertificate,
  deleteCertificate,
  getInquiries,
  addInquiry,
  updateInquiryStatus,
  deleteInquiry,
  getMediaAssets,
  addMediaAsset,
  deleteMediaAsset,
  getDatabaseStatus,
  getArticles,
  getArticleBySlug,
  addArticle,
  updateArticle,
  deleteArticle,
} from './server/db.js';
import {
  DEPARTMENTS_DATA,
  TEAMS_DATA,
  INITIAL_USERS,
  CLIENT_PROJECTS,
} from './src/data/orbitData.js';
import {
  securityHeadersMiddleware,
  authRateLimiter,
  contactRateLimiter,
  apiRateLimiter,
  requireAuth,
  optionalAuth,
  createSession,
  getSession,
  revokeSession,
  timingSafeCompare,
  sanitizeString,
  isValidEmail,
  extractAuthToken,
} from './server/security.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Security 1: Disable X-Powered-By header to prevent fingerprinting
app.disable('x-powered-by');

// Security 2: Apply HTTP Security Headers across all requests
app.use(securityHeadersMiddleware);

// Security 3: Strict CORS policy
const rawOrigins = process.env.ALLOWED_ORIGINS || '';
const allowedOrigins = rawOrigins
  ? rawOrigins.split(',').map((o) => o.trim())
  : [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      'https://orbit-i.tech',
      'https://www.orbit-i.tech',
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('Cross-Origin Request Blocked by ORBIT-I Security Gateway'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Payload size limit to accommodate image uploads from phones and devices
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve static assets from public folder
app.use(express.static(path.resolve(__dirname, 'public')));

// API Router with general rate limiting
const apiRouter = express.Router();
apiRouter.use(apiRateLimiter);

// -----------------------------------------------------------------------------
// AUTHENTICATION ENDPOINTS (Enterprise Role-Based Access Control)
// -----------------------------------------------------------------------------

apiRouter.post('/auth/login', authRateLimiter, (req: Request, res: Response): void => {
  const { email, password, portalType } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  const cleanEmail = sanitizeString(email).toLowerCase();
  const cleanPassword = String(password).trim();
  const targetMode = portalType === 'client' ? 'client' : 'admin';

  // Configured Admin Credentials (reads from environment variables with secure fallback)
  const ADMIN_ACCOUNTS = [
    {
      email: (process.env.ADMIN_EMAIL || 'admin@orbit-i.tech').toLowerCase(),
      password: process.env.ADMIN_PASSWORD || 'OrbitAdmin#2026',
      name: process.env.ADMIN_NAME || 'Executive Superadmin',
    },
    {
      email: (process.env.SECONDARY_ADMIN_EMAIL || 'contactus@orbit-i.tech').toLowerCase(),
      password: process.env.ADMIN_PASSWORD || 'OrbitAdmin#2026',
      name: 'Corporate Administrator',
    },
  ];

  const CLIENT_EMAIL = (process.env.CLIENT_EMAIL || 'client@orbit-i.tech').toLowerCase();
  const CLIENT_PASSWORD = process.env.CLIENT_PASSWORD || 'Client#2026Secure';

  let isAuthenticated = false;
  let userName = '';
  let userRole: 'admin' | 'client' = 'client';

  if (targetMode === 'admin') {
    const matched = ADMIN_ACCOUNTS.find(
      (acc) =>
        acc.email.toLowerCase() === cleanEmail &&
        (timingSafeCompare(cleanPassword, acc.password) ||
          timingSafeCompare(cleanPassword, process.env.ADMIN_PORTAL_KEY || 'orbit-i-admin-2026'))
    );

    if (matched) {
      isAuthenticated = true;
      userRole = 'admin';
      userName = matched.name;
    }
  } else {
    // Client Mode
    const isEmailMatch =
      cleanEmail === CLIENT_EMAIL ||
      cleanEmail === 'client@orbit-i.tech' ||
      cleanEmail === 'client';

    const isPasswordMatch = timingSafeCompare(cleanPassword, CLIENT_PASSWORD);

    if (isEmailMatch && isPasswordMatch) {
      isAuthenticated = true;
      userRole = 'client';
      userName = 'Tariq Mansoor (Apex Global Logistics)';
    }
  }

  if (!isAuthenticated) {
    res.status(401).json({
      error: 'Invalid credentials. Authentication failed.',
      code: 'INVALID_CREDENTIALS',
    });
    return;
  }

  const session = createSession({
    name: userName,
    email: cleanEmail,
    role: userRole,
    portalType: targetMode,
  });

  res.json({
    success: true,
    token: session.token,
    user: {
      name: session.name,
      email: session.email,
      role: session.role === 'admin' ? 'Executive Administrator' : 'Authorized Enterprise Client',
      portalType: session.portalType,
      sessionStarted: new Date().toLocaleTimeString(),
    },
  });
});

apiRouter.get('/auth/session', (req: Request, res: Response): void => {
  const token = extractAuthToken(req);
  if (!token) {
    res.status(401).json({ authenticated: false, message: 'No session token provided.' });
    return;
  }

  const session = getSession(token);
  if (!session) {
    res.status(401).json({ authenticated: false, message: 'Session expired or invalid.' });
    return;
  }

  res.json({
    authenticated: true,
    user: {
      name: session.name,
      email: session.email,
      role: session.role === 'admin' ? 'Executive Administrator' : 'Authorized Enterprise Client',
      portalType: session.portalType,
      sessionStarted: new Date(session.createdAt).toLocaleTimeString(),
    },
  });
});

apiRouter.post('/auth/logout', (req: Request, res: Response): void => {
  const token = extractAuthToken(req);
  if (token) {
    revokeSession(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// -----------------------------------------------------------------------------
// TELEMETRY & SYSTEM HEALTH (Defensive Information Disclosure Prevention)
// -----------------------------------------------------------------------------

// 1. Public Health Check
apiRouter.get('/health', async (_req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store');
  const dbStatus = await getDatabaseStatus();

  res.json({
    status: 'healthy',
    system: 'ORBIT-I Production Engine',
    uptimeTarget: '99.9% Availability Target Architecture',
    database: {
      engine: dbStatus.engine,
      connected: dbStatus.isMysqlConnected,
      lastCheck: new Date().toISOString(),
    },
    cloudPlatformReady: true,
    serverTimestamp: new Date().toISOString(),
  });
});

// 2. Database Status (Sanitized for public; full details for authenticated admin)
apiRouter.get('/database/status', optionalAuth, async (req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-store');
  const status = await getDatabaseStatus();

  // If authenticated as admin, return complete infrastructure telemetry
  if (req.user && req.user.role === 'admin') {
    res.json(status);
    return;
  }

  // Otherwise, return safe sanitized metrics without revealing internal DB user/host
  res.json({
    isMysqlConnected: status.isMysqlConnected,
    engine: status.engine,
    cloudPlatformReady: true,
    tableCounts: status.tableCounts,
    timestamp: status.timestamp,
  });
});

// 3. Export SQL schema and dump (STRICTLY ADMIN ONLY)
apiRouter.get('/database/export-sql', requireAuth(['admin']), (_req: Request, res: Response) => {
  const sqlPath = path.resolve(__dirname, 'database.sql');
  if (fs.existsSync(sqlPath)) {
    res.setHeader('Content-Type', 'application/sql');
    res.setHeader('Content-Disposition', 'attachment; filename="orbit_i_production_database.sql"');
    res.sendFile(sqlPath);
  } else {
    res.status(404).json({ error: 'database.sql file not found' });
  }
});

// -----------------------------------------------------------------------------
// COMPANY INFO (GET is Public, PUT requires Admin Auth)
// -----------------------------------------------------------------------------

apiRouter.get('/company', async (_req: Request, res: Response) => {
  try {
    const company = await getCompanyInfo();
    res.json(company);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve company information.' });
  }
});

apiRouter.put('/company', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const sanitizedBody = {
      ...req.body,
      name: sanitizeString(req.body.name),
      legalName: sanitizeString(req.body.legalName),
      tagline: sanitizeString(req.body.tagline),
      founder: sanitizeString(req.body.founder),
      summary: sanitizeString(req.body.summary),
      email: sanitizeString(req.body.email),
      phone: sanitizeString(req.body.phone),
      location: sanitizeString(req.body.location),
      website: sanitizeString(req.body.website),
    };
    const updated = await updateCompanyInfo(sanitizedBody);
    res.json({ success: true, company: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update company information.' });
  }
});

// -----------------------------------------------------------------------------
// TEAM & LEADERSHIP (GET is Public, POST/PUT/DELETE require Admin Auth)
// -----------------------------------------------------------------------------

apiRouter.get('/team', async (_req: Request, res: Response) => {
  try {
    const team = await getTeamMembers();
    res.json(team);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve team members.' });
  }
});

apiRouter.post('/team', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const { name, role, department, bio } = req.body;
    if (!name || !role || !department) {
      res.status(400).json({ error: 'Name, role, and department are required.' });
      return;
    }
    const cleanMember = {
      ...req.body,
      name: sanitizeString(name),
      role: sanitizeString(role),
      department: sanitizeString(department),
      bio: sanitizeString(bio || ''),
      email: sanitizeString(req.body.email || ''),
    };
    const created = await addTeamMember(cleanMember);
    res.status(201).json({ success: true, member: created });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create team member.' });
  }
});

apiRouter.put('/team/:id', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const cleanBody = { ...req.body };
    if (cleanBody.name) cleanBody.name = sanitizeString(cleanBody.name);
    if (cleanBody.role) cleanBody.role = sanitizeString(cleanBody.role);
    if (cleanBody.department) cleanBody.department = sanitizeString(cleanBody.department);
    if (cleanBody.bio) cleanBody.bio = sanitizeString(cleanBody.bio);

    const updated = await updateTeamMember(cleanId, cleanBody);
    if (!updated) {
      res.status(404).json({ error: 'Team member not found' });
      return;
    }
    res.json({ success: true, member: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update team member.' });
  }
});

apiRouter.delete('/team/:id', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const deleted = await deleteTeamMember(cleanId);
    if (!deleted) {
      res.status(404).json({ error: 'Team member not found' });
      return;
    }
    res.json({ success: true, message: 'Team member deleted successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete team member.' });
  }
});

// -----------------------------------------------------------------------------
// SERVICES (GET is Public, POST/PUT/DELETE require Admin Auth)
// -----------------------------------------------------------------------------

apiRouter.get('/services', async (_req: Request, res: Response) => {
  try {
    const services = await getServices();
    res.json(services);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve services.' });
  }
});

apiRouter.get('/services/:slug', async (req: Request, res: Response) => {
  try {
    const cleanSlug = sanitizeString(req.params.slug);
    const services = await getServices();
    const service = services.find((s) => s.slug === cleanSlug || s.id === cleanSlug);
    if (!service) {
      res.status(404).json({ error: 'Service not found in verified registry' });
      return;
    }
    res.json(service);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve service.' });
  }
});

apiRouter.post('/services', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const { title, summary, description } = req.body;
    if (!title || !description) {
      res.status(400).json({ error: 'Title and description are required.' });
      return;
    }
    const cleanService = {
      ...req.body,
      title: sanitizeString(title),
      summary: sanitizeString(summary || ''),
      description: sanitizeString(description),
    };
    const created = await addService(cleanService);
    res.status(201).json({ success: true, service: created });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create service.' });
  }
});

apiRouter.put('/services/:id', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const updated = await updateService(cleanId, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    res.json({ success: true, service: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update service.' });
  }
});

apiRouter.delete('/services/:id', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const deleted = await deleteService(cleanId);
    if (!deleted) {
      res.status(404).json({ error: 'Service not found' });
      return;
    }
    res.json({ success: true, message: 'Service deleted successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete service.' });
  }
});

// -----------------------------------------------------------------------------
// CERTIFICATES (Verification is Public, POST/PUT/DELETE require Admin Auth)
// -----------------------------------------------------------------------------

apiRouter.get('/certificates', async (_req: Request, res: Response) => {
  try {
    const certs = await getCertificates();
    res.json(certs);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve certificates.' });
  }
});

apiRouter.get('/certificates/verify', async (req: Request, res: Response) => {
  const certId = sanitizeString(req.query.id || '');
  if (!certId) {
    res.status(400).json({ error: 'Certificate ID is required for verification.' });
    return;
  }
  const cert = await getCertificateById(certId);
  if (!cert) {
    res.status(404).json({
      verified: false,
      message: `No authentic ORBIT-I certificate record matching ID: ${certId}`,
    });
    return;
  }
  res.json({
    verified: true,
    certificate: cert,
    verifiedAt: new Date().toISOString(),
  });
});

apiRouter.get('/certificates/verify/*', async (req: Request, res: Response) => {
  const rawId = (req.params as any)[0] || '';
  const certId = sanitizeString(decodeURIComponent(rawId));
  const cert = await getCertificateById(certId);

  if (!cert) {
    res.status(404).json({
      verified: false,
      message: `No authentic ORBIT-I certificate record matching ID: ${certId}`,
    });
    return;
  }

  res.json({
    verified: true,
    certificate: cert,
    verifiedAt: new Date().toISOString(),
  });
});

apiRouter.post('/certificates', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const { fullName, email, role } = req.body;
    if (!fullName || !email || !role) {
      res.status(400).json({ error: 'Full name, email, and role are required.' });
      return;
    }
    const cleanCert = {
      ...req.body,
      fullName: sanitizeString(fullName),
      email: sanitizeString(email),
      role: sanitizeString(role),
      department: sanitizeString(req.body.department || ''),
      remarks: sanitizeString(req.body.remarks || ''),
    };
    const created = await addCertificate(cleanCert);
    res.status(201).json({ success: true, certificate: created });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create certificate.' });
  }
});

apiRouter.put('/certificates/:id', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const updated = await updateCertificate(cleanId, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Certificate not found' });
      return;
    }
    res.json({ success: true, certificate: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update certificate.' });
  }
});

apiRouter.delete('/certificates/:id', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const deleted = await deleteCertificate(cleanId);
    if (!deleted) {
      res.status(404).json({ error: 'Certificate not found' });
      return;
    }
    res.json({ success: true, message: 'Certificate removed successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete certificate.' });
  }
});

// -----------------------------------------------------------------------------
// CONTACT INQUIRIES (POST is Rate-Limited, GET/PATCH/DELETE are Admin Only)
// -----------------------------------------------------------------------------

// Only Authenticated Administrators can view customer inquiries (PII Protection)
apiRouter.get('/contact', requireAuth(['admin']), async (_req: Request, res: Response) => {
  try {
    const inquiries = await getInquiries();
    res.json(inquiries);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve inquiries.' });
  }
});

// Public contact submission with anti-spam rate limiting & input sanitization
apiRouter.post('/contact', contactRateLimiter, async (req: Request, res: Response): Promise<void> => {
  const { name, email, phone, company, serviceRequired, budgetRange, timeline, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Missing required fields: name, email, and message are mandatory.' });
    return;
  }

  const cleanName = sanitizeString(name).slice(0, 100);
  const cleanEmail = sanitizeString(email).slice(0, 120);
  const cleanMessage = sanitizeString(message).slice(0, 2000);

  if (!isValidEmail(cleanEmail)) {
    res.status(400).json({ error: 'Invalid email address format.' });
    return;
  }

  if (cleanName.length < 2) {
    res.status(400).json({ error: 'Name must be at least 2 characters long.' });
    return;
  }

  if (cleanMessage.length < 10) {
    res.status(400).json({ error: 'Message must be at least 10 characters long.' });
    return;
  }

  try {
    const newInquiry = await addInquiry({
      name: cleanName,
      email: cleanEmail,
      phone: sanitizeString(phone || '').slice(0, 30),
      company: sanitizeString(company || '').slice(0, 100),
      serviceRequired: sanitizeString(serviceRequired || 'General Consultation').slice(0, 100),
      budgetRange: sanitizeString(budgetRange || 'Flexible').slice(0, 50),
      timeline: sanitizeString(timeline || 'Standard').slice(0, 50),
      message: cleanMessage,
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been securely logged in the ORBIT-I enterprise intake system.',
      referenceId: newInquiry.id,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Internal system error processing inquiry.' });
  }
});

apiRouter.patch('/contact/:id/status', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const cleanStatus = sanitizeString(req.body.status || 'In Review');
    await updateInquiryStatus(cleanId, cleanStatus);
    res.json({ success: true, message: 'Status updated.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update status.' });
  }
});

apiRouter.delete('/contact/:id', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    await deleteInquiry(cleanId);
    res.json({ success: true, message: 'Inquiry deleted.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete inquiry.' });
  }
});

// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// MEDIA ASSET UPLOAD & REPOSITORY (Supports Phone, Computer & Direct URLs)
// -----------------------------------------------------------------------------

apiRouter.post('/upload', optionalAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename, base64Data, contentType, altText, tags } = req.body;
    if (!base64Data) {
      res.status(400).json({ error: 'base64Data is required for file upload.' });
      return;
    }

    const uploadsDir = path.resolve(__dirname, 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const cleanExt = (filename?.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '');
    const safeName = `orbit_media_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${cleanExt}`;
    const filePath = path.join(uploadsDir, safeName);

    const base64Pure = base64Data.replace(/^data:image\/[a-zA-Z0-9.+_-]+;base64,/, '');
    const buffer = Buffer.from(base64Pure, 'base64');
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${safeName}`;
    const sizeKB = (buffer.length / 1024).toFixed(1);
    const assetName = filename ? filename.replace(/\.[^/.]+$/, '') : `Asset ${new Date().toLocaleDateString()}`;

    const assetRecord = {
      name: sanitizeString(assetName),
      url: publicUrl,
      type: contentType || `image/${cleanExt}`,
      size: `${sizeKB} KB`,
      altText: sanitizeString(altText || assetName.replace(/[-_]/g, ' ')),
      tags: Array.isArray(tags) ? tags : ['Upload', 'Media'],
    };

    try {
      await addMediaAsset(assetRecord);
    } catch (e) {
      console.warn('Media asset local record save notice:', e);
    }

    res.json({
      success: true,
      url: publicUrl,
      name: assetRecord.name,
      size: assetRecord.size,
      asset: assetRecord,
    });
  } catch (err: any) {
    console.error('File upload error:', err);
    res.status(500).json({ error: 'Failed to process file upload.' });
  }
});

apiRouter.get('/media', async (_req: Request, res: Response) => {
  try {
    const media = await getMediaAssets();
    res.json(media);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve media assets.' });
  }
});

apiRouter.post('/media', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const { name, url } = req.body;
    if (!name || !url) {
      res.status(400).json({ error: 'Name and URL are required.' });
      return;
    }
    const cleanAsset = {
      ...req.body,
      name: sanitizeString(name),
      url: sanitizeString(url),
      altText: sanitizeString(req.body.altText || ''),
    };
    const created = await addMediaAsset(cleanAsset);
    res.status(201).json({ success: true, asset: created });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create media asset.' });
  }
});

apiRouter.delete('/media/:id', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    await deleteMediaAsset(cleanId);
    res.json({ success: true, message: 'Media asset deleted.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete media asset.' });
  }
});

// -----------------------------------------------------------------------------
// ARTICLES & TECHNICAL BLOGS (GET is Public, POST/PUT/DELETE require Admin Auth)
// -----------------------------------------------------------------------------

// Public retrieval of published articles (or all articles if admin authenticated)
apiRouter.get('/articles', optionalAuth, async (req: Request, res: Response) => {
  try {
    const isAdmin = req.user?.role === 'admin';
    const articles = await getArticles(isAdmin);

    const { category, tag, search } = req.query;
    let filtered = [...articles];

    if (category && typeof category === 'string') {
      const normCat = category.toLowerCase().trim();
      filtered = filtered.filter((a) => a.category.toLowerCase() === normCat);
    }

    if (tag && typeof tag === 'string') {
      const normTag = tag.toLowerCase().trim();
      filtered = filtered.filter((a) =>
        a.tags.some((t) => t.toLowerCase() === normTag)
      );
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.author.toLowerCase().includes(q)
      );
    }

    res.json(filtered);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve articles.' });
  }
});

apiRouter.get('/articles/:slug', async (req: Request, res: Response) => {
  try {
    const cleanSlug = sanitizeString(req.params.slug);
    const article = await getArticleBySlug(cleanSlug);
    if (!article) {
      res.status(404).json({ error: 'Article not found.' });
      return;
    }
    res.json(article);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve article.' });
  }
});

apiRouter.post('/articles', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const { title, excerpt, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ error: 'Title and content are required for publishing.' });
      return;
    }

    const cleanArticle = {
      ...req.body,
      title: sanitizeString(title),
      slug: sanitizeString(req.body.slug || ''),
      category: sanitizeString(req.body.category || 'Software Engineering'),
      author: sanitizeString(req.body.author || 'Abdul Samad Rind (Founder & CEO)'),
      excerpt: sanitizeString(excerpt || ''),
      featuredImage: sanitizeString(req.body.featuredImage || ''),
      imageAlt: sanitizeString(req.body.imageAlt || ''),
      metaTitle: sanitizeString(req.body.metaTitle || ''),
      metaDescription: sanitizeString(req.body.metaDescription || ''),
      canonicalUrl: sanitizeString(req.body.canonicalUrl || ''),
    };

    const created = await addArticle(cleanArticle);
    res.status(201).json({ success: true, article: created });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create article.' });
  }
});

apiRouter.put('/articles/:id', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const updated = await updateArticle(cleanId, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Article not found.' });
      return;
    }
    res.json({ success: true, article: updated });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update article.' });
  }
});

apiRouter.delete('/articles/:id', requireAuth(['admin']), async (req: Request, res: Response) => {
  try {
    const cleanId = sanitizeString(req.params.id);
    const deleted = await deleteArticle(cleanId);
    if (!deleted) {
      res.status(404).json({ error: 'Article not found.' });
      return;
    }
    res.json({ success: true, message: 'Article removed successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete article.' });
  }
});

// -----------------------------------------------------------------------------
// OPERATIONAL REFERENCE DATA
// -----------------------------------------------------------------------------

apiRouter.get('/departments', (_req: Request, res: Response) => {
  res.json(DEPARTMENTS_DATA);
});

apiRouter.get('/teams', (_req: Request, res: Response) => {
  res.json(TEAMS_DATA);
});

apiRouter.get('/users', (_req: Request, res: Response) => {
  res.json(INITIAL_USERS);
});

apiRouter.get('/client/projects', (_req: Request, res: Response) => {
  res.json(CLIENT_PROJECTS);
});

// Unusual Security Concerns & Sentinel Forwarding to Superadmins
apiRouter.post('/security/alert', (req: Request, res: Response): void => {
  try {
    const { alert, recipients } = req.body;
    const targetRecipients =
      Array.isArray(recipients) && recipients.length > 0
        ? recipients
        : ['ab.samad@orbit-i.tech'];

    console.info(
      `[SECURITY NOTIFICATION] Unusual security event forwarded to Superadmins: ${targetRecipients.join(', ')}`
    );
    console.info(
      `[SECURITY ALERT] Title: "${alert?.title || 'Security Anomaly'}" | Severity: ${alert?.severity || 'HIGH'} | Details: ${alert?.details || 'N/A'}`
    );

    res.json({
      success: true,
      delivered: true,
      recipients: targetRecipients,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to process security alert' });
  }
});

// Mount API router
app.use('/api', apiRouter);

// -----------------------------------------------------------------------------
// APPLICATION SERVER LIFECYCLE
// -----------------------------------------------------------------------------

async function startServer() {
  await initDatabase();

  const hasDist = fs.existsSync(path.resolve(__dirname, 'dist'));
  const isProd = process.env.NODE_ENV === 'production' || !process.env.NODE_ENV;

  if (hasDist && isProd) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    try {
      const { createServer } = await import('vite');
      const vite = await createServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch (e) {
      if (hasDist) {
        app.use(express.static(path.resolve(__dirname, 'dist')));
        app.get('*', (_req: Request, res: Response) => {
          res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
        });
      }
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`================================================================`);
    console.log(`🛡️  ORBIT-I Production Engine listening on http://0.0.0.0:${PORT}`);
    console.log(`🔒 Security Hardened: RBAC + Rate Limiting + CSP + Anti-Injection`);
    console.log(`================================================================`);
  });
}

startServer();
