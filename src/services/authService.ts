import { PortalAccessRole, AuthAccount } from '../types';
import { dispatchSecurityAlert } from './securityAlertService';

const ACCOUNTS_STORAGE_KEY = 'orbit_portal_accounts_v2';
const RESET_CODES_KEY = 'orbit_password_reset_codes';

export const SUPERADMIN_DEFAULT_EMAIL = 'ab.samad@orbit-i.tech';

// Default initial accounts seeded safely (No permanent password hardcoded for Superadmin)
const INITIAL_ACCOUNTS: AuthAccount[] = [
  {
    id: 'usr-samad-root',
    name: 'Abdul Samad Rind',
    email: SUPERADMIN_DEFAULT_EMAIL,
    company: 'ORBIT-I LTD',
    role: 'superadmin',
    portalType: 'admin',
    password: '', // Kept empty in codebase for security: initialized by Abdul Samad upon setup
    department: 'Executive Governance',
    createdAt: '2026-01-01',
    status: 'active',
    isSetupRequired: true,
  },
  {
    id: 'usr-writer-01',
    name: 'Danish Khan',
    email: 'writer@orbit-i.tech',
    company: 'ORBIT-I LTD',
    role: 'content_writer',
    portalType: 'admin',
    password: 'Writer#2026!',
    department: 'Content & Editorial',
    createdAt: '2026-03-01',
    status: 'active',
    isSetupRequired: false,
  },
  {
    id: 'usr-seo-01',
    name: 'Ali Raza',
    email: 'seo@orbit-i.tech',
    company: 'ORBIT-I LTD',
    role: 'seo_specialist',
    portalType: 'admin',
    password: 'SeoExpert#2026!',
    department: 'Search Engine Optimization',
    createdAt: '2026-03-15',
    status: 'active',
    isSetupRequired: false,
  },
];

/**
 * Retrieve all registered accounts from local secure store
 */
export const getStoredAccounts = (): AuthAccount[] => {
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}

  // Seed default if empty
  saveStoredAccounts(INITIAL_ACCOUNTS);
  return INITIAL_ACCOUNTS;
};

export const saveStoredAccounts = (accounts: AuthAccount[]): void => {
  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  } catch {}
};

/**
 * Checks whether the root Superadmin account has completed master setup
 */
export const isSuperadminSetupPending = (): boolean => {
  const accounts = getStoredAccounts();
  const root = accounts.find((a) => a.role === 'superadmin');
  return !root || root.isSetupRequired === true || !root.password;
};

/**
 * Superadmin Initial Setup / Secure Registration
 * Allows Abdul Samad Rind to register/set his permanent root master password.
 */
export const setupSuperadminPassword = (
  email: string,
  newPass: string
): { success: boolean; user?: AuthAccount; error?: string } => {
  if (!newPass || newPass.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters long.' };
  }

  const accounts = getStoredAccounts();
  const normalized = email.trim().toLowerCase();

  let target = accounts.find(
    (a) => a.email.toLowerCase() === normalized && a.role === 'superadmin'
  );

  if (!target) {
    // If not found by email, find any root superadmin or create
    target = accounts.find((a) => a.role === 'superadmin');
  }

  if (!target) {
    target = {
      id: 'usr-samad-root',
      name: 'Abdul Samad Rind',
      email: normalized || SUPERADMIN_DEFAULT_EMAIL,
      company: 'ORBIT-I LTD',
      role: 'superadmin',
      portalType: 'admin',
      password: newPass,
      department: 'Executive Governance',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      isSetupRequired: false,
    };
    accounts.unshift(target);
  } else {
    target.email = normalized || target.email;
    target.password = newPass;
    target.isSetupRequired = false;
    target.lastLogin = new Date().toISOString();
  }

  saveStoredAccounts(accounts);

  dispatchSecurityAlert({
    type: 'system_anomaly',
    severity: 'warning',
    title: 'Superadmin Master Password Configured',
    details: `Root Superadmin account "${target.email}" configured permanent master credentials.`,
    sourceIp: '182.180.124.90',
  });

  return { success: true, user: target };
};

/**
 * Authenticate user with strict portal role separation
 */
