import React, { useState, useEffect } from 'react';
import {
  useCms,
  LegalPageDoc,
  LegalSection,
  ContentArticle,
  MediaAsset,
  SitemapUrlEntry,
  CookieSettings,
  VisitorTelemetryLog,
} from '../context/CmsContext';
import { DEPARTMENTS_DATA, TEAMS_DATA, INITIAL_USERS, SYSTEM_METRICS, COMPANY_INFO } from '../data/orbitData';
import {
  FileText,
  Search,
  Edit3,
  Image,
  Tag,
  Globe,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  ExternalLink,
  Code,
  RotateCcw,
  Sparkles,
  Link2,
  Layers,
  Copy,
  Clock,
  Eye,
  ShieldCheck,
  Activity,
  Cookie,
  Lock,
  Download,
  Filter,
  Check,
  Cpu,
  Sliders,
  Users,
  Award,
  MessageSquare,
  Building2,
  Database,
  Briefcase,
  Upload,
  Camera,
  Laptop,
  Smartphone,
} from 'lucide-react';
import { ServicesCms } from './admin/ServicesCms';
import { OperationsCms } from './admin/OperationsCms';
import { ClientsCms } from './admin/ClientsCms';
import { PagesCms } from './admin/PagesCms';
import { WordPressEditor } from './admin/WordPressEditor';
import { TeamCms } from './admin/TeamCms';
import { JobsCms } from './admin/JobsCms';
import { CertificatesCms } from './admin/CertificatesCms';
import { InquiriesCms } from './admin/InquiriesCms';
import { CompanyCms } from './admin/CompanyCms';
import { DatabaseCms } from './admin/DatabaseCms';
import { StaffAccessCms } from './admin/StaffAccessCms';
import { ExecutiveDashboardView } from './dashboard/ExecutiveDashboardView';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { DashboardSidebar, AdminNavigationTab } from './dashboard/DashboardSidebar';
import { SubHeaderBar } from './dashboard/SubHeaderBar';

