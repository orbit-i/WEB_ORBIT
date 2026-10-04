import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  ServiceDetail,
  MaintenanceSettings,
  NotFoundPageSettings,
  TeamMember,
  CompanyInfo,
  VerifiedCertificate,
  JobOpening,
  PageContentItem,
  PartnerAlliance,
  PartnersSectionSettings,
  TrustBadgeItem,
} from '../types';
import {
  COMPANY_INFO,
  VERIFIED_SERVICES,
  INITIAL_TEAM_MEMBERS,
  VERIFIED_CERTIFICATES,
  INITIAL_JOB_OPENINGS,
  DEFAULT_PAGE_CONTENTS,
  INITIAL_PARTNERS,
  DEFAULT_PARTNERS_SETTINGS,
} from '../data/orbitData';

export interface LegalSection {
  id: string;
  heading: string;
  body: string;
}

export interface LegalPageDoc {
  id: 'privacy' | 'terms' | 'security' | 'refund' | 'cookies';
  slug: string;
  title: string;
  lastUpdated: string;
  summary: string;
  metaDescription: string;
  sections: LegalSection[];
}

export interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  robotsDirectives: string;
  schemaOrgType: string;
  author: string;
  googleVerificationTag: string;
  indexingEnabled: boolean;
}

export interface SitemapUrlEntry {
  path: string;
  priority: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  lastmod: string;
  indexingStatus: 'Indexed' | 'Submitted' | 'Discovered';
}

export interface ContentArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  content: string;
  status: 'published' | 'draft';
  featuredImage?: string;
  imageAlt?: string;
  lastModified?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeywords?: string;
  canonicalUrl?: string;
  seoScore?: number;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
  altText: string;
  tags: string[];
  uploadedAt: string;
}

export interface CookieCategory {
  id: string;
  name: string;
  required: boolean;
  enabled: boolean;
  description: string;
  cookies: string[];
}

export interface CookieSettings {
  bannerEnabled: boolean;
  bannerHeadline: string;
  bannerMessage: string;
  ipLoggingEnabled: boolean;
  ipAnonymization: boolean;
  cookieExpiryDays: number;
  categories: CookieCategory[];
}

export interface VisitorTelemetryLog {
  id: string;
  ip: string;
  path: string;
  timestamp: string;
  userAgent: string;
  consentGiven: 'accepted_all' | 'essential_only' | 'custom' | 'pending';
  activeCookies: string[];
  location: string;
}

interface CmsContextType {
  legalPages: Record<string, LegalPageDoc>;
  updateLegalPage: (doc: LegalPageDoc) => void;
  resetLegalPagesToDefault: () => void;

  seoSettings: SeoSettings;
  updateSeoSettings: (settings: SeoSettings) => void;

  sitemapUrls: SitemapUrlEntry[];
  updateSitemapUrl: (index: number, entry: SitemapUrlEntry) => void;
  addSitemapUrl: (entry: SitemapUrlEntry) => void;
  deleteSitemapUrl: (path: string) => void;

  articles: ContentArticle[];
  addArticle: (article: ContentArticle) => void;
  updateArticle: (article: ContentArticle) => void;
  deleteArticle: (id: string) => void;

  mediaAssets: MediaAsset[];
  addMediaAsset: (asset: MediaAsset) => void;
  updateMediaAsset: (asset: MediaAsset) => void;
  deleteMediaAsset: (id: string) => void;

  systemTags: string[];
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;

  cookieSettings: CookieSettings;
  updateCookieSettings: (settings: CookieSettings) => void;

  visitorTelemetryLogs: VisitorTelemetryLog[];
  logVisitorEvent: (path: string, consent: 'accepted_all' | 'essential_only' | 'custom' | 'pending') => void;
  clearTelemetryLogs: () => void;

  services: ServiceDetail[];
  addService: (service: ServiceDetail) => Promise<void>;
  updateService: (service: ServiceDetail) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  resetServicesToDefault: () => void;

  // Team & Leadership CRUD
  teamMembers: TeamMember[];
  addTeamMember: (member: TeamMember) => Promise<void>;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;
  resetTeamToDefault: () => void;

  // Certificates CRUD
  certificates: VerifiedCertificate[];
  addCertificate: (cert: VerifiedCertificate) => Promise<void>;
  updateCertificate: (id: string, updates: Partial<VerifiedCertificate>) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;

