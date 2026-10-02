import React from 'react';
import { COMPANY_INFO } from '../data/orbitData';
import { ShieldCheck, ArrowRight, CheckCircle, Server, Code2 } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  return (
    <section className="bg-white text-black border-b border-gray-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headline, Narrative & Actions (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-mono font-medium text-gray-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>ENGINEERING HEADQUARTERS · NAWABSHAH, SINDH</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-[1.08]">
              {COMPANY_INFO.legalName}
            </h1>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 leading-snug">
              Engineering Software That Stays in Orbit Around Your Business
            </h2>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl">
              We engineer custom software systems, scalable cloud platforms, and modern enterprise web and mobile applications with strict type safety, modular architecture, and long-term production reliability.
            </p>

            {/* CTAs - Clean actions: Our Services, Contact Us */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 w-full">
              <button
                onClick={() => setActiveTab('services')}
                className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 px-8 py-3.5 rounded-full font-medium transition-all duration-200 text-sm sm:text-base border-2 border-black shadow-sm flex items-center justify-center gap-2"
              >
                <span>Our Services</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className="w-full sm:w-auto bg-transparent border-2 border-black text-black hover:bg-black hover:text-white px-8 py-3.5 rounded-full font-medium transition-all duration-200 text-sm sm:text-base flex items-center justify-center"
              >
                Contact Us
              </button>
            </div>

            {/* Engineering Quality Standards (100% IP ownership removed) */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-6 text-xs text-gray-600 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span className="font-sans font-semibold text-gray-800">Production-Grade Architecture</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-black" />
                <span className="font-sans font-semibold text-gray-800">SECP Registered Private Limited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                <span className="font-sans font-semibold text-gray-800">Sindh &amp; Global Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Orbit-I Circular Space Emblem (5 Columns) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer soft glowing halo */}
              <div className="absolute inset-0 bg-blue-100/60 rounded-3xl blur-2xl transform -rotate-3 scale-95 pointer-events-none"></div>

              {/* Showcase Card */}
              <div className="relative bg-gradient-to-b from-gray-50 to-white border-2 border-gray-200 rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col items-center justify-center text-center">
                {/* Orbit-I Circular Space Picture */}
                <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64 mb-6 group">
                  <img
                    src="/orbit-circular-logo.png"
                    alt="ORBIT-I Official Circular Emblem"
                    className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-full shadow-2xl relative z-10 transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Company Label */}
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 mb-1">
                  OFFICIAL CORPORATE EMBLEM
                </span>
                <h3 className="text-xl font-bold text-black tracking-tight mb-2">
                  {COMPANY_INFO.legalName}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed max-w-xs mb-4">
                  Engineering software, custom platforms, and verifiable cloud architectures from Nawabshah, Sindh.
                </p>

                <div className="w-full pt-4 border-t border-gray-200 flex items-center justify-between text-[11px] font-mono text-gray-500">
                  <span>EST. {COMPANY_INFO.established}</span>
                  <span className="text-emerald-700 font-bold">SECP ACTIVE</span>
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
