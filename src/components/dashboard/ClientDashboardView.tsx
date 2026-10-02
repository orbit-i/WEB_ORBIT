import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Download,
  FileText,
  ShieldCheck,
  Send,
  MessageSquare,
  Upload,
  ArrowRight,
  ExternalLink,
  GitBranch,
  CreditCard,
  Building2,
  Lock,
  PhoneCall,
  Mail,
  Zap,
} from 'lucide-react';
import { ClientProject } from '../../types';
import { COMPANY_INFO } from '../../data/orbitData';

interface ClientDashboardViewProps {
  project: ClientProject;
  onDownloadDoc?: (docName: string) => void;
  onNavigateTab?: (tab: 'overview' | 'repo' | 'docs' | 'support' | 'invoices') => void;
}

export const ClientDashboardView: React.FC<ClientDashboardViewProps> = ({
  project,
  onDownloadDoc,
  onNavigateTab,
}) => {
  const [quickMessage, setQuickMessage] = useState('');
  const [quickMsgSent, setQuickMsgSent] = useState(false);

  const handleQuickSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMessage.trim()) return;
    setQuickMsgSent(true);
    setTimeout(() => {
      setQuickMessage('');
      setQuickMsgSent(false);
    }, 4000);
  };

  const phases = [
    {
      name: 'Phase 1: Technical Architecture & Domain Modeling',
      status: 'Completed',
      percent: 100,
      badge: 'VERIFIED',
      desc: 'System architecture blueprint, data dictionary, and tech stack provisioning.',
    },
    {
      name: 'Phase 2: Relational Schema & Secure Backend APIs',
      status: 'Completed',
      percent: 100,
      badge: 'VERIFIED',
      desc: 'High-throughput RESTful endpoints, database migrations, and authentication.',
    },
    {
      name: 'Phase 3: Core Business Features & Real-Time Engine',
      status: 'In Progress',
      percent: 78,
      badge: 'CURRENT ACTIVE SPRINT',
      desc: 'Front-end interfaces, state synchronization, and webhook integrations.',
    },
    {
      name: 'Phase 4: Security Audit, Penetration Test & Deployment',
      status: 'Scheduled',
      percent: 30,
      badge: 'NEXT MILESTONE',
      desc: 'Vulnerability assessment, staging UAT sign-off, and production launch.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Project Header Banner - Clean & Solid */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-full font-mono">
                ACTIVE CONTRACT
              </span>
              <span className="text-xs font-semibold text-gray-500">
                Client: <strong className="text-gray-900">{project.clientOrg}</strong>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
              Engineering delivery for {project.serviceType}. All deliverables are built under dedicated sprint contracts with 100% intellectual property assignment to {project.clientOrg}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-right min-w-[200px]">
              <span className="text-[11px] font-mono text-gray-500 uppercase block font-semibold">
                Overall Milestone Progress
              </span>
              <div className="text-3xl font-black text-blue-600 font-mono mt-0.5">
                {project.progressPercent}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                <div
                  style={{ width: `${project.progressPercent}%` }}
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigateTab && onNavigateTab('support')}
          className="p-5 bg-white border border-gray-200 rounded-2xl hover:border-blue-600 transition-all text-left group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            Talk to ORBIT-I Leads
          </h4>
          <p className="text-xs text-gray-500 mt-1">
            Direct priority dispatch with 2-hour SLA response from senior architects.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab && onNavigateTab('docs')}
          className="p-5 bg-white border border-gray-200 rounded-2xl hover:border-blue-600 transition-all text-left group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <Download className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
            Download Deliverables
          </h4>
          <p className="text-xs text-gray-500 mt-1">
            {project.documents.length} verified technical blueprints, schemas, and SLA artifacts.
          </p>
        </button>

        <button
          onClick={() => onNavigateTab && onNavigateTab('repo')}
          className="p-5 bg-white border border-gray-200 rounded-2xl hover:border-blue-600 transition-all text-left group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <GitBranch className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
            Private Git &amp; Source Code
          </h4>
          <p className="text-xs text-gray-500 mt-1">
            Protected repository access, staging deployments, and CI/CD pipelines.
          </p>
        </button>
      </div>

      {/* 3. Milestone Delivery Roadmap & Quick Message Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Milestone Progress (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-900">
              Contract Milestone Roadmap
            </h3>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              On Schedule
            </span>
          </div>

          <div className="space-y-4">
            {phases.map((ph, idx) => (
              <div key={idx} className="p-4 bg-gray-50/70 rounded-xl border border-gray-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {ph.percent === 100 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-gray-900">{ph.name}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      ph.percent === 100
                        ? 'bg-emerald-100 text-emerald-800'
                        : ph.percent > 0
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {ph.percent}%
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 pl-6">{ph.desc}</p>
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden ml-6 max-w-[calc(100%-1.5rem)]">
                  <div
                    style={{ width: `${ph.percent}%` }}
                    className={`h-full rounded-full ${
                      ph.percent === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Direct Dispatch to ORBIT-I Company (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="pb-3 border-b border-gray-100">
              <span className="text-[10px] font-mono uppercase font-bold text-blue-600 tracking-wider block">
                Direct Communication Rail
              </span>
              <h3 className="text-base font-bold text-gray-900 mt-0.5">
                Send Note to ORBIT-I Team
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Your message is received directly by Abdul Samad Rind (Founder &amp; CEO) and the assigned lead engineers.
              </p>
            </div>

            {quickMsgSent ? (
              <div className="my-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <h4 className="text-xs font-bold text-emerald-900">Message Received</h4>
                <p className="text-[11px] text-emerald-700">
                  Abdul Samad Rind and the team have been notified. Response incoming shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuickSend} className="space-y-3 mt-4">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Quick Specification or Question
                  </label>
                  <textarea
                    rows={4}
                    value={quickMessage}
                    onChange={(e) => setQuickMessage(e.target.value)}
                    placeholder="Type requirements, revision request, or schedule question..."
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Company Leads</span>
                </button>
              </form>
            )}
          </div>

          {/* Assigned Executive Lead Info */}
          <div className="pt-4 border-t border-gray-100 bg-gray-50/80 -mx-6 -mb-6 p-5 rounded-b-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 shrink-0 bg-blue-600">
                <img
                  src="/AbdulSamad.jpeg"
                  alt="Abdul Samad Rind"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 font-mono block">
                  Lead Executive Assigned
                </span>
                <span className="text-xs font-bold text-gray-900 block">Abdul Samad Rind</span>
                <span className="text-[11px] text-blue-600 font-semibold block">Founder &amp; CEO</span>
              </div>
            </div>

            <a
              href={`https://wa.me/923190375751`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4. Verified Deliverables Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Verified Project Deliverables
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Official technical specifications, architecture blueprints, and cryptographic sign-offs.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab && onNavigateTab('docs')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All Documents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {project.documents.map((doc, idx) => (
            <div
              key={idx}
              className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between hover:border-blue-500 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 bg-white border border-gray-200 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="truncate min-w-0">
                  <span className="text-xs font-bold text-gray-900 block truncate group-hover:text-blue-600 transition-colors">
                    {doc.name}
                  </span>
                  <span className="text-[11px] text-gray-500 font-mono">
                    {doc.type} · {doc.size}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onDownloadDoc && onDownloadDoc(doc.name)}
                className="p-2 bg-white hover:bg-blue-600 hover:text-white text-gray-700 rounded-lg border border-gray-300 transition-colors ml-2 shrink-0 shadow-2xs"
                title="Download Deliverable"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
