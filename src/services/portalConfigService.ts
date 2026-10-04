/**
 * Client Portal Configuration Service
 * Provides Superadmin ON/OFF gate management for the Client Organization Portal.
 * Persisted locally and synchronized to the enterprise server.
 */

const STORAGE_KEY = 'orbit_client_portal_enabled';

// Eagerly fetch initial state from server
if (typeof window !== 'undefined') {
  fetch('/api/portal/config')
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (data && typeof data.clientPortalEnabled === 'boolean') {
        localStorage.setItem(STORAGE_KEY, data.clientPortalEnabled ? 'true' : 'false');
        window.dispatchEvent(
          new CustomEvent('orbit-portal-config-updated', {
            detail: { enabled: data.clientPortalEnabled },
          })
        );
      }
    })
    .catch(() => {});
}

/**
 * Checks whether the Client Portal is currently enabled by Superadmin.
 * Defaults to false (hidden & restricted) per security policy.
 */
export const isClientPortalEnabled = (): boolean => {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val === 'true';
  } catch {
    return false;
  }
};

/**
 * Superadmin action to toggle or set Client Portal access on/off.
 */
export const setClientPortalEnabled = (enabled: boolean): void => {
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');
    window.dispatchEvent(new CustomEvent('orbit-portal-config-updated', { detail: { enabled } }));

    // Sync to backend server
    fetch('/api/portal/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientPortalEnabled: enabled }),
    }).catch((err) => console.warn('[PORTAL CONFIG] Offline fallback:', err));
  } catch (err) {
    console.error('Failed to update portal config:', err);
  }
};
