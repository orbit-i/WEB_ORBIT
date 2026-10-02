import React from 'react';
import { useCms } from '../context/CmsContext';
import { COMPANY_INFO } from '../data/orbitData';
import { Clock, Mail, Phone, ShieldCheck, ArrowRight, RefreshCw, Sparkles, Wrench } from 'lucide-react';
import { SeoHead } from './common/SeoHead';

interface MaintenanceScreenProps {
  onBypass?: () => void;
  isPreview?: boolean;
  onExitPreview?: () => void;
}

export const MaintenanceScreen: React.FC<MaintenanceScreenProps> = ({
  onBypass,
  isPreview = false,
  onExitPreview,
}) => {
  const { maintenanceSettings } = useCms();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-slate-900 to-black text-white flex flex-col justify-between selection:bg-amber-400 selection:text-black relative overflow-hidden font-sans">
      <SeoHead
        title="Scheduled System Maintenance | ORBIT-I Private Limited"
        description="ORBIT-I infrastructure is currently undergoing scheduled performance enhancements and database optimization."
      />

      {/* Decorative floating particles & cosmic glow */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Top Banner if in preview mode */}
      {isPreview && (
        <div className="bg-amber-500 text-black py-2.5 px-6 text-xs font-bold font-mono flex items-center justify-between z-50 shadow-md">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
            <span>ADMINISTRATIVE PREVIEW MODE — Site visitors currently see this maintenance screen</span>
          </div>
          {onExitPreview && (
            <button
              onClick={onExitPreview}
              className="bg-black text-white hover:bg-neutral-800 px-3 py-1 rounded-full text-[11px] font-semibold transition-colors"
            >
              Exit Preview &amp; Return to Admin Console
            </button>
          )}
        </div>
      )}

      {/* Cute Header Bar */}
      <header className="w-full border-b border-white/10 py-5 px-6 sm:px-12 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <img
            src="/orbit-i-logo.png"
            alt="ORBIT-I"
            className="h-8 w-auto invert object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base tracking-tight text-white">
              {COMPANY_INFO.name}
            </span>
            <span className="text-[10px] tracking-wider text-gray-400 uppercase font-mono">
              Systems Operations &amp; Cloud Maintenance
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="tracking-wide">MAINTENANCE IN PROGRESS</span>
        </div>
      </header>

      {/* Main Core Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div className="max-w-2xl w-full mx-auto text-center space-y-8">
          {/* Cute Orbital Maintenance Graphic */}
          <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
            {/* Soft Warm Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-yellow-400/20 blur-2xl animate-pulse" />

            {/* Orbiting Ring with Tool Satellite */}
            <div className="absolute inset-1 rounded-full border-2 border-dashed border-amber-400/40 animate-[spin_8s_linear_infinite]">
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-sm">🛠️</span>
            </div>

            {/* Cute Center Orb */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-white shadow-xl shadow-amber-500/30 border-2 border-amber-300">
              <Wrench className="h-9 w-9 text-white animate-bounce" />
            </div>
          </div>

          {/* Titles & Message */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              <span>Target Completion: {maintenanceSettings.estimatedEnd || 'Underway (Est. < 60 mins)'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {maintenanceSettings.title || 'Engine Upgrade & System Refinement'}
            </h1>

            <p className="text-sm sm:text-base text-gray-300 max-w-lg mx-auto leading-relaxed">
              {maintenanceSettings.message ||
                'Our engineers are currently upgrading system infrastructure, rolling out enhancements, and verifying secure database replication. We will be back online shortly!'}
            </p>
          </div>

          {/* Status Matrix Details Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs font-mono shadow-xl">
            <div className="space-y-1">
              <span className="text-gray-400 block text-[11px]">Infrastructure Node</span>
              <span className="text-white font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Enterprise Linux Cloud / Cluster A</span>
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 block text-[11px]">Database Integrity</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Snapshot SHA-256 Verified</span>
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-gray-950 hover:bg-gray-100 rounded-full text-xs font-bold transition-all shadow-lg flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Status</span>
            </button>

            {onBypass && (
              <button
                onClick={onBypass}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black rounded-full text-xs font-bold transition-all shadow-lg flex items-center gap-2"
              >
                <span>Admin Console Bypass</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}

            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-full text-xs font-semibold transition-all flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              <span>Emergency Support</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-4 px-6 text-center text-xs text-gray-500 font-mono relative z-10">
        &copy; {new Date().getFullYear()} {COMPANY_INFO.legalName} · High Availability Systems
      </footer>
    </div>
  );
};