  // Jobs / Careers CRUD
  jobs: JobOpening[];
  addJob: (job: JobOpening) => Promise<void>;
  updateJob: (id: string, updates: Partial<JobOpening>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  resetJobsToDefault: () => void;

  // Contact Inquiries CRUD
  inquiries: any[];
  fetchInquiries: () => Promise<void>;
  updateInquiryStatus: (id: string, status: string) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;

  // Company Profile CRUD
  companyInfo: CompanyInfo;
  updateCompanyInfo: (data: Partial<CompanyInfo>) => Promise<void>;

  // Enterprise MySQL & System Telemetry
  dbStatus: any;
  refreshDbStatus: () => Promise<void>;

  maintenanceSettings: MaintenanceSettings;
  updateMaintenanceSettings: (settings: MaintenanceSettings) => void;

  notFoundSettings: NotFoundPageSettings;
  updateNotFoundSettings: (settings: NotFoundPageSettings) => void;

  // Dynamic Editable Page Contents
  pageContents: Record<string, PageContentItem>;
  updatePageContent: (pageKey: string, data: Partial<PageContentItem>) => void;
  resetPageContentsToDefault: () => void;

  // Verified Strategic Alliances & Institutional Partners CMS
  partners: PartnerAlliance[];
  partnersSettings: PartnersSectionSettings;
  addPartner: (partner: PartnerAlliance) => Promise<void>;
  updatePartner: (id: string, updates: Partial<PartnerAlliance>) => Promise<void>;
  deletePartner: (id: string) => Promise<void>;
  resetPartnersToDefault: () => void;
  updatePartnersSettings: (settings: Partial<PartnersSectionSettings>) => Promise<void>;
  resetPartnersSettingsToDefault: () => void;
}

const DEFAULT_LEGAL_PAGES: Record<string, LegalPageDoc> = {
  privacy: {
    id: 'privacy',
    slug: 'privacy',
    title: 'Privacy & Data Protection Policy',
    lastUpdated: 'September 2026',
    summary:
      'This Privacy Policy outlines how ORBIT-I Private Limited collects, safeguards, and utilizes client and visitor data, including full-page IP addresses, browser cookies, and digital telemetry in compliance with international data protection standards.',
    metaDescription:
      'Official Privacy & Data Protection Policy for ORBIT-I Private Limited (Nawabshah, Sindh, Pakistan). Learn how IP telemetry, cookies, and client data are securely handled.',
    sections: [
      {
        id: 'p-1',
        heading: '1. Identification & Operating Jurisdiction',
        body: 'ORBIT-I Private Limited is an incorporated software engineering firm headquartered in Nawabshah, Sindh, Pakistan. This privacy policy applies to all domain endpoints, application portals, consulting workflows, and telemetry services managed under the ORBIT-I infrastructure.',
      },
      {
        id: 'p-2',
        heading: '2. IP Address Logging & Network Telemetry Across All Pages',
        body: 'When you navigate any page or route across the ORBIT-I platform, our server-side daemons and application firewalls automatically capture your Internet Protocol (IP) address, HTTP User-Agent header, referer URLs, request timestamps, and response latencies. This telemetry is collected strictly for DDoS mitigation, brute-force authentication protection (including our 3-attempt cooldown invariant), rate-limiting, and fault diagnosis.',
      },
      {
        id: 'p-3',
        heading: '3. Browser Cookies & Local Client Storage',
        body: 'We utilize essential session cookies and browser localStorage to securely store authentication session tokens, portal role state, security lockout timers, and cookie consent preferences. We do not sell, rent, or broker any IP address or browsing telemetry to third-party ad exchanges.',
      },
      {
        id: 'p-4',
        heading: '4. Information Voluntarily Provided',
        body: 'Through our contact and consultation forms, clients may provide their full name, corporate email address, organization name, phone/WhatsApp number, and project technical specifications. This data is encrypted and retained solely for contract execution and service delivery.',
      },
      {
        id: 'p-5',
        heading: '5. Rights to Access, Rectification & Erasure (GDPR / DSAR)',
        body: 'You maintain the right to inspect, export, or request the immediate permanent erasure of all logged IP records and personal credentials by emailing our compliance office at contactus@orbit-i.tech. All valid requests are processed within 72 hours.',
      },
    ],
  },
  cookies: {
    id: 'cookies',
    slug: 'cookies',
    title: 'Cookie & IP Data Collection Policy',
    lastUpdated: 'September 2026',
    summary:
      'Comprehensive disclosure regarding all cookies, web beacons, local storage tokens, and IP telemetry mechanisms operating across every page of the ORBIT-I platform.',
    metaDescription:
      'Official Cookie & IP Data Collection Policy of ORBIT-I Private Limited. Complete transparent guide on session cookies, security tokens, and IP tracking.',
    sections: [
      {
        id: 'c-1',
        heading: '1. What Are Cookies & How ORBIT-I Uses Them',
        body: 'Cookies are small alphanumeric files placed on your browser or device memory. Across every page of our web application, cookies allow our system to distinguish your session, remember security preferences, enforce multi-tier rate limits, and ensure system uptime.',
      },
      {
        id: 'c-2',
        heading: '2. Strictly Essential Cookies & Security Invariants',
        body: 'These cookies are required for platform security and basic operations. They include: (a) "orbit_auth_session" for active role-authenticated client and administrator sessions, (b) "orbit_auth_attempts" and "orbit_auth_lockout" which enforce our 3-attempt incorrect password limit and 60-second cooldown timer, and (c) "orbit_cookie_consent" which preserves your privacy choice across visits.',
      },
      {
        id: 'c-3',
        heading: '3. Full Page IP Address Collection & Logging',
        body: 'Every HTTP request to any page path (such as /, /about, /services, /verify, /contact, or portal routes) logs the visitor IP address, origin country/region, and device fingerprint. This data enables high-performance regional edge routing, prevents automated scraping attacks, and validates certificate authenticity queries.',
      },
      {
        id: 'c-4',
        heading: '4. Performance, Analytics & Telemetry Cookies',
        body: 'When enabled by the user, lightweight telemetry cookies collect anonymized performance metrics including page render durations, component interaction rates, and error traces to optimize speed for users connecting from Pakistan and international networks.',
      },
      {
        id: 'c-5',
        heading: '5. Managing & Revoking Cookie Preferences',
        body: 'Visitors can modify their cookie choices at any moment via our on-screen Cookie Consent Manager or by clearing browser cache. Disabling strictly essential security cookies will prevent authenticated access to client project dashboards.',
      },
    ],
  },
  terms: {
    id: 'terms',
    slug: 'terms',
    title: 'Terms & Conditions',
    lastUpdated: 'September 2026',
    summary:
      'The contractual terms governing software architecture, milestone delivery schedules, and intellectual property transfer by ORBIT-I Private Limited.',
    metaDescription:
      'Standard terms and conditions governing enterprise software engineering, milestone warranties, and 100% IP ownership by ORBIT-I Private Limited.',
    sections: [
      {
        id: 't-1',
        heading: '1. Statement of Work & Project Execution',
        body: 'Every custom engineering project is initiated via a formal Statement of Work (SOW) specifying deliverables, sprint breakdown, target delivery dates, and architectural scope. Any scope changes require written mutual consent via Change Order.',
      },
      {
        id: 't-2',
        heading: '2. Intellectual Property (IP) Ownership',
        body: 'Upon full payment of agreed project milestone invoices, the client retains 100% unencumbered intellectual property rights to custom application source code, relational database schemas, and proprietary business logic developed during the engagement.',
      },
      {
        id: 't-3',
        heading: '3. Standard 30-Day Stabilization Warranty',
        body: 'All custom software solutions deployed to production by ORBIT-I Private Limited include a complimentary 30-day post-launch warranty covering bug fixes, defect remediation, and system stabilization at no additional charge.',
      },
      {
        id: 't-4',
        heading: '4. Mutual Non-Disclosure & Confidentiality',
        body: 'Both parties agree to treat all business plans, customer databases, technical architectures, and financial agreements as strictly confidential trade secrets during and following the termination of the engagement.',
      },
    ],
  },
  security: {
    id: 'security',
    slug: 'security',
    title: 'Security Policy',
    lastUpdated: 'September 2026',
    summary:
      'Architectural security standards, data encryption at rest and in transit, and defensive posture maintained by ORBIT-I Private Limited.',
    metaDescription:
      'Information on ORBIT-I security measures, TLS 1.3 encryption, database injection prevention, rate limiting, and offsite disaster recovery backups.',
    sections: [
      {
        id: 's-1',
        heading: '1. In-Transit & At-Rest Encryption',
        body: 'All web traffic and REST APIs enforce TLS 1.3 encryption in transit with automated HSTS headers. Sensitive database credentials, API tokens, and private keys are encrypted in secure environment vaults with zero exposure to client-side bundles.',
      },
      {
        id: 's-2',
        heading: '2. Defensive SQL Injection & Parameterization',
        body: 'All database queries are strictly parameterized through prepared statements and typed ORM layers, eliminating SQL injection vulnerabilities across all transactional pipelines.',
      },
      {
        id: 's-3',
        heading: '3. Brute-Force Rate Limiting & Cooldown Invariants',
        body: 'Client and administrative portals enforce multi-tier rate limiting. Three consecutive failed authentication attempts automatically trigger a 60-second security cooldown with real-time countdown enforcement.',
      },
      {
        id: 's-4',
        heading: '4. Automated Daily Offsite Backups',
        body: 'Relational database snapshots and transaction logs are captured automatically on daily schedules with cryptographic integrity checks and stored across redundant disaster recovery regions.',
      },
    ],
  },
  refund: {
    id: 'refund',
    slug: 'refund',
    title: 'Refund Policy',
    lastUpdated: 'September 2026',
    summary:
      'Policy detailing milestone payments, engineering sprint allocations, and retainer cancellation procedures.',
    metaDescription:
      'Refund and retainer policies for custom software engineering engagements with ORBIT-I Private Limited.',
    sections: [
      {
        id: 'r-1',
        heading: '1. Milestone-Based Engineering Commitments',
        body: 'Because custom software development involves dedicated senior engineering hours and compute resource allocation, payments for delivered and approved project milestones are non-refundable once work has commenced.',
      },
      {
        id: 'r-2',
        heading: '2. Advance Deposits & Initial Phase',
        body: 'If a project is cancelled prior to the initiation of technical architecture and sprint development, the deposit is eligible for a refund minus administrative and discovery consultation expenses.',
      },
      {
        id: 'r-3',
        heading: '3. Retainer & SLA Subscriptions',
        body: 'Monthly engineering maintenance retainers can be cancelled with 30 days written notice. Unused prepaid maintenance hours from remaining subsequent months will be credited or refunded.',
      },
    ],
  },
};

const DEFAULT_COOKIE_SETTINGS: CookieSettings = {
  bannerEnabled: true,
  bannerHeadline: 'Transparent IP & Cookie Data Collection Notice',
  bannerMessage:
    'ORBIT-I Private Limited uses essential cookies, full-page IP logging, and session telemetry to ensure platform security, prevent unauthorized brute-force attempts, and improve performance. By using our platform, you acknowledge our data collection practices under our Privacy & Cookie Policies.',
  ipLoggingEnabled: true,
  ipAnonymization: false,
  cookieExpiryDays: 365,
  categories: [
    {
      id: 'essential',
      name: 'Strictly Essential & Security Cookies',
      required: true,
      enabled: true,
      description:
        'Required for authentication sessions, 3-attempt password lockout cooldowns, and anti-tamper security invariants. Cannot be disabled.',
      cookies: ['orbit_auth_session', 'orbit_auth_attempts', 'orbit_auth_lockout', 'orbit_cookie_consent'],
    },
    {
      id: 'analytics',
      name: 'Network Telemetry & IP Logging',
      required: false,
      enabled: true,
      description:
        'Logs visitor IP address, page path requests, browser User-Agent, and latency diagnostics to optimize speed and protect against DDoS attacks.',
      cookies: ['orbit_telemetry_id', 'orbit_visitor_ip_hash', 'orbit_page_session'],
    },
    {
      id: 'functional',
      name: 'Functional & Experience Cookies',
      required: false,
      enabled: true,
      description:
        'Remembers UI preferences, consultation form drafts, and preferred department filters.',
      cookies: ['orbit_ui_prefs', 'orbit_consultation_draft'],
    },
  ],
};

const DEFAULT_SEO_SETTINGS: SeoSettings = {
  siteTitle: 'ORBIT-I Private Limited | Enterprise Software & Technology Solutions',
  metaDescription:
    'ORBIT-I Private Limited builds custom enterprise web applications, mobile platforms, and secure software systems in Nawabshah, Sindh, Pakistan.',
  keywords: [
    'software company nawabshah',
    'orbit-i private limited',
    'web application development pakistan',
    'custom software solutions',
    'enterprise software sindh',
    'react nodejs engineering',
    'mobile app engineering pakistan',
    'technology solutions sindh',
  ],
  canonicalUrl: 'https://orbit-i.tech',
  ogImage: 'https://orbit-i.tech/orbit-circular-logo.png',
  robotsDirectives: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  schemaOrgType: 'Organization',
  author: 'Abdul Samad Rind (Founder & CEO)',
  googleVerificationTag: 'google-site-verification=orbit-i-official-verified-2026',
  indexingEnabled: true,
};

const DEFAULT_SITEMAP_URLS: SitemapUrlEntry[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-09-30', indexingStatus: 'Indexed' },
  { path: '/about', priority: '0.8', changefreq: 'monthly', lastmod: '2026-09-30', indexingStatus: 'Indexed' },
  { path: '/services', priority: '0.9', changefreq: 'weekly', lastmod: '2026-09-30', indexingStatus: 'Indexed' },
  { path: '/team', priority: '0.8', changefreq: 'monthly', lastmod: '2026-09-30', indexingStatus: 'Indexed' },
  { path: '/verify', priority: '0.7', changefreq: 'daily', lastmod: '2026-09-30', indexingStatus: 'Indexed' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly', lastmod: '2026-09-30', indexingStatus: 'Indexed' },
  { path: '/privacy', priority: '0.6', changefreq: 'yearly', lastmod: '2026-09-30', indexingStatus: 'Indexed' },
  { path: '/cookies', priority: '0.6', changefreq: 'yearly', lastmod: '2026-09-30', indexingStatus: 'Indexed' },
  { path: '/terms', priority: '0.5', changefreq: 'yearly', lastmod: '2026-09-30', indexingStatus: 'Indexed' },
  { path: '/security', priority: '0.6', changefreq: 'yearly', lastmod: '2026-09-30', indexingStatus: 'Indexed' },
  { path: '/refund', priority: '0.4', changefreq: 'yearly', lastmod: '2026-09-30', indexingStatus: 'Indexed' },
];

const DEFAULT_ARTICLES: ContentArticle[] = [
  {
    id: 'art-1',
    slug: 'architecting-high-concurrency-microservices-2026',
    title: 'Architecting High-Concurrency Microservices for Modern Pakistani Enterprises',
    category: 'Software Engineering',
    author: 'Muhammad Muneeb Ur Rahman Shahzad (Co-Founder & CTO)',
    publishedDate: 'September 2026',
    readTime: '6 min read',
    tags: ['Microservices', 'Distributed Systems', 'MySQL', 'Node.js', 'Architecture'],
    excerpt:
      'A deep dive into zero-downtime database migrations, connection pooling, and latency reduction for regional e-commerce and logistics platforms.',
    content: `Building resilient enterprise applications in emerging markets requires disciplined architectural decisions. In this engineering briefing, our core technical team examines how we structure distributed services to handle peak concurrent transaction volumes without cascading failures. We detail connection pool optimizations in relational MySQL instances, Redis caching strategies, and idempotent background queue workers.`,
    status: 'published',
  },
  {
    id: 'art-2',
    slug: 'strict-type-safety-full-stack-web-applications',
    title: 'Why Strict Type-Safety is the Foundation of Long-Term Software Maintainability',
    category: 'Best Practices',
    author: 'Abdul Samad Rind (Founder & CEO)',
    publishedDate: 'August 2026',
    readTime: '4 min read',
    tags: ['TypeScript', 'Type Safety', 'Clean Code', 'Web Development'],
    excerpt:
      'How end-to-end TypeScript validation from API contracts to UI components eliminates over 80% of runtime production errors.',
    content: `When businesses invest in custom software, technical debt is often their greatest hidden risk. At ORBIT-I Private Limited, every production system enforces strict compilation gates, shared DTO interfaces, and validated schema contracts. This article covers practical patterns for maintaining clean velocity across multi-developer sprint cycles.`,
    status: 'published',
  },
  {
    id: 'art-3',
    slug: 'credential-integrity-tamper-evident-verification',
    title: 'Digital Credential Integrity: Engineering Central Registries for Student Verification',
    category: 'Security & Systems',
    author: 'Maria Almani (Co-Founder & COO)',
    publishedDate: 'July 2026',
    readTime: '5 min read',
    tags: ['Verification', 'Credential Integrity', 'Security', 'EdTech'],
    excerpt:
      'Exploring how ORBIT-I built a public cryptographic registry for trainee certification and academic validation.',
    content: `Fake certificate generation undermines educational credibility worldwide. We discuss the cryptographic indexing, unique reference hashes, and high-speed query models behind the ORBIT-I Official Verification Registry.`,
    status: 'published',
  },
];

const DEFAULT_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'med-1',
    name: 'Abdul Samad Rind — Founder & CEO Official Picture',
    url: '/AbdulSamad.jpeg',
    type: 'image/jpeg',
    size: '66 KB',
    altText: 'Abdul Samad Rind, Founder & CEO of ORBIT-I Private Limited',
    tags: ['Leadership', 'CEO', 'Founder', 'Abdul Samad', 'Executive'],
    uploadedAt: '2026-09-30',
  },
  {
    id: 'med-2',
    name: 'ORBIT-I Official Circular Space Logo',
    url: '/orbit-circular-logo.png',
    type: 'image/png',
    size: '64 KB',
    altText: 'ORBIT-I Private Limited official circular space brand emblem',
    tags: ['Logo', 'Brand', 'Circular', 'Space', 'Emblem'],
    uploadedAt: '2026-09-30',
  },
  {
    id: 'med-3',
    name: 'ORBIT-I Favicon Browser Icon',
    url: '/orbit-favicon.png',
    type: 'image/png',
    size: '16 KB',
    altText: 'ORBIT-I favicon browser icon',
    tags: ['Favicon', 'Icon', 'Browser'],
    uploadedAt: '2026-09-30',
  },
  {
    id: 'med-4',
    name: 'ORBIT-I Official Brand Header Logo',
    url: '/orbit-i-logo.png',
    type: 'image/png',
    size: '650 KB',
    altText: 'ORBIT-I Private Limited primary high-resolution emblem',
    tags: ['Logo', 'Brand', 'Header', 'HighRes'],
    uploadedAt: '2026-09-30',
  },
];

