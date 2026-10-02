import React, { useState } from 'react';
import { Mail, Globe, Linkedin, MessageCircle, ExternalLink, ShieldCheck, User, Sparkles, Filter } from 'lucide-react';
import { COMPANY_INFO } from '../data/orbitData';
import { useCms } from '../context/CmsContext';

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
}

export const TEAM_MEMBERS: TeamMember[] = [
  // 1. Founder & CEO (ORIGINAL REAL PICTURE)
  {
    id: 'tm-1',
    name: 'Abdul Samad Rind',
    role: 'Founder & CEO',
    tier: 'leadership',
    department: 'Executive Leadership',
    bio: 'Founder and Chief Executive Officer steering ORBIT-I Private Limited. Focused on high-performance enterprise systems, sustainable technology architecture, and digital engineering partnerships across Pakistan and international markets.',
    avatar: '/AbdulSamad.jpeg',
    initials: 'AS',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    whatsapp: COMPANY_INFO.phone,
    skills: ['Enterprise Systems', 'Strategic Governance', 'Cloud Architecture'],
  },
  // 2. Co-Founder and COO
  {
    id: 'tm-2',
    name: 'Maria Almani',
    role: 'Co-Founder & COO',
    tier: 'leadership',
    department: 'Operations & Strategy',
    bio: 'Co-Founder and Chief Operating Officer overseeing client operations, sprint delivery management, team coordination, and strategic business growth for ORBIT-I engagements.',
    initials: 'MA',
    email: 'maria.almani@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    whatsapp: COMPANY_INFO.phone,
    skills: ['Operations Management', 'Agile Delivery', 'Strategic Scaling'],
  },
  // 3. Co-Founder and CTO
  {
    id: 'tm-3',
    name: 'Muhammad Muneeb Ur Rahman Shahzad',
    role: 'Co-Founder & CTO',
    tier: 'leadership',
    department: 'Engineering & Technology',
    bio: 'Co-Founder and Chief Technology Officer orchestrating technical architecture, cloud scalability, secure relational database design, and software engineering standards.',
    initials: 'MS',
    email: 'm.munneb@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    whatsapp: COMPANY_INFO.phone,
    skills: ['Core Systems', 'Scalable Databases', 'DevOps & Infrastructure'],
  },

  // 4. Web Developer
  {
    id: 'tm-4',
    name: 'Hassan Ansar',
    role: 'Web Developer',
    tier: 'team',
    department: 'Web Engineering',
    bio: 'Frontend and full-stack web developer specializing in modern React, responsive client interfaces, high-performance web applications, and state architecture.',
    initials: 'HA',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    whatsapp: COMPANY_INFO.phone,
    skills: ['React / Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  // 5. Digital Marketing Expert
  {
    id: 'tm-5',
    name: 'Waleed Ahmed',
    role: 'Digital Marketing Expert',
    tier: 'team',
    department: 'Marketing & Growth',
    bio: 'Digital marketing strategist driving search engine visibility, brand communication, client acquisition funnels, and enterprise outreach for ORBIT-I digital platforms.',
    initials: 'WA',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    whatsapp: COMPANY_INFO.phone,
    skills: ['Technical SEO', 'Search Console', 'Growth Funnels'],
  },
  // 6. AI ML Engineer
  {
    id: 'tm-6',
    name: 'Rashid Ali Channa',
    role: 'AI / ML Engineer',
    tier: 'team',
    department: 'Artificial Intelligence & Research',
    bio: 'Machine learning engineer designing predictive algorithms, computer vision pipelines, natural language processing models, and intelligent automated workflows.',
    initials: 'RC',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    whatsapp: COMPANY_INFO.phone,
    skills: ['LLM Orchestration', 'PyTorch / Python', 'Vector Databases'],
  },
  // 7. Backend Developer
  {
    id: 'tm-7',
    name: 'Laiba',
    role: 'Backend Developer',
    tier: 'team',
    department: 'Backend & Systems',
    bio: 'Backend solutions engineer focusing on robust RESTful APIs, microservices architectures, data persistence, and secure authentication pipelines.',
    initials: 'LB',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    whatsapp: COMPANY_INFO.phone,
    skills: ['RESTful APIs', 'Node.js', 'PostgreSQL'],
  },
  // 8. .Net Developer
  {
    id: 'tm-8',
    name: 'Abdul Rehman',
    role: '.NET Developer',
    tier: 'team',
    department: 'Enterprise .NET Systems',
    bio: 'Enterprise .NET developer with expertise in C#, ASP.NET Core, Microsoft server environments, SQL database optimizations, and high-concurrency transactional pipelines.',
    initials: 'AR',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    whatsapp: COMPANY_INFO.phone,
    skills: ['C# / .NET Core', 'SQL Server', 'Enterprise Microservices'],
  },
  // 9. Database Administrator (VERIFIED)
  {
    id: 'tm-9',
    name: 'Chander Parkash',
    role: 'Database Administrator',
    tier: 'team',
    department: 'Database Systems & Architecture',
    bio: 'Database Administrator specializing in enterprise SQL relational architectures, PostgreSQL and MySQL optimization, high-availability clustering, data migration, and backup integrity.',
    initials: 'CP',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    whatsapp: COMPANY_INFO.phone,
    skills: ['PostgreSQL / MySQL', 'Database Clustering', 'Query Optimization'],
  },
  // 10. UI / UX Designer
  {
    id: 'tm-10',
    name: 'Hamnah',
    role: 'UI / UX Designer',
    tier: 'team',
    department: 'Product & Design Systems',
    bio: 'Product designer crafting elegant design systems, intuitive user workflows, responsive mobile wireframes, high-fidelity prototypes, and accessible visual user interfaces.',
    initials: 'HN',
    email: 'contactus@orbit-i.tech',
    linkedin: COMPANY_INFO.socialLinks.linkedin,
    portfolio: 'https://orbit-i.tech',
    whatsapp: COMPANY_INFO.phone,
    skills: ['Figma / Prototyping', 'Design Systems', 'Responsive UI/UX'],
  },
];

// Clean Corporate Avatar Placeholder Component
interface AvatarPlaceholderProps {
  initials: string;
  isLeadership?: boolean;
}

const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({ initials, isLeadership = false }) => {
  return (
    <div
      className={`w-full h-full relative overflow-hidden flex flex-col items-center justify-center select-none ${isLeadership
          ? 'bg-gradient-to-b from-gray-900 via-neutral-900 to-black text-white'
          : 'bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200 text-gray-800'
        }`}
    >
      {/* Subtle geometric grid background */}
      <div
        className={`absolute inset-0 opacity-10 pointer-events-none ${isLeadership ? 'bg-[radial-gradient(#ffffff_1px,transparent_1px)]' : 'bg-[radial-gradient(#000000_1px,transparent_1px)]'
          } [background-size:16px_16px]`}
      />

      {/* Corporate Silhouette Portrait Icon */}
      <svg
        className={`w-28 sm:w-36 h-28 sm:h-36 opacity-30 mt-4 transition-transform duration-300 group-hover:scale-105 ${isLeadership ? 'text-gray-400' : 'text-gray-600'
          }`}
        viewBox="0 0 128 128"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="64" cy="42" r="26" />
        <path d="M18 116 C18 88 38 78 64 78 C90 78 110 88 110 116 Z" />
      </svg>

      {/* Monogram Overlay Badge */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div
          className={`px-4 py-2 rounded-2xl border backdrop-blur-xs flex items-center justify-center shadow-lg ${isLeadership
              ? 'bg-black/70 border-white/20 text-white'
              : 'bg-white/90 border-gray-300 text-black'
            }`}
        >
          <span className="text-xl sm:text-2xl font-mono font-extrabold tracking-wider">
            {initials}
          </span>
        </div>
        <span
          className={`text-[9px] sm:text-[10px] font-mono tracking-widest uppercase mt-2 font-semibold ${isLeadership ? 'text-gray-400' : 'text-gray-500'
            }`}
        >
          {isLeadership ? 'ORBIT-I Principal' : 'ORBIT-I Verified Team'}
        </span>
      </div>
    </div>
  );
};

export const TeamSection: React.FC = () => {
  const { teamMembers } = useCms();
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const membersToUse = teamMembers && teamMembers.length > 0 ? teamMembers : TEAM_MEMBERS;

  const departments = [
    { id: 'all', label: `All Team Members (${membersToUse.length})` },
    { id: 'leadership', label: `Executive Governance (${membersToUse.filter((m) => m.tier === 'leadership').length})` },
    { id: 'Web Engineering', label: 'Web Engineering' },
    { id: 'Artificial Intelligence & Research', label: 'AI & Research' },
    { id: 'Backend & Systems', label: 'Backend Engineering' },
    { id: 'Enterprise .NET Systems', label: 'Enterprise Systems' },
    { id: 'Database Systems & Architecture', label: 'Database Systems' },
    { id: 'Product & Design Systems', label: 'UI / UX Design' },
    { id: 'Marketing & Growth', label: 'Marketing & Growth' },
  ];

  const filteredMembers = membersToUse.filter((m) => {
    if (selectedDept === 'all') return true;
    if (selectedDept === 'leadership') return m.tier === 'leadership';
    return m.department === selectedDept;
  });

  const leadershipMembers = filteredMembers.filter((m) => m.tier === 'leadership');
  const coreMembers = filteredMembers.filter((m) => m.tier === 'team');

  return (
    <section className="bg-white text-black py-12 sm:py-16 md:py-24 border-b border-gray-200 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-mono font-medium text-gray-800 mb-3">
            <ShieldCheck className="h-3.5 w-3.5 text-black" />
            <span>ORGANIZATIONAL GOVERNANCE &amp; CORE TALENT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">
            Our Team &amp; Leadership
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
            Led by founder Abdul Samad Rind alongside an agile engineering and operations team headquartered in Nawabshah, Sindh, Pakistan. All official corporate and engineering inquiries route through our central registry at <a href="mailto:contactus@orbit-i.tech" className="font-semibold text-black underline hover:text-blue-600">contactus@orbit-i.tech</a>.
          </p>
        </div>

        {/* Responsive Department Filter Tabs */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
            {departments.map((dept) => {
              const isActive = selectedDept === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDept(dept.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap border transition-all ${isActive
                      ? 'bg-black text-white border-black shadow-xs'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-black hover:text-black'
                    }`}
                >
                  {dept.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. Executive Leadership & Co-Founders (Top Tier) */}
        {leadershipMembers.length > 0 && (
          <div className="mb-16 sm:mb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 mb-8 gap-2">
              <div>
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block">
                  EXECUTIVE GOVERNANCE
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-black">
                  Founders &amp; Executive Leadership
                </h2>
              </div>
              <span className="text-xs font-mono text-gray-500">
                {leadershipMembers.length} Principals
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {leadershipMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white border-2 border-black rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all group"
                >
                  <div>
                    {/* Portrait Image or Responsive Placeholder */}
                    <div className="relative mb-5">
                      <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                        {member.avatar ? (
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-full h-full object-cover object-top transition-all duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = '/abdul-samad.jpg';
                            }}
                          />
                        ) : (
                          <AvatarPlaceholder initials={member.initials} isLeadership={true} />
                        )}
                      </div>
                      <span className="absolute bottom-3 left-3 bg-black text-white text-[10px] sm:text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {member.role}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block mb-1">
                      {member.department}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">{member.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">{member.bio}</p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {member.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-md text-[10px] font-mono text-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600 gap-2">
                    <a
                      href={`mailto:${COMPANY_INFO.email}?subject=Inquiry%20regarding%20${encodeURIComponent(member.name)}`}
                      className="flex items-center gap-1.5 hover:text-black font-medium truncate max-w-[220px]"
                      title="Contact via Official Registry"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-black" />
                      <span className="truncate font-mono">{COMPANY_INFO.email}</span>
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-colors shrink-0"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Core Engineering & Delivery Team ("Inky nichy") */}
        {coreMembers.length > 0 && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 mb-8 gap-2">
              <div>
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-gray-500 block">
                  ENGINEERING &amp; CREATIVE
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-black">
                  Core Engineering &amp; Solutions Team
                </h2>
              </div>
              <span className="text-xs font-mono text-gray-500">
                {coreMembers.length} Specialists
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {coreMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 hover:border-black transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Placeholder Avatar */}
                    <div className="relative mb-4">
                      <div className="w-full aspect-square rounded-xl overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                        {member.avatar ? (
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <AvatarPlaceholder initials={member.initials} isLeadership={false} />
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-black uppercase tracking-wider block mb-1">
                      {member.role}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-black mb-1">{member.name}</h3>
                    <p className="text-[11px] text-gray-500 font-mono mb-2">{member.department}</p>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-3">{member.bio}</p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[9px] font-mono text-gray-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600 gap-2">
                    <a
                      href={`mailto:${COMPANY_INFO.email}?subject=Inquiry%20regarding%20${encodeURIComponent(member.name)}`}
                      className="hover:text-black flex items-center gap-1 font-mono text-[11px] truncate max-w-[200px]"
                      title="Contact via Official Registry"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-black" />
                      <span className="truncate">{COMPANY_INFO.email}</span>
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-full hover:bg-black hover:text-white transition-colors shrink-0"
                    >
                      <Linkedin className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
