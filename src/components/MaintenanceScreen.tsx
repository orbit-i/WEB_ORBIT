import React from 'react';
import { useCms } from '../context/CmsContext';
import { COMPANY_INFO } from '../data/orbitData';
import { AlertTriangle, Clock, Mail, Phone, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-between selection:bg-white selection:text-black relative overflow-hidden font-sans">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Top Banner if in preview mode */}
      {isPreview && (
        <div className="bg-amber-500 text-black py-2.5 px-6 text-xs font-bold font-mono flex items-center justify-between z-50 shadow-md">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-black animate-pulse"></span>
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

      {/* Header Bar */}
      <header className="w-full border-b border-white/10 py-6 px-6 sm:px-12 flex items-center justify-between relative z-10">
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
              Systems Operations
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="tracking-wide">MAINTENANCE IN PROGRESS</span>
        </div>
      </header>

      {/* Main Core Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-16 relative z-10">
        <div className="max-w-2xl w-full mx-auto text-center space-y-8">
          {/* Visual Beacon Indicator */}
          <div className="mx-auto w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative group">
            <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-xl"></div>
            <AlertTriangle className="h-10 w-10 text-amber-400 relative z-10" />
          </div>

          {/* Titles & Message */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              <span>Target Completion: {maintenanceSettings.estimatedEnd || 'Underway'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {maintenanceSettings.title}
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
              {maintenanceSettings.message}
            </p>
          </div>

          {/* Status Matrix Details */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs font-mono">
            <div className="space-y-1">
              <span className="text-gray-400 block">Operational Node</span>
              <span className="text-white font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Headquarters Hub (Nawabshah Datacenter)
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 block">Core Upgrades</span>
              <span className="text-amber-400 font-semibold">Security Patches &amp; DB Replication</span>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 block">Client Data Integrity</span>
              <span className="text-emerald-400 font-semibold">100% Encrypted &amp; Backed Up</span>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 block">Incident Helpline</span>
              <span className="text-white font-semibold">{maintenanceSettings.emergencyContactPhone}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={`mailto:${maintenanceSettings.emergencyContactEmail}?subject=URGENT%3A%20Maintenance%20Inquiry%20ORBIT-I`}
              className="w-full sm:w-auto px-6 py-3 bg-white text-black hover:bg-gray-100 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Duty Engineer</span>
            </a>

            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs sm:text-sm font-semibold border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Check System Status Again</span>
            </button>

            {maintenanceSettings.allowAdminBypass && onBypass && (
              <button
                onClick={onBypass}
                className="w-full sm:w-auto px-5 py-3 text-gray-400 hover:text-white rounded-full text-xs font-mono transition-all flex items-center justify-center gap-1.5 underline underline-offset-4"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Admin Console Access</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-6 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-mono gap-3 relative z-10">
        <div>
          &copy; {new Date().getFullYear()} {COMPANY_INFO.legalName}. All Rights Reserved.
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`tel:${maintenanceSettings.emergencyContactPhone.replace(/[^0-9+]/g, '')}`}
            className="hover:text-white flex items-center gap-1"
          >
            <Phone className="h-3 w-3" />
            <span>{maintenanceSettings.emergencyContactPhone}</span>
          </a>
          <span>·</span>
          <span>Security Protocol v4.8</span>
        </div>
      </footer>
    </div>
  );
};
