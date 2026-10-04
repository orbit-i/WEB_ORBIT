import React from 'react';
import { COMPANY_INFO } from '../data/orbitData';
import { useCms } from '../context/CmsContext';
import { SeoHead } from './common/SeoHead';
import { ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  const { pageContents } = useCms();
  const homeData = pageContents?.home;

  return (
    <section className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800/80 overflow-hidden relative transition-colors duration-200">
      <SeoHead
        title={homeData?.metaTitle || `${COMPANY_INFO.legalName} | Enterprise Software Engineering & Applied AI`}
        description={
          homeData?.metaDescription ||
          homeData?.subheadline ||
          'SECP Registered Software Engineering firm based in Nawabshah, Sindh, Pakistan. Delivering mission-critical web applications, mobile apps, and cloud infrastructure for Nawabshah, Hyderabad, Karachi, Sukkur, Islamabad, Lahore, UK, US, and UAE.'
        }
        canonicalUrl="https://orbit-i.tech/"
      />
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline, Narrative & Actions (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-medium text-slate-800 dark:text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{homeData?.badge || 'ENGINEERING HEADQUARTERS · NAWABSHAH, SINDH'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.08]">
              {COMPANY_INFO.legalName}
            </h1>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-slate-200 leading-snug">
              {homeData?.headline || 'Engineering Software That Stays in Orbit Around Your Business'}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {homeData?.subheadline ||
                homeData?.description ||
                'We engineer custom software systems, scalable cloud platforms, and modern enterprise web and mobile applications with strict type safety, modular architecture, and long-term production reliability.'}
            </p>

            {/* CTAs - Clean actions: Our Services, Contact Us */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 w-full">
              <button
                onClick={() => setActiveTab('services')}
                className="w-full sm:w-auto bg-slate-950 text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 px-8 py-3.5 rounded-full font-medium transition-all duration-200 text-sm sm:text-base shadow-sm flex items-center justify-center gap-2"
              >
                <span>{homeData?.primaryCtaText || 'Our Services'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className="w-full sm:w-auto bg-transparent border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 px-8 py-3.5 rounded-full font-medium transition-all duration-200 text-sm sm:text-base flex items-center justify-center"
              >
                {homeData?.secondaryCtaText || 'Contact Us'}
              </button>
            </div>

            {/* Engineering Quality Standards */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-sans font-semibold text-slate-800 dark:text-slate-200">Production-Grade Architecture</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="font-sans font-semibold text-slate-800 dark:text-slate-200">SECP Registered Private Limited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <span className="font-sans font-semibold text-slate-800 dark:text-slate-200">Sindh &amp; Global Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Orbit-I Circular Space Emblem (5 Columns) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer soft glowing halo */}
              <div className="absolute inset-0 bg-blue-100/50 dark:bg-blue-900/20 rounded-3xl blur-2xl transform -rotate-3 scale-95 pointer-events-none"></div>

              {/* Showcase Card */}
              <div className="relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col items-center justify-center text-center">
                {/* Orbit-I Circular Space Picture */}
                <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64 mb-6 group">
                  <img
                    src="/orbit-circular-logo.png"
                    alt="ORBIT-I Official Circular Emblem"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-full shadow-2xl relative z-10 transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Company Label */}
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 mb-1">
                  OFFICIAL CORPORATE EMBLEM
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  {COMPANY_INFO.legalName}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mb-4">
                  Engineering software, custom platforms, and verifiable cloud architectures from Nawabshah, Sindh.
                </p>

                <div className="w-full pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>EST. {COMPANY_INFO.established}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">SECP ACTIVE</span>
                  <span>SINDH, PK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
