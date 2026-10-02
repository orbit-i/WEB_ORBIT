import React, { useState } from 'react';
import { CLIENT_PROJECTS, COMPANY_INFO } from '../data/orbitData';
import {
  Folder,
  FileText,
  CheckCircle2,
  Download,
  Send,
  Lock,
  ShieldCheck,
  ExternalLink,
  GitBranch,
  Terminal,
  Clock,
  Layers,
  Phone,
  Mail,
  AlertCircle,
  MessageSquare,
  Activity,
  Cpu,
  TrendingUp,
} from 'lucide-react';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { ClientSidebar } from './dashboard/ClientSidebar';
import { SubHeaderBar } from './dashboard/SubHeaderBar';
import { ClientDashboardView } from './dashboard/ClientDashboardView';

interface ClientPortalProps {
  setActiveTab?: (tab: string) => void;
  authenticatedUser?: {
    name: string;
    email: string;
    role: string;
    sessionStarted?: string;
  } | null;
  onLogout?: () => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  setActiveTab: setRootActiveTab,
  authenticatedUser,
  onLogout,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('prj-101');
  const [activeTab, setActiveTab] = useState<'overview' | 'repo' | 'docs' | 'support'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [clientMessage, setClientMessage] = useState<string>('');
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const currentProject =
    CLIENT_PROJECTS.find((p) => p.id === selectedProjectId) || CLIENT_PROJECTS[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientMessage.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setClientMessage('');
      setMessageSent(false);
    }, 3500);
  };

  const handleDownload = (docName: string) => {
    setDownloadSuccess(`Downloading encrypted artifact: ${docName}...`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-gray-900 flex flex-col font-sans selection:bg-[#2f6fed] selection:text-white">
      {/* 1. Top Navbar (Vibrant Royal Blue #2f6fed matching reference image) */}
      <DashboardHeader
        portalType="client"
        user={authenticatedUser}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onLogout={onLogout}
        onNavigateHome={() => setRootActiveTab && setRootActiveTab('home')}
        inquiryCount={currentProject.documents.length}
      />

      {/* 2. Main Flex Layout: Left Sidebar + Center Canvas */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Left Client Navigation Sidebar (Clean White #ffffff) */}
        <ClientSidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
          currentProject={currentProject}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={authenticatedUser}
          onLogout={onLogout}
        />

        {/* Content Canvas Area */}
        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-64px)]">
          {/* Sub Header & Breadcrumbs Bar */}
          <SubHeaderBar
            title={
              activeTab === 'overview'
                ? `${currentProject.clientOrg} Status Report`
                : activeTab === 'repo'
                ? 'Repository & IP Ownership'
                : activeTab === 'docs'
                ? 'Documents & Audits Center'
                : 'Direct Priority Channel'
            }
            breadcrumbs={[
              'Workspace',
              currentProject.clientOrg,
              activeTab === 'overview' ? 'Status Report' : activeTab.toUpperCase(),
            ]}
            dateLabel="Today: Oct 02"
            onRefresh={() => setDownloadSuccess('Refreshed pipeline build status and environment metrics.')}
          />

          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
            {/* Global Notification Toast */}
            {downloadSuccess && (
              <div className="p-4 rounded-xl bg-white border-2 border-emerald-600 text-xs font-bold text-emerald-950 flex items-center justify-between shadow-md animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>{downloadSuccess}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700">SHA-256 SIGNED</span>
              </div>
            )}

            {/* Contract Selector & Quick Tab Switcher Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-1 border-b border-gray-200">
              <div className="flex items-center gap-2 overflow-x-auto text-xs py-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                    activeTab === 'overview'
                      ? 'bg-[#2f6fed] text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Status Report &amp; Sprints</span>
                </button>
                <button
                  onClick={() => setActiveTab('repo')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                    activeTab === 'repo'
                      ? 'bg-[#2f6fed] text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <GitBranch className="h-3.5 w-3.5" />
                  <span>Git Repositories &amp; IP</span>
                </button>
                <button
                  onClick={() => setActiveTab('docs')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                    activeTab === 'docs'
                      ? 'bg-[#2f6fed] text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <Folder className="h-3.5 w-3.5" />
                  <span>Documents ({currentProject.documents.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('support')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
                    activeTab === 'support'
                      ? 'bg-[#2f6fed] text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Priority Channel (2h SLA)</span>
                </button>
              </div>

              {/* Active Contract Quick Indicator */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400">Contract:</span>
                <span className="font-bold text-gray-900 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-2xs">
                  {currentProject.title} ({currentProject.progressPercent}%)
                </span>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* TAB 1: EXECUTIVE STATUS & ANALYTICS DASHBOARD (REFERENCE PICTURE DESIGN)   */}
            {/* ========================================================================= */}
            {activeTab === 'overview' && (
              <ClientDashboardView
                project={currentProject}
                onDownloadDoc={handleDownload}
                onNavigateTab={setActiveTab}
              />
            )}

            {/* ========================================================================= */}
            {/* TAB 2: REPOSITORY & CODEBASE GOVERNANCE                                   */}
            {/* ========================================================================= */}
            {activeTab === 'repo' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-150 gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                      Private Repository &amp; Source Code Ownership
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Direct GitHub access granted under strict IP protection and organizational two-factor authentication.
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full text-xs font-mono font-bold">
                    SSH &amp; HTTPS SECURED
                  </span>
                </div>

                <div className="p-4 bg-gray-900 text-white rounded-xl font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-gray-400 pb-2 border-b border-gray-800">
                    <span>Git Remote Origin</span>
                    <span className="text-emerald-400">Main Branch Protected</span>
                  </div>
                  <div className="p-2.5 bg-black/60 rounded-lg text-emerald-400 select-all overflow-x-auto">
                    git clone {currentProject.repositoryAccess}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
                    <span className="text-[11px] font-mono text-gray-500 uppercase font-bold block">
                      CI/CD Pipeline
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Build Passing (100%)</span>
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
                    <span className="text-[11px] font-mono text-gray-500 uppercase font-bold block">
                      Docker Registry
                    </span>
                    <span className="text-xs font-bold text-gray-900 font-mono">
                      orbit-registry/{currentProject.id}:latest
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
                    <span className="text-[11px] font-mono text-gray-500 uppercase font-bold block">
                      Penetration Audit
                    </span>
                    <span className="text-xs font-bold text-gray-900 font-mono">
                      Passed (Zero High CVEs)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: DOCUMENTS & AUDITS CENTER                                         */}
            {/* ========================================================================= */}
            {activeTab === 'docs' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-150 gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                      Contractual Documents &amp; Architecture Blueprints
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Download signed SLAs, security compliance certificates, and technical specifications with cryptographic SHA-256 verification.
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">
                    {currentProject.documents.length} Artifacts Available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentProject.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between hover:border-blue-500 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-white border border-gray-200 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-gray-900 block group-hover:text-blue-600 transition-colors">
                            {doc.name}
                          </span>
                          <span className="text-[11px] text-gray-500 font-mono">
                            {doc.type} · {doc.size} · Updated {doc.date}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownload(doc.name)}
                        className="p-2 bg-white hover:bg-[#2f6fed] hover:text-white text-gray-700 rounded-lg border border-gray-300 transition-colors shadow-2xs"
                        title="Download Document"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 4: DIRECT SECURE PRIORITY CHANNEL                                    */}
            {/* ========================================================================= */}
            {activeTab === 'support' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-xs space-y-6">
                  <div className="pb-4 border-b border-gray-150">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                      Direct Priority Dispatch Channel
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Direct message your assigned lead engineer and CEO Abdul Samad Rind. Messages are monitored 24/7 with a 2-hour SLA response.
                    </p>
                  </div>

                  {messageSent ? (
                    <div className="p-6 bg-emerald-50 border-2 border-emerald-600 rounded-2xl text-center space-y-2">
                      <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                      <h4 className="text-sm font-bold text-emerald-950">Priority Dispatch Received</h4>
                      <p className="text-xs text-emerald-800">
                        Lead Architect Abdul Samad Rind and the core sprint team have been notified. Expect response within 2 hours under Priority SLA.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSendMessage} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Direct Message / Architectural Query
                        </label>
                        <textarea
                          rows={5}
                          placeholder="Describe technical specification adjustment, sprint priority request, or emergency inquiry..."
                          value={clientMessage}
                          onChange={(e) => setClientMessage(e.target.value)}
                          className="w-full p-3.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-blue-600 outline-none leading-relaxed transition-colors"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#2f6fed] text-white hover:bg-blue-700 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>Dispatch to Lead Architect</span>
                      </button>
                    </form>
                  )}
                </div>

                <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-150 shadow-xs space-y-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-900 block pb-2 border-b border-gray-150">
                    Emergency Hotline
                  </span>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-gray-400 font-mono block text-[11px]">Duty Engineer Direct:</span>
                      <a href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`} className="font-bold text-gray-900 hover:text-blue-600 hover:underline">
                        {COMPANY_INFO.phone}
                      </a>
                    </div>

                    <div>
                      <span className="text-gray-400 font-mono block text-[11px]">Priority Support Email:</span>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="font-bold text-gray-900 hover:text-blue-600 hover:underline">
                        {COMPANY_INFO.email}
                      </a>
                    </div>

                    <div className="pt-2">
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
                        <span className="text-emerald-800 font-bold block">Active SLA Response: 2 Hours</span>
                        <p className="text-[11px] text-emerald-700">24/7 dedicated coverage for production runtime incidents.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
