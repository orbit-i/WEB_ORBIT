import React from 'react';
import { ShieldAlert, Home, Mail, Lock, KeyRound, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/orbitData';
import { SeoHead } from './common/SeoHead';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-slate-900 to-black text-white flex flex-col justify-between py-12 md:py-16 font-sans selection:bg-red-500 selection:text-white relative overflow-hidden">
      <SeoHead
        title="403 - Forbidden Access | Security Perimeter"
        description="Access to this partition is restricted to authenticated ORBIT-I corporate officers and security engineers."
      />

      {/* Decorative Star Dust / Subtle Cyber Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      {/* Top Banner if in preview mode from Admin Portal */}
      {isPreview && (
        <div className="bg-red-600 text-white py-2.5 px-6 text-xs font-mono font-bold flex items-center justify-between mb-8 shadow-sm relative z-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
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

      <div className="max-w-2xl mx-auto px-6 w-full text-center space-y-8 my-auto relative z-10">
        {/* Cute Futuristic Hologram Shield Graphic */}
        <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
          {/* Pulsing Red/Rose Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/30 to-amber-500/20 blur-2xl animate-pulse" />

          {/* Rotating Digital Perimeter Ring */}
          <div className="absolute inset-1 rounded-full border-2 border-dashed border-rose-500/40 animate-[spin_12s_linear_infinite]" />

          {/* Cute Holographic Shield Badge */}
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-rose-600 to-red-700 flex items-center justify-center text-white shadow-2xl shadow-rose-900/50 border-2 border-rose-400/40">
            <Lock className="h-10 w-10 text-white animate-bounce" />
          </div>
        </div>

        {/* Error Code & Details */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-950/80 border border-rose-700/60 text-xs font-mono font-bold text-rose-300">
            <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
            <span>ERR_403_ACCESS_RESTRICTED</span>
            <span className="text-rose-600">|</span>
            <span className="truncate max-w-[160px] text-rose-200">{requestedRoute}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Restricted Security Perimeter
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-lg mx-auto leading-relaxed">
            {reason ||
              'Access to this partition is restricted to authenticated ORBIT-I corporate officers and security staff. If you are an authorized team member, please sign in.'}
          </p>
        </div>

        {/* Cute Diagnostic Security Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 max-w-md mx-auto text-left font-mono text-xs space-y-2.5 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5 text-rose-300 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>ORBIT-I ZERO-TRUST GATEWAY</span>
            </span>
            <span className="text-rose-400 font-bold px-1.5 py-0.5 rounded bg-rose-950/60 border border-rose-800">
              BLOCKED
            </span>
          </div>

          <div className="space-y-1 text-gray-400 text-[11px]">
            <div className="flex justify-between">
              <span>Security Event:</span>
              <span className="text-white">SEC-403-{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between">
              <span>Authorization Mode:</span>
              <span className="text-white">Role-Based RBAC</span>
            </div>
            <div className="flex justify-between">
              <span>System Response:</span>
              <span className="text-emerald-400">Request Safely Neutralized</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-full text-xs font-bold transition-all shadow-lg flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            <span>Return to Public Website</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('admin-portal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-bold transition-all shadow-lg flex items-center gap-2"
          >
            <KeyRound className="h-4 w-4" />
            <span>Admin Sign In</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-full text-xs font-semibold transition-all flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            <span>Request Assistance</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-4 px-6 text-center text-xs text-gray-500 font-mono relative z-10">
        &copy; {new Date().getFullYear()} {COMPANY_INFO.legalName} · Security Infrastructure Sentinel
      </footer>
    </div>
  );
};
