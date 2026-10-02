import React, { useState } from 'react';
import {
  Mail,
  Globe,
  Linkedin,
  ShieldCheck,
  Award,
  Users,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Terminal,
  Cpu,
  Layers,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/orbitData';
import { useCms } from '../context/CmsContext';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tier: 'founders' | 'core' | 'team' | 'leadership';
  department: string;
  bio: string;
  avatar?: string;
  initials: string;
  email: string;
  linkedin: string;
  portfolio?: string;
  skills: string[];
}

export const VERIFIED_TEAM: TeamMember[] = [
  // ----------------------------------------------------
  // TIER 1: FOUNDERS & EXECUTIVE LEADERSHIP
  // ----------------------------------------------------
  {
    id: 'tm-1',
    name: 'Abdul Samad Rind',
    role: 'Founder & CEO',
    tier: 'founders',
    department: 'Executive Governance',
    bio: 'Founder and Chief Executive Officer steering high-performance enterprise systems, sustainable technology architecture, and digital engineering partnerships.',
    avatar: '/AbdulSamad.jpeg',
    initials: 'AS',
    email: 'ab.samad@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    skills: ['Enterprise Systems', 'Strategic Governance', 'Cloud Architecture'],
  },
  {
    id: 'tm-2',
    name: 'Maria Almani',
    role: 'Co-Founder & COO',
    tier: 'founders',
    department: 'Operations & Strategy',
    bio: 'Co-Founder and Chief Operating Officer overseeing client operations, agile sprint delivery, team coordination, and international business scaling.',
    initials: 'MA',
    email: 'maria.almani@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    skills: ['Operations Management', 'Agile Delivery', 'Strategic Scaling'],
  },
  {
    id: 'tm-3',
    name: 'Muhammad Muneeb Ur Rahman Shahzad',
    role: 'Co-Founder & CTO',
    tier: 'founders',
    department: 'Engineering & Technology',
    bio: 'Co-Founder and Chief Technology Officer orchestrating software architecture, cloud scalability, relational databases, and enterprise engineering standards.',
    initials: 'MS',
    email: 'm.munneb@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    skills: ['Core Systems', 'Scalable Databases', 'DevOps & Infrastructure'],
  },

  // ----------------------------------------------------
  // TIER 2: CORE TEAM & TECHNICAL ARCHITECTS
  // ----------------------------------------------------
  {
    id: 'tm-4',
    name: 'Chander Parkash',
    role: 'Database Administrator',
    tier: 'core',
    department: 'Database Systems & Architecture',
    bio: 'Database Administrator specializing in enterprise SQL relational architectures, PostgreSQL and MySQL optimization, clustering, and data integrity.',
    initials: 'CP',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    skills: ['PostgreSQL / MySQL', 'Database Clustering', 'Query Optimization'],
  },
  {
    id: 'tm-5',
    name: 'Abdul Rehman',
    role: 'Senior .NET Developer',
    tier: 'core',
    department: 'Enterprise .NET Systems',
    bio: 'Enterprise .NET developer with deep expertise in C#, ASP.NET Core, SQL database optimizations, and high-concurrency transactional pipelines.',
    initials: 'AR',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    skills: ['C# / .NET Core', 'SQL Server', 'Enterprise Microservices'],
  },
  {
    id: 'tm-6',
    name: 'Rashid Ali Channa',
    role: 'AI / ML Engineer',
    tier: 'core',
    department: 'Artificial Intelligence & Research',
    bio: 'Machine learning engineer designing predictive algorithms, computer vision pipelines, natural language processing models, and automated workflows.',
    initials: 'RC',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    skills: ['LLM Orchestration', 'PyTorch / Python', 'Vector Databases'],
  },

  // ----------------------------------------------------
  // TIER 3: SPECIALIST TEAM & CREATIVE ENGINEERING
  // ----------------------------------------------------
  {
    id: 'tm-7',
    name: 'Hassan Ansar',
    role: 'Web & Frontend Engineer',
    tier: 'team',
    department: 'Web Engineering',
    bio: 'Full-stack web developer specializing in modern React, responsive client interfaces, high-performance web applications, and state architecture.',
    initials: 'HA',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    skills: ['React / Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'tm-8',
    name: 'Laiba',
    role: 'Backend Developer',
    tier: 'team',
    department: 'Backend & Systems',
    bio: 'Backend solutions engineer focusing on robust RESTful APIs, microservices architectures, data persistence, and secure authentication pipelines.',
    initials: 'LB',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    skills: ['RESTful APIs', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'tm-9',
    name: 'Hamnah',
    role: 'UI / UX Designer',
    tier: 'team',
    department: 'Product & Design Systems',
    bio: 'Product designer crafting elegant design systems, intuitive user workflows, responsive mobile wireframes, and high-fidelity accessible interfaces.',
    initials: 'HN',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    skills: ['Figma / Prototyping', 'Design Systems', 'Responsive UI/UX'],
  },
  {
    id: 'tm-10',
    name: 'Waleed Ahmed',
    role: 'Digital Marketing Expert',
    tier: 'team',
    department: 'Marketing & Growth',
    bio: 'Digital marketing strategist driving search engine visibility, brand communication, client acquisition funnels, and enterprise outreach.',
    initials: 'WA',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    skills: ['Technical SEO', 'Search Console', 'Growth Funnels'],
  },
];

// Compact Monogram Avatar for eye-catching look
interface CompactAvatarProps {
  initials: string;
  avatar?: string;
  name: string;
  tier: string;
}

const CompactAvatar: React.FC<CompactAvatarProps> = ({ initials, avatar, name, tier }) => {
  const gradientClass =
    tier === 'founders'
      ? 'from-blue-600 via-indigo-600 to-blue-700 text-white shadow-blue-500/20'
      : tier === 'core'
      ? 'from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-emerald-500/20'
      : 'from-slate-700 via-gray-800 to-neutral-900 text-white shadow-gray-500/20';

  return (
    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 bg-gray-100 dark:bg-slate-800 border border-gray-200/80 dark:border-slate-700 shadow-sm relative group-hover:scale-105 transition-transform duration-300">
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div
          className={`w-full h-full bg-gradient-to-tr ${gradientClass} flex flex-col items-center justify-center font-mono font-bold text-sm tracking-wider select-none`}
        >
          <span>{initials}</span>
        </div>
      )}
      {/* Active Team Badge Dot */}
      <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
    </div>
  );
};

