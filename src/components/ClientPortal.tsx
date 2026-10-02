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
  CreditCard,
  Upload,
  Paperclip,
  Building2,
  Zap,
} from 'lucide-react';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { ClientSidebar } from './dashboard/ClientSidebar';
import { SubHeaderBar } from './dashboard/SubHeaderBar';
import { ClientDashboardView } from './dashboard/ClientDashboardView';
import { ClientProject } from '../types';

interface ClientPortalProps {
  setActiveTab?: (tab: string) => void;
  authenticatedUser?: {
    name: string;
    email: string;
    role: string;
    company?: string;
    sessionStarted?: string;
  } | null;
  onLogout?: () => void;
}

interface MessageItem {
  id: string;
  sender: string;
  role: string;
  text: string;
  timestamp: string;
  isClient: boolean;
  attachmentName?: string;
}

interface ClientUploadedFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  status: string;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  setActiveTab: setRootActiveTab,
  authenticatedUser,
  onLogout,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('prj-101');
  const [activeTab, setActiveTab] = useState<'overview' | 'repo' | 'docs' | 'support' | 'invoices'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Message Hub State (Isolated Strictly Between This Client and ORBIT-I Leadership)
  const [clientMessageText, setClientMessageText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'routine' | 'priority' | 'urgent'>('priority');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Client's isolated conversation with ORBIT-I
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'msg-1',
      sender: 'Abdul Samad Rind',
      role: 'Founder & CEO (ORBIT-I)',
      text: 'Welcome to your dedicated enterprise portal. Phase 2 REST API endpoints and database migrations have been successfully staged. Our sprint team is now executing Phase 3.',
      timestamp: 'Yesterday at 04:30 PM',
      isClient: false,
    },
    {
      id: 'msg-2',
      sender: 'Muhammad Muneeb Ur Rahman Shahzad',
      role: 'Co-Founder & CTO (ORBIT-I)',
      text: 'The security audit passed with zero high-severity vulnerabilities. You can download the signed certificate from your Deliverables & Files tab.',
      timestamp: 'Today at 09:15 AM',
      isClient: false,
    },
  ]);

  // Client uploaded files to ORBIT-I
  const [uploadedFiles, setUploadedFiles] = useState<ClientUploadedFile[]>([
    {
      id: 'up-1',
      name: 'Q2_Business_Logic_Adjustments.docx',
      size: '420 KB',
      uploadedAt: '2026-03-28',
      status: 'Reviewed & Implemented',
    },
    {
      id: 'up-2',
      name: 'Brand_Assets_and_Custom_SVG_Logos.zip',
      size: '5.2 MB',
      uploadedAt: '2026-03-15',
      status: 'Active in Production',
    },
  ]);

  // Determine current project for the logged-in user
  const userOrg = authenticatedUser?.company || 'Client Organization';
  const matchedProject = CLIENT_PROJECTS.find(
    (p) => p.clientOrg.toLowerCase() === userOrg.toLowerCase()
  );
  const currentProject: ClientProject = matchedProject || {
    ...CLIENT_PROJECTS[0],
    clientOrg: userOrg,
  };

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 3500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientMessageText.trim()) return;

    setIsSending(true);

    const clientMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: authenticatedUser?.name || 'Client Representative',
      role: currentProject.clientOrg,
      text: clientMessageText.trim(),
      timestamp: 'Just now',
      isClient: true,
      attachmentName: attachedFileName || undefined,
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, clientMsg]);
      setClientMessageText('');
      setAttachedFileName(null);
      setIsSending(false);
      showToast('Dispatched to Abdul Samad Rind & Engineering Leads. Response within 2 hours under SLA.');

      // Automated acknowledgment from lead engineer
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-resp-${Date.now()}`,
            sender: 'Abdul Samad Rind',
            role: 'Founder & CEO (ORBIT-I)',
            text: 'Acknowledged. Our senior architecture team is reviewing your message. We will update you with technical notes shortly.',
            timestamp: 'Just now',
            isClient: false,
          },
        ]);
      }, 4000);
    }, 600);
  };

  const handleClientFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    const sizeStr =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    const newUpload: ClientUploadedFile = {
      id: `up-${Date.now()}`,
      name: file.name,
      size: sizeStr,
      uploadedAt: new Date().toISOString().split('T')[0],
      status: 'Received by ORBIT-I Engineering',
    };

    setUploadedFiles((prev) => [newUpload, ...prev]);
    showToast(`File "${file.name}" uploaded and transmitted to ORBIT-I!`);
  };

  const handleDownload = (docName: string) => {
    showToast(`Downloading verified artifact: ${docName}...`);
  };

  // Milestone Invoices for this client
  const invoices = [
    {
      id: 'INV-2026-001',
      title: 'Milestone 1: Architecture Blueprint & Technical Discovery',
      amount: '$12,500.00',
      date: '2026-01-15',
      status: 'Paid',
    },
    {
      id: 'INV-2026-002',
      title: 'Milestone 2: Relational Schema & Backend REST APIs',
      amount: '$14,000.00',
      date: '2026-02-28',
      status: 'Paid',
    },
    {
      id: 'INV-2026-003',
      title: 'Milestone 3: Core Business Features & Real-Time Engine',
      amount: '$16,500.00',
      date: '2026-04-15',
      status: 'Milestone Escrow',
    },
  ];

  return (
    <div className="h-screen bg-[#f8fafc] text-gray-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
      {/* 1. Top Navbar (Clean, Solid, Isolated) */}
      <DashboardHeader
        portalType="client"
        user={authenticatedUser}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onLogout={onLogout}
        onNavigateHome={() => setRootActiveTab && setRootActiveTab('home')}
        inquiryCount={messages.length}
      />

      {/* 2. Main Layout: Left Sidebar + Center Canvas */}
      <div className="flex flex-1 relative overflow-hidden min-h-0">
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

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 h-full">
          <SubHeaderBar
            title={
              activeTab === 'overview'
                ? `${currentProject.clientOrg} Workspace`
                : activeTab === 'support'
                ? 'Direct Channel with ORBIT-I'
                : activeTab === 'docs'
                ? 'Files & Deliverables Hub'
                : activeTab === 'repo'
                ? 'Repository & Deployment'
                : 'Milestone Invoicing & Payments'
            }
            breadcrumbs={[
              'Workspace',
              currentProject.clientOrg,
              activeTab.toUpperCase(),
            ]}
            dateLabel="Oct 2026"
            onRefresh={() => showToast('Refreshed project status and delivery metrics.')}
          />

          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
            {/* Toast Notification */}
            {notificationToast && (
              <div className="p-4 rounded-xl bg-white border border-emerald-500 text-xs font-bold text-emerald-950 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>{notificationToast}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700">VERIFIED</span>
              </div>
            )}

            {/* TAB 1: OVERVIEW & MILESTONES */}
            {activeTab === 'overview' && (
              <ClientDashboardView
                project={currentProject}
                onDownloadDoc={handleDownload}
                onNavigateTab={setActiveTab}
              />
            )}

            {/* TAB 2: DIRECT CHANNEL WITH ORBIT-I COMPANY (COMMUNICATION HUB) */}
            {activeTab === 'support' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Conversation Timeline */}
                <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between space-y-6 min-h-[550px]">
                  <div>
                    <div className="pb-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            Direct Channel with ORBIT-I Leadership
                          </h3>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Direct communication rail with Abdul Samad Rind (Founder &amp; CEO) and assigned system leads.
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-mono font-bold self-start">
                        2-Hour SLA Active
                      </span>
                    </div>

                    {/* Messages Thread */}
                    <div className="my-6 space-y-4 max-h-[400px] overflow-y-auto pr-2">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            msg.isClient ? 'items-end' : 'items-start'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-gray-900">{msg.sender}</span>
                            <span className="text-[10px] text-gray-400 font-mono">{msg.role}</span>
                            <span className="text-[10px] text-gray-400 font-mono">· {msg.timestamp}</span>
                          </div>
                          <div
                            className={`p-4 rounded-2xl max-w-lg text-xs leading-relaxed ${
                              msg.isClient
                                ? 'bg-blue-600 text-white rounded-tr-xs'
                                : 'bg-gray-100 text-gray-900 border border-gray-200 rounded-tl-xs'
                            }`}
                          >
                            <p className="whitespace-pre-line">{msg.text}</p>
                            {msg.attachmentName && (
                              <div className="mt-2 pt-2 border-t border-blue-400/50 flex items-center gap-1.5 text-[11px] font-semibold text-blue-100">
                                <Paperclip className="w-3.5 h-3.5" />
                                <span>Attached: {msg.attachmentName}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Composer */}
                  <form onSubmit={handleSendMessage} className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-semibold text-gray-600">Priority:</span>
                      <button
                        type="button"
                        onClick={() => setSelectedPriority('routine')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          selectedPriority === 'routine'
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-500 hover:text-black'
                        }`}
                      >
                        General Update
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPriority('priority')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          selectedPriority === 'priority'
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-500 hover:text-black'
                        }`}
                      >
                        Priority (2h SLA)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPriority('urgent')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          selectedPriority === 'urgent'
                            ? 'bg-red-100 text-red-700'
                            : 'text-gray-500 hover:text-black'
                        }`}
                      >
                        Urgent Blocker
                      </button>
                    </div>

                    <div className="relative">
                      <textarea
                        rows={3}
                        value={clientMessageText}
                        onChange={(e) => setClientMessageText(e.target.value)}
                        placeholder="Write a message, request specification adjustments, or ask architectural questions..."
                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-blue-600 focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="cursor-pointer text-xs text-gray-600 hover:text-blue-600 flex items-center gap-1.5 font-medium">
                        <Paperclip className="w-4 h-4" />
                        <span>{attachedFileName || 'Attach file or screenshot'}</span>
                        <input
                          type="file"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setAttachedFileName(e.target.files[0].name);
                            }
                          }}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="submit"
                        disabled={isSending}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSending ? 'Dispatching...' : 'Dispatch Message'}</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Company Emergency Contacts & Lead Architect */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block pb-2 border-b border-gray-100">
                      Direct Escalation Channels
                    </span>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-gray-400 font-mono block text-[11px]">Assigned Executive Lead:</span>
                        <span className="font-bold text-gray-900 text-sm block">Abdul Samad Rind</span>
                        <span className="text-blue-600 font-semibold text-[11px] block">Founder &amp; CEO, ORBIT-I</span>
                      </div>

                      <div className="pt-2 border-t border-gray-100">
                        <span className="text-gray-400 font-mono block text-[11px]">Direct WhatsApp Channel:</span>
                        <a
                          href="https://wa.me/923190375751"
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-emerald-600 hover:underline flex items-center gap-1.5 mt-0.5"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>+92 3190375751</span>
                        </a>
                      </div>

                      <div className="pt-2 border-t border-gray-100">
                        <span className="text-gray-400 font-mono block text-[11px]">Corporate Priority Email:</span>
                        <a
                          href="mailto:contactus@orbit-i.tech"
                          className="font-bold text-gray-900 hover:text-blue-600 hover:underline block mt-0.5"
                        >
                          contactus@orbit-i.tech
                        </a>
                      </div>

                      <div className="pt-3">
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                          <span className="text-xs font-bold text-emerald-900 block flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            Guaranteed Response SLA
                          </span>
                          <p className="text-[11px] text-emerald-800 leading-relaxed">
                            Under your current enterprise agreement, all priority inquiries submitted through this portal are guaranteed a response within 2 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DELIVERABLES & FILES HUB (SEND & RECEIVE) */}
            {activeTab === 'docs' && (
              <div className="space-y-6">
                {/* Upload to ORBIT-I Box */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-3">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        Send Files or Requirements to ORBIT-I
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Upload specification documents, brand assets, or review notes directly to your engineering team.
                      </p>
                    </div>
                  </div>

                  <label className="border-2 border-dashed border-gray-300 hover:border-blue-500 bg-gray-50/70 hover:bg-blue-50/30 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                    <input type="file" onChange={handleClientFileUpload} className="hidden" />
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-gray-900">
                      Click to choose files or drag &amp; drop
                    </span>
                    <span className="text-[11px] text-gray-500 mt-0.5">
                      PDF, DOCX, ZIP, PNG, JPG, JSON (Up to 25MB)
                    </span>
                  </label>

                  {/* Uploaded Files History */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-mono font-bold text-gray-400 uppercase block">
                        Files Transmitted to ORBIT-I
                      </span>
                      <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
                        {uploadedFiles.map((f) => (
                          <div key={f.id} className="p-3 bg-white flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2.5">
                              <FileText className="w-4 h-4 text-blue-600" />
                              <span className="font-semibold text-gray-900">{f.name}</span>
                              <span className="text-[10px] text-gray-400 font-mono">({f.size})</span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              {f.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Verified Deliverables from ORBIT-I */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
                  <div className="pb-3 border-b border-gray-100">
                    <h3 className="text-base font-bold text-gray-900">
                      Official Deliverables Received from ORBIT-I
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Signed architecture blueprints, database schemas, API documentation, and audit certificates.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentProject.documents.map((doc, idx) => (
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
                              {doc.type} · {doc.size} · Updated {doc.date}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDownload(doc.name)}
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
            )}

            {/* TAB 4: PRIVATE REPOSITORY & DEPLOYMENT */}
            {activeTab === 'repo' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Private Codebase &amp; Repository Access
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Direct GitHub access granted under strict IP protection and organizational two-factor authentication.
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full text-xs font-mono font-bold">
                    100% IP ASSIGNED
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono text-gray-500 uppercase font-bold block">
                      CI/CD Pipeline
                    </span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Build Passing (100%)</span>
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono text-gray-500 uppercase font-bold block">
                      Staging Environment
                    </span>
                    <span className="font-bold text-gray-900 font-mono">
                      staging.{currentProject.clientOrg.toLowerCase().replace(/\s+/g, '')}.orbit-i.tech
                    </span>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono text-gray-500 uppercase font-bold block">
                      Penetration Audit
                    </span>
                    <span className="font-bold text-gray-900 font-mono">
                      Grade A+ (Zero High CVEs)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: MILESTONE INVOICING & PAYMENTS */}
            {activeTab === 'invoices' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Milestone Invoicing &amp; Payment Records
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Transparent accounting of approved milestone deliverables and escrow settlement for {currentProject.clientOrg}.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Currency: USD ($)
                  </span>
                </div>

                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-mono text-[10px] border-b border-gray-200">
                      <tr>
                        <th className="py-3 px-4">Invoice #</th>
                        <th className="py-3 px-4">Milestone Description</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Amount</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-right">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-gray-50/50">
                          <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{inv.id}</td>
                          <td className="py-3.5 px-4 font-semibold text-gray-900">{inv.title}</td>
                          <td className="py-3.5 px-4 font-mono text-gray-500">{inv.date}</td>
                          <td className="py-3.5 px-4 font-mono font-bold text-gray-900 text-right">
                            {inv.amount}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                                inv.status === 'Paid'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {inv.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => showToast(`Receipt ${inv.id} downloaded.`)}
                              className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
