import React, { useState } from 'react';
import {
  Users,
  FolderKanban,
  CreditCard,
  MessageSquare,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  DollarSign,
  Search,
  Filter,
  X,
  Save,
  Send,
  Building2,
  Phone,
  Mail,
  Calendar,
  Layers,
} from 'lucide-react';
import { INITIAL_CLIENTS } from '../../data/orbitData';
import { ClientRecord, ClientProject, ClientQueryRecord, ClientPaymentRecord } from '../../types';
import { isClientPortalEnabled, setClientPortalEnabled } from '../../services/portalConfigService';

interface ClientsCmsProps {
  showNotification: (msg: string) => void;
}

export const ClientsCms: React.FC<ClientsCmsProps> = ({ showNotification }) => {
  const [portalEnabled, setPortalEnabled] = useState<boolean>(isClientPortalEnabled());
  const [clients, setClients] = useState<ClientRecord[]>(() => {
    try {
      const saved = localStorage.getItem('orbit_admin_clients_v2');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CLIENTS;
  });

  const handleTogglePortal = () => {
    const next = !portalEnabled;
    setPortalEnabled(next);
    setClientPortalEnabled(next);
    showNotification(
      next
        ? 'Client Organization Portal is now ONLINE & accessible.'
        : 'Client Organization Portal is now RESTRICTED & hidden from public menus.'
    );
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || 'cli-001');
  const [activeTab, setActiveTab] = useState<'projects' | 'queries' | 'payments' | 'details'>('projects');

  // Modal States
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isReplyQueryOpen, setIsReplyQueryOpen] = useState(false);
  const [activeQuery, setActiveQuery] = useState<ClientQueryRecord | null>(null);
  const [replyText, setReplyText] = useState('');

  // New Client Form State
  const [newClientName, setNewClientName] = useState('');
  const [newClientOrg, setNewClientOrg] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientCountry, setNewClientCountry] = useState('United Arab Emirates');
  const [newClientContract, setNewClientContract] = useState('25000');

  // New Project Form State
  const [newPrjTitle, setNewPrjTitle] = useState('');
  const [newPrjService, setNewPrjService] = useState('Web Application & Custom ERP');
  const [newPrjMilestone, setNewPrjMilestone] = useState('Phase 1: Architecture & Data Modeling');
  const [newPrjProgress, setNewPrjProgress] = useState(25);

  // New Payment Form State
  const [newPayTitle, setNewPayTitle] = useState('');
  const [newPayAmount, setNewPayAmount] = useState('5000');
  const [newPayStatus, setNewPayStatus] = useState<'Paid' | 'Pending' | 'Overdue'>('Paid');
  const [newPayInvoice, setNewPayInvoice] = useState(`INV-2026-${Math.floor(100 + Math.random() * 900)}`);

  const saveClients = (updated: ClientRecord[]) => {
    setClients(updated);
    try {
      localStorage.setItem('orbit_admin_clients_v2', JSON.stringify(updated));
    } catch {}
  };

  const selectedClient = clients.find((c) => c.id === selectedClientId) || clients[0];

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Add Client
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientOrg || !newClientEmail) {
      showNotification('Organization and email are required.');
      return;
    }

    const newRecord: ClientRecord = {
      id: `cli-${Date.now()}`,
      name: newClientName || newClientOrg,
      organization: newClientOrg,
      email: newClientEmail,
      phone: newClientPhone,
      country: newClientCountry,
      status: 'Active',
      totalContractValue: parseFloat(newClientContract) || 10000,
      paidAmount: 0,
      currency: 'USD',
      projects: [],
      queries: [],
      payments: [],
      joinedDate: new Date().toISOString().slice(0, 10),
    };

    const next = [newRecord, ...clients];
    saveClients(next);
    setSelectedClientId(newRecord.id);
    setIsAddClientOpen(false);
    showNotification(`Client "${newClientOrg}" registered successfully.`);
    setNewClientName('');
    setNewClientOrg('');
    setNewClientEmail('');
    setNewClientPhone('');
  };

  // Handle Add Project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrjTitle || !selectedClient) return;

    const newPrj: ClientProject = {
      id: `prj-${Date.now()}`,
      title: newPrjTitle,
      clientOrg: selectedClient.organization,
      serviceType: newPrjService,
      status: 'Active',
      health: 'Optimal',
      startDate: new Date().toISOString().slice(0, 10),
      estimatedCompletion: '2026-08-30',
      progressPercent: newPrjProgress,
      currentMilestone: newPrjMilestone,
      recentDeliverable: 'Project Initiated & Scope Approved',
      repositoryAccess: 'Configured in Client Portal',
      securityAuditPassed: true,
      documents: [
        { name: 'Technical_Scope_Agreement.pdf', date: new Date().toISOString().slice(0, 10), type: 'PDF Spec', size: '1.2 MB' },
      ],
    };

    const next = clients.map((c) => {
      if (c.id === selectedClient.id) {
        return {
          ...c,
          projects: [...c.projects, newPrj],
        };
      }
      return c;
    });

    saveClients(next);
    setIsAddProjectOpen(false);
    showNotification(`Project "${newPrjTitle}" added to ${selectedClient.organization}.`);
    setNewPrjTitle('');
  };

  // Handle Add Payment
  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayTitle || !selectedClient) return;

    const parsedAmount = parseFloat(newPayAmount) || 0;
    const newPay: ClientPaymentRecord = {
      id: `pay-${Date.now()}`,
      title: newPayTitle,
      amount: parsedAmount,
      currency: 'USD',
      status: newPayStatus,
      date: new Date().toISOString().slice(0, 10),
      invoiceNumber: newPayInvoice,
    };

    const next = clients.map((c) => {
      if (c.id === selectedClient.id) {
        const newPaid = newPayStatus === 'Paid' ? c.paidAmount + parsedAmount : c.paidAmount;
        return {
          ...c,
          paidAmount: newPaid,
          payments: [...c.payments, newPay],
        };
      }
      return c;
    });

    saveClients(next);
    setIsAddPaymentOpen(false);
    showNotification(`Invoice "${newPayInvoice}" registered.`);
    setNewPayTitle('');
  };

  // Handle Query Reply
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuery || !selectedClient) return;

    const next = clients.map((c) => {
      if (c.id === selectedClient.id) {
        return {
          ...c,
          queries: c.queries.map((q) =>
            q.id === activeQuery.id ? { ...q, status: 'Answered' as const, response: replyText } : q
          ),
        };
      }
      return c;
    });

    saveClients(next);
    setIsReplyQueryOpen(false);
    showNotification(`Response dispatched to client inquiry "${activeQuery.subject}".`);
    setReplyText('');
    setActiveQuery(null);
  };

  // Total Metrics Calculations
  const totalRetainers = clients.reduce((acc, c) => acc + c.totalContractValue, 0);
  const totalCollected = clients.reduce((acc, c) => acc + c.paidAmount, 0);
  const totalPending = totalRetainers - totalCollected;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Client Organization &amp; CRM Management Hub
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage institutional clients, active engineering projects, milestone invoices, and direct inquiries.
          </p>
        </div>

        <button
          onClick={() => setIsAddClientOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Register New Client</span>
        </button>
      </div>

      {/* Superadmin Client Portal Access Gate (ON / OFF Switch) */}
      <div className="p-4 bg-gradient-to-r from-gray-900 to-blue-950 text-white rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-blue-900/50">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Superadmin Gatekeeper
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                portalEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-red-500/20 text-red-300 border border-red-500/40'
              }`}
            >
              {portalEnabled ? 'ONLINE & ACTIVE' : 'OFFLINE & RESTRICTED'}
            </span>
          </div>
          <h3 className="text-sm font-bold text-white">
            Client Organization Portal Access Gate
          </h3>
          <p className="text-xs text-gray-300 max-w-xl">
            When disabled (OFF), Client Portal links are hidden from public menus, and direct client workspace logins are restricted.
          </p>
        </div>

        {/* ON / OFF Toggle Switch */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-bold font-mono text-gray-300">
            {portalEnabled ? 'PORTAL: ON' : 'PORTAL: OFF'}
          </span>
          <button
            type="button"
            onClick={handleTogglePortal}
            className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              portalEnabled ? 'bg-emerald-500' : 'bg-gray-600'
            }`}
            title={portalEnabled ? 'Click to Disable Client Portal' : 'Click to Enable Client Portal'}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                portalEnabled ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Real Financial & Operations Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-mono text-gray-500 uppercase font-semibold">Active Clients</span>
          <div className="text-2xl font-bold text-gray-900">{clients.length}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">100% Contract Delivery SLA</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-mono text-gray-500 uppercase font-semibold">Total Contracts Value</span>
          <div className="text-2xl font-bold text-gray-900">${totalRetainers.toLocaleString()}</div>
          <span className="text-[10px] text-blue-600 font-semibold">Milestone-Based Scope</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-mono text-gray-500 uppercase font-semibold">Verified Receipts (Paid)</span>
          <div className="text-2xl font-bold text-emerald-600">${totalCollected.toLocaleString()}</div>
          <span className="text-[10px] text-gray-500 font-mono">Settled via Banking / Wire</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-1">
          <span className="text-[11px] font-mono text-gray-500 uppercase font-semibold">Milestone Balance (Pending)</span>
          <div className="text-2xl font-bold text-amber-600">${totalPending.toLocaleString()}</div>
          <span className="text-[10px] text-amber-700 font-semibold">In Escrow / Final Signoff</span>
        </div>
      </div>

      {/* Main Dual-Column CRM Layout: Client List on Left, Active Workspace on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (4 Cols): Client Directory */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden flex flex-col">
          {/* Search Box */}
          <div className="p-3 border-b border-gray-150 bg-gray-50/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients, email, org..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Client Items List */}
          <div className="divide-y divide-gray-100 max-h-[520px] overflow-y-auto">
            {filteredClients.map((client) => {
              const isSelected = client.id === selectedClientId;
              return (
                <button
                  key={client.id}
                  onClick={() => setSelectedClientId(client.id)}
                  className={`w-full text-left p-4 transition-colors flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-blue-50/80 border-l-4 border-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-gray-900 truncate">
                        {client.organization}
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                          client.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {client.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 truncate">{client.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono truncate">{client.email}</div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-gray-900 font-mono">
                      ${client.totalContractValue.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold font-mono">
                      ${client.paidAmount.toLocaleString()} Paid
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 Cols): Selected Client Workspaces, Projects, Inquiries & Payments */}
        {selectedClient && (
          <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-6">
            {/* Client Top Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-200 gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-lg font-bold text-gray-900">{selectedClient.organization}</h3>
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                    {selectedClient.country}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5 flex flex-wrap items-center gap-3">
                  <span>Contact: <strong>{selectedClient.name}</strong></span>
                  <span>·</span>
                  <span className="font-mono">{selectedClient.email}</span>
                  {selectedClient.phone && (
                    <>
                      <span>·</span>
                      <span className="font-mono">{selectedClient.phone}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Progress Summary Bar */}
              <div className="text-right">
                <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block">Settlement Ratio</span>
                <span className="text-xs font-bold text-gray-900 font-mono">
                  ${selectedClient.paidAmount.toLocaleString()} / ${selectedClient.totalContractValue.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Sub-Tabs: Projects | Queries | Payments | Details */}
            <div className="flex items-center justify-between border-b border-gray-150 pb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'projects'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FolderKanban className="h-3.5 w-3.5" />
                  <span>Projects ({selectedClient.projects.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('queries')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'queries'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Queries &amp; Tickets ({selectedClient.queries.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('payments')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    activeTab === 'payments'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  <span>Milestone Payments ({selectedClient.payments.length})</span>
                </button>
              </div>

              {/* Contextual Action Button */}
              {activeTab === 'projects' && (
                <button
                  onClick={() => setIsAddProjectOpen(true)}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add Project</span>
                </button>
              )}
              {activeTab === 'payments' && (
                <button
                  onClick={() => setIsAddPaymentOpen(true)}
                  className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                  <span>New Invoice</span>
                </button>
              )}
            </div>

            {/* TAB 1: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                {selectedClient.projects.length === 0 ? (
                  <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-500">
                    No active engineering projects recorded yet for this client. Click &quot;Add Project&quot; above.
                  </div>
                ) : (
                  selectedClient.projects.map((prj) => (
                    <div
                      key={prj.id}
                      className="p-4 bg-gray-50/70 border border-gray-200 rounded-2xl space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{prj.title}</h4>
                          <span className="text-[11px] text-blue-600 font-semibold">{prj.serviceType}</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                          {prj.status}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                          <span className="text-[11px]">Milestone Delivery Progress</span>
                          <span className="font-mono text-[11px]">{prj.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            style={{ width: `${prj.progressPercent}%` }}
                            className="bg-blue-600 h-full rounded-full transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-gray-600 font-mono">
                        <div>Current: <strong className="text-gray-900">{prj.currentMilestone}</strong></div>
                        <div className="text-gray-500">Est. Target: {prj.estimatedCompletion}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 2: QUERIES & TICKETS */}
            {activeTab === 'queries' && (
              <div className="space-y-3">
                {selectedClient.queries.length === 0 ? (
                  <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-500">
                    No open support tickets or queries from this client.
                  </div>
                ) : (
                  selectedClient.queries.map((qry) => (
                    <div
                      key={qry.id}
                      className="p-4 bg-gray-50/70 border border-gray-200 rounded-2xl space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">{qry.subject}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-gray-400">{qry.date}</span>
                          <span
                            className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                              qry.status === 'Answered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {qry.status}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed">{qry.message}</p>

                      {qry.response ? (
                        <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-150 text-[11px] space-y-1">
                          <span className="font-bold text-blue-900 block">Engineering Team Response:</span>
                          <p className="text-blue-800">{qry.response}</p>
                        </div>
                      ) : (
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => {
                              setActiveQuery(qry);
                              setIsReplyQueryOpen(true);
                            }}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors"
                          >
                            Reply to Ticket
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 3: PAYMENTS & MILESTONES */}
            {activeTab === 'payments' && (
              <div className="space-y-3">
                {selectedClient.payments.length === 0 ? (
                  <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-500">
                    No invoices recorded for this client. Click &quot;New Invoice&quot; to add.
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-mono text-[10px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Invoice #</th>
                          <th className="py-2.5 px-3">Milestone Deliverable</th>
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3 text-right">Amount</th>
                          <th className="py-2.5 px-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedClient.payments.map((p) => (
                          <tr key={p.id} className="hover:bg-gray-50/50">
                            <td className="py-3 px-3 font-mono font-bold text-blue-600">{p.invoiceNumber}</td>
                            <td className="py-3 px-3 font-semibold text-gray-900">{p.title}</td>
                            <td className="py-3 px-3 font-mono text-gray-500 text-[11px]">{p.date}</td>
                            <td className="py-3 px-3 font-mono font-bold text-gray-900 text-right">
                              ${p.amount.toLocaleString()}
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span
                                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                  p.status === 'Paid'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {p.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal: Register New Client */}
      {isAddClientOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-150">
              <h3 className="text-base font-bold text-gray-900">Register New Client Account</h3>
              <button onClick={() => setIsAddClientOpen(false)} className="text-gray-400 hover:text-black">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddClient} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Organization / Company Name *</label>
                <input
                  type="text"
                  required
                  value={newClientOrg}
                  onChange={(e) => setNewClientOrg(e.target.value)}
                  placeholder="e.g. Apex Holdings LLC"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Contact Person Name</label>
                <input
                  type="text"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g. Tariq Mansoor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    placeholder="client@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    placeholder="+971..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={newClientCountry}
                    onChange={(e) => setNewClientCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Contract Value ($)</label>
                  <input
                    type="number"
                    value={newClientContract}
                    onChange={(e) => setNewClientContract(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddClientOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold"
                >
                  Register Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Project */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-150">
              <h3 className="text-base font-bold text-gray-900">Add Project to {selectedClient?.organization}</h3>
              <button onClick={() => setIsAddProjectOpen(false)} className="text-gray-400 hover:text-black">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={newPrjTitle}
                  onChange={(e) => setNewPrjTitle(e.target.value)}
                  placeholder="e.g. Enterprise Logistics Telemetry & Driver App"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Service Type</label>
                <select
                  value={newPrjService}
                  onChange={(e) => setNewPrjService(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 outline-none bg-white"
                >
                  <option value="Web Application & Custom ERP">Web Application &amp; Custom ERP</option>
                  <option value="Mobile Application (React Native / Flutter)">Mobile Application</option>
                  <option value="WordPress Headless CMS & Custom Code">WordPress &amp; Custom Coding</option>
                  <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure &amp; DevOps</option>
                  <option value="Enterprise API & Integrations">Enterprise API &amp; Integrations</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Initial Milestone Objective</label>
                <input
                  type="text"
                  value={newPrjMilestone}
                  onChange={(e) => setNewPrjMilestone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Initial Progress (%): {newPrjProgress}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newPrjProgress}
                  onChange={(e) => setNewPrjProgress(parseInt(e.target.value, 10))}
                  className="w-full"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Payment / Invoice */}
      {isAddPaymentOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-150">
              <h3 className="text-base font-bold text-gray-900">Register Invoice / Payment</h3>
              <button onClick={() => setIsAddPaymentOpen(false)} className="text-gray-400 hover:text-black">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddPayment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Invoice Number *</label>
                <input
                  type="text"
                  required
                  value={newPayInvoice}
                  onChange={(e) => setNewPayInvoice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Deliverable Description *</label>
                <input
                  type="text"
                  required
                  value={newPayTitle}
                  onChange={(e) => setNewPayTitle(e.target.value)}
                  placeholder="e.g. Phase 2 Backend Deployment Milestone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Amount ($ USD) *</label>
                  <input
                    type="number"
                    required
                    value={newPayAmount}
                    onChange={(e) => setNewPayAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Payment Status</label>
                  <select
                    value={newPayStatus}
                    onChange={(e) => setNewPayStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 outline-none bg-white"
                  >
                    <option value="Paid">Paid / Settled</option>
                    <option value="Pending">Pending / Invoiced</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPaymentOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold"
                >
                  Save Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Reply to Query */}
      {isReplyQueryOpen && activeQuery && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-150">
              <h3 className="text-base font-bold text-gray-900">Reply to Inquiry</h3>
              <button onClick={() => setIsReplyQueryOpen(false)} className="text-gray-400 hover:text-black">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1">
              <span className="font-bold text-gray-900 block">{activeQuery.subject}</span>
              <p className="text-gray-600">{activeQuery.message}</p>
            </div>

            <form onSubmit={handleSendReply} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Official Engineering Response</label>
                <textarea
                  rows={4}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Provide technical answer, resolution timeline, or milestone confirmation..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-blue-600 outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReplyQueryOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Response</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