export const authenticateUser = (
  email: string,
  pass: string,
  targetPortal: 'admin' | 'client'
): { success: boolean; user?: AuthAccount; error?: string; requiresSetup?: boolean } => {
  const accounts = getStoredAccounts();
  const normalizedEmail = email.trim().toLowerCase();

  const account = accounts.find(
    (a) => a.email.toLowerCase() === normalizedEmail && a.status === 'active'
  );

  if (!account) {
    return { success: false, error: 'Invalid email address or account not found.' };
  }

  // Check if superadmin setup is pending
  if (account.role === 'superadmin' && (account.isSetupRequired || !account.password)) {
    return {
      success: false,
      requiresSetup: true,
      error: 'Superadmin root account requires initial master setup. Please set your secure password.',
    };
  }

  if (account.password !== pass) {
    return { success: false, error: 'Invalid password. Please check and try again.' };
  }

  // Enforce Strict Portal Separation
  if (targetPortal === 'admin') {
    // Only corporate staff roles can enter Admin portal
    if (account.role === 'client' || account.portalType !== 'admin') {
      dispatchSecurityAlert({
        type: 'unauthorized_access',
        severity: 'high',
        title: 'Unauthorized Cross-Portal Access Attempt',
        details: `Client account "${normalizedEmail}" attempted to access Executive Admin Console. Request rejected.`,
        sourceIp: '182.180.124.90',
      });
      return {
        success: false,
        error:
          'Security Policy Violation: Client accounts cannot access the Executive Admin Console. Please use the Client Organization Portal.',
      };
    }
  }

  if (targetPortal === 'client') {
    // Only clients can enter Client portal
    if (account.role !== 'client' || account.portalType !== 'client') {
      return {
        success: false,
        error:
          'Corporate administrative staff cannot access client organization workspaces directly. Use your executive portal.',
      };
    }
  }

  // Update last login
  account.lastLogin = new Date().toISOString();
  saveStoredAccounts(accounts);

  return { success: true, user: account };
};

/**
 * Client Portal Self-Registration (STRICTLY 'client' role only)
 */
export const registerClientAccount = (
  name: string,
  email: string,
  company: string,
  pass: string
): { success: boolean; user?: AuthAccount; error?: string } => {
  const accounts = getStoredAccounts();
  const normalizedEmail = email.trim().toLowerCase();

  if (accounts.some((a) => a.email.toLowerCase() === normalizedEmail)) {
    return { success: false, error: 'An account with this email address already exists.' };
  }

  if (pass.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters long.' };
  }

  const newClient: AuthAccount = {
    id: `client-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: name.trim(),
    email: normalizedEmail,
    company: company.trim() || 'Client Organization',
    role: 'client',
    portalType: 'client',
    password: pass,
    createdAt: new Date().toISOString().slice(0, 10),
    status: 'active',
  };

  accounts.push(newClient);
  saveStoredAccounts(accounts);

  return { success: true, user: newClient };
};

/**
 * Staff Provisioning from within Admin Panel
 * Superadmin can create: superadmin, admin, manager, content_writer
 * Admin can create: manager, content_writer
 */
export const provisionStaffAccount = (
  callerRole: PortalAccessRole,
  data: {
    name: string;
    email: string;
    role: PortalAccessRole;
    department?: string;
    password?: string;
  }
): { success: boolean; user?: AuthAccount; error?: string } => {
  if (callerRole !== 'superadmin' && callerRole !== 'admin') {
    return { success: false, error: 'Unauthorized: Only Superadmin and Admin can provision staff accounts.' };
  }

  if (data.role === 'superadmin' && callerRole !== 'superadmin') {
    return { success: false, error: 'Permission denied: Only Superadmin can create another Superadmin.' };
  }

  if (data.role === 'admin' && callerRole !== 'superadmin') {
    return { success: false, error: 'Permission denied: Only Superadmin can create Admin accounts.' };
  }

  const accounts = getStoredAccounts();
  const normalizedEmail = data.email.trim().toLowerCase();

  if (accounts.some((a) => a.email.toLowerCase() === normalizedEmail)) {
    return { success: false, error: 'A user account with this email already exists.' };
  }

  const defaultPassword = data.password && data.password.length >= 8 ? data.password : 'OrbitTeam#2026!';

  const newStaff: AuthAccount = {
    id: `staff-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: data.name.trim(),
    email: normalizedEmail,
    company: 'ORBIT-I LTD',
    role: data.role,
    portalType: 'admin',
    password: defaultPassword,
    department: data.department || 'Engineering',
    createdAt: new Date().toISOString().slice(0, 10),
    status: 'active',
  };

  accounts.push(newStaff);
  saveStoredAccounts(accounts);

  return { success: true, user: newStaff };
};

/**
 * Delete / Revoke staff account
 */
export const revokeStaffAccount = (
  callerRole: PortalAccessRole,
  targetId: string
): { success: boolean; error?: string } => {
  if (callerRole !== 'superadmin' && callerRole !== 'admin') {
    return { success: false, error: 'Unauthorized operation.' };
  }

  const accounts = getStoredAccounts();
  const target = accounts.find((a) => a.id === targetId);

  if (!target) {
    return { success: false, error: 'Account not found.' };
  }

  if (target.role === 'superadmin' && callerRole !== 'superadmin') {
    return { success: false, error: 'Cannot revoke a Superadmin account.' };
  }

  const updated = accounts.filter((a) => a.id !== targetId);
  saveStoredAccounts(updated);

  return { success: true };
};

