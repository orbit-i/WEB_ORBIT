import React from 'react';
import { ShieldAlert, Home, Mail, ArrowRight, Lock, Key, Terminal } from 'lucide-react';
import { COMPANY_INFO } from '../data/orbitData';

interface ForbiddenPageProps {
  setActiveTab: (tab: string) => void;
  requestedRoute?: string;
  reason?: string;
  isPreview?: boolean;
  onExitPreview?: () => void;
}

export const ForbiddenPage: React.FC<ForbiddenPageProps> = ({
  setActiveTab,
  requestedRoute = '/admin-portal',
  reason,
  isPreview = false,
  onExitPreview,
}) => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-between py-12 md:py-20 font-sans selection:bg-red-600 selection:text-white relative overflow-hidden">
      {/* Background Subtle Security Matrix Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Top Banner if in preview mode from Admin Portal */}
      {isPreview && (
        <div className="bg-red-600 text-white py-2.5 px-6 text-xs font-mono font-bold flex items-center justify-between mb-8 shadow-sm relative z-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
            <span>ADMINISTRATIVE PREVIEW MODE — Configured 403 Forbidden Access Screen</span>
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

      <div className="max-w-3xl mx-auto px-6 w-full text-center space-y-10 my-auto relative z-10">
        {/* Security Shield Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl"></div>
          <ShieldAlert className="h-10 w-10 text-red-500 relative z-10" />
        </div>

        {/* Error Code & Details */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-800/60 text-xs font-mono font-bold text-red-400">
            <Lock className="h-3.5 w-3.5 text-red-400" />
            <span>ERR_403_ACCESS_RESTRICTED</span>
            <span className="text-red-700">|</span>
            <span className="truncate max-w-xs">{requestedRoute}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            403 · Access Prohibited
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            {reason ||
              'Access to this administrative partition is restricted to authenticated ORBIT-I corporate officers and security engineers. Public access to this resource is strictly disallowed.'}
          </p>
        </div>

        {/* Diagnostic Security Console Box */}
        <div className="bg-black/60 border border-white/10 rounded-2xl p-6 max-w-xl mx-auto text-left font-mono text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-red-400" />
              <span>ORBIT-I FIREWALL LOG · ACCESS VIOLATION</span>
            </span>
            <span className="text-red-400 font-bold">BLOCKED</span>
          </div>

          <div className="space-y-1.5 text-gray-400 text-[11px]">
            <div className="flex justify-between">
              <span>Authorization Scheme:</span>
              <span className="text-white">Role-Based Multi-Factor Token</span>
            </div>
            <div className="flex justify-between">
              <span>Requested Partition:</span>
              <span className="text-red-400">{requestedRoute}</span>
            </div>
            <div className="flex justify-between">
              <span>Security Event ID:</span>
              <span className="text-white font-bold">SEC-403-{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span>Client Incident Logging:</span>
              <span className="text-emerald-400">Persisted in Telemetry Registry</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-black hover:bg-gray-100 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Home className="h-4 w-4" />
            <span>Return to Safe Public Ground</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs sm:text-sm font-semibold border border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Mail className="h-4 w-4" />
            <span>Request Security Clearance</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-6 px-6 text-center text-xs text-gray-500 font-mono relative z-10">
        &copy; {new Date().getFullYear()} {COMPANY_INFO.legalName} Security Infrastructure. Unauthorized penetration attempts are actively monitored.
      </footer>
    </div>
  );
};
