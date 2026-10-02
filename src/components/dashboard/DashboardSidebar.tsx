import React from 'react';
import {
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
  ChevronRight,
  LogOut,
  FolderKanban,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Layers,
  X,
  CreditCard,
  SlidersHorizontal,
  Server,
  KeyRound,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/orbitData';

export type AdminNavigationTab =
  | 'dashboard'
  | 'sales_report'
  | 'clients'
  | 'pages'
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
    avatar?: string;
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
  inquiryCount = 8,
  articleCount = 6,
  mediaCount = 18,
}) => {
  const roleStr = (user?.role || '').toLowerCase();
  const isWriter = roleStr === 'content_writer' || roleStr.includes('writer');
  const isSeo = roleStr === 'seo_specialist' || roleStr.includes('seo');
  const isManager = roleStr === 'manager';
  const isSuperadmin =
    roleStr === 'superadmin' ||
    roleStr.includes('founder') ||
    roleStr.includes('ceo') ||
    !roleStr;

  const userName = user?.name || 'Abdul Samad';
  const userRole = isWriter
    ? 'Content Writer'
    : isSeo
    ? 'SEO Specialist'
    : isManager
    ? 'Operations Manager'
    : isSuperadmin
    ? 'Superadmin (Root)'
    : 'Executive Officer';

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

      {/* Sidebar Container: Sleek, fixed height, custom slim scrollbar, dignified styling */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 left-0 bottom-0 lg:bottom-auto lg:h-[calc(100vh-4rem)] z-50 lg:z-30 bg-white border-r border-gray-200/90 flex flex-col justify-between transition-all duration-300 ease-in-out select-none shrink-0 ${
          isOpen
            ? 'w-64 translate-x-0 opacity-100 shadow-xl lg:shadow-none'
            : '-translate-x-full lg:w-0 lg:-translate-x-full lg:opacity-0 lg:overflow-hidden lg:border-r-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          {/* Brand Header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-gray-150 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <span className="font-extrabold text-sm tracking-tight">O•i</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 leading-tight">
                  ORBIT-I LTD
                </span>
                <span className="text-[10px] text-gray-400 font-medium">Enterprise Engine</span>
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

          {/* User Profile Snippet */}
          <div className="p-3 mx-3 my-3 bg-gray-50/90 rounded-xl border border-gray-200/80 flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-blue-200 shrink-0 shadow-2xs bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              {user?.avatar ? (
                <img src={user.avatar} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <img
                  src="/AbdulSamad.jpeg"
                  alt={userName}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </div>
            <div className="truncate min-w-0">
              <div className="text-xs font-bold text-gray-900 truncate">{userName}</div>
              <div className="text-[10px] text-blue-600 font-semibold truncate font-mono">{userRole}</div>
            </div>
          </div>

          {/* Role Scoped Navigation */}
          {isWriter ? (
            <nav className="px-3 pb-6 space-y-3 text-xs">
              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-2 mb-1">
                Editorial Scope
              </div>
              <button
                onClick={() => handleTabClick('content')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === 'content'
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
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
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Image className="h-4 w-4" />
                  <span>Media Assets Library</span>
                </div>
                <span className="text-[10px] font-mono">({mediaCount})</span>
              </button>
            </nav>
          ) : isSeo ? (
            <nav className="px-3 pb-6 space-y-3 text-xs">
              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-2 mb-1">
                Search &amp; Indexing Scope
              </div>
              <button
                onClick={() => handleTabClick('seo')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === 'seo'
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
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
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="h-4 w-4" />
                  <span>Sitemap &amp; URL Indexing</span>
                </div>
              </button>
            </nav>
          ) : (
            <nav className="px-3 pb-6 space-y-4 text-xs">
              {/* GROUP 1: EXECUTIVE & CLIENT CORE */}
              <div>
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-2 mb-1.5">
                  Core Management
                </div>
                <div className="space-y-1">
                  {/* Executive Overview */}
                  <button
                    onClick={() => handleTabClick('sales_report')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'sales_report' || activeTab === 'dashboard'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <TrendingUp className="h-4 w-4" />
                      <span>Executive Overview</span>
                    </div>
                    {(activeTab === 'sales_report' || activeTab === 'dashboard') && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/20 text-white">
                        Live
                      </span>
                    )}
                  </button>

                  {/* CRM & Clients Hub */}
                  <button
                    onClick={() => handleTabClick('clients')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'clients'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="h-4 w-4" />
                      <span>CRM &amp; Clients Hub</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      Projects &amp; Pay
                    </span>
                  </button>

                  {/* Page Content CMS (No-Code Editor) */}
                  <button
                    onClick={() => handleTabClick('pages')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'pages'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span>Page Content CMS</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                      No-Code
                    </span>
                  </button>
                </div>
              </div>

              {/* GROUP 2: CATALOGUE & EDITORIAL */}
              <div>
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-2 mb-1.5">
                  Catalogue &amp; Media
                </div>
                <div className="space-y-1">
                  {/* Verified Services */}
                  <button
                    onClick={() => handleTabClick('services')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'services'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Cpu className="h-4 w-4" />
                      <span>Verified Services</span>
                    </div>
                  </button>

                  {/* Blogs & Insights CMS */}
                  <button
                    onClick={() => handleTabClick('content')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'content'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4" />
                      <span>Blogs &amp; Insights CMS</span>
                    </div>
                    <span className="text-[10px] font-mono opacity-80">({articleCount})</span>
                  </button>

                  {/* Media Assets Library */}
                  <button
                    onClick={() => handleTabClick('media')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'media'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Image className="h-4 w-4" />
                      <span>Media &amp; Device Uploads</span>
                    </div>
                    <span className="text-[10px] font-mono opacity-80">({mediaCount})</span>
                  </button>
                </div>
              </div>

              {/* GROUP 3: TALENT & INQUIRIES */}
              <div>
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-2 mb-1.5">
                  Talent &amp; Discovery
                </div>
                <div className="space-y-1">
                  {/* Job Openings & Team */}
                  <button
                    onClick={() => handleTabClick('team')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'team'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FolderKanban className="h-4 w-4" />
                      <span>Team &amp; Jobs</span>
                    </div>
                    <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                      NEW
                    </span>
                  </button>

                  {/* Material & Certs */}
                  <button
                    onClick={() => handleTabClick('certificates')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'certificates'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Award className="h-4 w-4" />
                      <span>Material &amp; Certs</span>
                    </div>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  </button>

                  {/* Inquiries */}
                  <button
                    onClick={() => handleTabClick('inquiries')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'inquiries'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="h-4 w-4" />
                      <span>Inquiries &amp; Leads</span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">({inquiryCount})</span>
                  </button>

                  {/* Company Profile */}
                  <button
                    onClick={() => handleTabClick('company')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                      activeTab === 'company'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="h-4 w-4" />
                      <span>Company Profile &amp; SECP</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* GROUP 4: SYSTEM & GOVERNANCE */}
              <div>
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-2 mb-1.5">
                  System &amp; SEO
                </div>
                <div className="space-y-1">
                  {/* SEO & Indexing */}
                  <button
                    onClick={() => handleTabClick('seo')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                      activeTab === 'seo'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Search className="h-4 w-4" />
                      <span>SEO &amp; Meta Master</span>
                    </div>
                  </button>

                  {/* Sitemaps */}
                  <button
                    onClick={() => handleTabClick('tags_urls')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                      activeTab === 'tags_urls'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="h-4 w-4" />
                      <span>Sitemaps &amp; Tags</span>
                    </div>
                  </button>

                  {/* Legal Policies */}
                  <button
                    onClick={() => handleTabClick('legal')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                      activeTab === 'legal'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Legal Policies &amp; GDPR</span>
                    </div>
                  </button>

                  {/* Database & Backups */}
                  <button
                    onClick={() => handleTabClick('database')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                      activeTab === 'database'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Database className="h-4 w-4" />
                      <span>Database &amp; Backups</span>
                    </div>
                  </button>

                  {/* Infrastructure & Maintenance */}
                  <button
                    onClick={() => handleTabClick('operations')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                      activeTab === 'operations'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Server className="h-4 w-4" />
                      <span>Operations &amp; Maintenance</span>
                    </div>
                  </button>

                  {/* Staff Access Control */}
                  {isSuperadmin && (
                    <button
                      onClick={() => handleTabClick('staff_access')}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                        activeTab === 'staff_access'
                          ? 'bg-blue-600 text-white shadow-xs font-bold'
                          : 'text-gray-700 hover:text-black hover:bg-gray-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <KeyRound className="h-4 w-4" />
                        <span>Staff Access Control</span>
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                        Root
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </nav>
          )}
        </div>

        {/* Footer Area: Dignified and clean */}
        <div className="p-4 border-t border-gray-150 bg-gray-50/70 shrink-0">
          <div className="flex items-center justify-between mb-3 text-[11px] text-gray-500 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              256-Bit SSL Secured
            </span>
            <span>v2.8.4</span>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full py-2 px-3 rounded-xl border border-gray-200 bg-white hover:bg-red-50 hover:border-red-200 text-gray-700 hover:text-red-600 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
};