// Compact Eye-Catching Team Card: Small in size, little description > skills > socials
interface TeamCardProps {
  member: TeamMember;
  tierBadge: string;
  tierColor: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, tierBadge, tierColor }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all duration-300 group flex flex-col justify-between">
      <div>
        {/* Top: Avatar + Member Identity */}
        <div className="flex items-center gap-3.5 mb-3">
          <CompactAvatar
            initials={member.initials}
            avatar={member.avatar}
            name={member.name}
            tier={member.tier}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1.5">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {member.name}
              </h3>
            </div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 font-mono truncate mt-0.5">
              {member.role}
            </div>
            <div className="text-[10px] text-gray-400 dark:text-gray-400 font-medium truncate">
              {member.department}
            </div>
          </div>
        </div>

        {/* Little Description (Concise & Focused) */}
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 mb-3">
          {member.bio}
        </p>

        {/* Skills: Compact Pill Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {member.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Socials & Registry Bar (NO GitHub) */}
      <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <a
          href={`mailto:${member.email || COMPANY_INFO.email}?subject=Inquiry%20regarding%20${encodeURIComponent(member.name)}`}
          className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors font-mono text-[11px] truncate max-w-[170px]"
          title={`Official Email: ${member.email || COMPANY_INFO.email}`}
        >
          <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="truncate">{member.email || COMPANY_INFO.email}</span>
        </a>

        <div className="flex items-center gap-1.5 shrink-0">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-[#0077b5] hover:text-white text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all"
              title={`${member.name} on LinkedIn`}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          )}
          {member.portfolio && (
            <a
              href={member.portfolio}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-black hover:text-white text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all"
              title="Official Profile"
              aria-label="Portfolio"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const TeamSection: React.FC = () => {
  const { teamMembers } = useCms();
  const [activeHierarchy, setActiveHierarchy] = useState<'all' | 'founders' | 'core' | 'team'>('all');

  // Map CMS data or fallback to verified team roster
  const allMembers: TeamMember[] =
    teamMembers && teamMembers.length > 0
      ? teamMembers.map((m) => {
          const roleLower = (m.role || '').toLowerCase();
          const tier: 'founders' | 'core' | 'team' =
            (m as any).tier === 'founders' || roleLower.includes('founder') || roleLower.includes('ceo') || roleLower.includes('coo') || roleLower.includes('cto')
              ? 'founders'
              : (m as any).tier === 'core' || roleLower.includes('lead') || roleLower.includes('administrator') || roleLower.includes('architect') || roleLower.includes('senior')
              ? 'core'
              : 'team';

          return {
            id: m.id,
            name: m.name,
            role: m.role,
            tier,
            department: m.department || 'Technology',
            bio: m.bio || '',
            avatar: m.avatar,
            initials: m.initials || m.name.slice(0, 2).toUpperCase(),
            email: m.email || COMPANY_INFO.email,
            linkedin: m.linkedin || COMPANY_INFO.socialLinks.linkedin,
            portfolio: m.portfolio || 'https://orbit-i.tech',
            skills: m.skills && m.skills.length > 0 ? m.skills : ['Enterprise Engineering', 'Scalability'],
          };
        })
      : VERIFIED_TEAM;

  // Group by exact hierarchy: Founders > Core Team > Team
  const founders = allMembers.filter((m) => m.tier === 'founders');
  const coreTeam = allMembers.filter((m) => m.tier === 'core');
  const generalTeam = allMembers.filter((m) => m.tier === 'team');

  return (
    <div className="bg-white dark:bg-slate-950 text-gray-900 dark:text-white min-h-screen py-10 sm:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-xs font-mono font-semibold border border-blue-200/80 dark:border-blue-800/60 mb-3 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>ORBIT-I LTD · ORGANIZATIONAL GOVERNANCE &amp; TALENT</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Our Team &amp; Leadership
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
            Headquartered in Nawabshah, Sindh, Pakistan. Organized across a clear hierarchy of executive founders, core systems architects, and specialist engineers.
          </p>

          {/* Hierarchy Filter Switcher */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <button
              onClick={() => setActiveHierarchy('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeHierarchy === 'all'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              All Hierarchy ({allMembers.length})
            </button>
            <button
              onClick={() => setActiveHierarchy('founders')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeHierarchy === 'founders'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>Founders</span>
              <span className="text-[10px] font-mono opacity-80">({founders.length})</span>
            </button>
            <button
              onClick={() => setActiveHierarchy('core')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeHierarchy === 'core'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>Core Team</span>
              <span className="text-[10px] font-mono opacity-80">({coreTeam.length})</span>
            </button>
            <button
              onClick={() => setActiveHierarchy('team')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeHierarchy === 'team'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>Team</span>
              <span className="text-[10px] font-mono opacity-80">({generalTeam.length})</span>
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* TIER 1: FOUNDERS & EXECUTIVE LEADERSHIP                           */}
        {/* ----------------------------------------------------------------- */}
        {(activeHierarchy === 'all' || activeHierarchy === 'founders') && (
          <section className="mb-12 sm:mb-16">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Founders &amp; Executive Leadership
                </h2>
              </div>
              <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200/60 dark:border-blue-800/40">
                Tier 1 · Executive Principals
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {founders.map((member) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  tierBadge="Founder"
                  tierColor="blue"
                />
              ))}
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TIER 2: CORE TEAM & TECHNICAL ARCHITECTS                          */}
        {/* ----------------------------------------------------------------- */}
        {(activeHierarchy === 'all' || activeHierarchy === 'core') && (
          <section className="mb-12 sm:mb-16">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Core Team &amp; Technical Architects
                </h2>
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
                Tier 2 · Core Architects
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {coreTeam.map((member) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  tierBadge="Core Team"
                  tierColor="emerald"
                />
              ))}
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TIER 3: SPECIALIST TEAM & CREATIVE ENGINEERING                   */}
        {/* ----------------------------------------------------------------- */}
        {(activeHierarchy === 'all' || activeHierarchy === 'team') && (
          <section className="mb-12 sm:mb-16">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Engineering &amp; Creative Team
                </h2>
              </div>
              <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-200/60 dark:border-purple-800/40">
                Tier 3 · Specialists &amp; Developers
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {generalTeam.map((member) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  tierBadge="Team"
                  tierColor="purple"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
