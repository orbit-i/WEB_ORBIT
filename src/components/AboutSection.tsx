import React, { useState } from 'react';
import { COMPANY_INFO, FREQUENTLY_ASKED_QUESTIONS } from '../data/orbitData';
import { useCms } from '../context/CmsContext';
import { SeoHead } from './common/SeoHead';
import {
  ShieldCheck,
  Award,
  MapPin,
  Building2,
  FileCheck2,
  Lock,
  Globe2,
  Cpu,
  Database,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Server
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { companyInfo, pageContents } = useCms();
  const info = companyInfo || COMPANY_INFO;
  const aboutData = pageContents?.about;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 md:py-24 transition-colors duration-200">
      <SeoHead
        title={aboutData?.metaTitle || `About ${info.legalName} | SECP Registered Engineering Firm`}
        description={
          aboutData?.metaDescription ||
          aboutData?.subheadline ||
          'Official corporate profile, SECP incorporation, governance, engineering standards, and regional delivery hubs of ORBIT-I Private Limited.'
        }
        canonicalUrl="https://orbit-i.tech/#about"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Corporate Header & Official Emblem Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>{aboutData?.badge || 'CORPORATE PROFILE & GOVERNANCE'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
              {aboutData?.headline || `About ${info.legalName}`}
            </h1>

            <p className="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400">
              {info.tagline}
            </p>

            <div className="space-y-4 text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              {aboutData?.description ? (
                <p className="whitespace-pre-line">{aboutData.description}</p>
              ) : (
                <>
                  <p>
                    <strong>{info.legalName}</strong> is an officially incorporated private limited software engineering company registered with the <strong>Securities and Exchange Commission of Pakistan (SECP)</strong>. We engineer mission-critical digital systems, scalable enterprise web and mobile applications, and resilient cloud architectures for demanding businesses.
                  </p>
                  <p>
                    Founded by <strong>Abdul Samad Rind</strong> (Founder & CEO), <strong>Maria Almani</strong> (Co-Founder & COO), and <strong>Muhammad Muneeb Ur Rahman Shahzad</strong> (Co-Founder & CTO), ORBIT-I operates on foundational engineering discipline: strict type-safety, clean modular architectures, 100% intellectual property ownership for clients, and zero vendor lock-in.
                  </p>
                  <p>
                    Headquartered in <strong>Nawabshah, Sindh</strong>, our engineering delivery spans major economic corridors across Pakistan — including <strong>Karachi, Hyderabad, Sukkur, Islamabad, and Lahore</strong> — alongside international technological partnerships across the <strong>United Kingdom, United States, and UAE</strong>.
                  </p>
                </>
              )}
            </div>

            {/* Quick Corporate Badges */}
            <div className="pt-2 flex flex-wrap gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span className="font-sans font-semibold">{info.location}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
                <Building2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-sans font-semibold">SECP Registered Pvt Ltd</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300">
                <Award className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span className="font-sans font-semibold">Est. {info.established}</span>
              </div>
            </div>
          </div>

          {/* Official Registered Emblem Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl text-center flex flex-col items-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-4">
                <img
                  src="/orbit-circular-logo.png"
                  alt="ORBIT-I Private Limited Official Emblem"
                  className="w-44 h-44 sm:w-52 sm:h-52 object-contain rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>

              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                OFFICIAL CORPORATE ENTITY
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1 mb-1">
                {info.legalName}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {info.tagline}
              </p>

              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 w-full text-[11px] font-mono text-slate-500 dark:text-slate-400 flex justify-between">
                <span>EST. {info.established}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> SECP VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Legal & Operational Profile Matrix */}
        <div className="mb-20">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold mb-2">
              INSTITUTIONAL FOUNDATION
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Corporate Governance &amp; Operating Standards
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Every system built by ORBIT-I conforms to strict legal, architectural, and operational benchmarks designed for long-term commercial reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-blue-500 dark:hover:border-blue-500 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                SECP Incorporated
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Registered under the Companies Act with the Securities and Exchange Commission of Pakistan as a fully compliant Private Limited entity.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                100% IP Ownership
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Clients receive full contractual ownership of all source code, database models, schemas, and assets with zero proprietary vendor lock-in.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-purple-500 dark:hover:border-purple-500 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Type-Safe Rigor
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Strict type safety, modular micro-component patterns, automated testing pipelines, and clean architecture prevent accumulated technical debt.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-amber-500 dark:hover:border-amber-500 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                99.9% Uptime SLA
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                High-availability cloud deployments, automated database failover, health telemetry, and ongoing post-launch maintenance guarantees.
              </p>
            </div>
          </div>
        </div>

        {/* Strategic Delivery Footprint (Local & International SEO Anchor) */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-mono font-medium text-blue-600 dark:text-blue-400">
                <Globe2 className="h-3.5 w-3.5" />
                <span>REGIONAL &amp; INTERNATIONAL REACH</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Engineering Delivery Across Pakistan &amp; Global Markets
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                While rooted with headquarters in <strong>Nawabshah, Sindh</strong>, ORBIT-I Private Limited actively supports commercial enterprises, educational institutions, healthcare networks, and technology startups across Pakistan&apos;s primary commercial centers:
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium">
                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="font-bold text-slate-900 dark:text-white block">Nawabshah (HQ)</span>
                  <span className="text-slate-500 text-[11px]">Central Innovation Hub</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="font-bold text-slate-900 dark:text-white block">Karachi</span>
                  <span className="text-slate-500 text-[11px]">Commercial &amp; FinTech</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="font-bold text-slate-900 dark:text-white block">Hyderabad</span>
                  <span className="text-slate-500 text-[11px]">Regional Enterprise</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="font-bold text-slate-900 dark:text-white block">Sukkur</span>
                  <span className="text-slate-500 text-[11px]">Upper Sindh Tech</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="font-bold text-slate-900 dark:text-white block">Islamabad</span>
                  <span className="text-slate-500 text-[11px]">Corporate &amp; Public Sector</span>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <span className="font-bold text-slate-900 dark:text-white block">Lahore</span>
                  <span className="text-slate-500 text-[11px]">Industrial &amp; Retail Tech</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 pt-2">
                <strong>International Engagements:</strong> Cross-border software engineering, offshore development teams, and dedicated technical consulting delivered to partners in the <strong>United Kingdom, United States, and United Arab Emirates (UAE / GCC)</strong>.
              </p>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Official Corporate Inquiries
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Connect directly with our corporate office for RFP proposals, institutional verification, or engineering partnerships.
              </p>
              
              <div className="space-y-3 pt-2 text-xs">
                <a
                  href={`mailto:${info.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-mono truncate">{info.email}</span>
                </a>

                <a
                  href={`tel:${info.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-mono">{info.phone}</span>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-medium">{info.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Frequently Asked Questions */}
        <div>
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold mb-2">
              DUE DILIGENCE &amp; TRANSPARENCY
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Corporate Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Transparent answers regarding company registration, IP licensing, SLAs, and technical delivery protocols.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl">
            {FREQUENTLY_ASKED_QUESTIONS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all bg-white dark:bg-slate-900 shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white text-base md:text-lg">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-slate-500 shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-500 shrink-0 ml-4" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
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
