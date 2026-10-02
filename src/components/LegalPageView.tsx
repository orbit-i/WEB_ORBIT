import React from 'react';
import { useCms } from '../context/CmsContext';
import { COMPANY_INFO } from '../data/orbitData';
import { Shield, FileText, Lock, RefreshCw, Printer, ArrowLeft, Mail, MapPin, CheckCircle, Cookie, Activity } from 'lucide-react';

interface LegalPageViewProps {
  policyType: 'privacy' | 'terms' | 'security' | 'refund' | 'cookies';
  setActiveTab: (tab: string) => void;
}

export const LegalPageView: React.FC<LegalPageViewProps> = ({ policyType, setActiveTab }) => {
  const { legalPages } = useCms();
  const doc = legalPages[policyType] || legalPages['privacy'];

  const policiesList: { id: 'privacy' | 'terms' | 'security' | 'refund' | 'cookies'; name: string; icon: React.ReactNode }[] = [
    { id: 'privacy', name: 'Privacy & Data Protection', icon: <Shield className="h-4 w-4" /> },
    { id: 'cookies', name: 'Cookie & IP Data Policy', icon: <Cookie className="h-4 w-4" /> },
    { id: 'terms', name: 'Terms & Conditions', icon: <FileText className="h-4 w-4" /> },
    { id: 'security', name: 'Security Policy', icon: <Lock className="h-4 w-4" /> },
    { id: 'refund', name: 'Refund Policy', icon: <RefreshCw className="h-4 w-4" /> },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white text-black py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-gray-200 mb-10">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-black hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span>Legal Documentation</span>
            <span>/</span>
            <span className="text-black font-semibold">{doc.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black text-xs font-semibold rounded-full border border-gray-300 transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Document</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-black text-white hover:bg-gray-800 text-xs font-semibold rounded-full border border-black transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Data Protection Inquiry</span>
            </button>
          </div>
        </div>

        {/* 2-Column Corporate Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Dedicated Legal Documents Menu (3 Cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sticky top-28">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3 font-mono">
                Legal &amp; Privacy Directory
              </span>

              <nav className="space-y-1.5">
                {policiesList.map((p) => {
                  const isActive = p.id === policyType;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActiveTab(p.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                        isActive
                          ? 'bg-black text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                      }`}
                    >
                      {p.icon}
                      <span>{p.name}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Head Office Invariant Card */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-xs space-y-2 text-gray-600">
                <span className="font-bold text-black block">Registered Entity:</span>
                <p className="text-[11px] font-medium text-gray-800">{COMPANY_INFO.legalName}</p>
                <div className="flex items-start gap-1.5 text-[11px] text-gray-600">
                  <MapPin className="h-3 w-3 mt-0.5 shrink-0 text-black" />
                  <span>{COMPANY_INFO.location}</span>
                </div>
                <div className="flex items-start gap-1.5 text-[11px] text-gray-600">
                  <Mail className="h-3 w-3 mt-0.5 shrink-0 text-black" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">
                    {COMPANY_INFO.email}
                  </a>
                </div>
                <div className="pt-2 text-[10px] text-gray-500 font-mono">
                  DPO: compliance@orbit-i.tech
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Full Formal Legal Policy Content (9 Cols) */}
          <div className="lg:col-span-9 space-y-8">
            {/* Header Document Banner */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 bg-black text-white text-[11px] font-mono font-semibold rounded-full uppercase tracking-wider">
                  Official Compliance Document
                </span>
                <span className="text-xs text-gray-500 font-mono">
                  Effective: {doc.lastUpdated}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black tracking-tight mb-4">
                {doc.title}
              </h1>

              <p className="text-base text-gray-700 leading-relaxed max-w-3xl">
                {doc.summary}
              </p>

              <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap items-center gap-6 text-xs text-gray-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>Enforceable Corporate Compliance</span>
                </div>
                <div>Jurisdiction: <span className="font-semibold text-black">Nawabshah, Sindh, Pakistan</span></div>
                <div>Status: <span className="font-semibold text-emerald-700">Active Enforcement</span></div>
              </div>
            </div>

            {/* Document Sections */}
            <div className="space-y-6">
              {doc.sections.map((section, idx) => (
                <div
                  key={section.id || idx}
                  className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-black transition-colors"
                >
                  <h2 className="text-xl font-bold text-black mb-3">
                    {section.heading}
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact / Rights Notice */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 text-xs text-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="font-bold text-black text-sm block mb-1">
                  Request Data Export or IP Logs Erasure (GDPR / DSAR)
                </span>
                <p>
                  Submit a formal Data Subject Access Request to the privacy compliance officer of {COMPANY_INFO.legalName} at{' '}
                  <a href={`mailto:${COMPANY_INFO.email}`} className="font-semibold text-black underline">
                    {COMPANY_INFO.email}
                  </a>.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('contact')}
                className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 rounded-full font-semibold text-xs transition-colors shrink-0"
              >
                File Privacy Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
