import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HomeIntroSplit } from './components/HomeIntroSplit';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { PartnersSection } from './components/PartnersSection';
import { TeamSection } from './components/TeamSection';
import { CertificateVerification } from './components/CertificateVerification';
import { ContactSection } from './components/ContactSection';
import { ClientPortal } from './components/ClientPortal';
import { AdminPortal } from './components/AdminPortal';
import { PortalAuthGate } from './components/PortalAuthGate';
import { LegalPageView } from './components/LegalPageView';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { MaintenanceScreen } from './components/MaintenanceScreen';
import { NotFoundPage } from './components/NotFoundPage';
import { ForbiddenPage } from './components/ForbiddenPage';
import { BlogSection } from './components/BlogSection';
import { ArticleDetailView } from './components/ArticleDetailView';
import { CareersSection } from './components/CareersSection';
import { OrbitLoader } from './components/common/OrbitLoader';
import { useCms } from './context/CmsContext';
import { isClientPortalEnabled } from './services/portalConfigService';
import { Lock } from 'lucide-react';

export function App() {
  const { maintenanceSettings } = useCms();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [portalRole, setPortalRole] = useState<string>('Client');
  const [selectedConsultationService, setSelectedConsultationService] = useState<string>('');
  const [currentArticleSlug, setCurrentArticleSlug] = useState<string>('');
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>('All');
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const VALID_ROUTES = [
    'home',
    'about',
    'services',
    'team',
    'verify',
    'careers',
    'jobs',
    'contact',
    'blog',
    'blogs',
    'article',
    'client-portal',
    'admin-portal',
    'superadmin',
    'privacy',
    'cookies',
    'terms',
    'security',
    'refund',
    '404',
    '403',
  ];

  // Helper to resolve clean path from pathname or hash
  const resolveRouteFromLocation = (): {
    tab: string;
    articleSlug?: string;
    category?: string;
  } => {
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    let path = window.location.pathname.replace(/^\/+|\/+$/g, '').trim();

    if (hash) {
      path = hash;
      const cleanPath = path === 'home' || !path ? '/home' : `/${path}`;
      window.history.replaceState(null, '', cleanPath);
    }

    // Check query params (e.g. ?category=Software+Architecture)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');

    if (!path || path === 'home') {
      return { tab: 'home' };
    }

    const lower = path.toLowerCase();
    if (lower === 'superadmin') {
      window.history.replaceState(null, '', '/admin-portal');
      return { tab: 'admin-portal' };
    }

    if (lower.startsWith('article/')) {
      const slug = path.slice(8).trim();
      return { tab: 'article', articleSlug: slug };
    }

    // Support both /blog/:slug and /article/:slug for deep article linking!
    if (lower.startsWith('blog/') || lower.startsWith('blogs/')) {
      const remainder = path.split('/').slice(1).join('/').trim();
      if (remainder.toLowerCase().startsWith('category/')) {
        const cat = remainder.slice(9).trim();
        return { tab: 'blog', category: decodeURIComponent(cat) };
      }
      if (remainder) {
        return { tab: 'article', articleSlug: remainder };
      }
      return { tab: 'blog', category: categoryParam || 'All' };
    }

    if (lower.startsWith('category/')) {
      const cat = path.slice(9).trim();
      return { tab: 'blog', category: decodeURIComponent(cat) };
    }

    if (lower.startsWith('services/')) {
      return { tab: 'services' };
    }

    if (lower === 'blog' || lower === 'blogs') {
      return { tab: 'blog', category: categoryParam || 'All' };
    }

    if (VALID_ROUTES.includes(lower)) {
      return { tab: lower };
    }

    return { tab: '404' };
  };

  useEffect(() => {
    const handleNavigation = () => {
      const { tab, articleSlug, category } = resolveRouteFromLocation();
      setActiveTab(tab);
      if (articleSlug) {
        setCurrentArticleSlug(articleSlug);
      }
      if (category) {
        setSelectedBlogCategory(category);
      }
    };

    handleNavigation();
    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, []);

  const handleSelectServiceForConsultation = (serviceTitle: string) => {
    setSelectedConsultationService(serviceTitle);
    handleTabChange('contact');
  };

  const handleTabChange = (tab: string, category?: string) => {
    let targetPath = '/';
    if (tab.startsWith('article/')) {
      const slug = tab.slice(8).trim();
      setCurrentArticleSlug(slug);
      setActiveTab('article');
      targetPath = `/article/${slug}`;
    } else if (tab === 'blog') {
      setActiveTab('blog');
      if (category && category !== 'All') {
        setSelectedBlogCategory(category);
        targetPath = `/blog?category=${encodeURIComponent(category)}`;
      } else {
        setSelectedBlogCategory('All');
        targetPath = '/blog';
      }
    } else {
      setActiveTab(tab);
      targetPath = `/${tab}`;
    }

    if (
      window.location.pathname !== targetPath ||
      window.location.hash ||
      (category && !window.location.search.includes(encodeURIComponent(category)))
    ) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 0. Cute Initial App Loader
  if (isInitialLoading) {
    return <OrbitLoader size="fullscreen" label="Launching ORBIT-I Universe..." />;
  }

  // 1. Maintenance Mode Interceptor:
  // When enabled from Admin Console, public traffic sees Maintenance Screen
  // Admin portal route (#admin-portal or #superadmin) bypasses it so officers can login and manage
  if (
    maintenanceSettings.enabled &&
    activeTab !== 'admin-portal' &&
    activeTab !== 'superadmin'
  ) {
    return (
      <MaintenanceScreen
        onBypass={() => handleTabChange('admin-portal')}
      />
    );
  }

  // 2. 403 Forbidden Access Page
  if (activeTab === '403') {
    return (
      <ForbiddenPage
        setActiveTab={handleTabChange}
        requestedRoute={window.location.pathname || '/admin-portal'}
      />
    );
  }

  // 3. 404 Not Found Error Page
  if (activeTab === '404') {
    return (
      <NotFoundPage
        setActiveTab={handleTabChange}
        requestedRoute={window.location.pathname || 'unknown-route'}
      />
    );
  }

  const isPortalView = activeTab === 'admin-portal' || activeTab === 'client-portal' || activeTab === 'superadmin';

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative transition-colors duration-200">
      {/* Navbar with Contact Us placed directly beside hamburger menu button (Hidden inside executive portals) */}
      {!isPortalView && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab, cat) => handleTabChange(tab, cat)}
          onSelectCategory={(cat) => {
            setSelectedBlogCategory(cat);
            handleTabChange('blog', cat);
          }}
          portalRole={portalRole}
        />
      )}

      <main className="flex-1">
        {/* 1. HOME VIEW */}
        {activeTab === 'home' && (
          <div>
            <Hero setActiveTab={handleTabChange} />
            <PartnersSection />
            <HomeIntroSplit setActiveTab={handleTabChange} />
            <ServicesSection
              onSelectServiceForConsultation={handleSelectServiceForConsultation}
            />
          </div>
        )}

        {/* 2. ABOUT VIEW */}
        {activeTab === 'about' && (
          <div>
            <AboutSection />
          </div>
        )}

        {/* 3. SERVICES VIEW */}
        {activeTab === 'services' && (
          <ServicesSection
            onSelectServiceForConsultation={handleSelectServiceForConsultation}
          />
        )}

        {/* 4. TEAM VIEW: Clean Meet the ORBIT-I Team Cards with genuine Abdul Samad picture */}
        {activeTab === 'team' && <TeamSection />}

        {/* 5. VERIFICATION VIEW */}
        {activeTab === 'verify' && <CertificateVerification />}

        {/* CAREERS & INTERNSHIP RECRUITMENT VIEW */}
        {(activeTab === 'careers' || activeTab === 'jobs') && (
          <CareersSection
            onSelectRoleForApplication={(roleTitle) => {
              setSelectedConsultationService(`Application: ${roleTitle}`);
              handleTabChange('contact');
            }}
          />
        )}

        {/* 6. CONTACT VIEW */}
        {activeTab === 'contact' && (
          <ContactSection initialService={selectedConsultationService} />
        )}

        {/* 7. INSIGHTS & ENGINEERING BLOG ARCHIVE */}
        {activeTab === 'blog' && (
          <BlogSection
            initialCategory={selectedBlogCategory}
            onSelectArticle={(slug) => {
              setCurrentArticleSlug(slug);
              handleTabChange(`article/${slug}`);
            }}
          />
        )}

        {/* 8. ARTICLE READER (TECHNICAL DEEP DIVE MATCHING SCREENSHOT) */}
        {activeTab === 'article' && (
          <ArticleDetailView
            slug={currentArticleSlug}
            onBackToBlog={() => handleTabChange('blog')}
            onSelectArticle={(slug) => {
              setCurrentArticleSlug(slug);
              handleTabChange(`article/${slug}`);
            }}
            onSelectCategory={(cat) => {
              setSelectedBlogCategory(cat);
              handleTabChange('blog', cat);
            }}
          />
        )}

        {/* 9. CLIENT PORTAL VIEW (Controlled by Superadmin Gatekeeper ON/OFF) */}
        {activeTab === 'client-portal' && (
          isClientPortalEnabled() ? (
            <PortalAuthGate portalType="client">
              <ClientPortal setActiveTab={handleTabChange} />
            </PortalAuthGate>
          ) : (
            <div className="min-h-screen py-24 bg-[#fafbfc] dark:bg-gray-900 flex items-center justify-center px-4">
              <div className="max-w-md w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800">
                  <Lock className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Client Portal Offline
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  Client Organization workspaces are temporarily restricted by ORBIT-I System Administration. Please contact company executive leadership for access assistance.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => handleTabChange('home')}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold transition-colors"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {/* 8. ADMIN PORTAL VIEW (Hidden from public navigation, protected by strict PortalAuthGate) */}
        {activeTab === 'admin-portal' && (
          <PortalAuthGate portalType="admin">
            <AdminPortal setActiveTab={handleTabChange} />
          </PortalAuthGate>
        )}

        {/* DEDICATED SEPARATE LEGAL PAGES (Fully editable from Admin Console CMS) */}
        {activeTab === 'privacy' && (
          <LegalPageView policyType="privacy" setActiveTab={handleTabChange} />
        )}

        {activeTab === 'cookies' && (
          <LegalPageView policyType="cookies" setActiveTab={handleTabChange} />
        )}

        {activeTab === 'terms' && (
          <LegalPageView policyType="terms" setActiveTab={handleTabChange} />
        )}

        {activeTab === 'security' && (
          <LegalPageView policyType="security" setActiveTab={handleTabChange} />
        )}

        {activeTab === 'refund' && (
          <LegalPageView policyType="refund" setActiveTab={handleTabChange} />
        )}
      </main>

      {/* Floating WhatsApp Action Widget (Hidden inside executive portals) */}
      {!isPortalView && <WhatsAppFloatingButton />}

      {/* Cookie Consent & IP Telemetry Banner */}
      {!isPortalView && <CookieConsentBanner setActiveTab={handleTabChange} />}

      {/* Footer (Hidden inside executive portals) */}
      {!isPortalView && <Footer setActiveTab={handleTabChange} />}
    </div>
  );
}

export default App;
