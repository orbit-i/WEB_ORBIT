import React from 'react';
import {
  ShieldCheck,
  Cloud,
  Cpu,
  Layers,
  Award,
  Globe,
  Lock,
  Building2,
  Terminal,
  Zap,
} from 'lucide-react';

interface PartnerItem {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  badge?: string;
}

export const PARTNERS_LIST: PartnerItem[] = [
  {
    id: 'secp',
    name: 'SECP Pakistan',
    category: 'Corporate Registry (CUIN: 0256842)',
    badge: 'Regulated',
    icon: (
      <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: 'aws',
    name: 'AWS Partner Network',
    category: 'Cloud Infrastructure & EC2',
    badge: 'Cloud Alliance',
    icon: (
      <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.08.168-.232.264l-1.143.647c-.08.048-.16.072-.232.072-.088 0-.176-.04-.264-.12-.36-.408-.624-.864-.784-1.376-.16-.512-.24-1.088-.24-1.72 0-.68.096-1.304.288-1.872a4.42 4.42 0 0 1 .84-1.544c.376-.432.84-.776 1.392-1.032.552-.256 1.184-.384 1.896-.384.6 0 1.152.096 1.656.288.504.192.936.472 1.296.84.36.368.64.816.84 1.344.2.528.304 1.12.304 1.776 0 .736-.112 1.408-.336 2.016a4.77 4.77 0 0 1-.92 1.632c-.392.44-.88.784-1.464 1.032-.584.248-1.248.376-1.992.376-.56 0-1.072-.088-1.536-.264-.464-.176-.848-.424-1.152-.744v1.856c0 .104-.04.184-.12.24-.08.056-.184.08-.312.08H4.62c-.104 0-.184-.032-.24-.096a.31.31 0 0 1-.08-.224V6.892c0-.104.032-.184.096-.24.064-.056.152-.088.264-.088h1.616c.104 0 .184.032.24.096.056.064.088.152.088.264v3.112h-.04z" />
      </svg>
    ),
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud Platform',
    category: 'Cloud Build & BigQuery Ecosystem',
    badge: 'AI & Compute',
    icon: (
      <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
    ),
  },
  {
    id: 'microsoft',
    name: 'Microsoft Cloud Partner',
    category: 'Azure & .NET Enterprise Solutions',
    badge: 'Enterprise Alliance',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" fill="#F25022" />
        <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
        <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
        <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
      </svg>
    ),
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare Zero-Trust',
    category: 'Edge CDN & Threat Mitigation',
    badge: 'Security',
    icon: (
      <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 8c-.37 0-.72.04-1.07.1A5.996 5.996 0 0 0 4.18 11.2C1.84 11.66 0 13.63 0 16.03 0 18.78 2.22 21 4.97 21h12.06c2.75 0 4.97-2.22 4.97-4.97 0-2.58-1.95-4.69-4.5-4.94C17.43 9.24 17.03 8 16.5 8z" />
      </svg>
    ),
  },
  {
    id: 'linux-foundation',
    name: 'Linux Foundation',
    category: 'Enterprise Linux & Container Standards',
    badge: 'Open Standards',
    icon: <Terminal className="w-5 h-5 text-emerald-500" />,
  },
  {
    id: 'pseb',
    name: 'PSEB Pakistan',
    category: 'Ministry of IT & Telecom Exporter',
    badge: 'IT Registry',
    icon: <Globe className="w-5 h-5 text-teal-600" />,
  },
  {
    id: 'pasha',
    name: 'P@SHA Network',
    category: 'Pakistan IT Industry Association',
    badge: 'Consortium',
    icon: <Zap className="w-5 h-5 text-indigo-500" />,
  },
  {
    id: 'stripe',
    name: 'Stripe Verified Partner',
    category: 'International Escrow & Payment Rails',
    badge: 'Fintech Alliance',
    icon: (
      <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.783.5 6.786.5 2.5 3.658 2.5 9.421c0 5.485 5.093 6.945 8.761 8.274 2.569.932 3.447 1.626 3.447 2.656 0 .99-.865 1.545-2.28 1.545-2.613 0-5.385-1.127-7.23-2.164L4.25 25.32c1.785.803 4.887 1.48 8.077 1.48 6.425 0 10.748-3.033 10.748-8.91 0-5.59-4.872-7.227-9.099-8.74z" />
      </svg>
    ),
  },
  {
    id: 'fbr',
    name: 'FBR Taxpayer Active',
    category: 'Federal Tax & Corporate Compliance',
    badge: 'Compliant',
    icon: <Building2 className="w-5 h-5 text-slate-700 dark:text-slate-300" />,
  },
];

