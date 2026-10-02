import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { ShieldCheck, Cookie, Settings, Check, X, Lock, ExternalLink, Activity } from 'lucide-react';

interface CookieConsentBannerProps {
  setActiveTab: (tab: string) => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ setActiveTab }) => {
  const { cookieSettings, logVisitorEvent } = useCms();
  const [hasDecided, setHasDecided] = useState<boolean>(true);
  const [showPreferencesModal, setShowPreferencesModal] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<{ [key: string]: boolean }>({
    essential: true,
    analytics: true,
    functional: true,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('orbit_cookie_consent');
    if (!savedConsent) {
      setHasDecided(false);
    } else {
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed.preferences || { essential: true, analytics: true, functional: true });
      } catch {
        // default
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allEnabled = { essential: true, analytics: true, functional: true };
    setPreferences(allEnabled);
    localStorage.setItem(
      'orbit_cookie_consent',
      JSON.stringify({
        status: 'accepted_all',
        timestamp: new Date().toISOString(),
        preferences: allEnabled,
      })
    );
    setHasDecided(true);
    setShowPreferencesModal(false);
    logVisitorEvent(window.location.pathname || '/', 'accepted_all');
  };

  const handleAcceptEssentialOnly = () => {
    const essentialOnly = { essential: true, analytics: false, functional: false };
    setPreferences(essentialOnly);
    localStorage.setItem(
      'orbit_cookie_consent',
      JSON.stringify({
        status: 'essential_only',
        timestamp: new Date().toISOString(),
        preferences: essentialOnly,
      })
    );
    setHasDecided(true);
    setShowPreferencesModal(false);
    logVisitorEvent(window.location.pathname || '/', 'essential_only');
  };

  const handleSaveCustomPreferences = () => {
    localStorage.setItem(
      'orbit_cookie_consent',
      JSON.stringify({
        status: 'custom',
        timestamp: new Date().toISOString(),
        preferences,
      })
    );
    setHasDecided(true);
    setShowPreferencesModal(false);
    logVisitorEvent(window.location.pathname || '/', 'custom');
  };

  if (!cookieSettings.bannerEnabled) return null;

  return (
    <>
      {/* Floating Re-Open Button on Bottom Left */}
      <button
        onClick={() => setShowPreferencesModal(true)}
        title="Privacy & Cookie Preferences"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-gray-300 hover:border-black text-black px-3.5 py-2 rounded-full shadow-md text-xs font-semibold transition-all hover:scale-105"
      >
        <Cookie className="h-4 w-4 text-black" />
        <span className="hidden sm:inline">Privacy &amp; Cookies</span>
      </button>

      {/* Main Banner at Bottom (Shown if not yet decided) */}
      {!hasDecided && (
        <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-white/95 backdrop-blur-md border-t-2 border-black shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Notice Text */}
            <div className="space-y-1.5 flex-1 pr-4">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-black text-white rounded-full">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </span>
                <h4 className="text-sm font-bold text-black tracking-tight">
                  {cookieSettings.bannerHeadline}
                </h4>
                <span className="text-[10px] font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                  GDPR / SECP Compliant
                </span>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed max-w-4xl">
                {cookieSettings.bannerMessage}{' '}
                <button
                  onClick={() => {
                    setActiveTab('cookies');
                  }}
                  className="font-bold underline text-black hover:text-gray-600 inline-flex items-center gap-0.5"
                >
                  <span>Cookie Policy</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </button>{' '}
                and{' '}
                <button
                  onClick={() => {
                    setActiveTab('privacy');
                  }}
                  className="font-bold underline text-black hover:text-gray-600 inline-flex items-center gap-0.5"
                >
                  <span>Privacy Policy</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </button>.
              </p>
            </div>

            {/* Buttons Group */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => setShowPreferencesModal(true)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black text-xs font-semibold rounded-full border border-gray-300 transition-colors"
              >
                Preferences
              </button>

              <button
                onClick={handleAcceptEssentialOnly}
                className="px-4 py-2 bg-white hover:bg-gray-100 text-black text-xs font-semibold rounded-full border border-black transition-colors"
              >
                Essential Only
              </button>

              <button
                onClick={handleAcceptAll}
                className="px-5 py-2 bg-black text-white hover:bg-gray-800 text-xs font-bold rounded-full border-2 border-black transition-all shadow-xs"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferencesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-2 border-black rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-black" />
                <h3 className="text-lg font-bold text-black tracking-tight">
                  Cookie &amp; IP Telemetry Preferences
                </h3>
              </div>
              <button
                onClick={() => setShowPreferencesModal(false)}
                className="p-1 rounded text-gray-500 hover:text-black hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Customize how your digital footprint, session cookies, and network IP telemetry are processed across every page on ORBIT-I.
            </p>

            <div className="space-y-4">
              {/* Essential Category */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-bold text-black">
                      Strictly Essential &amp; Security Cookies
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                    ALWAYS ACTIVE
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Required for client dashboard access, 3-attempt brute-force password rate-limiting with 60-second cooldown, and anti-tamper security invariants.
                </p>
                <div className="text-[10px] font-mono text-gray-500">
                  Cookies: orbit_auth_session, orbit_auth_attempts, orbit_auth_lockout, orbit_cookie_consent
                </div>
              </div>

              {/* Analytics & IP Logging Category */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-black" />
                    <span className="text-xs font-bold text-black">
                      Network Telemetry &amp; IP Logging
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({ ...preferences, analytics: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Logs visitor IP address, route paths, browser User-Agent headers, and response latencies to mitigate DDoS attacks and optimize system responsiveness.
                </p>
                <div className="text-[10px] font-mono text-gray-500">
                  Cookies: orbit_telemetry_id, orbit_visitor_ip_hash, orbit_page_session
                </div>
              </div>

              {/* Functional Category */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cookie className="h-4 w-4 text-black" />
                    <span className="text-xs font-bold text-black">
                      Functional &amp; Experience Preferences
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) =>
                        setPreferences({ ...preferences, functional: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Remembers consultation service selections, department filter states, and active tab preferences.
                </p>
                <div className="text-[10px] font-mono text-gray-500">
                  Cookies: orbit_ui_prefs, orbit_consultation_draft
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-200">
              <button
                type="button"
                onClick={handleAcceptEssentialOnly}
                className="px-4 py-2 text-xs font-semibold text-gray-700 hover:text-black underline"
              >
                Reject Non-Essential
              </button>

              <button
                type="button"
                onClick={handleSaveCustomPreferences}
                className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 rounded-full text-xs font-bold shadow-sm"
              >
                Save My Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
