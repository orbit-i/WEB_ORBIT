import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  LayoutDashboard,
  Users,
  Cpu,
  Award,
  MessageSquare,
  Building2,
  Database,
  Sliders,
  FileText,
  Image,
  Search,
  Activity,
  Globe,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  LogOut,
  FolderKanban,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Layers,
  X,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/orbitData';

export type AdminNavigationTab =
  | 'dashboard'
  | 'sales_report'
  | 'ecommerce'
  | 'analytics'
  | 'team'
  | 'services'
  | 'certificates'
  | 'inquiries'
  | 'company'
  | 'database'
  | 'operations'
  | 'content'
  | 'media'
  | 'legal'
  | 'seo'
  | 'cookies_data'
  | 'tags_urls'
  | 'governance'
  | 'staff_access';

interface DashboardSidebarProps {
  activeTab: AdminNavigationTab;
  onSelectTab: (tab: AdminNavigationTab) => void;
  isOpen?: boolean;
  onClose?: () => void;
  user?: {
    name: string;
    email: string;
    role: string;
  } | null;
  onLogout?: () => void;
  inquiryCount?: number;
  articleCount?: number;
  mediaCount?: number;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpen = true,
  onClose,
  user,
  onLogout,
  inquiryCount = 12,
  articleCount = 6,
  mediaCount = 18,
}) => {
  const [dashboardExpanded, setDashboardExpanded] = useState<boolean>(true);
  const [appsExpanded, setAppsExpanded] = useState<boolean>(true);

  const roleStr = (user?.role || '').toLowerCase();
  const isWriter = roleStr === 'content_writer' || roleStr.includes('writer');
  const isSeo = roleStr === 'seo_specialist' || roleStr.includes('seo');
  const isManager = roleStr === 'manager';
  const isSuperadmin =
    roleStr === 'superadmin' ||
    roleStr.includes('founder') ||
    roleStr.includes('ceo') ||
    !roleStr;

  const userName = user?.name || 'Administrator';
  const userRole = isWriter
    ? 'Content Writer & Specialist'
    : isSeo
    ? 'SEO & Search Engine Specialist'
    : isManager
    ? 'Operations Manager'
    : isSuperadmin
    ? 'Superadmin'
    : 'Executive Administrator';
  const userEmail = user?.email || 'admin@orbit-i.tech';

  const handleTabClick = (tab: AdminNavigationTab) => {
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
                <span className="text-sm font-bold text-gray-900 leading-tight">
                  {user?.role === 'superadmin'
                    ? 'Superadmin Console'
                    : user?.role === 'content_writer'
                    ? 'Editorial Console'
                    : isSeo
                    ? 'SEO & Search Console'
                    : isManager
                    ? 'Operations Console'
                    : 'Executive Admin'}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">ORBIT-I LTD · Enterprise Engine</span>
              </div>
            </div>

            {/* Mobile close button */}
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
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 shrink-0 shadow-2xs bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                {user?.name?.toLowerCase().includes('abdul samad') ? (
                  <img
                    src="/AbdulSamad.jpeg"
                    alt={userName}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/AbdulSamad.jpeg';
                    }}
                  />
                ) : (
                  <span>{userName ? userName.slice(0, 2).toUpperCase() : 'AD'}</span>
                )}
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-gray-900 truncate">{userName}</div>
                <div className="text-[10px] text-blue-600 font-semibold truncate font-mono">{userRole}</div>
              </div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          </div>

          {/* Navigation Menu */}
          {isWriter ? (
            <nav className="px-3 pb-6 space-y-4 text-xs">
              <div>
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-3 mb-1.5">
                  Editorial &amp; Media Scope
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => handleTabClick('content')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'content'
                        ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4" />
                      <span>Articles &amp; Blog CMS</span>
                    </div>
                    <span className="text-[10px] font-mono">({articleCount})</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('media')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'media'
                        ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Image className="h-4 w-4" />
                      <span>Media Assets Library</span>
                    </div>
                    <span className="text-[10px] font-mono">({mediaCount})</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-150 text-[11px] text-blue-900 leading-snug space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-blue-950">
                  <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                  <span>Restricted Editorial Scope</span>
                </div>
                <p className="text-[10px] text-blue-800">
                  Account restricted exclusively to writing, drafting, and publishing engineering blog posts and media assets.
                </p>
              </div>
            </nav>
          ) : isSeo ? (
            <nav className="px-3 pb-6 space-y-4 text-xs">
              <div>
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-3 mb-1.5">
                  Search &amp; Indexing Scope
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => handleTabClick('seo')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'seo'
                        ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Search className="h-4 w-4" />
                      <span>SEO &amp; Schema Master</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleTabClick('tags_urls')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'tags_urls'
                        ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="h-4 w-4" />
                      <span>Sitemaps &amp; URLs</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleTabClick('cookies_data')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'cookies_data'
                        ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Activity className="h-4 w-4" />
                      <span>IP Telemetry &amp; Audit</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleTabClick('content')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'content'
                        ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4" />
                      <span>Articles (SEO Audit)</span>
                    </div>
                    <span className="text-[10px] font-mono">({articleCount})</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-150 text-[11px] text-emerald-900 leading-snug space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-950">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>SEO Specialist Scope</span>
                </div>
                <p className="text-[10px] text-emerald-800">
                  Account dedicated to meta tags, structured data, canonical URLs, sitemaps, and search index telemetry.
                </p>
              </div>
            </nav>
          ) : isManager ? (
            <nav className="px-3 pb-6 space-y-4 text-xs">
              <div>
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-3 mb-1.5">
                  Operations &amp; Delivery Scope
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => handleTabClick('sales_report')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'sales_report' || activeTab === 'dashboard'
                        ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <TrendingUp className="h-4 w-4" />
                      <span>Operations Dashboard</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleTabClick('inquiries')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'inquiries'
                        ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="h-4 w-4" />
                      <span>Client CRM &amp; Inquiries</span>
                    </div>
                    <span className="text-[10px] font-mono">({inquiryCount})</span>
                  </button>

                  <button
                    onClick={() => handleTabClick('team')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'team'
                        ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FolderKanban className="h-4 w-4" />
                      <span>Jobs &amp; Team Roster</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleTabClick('services')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'services'
                        ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Cpu className="h-4 w-4" />
                      <span>Verified Services</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleTabClick('certificates')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'certificates'
                        ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Award className="h-4 w-4" />
                      <span>Certificates &amp; Verification</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-150 text-[11px] text-amber-900 leading-snug space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                  <span>Operations Manager Scope</span>
                </div>
                <p className="text-[10px] text-amber-800">
                  Account assigned to oversee client inquiries, team assignments, service catalogues, and project delivery verification.
                </p>
              </div>
            </nav>
          ) : (
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

                  {/* Submenu Items */}
                  {dashboardExpanded && (
                    <div className="ml-5 pl-3 border-l border-gray-200 space-y-0.5 my-1">
                      <button
                        onClick={() => handleTabClick('sales_report')}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-[11px] font-medium transition-colors ${
                          activeTab === 'sales_report' || activeTab === 'dashboard'
                            ? 'text-blue-600 font-bold bg-blue-50/60'
                            : 'text-gray-600 hover:text-black hover:bg-gray-50'
                        }`}
                      >
                        Modern/Home
                      </button>
                      <button
                        onClick={() => handleTabClick('sales_report')}
                        className="w-full text-left px-3 py-1.5 rounded-md text-[11px] font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                      >
                        e-Commerce Dashboard
                      </button>
                      <button
                        onClick={() => handleTabClick('cookies_data')}
                        className="w-full text-left px-3 py-1.5 rounded-md text-[11px] font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                      >
                        Analytics &amp; Telemetry
                      </button>
                      <button
                        onClick={() => handleTabClick('operations')}
                        className="w-full text-left px-3 py-1.5 rounded-md text-[11px] font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                      >
                        Infrastructure &amp; Operations
                      </button>
                      <button
                        onClick={() => handleTabClick('inquiries')}
                        className="w-full text-left px-3 py-1.5 rounded-md text-[11px] font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                      >
                        Support System
                      </button>
                    </div>
                  )}
                </div>

                {/* Sales Report (Highlighted Pill in Reference Image) */}
                <button
                  onClick={() => handleTabClick('sales_report')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'sales_report' || activeTab === 'dashboard'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <TrendingUp
                      className={`h-4 w-4 ${
                        activeTab === 'sales_report' || activeTab === 'dashboard'
                          ? 'text-white'
                          : 'text-blue-600'
                      }`}
                    />
                    <span>Sales Report</span>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      activeTab === 'sales_report' || activeTab === 'dashboard'
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    Active
                  </span>
                </button>

                {/* Media Assets */}
                <button
                  onClick={() => handleTabClick('media')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'media'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Image className="h-4 w-4 text-gray-500" />
                    <span>Media Assets</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">({mediaCount})</span>
                </button>

                {/* Material / Certificates */}
                <button
                  onClick={() => handleTabClick('certificates')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'certificates'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="h-4 w-4 text-gray-500" />
                    <span>Material &amp; Certs</span>
                  </div>
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                </button>

                {/* CRM / Clients */}
                <button
                  onClick={() => handleTabClick('inquiries')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'inquiries'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>CRM &amp; Clients</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">({inquiryCount})</span>
                </button>

                {/* Job Info / Team (with Red "NEW" badge from image) */}
                <button
                  onClick={() => handleTabClick('team')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'team'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FolderKanban className="h-4 w-4 text-gray-500" />
                    <span>Job Info &amp; Team</span>
                  </div>
                  <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                    NEW
                  </span>
                </button>
              </div>
            </div>

            {/* Section: LAYOUT & CMS */}
            <div>
              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-3 mb-1.5">
                Layout &amp; CMS
              </div>

              <div className="space-y-0.5">
                {/* Services CMS */}
                <button
                  onClick={() => handleTabClick('services')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'services'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Cpu className="h-4 w-4 text-gray-500" />
                    <span>Verified Services</span>
                  </div>
                </button>

                {/* Articles CMS */}
                <button
                  onClick={() => handleTabClick('content')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'content'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span>Articles &amp; Blog</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">({articleCount})</span>
                </button>

                {/* Company Profile & SECP */}
                <button
                  onClick={() => handleTabClick('company')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'company'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <span>Company &amp; SECP</span>
                  </div>
                </button>

                {/* Database & Cloud Storage */}
                <button
                  onClick={() => handleTabClick('database')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'database'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Database className="h-4 w-4 text-blue-600" />
                    <span>Database &amp; Storage</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </button>
              </div>
            </div>

            {/* Section: APPS & GOVERNANCE */}
            <div>
              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-3 mb-1.5">
                Apps &amp; Governance
              </div>

              <div className="space-y-0.5">
                {/* Operations & Maintenance */}
                <button
                  onClick={() => handleTabClick('operations')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'operations'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sliders className="h-4 w-4 text-gray-500" />
                    <span>Site Ops &amp; Lockout</span>
                  </div>
                </button>

                {/* Legal Policies */}
                <button
                  onClick={() => handleTabClick('legal')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'legal'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-gray-500" />
                    <span>Legal Policies</span>
                  </div>
                </button>

                {/* SEO & Indexing */}
                <button
                  onClick={() => handleTabClick('seo')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'seo'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Search className="h-4 w-4 text-gray-500" />
                    <span>SEO &amp; Schema</span>
                  </div>
                </button>

                {/* Cookies & Telemetry */}
                <button
                  onClick={() => handleTabClick('cookies_data')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'cookies_data'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className="h-4 w-4 text-gray-500" />
                    <span>IP Telemetry Audit</span>
                  </div>
                </button>

                {/* Tags & URLs */}
                <button
                  onClick={() => handleTabClick('tags_urls')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'tags_urls'
                      ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                      : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span>Sitemaps &amp; URLs</span>
                  </div>
                </button>

                {/* Staff & Access Control (Superadmin & Executive Admin) */}
                {(isSuperadmin || roleStr === 'admin') && (
                  <button
                    onClick={() => handleTabClick('staff_access')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                      activeTab === 'staff_access'
                        ? 'bg-[#2f6fed] text-white shadow-sm font-semibold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="h-4 w-4 text-purple-600" />
                      <span>Staff &amp; Access Control</span>
                    </div>
                    <span className="bg-purple-100 text-purple-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                      RBAC
                    </span>
                  </button>
                )}
              </div>
            </div>
          </nav>
        )}
        </div>

        {/* Footer info & Logout */}
        <div className="p-3 border-t border-gray-150 bg-gray-50/50">
          <div className="flex items-center justify-between px-2 text-[11px] text-gray-500 mb-2">
            <span className="flex items-center gap-1 font-mono text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              256-Bit SSL Secured
            </span>
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