export const PartnersSection: React.FC = () => {
  return (
    <section className="bg-gray-50/70 dark:bg-slate-950/60 text-gray-900 dark:text-white py-10 sm:py-14 border-y border-gray-200/90 dark:border-slate-800/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-xs font-mono font-semibold border border-blue-200/80 dark:border-blue-800/60 mb-2.5 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>VERIFIED STRATEGIC ALLIANCES &amp; COLLABORATIONS</span>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Institutional Partners &amp; Technology Alliances
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1.5 max-w-2xl mx-auto leading-relaxed">
          ORBIT-I Private Limited actively collaborates with global cloud providers, regulatory authorities, and certified technology ecosystems to engineer reliable digital solutions.
        </p>
      </div>

      {/* Infinite Walking Marquee Track with Vertical Separator Lines */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left & Right Edge Gradient Masks for Smooth Fading */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-gray-50 dark:from-slate-950 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-gray-50 dark:from-slate-950 to-transparent z-10" />

        {/* The Walking Marquee Container */}
        <div className="animate-marquee-walking items-center">
          {/* Duplicate set 1 */}
          {PARTNERS_LIST.map((partner) => (
            <React.Fragment key={`p1-${partner.id}`}>
              <div className="flex items-center gap-3.5 px-6 sm:px-8 shrink-0 group cursor-default select-none transition-transform hover:scale-105">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 flex items-center justify-center p-2 shadow-2xs group-hover:border-blue-500 group-hover:shadow-md transition-all">
                  {partner.icon}
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap">
                      {partner.name}
                    </span>
                    {partner.badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
                        {partner.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 dark:text-gray-400 whitespace-nowrap mt-0.5">
                    {partner.category}
                  </span>
                </div>
              </div>

              {/* Vertical line with walking partners */}
              <div className="h-8 w-px bg-gray-300 dark:bg-slate-700 shrink-0" />
            </React.Fragment>
          ))}

          {/* Duplicate set 2 for seamless infinite loop */}
          {PARTNERS_LIST.map((partner) => (
            <React.Fragment key={`p2-${partner.id}`}>
              <div className="flex items-center gap-3.5 px-6 sm:px-8 shrink-0 group cursor-default select-none transition-transform hover:scale-105">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 flex items-center justify-center p-2 shadow-2xs group-hover:border-blue-500 group-hover:shadow-md transition-all">
                  {partner.icon}
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap">
                      {partner.name}
                    </span>
                    {partner.badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
                        {partner.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-gray-500 dark:text-gray-400 whitespace-nowrap mt-0.5">
                    {partner.category}
                  </span>
                </div>
              </div>

              {/* Vertical line with walking partners */}
              <div className="h-8 w-px bg-gray-300 dark:bg-slate-700 shrink-0" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Trust Credential Badges Footer Strip */}
      <div className="max-w-5xl mx-auto px-4 mt-6 pt-5 border-t border-gray-200/70 dark:border-slate-800/60 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] text-gray-500 dark:text-gray-400 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>SECP Corporate CUIN: 0256842</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          <span>PSEB Certified Exporter</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
          <span>FBR Registered Taxpayer</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          <span>256-Bit TLS Secured</span>
        </span>
      </div>
    </section>
  );
};
