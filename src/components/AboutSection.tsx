import React, { useState } from 'react';
import { COMPANY_INFO, FREQUENTLY_ASKED_QUESTIONS } from '../data/orbitData';
import { useCms } from '../context/CmsContext';
import { ChevronDown, ChevronUp, CheckCircle, MapPin, ShieldCheck, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { teamMembers, companyInfo } = useCms();
  const info = companyInfo || COMPANY_INFO;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const leadership = [
    {
      name: 'Abdul Samad Rind',
      title: 'Founder & CEO',
      dept: 'Executive Leadership',
      bio: 'Founder and Chief Executive Officer steering ORBIT-I Private Limited. Focused on high-performance enterprise systems, sustainable technology architecture, and digital engineering partnerships across Pakistan and international markets.',
    },
    {
      name: 'Maria Almani',
      title: 'Co-Founder & COO',
      dept: 'Operations & Strategy',
      bio: 'Co-Founder and Chief Operating Officer overseeing client operations, sprint delivery management, team coordination, and strategic business growth for ORBIT-I engagements.',
    },
    {
      name: 'Muhammad Muneeb Ur Rahman Shahzad',
      title: 'Co-Founder & CTO',
      dept: 'Engineering & Technology',
      bio: 'Co-Founder and Chief Technology Officer orchestrating technical architecture, cloud scalability, secure relational database design, and software engineering standards.',
    },
    {
      name: 'Hassan Ansar',
      title: 'Web Developer',
      dept: 'Web Engineering',
      bio: 'Frontend and full-stack web developer specializing in modern React, responsive client interfaces, high-performance web applications, and state architecture.',
    },
    {
      name: 'Waleed Ahmed',
      title: 'Digital Marketing Expert',
      dept: 'Marketing & Growth',
      bio: 'Digital marketing strategist driving search engine visibility, brand communication, client acquisition funnels, and enterprise outreach for ORBIT-I digital platforms.',
    },
    {
      name: 'Rashid Ali Channa',
      title: 'AI / ML Engineer',
      dept: 'Artificial Intelligence & Research',
      bio: 'Machine learning engineer designing predictive algorithms, computer vision pipelines, natural language processing models, and intelligent automated workflows.',
    },
    {
      name: 'Laiba',
      title: 'Backend Developer',
      dept: 'Backend & Systems',
      bio: 'Backend solutions engineer focusing on robust RESTful APIs, microservices architectures, data persistence, and secure authentication pipelines.',
    },
    {
      name: 'Abdul Rehman',
      title: '.NET Developer',
      dept: 'Enterprise .NET Systems',
      bio: 'Enterprise .NET developer with expertise in C#, ASP.NET Core, Microsoft server environments, SQL database optimizations, and high-concurrency transactional pipelines.',
    },
    {
      name: 'Chander Parkash',
      title: 'Database Administrator',
      dept: 'Database Systems & Architecture',
      bio: 'Database Administrator specializing in enterprise SQL relational architectures, PostgreSQL & MySQL optimization, high-availability clustering, data replication, and query performance tuning.',
    },
    {
      name: 'Hamnah',
      title: 'UI / UX Designer',
      dept: 'Product & Design Systems',
      bio: 'Product designer crafting elegant design systems, intuitive user workflows, responsive mobile wireframes, high-fidelity prototypes, and accessible visual user interfaces.',
    },
  ];

  return (
    <section className="bg-white text-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* About Overview with Official ORBIT-I Picture Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-mono font-medium text-gray-700">
              <ShieldCheck className="h-3.5 w-3.5 text-black" />
              <span>CORPORATE PROFILE &amp; MISSION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black tracking-tight leading-tight">
              About {COMPANY_INFO.legalName}
            </h2>

            <div className="space-y-4 text-base md:text-lg text-gray-800 leading-relaxed">
              <p>
                At {COMPANY_INFO.legalName}, we believe reliable engineering is the foundation of enduring technology. Digital systems must be dependable, secure, and built to evolve without accumulated technical debt.
              </p>
              <p>
                Founded by <strong>Abdul Samad Rind</strong>, <strong>Maria Almani</strong>, and <strong>Muhammad Muneeb Ur Rahman Shahzad</strong>, and headquartered in <strong>Nawabshah, Sindh, Pakistan</strong>, we design, build, and support enterprise web platforms, mobile applications, and custom business software for organizations across regional and global markets.
              </p>
              <p>
                We operate as dedicated engineering partners committed to your long-term success — delivering clean modular codebases, 100% intellectual property ownership, and rigorous security verification.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-gray-600">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                <MapPin className="h-3.5 w-3.5 text-black" />
                <span className="font-sans font-semibold text-black">{COMPANY_INFO.location}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg">
                <Award className="h-3.5 w-3.5 text-black" />
                <span className="font-sans font-semibold text-black">Private Limited Company</span>
              </div>
            </div>
          </div>

          {/* Prominent Orbit-I 3D Official Picture Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-gradient-to-b from-gray-50 to-white border-2 border-gray-200 rounded-3xl p-8 shadow-xl text-center flex flex-col items-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-4">
                <img
                  src="/orbit-circular-logo.png"
                  alt="ORBIT-I Official Emblem"
                  className="w-44 h-44 sm:w-52 sm:h-52 object-contain rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>

              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600">
                OFFICIAL TRADEMARK
              </span>
              <h3 className="text-lg font-bold text-black mt-1 mb-1">
                {COMPANY_INFO.legalName}
              </h3>
              <p className="text-xs text-gray-600">
                {COMPANY_INFO.tagline}
              </p>
              <div className="mt-4 pt-3 border-t border-gray-200 w-full text-[11px] font-mono text-gray-500 flex justify-between">
                <span>EST. {COMPANY_INFO.established}</span>
                <span className="text-emerald-700 font-bold">SECP VERIFIED</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Values / Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-black transition-all">
            <h3 className="text-xl font-bold text-black mb-3">01. Engineering Rigor</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              We enforce strict type-safety, clean modular architecture, and thorough code reviews to ensure your software performs under pressure.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-black transition-all">
            <h3 className="text-xl font-bold text-black mb-3">02. 100% IP Ownership</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Clients retain full ownership of their source code, database architectures, and intellectual property without vendor lock-in.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-black transition-all">
            <h3 className="text-xl font-bold text-black mb-3">03. Transparent Delivery</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Clear milestone schedules, regular sprint demonstrations, and direct access to software architects throughout the engagement.
            </p>
          </div>
        </div>

        {/* Leadership & Team */}
        <div className="mb-20">
          <div className="max-w-3xl mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
              Leadership &amp; Core Team
            </h3>
            <p className="text-base text-gray-600">
              The visionary founders and dedicated engineers leading ORBIT-I Private Limited from Nawabshah, Sindh.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(teamMembers && teamMembers.length > 0 ? teamMembers : leadership).map((leader, idx) => {
              const isCEO = leader.name.toLowerCase().includes('abdul samad');
              const avatarSrc = (leader as any).avatar || (isCEO ? '/AbdulSamad.jpeg' : '');
              const initials = leader.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();
              const deptName = (leader as any).department || (leader as any).dept;
              const roleTitle = (leader as any).role || (leader as any).title;

              return (
                <div
                  key={(leader as any).id || idx}
                  className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 hover:border-black transition-all flex flex-col justify-between shadow-xs group"
                >
                  <div>
                    {/* Portrait Avatar / Responsive Placeholder */}
                    <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100 border border-gray-200 flex items-center justify-center relative">
                      {avatarSrc ? (
                        <img
                          src={avatarSrc}
                          alt={leader.name}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/abdul-samad.jpg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200 text-gray-800 flex flex-col items-center justify-center relative select-none">
                          <svg
                            className="w-24 h-24 opacity-25 text-gray-600 mt-2"
                            viewBox="0 0 128 128"
                            fill="currentColor"
                          >
                            <circle cx="64" cy="42" r="26" />
                            <path d="M18 116 C18 88 38 78 64 78 C90 78 110 88 110 116 Z" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="px-3.5 py-1.5 rounded-xl bg-white/95 border border-gray-300 shadow-md">
                              <span className="text-lg font-mono font-extrabold text-black tracking-wider">
                                {initials}
                              </span>
                            </div>
                            <span className="text-[9px] font-mono text-gray-500 uppercase mt-1 font-semibold tracking-wider">
                              Verified Specialist
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] font-mono font-semibold text-blue-600 mb-1">
                      {deptName}
                    </div>
                    <h4 className="text-lg font-bold text-black mb-0.5">{leader.name}</h4>
                    <div className="text-xs text-gray-500 font-semibold mb-3">{roleTitle}</div>
                    <p className="text-xs text-gray-700 leading-relaxed line-clamp-4">{leader.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div>
          <div className="max-w-3xl mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
              Frequently Asked Questions
            </h3>
            <p className="text-base text-gray-600">
              Common questions about working with ORBIT-I Private Limited.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl">
            {FREQUENTLY_ASKED_QUESTIONS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-black text-base md:text-lg">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 shrink-0 ml-4" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-sm md:text-base text-gray-700 leading-relaxed border-t border-gray-100 bg-gray-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
