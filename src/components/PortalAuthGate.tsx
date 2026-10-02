import React, { useState, useEffect } from 'react';
import {
  Lock,
  ShieldAlert,
  Eye,
  EyeOff,
  AlertTriangle,
  Clock,
  ShieldCheck,
  User,
  Building,
  Mail,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  KeyRound,
  RotateCcw,
  Shield,
  HelpCircle,
  Info,
  Crown,
} from 'lucide-react';
import { dispatchSecurityAlert } from '../services/securityAlertService';
import {
  authenticateUser,
  registerClientAccount,
  requestPasswordReset,
  completePasswordReset,
  isSuperadminSetupPending,
  setupSuperadminPassword,
  SUPERADMIN_DEFAULT_EMAIL,
} from '../services/authService';

interface PortalAuthGateProps {
  portalType: 'client' | 'admin';
  children: React.ReactNode;
  onLogout?: () => void;
}

const MAX_ATTEMPTS = 3;
const LOCKOUT_SECONDS = 60;

export const PortalAuthGate: React.FC<PortalAuthGateProps> = ({
  portalType,
  children,
  onLogout,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<{
    name: string;
    email: string;
    role: string;
    portalType?: string;
    sessionStarted: string;
  } | null>(null);

  // Auth Modes: 'signin' | 'signup' | 'forgot' | 'setup_superadmin'
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot' | 'setup_superadmin'>('signin');

  // Sign In inputs
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Superadmin Setup inputs
  const [setupEmail, setSetupEmail] = useState<string>(SUPERADMIN_DEFAULT_EMAIL);
  const [setupPassword, setSetupPassword] = useState<string>('');
  const [setupConfirmPassword, setSetupConfirmPassword] = useState<string>('');
  const [superadminPending, setSuperadminPending] = useState<boolean>(false);

  // Sign Up inputs (Clients ONLY)
  const [signupName, setSignupName] = useState<string>('');
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [signupCompany, setSignupCompany] = useState<string>('');
  const [signupPassword, setSignupPassword] = useState<string>('');
  const [signupSuccessMsg, setSignupSuccessMsg] = useState<string | null>(null);

  // Password Reset inputs
  const [resetEmail, setResetEmail] = useState<string>('');
  const [resetCode, setResetCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [resetStep, setResetStep] = useState<1 | 2>(1);
  const [issuedCode, setIssuedCode] = useState<string | null>(null);
  const [resetSuccessMsg, setResetSuccessMsg] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<'client' | 'admin'>(portalType);

  useEffect(() => {
    setActiveMode(portalType);
    setErrorMessage(null);
    setAuthMode('signin');
    if (portalType === 'admin') {
      setSuperadminPending(isSuperadminSetupPending());
    }
  }, [portalType]);

  const ATTEMPTS_KEY = `orbit_auth_attempts_${activeMode}`;
  const LOCKOUT_KEY = `orbit_auth_lockout_${activeMode}`;
  const SESSION_KEY = `orbit_auth_session_${activeMode}`;
  const TOKEN_KEY = `orbit_auth_token_${activeMode}`;

  // Session check on mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem(TOKEN_KEY);
    const storedSession = sessionStorage.getItem(SESSION_KEY);

    if (storedToken && storedSession) {
      try {
        const user = JSON.parse(storedSession);
        // Verify user portalType matches target
        if (
          (activeMode === 'admin' && user.portalType === 'admin') ||
          (activeMode === 'client' && user.portalType === 'client')
        ) {
          setIsAuthenticated(true);
          setAuthenticatedUser(user);
        } else {
          sessionStorage.removeItem(TOKEN_KEY);
          sessionStorage.removeItem(SESSION_KEY);
        }
      } catch {
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(SESSION_KEY);
      }
    }

    const storedLockout = localStorage.getItem(LOCKOUT_KEY);
    if (storedLockout) {
      const lockUntil = parseInt(storedLockout, 10);
      const now = Date.now();
      if (lockUntil > now) {
        setLockoutRemaining(Math.ceil((lockUntil - now) / 1000));
      } else {
        localStorage.removeItem(LOCKOUT_KEY);
        localStorage.removeItem(ATTEMPTS_KEY);
      }
    }
  }, [TOKEN_KEY, SESSION_KEY, LOCKOUT_KEY, ATTEMPTS_KEY, activeMode]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const interval = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(LOCKOUT_KEY);
          localStorage.removeItem(ATTEMPTS_KEY);
          setAttempts(0);
          setErrorMessage(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutRemaining, LOCKOUT_KEY, ATTEMPTS_KEY]);

  // Sign In submit handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutRemaining > 0 || isSubmitting) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    const email = emailInput.trim();
    const password = passwordInput.trim();

    try {
      const result = authenticateUser(email, password, activeMode);

      if (result.requiresSetup) {
        setAuthMode('setup_superadmin');
        setSetupEmail(email || SUPERADMIN_DEFAULT_EMAIL);
        setErrorMessage(result.error || 'Superadmin master password required. Please complete initial setup to secure your account.');
        return;
      }

      if (result.success && result.user) {
        const sessionUser = {
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
          portalType: result.user.portalType,
          company: result.user.company,
          sessionStarted: new Date().toLocaleTimeString(),
        };

        const token = `orbit-jwt-${Date.now()}`;
        sessionStorage.setItem(TOKEN_KEY, token);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
        localStorage.removeItem(ATTEMPTS_KEY);
        localStorage.removeItem(LOCKOUT_KEY);
        setAttempts(0);
        setErrorMessage(null);
        setIsAuthenticated(true);
        setAuthenticatedUser(sessionUser);
      } else {
        // Authentication failed
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        localStorage.setItem(ATTEMPTS_KEY, nextAttempts.toString());

        // Only dispatch security alert to superadmins on full lockout (avoid nuisance on mistyped passwords)
        if (nextAttempts >= MAX_ATTEMPTS) {
          dispatchSecurityAlert({
            type: 'lockout',
            severity: 'critical',
            title: 'Security Alert: Host Lockout Triggered on Portal Auth',
            details: `Repeated failed authentication attempts on ${activeMode.toUpperCase()} portal using identifier "${email}". Maximum attempts exceeded.`,
            sourceIp: 'Client Network Host',
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 90) : undefined,
          });
        }

        if (nextAttempts >= MAX_ATTEMPTS) {
          const lockUntil = Date.now() + LOCKOUT_SECONDS * 1000;
          localStorage.setItem(LOCKOUT_KEY, lockUntil.toString());
          setLockoutRemaining(LOCKOUT_SECONDS);
          setErrorMessage(
            `Security Lockout Active: Maximum failed attempts reached. Please wait ${LOCKOUT_SECONDS} seconds.`
          );
        } else {
          setErrorMessage(
            result.error ||
              `Invalid credentials. ${MAX_ATTEMPTS - nextAttempts} attempts remaining before security cooldown.`
          );
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Superadmin first-time setup handler
  const handleSuperadminSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (setupPassword.length < 8) {
      setErrorMessage('Master password must be at least 8 characters long.');
      return;
    }

    if (setupPassword !== setupConfirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = setupSuperadminPassword(setupEmail, setupPassword);
      if (result.success && result.user) {
        const sessionUser = {
          name: result.user.name,
          email: result.user.email,
          role: result.user.role,
          portalType: result.user.portalType,
          company: result.user.company,
          sessionStarted: new Date().toLocaleTimeString(),
        };

        const token = `orbit-jwt-${Date.now()}`;
        sessionStorage.setItem(TOKEN_KEY, token);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
        localStorage.removeItem(ATTEMPTS_KEY);
        localStorage.removeItem(LOCKOUT_KEY);
        setAttempts(0);
        setSuperadminPending(false);
        setErrorMessage(null);
        setIsAuthenticated(true);
        setAuthenticatedUser(sessionUser);
      } else {
        setErrorMessage(result.error || 'Failed to initialize superadmin credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sign Up submit handler (Client ONLY)
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (portalType !== 'client') {
      setErrorMessage('Public registration is restricted to Client Organizations only.');
      return;
    }

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const result = registerClientAccount(
      signupName,
      signupEmail,
      signupCompany,
      signupPassword
    );

    if (result.success && result.user) {
      const sessionUser = {
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
        portalType: result.user.portalType,
        company: result.user.company,
        sessionStarted: new Date().toLocaleTimeString(),
      };

      const token = `token-${Date.now()}`;
      sessionStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

      setSignupSuccessMsg('Enterprise client account registered securely! Redirecting to workspace...');
      setTimeout(() => {
        setIsAuthenticated(true);
        setAuthenticatedUser(sessionUser);
      }, 700);
    } else {
      setErrorMessage(result.error || 'Registration failed. Please check inputs.');
    }

    setIsSubmitting(false);
  };

  // Password Reset: Step 1 - Request Code
  const handleRequestResetCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    setErrorMessage(null);
    const result = requestPasswordReset(resetEmail);

    if (result.success && result.code) {
      setIssuedCode(result.code);
      setResetStep(2);
      setResetSuccessMsg(`Security verification code generated: ${result.code}`);
    } else {
      setErrorMessage(result.error || 'No account matching this email was found.');
    }
  };

  // Password Reset: Step 2 - Complete Reset
  const handleCompleteReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetCode.trim() || !newPassword.trim()) {
      setErrorMessage('Please enter the verification code and your new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage('New password must be at least 8 characters long.');
      return;
    }

    setErrorMessage(null);
    const result = completePasswordReset(resetEmail, resetCode, newPassword);

    if (result.success) {
      setResetSuccessMsg('Password updated successfully! Please sign in with your new password.');
      setAuthMode('signin');
      setPasswordInput(newPassword);
      setEmailInput(resetEmail);
      setResetStep(1);
      setIssuedCode(null);
    } else {
      setErrorMessage(result.error || 'Failed to update password.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setAuthenticatedUser(null);
    setPasswordInput('');
    if (onLogout) onLogout();
  };

  // Render children if already authenticated
  if (isAuthenticated && authenticatedUser) {
    return (
      <div className="w-full min-h-screen">
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<any>, {
              authenticatedUser,
              onLogout: handleLogout,
            })
          : children}
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] text-gray-900 py-12 md:py-20 min-h-[80vh] flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full mx-auto">
        {/* Card Container */}
        <div className="bg-white border border-gray-200/90 rounded-3xl p-7 sm:p-9 shadow-xl shadow-slate-200/50">
          {/* Logo & Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#2f6fed]/10 border border-[#2f6fed]/20 flex items-center justify-center text-[#2f6fed] mb-3">
              <KeyRound className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {portalType === 'admin' ? 'Executive Portal Access' : 'Client Organization Portal'}
            </h2>
            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
              {portalType === 'admin'
                ? 'Authorized access for Superadmin, Admin, and assigned team members.'
                : 'Sign in to review project progress, deliverables, and enterprise telemetry.'}
            </p>
          </div>

          {/* Clean Segmented Tab Switcher */}
          {portalType === 'client' ? (
            <div className="grid grid-cols-2 p-1 bg-gray-100/90 rounded-xl mb-6 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  setErrorMessage(null);
                }}
                className={`py-2 rounded-lg transition-all ${
                  authMode === 'signin'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMessage(null);
                }}
                className={`py-2 rounded-lg transition-all ${
                  authMode === 'signup'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Create Account
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between px-3 py-2 bg-blue-50/70 border border-blue-150 rounded-xl mb-6 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-blue-900">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span>Executive &amp; Governance Console</span>
              </div>
              <span className="text-[10px] font-mono uppercase bg-blue-200/60 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                Restricted
              </span>
            </div>
          )}

          {/* Lockout Warning */}
          {lockoutRemaining > 0 && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-red-700">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>Security Cooldown Active</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Maximum failed attempts reached. Cooldown will automatically expire in:
              </p>
              <div className="flex items-center gap-1.5 font-mono font-bold text-sm text-red-900 pt-0.5">
                <Clock className="h-3.5 w-3.5 animate-spin" />
                <span>00:{lockoutRemaining < 10 ? `0${lockoutRemaining}` : lockoutRemaining}s</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && lockoutRemaining <= 0 && (
            <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Banner */}
          {(signupSuccessMsg || resetSuccessMsg) && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{signupSuccessMsg || resetSuccessMsg}</span>
            </div>
          )}

          {/* ======================================================= */}
          {/* VIEW 1: SIGN IN FORM                                    */}
          {/* ======================================================= */}
          {authMode === 'signin' && (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Superadmin Setup Prompt Banner */}
              {activeMode === 'admin' && superadminPending && (
                <div className="p-3.5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl text-left space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900">
                    <Crown className="h-4 w-4 text-purple-700" />
                    <span>Superadmin Master Setup Available</span>
                  </div>
                  <p className="text-[11px] text-purple-800 leading-snug">
                    Welcome Abdul Samad Rind (Founder &amp; CEO). Set your custom master password to secure and claim your Superadmin console.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('setup_superadmin');
                      setSetupEmail(SUPERADMIN_DEFAULT_EMAIL);
                      setErrorMessage(null);
                    }}
                    className="text-xs font-bold text-purple-700 hover:text-purple-900 underline flex items-center gap-1 pt-0.5"
                  >
                    Setup Superadmin Master Password &rarr;
                  </button>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Corporate Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    disabled={lockoutRemaining > 0 || isSubmitting}
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. ab.samad@orbit-i.tech"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#2f6fed] transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('forgot');
                      setErrorMessage(null);
                      setResetEmail(emailInput);
                    }}
                    className="text-[11px] font-semibold text-[#2f6fed] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    disabled={lockoutRemaining > 0 || isSubmitting}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50/50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#2f6fed] transition-all disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {activeMode === 'admin' && (
                  <div className="flex items-center justify-end pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('setup_superadmin');
                        setSetupEmail(SUPERADMIN_DEFAULT_EMAIL);
                        setErrorMessage(null);
                      }}
                      className="text-[11px] text-purple-700 hover:text-purple-900 font-semibold flex items-center gap-1 hover:underline"
                    >
                      <Crown className="h-3.5 w-3.5 text-purple-600" />
                      <span>First-Time Superadmin Setup / Initialize</span>
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={lockoutRemaining > 0 || !emailInput || !passwordInput || isSubmitting}
                className="w-full py-3 bg-[#2f6fed] hover:bg-blue-600 text-white rounded-xl font-bold text-xs transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ======================================================= */}
          {/* VIEW 2: CLIENT SELF-REGISTRATION (CLIENTS ONLY)         */}
          {/* ======================================================= */}
          {authMode === 'signup' && portalType === 'client' && (
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Tariq Mansoor"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#2f6fed] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Work / Corporate Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="e.g. tariq@apexholdings.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#2f6fed] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Organization / Client Company Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Building className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={signupCompany}
                    onChange={(e) => setSignupCompany(e.target.value)}
                    placeholder="e.g. Apex Global Logistics"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#2f6fed] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Create Password (min 8 chars) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#2f6fed] transition-all font-mono"
                  />
                </div>
              </div>

              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-150 text-[11px] text-blue-800 leading-snug flex items-start gap-1.5">
                <Info className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Registered accounts are granted Client Workspace privileges to review milestone deliverables, telemetry, and verified project documents.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !signupName || !signupEmail || !signupPassword}
                className="w-full py-3 bg-[#2f6fed] hover:bg-blue-600 text-white rounded-xl font-bold text-xs transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>Register Client Workspace Account</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          {/* ======================================================= */}
          {/* VIEW 3: FORGOT / RESET PASSWORD FLOW                    */}
          {/* ======================================================= */}
          {authMode === 'forgot' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <RotateCcw className="h-4 w-4 text-[#2f6fed]" />
                  <span>Reset Account Password</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setErrorMessage(null);
                    setResetStep(1);
                  }}
                  className="text-xs text-[#2f6fed] hover:underline font-semibold"
                >
                  Back to Sign In
                </button>
              </div>

              {resetStep === 1 ? (
                <form onSubmit={handleRequestResetCode} className="space-y-3.5">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Enter your registered email address. We will verify your account and generate a 6-digit security reset code.
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Account Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <input
                        type="email"
                        required
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="e.g. user@orbit-i.tech"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-[#2f6fed] transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#2f6fed] hover:bg-blue-600 text-white rounded-xl font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Send Verification Code</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleCompleteReset} className="space-y-3.5">
                  {issuedCode && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between">
                      <div>
                        <span className="font-semibold block text-[11px] text-blue-700">Security Reset Code:</span>
                        <span className="font-mono font-black text-base text-blue-950 tracking-wider">
                          {issuedCode}
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-600 font-mono">15m validity</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      6-Digit Verification Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="w-full px-3.5 py-2 bg-gray-50/50 border border-gray-300 rounded-xl text-xs font-mono font-bold tracking-widest text-gray-900 focus:bg-white focus:outline-none focus:border-[#2f6fed]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      New Password (min 8 chars) *
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2 bg-gray-50/50 border border-gray-300 rounded-xl text-xs font-mono text-gray-900 focus:bg-white focus:outline-none focus:border-[#2f6fed]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2 bg-gray-50/50 border border-gray-300 rounded-xl text-xs font-mono text-gray-900 focus:bg-white focus:outline-none focus:border-[#2f6fed]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Update Password &amp; Proceed to Login</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ======================================================= */}
          {/* VIEW 4: FIRST-TIME SUPERADMIN SETUP                     */}
          {/* ======================================================= */}
          {authMode === 'setup_superadmin' && (
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <Crown className="h-4 w-4 text-purple-600" />
                  <span>First-Time Superadmin Setup</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setErrorMessage(null);
                  }}
                  className="text-xs text-[#2f6fed] hover:underline font-semibold"
                >
                  Back to Sign In
                </button>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 space-y-1">
                <p className="font-semibold text-purple-950">
                  Welcome, Abdul Samad Rind (Founder &amp; CEO)
                </p>
                <p className="text-[11px] text-purple-800 leading-relaxed">
                  Establish your permanent root master password. This will secure the executive console and lock out unconfigured states.
                </p>
              </div>

              <form onSubmit={handleSuperadminSetupSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Superadmin Account Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={setupEmail}
                      onChange={(e) => setSetupEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-xs text-gray-700 font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Create Master Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={setupPassword}
                    onChange={(e) => setSetupPassword(e.target.value)}
                    placeholder="Min 8 characters (letters, numbers, symbols)"
                    className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-xl text-xs font-mono text-gray-900 focus:bg-white focus:outline-none focus:border-[#2f6fed]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Confirm Master Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={setupConfirmPassword}
                    onChange={(e) => setSetupConfirmPassword(e.target.value)}
                    placeholder="Repeat master password"
                    className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-xl text-xs font-mono text-gray-900 focus:bg-white focus:outline-none focus:border-[#2f6fed]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !setupPassword || !setupConfirmPassword}
                  className="w-full py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure &amp; Register Superadmin</span>
                </button>
              </form>
            </div>
          )}

          {/* Footer Notice */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-emerald-600" />
              <span>TLS 1.3 End-to-End Encrypted</span>
            </span>
            <span>ORBIT-I Security Sentinel</span>
          </div>
        </div>
      </div>
    </div>
  );
};