const DEFAULT_TAGS = [
  'Software Engineering',
  'TypeScript',
  'React',
  'Node.js',
  'MySQL',
  'Nawabshah',
  'Sindh',
  'Pakistan',
  'API Security',
  'Cloud Architecture',
  'Mobile Apps',
  'Enterprise',
  'Verification Registry',
  'Legal Policies',
  'IP Telemetry',
  'Cookie Consent',
];

const INITIAL_TELEMETRY: VisitorTelemetryLog[] = [
  {
    id: 'tel-1',
    ip: '119.160.118.42',
    path: '/',
    timestamp: '2026-09-30 08:35:12',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0',
    consentGiven: 'accepted_all',
    activeCookies: ['orbit_auth_session', 'orbit_telemetry_id', 'orbit_cookie_consent'],
    location: 'Karachi, Sindh, PK',
  },
  {
    id: 'tel-2',
    ip: '182.180.75.19',
    path: '/services',
    timestamp: '2026-09-30 08:36:44',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko)',
    consentGiven: 'accepted_all',
    activeCookies: ['orbit_cookie_consent', 'orbit_telemetry_id'],
    location: 'Lahore, Punjab, PK',
  },
  {
    id: 'tel-3',
    ip: '39.40.89.201',
    path: '/verify',
    timestamp: '2026-09-30 08:38:05',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15',
    consentGiven: 'essential_only',
    activeCookies: ['orbit_cookie_consent'],
    location: 'Islamabad, PK',
  },
  {
    id: 'tel-4',
    ip: '202.163.74.88',
    path: '/cookies',
    timestamp: '2026-09-30 08:39:20',
    userAgent: 'Mozilla/5.0 (Linux; Android 14) Chrome/127.0',
    consentGiven: 'accepted_all',
    activeCookies: ['orbit_auth_session', 'orbit_cookie_consent', 'orbit_telemetry_id'],
    location: 'Nawabshah, Sindh, PK',
  },
];