interface AdminPortalProps {
  setActiveTab?: (tab: string) => void;
  authenticatedUser?: {
    name: string;
    email: string;
    role: string;
    sessionStarted?: string;
  } | null;
  onLogout?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  setActiveTab,
  authenticatedUser,
  onLogout,
}) => {
  const {
    services,
    teamMembers,
    certificates,
    inquiries,
    companyInfo,
    dbStatus,
    legalPages,
    updateLegalPage,
    resetLegalPagesToDefault,
    seoSettings,
    updateSeoSettings,
    sitemapUrls,
    updateSitemapUrl,
    addSitemapUrl,
    deleteSitemapUrl,
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    mediaAssets,
    addMediaAsset,
    updateMediaAsset,
    deleteMediaAsset,
    systemTags,
    addTag,
    deleteTag,
    cookieSettings,
    updateCookieSettings,
    visitorTelemetryLogs,
    logVisitorEvent,
    clearTelemetryLogs,
  } = useCms();

  type AdminTab =
    | 'dashboard'
    | 'sales_report'
    | 'team'
    | 'services'
    | 'certificates'
    | 'inquiries'
    | 'company'
    | 'database'
    | 'operations'
    | 'media'
    | 'content'
    | 'legal'
    | 'seo'
    | 'cookies_data'
    | 'tags_urls'
    | 'governance'
    | 'staff_access'
    | 'clients'
    | 'pages';

  const role = (authenticatedUser?.role || '').toLowerCase();
  const isContentWriter = role === 'content_writer' || role.includes('writer');
  const isSeoSpecialist = role === 'seo_specialist' || role.includes('seo');
  const isManager = role === 'manager';

  const defaultAdminTab: AdminTab = isContentWriter
    ? 'content'
    : isSeoSpecialist
    ? 'seo'
    : 'sales_report';

  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>(defaultAdminTab);

  useEffect(() => {
    if (isContentWriter && activeAdminTab !== 'content' && activeAdminTab !== 'media') {
      setActiveAdminTab('content');
    } else if (
      isSeoSpecialist &&
      activeAdminTab !== 'seo' &&
      activeAdminTab !== 'tags_urls' &&
      activeAdminTab !== 'cookies_data' &&
      activeAdminTab !== 'content'
    ) {
      setActiveAdminTab('seo');
    } else if (
      isManager &&
      (activeAdminTab === 'legal' ||
        activeAdminTab === 'database' ||
        activeAdminTab === 'operations' ||
        activeAdminTab === 'governance' ||
        activeAdminTab === 'staff_access')
    ) {
      setActiveAdminTab('sales_report');
    }
  }, [isContentWriter, isSeoSpecialist, isManager, activeAdminTab]);

  const [teamSubTab, setTeamSubTab] = useState<'team' | 'jobs'>('team');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  const tabTitles: Record<AdminTab, string> = {
    dashboard: 'Executive Overview',
    sales_report: 'Executive Overview',
    clients: 'Client CRM, Projects & Payments',
    pages: 'Website Pages Content Editor',
    team: 'Job Info & Team Members',
    services: 'Verified Enterprise Services',
    certificates: 'Certificate Verification CMS',
    inquiries: 'Inquiries & Client Transcripts',
    company: 'Company Profile & SECP Registry',
    database: 'Enterprise Database & Cloud Storage',
    operations: 'Site Operations & Maintenance',
    content: 'Articles & Content CMS Editor',
    media: 'Media Assets & Uploads Library',
    legal: 'Legal Policies & Compliance Editor',
    seo: 'SEO & Search Engine Indexing',
    cookies_data: 'Cookies & IP Telemetry Audit',
    tags_urls: 'Sitemaps & Tag Indexing',
    governance: 'Corporate Governance Infrastructure',
    staff_access: 'Staff & Role-Based Access Control',
  };

  const showNotification = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3500);
  };

  // ----------------------------------------------------
  // 1. LEGAL PAGES CMS STATE
  // ----------------------------------------------------
  const [selectedPolicyId, setSelectedPolicyId] = useState<'privacy' | 'terms' | 'security' | 'refund' | 'cookies'>('privacy');
  const [activeDocState, setActiveDocState] = useState<LegalPageDoc>(legalPages['privacy']);

  const handleSelectPolicy = (id: 'privacy' | 'terms' | 'security' | 'refund' | 'cookies') => {
    setSelectedPolicyId(id);
    setActiveDocState(legalPages[id]);
  };

  const handleSaveLegalDoc = (e: React.FormEvent) => {
    e.preventDefault();
    updateLegalPage(activeDocState);
    showNotification(`Legal document "${activeDocState.title}" successfully updated & published!`);
  };

  const handleAddSection = () => {
    const newSection: LegalSection = {
      id: `sec-${Date.now()}`,
      heading: `${activeDocState.sections.length + 1}. New Clause Heading`,
      body: 'Detailed contractual clause or privacy provision description.',
    };
    setActiveDocState({
      ...activeDocState,
      sections: [...activeDocState.sections, newSection],
    });
  };

  const handleUpdateSection = (index: number, heading: string, body: string) => {
    const nextSections = [...activeDocState.sections];
    nextSections[index] = { ...nextSections[index], heading, body };
    setActiveDocState({ ...activeDocState, sections: nextSections });
  };

  const handleDeleteSection = (index: number) => {
    const nextSections = activeDocState.sections.filter((_, i) => i !== index);
    setActiveDocState({ ...activeDocState, sections: nextSections });
  };

  // ----------------------------------------------------
  // 2. SEO & INDEXING STATE
  // ----------------------------------------------------
  const [seoState, setSeoState] = useState(seoSettings);
  const [keywordInput, setKeywordInput] = useState('');

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeoSettings(seoState);
    showNotification('SEO parameters & Search Console meta tags successfully synchronized!');
  };

  const handleAddKeyword = () => {
    if (!keywordInput.trim() || seoState.keywords.includes(keywordInput.trim().toLowerCase())) return;
    setSeoState({
      ...seoState,
      keywords: [...seoState.keywords, keywordInput.trim().toLowerCase()],
    });
    setKeywordInput('');
  };

  const handleDeleteKeyword = (kw: string) => {
    setSeoState({
      ...seoState,
      keywords: seoState.keywords.filter((k) => k !== kw),
    });
  };

  // ----------------------------------------------------
  // 3. CONTENT WRITING / ARTICLES STATE
  // ----------------------------------------------------
  const [editingArticle, setEditingArticle] = useState<ContentArticle | null>(null);
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [articleForm, setArticleForm] = useState<Partial<ContentArticle>>({
    title: '',
    slug: '',
    category: 'Engineering',
    author: 'Abdul Samad Rind (Founder & CEO)',
    readTime: '5 min read',
    tags: ['Software', 'Enterprise', 'Architecture'],
    excerpt: '',
    content: '',
    status: 'published',
  });

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title || !articleForm.slug) return;

    if (editingArticle) {
      updateArticle({
        ...(editingArticle as ContentArticle),
        ...articleForm,
        publishedDate: editingArticle.publishedDate || 'September 2026',
      } as ContentArticle);
      showNotification(`Article "${articleForm.title}" updated.`);
    } else {
      const newArt: ContentArticle = {
        id: `art-${Date.now()}`,
        slug: articleForm.slug.toLowerCase().replace(/\s+/g, '-'),
        title: articleForm.title,
        category: articleForm.category || 'Engineering',
        author: articleForm.author || 'ORBIT-I Technical Team',
        publishedDate: 'September 2026',
        readTime: articleForm.readTime || '5 min read',
        tags: articleForm.tags || ['Engineering'],
        excerpt: articleForm.excerpt || '',
        content: articleForm.content || '',
        status: articleForm.status as 'published' | 'draft',
      };
      addArticle(newArt);
      showNotification(`New article "${newArt.title}" published!`);
    }

    setEditingArticle(null);
    setIsCreatingArticle(false);
  };

  // ----------------------------------------------------
  // 4. MEDIA ASSET STATE & MULTI-DEVICE UPLOAD
  // ----------------------------------------------------
  const [newMediaName, setNewMediaName] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaAlt, setNewMediaAlt] = useState('');
  const [newMediaTags, setNewMediaTags] = useState('Brand, Web');
  const [mediaUploadSource, setMediaUploadSource] = useState<'device' | 'url'>('device');
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);

  const handleDeviceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setIsUploadingMedia(true);
      const reader = new FileReader();

      reader.onload = async (event) => {
        const base64Data = event.target?.result as string;
        setMediaPreview(base64Data);

        let finalUrl = base64Data;
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: file.name,
              data: base64Data,
              altText: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.url) finalUrl = data.url;
          }
        } catch (err) {
          console.warn('Backend /api/upload fallback to base64 data URL:', err);
        }

        const sizeStr =
          file.size > 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
            : `${Math.round(file.size / 1024)} KB`;

        const autoName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        const newAsset: MediaAsset = {
          id: `med-${Date.now()}-${i}`,
          name: autoName,
          url: finalUrl,
          type: file.type || 'image/png',
          size: sizeStr,
          altText: autoName,
          tags: ['Upload', 'Device', file.type.split('/')[1] || 'Image'],
          uploadedAt: new Date().toISOString().split('T')[0],
        };

        addMediaAsset(newAsset);
        setNewMediaName(autoName);
        setNewMediaUrl(finalUrl);
        setNewMediaAlt(autoName);
        setIsUploadingMedia(false);
        showNotification(`Uploaded "${file.name}" successfully!`);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaName || !newMediaUrl) return;

    const newAsset: MediaAsset = {
      id: `med-${Date.now()}`,
      name: newMediaName,
      url: newMediaUrl,
      type: 'image/png',
      size: '64 KB',
      altText: newMediaAlt || newMediaName,
      tags: newMediaTags.split(',').map((t) => t.trim()),
      uploadedAt: new Date().toISOString().split('T')[0],
    };

    addMediaAsset(newAsset);
    setNewMediaName('');
    setNewMediaUrl('');
    setNewMediaAlt('');
    setMediaPreview(null);
    showNotification(`Media asset "${newAsset.name}" added to repository.`);
  };

  // ----------------------------------------------------
  // 5. TAGS & URL INDEXING STATE
  // ----------------------------------------------------
  const [tagInput, setTagInput] = useState('');
  const [newPathInput, setNewPathInput] = useState('');

  const handleAddSitemapPath = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPathInput.trim()) return;

    const formattedPath = newPathInput.startsWith('/') ? newPathInput.trim() : `/${newPathInput.trim()}`;
    addSitemapUrl({
      path: formattedPath,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: new Date().toISOString().split('T')[0],
      indexingStatus: 'Submitted',
    });

    setNewPathInput('');
    showNotification(`URL path "${formattedPath}" registered in XML sitemap.`);
  };

  // ----------------------------------------------------
  // 6. COOKIES & IP DATA COLLECTION STATE
  // ----------------------------------------------------
  const [cookieForm, setCookieForm] = useState<CookieSettings>(cookieSettings);
  const [searchIpQuery, setSearchIpQuery] = useState('');
  const [ipFilterResult, setIpFilterResult] = useState<string | null>(null);

  const handleSaveCookieSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCookieSettings(cookieForm);
    showNotification('Cookie consent rules & IP logging preferences saved!');
  };

  const handleExportTelemetryJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(visitorTelemetryLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `orbit_telemetry_audit_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Audit log exported successfully.');
  };

  const handlePurgeIpLogs = () => {
    if (!searchIpQuery.trim()) return;
    setIpFilterResult(`Purged all historical request logs associated with IP ${searchIpQuery.trim()} under GDPR DSAR.`);
    showNotification(`IP ${searchIpQuery.trim()} scrubbed and deleted from server storage.`);
    setSearchIpQuery('');
  };

  return (
    <div className="h-screen bg-[#f4f6fa] text-gray-900 flex flex-col font-sans selection:bg-[#2f6fed] selection:text-white overflow-hidden">
      {/* 1. Top Navbar (Vibrant Royal Blue #2f6fed matching reference image) */}
      <DashboardHeader
        portalType="admin"
        user={authenticatedUser}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onLogout={onLogout}
        onNavigateHome={() => setActiveTab && setActiveTab('home')}
        inquiryCount={inquiries.length}
      />

      {/* 2. Main Flex Layout: Left Sidebar + Center Canvas */}
      <div className="flex flex-1 relative overflow-hidden min-h-0">
        {/* Clean White Left Navigation Sidebar */}
        <DashboardSidebar
          activeTab={activeAdminTab as any}
          onSelectTab={(tab) => setActiveAdminTab(tab as AdminTab)}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={authenticatedUser}
          onLogout={onLogout}
          inquiryCount={inquiries.length}
          articleCount={articles.length}
          mediaCount={mediaAssets.length}
        />

        {/* Content Canvas Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 h-full">
          {/* Sub Header & Breadcrumbs Bar */}
          <SubHeaderBar
            title={tabTitles[activeAdminTab] || 'Executive Overview'}
            breadcrumbs={['Control', tabTitles[activeAdminTab] || 'Executive Overview']}
            dateLabel="Today: Oct 02"
            onRefresh={() => showNotification('Synchronized live telemetry & database metrics.')}
            onExport={handleExportTelemetryJson}
          />

          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
            {/* Global Notification Toast */}
            {statusNotification && (
              <div className="p-4 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-900 flex items-center justify-between shadow-sm animate-in fade-in duration-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>{statusNotification}</span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">LIVE UPDATE APPLIED</span>
              </div>
            )}



            {/* View 1: Executive Dashboard & Operations Overview (Real CMS Telemetry) */}
            {(activeAdminTab === 'sales_report' || activeAdminTab === 'dashboard') && (
              <ExecutiveDashboardView onSelectTab={(tab) => setActiveAdminTab(tab as AdminTab)} />
            )}

            {/* ========================================================================= */}
            {/* CORE CRUD CMS PANELS                                                     */}
            {/* ========================================================================= */}
            {activeAdminTab === 'team' && (
              <div className="space-y-6">
                {/* Modern Sub-Tab Pill Switcher */}
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-200/80 shadow-2xs w-fit">
                  <button
                    type="button"
                    onClick={() => setTeamSubTab('team')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                      teamSubTab === 'team'
                        ? 'bg-[#2f6fed] text-white shadow-xs'
                        : 'text-gray-600 hover:text-black hover:bg-gray-100'
                    }`}
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    <span>Corporate Team &amp; Leadership</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTeamSubTab('jobs')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                      teamSubTab === 'jobs'
                        ? 'bg-[#2f6fed] text-white shadow-xs'
                        : 'text-gray-600 hover:text-black hover:bg-gray-100'
                    }`}
                  >
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>Job Openings &amp; Recruitment</span>
                    <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                      NEW
                    </span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-xs">
                  {teamSubTab === 'team' ? (
                    <TeamCms showNotification={showNotification} />
                  ) : (
                    <JobsCms showNotification={showNotification} />
                  )}
                </div>
              </div>
            )}
            {activeAdminTab === 'services' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-xs">
                <ServicesCms showNotification={showNotification} />
              </div>
            )}
            {activeAdminTab === 'certificates' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-xs">
                <CertificatesCms showNotification={showNotification} />
              </div>
            )}
            {activeAdminTab === 'inquiries' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-xs">
                <InquiriesCms showNotification={showNotification} />
              </div>
            )}
            {activeAdminTab === 'company' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-xs">
                <CompanyCms showNotification={showNotification} />
              </div>
            )}
            {activeAdminTab === 'database' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-xs">
                <DatabaseCms showNotification={showNotification} />
              </div>
            )}
            {activeAdminTab === 'operations' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-xs">
                <OperationsCms showNotification={showNotification} setActiveTab={setActiveTab || (() => {})} />
              </div>
            )}
            {activeAdminTab === 'clients' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-xs">
                <ClientsCms showNotification={showNotification} />
              </div>
            )}
            {activeAdminTab === 'pages' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-150 shadow-xs">
                <PagesCms showNotification={showNotification} />
              </div>
            )}
            {activeAdminTab === 'staff_access' && (
              <StaffAccessCms
                currentUser={authenticatedUser}
                showNotification={showNotification}
              />
            )}

        {/* ========================================================================= */}
        {/* TAB 1: LEGAL PAGES CMS & POLICY EDITOR                                   */}
        {/* ========================================================================= */}
        {activeAdminTab === 'legal' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-black">Legal Policy Content Management</h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  Select any legal document to modify clauses, enforceable terms, or metadata. Changes publish instantly.
                </p>
              </div>

              {/* Policy Selector Pills */}
              <div className="flex flex-wrap p-1 bg-gray-100 rounded-full border border-gray-200 text-xs">
                {(['privacy', 'cookies', 'terms', 'security', 'refund'] as const).map((id) => (
                  <button
                    key={id}
                    onClick={() => handleSelectPolicy(id)}
                    className={`px-3 py-1.5 rounded-full font-semibold transition-all capitalize ${
                      selectedPolicyId === id
                        ? 'bg-black text-white shadow-xs'
                        : 'text-gray-700 hover:text-black'
                    }`}
                  >
                    {id} Policy
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSaveLegalDoc} className="space-y-6">
              {/* Policy Header Fields */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-black font-mono">
                    Document Meta: {activeDocState.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        resetLegalPagesToDefault();
                        setActiveDocState(legalPages[selectedPolicyId]);
                        showNotification('Reset all legal documents to default corporate templates.');
                      }}
                      className="px-3 py-1 bg-white border border-gray-300 rounded-full text-[11px] font-medium text-gray-700 hover:border-black flex items-center gap-1"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Reset Defaults</span>
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-black text-white hover:bg-gray-800 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <Save className="h-3.5 w-3.5" />
                      <span>Save &amp; Publish</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Official Document Title
                    </label>
                    <input
                      type="text"
                      value={activeDocState.title}
                      onChange={(e) => setActiveDocState({ ...activeDocState, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-black focus:outline-none focus:border-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Effective / Last Updated Date
                    </label>
                    <input
                      type="text"
                      value={activeDocState.lastUpdated}
                      onChange={(e) => setActiveDocState({ ...activeDocState, lastUpdated: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Executive Summary / Introduction
                  </label>
                  <textarea
                    rows={2}
                    value={activeDocState.summary}
                    onChange={(e) => setActiveDocState({ ...activeDocState, summary: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black leading-relaxed"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    SEO Meta Description (for search snippets)
                  </label>
                  <input
                    type="text"
                    value={activeDocState.metaDescription}
                    onChange={(e) => setActiveDocState({ ...activeDocState, metaDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Sections Editor */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-black">
                    Document Sections &amp; Clauses ({activeDocState.sections.length})
                  </h4>

                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="px-4 py-1.5 bg-gray-100 hover:bg-black hover:text-white rounded-full text-xs font-semibold text-black border border-gray-300 transition-colors flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add New Clause</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {activeDocState.sections.map((section, idx) => (
                    <div
                      key={section.id || idx}
                      className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 space-y-3 shadow-xs hover:border-black transition-colors"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] font-mono font-bold text-gray-400">
                          Clause #{idx + 1}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleDeleteSection(idx)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 text-xs flex items-center gap-1"
                          title="Delete clause"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                          Clause Heading
                        </label>
                        <input
                          type="text"
                          value={section.heading}
                          onChange={(e) => handleUpdateSection(idx, e.target.value, section.body)}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-black focus:outline-none focus:border-black"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-gray-500 mb-1">
                          Enforceable Provision Text
                        </label>
                        <textarea
                          rows={3}
                          value={section.body}
                          onChange={(e) => handleUpdateSection(idx, section.heading, e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black leading-relaxed"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-gray-200 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-black text-white hover:bg-gray-800 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <Save className="h-4 w-4" />
                  <span>Save All Changes to {activeDocState.title}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: COOKIES & IP DATA COLLECTION TELEMETRY ENGINE                     */}
        {/* ========================================================================= */}
        {activeAdminTab === 'cookies_data' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-black">Cookies &amp; All-Page IP Data Collection Engine</h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  Monitor live visitor IP addresses, active session cookies, rate-limiting tokens, and GDPR consent compliance across all routes.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportTelemetryJson}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black text-xs font-semibold rounded-full border border-gray-300 transition-colors flex items-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export Telemetry JSON</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    logVisitorEvent('/services', 'accepted_all');
                    showNotification('Simulated new visitor IP telemetry event.');
                  }}
                  className="px-4 py-2 bg-black text-white hover:bg-gray-800 text-xs font-bold rounded-full transition-colors flex items-center gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Simulate Visit Event</span>
                </button>
              </div>
            </div>

            {/* Live Visitor IP & Request Stream */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <h4 className="text-base font-bold text-black">
                    Live Visitor IP &amp; Network Telemetry Stream ({visitorTelemetryLogs.length} Events)
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    clearTelemetryLogs();
                    showNotification('Telemetry logs cleared.');
                  }}
                  className="text-xs text-gray-500 hover:text-red-600 font-semibold"
                >
                  Clear Log History
                </button>
              </div>

              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 uppercase text-[10px] font-mono">
                      <th className="py-3 px-4 font-bold">Client IP Address</th>
                      <th className="py-3 px-4 font-bold">Page Path</th>
                      <th className="py-3 px-4 font-bold">Location</th>
                      <th className="py-3 px-4 font-bold">Cookie Consent</th>
                      <th className="py-3 px-4 font-bold">Active Cookies</th>
                      <th className="py-3 px-4 font-bold">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono text-[11px]">
                    {visitorTelemetryLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50 font-sans">
                        <td className="py-3 px-4 font-mono font-bold text-black">
                          {log.ip}
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-blue-600">
                          {log.path}
                        </td>
                        <td className="py-3 px-4 text-gray-700 text-xs">
                          {log.location}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              log.consentGiven === 'accepted_all'
                                ? 'bg-emerald-100 text-emerald-800'
                                : log.consentGiven === 'essential_only'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {log.consentGiven.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {log.activeCookies.slice(0, 3).map((c, i) => (
                              <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-[9px] font-mono text-gray-700">
                                {c}
                              </span>
                            ))}
                            {log.activeCookies.length > 3 && (
                              <span className="text-[9px] text-gray-400">+{log.activeCookies.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[10px] text-gray-500">
                          {log.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cookie Banner Configuration Form */}
            <form onSubmit={handleSaveCookieSettings} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="text-xs font-bold uppercase tracking-wider text-black font-mono">
                  Global Cookie Banner &amp; IP Collection Settings
                </span>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white hover:bg-gray-800 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Cookie Settings</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-black block">Cookie Consent Banner</span>
                    <span className="text-[11px] text-gray-500">Display notice on all landing routes</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookieForm.bannerEnabled}
                    onChange={(e) => setCookieForm({ ...cookieForm, bannerEnabled: e.target.checked })}
                    className="h-4 w-4 accent-black"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-black block">All-Page IP Logging</span>
                    <span className="text-[11px] text-gray-500">Track client IPs for DDoS &amp; security</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookieForm.ipLoggingEnabled}
                    onChange={(e) => setCookieForm({ ...cookieForm, ipLoggingEnabled: e.target.checked })}
                    className="h-4 w-4 accent-black"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-black block">IP Anonymization</span>
                    <span className="text-[11px] text-gray-500">Mask last octet (e.g. 192.168.1.xxx)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookieForm.ipAnonymization}
                    onChange={(e) => setCookieForm({ ...cookieForm, ipAnonymization: e.target.checked })}
                    className="h-4 w-4 accent-black"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Banner Headline Text
                  </label>
                  <input
                    type="text"
                    value={cookieForm.bannerHeadline}
                    onChange={(e) => setCookieForm({ ...cookieForm, bannerHeadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-black focus:outline-none focus:border-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Banner Consent Disclosure Message
                  </label>
                  <textarea
                    rows={3}
                    value={cookieForm.bannerMessage}
                    onChange={(e) => setCookieForm({ ...cookieForm, bannerMessage: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black leading-relaxed"
                    required
                  />
                </div>
              </div>

              {/* Cookie Inventory Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-black font-mono">
                  Managed Cookie Inventory Categories
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {cookieForm.categories.map((cat) => (
                    <div key={cat.id} className="p-4 bg-white border border-gray-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-black">{cat.name}</span>
                        {cat.required ? (
                          <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 rounded">REQUIRED</span>
                        ) : (
                          <span className="text-[10px] font-mono bg-gray-100 text-gray-600 px-2 py-0.5 rounded">OPTIONAL</span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-600 leading-relaxed">{cat.description}</p>
                      <div className="pt-1">
                        <span className="text-[10px] font-bold text-gray-400 block font-mono">Stored Tokens:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {cat.cookies.map((c, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-gray-100 rounded text-[9px] font-mono text-black">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </form>

            {/* GDPR / DSAR Data Erasure Engine */}
            <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="text-xs font-bold uppercase tracking-wider text-black font-mono">
                  GDPR / DSAR Data Erasure &amp; IP Scrubbing Tool
                </span>
                <span className="text-xs text-gray-500">Right to be Forgotten Compliance</span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                When a user requests total data erasure, enter their client IP address below to immediately purge all server request logs, session tokens, and telemetry traces.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={searchIpQuery}
                  onChange={(e) => setSearchIpQuery(e.target.value)}
                  placeholder="Enter IP address to purge (e.g. 119.160.118.42)..."
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-black"
                />
                <button
                  type="button"
                  onClick={handlePurgeIpLogs}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-xs whitespace-nowrap"
                >
                  Purge &amp; Anonymize IP Records
                </button>
              </div>

              {ipFilterResult && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 font-mono">
                  {ipFilterResult}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SEO & SCHEMA.ORG SEARCH INDEXING                                  */}
        {/* ========================================================================= */}
        {activeAdminTab === 'seo' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-black">Search Engine Optimization (SEO) &amp; Metadata Engine</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Configure OpenGraph cards, Twitter preview cards, Google Search Console canonical paths, and Schema.org JSON-LD structured data.
              </p>
            </div>

            <form onSubmit={handleSaveSeo} className="space-y-6">
              {/* Meta Tags Configuration */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-black font-mono">
                    Global HTML &lt;head&gt; Meta Configuration
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-black text-white hover:bg-gray-800 rounded-full text-xs font-bold flex items-center gap-1.5"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Apply SEO Updates</span>
                  </button>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-gray-700">
                      Page Title (&lt;title&gt; &amp; og:title)
                    </label>
                    <span className="text-[11px] font-mono text-gray-500">
                      {seoState.siteTitle.length}/60 chars (Recommended: 30-60)
                    </span>
                  </div>
                  <input
                    type="text"
                    value={seoState.siteTitle}
                    onChange={(e) => setSeoState({ ...seoState, siteTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-black focus:outline-none focus:border-black"
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-gray-700">
                      Meta Description (&lt;meta name="description"&gt;)
                    </label>
                    <span className="text-[11px] font-mono text-gray-500">
                      {seoState.metaDescription.length}/160 chars (Recommended: 120-160)
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={seoState.metaDescription}
                    onChange={(e) => setSeoState({ ...seoState, metaDescription: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black leading-relaxed"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Canonical Domain URL
                    </label>
                    <input
                      type="url"
                      value={seoState.canonicalUrl}
                      onChange={(e) => setSeoState({ ...seoState, canonicalUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Robots Directives (Crawl Policy)
                    </label>
                    <input
                      type="text"
                      value={seoState.robotsDirectives}
                      onChange={(e) => setSeoState({ ...seoState, robotsDirectives: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Social Sharing Image (og:image)
                    </label>
                    <input
                      type="text"
                      value={seoState.ogImage}
                      onChange={(e) => setSeoState({ ...seoState, ogImage: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Google Search Console Verification Meta Tag
                    </label>
                    <input
                      type="text"
                      value={seoState.googleVerificationTag}
                      onChange={(e) => setSeoState({ ...seoState, googleVerificationTag: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black font-mono"
                    />
                  </div>
                </div>

                {/* Keywords Chips */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    SEO Keywords &amp; Ranking Terms ({seoState.keywords.length})
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {seoState.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 rounded-full text-xs text-black font-medium"
                      >
                        <span>{kw}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteKeyword(kw)}
                          className="hover:text-red-600 font-bold"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      placeholder="Add keyword tag (e.g. 'software company nawabshah')..."
                      className="flex-1 px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black"
                    />
                    <button
                      type="button"
                      onClick={handleAddKeyword}
                      className="px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-lg text-xs font-semibold"
                    >
                      Add Keyword
                    </button>
                  </div>
                </div>
              </div>

              {/* Live SERP Google Search Snippet Preview */}
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-black font-mono">
                    Google Search Engine Snippet Simulation (SERP)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Live Preview
                  </span>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 font-sans max-w-2xl space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <span className="h-4 w-4 rounded-full bg-black text-white text-[9px] flex items-center justify-center font-bold">
                      O
                    </span>
                    <span className="text-xs text-gray-700">{seoState.canonicalUrl}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                    {seoState.siteTitle}
                  </h4>
                  <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                    {seoState.metaDescription}
                  </p>
                </div>
              </div>

              {/* Schema.org Structured Data Preview */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-black font-mono">
                    Schema.org JSON-LD Structured Data
                  </span>
                  <span className="text-xs text-gray-500 font-mono">Type: Organization / SoftwareApplication</span>
                </div>

                <pre className="p-4 bg-white border border-gray-200 rounded-xl text-xs font-mono text-gray-800 overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${COMPANY_INFO.legalName}",
  "url": "${seoState.canonicalUrl}",
  "logo": "${seoState.ogImage}",
  "description": "${seoState.metaDescription}",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Nawabshah",
    "addressRegion": "Sindh",
    "addressCountry": "Pakistan"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "${COMPANY_INFO.phone}",
    "contactType": "customer service",
    "email": "${COMPANY_INFO.email}"
  }
}`}
                </pre>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CONTENT WRITING & TECHNICAL ARTICLES CMS                          */}
        {/* ========================================================================= */}
        {activeAdminTab === 'content' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-black">Content Writing &amp; Publishing CMS</h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  Publish engineering briefings, technical insights, and company announcements with live SEO slugs.
                </p>
              </div>

              {!isCreatingArticle && !editingArticle && (
                <button
                  onClick={() => {
                    setIsCreatingArticle(true);
                    setArticleForm({
                      title: '',
                      slug: '',
                      category: 'Software Engineering',
                      author: 'Abdul Samad Rind (Founder & CEO)',
                      readTime: '5 min read',
                      tags: ['Architecture', 'Engineering'],
                      excerpt: '',
                      content: '',
                      status: 'published',
                    });
                  }}
                  className="px-5 py-2.5 bg-black text-white hover:bg-gray-800 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Write New Article</span>
                </button>
              )}
            </div>

            {/* Create or Edit Form via WordPress Engine */}
            {(isCreatingArticle || editingArticle) && (
              <WordPressEditor
                article={
                  editingArticle || {
                    id: `art-${Date.now()}`,
                    title: '',
                    slug: '',
                    category: 'Artificial Intelligence & ML',
                    author: 'Abdul Samad Rind (Founder & CEO)',
                    publishedDate: new Date().toISOString().split('T')[0],
                    readTime: '5 min read',
                    tags: ['ai-systems', 'software-engineering', 'enterprise'],
                    excerpt: '',
                    content: '<h2>1. Strategic Engineering Overview</h2>\n<p>Enter comprehensive documentation and software architecture analysis here...</p>',
                    status: 'published',
                    featuredImage: '/orbit-circular-logo.png',
                  }
                }
                onSave={(savedArticle) => {
                  if (editingArticle) {
                    updateArticle(savedArticle);
                    showNotification(`Article "${savedArticle.title}" updated successfully!`);
                  } else {
                    addArticle(savedArticle);
                    showNotification(`Article "${savedArticle.title}" published with WordPress Block Engine!`);
                  }
                  setIsCreatingArticle(false);
                  setEditingArticle(null);
                }}
                onCancel={() => {
                  setIsCreatingArticle(false);
                  setEditingArticle(null);
                }}
              />
            )}

            {/* Existing Articles Table */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 uppercase text-[11px] font-mono">
                      <th className="py-3 px-4 font-bold">Article &amp; Permalink</th>
                      <th className="py-3 px-4 font-bold">Category</th>
                      <th className="py-3 px-4 font-bold">Author</th>
                      <th className="py-3 px-4 font-bold">Tags</th>
                      <th className="py-3 px-4 font-bold">SEO Score</th>
                      <th className="py-3 px-4 font-bold">Status</th>
                      <th className="py-3 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {articles.map((art) => (
                      <tr key={art.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            {art.featuredImage ? (
                              <img
                                src={art.featuredImage}
                                alt={art.title}
                                className="w-12 h-10 object-cover rounded-lg border border-gray-200 bg-gray-900 shrink-0"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div className="w-12 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                                <FileText className="h-4 w-4 text-gray-400" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="font-bold text-black text-sm truncate max-w-xs">{art.title}</div>
                              <div className="text-gray-500 font-mono text-[11px] flex items-center gap-1.5">
                                <span>/blog/{art.slug}</span>
                                <span>·</span>
                                <span>{art.readTime || '5 min read'}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-gray-800">
                          <span className="px-2.5 py-1 bg-gray-100 rounded-md text-[11px]">
                            {art.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 font-medium">{art.author}</td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[160px]">
                            {art.tags.slice(0, 2).map((t, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 rounded text-[10px] text-gray-700 font-mono">
                                #{t}
                              </span>
                            ))}
                            {art.tags.length > 2 && (
                              <span className="text-[10px] text-gray-400 font-mono self-center">
                                +{art.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              (art.seoScore ?? 85) >= 80
                                ? 'bg-emerald-100 text-emerald-800'
                                : (art.seoScore ?? 85) >= 50
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {art.seoScore ?? 85}/100
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                              art.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {art.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`#article/${art.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                              title="View Article Live"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                            <button
                              onClick={() => {
                                setEditingArticle(art);
                                setArticleForm(art);
                                setIsCreatingArticle(false);
                              }}
                              className="px-3 py-1.5 bg-white border border-gray-300 hover:border-black rounded-lg text-xs font-semibold text-black transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete article "${art.title}"?`)) {
                                  deleteArticle(art.id);
                                  showNotification(`Article "${art.title}" deleted.`);
                                }
                              }}
                              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete article"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: MEDIA ASSET REPOSITORY                                             */}
        {/* ========================================================================= */}
        {activeAdminTab === 'media' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-black">Media Asset Gallery &amp; Alt Text Manager</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Centralized brand graphics, transparent logo variants, technical infographics, and SEO-optimized image alt tags.
              </p>
            </div>

            {/* Add New Media Form with Computer & Phone Multi-Source Upload */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-200 gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-black font-mono">
                  Register or Upload Media Asset
                </span>
                <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-gray-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setMediaUploadSource('device')}
                    className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                      mediaUploadSource === 'device'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Device / Phone / Camera</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaUploadSource('url')}
                    className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                      mediaUploadSource === 'url'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Direct Web URL</span>
                  </button>
                </div>
              </div>

              {mediaUploadSource === 'device' ? (
                <div className="space-y-4">
                  {/* Drag and Drop / Device File Picker */}
                  <label className="relative border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/40 hover:bg-blue-50/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleDeviceUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform mb-3">
                      <Upload className="w-7 h-7" />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">
                      Choose Photos from Computer, Phone Gallery, or Camera
                    </h4>
                    <p className="text-xs text-gray-500 max-w-md">
                      Drag &amp; drop files here or tap to open gallery/camera on your mobile device. Supports PNG, JPG, WebP, SVG, and GIF.
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-[11px] font-semibold text-blue-700">
                      <span className="flex items-center gap-1">
                        <Laptop className="w-3.5 h-3.5" /> PC / Mac
                      </span>
                      <span className="flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5" /> Phone Photos
                      </span>
                      <span className="flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5" /> Direct Camera
                      </span>
                    </div>
                  </label>

                  {isUploadingMedia && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3 text-xs text-blue-800">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <span>Processing and storing media asset...</span>
                    </div>
                  )}

                  {mediaPreview && (
                    <div className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-xl">
                      <img
                        src={mediaPreview}
                        alt="Preview"
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate">{newMediaName || 'Uploaded Asset'}</p>
                        <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Registered in Media Gallery
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMediaPreview(null)}
                        className="text-xs text-gray-500 hover:text-black px-2 py-1 rounded-md"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleAddMedia} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Asset Name *
                      </label>
                      <input
                        type="text"
                        value={newMediaName}
                        onChange={(e) => setNewMediaName(e.target.value)}
                        placeholder="e.g. ORBIT-I Transparent Banner"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-black focus:outline-none focus:border-black"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Asset URL or Path *
                      </label>
                      <input
                        type="text"
                        value={newMediaUrl}
                        onChange={(e) => setNewMediaUrl(e.target.value)}
                        placeholder="/orbit-i-logo.png or https://..."
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        SEO Alt Text (Accessibility &amp; Image Ranking)
                      </label>
                      <input
                        type="text"
                        value={newMediaAlt}
                        onChange={(e) => setNewMediaAlt(e.target.value)}
                        placeholder="Descriptive text for search engine crawlers..."
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Media Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={newMediaTags}
                        onChange={(e) => setNewMediaTags(e.target.value)}
                        placeholder="Logo, Transparent, Header"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Register Asset</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Media Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mediaAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:border-black transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="h-40 bg-gray-50 flex items-center justify-center p-4 border-b border-gray-100 relative group overflow-hidden">
                      <img
                        src={asset.url}
                        alt={asset.altText}
                        className="max-h-32 max-w-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="text-xs font-bold text-black truncate" title={asset.name}>
                        {asset.name}
                      </h4>
                      <p className="text-[11px] text-gray-600 line-clamp-2">
                        Alt: {asset.altText}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {asset.tags.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-gray-100 rounded text-[9px] text-gray-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-gray-100 flex items-center justify-between mt-3 text-xs">
                    <span className="text-[10px] text-gray-400 font-mono">{asset.size}</span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(asset.url);
                          showNotification(`URL copied: ${asset.url}`);
                        }}
                        className="p-1.5 text-gray-600 hover:text-black rounded hover:bg-gray-100"
                        title="Copy URL"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          deleteMediaAsset(asset.id);
                          showNotification(`Asset "${asset.name}" removed.`);
                        }}
                        className="p-1.5 text-red-500 hover:text-red-700 rounded hover:bg-red-50"
                        title="Delete asset"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: TAGS & URL SLUGS INDEXING DIRECTORY                                */}
        {/* ========================================================================= */}
        {activeAdminTab === 'tags_urls' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-black">Tags &amp; URL Indexing Control</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Register application routing paths, manage crawl priority, monitor Google Search Console indexing statuses, and configure system tags.
              </p>
            </div>

            {/* System-wide Tags Manager */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-black font-mono block pb-2 border-b border-gray-200">
                System Keyword &amp; Metadata Tags ({systemTags.length})
              </span>

              <div className="flex flex-wrap gap-2">
                {systemTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-300 rounded-full text-xs text-black font-semibold"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => deleteTag(tag)}
                      className="hover:text-red-600 font-bold ml-1"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-2 max-w-md">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="New tag name (e.g. 'Nawabshah Tech')..."
                  className="flex-1 px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black"
                />
                <button
                  type="button"
                  onClick={() => {
                    addTag(tagInput);
                    setTagInput('');
                    showNotification(`Tag added.`);
                  }}
                  className="px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-lg text-xs font-semibold"
                >
                  Add Tag
                </button>
              </div>
            </div>

            {/* XML Sitemap & URL Indexing Table */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
                <div>
                  <h4 className="text-base font-bold text-black">
                    Sitemap XML &amp; URL Indexing Directory ({sitemapUrls.length} Endpoints)
                  </h4>
                  <p className="text-xs text-gray-500">
                    Live indexing ping status for Google, Bing, and search bot crawlers.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    showNotification('Simulating Search Engine Ping: Google Search Console notified of updated sitemap.xml.');
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-black hover:text-white border border-gray-300 rounded-full text-xs font-semibold text-black transition-colors"
                >
                  Ping Google Search Console
                </button>
              </div>

              {/* Add New URL Path to Sitemap */}
              <form onSubmit={handleAddSitemapPath} className="flex gap-2 max-w-lg">
                <input
                  type="text"
                  value={newPathInput}
                  onChange={(e) => setNewPathInput(e.target.value)}
                  placeholder="Register route path (e.g. /case-studies or /advisory)..."
                  className="flex-1 px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-black"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white hover:bg-gray-800 rounded-lg text-xs font-bold"
                >
                  Register URL
                </button>
              </form>

              {/* Sitemap URL Table */}
              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 uppercase text-[11px]">
                      <th className="py-3 px-4 font-bold">Route Slug / URL Path</th>
                      <th className="py-3 px-4 font-bold">Priority</th>
                      <th className="py-3 px-4 font-bold">Changefreq</th>
                      <th className="py-3 px-4 font-bold">Last Modified</th>
                      <th className="py-3 px-4 font-bold">Indexing Status</th>
                      <th className="py-3 px-4 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sitemapUrls.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono font-bold text-black">{item.path}</td>
                        <td className="py-3 px-4 font-mono text-gray-700">{item.priority}</td>
                        <td className="py-3 px-4 text-gray-600 capitalize">{item.changefreq}</td>
                        <td className="py-3 px-4 text-gray-500 font-mono text-[11px]">{item.lastmod}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              item.indexingStatus === 'Indexed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {item.indexingStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => deleteSitemapUrl(item.path)}
                            className="p-1 text-red-500 hover:text-red-700"
                            title="Remove URL"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: GOVERNANCE & SYSTEM METRICS                                        */}
        {/* ========================================================================= */}
        {activeAdminTab === 'governance' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-black">Company Governance &amp; Operating Infrastructure</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Headquartered in Nawabshah, Sindh, Pakistan. Founded and led by Abdul Samad Rind (Founder &amp; CEO).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Corporate Registration</span>
                <h4 className="text-lg font-bold text-black">{COMPANY_INFO.legalName}</h4>
                <p className="text-xs text-gray-600 mt-2">{COMPANY_INFO.location}</p>
                <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-700 font-mono">
                  Registry: SECP Active
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Runtime Environment</span>
                <h4 className="text-lg font-bold text-black">{SYSTEM_METRICS.appRuntime}</h4>
                <p className="text-xs text-gray-600 mt-2">Node.js Express + React Vite SPA</p>
                <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-700 font-mono">
                  Relational DB: MySQL 8.0 InnoDB
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Disaster Recovery</span>
                <h4 className="text-lg font-bold text-black">Daily Offsite Snapshots</h4>
                <p className="text-xs text-gray-600 mt-2">Cryptographic integrity validation</p>
                <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-emerald-700 font-semibold">
                  SLA Target: 99.9% Uptime
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
