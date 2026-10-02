import React, { useState } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  GitBranch,
  FileText,
  MessageSquare,
  ShieldCheck,
  FolderKanban,
  ExternalLink,
  ChevronDown,
  LogOut,
  Folder,
  Phone,
  Mail,
  Zap,
  X,
} from 'lucide-react';
import { CLIENT_PROJECTS, COMPANY_INFO } from '../../data/orbitData';
import { ClientProject } from '../../types';

interface ClientSidebarProps {
  activeTab: 'overview' | 'repo' | 'docs' | 'support';
  onSelectTab: (tab: 'overview' | 'repo' | 'docs' | 'support') => void;
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
  currentProject: ClientProject;
  isOpen?: boolean;
  onClose?: () => void;
  user?: {
    name: string;
    email: string;
    role: string;
  } | null;
  onLogout?: () => void;
}

export const ClientSidebar: React.FC<ClientSidebarProps> = ({
  activeTab,
  onSelectTab,
  selectedProjectId,
  onSelectProject,
  currentProject,
  isOpen = true,
  onClose,
  user,
  onLogout,
}) => {
  const [dashboardExpanded, setDashboardExpanded] = useState<boolean>(true);
  const [projectsExpanded, setProjectsExpanded] = useState<boolean>(true);

  const clientName = user?.name || 'Tariq Mansoor';
  const clientOrg = currentProject.clientOrg || 'Apex Global Logistics';
  const clientEmail = user?.email || 'tariq@apexholdings.com';

  const handleTabClick = (tab: 'overview' | 'repo' | 'docs' | 'support') => {
    onSelectTab(tab);
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-2xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar Container: Sticky on desktop (never scrolls away), collapsible on toggle button click */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 left-0 bottom-0 lg:bottom-auto lg:h-[calc(100vh-4rem)] z-50 lg:z-30 bg-white border-r border-gray-200/90 flex flex-col justify-between transition-all duration-300 ease-in-out select-none shrink-0 ${
          isOpen
            ? 'w-64 translate-x-0 opacity-100 shadow-xl lg:shadow-none'
            : '-translate-x-full lg:w-0 lg:-translate-x-full lg:opacity-0 lg:overflow-hidden lg:border-r-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Brand Header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-gray-150">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <span className="font-extrabold text-sm tracking-tighter">O•iX</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 leading-tight">Client Portal</span>
                <span className="text-[10px] text-gray-400 font-medium">Enterprise Workspace</span>
              </div>
            </div>

            {/* Mobile close */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* User Profile Card (As seen in the picture) */}
          <div className="p-4 mx-3 my-3 bg-gray-50/80 rounded-xl border border-gray-200/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 shrink-0 bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shadow-2xs">
                TM
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-gray-900 truncate">{clientName}</div>
                <div className="text-[10px] text-blue-600 font-medium truncate">{clientOrg}</div>
              </div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          </div>

          {/* Navigation Menu */}
          <nav className="px-3 pb-6 space-y-5 text-xs">
            {/* Section: PERSONAL */}
            <div>
              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-3 mb-1.5">
                Personal
              </div>

              <div className="space-y-0.5">
                {/* Expandable Dashboard Item */}
                <div>
                  <button
                    onClick={() => setDashboardExpanded(!dashboardExpanded)}
                    className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-100/70 rounded-lg transition-colors font-medium"
                  >
                    <div className="flex items-center gap-2.5">
                      <LayoutDashboard className="h-4 w-4 text-gray-500" />
                      <span>Dashboard</span>
                    </div>
                    <ChevronDown
                      className={`h-3 w-3 text-gray-400 transition-transform ${
                        dashboardExpanded ? 'rotate-0' : '-rotate-90'
                      }`}
                    />
                  </button>

                  {/* Submenu */}
                  {dashboardExpanded && (
                    <div className="ml-5 pl-3 border-l border-gray-200 space-y-0.5 my-1">
                      <button
                        onClick={() => handleTabClick('overview')}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors ${
                          activeTab === 'overview'
                            ? 'text-blue-600 font-bold bg-blue-50/60'
                            : 'text-gray-600 hover:text-black hover:bg-gray-50'
                        }`}
                      >
                        Modern/Home
                      </button>
                      <button
                        onClick={() => handleTabClick('repo')}
                        className="w-full text-left px-3 py-1.5 rounded-md text-[11px] font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                      >
                        Source Repository
                      </button>
                      <button
                        onClick={() => handleTabClick('docs')}
                        className="w-full text-left px-3 py-1.5 rounded-md text-[11px] font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                      >
                        Audit Specifications
                      </button>
                    </div>
                  )}
                </div>

                {/* Status Report (Highlighted Pill in Reference Image) */}
                <button
                  onClick={() => handleTabClick('overview')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'overview'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <TrendingUp
                      className={`h-4 w-4 ${
                        activeTab === 'overview' ? 'text-white' : 'text-blue-600'
                      }`}
                    />
                    <span>Sales / Status Report</span>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      activeTab === 'overview'
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    Active
                  </span>
                </button>

                {/* Repository & IP */}
                <button
                  onClick={() => handleTabClick('repo')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'repo'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <GitBranch className="h-4 w-4 text-gray-500" />
                    <span>Repository &amp; IP</span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-mono">SSH</span>
                </button>

                {/* Documents & Audits */}
                <button
                  onClick={() => handleTabClick('docs')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'docs'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span>Documents &amp; Audits</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">
                    ({currentProject.documents.length})
                  </span>
                </button>

                {/* Direct Channel / Support (with RED 'NEW' or 'HOT' badge) */}
                <button
                  onClick={() => handleTabClick('support')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'support'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <span>Priority Channel</span>
                  </div>
                  <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                    SLA
                  </span>
                </button>
              </div>
            </div>

            {/* Section: ACTIVE CONTRACTS */}
            <div>
              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-3 mb-1.5">
                Active Contracts
              </div>

              <div className="space-y-1">
                {CLIENT_PROJECTS.map((prj) => {
                  const isCur = prj.id === selectedProjectId;
                  return (
                    <button
                      key={prj.id}
                      onClick={() => onSelectProject(prj.id)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                        isCur
                          ? 'border-blue-500 bg-blue-50/50 shadow-2xs'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-gray-900 truncate">{prj.title}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5 flex items-center justify-between">
                        <span>{prj.clientOrg}</span>
                        <span className="font-mono text-blue-600 font-semibold">{prj.progressPercent}%</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        {/* Assigned Executive Lead Card & Logout */}
        <div className="p-3 border-t border-gray-150 bg-gray-50/50 space-y-2">
          <div className="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-gray-200">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 shrink-0">
              <img
                src="/AbdulSamad.jpeg"
                alt="Abdul Samad Rind"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="truncate">
              <span className="text-[9px] font-mono uppercase text-gray-400 font-bold block">Lead Executive</span>
              <span className="text-xs font-bold text-gray-900 block truncate">Abdul Samad Rind</span>
            </div>
            <a
              href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="ml-auto p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-2xs"
              title="Direct WhatsApp"
            >
              <Zap className="h-3 w-3" />
            </a>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full px-3 py-1.5 bg-white hover:bg-red-50 text-red-600 border border-gray-200 hover:border-red-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
