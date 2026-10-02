import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HomeIntroSplit } from './components/HomeIntroSplit';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
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
import { useCms } from './context/CmsContext';

export function App() {
  const { maintenanceSettings } = useCms();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [portalRole, setPortalRole] = useState<string>('Client');
  const [selectedConsultationService, setSelectedConsultationService] = useState<string>('');
  const [currentArticleSlug, setCurrentArticleSlug] = useState<string>('');

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
  const resolveRouteFromLocation = (): { tab: string; articleSlug?: string } => {
    // 1. If someone arrives with an old # hash, extract and convert it to clean path
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    let path = window.location.pathname.replace(/^\/+|\/+$/g, '').trim();

    if (hash) {
      path = hash;
      const cleanPath = path === 'home' || !path ? '/' : `/${path}`;
      window.history.replaceState(null, '', cleanPath);
    }

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

    if (lower === 'blog') {
      return { tab: 'blog' };
    }

    if (VALID_ROUTES.includes(lower)) {
      return { tab: lower };
    }

    return { tab: '404' };
  };

  useEffect(() => {
    const handleNavigation = () => {
      const { tab, articleSlug } = resolveRouteFromLocation();
      setActiveTab(tab);
      if (articleSlug) {
        setCurrentArticleSlug(articleSlug);
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

  const handleTabChange = (tab: string) => {
    let targetPath = '/';
    if (tab.startsWith('article/')) {
      const slug = tab.slice(8).trim();
      setCurrentArticleSlug(slug);
      setActiveTab('article');
      targetPath = `/article/${slug}`;
    } else {
      setActiveTab(tab);
      targetPath = tab === 'home' ? '/' : `/${tab}`;
    }

    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-black selection:text-white relative">
      {/* Navbar with Contact Us placed directly beside hamburger menu button (Hidden inside executive portals) */}
      {!isPortalView && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          portalRole={portalRole}
        />
      )}

      <main className="flex-1">
        {/* 1. HOME VIEW */}
        {activeTab === 'home' && (
          <div>
            <Hero setActiveTab={handleTabChange} />
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
            onSelectArticle={(slug) => {
              setCurrentArticleSlug(slug);
              handleTabChange(`article/${slug}`);
            }}
          />
        )}

        {/* 8. ARTICLE READER (TECHNICAL DEEP DIVE) */}
        {activeTab === 'article' && (
          <ArticleDetailView
            slug={currentArticleSlug}
            onBackToBlog={() => handleTabChange('blog')}
            onSelectArticle={(slug) => {
              setCurrentArticleSlug(slug);
              handleTabChange(`article/${slug}`);
            }}
          />
        )}

        {/* 9. CLIENT PORTAL VIEW (Protected by PortalAuthGate with 3-attempt limit & time lockout) */}
        {activeTab === 'client-portal' && (
          <PortalAuthGate portalType="client">
            <ClientPortal setActiveTab={handleTabChange} />
          </PortalAuthGate>
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
