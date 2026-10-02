import React from 'react';
import {
  LayoutDashboard,
  GitBranch,
  FileText,
  MessageSquare,
  ShieldCheck,
  Folder,
  LogOut,
  CreditCard,
  Zap,
  X,
  Mail,
  Building2,
  Lock,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/orbitData';
import { ClientProject } from '../../types';

interface ClientSidebarProps {
  activeTab: 'overview' | 'repo' | 'docs' | 'support' | 'invoices';
  onSelectTab: (tab: 'overview' | 'repo' | 'docs' | 'support' | 'invoices') => void;
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
  currentProject: ClientProject;
  isOpen?: boolean;
  onClose?: () => void;
  user?: {
    name: string;
    email: string;
    role: string;
    company?: string;
  } | null;
  onLogout?: () => void;
}

export const ClientSidebar: React.FC<ClientSidebarProps> = ({
  activeTab,
  onSelectTab,
  currentProject,
  isOpen = true,
  onClose,
  user,
  onLogout,
}) => {
  const clientName = user?.name || 'Client Representative';
  const clientOrg = user?.company || currentProject.clientOrg || 'Client Organization';
  const clientEmail = user?.email || 'client@company.com';

  const handleTabClick = (tab: 'overview' | 'repo' | 'docs' | 'support' | 'invoices') => {
    onSelectTab(tab);
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  const navItems = [
    {
      id: 'overview' as const,
      label: 'Project Overview & Roadmap',
      icon: LayoutDashboard,
      badge: `${currentProject.progressPercent}%`,
      badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'support' as const,
      label: 'Direct Channel with ORBIT-I',
      icon: MessageSquare,
      badge: '2h SLA',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'docs' as const,
      label: 'Deliverables & Files Hub',
      icon: Folder,
      badge: `${currentProject.documents.length}`,
      badgeColor: 'bg-gray-100 text-gray-700',
    },
    {
      id: 'repo' as const,
      label: 'Private Git & Deployment',
      icon: GitBranch,
      badge: 'SSH',
      badgeColor: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'invoices' as const,
      label: 'Milestone Invoicing & Pay',
      icon: CreditCard,
      badge: 'Escrow',
      badgeColor: 'bg-amber-100 text-amber-700',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-2xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar Container: Sleek, static on desktop, strictly isolated to logged-in client */}
      <aside
        className={`fixed lg:static inset-y-0 lg:inset-auto left-0 h-full z-50 lg:z-20 bg-white border-r border-gray-200 flex flex-col justify-between transition-all duration-300 ease-in-out select-none shrink-0 ${
          isOpen
            ? 'w-64 translate-x-0 opacity-100 shadow-xl lg:shadow-none'
            : '-translate-x-full lg:w-0 lg:-translate-x-full lg:opacity-0 lg:overflow-hidden lg:border-r-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden min-h-0 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          {/* Brand Header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-gray-150 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <span className="font-extrabold text-sm tracking-tight">O•i</span>
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

          {/* Logged-in Client Organization Card (Isolated to Current Org Only) */}
          <div className="p-3.5 mx-3 my-3 bg-gray-50 rounded-xl border border-gray-200/80 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="truncate min-w-0">
                <div className="text-xs font-bold text-gray-900 truncate">{clientOrg}</div>
                <div className="text-[10px] text-gray-500 truncate">{clientName}</div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-200/60 flex items-center justify-between text-[10px] text-gray-400 font-mono">
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Isolated Workspace
              </span>
              <span>256-Bit SSL</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="px-3 pb-6 space-y-1.5 text-xs">
            <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-2 mb-2">
              Workspace Navigation
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full font-mono shrink-0 ml-1 ${
                        isActive ? 'bg-white/20 text-white' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Assigned Executive Lead & Direct Hotline */}
        <div className="p-3 border-t border-gray-150 bg-gray-50/70 space-y-2 shrink-0">
          <div className="flex items-center gap-2.5 p-2 bg-white rounded-xl border border-gray-200">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 shrink-0 bg-blue-600">
              <img
                src="/AbdulSamad.jpeg"
                alt="Abdul Samad Rind"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="truncate min-w-0">
              <span className="text-[9px] font-mono uppercase text-gray-400 font-bold block">
                Assigned Lead
              </span>
              <span className="text-xs font-bold text-gray-900 block truncate">Abdul Samad Rind</span>
            </div>
            <a
              href={`https://wa.me/923190375751`}
              target="_blank"
              rel="noreferrer"
              className="ml-auto p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-2xs shrink-0"
              title="Direct WhatsApp to CEO"
            >
              <Zap className="h-3.5 w-3.5" />
            </a>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full px-3 py-1.5 bg-white hover:bg-red-50 text-red-600 border border-gray-200 hover:border-red-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
