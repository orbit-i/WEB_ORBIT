import { SecurityAlert } from '../types';

export interface AdminContact {
  name: string;
  email: string;
  phone?: string;
  role: string;
}

export const SUPERADMIN_PRIMARY_EMAIL = 'ab.samad@orbit-i.tech';

/**
 * Dynamically detects all registered superadmin emails from storage,
 * always including the primary root superadmin ab.samad@orbit-i.tech.
 */
export const getSuperadminRecipients = (): string[] => {
  const recipients = new Set<string>();
  recipients.add(SUPERADMIN_PRIMARY_EMAIL);

  try {
    const raw = localStorage.getItem('orbit_portal_accounts_v2');
    if (raw) {
      const accounts = JSON.parse(raw);
      if (Array.isArray(accounts)) {
        accounts.forEach((acc) => {
          if (acc.role === 'superadmin' && acc.email && acc.status === 'active') {
            recipients.add(acc.email.toLowerCase().trim());
          }
        });
      }
    }
  } catch {}

  return Array.from(recipients);
};

const STORAGE_KEY = 'orbit_security_alerts_log';

export const getSecurityAlerts = (): SecurityAlert[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
};

/**
 * Dispatches unusual security concerns directly to superadmins (ab.samad@orbit-i.tech & detected superadmins).
 * Routine/ignorable notifications are filtered out so they do not cause UI noise or spam.
 */
export const dispatchSecurityAlert = (
  data: Omit<SecurityAlert, 'id' | 'timestamp' | 'emailsNotified' | 'resolved'>
): SecurityAlert | null => {
  // Ignore routine events, test audits, or normal actions (no headache/spam)
  if (data.severity !== 'critical' && data.severity !== 'high') {
    return null;
  }

  // Filter out normal setup and routine actions
  if (
    data.title?.toLowerCase().includes('password configured') ||
    data.title?.toLowerCase().includes('simulated') ||
    data.title?.toLowerCase().includes('test audit')
  ) {
    return null;
  }

  const superadmins = getSuperadminRecipients();
  const now = new Date();

  const newAlert: SecurityAlert = {
    ...data,
    id: `sec-alert-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: now.toISOString().replace('T', ' ').slice(0, 19),
    emailsNotified: superadmins,
    resolved: false,
  };

  try {
    const current = getSecurityAlerts();
    const updated = [newAlert, ...current.slice(0, 19)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Quietly dispatch to backend endpoint for actual email delivery to ab.samad@orbit-i.tech
    fetch('/api/security/alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        alert: newAlert,
        recipients: superadmins,
      }),
    }).catch(() => {
      // Offline fallback: logged safely without UI interruption
    });

    console.info(
      `[SECURITY NOTICE]: Real alert dispatched to Superadmin (${superadmins.join(', ')}): ${newAlert.title}`
    );
  } catch (err) {
    console.error('Failed to dispatch security alert:', err);
  }

  return newAlert;
};

export const clearSecurityAlerts = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
};

/**
 * Clean helper - simulated noise deprecated to keep admin peaceful
 */
export const triggerSimulatedSecurityAudit = (): null => {
  clearSecurityAlerts();
  return null;
};
