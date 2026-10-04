import React from 'react';
import { COMPANY_INFO } from '../data/orbitData';

interface HomeIntroSplitProps {
  setActiveTab: (tab: string) => void;
}

export const HomeIntroSplit: React.FC<HomeIntroSplitProps> = ({ setActiveTab }) => {
  return (
    <section className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column: Narrative Copy & "Our Services" Button */}
          <div className="flex-1 w-full space-y-6">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
              ENGINEERING PHILOSOPHY
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-950 dark:text-white tracking-tight leading-tight">
              {COMPANY_INFO.legalName}
            </h2>

            <div className="space-y-4 text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                At {COMPANY_INFO.legalName}, we believe that strong, dependable engineering is the foundation of a successful business. Digital systems and online platforms are expanding rapidly, and organizations need software that performs reliably under peak demand. That&apos;s why we focus on precision engineering — designing modular architectures so your business stays one step ahead.
              </p>

              <p>
                Our engineering teams and systems architects focus on custom software solutions, enterprise web platforms, cross-platform mobile apps, cloud infrastructure, and secure API integrations. We engineer production systems, uncover operational bottlenecks, and provide clean, type-safe code that your team can maintain and scale without vendor lock-in.
              </p>

              <p>
                What makes us different is our hands-on engineering approach. We simulate real-world concurrency and high data workloads to ensure your applications remain fault-tolerant. We help you build resilient systems ensuring your data, networks, and digital operations stay fast, secure, and always accessible.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-slate-950 text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 px-8 py-3 rounded-full font-medium transition-all duration-200 text-base shadow-sm"
              >
                Our Services
              </button>
            </div>
          </div>

          {/* Right Column: Branded High-Tech Circuit Board featuring the Official ORBIT-I Circular Picture */}
          <div className="flex-1 w-full max-w-xl">
            <div className="rounded-3xl bg-[#0b0f19] border-2 border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center aspect-4/3 group">
              {/* Circuit board traces SVG background */}
              <svg
                viewBox="0 0 500 380"
                className="absolute inset-0 w-full h-full text-slate-700/60 select-none pointer-events-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Circuit background traces */}
                <path
                  d="M20 50 H120 L160 90 H200"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeOpacity="0.4"
                />
                <circle cx="20" cy="50" r="4" fill="#3b82f6" />
                <path
                  d="M480 60 H380 L340 100 H300"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeOpacity="0.4"
                />
                <circle cx="480" cy="60" r="4" fill="#3b82f6" />

                <path
                  d="M10 140 H100 L150 190 H190"
                  stroke="#4b5563"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="140" r="4" fill="#60a5fa" />
                <path
                  d="M490 150 H390 L350 190 H310"
                  stroke="#4b5563"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="490" cy="150" r="4" fill="#60a5fa" />

                <path
                  d="M30 250 H110 L160 200 H200"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeOpacity="0.5"
                />
                <circle cx="30" cy="250" r="4" fill="#3b82f6" />
                <path
                  d="M470 240 H390 L340 190 H300"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeOpacity="0.5"
                />
                <circle cx="470" cy="240" r="4" fill="#3b82f6" />

                {/* Central orbital beacon ring */}
                <circle cx="250" cy="190" r="110" stroke="#1d4ed8" strokeWidth="1" strokeDasharray="6 6" strokeOpacity="0.5" />
              </svg>

              {/* Central Official ORBIT-I Circular Picture */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center p-1 rounded-full bg-blue-950/60 border border-blue-500/40 backdrop-blur-xs shadow-2xl mb-3">
                  <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl"></div>
                  <img
                    src="/orbit-circular-logo.png"
                    alt="ORBIT-I Circular Core"
                    className="w-32 h-32 sm:w-40 sm:h-40 object-contain rounded-full relative z-10 transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                  />
                </div>

                <span className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
                  ORBIT-I Core Engineering Hub
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                  High-Throughput Digital Systems · Nawabshah, Sindh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
