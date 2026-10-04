export type UserRole =
  // Leadership
  | 'Founder'
  | 'Co-Founder'
  | 'CEO'
  | 'CTO'
  | 'COO'
  // Management
  | 'Department Head'
  | 'Team Lead'
  | 'Project Lead'
  | 'Manager'
  // Team Members
  | 'Senior Engineer'
  | 'Database Administrator'
  | 'Team Member'
  | 'Junior Engineer'
  | 'Intern'
  // External
  | 'Client'
  | 'Partner'
  | 'Vendor'
  | 'External Collaborator';

export type UserCategory = 'internal' | 'external';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  category: UserCategory;
  department?: string;
  team?: string;
  avatarUrl?: string;
  joinedDate: string;
  status: 'active' | 'leave' | 'inactive';
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  headName: string;
  headTitle: string;
  teamsCount: number;
  membersCount: number;
  status: 'active' | 'restructuring';
}

export interface TeamGroup {
  id: string;
  departmentId: string;
  departmentName: string;
  name: string;
  leadName: string;
  memberCount: number;
  currentProject: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  detailedDescription?: string;
  benefits: string[];
  technologies: string[];
  processSteps: {
    title: string;
    description: string;
  }[];
  iconName: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface ClientPaymentRecord {
  id: string;
  title: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Milestone Escrow';
  date: string;
  invoiceNumber?: string;
}

export interface ClientQueryRecord {
  id: string;
  subject: string;
  message: string;
  date: string;
  status: 'New' | 'In Review' | 'Answered' | 'Closed';
  response?: string;
}

export interface ClientRecord {
  id: string;
  name: string;
  organization: string;
  email: string;
  phone?: string;
  country?: string;
  status: 'Active' | 'Onboarding' | 'Completed' | 'Prospect';
  totalContractValue: number;
  paidAmount: number;
  currency: string;
  projects: ClientProject[];
  queries: ClientQueryRecord[];
  payments: ClientPaymentRecord[];
  notes?: string;
  joinedDate: string;
}

export interface PageContentItem {
  id: string;
  pageKey: 'home' | 'about' | 'services' | 'contact' | 'careers' | 'blogs';
  title: string;
  badge?: string;
  headline?: string;
  subheadline?: string;
  description?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  metaTitle?: string;
  metaDescription?: string;
  customFields?: Record<string, string>;
}

export interface VerifiedCertificate {
  certificateId: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  startDate: string;
  endDate: string;
  duration: string;
  completionStatus: 'completed' | 'in_progress';
  certificateStatus: 'valid' | 'revoked';
  gradePerformance: string;
  verificationCode: string;
  issueDate: string;
  remarks: string;
  isAuthentic: boolean;
}

export interface ClientProject {
  id: string;
  title: string;
  clientOrg: string;
  serviceType: string;
  status: 'Active' | 'Review' | 'Completed' | 'Maintenance';
  health: 'Optimal' | 'Attention' | 'At Risk';
  startDate: string;
  estimatedCompletion: string;
  progressPercent: number;
  currentMilestone: string;
  recentDeliverable: string;
  repositoryAccess: string;
  securityAuditPassed: boolean;
  documents: {
    name: string;
    date: string;
    type: string;
    size: string;
  }[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceRequired: string;
  budgetRange: string;
  timeline: string;
  message: string;
  submittedAt: string;
  status: 'Unread' | 'In Review' | 'Replied';
}

export interface SystemArchitectureMetrics {
  targetAvailability: string;
  currentUptime: string;
  databaseEngine: string;
  appRuntime: string;
  serverPlatform: string;
  cacheStatus: string;
  lastBackupTimestamp: string;
  backupRetention: string;
  sslCertificate: string;
  disasterRecoveryStatus: string;
  activeSessions: number;
}

export interface MaintenanceSettings {
  enabled: boolean;
  title: string;
  message: string;
  estimatedEnd: string;
  allowAdminBypass: boolean;
  emergencyContactEmail: string;
  emergencyContactPhone: string;
}

export interface NotFoundPageSettings {
  title: string;
  errorCode: string;
  message: string;
  supportButtonText: string;
  showSearch: boolean;
  suggestedLinks: {
    label: string;
    tab: string;
  }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tier: 'leadership' | 'team';
  department: string;
  bio: string;
  avatar?: string;
  initials: string;
  email: string;
  linkedin: string;
  portfolio?: string;
  whatsapp?: string;
  skills: string[];
  displayOrder?: number;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  founder: string;
  coFounders: string[];
  logoUrl: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  socialLinks: {
    linkedin?: string;
    whatsapp?: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    twitter?: string;
    github?: string;
    youtube?: string;
    discord?: string;
    telegram?: string;
    medium?: string;
    [key: string]: string | undefined;
  };
  established: string;
  registrationType: string;
}

export interface JobOpening {
  id: string;
  title: string;
  category: 'job' | 'internship';
  department: string;
  type: string; // 'Full-time' | 'Part-time' | 'Contract' | 'Paid Internship' | 'Unpaid Internship'
  internshipType?: 'paid' | 'unpaid';
  stipendAmount?: string; // e.g. 'PKR 45,000 / month'
  workMode: 'remote' | 'onsite' | 'hybrid';
  location: string;
  duration?: string; // e.g. '3 Months', '6 Months'
  experience: string;
  salaryRange?: string; // for jobs e.g. 'PKR 180,000 - 280,000 / month'
  description: string;
  perks?: string[]; // e.g. ['SECP Verified Certificate', 'Direct CEO Mentorship']
  requirements: string[];
  status: 'active' | 'closed';
  postedDate: string;
  applyEmail?: string;
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  type: 'brute_force' | 'lockout' | 'unauthorized_access' | 'rate_limit' | 'data_tamper' | 'system_anomaly';
  severity: 'warning' | 'high' | 'critical';
  title: string;
  details: string;
  sourceIp: string;
  userAgent?: string;
  emailsNotified: string[];
  resolved: boolean;
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
  focusKeywords?: string[];
  canonicalUrl?: string;
  seoScore?: number;
}

export type PortalAccessRole = 'superadmin' | 'admin' | 'manager' | 'content_writer' | 'seo_specialist' | 'client';

export interface AuthAccount {
  id: string;
  name: string;
  email: string;
  company?: string;
  role: PortalAccessRole;
  portalType: 'admin' | 'client';
  password?: string;
  department?: string;
  createdAt: string;
  lastLogin?: string;
  createdBy?: string;
  status: 'active' | 'suspended';
  isSetupRequired?: boolean;
}

export interface PartnerAlliance {
  id: string;
  name: string;
  category: string;
  badge?: string;
  iconType?: string;
  logoUrl?: string;
  websiteUrl?: string;
  description?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface TrustBadgeItem {
  id: string;
  label: string;
  color?: string; // e.g. 'emerald' | 'blue' | 'purple' | 'indigo' | 'amber' | 'cyan' | 'rose' | 'slate'
  isActive?: boolean;
}

export interface PartnersSectionSettings {
  isEnabled: boolean;
  badgeText: string;
  title: string;
  subtitle: string;
  showTrustBadges: boolean;
  trustBadges: TrustBadgeItem[];
}