const DEFAULT_MAINTENANCE_SETTINGS: MaintenanceSettings = {
  enabled: false,
  title: 'ORBIT-I Infrastructure Maintenance in Progress',
  message:
    'Our core cloud systems, application engines, and staging databases are undergoing scheduled security hardening and capacity scaling. We will return to full operations shortly.',
  estimatedEnd: 'September 30, 2026 at 18:00 PKT',
  allowAdminBypass: true,
  emergencyContactEmail: 'support@orbit-i.com',
  emergencyContactPhone: '+92 300 1234567',
};

const DEFAULT_NOT_FOUND_SETTINGS: NotFoundPageSettings = {
  title: 'System Coordinate Not Located',
  errorCode: 'ERR_404_ORBIT_NOT_FOUND',
  message:
    'The requested URL or operational namespace does not match any registered endpoint in the ORBIT-I digital network. Use the options below to navigate back to safety.',
  supportButtonText: 'Contact Technical Operations',
  showSearch: true,
  suggestedLinks: [
    { label: 'Platform Home', tab: 'home' },
    { label: 'AI & Engineering Services', tab: 'services' },
    { label: 'Company Overview', tab: 'about' },
    { label: 'Intern Verification', tab: 'verify' },
    { label: 'Client Portal', tab: 'client-portal' },
    { label: 'Contact Us', tab: 'contact' },
  ],
};

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('orbit_cms_team_members');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_TEAM_MEMBERS;
  });

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    const saved = localStorage.getItem('orbit_cms_company_info');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return COMPANY_INFO;
  });

  const [certificates, setCertificates] = useState<VerifiedCertificate[]>(() => {
    const saved = localStorage.getItem('orbit_cms_certificates');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return Object.values(VERIFIED_CERTIFICATES);
  });

  const [jobs, setJobs] = useState<JobOpening[]>(() => {
    const saved = localStorage.getItem('orbit_cms_jobs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return INITIAL_JOB_OPENINGS;
  });

  const [inquiries, setInquiries] = useState<any[]>(() => {
    const saved = localStorage.getItem('orbit_cms_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  const [dbStatus, setDbStatus] = useState<any>(null);

  const [services, setServices] = useState<ServiceDetail[]>(() => {
    const saved = localStorage.getItem('orbit_cms_services_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return VERIFIED_SERVICES;
  });

  const [maintenanceSettings, setMaintenanceSettings] = useState<MaintenanceSettings>(() => {
    const saved = localStorage.getItem('orbit_cms_maintenance_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_MAINTENANCE_SETTINGS;
  });

  const [notFoundSettings, setNotFoundSettings] = useState<NotFoundPageSettings>(() => {
    const saved = localStorage.getItem('orbit_cms_not_found_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_NOT_FOUND_SETTINGS;
  });

  const [pageContents, setPageContents] = useState<Record<string, PageContentItem>>(() => {
    const saved = localStorage.getItem('orbit_cms_page_contents_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return DEFAULT_PAGE_CONTENTS;
  });

  const [partners, setPartners] = useState<PartnerAlliance[]>(() => {
    const saved = localStorage.getItem('orbit_partners_cms_v1');
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return INITIAL_PARTNERS;
  });

  const [partnersSettings, setPartnersSettings] = useState<PartnersSectionSettings>(() => {
    const saved = localStorage.getItem('orbit_partners_settings_v1');
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return { ...DEFAULT_PARTNERS_SETTINGS, ...parsed };
      } catch {}
    }
    return DEFAULT_PARTNERS_SETTINGS;
  });

  useEffect(() => {
    fetch('/api/partners')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data)) {
          setPartners(data);
          localStorage.setItem('orbit_partners_cms_v1', JSON.stringify(data));
        }
      })
      .catch(() => {});

    fetch('/api/partners/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === 'object') {
          setPartnersSettings((prev) => ({ ...prev, ...data }));
          localStorage.setItem('orbit_partners_settings_v1', JSON.stringify(data));
        }
      })
      .catch(() => {});
  }, []);

  const updatePageContent = useCallback((pageKey: string, data: Partial<PageContentItem>) => {
    setPageContents((prev) => {
      const current = prev[pageKey] || DEFAULT_PAGE_CONTENTS[pageKey] || { id: `page-${pageKey}`, pageKey: pageKey as any, title: pageKey };
      const updated = {
        ...prev,
        [pageKey]: {
          ...current,
          ...data,
        },
      };
      try {
        localStorage.setItem('orbit_cms_page_contents_v2', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const resetPageContentsToDefault = useCallback(() => {
    setPageContents(DEFAULT_PAGE_CONTENTS);
    try {
      localStorage.setItem('orbit_cms_page_contents_v2', JSON.stringify(DEFAULT_PAGE_CONTENTS));
    } catch {}
  }, []);

  const [legalPages, setLegalPages] = useState<Record<string, LegalPageDoc>>(() => {
    const saved = localStorage.getItem('orbit_cms_legal_pages_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_LEGAL_PAGES;
  });

  const [cookieSettings, setCookieSettings] = useState<CookieSettings>(() => {
    const saved = localStorage.getItem('orbit_cms_cookie_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_COOKIE_SETTINGS;
  });

  const [visitorTelemetryLogs, setVisitorTelemetryLogs] = useState<VisitorTelemetryLog[]>(() => {
    const saved = localStorage.getItem('orbit_cms_telemetry_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_TELEMETRY;
  });

  const [seoSettings, setSeoSettings] = useState<SeoSettings>(() => {
    const saved = localStorage.getItem('orbit_cms_seo_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_SEO_SETTINGS;
  });

  const [sitemapUrls, setSitemapUrls] = useState<SitemapUrlEntry[]>(() => {
    const saved = localStorage.getItem('orbit_cms_sitemap_urls');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_SITEMAP_URLS;
  });

  const [articles, setArticles] = useState<ContentArticle[]>(() => {
    const saved = localStorage.getItem('orbit_cms_articles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_ARTICLES;
  });

  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    const saved = localStorage.getItem('orbit_cms_media_assets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_MEDIA_ASSETS;
  });

  const [systemTags, setSystemTags] = useState<string[]>(() => {
    const saved = localStorage.getItem('orbit_cms_system_tags');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_TAGS;
  });

  // Keep HTML <head> metadata dynamically synchronized with SeoSettings
  useEffect(() => {
    document.title = seoSettings.siteTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seoSettings.metaDescription);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seoSettings.siteTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seoSettings.metaDescription);

    let ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', seoSettings.ogImage);

    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', seoSettings.robotsDirectives);

    localStorage.setItem('orbit_cms_seo_settings', JSON.stringify(seoSettings));
  }, [seoSettings]);

  const updateLegalPage = useCallback((doc: LegalPageDoc) => {
    setLegalPages((prev) => {
      const next = { ...prev, [doc.id]: doc };
      localStorage.setItem('orbit_cms_legal_pages_v2', JSON.stringify(next));
      return next;
    });
  }, []);

  const resetLegalPagesToDefault = useCallback(() => {
    setLegalPages(DEFAULT_LEGAL_PAGES);
    localStorage.setItem('orbit_cms_legal_pages_v2', JSON.stringify(DEFAULT_LEGAL_PAGES));
  }, []);

  const updateCookieSettings = useCallback((settings: CookieSettings) => {
    setCookieSettings(settings);
    localStorage.setItem('orbit_cms_cookie_settings', JSON.stringify(settings));
  }, []);

  const logVisitorEvent = useCallback((path: string, consent: 'accepted_all' | 'essential_only' | 'custom' | 'pending') => {
    if (!cookieSettings.ipLoggingEnabled) return;

    // Simulate / record client IP and network telemetry for the visited route
    const randomOctet = Math.floor(Math.random() * 200) + 20;
    const clientIp = cookieSettings.ipAnonymization ? '192.168.1.xxx (Anonymized)' : `182.180.${randomOctet}.74`;

    const activeList =
      consent === 'accepted_all'
        ? ['orbit_cookie_consent', 'orbit_auth_session', 'orbit_telemetry_id', 'orbit_ui_prefs']
        : ['orbit_cookie_consent', 'orbit_auth_session'];

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    const newLog: VisitorTelemetryLog = {
      id: `tel-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ip: clientIp,
      path: normalizedPath,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userAgent: navigator.userAgent.slice(0, 80),
      consentGiven: consent,
      activeCookies: activeList,
      location: 'Nawabshah / Sindh, Pakistan',
    };

    setVisitorTelemetryLogs((prev) => {
      if (prev.length > 0 && prev[0].path === normalizedPath) {
        return prev;
      }
      const next = [newLog, ...prev.slice(0, 29)];
      localStorage.setItem('orbit_cms_telemetry_logs', JSON.stringify(next));
      return next;
    });
  }, [cookieSettings.ipLoggingEnabled, cookieSettings.ipAnonymization]);

  const clearTelemetryLogs = useCallback(() => {
    setVisitorTelemetryLogs([]);
    localStorage.removeItem('orbit_cms_telemetry_logs');
  }, []);

  const updateSeoSettings = useCallback((settings: SeoSettings) => {
    setSeoSettings(settings);
    localStorage.setItem('orbit_cms_seo_settings', JSON.stringify(settings));
  }, []);

  const updateSitemapUrl = useCallback((index: number, entry: SitemapUrlEntry) => {
    setSitemapUrls((prev) => {
      const next = [...prev];
      next[index] = entry;
      localStorage.setItem('orbit_cms_sitemap_urls', JSON.stringify(next));
      return next;
    });
  }, []);

  const addSitemapUrl = useCallback((entry: SitemapUrlEntry) => {
    setSitemapUrls((prev) => {
      const next = [...prev, entry];
      localStorage.setItem('orbit_cms_sitemap_urls', JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteSitemapUrl = useCallback((path: string) => {
    setSitemapUrls((prev) => {
      const next = prev.filter((item) => item.path !== path);
      localStorage.setItem('orbit_cms_sitemap_urls', JSON.stringify(next));
      return next;
    });
  }, []);

  // Security: Helper to attach Bearer session token to authorized administrative requests
  const getAdminAuthHeaders = useCallback((): Record<string, string> => {
    const token = sessionStorage.getItem('orbit_auth_token_admin');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, []);

  const addArticle = useCallback(async (article: ContentArticle) => {
    setArticles((prev) => {
      const next = [article, ...prev.filter((a) => a.id !== article.id)];
      localStorage.setItem('orbit_cms_articles', JSON.stringify(next));
      return next;
    });

    try {
      await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAdminAuthHeaders() },
        body: JSON.stringify(article),
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const updateArticle = useCallback(async (article: ContentArticle) => {
    setArticles((prev) => {
      const next = prev.map((a) => (a.id === article.id ? article : a));
      localStorage.setItem('orbit_cms_articles', JSON.stringify(next));
      return next;
    });

    try {
      await fetch(`/api/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAdminAuthHeaders() },
        body: JSON.stringify(article),
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const deleteArticle = useCallback(async (id: string) => {
    setArticles((prev) => {
      const next = prev.filter((a) => a.id !== id);
      localStorage.setItem('orbit_cms_articles', JSON.stringify(next));
      return next;
    });

    try {
      await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
        headers: { ...getAdminAuthHeaders() },
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const addMediaAsset = useCallback((asset: MediaAsset) => {
    setMediaAssets((prev) => {
      const next = [asset, ...prev];
      localStorage.setItem('orbit_cms_media_assets', JSON.stringify(next));
      return next;
    });
  }, []);

  const updateMediaAsset = useCallback((asset: MediaAsset) => {
    setMediaAssets((prev) => {
      const next = prev.map((m) => (m.id === asset.id ? asset : m));
      localStorage.setItem('orbit_cms_media_assets', JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteMediaAsset = useCallback((id: string) => {
    setMediaAssets((prev) => {
      const next = prev.filter((m) => m.id !== id);
      localStorage.setItem('orbit_cms_media_assets', JSON.stringify(next));
      return next;
    });
  }, []);

  const addTag = useCallback((tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    setSystemTags((prev) => {
      if (prev.includes(trimmed)) return prev;
      const next = [...prev, trimmed];
      localStorage.setItem('orbit_cms_system_tags', JSON.stringify(next));
      return next;
    });
  }, []);

  const deleteTag = useCallback((tag: string) => {
    setSystemTags((prev) => {
      const next = prev.filter((t) => t !== tag);
      localStorage.setItem('orbit_cms_system_tags', JSON.stringify(next));
      return next;
    });
  }, []);

  // Initial API Sync
  useEffect(() => {
    // 1. Team Members
    fetch('/api/team')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTeamMembers(data);
          localStorage.setItem('orbit_cms_team_members', JSON.stringify(data));
        }
      })
      .catch(() => {});

    // 2. Company Info
    fetch('/api/company')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.name) {
          setCompanyInfo(data);
          localStorage.setItem('orbit_cms_company_info', JSON.stringify(data));
        }
      })
      .catch(() => {});

    // 3. Services
    fetch('/api/services')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
          localStorage.setItem('orbit_cms_services_v3', JSON.stringify(data));
        }
      })
      .catch(() => {});

    // 4. Certificates
    fetch('/api/certificates')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCertificates(data);
          localStorage.setItem('orbit_cms_certificates', JSON.stringify(data));
        }
      })
      .catch(() => {});

    // 5. Articles (CMS & SEO Hub)
    fetch('/api/articles')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
          localStorage.setItem('orbit_cms_articles', JSON.stringify(data));
        }
      })
      .catch(() => {});

    // 6. DB Status
    fetch('/api/database/status')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setDbStatus(data);
      })
      .catch(() => {});
  }, []);

  // Services CRUD (Authenticated)
  const addService = useCallback(async (service: ServiceDetail) => {
    setServices((prev) => {
      const next = [service, ...prev];
      localStorage.setItem('orbit_cms_services_v3', JSON.stringify(next));
      return next;
    });
    try {
      await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAdminAuthHeaders() },
        body: JSON.stringify(service),
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const updateService = useCallback(async (service: ServiceDetail) => {
    setServices((prev) => {
      const next = prev.map((s) => (s.id === service.id ? service : s));
      localStorage.setItem('orbit_cms_services_v3', JSON.stringify(next));
      return next;
    });
    try {
      await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAdminAuthHeaders() },
        body: JSON.stringify(service),
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const deleteService = useCallback(async (id: string) => {
    setServices((prev) => {
      const next = prev.filter((s) => s.id !== id);
      localStorage.setItem('orbit_cms_services_v3', JSON.stringify(next));
      return next;
    });
    try {
      await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: { ...getAdminAuthHeaders() },
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const resetServicesToDefault = useCallback(() => {
    setServices(VERIFIED_SERVICES);
    localStorage.setItem('orbit_cms_services_v3', JSON.stringify(VERIFIED_SERVICES));
  }, []);

  // Team Members CRUD (Authenticated)
  const addTeamMember = useCallback(async (member: TeamMember) => {
    const newMember: TeamMember = {
      ...member,
      id: member.id || `tm-${Date.now()}`,
      initials:
        member.initials ||
        member.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase(),
    };
    setTeamMembers((prev) => {
      const next = [...prev, newMember];
      localStorage.setItem('orbit_cms_team_members', JSON.stringify(next));
      return next;
    });

    try {
      await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAdminAuthHeaders() },
        body: JSON.stringify(newMember),
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const updateTeamMember = useCallback(async (id: string, updates: Partial<TeamMember>) => {
    setTeamMembers((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, ...updates } : m));
      localStorage.setItem('orbit_cms_team_members', JSON.stringify(next));
      return next;
    });

    try {
      await fetch(`/api/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAdminAuthHeaders() },
        body: JSON.stringify(updates),
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const deleteTeamMember = useCallback(async (id: string) => {
    setTeamMembers((prev) => {
      const next = prev.filter((m) => m.id !== id);
      localStorage.setItem('orbit_cms_team_members', JSON.stringify(next));
      return next;
    });

    try {
      await fetch(`/api/team/${id}`, {
        method: 'DELETE',
        headers: { ...getAdminAuthHeaders() },
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const resetTeamToDefault = useCallback(() => {
    setTeamMembers(INITIAL_TEAM_MEMBERS);
    localStorage.setItem('orbit_cms_team_members', JSON.stringify(INITIAL_TEAM_MEMBERS));
  }, []);

  // Certificates CRUD (Authenticated)
  const addCertificate = useCallback(async (cert: VerifiedCertificate) => {
    const certificateId = cert.certificateId || `ORBIT-I/INT/2026/${String(Date.now()).slice(-2)}`;
    const newCert: VerifiedCertificate = {
      ...cert,
      certificateId,
      verificationCode: cert.verificationCode || `ORB-SEC-${Math.floor(1000 + Math.random() * 9000)}-VLD-2026`,
      isAuthentic: true,
    };
    setCertificates((prev) => {
      const next = [newCert, ...prev.filter((c) => c.certificateId !== certificateId)];
      localStorage.setItem('orbit_cms_certificates', JSON.stringify(next));
      return next;
    });

    try {
      await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAdminAuthHeaders() },
        body: JSON.stringify(newCert),
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const updateCertificate = useCallback(async (id: string, updates: Partial<VerifiedCertificate>) => {
    setCertificates((prev) => {
      const next = prev.map((c) => (c.certificateId === id ? { ...c, ...updates } : c));
      localStorage.setItem('orbit_cms_certificates', JSON.stringify(next));
      return next;
    });

    try {
      await fetch(`/api/certificates/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAdminAuthHeaders() },
        body: JSON.stringify(updates),
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const deleteCertificate = useCallback(async (id: string) => {
    setCertificates((prev) => {
      const next = prev.filter((c) => c.certificateId !== id);
      localStorage.setItem('orbit_cms_certificates', JSON.stringify(next));
      return next;
    });

    try {
      await fetch(`/api/certificates/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { ...getAdminAuthHeaders() },
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  // Jobs / Careers CRUD
  const addJob = useCallback(async (job: JobOpening) => {
    const newJob: JobOpening = {
      ...job,
      id: job.id || `job-${Date.now()}`,
      postedDate: job.postedDate || new Date().toISOString().slice(0, 10),
    };
    setJobs((prev) => {
      const next = [newJob, ...prev];
      localStorage.setItem('orbit_cms_jobs', JSON.stringify(next));
      return next;
    });

    try {
      await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAdminAuthHeaders() },
        body: JSON.stringify(newJob),
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const updateJob = useCallback(async (id: string, updates: Partial<JobOpening>) => {
    setJobs((prev) => {
      const next = prev.map((j) => (j.id === id ? { ...j, ...updates } : j));
      localStorage.setItem('orbit_cms_jobs', JSON.stringify(next));
      return next;
    });

    try {
      await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAdminAuthHeaders() },
        body: JSON.stringify(updates),
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const deleteJob = useCallback(async (id: string) => {
    setJobs((prev) => {
      const next = prev.filter((j) => j.id !== id);
      localStorage.setItem('orbit_cms_jobs', JSON.stringify(next));
      return next;
    });

    try {
      await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
        headers: { ...getAdminAuthHeaders() },
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const resetJobsToDefault = useCallback(() => {
    setJobs(INITIAL_JOB_OPENINGS);
    localStorage.setItem('orbit_cms_jobs', JSON.stringify(INITIAL_JOB_OPENINGS));
  }, []);

  // Inquiries CRUD (Protected by Admin RBAC)
  const fetchInquiries = useCallback(async () => {
    try {
      const res = await fetch('/api/contact', {
        headers: { ...getAdminAuthHeaders() },
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
        localStorage.setItem('orbit_cms_inquiries', JSON.stringify(data));
      }
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const updateInquiryStatus = useCallback(async (id: string, status: string) => {
    setInquiries((prev) => {
      const next = prev.map((inq) => (inq.id === id ? { ...inq, status } : inq));
      localStorage.setItem('orbit_cms_inquiries', JSON.stringify(next));
      return next;
    });

    try {
      await fetch(`/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...getAdminAuthHeaders() },
        body: JSON.stringify({ status }),
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const deleteInquiry = useCallback(async (id: string) => {
    setInquiries((prev) => {
      const next = prev.filter((inq) => inq.id !== id);
      localStorage.setItem('orbit_cms_inquiries', JSON.stringify(next));
      return next;
    });

    try {
      await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: { ...getAdminAuthHeaders() },
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  // Company Info CRUD (Authenticated)
  const updateCompanyInfo = useCallback(async (data: Partial<CompanyInfo>) => {
    setCompanyInfo((prev) => {
      const next = { ...prev, ...data };
      localStorage.setItem('orbit_cms_company_info', JSON.stringify(next));
      return next;
    });

    try {
      await fetch('/api/company', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAdminAuthHeaders() },
        body: JSON.stringify(data),
      });
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  // Database Telemetry Refresh (Authenticated for detailed metrics)
  const refreshDbStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/database/status', {
        headers: { ...getAdminAuthHeaders() },
      });
      if (res.ok) {
        const data = await res.json();
        setDbStatus(data);
      }
    } catch (e) {}
  }, [getAdminAuthHeaders]);

  const updateMaintenanceSettings = useCallback((settings: MaintenanceSettings) => {
    setMaintenanceSettings(settings);
    localStorage.setItem('orbit_cms_maintenance_settings', JSON.stringify(settings));
  }, []);

  const updateNotFoundSettings = useCallback((settings: NotFoundPageSettings) => {
    setNotFoundSettings(settings);
    localStorage.setItem('orbit_cms_not_found_settings', JSON.stringify(settings));
  }, []);

  // Verified Strategic Alliances & Institutional Partners CRUD
  const addPartner = useCallback(async (partner: PartnerAlliance) => {
    setPartners((prev) => {
      const next = [...prev, partner];
      try {
        localStorage.setItem('orbit_partners_cms_v1', JSON.stringify(next));
      } catch {}
      return next;
    });
    try {
      await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partner),
      });
    } catch {}
  }, []);

  const updatePartner = useCallback(async (id: string, updates: Partial<PartnerAlliance>) => {
    setPartners((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updates } : p));
      try {
        localStorage.setItem('orbit_partners_cms_v1', JSON.stringify(next));
      } catch {}
      return next;
    });
    try {
      await fetch(`/api/partners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch {}
  }, []);

  const deletePartner = useCallback(async (id: string) => {
    setPartners((prev) => {
      const next = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem('orbit_partners_cms_v1', JSON.stringify(next));
      } catch {}
      return next;
    });
    try {
      await fetch(`/api/partners/${id}`, { method: 'DELETE' });
    } catch {}
  }, []);

  const resetPartnersToDefault = useCallback(() => {
    setPartners(INITIAL_PARTNERS);
    try {
      localStorage.setItem('orbit_partners_cms_v1', JSON.stringify(INITIAL_PARTNERS));
    } catch {}
    fetch('/api/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(INITIAL_PARTNERS),
    }).catch(() => {});
  }, []);

  const updatePartnersSettings = useCallback(async (settings: Partial<PartnersSectionSettings>) => {
    setPartnersSettings((prev) => {
      const next = { ...prev, ...settings };
      try {
        localStorage.setItem('orbit_partners_settings_v1', JSON.stringify(next));
      } catch {}
      return next;
    });
    try {
      await fetch('/api/partners/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...getAdminAuthHeaders() },
        body: JSON.stringify(settings),
      });
    } catch {}
  }, [getAdminAuthHeaders]);

  const resetPartnersSettingsToDefault = useCallback(() => {
    setPartnersSettings(DEFAULT_PARTNERS_SETTINGS);
    try {
      localStorage.setItem('orbit_partners_settings_v1', JSON.stringify(DEFAULT_PARTNERS_SETTINGS));
    } catch {}
    fetch('/api/partners/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAdminAuthHeaders() },
      body: JSON.stringify(DEFAULT_PARTNERS_SETTINGS),
    }).catch(() => {});
  }, [getAdminAuthHeaders]);

  const contextValue = useMemo(
    () => ({
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
      services,
      addService,
      updateService,
      deleteService,
      resetServicesToDefault,
      teamMembers,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      resetTeamToDefault,
      certificates,
      addCertificate,
      updateCertificate,
      deleteCertificate,
      jobs,
      addJob,
      updateJob,
      deleteJob,
      resetJobsToDefault,
      inquiries,
      fetchInquiries,
      updateInquiryStatus,
      deleteInquiry,
      companyInfo,
      updateCompanyInfo,
      dbStatus,
      refreshDbStatus,
      maintenanceSettings,
      updateMaintenanceSettings,
      notFoundSettings,
      updateNotFoundSettings,
      pageContents,
      updatePageContent,
      resetPageContentsToDefault,
      partners,
      partnersSettings,
      addPartner,
      updatePartner,
      deletePartner,
      resetPartnersToDefault,
      updatePartnersSettings,
      resetPartnersSettingsToDefault,
    }),
    [
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
      services,
      addService,
      updateService,
      deleteService,
      resetServicesToDefault,
      teamMembers,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      resetTeamToDefault,
      certificates,
      addCertificate,
      updateCertificate,
      deleteCertificate,
      jobs,
      addJob,
      updateJob,
      deleteJob,
      resetJobsToDefault,
      inquiries,
      fetchInquiries,
      updateInquiryStatus,
      deleteInquiry,
      companyInfo,
      updateCompanyInfo,
      dbStatus,
      refreshDbStatus,
      maintenanceSettings,
      updateMaintenanceSettings,
      notFoundSettings,
      updateNotFoundSettings,
      pageContents,
      updatePageContent,
      resetPageContentsToDefault,
      partners,
      partnersSettings,
      addPartner,
      updatePartner,
      deletePartner,
      resetPartnersToDefault,
      updatePartnersSettings,
      resetPartnersSettingsToDefault,
    ]
  );

  return (
    <CmsContext.Provider value={contextValue}>
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
