/**
 * Client Portal Configuration Service
 * Provides Superadmin ON/OFF gate management for the Client Organization Portal.
 */

const STORAGE_KEY = 'orbit_client_portal_enabled';

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
  } catch (err) {
    console.error('Failed to update portal config:', err);
  }
};
