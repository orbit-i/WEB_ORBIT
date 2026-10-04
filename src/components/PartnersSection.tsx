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
  ExternalLink,
  Code2,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { PartnerAlliance } from '../types';
import { DEFAULT_PARTNERS_SETTINGS } from '../data/orbitData';

export const renderPartnerIcon = (partner: PartnerAlliance) => {
  if (partner.logoUrl && partner.logoUrl.trim()) {
    return (
      <img
        src={partner.logoUrl}
        alt={partner.name}
        className="w-5 h-5 object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  const iconType = partner.iconType || 'shield';

  switch (iconType) {
    case 'aws':
      return (
        <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.08.168-.232.264l-1.143.647c-.08.048-.16.072-.232.072-.088 0-.176-.04-.264-.12-.36-.408-.624-.864-.784-1.376-.16-.512-.24-1.088-.24-1.72 0-.68.096-1.304.288-1.872a4.42 4.42 0 0 1 .84-1.544c.376-.432.84-.776 1.392-1.032.552-.256 1.184-.384 1.896-.384.6 0 1.152.096 1.656.288.504.192.936.472 1.296.84.36.368.64.816.84 1.344.2.528.304 1.12.304 1.776 0 .736-.112 1.408-.336 2.016a4.77 4.77 0 0 1-.92 1.632c-.392.44-.88.784-1.464 1.032-.584.248-1.248.376-1.992.376-.56 0-1.072-.088-1.536-.264-.464-.176-.848-.424-1.152-.744v1.856c0 .104-.04.184-.12.24-.08.056-.184.08-.312.08H4.62c-.104 0-.184-.032-.24-.096a.31.31 0 0 1-.08-.224V6.892c0-.104.032-.184.096-.24.064-.056.152-.088.264-.088h1.616c.104 0 .184.032.24.096.056.064.088.152.088.264v3.112h-.04z" />
        </svg>
      );
    case 'google-cloud':
      return (
        <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      );
    case 'microsoft':
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="9" height="9" fill="#F25022" />
          <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
          <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
          <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
        </svg>
      );
    case 'cloudflare':
      return (
        <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.5 8c-.37 0-.72.04-1.07.1A5.996 5.996 0 0 0 4.18 11.2C1.84 11.66 0 13.63 0 16.03 0 18.78 2.22 21 4.97 21h12.06c2.75 0 4.97-2.22 4.97-4.97 0-2.58-1.95-4.69-4.5-4.94C17.43 9.24 17.03 8 16.5 8z" />
        </svg>
      );
    case 'docker':
      return (
        <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.575a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.083.186.185.186m0 2.715h2.118a.186.186 0 00.186-.186V6.29a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.083.186.185.186m-2.953 0h2.118a.186.186 0 00.186-.186V6.29a.186.186 0 00-.186-.186H8.076a.185.185 0 00-.185.186v1.887c0 .102.083.186.185.186m5.907 0h2.119a.186.186 0 00.186-.186V6.29a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.186.185.186m-8.86 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H5.123a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m2.953 0h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H8.076a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m2.954 0h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185M23.76 11.233c-.347-.367-.936-.508-1.503-.399-.187-.803-.79-1.424-1.613-1.603l-.407-.089-.25.334c-.452.605-.726 1.341-.78 2.102-.07.012-.138.026-.208.041H1.53c-.365 0-.68.212-.824.542-.505 1.157-.59 2.704-.265 4.312.441 2.186 1.838 4.225 3.935 5.739C6.444 23.684 9.177 24 12.01 24c4.618 0 8.653-1.464 10.978-4.664.133-.183.197-.406.182-.63a.87.87 0 00-.317-.605c-.86-.71-1.393-1.748-1.46-2.852.793-.728 2.222-1.288 2.45-3.08.037-.291-.013-.604-.083-.936" />
        </svg>
      );
    case 'react':
      return (
        <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
      );
    case 'nodejs':
      return (
        <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3z" />
        </svg>
      );
    case 'linux':
      return <Terminal className="w-5 h-5 text-emerald-500" />;
    case 'cloud':
      return <Cloud className="w-5 h-5 text-sky-500" />;
    case 'cpu':
      return <Cpu className="w-5 h-5 text-violet-500" />;
    case 'code':
      return <Code2 className="w-5 h-5 text-blue-500" />;
    case 'award':
      return <Award className="w-5 h-5 text-amber-500" />;
    case 'lock':
      return <Lock className="w-5 h-5 text-emerald-500" />;
    case 'globe':
      return <Globe className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
    case 'zap':
      return <Zap className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />;
    case 'building':
      return <Building2 className="w-5 h-5 text-slate-700 dark:text-slate-300" />;
    case 'shield':
    default:
      return <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
  }
};

export const PartnersSection: React.FC = () => {
  const { partners, partnersSettings } = useCms();
  const settings = partnersSettings || DEFAULT_PARTNERS_SETTINGS;

  // If section is toggled off in Admin Panel, do not render
  if (settings.isEnabled === false) {
    return null;
  }

  // Active partners list from CMS, sorted by displayOrder
  const activePartners: PartnerAlliance[] = React.useMemo(() => {
    const list = Array.isArray(partners) ? partners : [];
    return list
      .filter((p) => p.isActive !== false)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }, [partners]);

  // Active trust badges
  const activeTrustBadges = React.useMemo(() => {
    const badges = settings.trustBadges || [];
    return badges.filter((b) => b.isActive !== false);
  }, [settings.trustBadges]);

  // If there are no active partners and no trust badges, hide section gracefully
  if (activePartners.length === 0 && (!settings.showTrustBadges || activeTrustBadges.length === 0)) {
    return null;
  }

  const getDotColorClass = (color?: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-500 shadow-emerald-500/50';
      case 'blue':
        return 'bg-blue-500 shadow-blue-500/50';
      case 'purple':
        return 'bg-purple-500 shadow-purple-500/50';
      case 'indigo':
        return 'bg-indigo-500 shadow-indigo-500/50';
      case 'amber':
        return 'bg-amber-500 shadow-amber-500/50';
      case 'cyan':
        return 'bg-cyan-500 shadow-cyan-500/50';
      case 'rose':
        return 'bg-rose-500 shadow-rose-500/50';
      default:
        return 'bg-slate-400 shadow-slate-400/50';
    }
  };

  return (
    <section className="bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-white py-10 sm:py-14 border-y border-slate-200 dark:border-slate-800 overflow-hidden relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center">
        {/* Section Pill Badge (Editable or Hidden if empty) */}
        {settings.badgeText && settings.badgeText.trim() && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-xs font-mono font-semibold border border-blue-200/80 dark:border-blue-800/60 mb-2.5 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{settings.badgeText}</span>
          </div>
        )}

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {settings.title || 'Technology Ecosystem & Platform Alliances'}
        </h2>
        {settings.subtitle && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 max-w-2xl mx-auto leading-relaxed">
            {settings.subtitle}
          </p>
        )}
      </div>

      {/* Infinite Walking Marquee Track with Vertical Separator Lines */}
      {activePartners.length > 0 && (
        <div className="relative w-full overflow-hidden py-3">
          {/* Left & Right Edge Gradient Masks for Smooth Fading */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 dark:from-[#0b0f19] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 dark:from-[#0b0f19] to-transparent z-10" />

          {/* The Walking Marquee Container */}
          <div className="animate-marquee-walking items-center">
            {/* Duplicate set 1 */}
            {activePartners.map((partner) => (
              <React.Fragment key={`p1-${partner.id}`}>
                <div
                  className="flex items-center gap-3.5 px-6 sm:px-8 shrink-0 group cursor-default select-none transition-transform hover:scale-105"
                  onClick={() => {
                    if (partner.websiteUrl) {
                      window.open(partner.websiteUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  role={partner.websiteUrl ? 'link' : undefined}
                  title={partner.websiteUrl ? `Visit ${partner.name}` : partner.name}
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-2 shadow-2xs group-hover:border-blue-500 group-hover:shadow-md transition-all">
                    {renderPartnerIcon(partner)}
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap">
                        {partner.name}
                      </span>
                      {partner.badge && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
                          {partner.badge}
                        </span>
                      )}
                      {partner.websiteUrl && (
                        <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap mt-0.5">
                      {partner.category}
                    </span>
                  </div>
                </div>

                {/* Vertical line with walking partners */}
                <div className="h-8 w-px bg-slate-300 dark:bg-slate-800 shrink-0" />
              </React.Fragment>
            ))}

            {/* Duplicate set 2 for seamless infinite loop */}
            {activePartners.map((partner) => (
              <React.Fragment key={`p2-${partner.id}`}>
                <div
                  className="flex items-center gap-3.5 px-6 sm:px-8 shrink-0 group cursor-default select-none transition-transform hover:scale-105"
                  onClick={() => {
                    if (partner.websiteUrl) {
                      window.open(partner.websiteUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  role={partner.websiteUrl ? 'link' : undefined}
                  title={partner.websiteUrl ? `Visit ${partner.name}` : partner.name}
                >
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-2 shadow-2xs group-hover:border-blue-500 group-hover:shadow-md transition-all">
                    {renderPartnerIcon(partner)}
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors whitespace-nowrap">
                        {partner.name}
                      </span>
                      {partner.badge && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
                          {partner.badge}
                        </span>
                      )}
                      {partner.websiteUrl && (
                        <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap mt-0.5">
                      {partner.category}
                    </span>
                  </div>
                </div>

                {/* Vertical line with walking partners */}
                <div className="h-8 w-px bg-slate-300 dark:bg-slate-800 shrink-0" />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Trust Credential Badges Footer Strip (Fully dynamic, editable & toggleable from Admin CMS) */}
      {settings.showTrustBadges !== false && activeTrustBadges.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 mt-6 pt-5 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          {activeTrustBadges.map((badge) => (
            <span key={badge.id} className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${getDotColorClass(badge.color)}`} />
              <span>{badge.label}</span>
            </span>
          ))}
        </div>
      )}
    </section>
  );
};