/**
 * Update staff role and access permissions
 */
export const updateStaffRole = (
  callerRole: PortalAccessRole,
  targetId: string,
  newRole: PortalAccessRole
): { success: boolean; error?: string } => {
  if (callerRole !== 'superadmin' && callerRole !== 'admin') {
    return { success: false, error: 'Unauthorized: Only Superadmin and Admin can change roles.' };
  }

  if (newRole === 'superadmin' && callerRole !== 'superadmin') {
    return { success: false, error: 'Permission denied: Only Superadmin can promote to Superadmin.' };
  }

  const accounts = getStoredAccounts();
  const target = accounts.find((a) => a.id === targetId);

  if (!target) {
    return { success: false, error: 'Staff account not found.' };
  }

  if (target.role === 'superadmin' && callerRole !== 'superadmin') {
    return { success: false, error: 'Cannot modify a Superadmin account.' };
  }

  target.role = newRole;
  saveStoredAccounts(accounts);
  return { success: true };
};

/**
 * Reset staff password directly by Superadmin or Admin
 */
export const resetStaffPasswordByAdmin = (
  callerRole: PortalAccessRole,
  targetId: string,
  newPass: string
): { success: boolean; error?: string } => {
  if (callerRole !== 'superadmin' && callerRole !== 'admin') {
    return { success: false, error: 'Unauthorized operation.' };
  }

  if (!newPass || newPass.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters long.' };
  }

  const accounts = getStoredAccounts();
  const target = accounts.find((a) => a.id === targetId);

  if (!target) {
    return { success: false, error: 'Staff account not found.' };
  }

  if (target.role === 'superadmin' && callerRole !== 'superadmin') {
    return { success: false, error: 'Cannot reset password for a Superadmin account.' };
  }

  target.password = newPass;
  target.isSetupRequired = false;
  saveStoredAccounts(accounts);
  return { success: true };
};

/**
 * Change Password for logged-in user
 */
export const changeAccountPassword = (
  email: string,
  oldPass: string,
  newPass: string
): { success: boolean; error?: string } => {
  if (newPass.length < 8) {
    return { success: false, error: 'New password must be at least 8 characters.' };
  }

  const accounts = getStoredAccounts();
  const normalizedEmail = email.trim().toLowerCase();
  const account = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);

  if (!account) {
    return { success: false, error: 'Account not found.' };
  }

  if (account.password !== oldPass) {
    return { success: false, error: 'Current password is incorrect.' };
  }

  account.password = newPass;
  saveStoredAccounts(accounts);

  return { success: true };
};

/**
 * Request Password Reset Verification Code
 */
export const requestPasswordReset = (
  email: string
): { success: boolean; code?: string; error?: string } => {
  const accounts = getStoredAccounts();
  const normalizedEmail = email.trim().toLowerCase();
  const account = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);

  if (!account) {
    return {
      success: false,
      error: 'No account registered with this email address.',
    };
  }

  // Generate 6-digit secure code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const raw = localStorage.getItem(RESET_CODES_KEY);
    const codes = raw ? JSON.parse(raw) : {};
    codes[normalizedEmail] = {
      code,
      expiresAt: Date.now() + 15 * 60 * 1000, // 15 mins
    };
    localStorage.setItem(RESET_CODES_KEY, JSON.stringify(codes));
  } catch {}

  console.info(`[SECURITY_AUTH] Verification reset code issued for ${normalizedEmail}: ${code}`);

  return { success: true, code };
};

/**
 * Complete Password Reset with Verification Code
 */
export const completePasswordReset = (
  email: string,
  code: string,
  newPass: string
): { success: boolean; error?: string } => {
  if (newPass.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters long.' };
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const raw = localStorage.getItem(RESET_CODES_KEY);
    const codes = raw ? JSON.parse(raw) : {};
    const item = codes[normalizedEmail];

    if (!item || item.code !== code.trim()) {
      return { success: false, error: 'Invalid or expired verification code.' };
    }

    if (Date.now() > item.expiresAt) {
      return { success: false, error: 'Verification code has expired. Please request a new one.' };
    }

    // Update password
    const accounts = getStoredAccounts();
    const account = accounts.find((a) => a.email.toLowerCase() === normalizedEmail);

    if (!account) {
      return { success: false, error: 'Account not found.' };
    }

    account.password = newPass;
    saveStoredAccounts(accounts);

    // Invalidate code
    delete codes[normalizedEmail];
    localStorage.setItem(RESET_CODES_KEY, JSON.stringify(codes));

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to complete password reset.' };
  }
};
