import React from 'react';
import { useCms } from '../context/CmsContext';
import { Share2 } from 'lucide-react';
import {
  TikTokIcon,
  WhatsAppIcon,
  LinkedInIcon,
  TwitterXIcon,
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  TelegramIcon,
} from './common/BrandIcons';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openLegalModal?: (policyId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { companyInfo, services } = useCms();
  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Col 1: About & Dynamic Socials */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={companyInfo.logoUrl || '/orbit-circular-logo.png'}
                alt={companyInfo.name}
                className="h-8 w-auto object-contain bg-transparent"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/orbit-circular-logo.png';
                }}
              />
              <span className="font-bold text-slate-950 dark:text-white text-lg">
                {companyInfo.name}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {companyInfo.summary ||
                `${companyInfo.legalName} is an engineering technology company delivering dependable software platforms, mobile applications, and custom digital systems.`}
            </p>

            {/* Dynamic Social Channels with Official Brand Icons */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {companyInfo.socialLinks?.linkedin && (
                <a
                  href={companyInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-[#0077b5] hover:text-white text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all border border-slate-200 dark:border-slate-800"
                  title="LinkedIn"
                >
                  <LinkedInIcon className="h-4 w-4" />
                </a>
              )}
              {companyInfo.socialLinks?.twitter && (
                <a
                  href={companyInfo.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-black hover:text-white text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all border border-slate-200 dark:border-slate-800"
                  title="Twitter / X"
                >
                  <TwitterXIcon className="h-4 w-4" />
                </a>
              )}
              {companyInfo.socialLinks?.youtube && (
                <a
                  href={companyInfo.socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-[#FF0000] hover:text-white text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all border border-slate-200 dark:border-slate-800"
                  title="YouTube"
                >
                  <YouTubeIcon className="h-4 w-4" />
                </a>
              )}
              {companyInfo.socialLinks?.whatsapp && (
                <a
                  href={companyInfo.socialLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-[#25D366] hover:text-white text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all border border-slate-200 dark:border-slate-800"
                  title="WhatsApp"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                </a>
              )}
              {companyInfo.socialLinks?.facebook && (
                <a
                  href={companyInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-[#1877F2] hover:text-white text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all border border-slate-200 dark:border-slate-800"
                  title="Facebook"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
              )}
              {companyInfo.socialLinks?.instagram && (
                <a
                  href={companyInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-[#E4405F] hover:text-white text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all border border-slate-200 dark:border-slate-800"
                  title="Instagram"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
              )}
              {companyInfo.socialLinks?.telegram && (
                <a
                  href={companyInfo.socialLinks.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-[#229ED9] hover:text-white text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all border border-slate-200 dark:border-slate-800"
                  title="Telegram"
                >
                  <TelegramIcon className="h-4 w-4" />
                </a>
              )}
              {companyInfo.socialLinks?.tiktok && (
                <a
                  href={companyInfo.socialLinks.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-black hover:text-white text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all border border-slate-200 dark:border-slate-800"
                  title="TikTok"
                >
                  <TikTokIcon className="h-4 w-4" />
                </a>
              )}
              {/* Custom Admin Platforms */}
              {Object.entries(companyInfo.socialLinks || {})
                .filter(
                  ([k, v]) =>
                    ![
                      'linkedin',
                      'twitter',
                      'github',
                      'youtube',
                      'whatsapp',
                      'facebook',
                      'instagram',
                      'telegram',
                      'tiktok',
                    ].includes(k) && !!v
                )
                .map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 h-8 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-black hover:text-white text-slate-700 dark:text-slate-300 text-xs font-mono font-bold flex items-center gap-1 transition-all capitalize border border-slate-200 dark:border-slate-800"
                    title={platform}
                  >
                    <Share2 className="h-3 w-3" />
                    <span>{platform}</span>
                  </a>
                ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      setActiveTab('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h3 className="text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('team');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                >
                  Team &amp; Leadership
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('verify');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                >
                  Certificate Verification
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('careers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>Careers &amp; Internships</span>
                  <span className="text-[10px] font-mono bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 px-1.5 py-0.2 rounded-full font-bold">Hiring</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('blog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>Insights &amp; Engineering Blog</span>
                  <span className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.2 rounded-full">New</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500">Email:</span>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline text-slate-900 dark:text-white font-medium"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li>
                <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500">Phone:</span>
                <a
                  href={`tel:${companyInfo.phone.replace(/\s+/g, '')}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline text-slate-900 dark:text-white font-medium"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500">Head Office:</span>
                <span className="text-slate-900 dark:text-white font-semibold">{companyInfo.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Separated Legal Pages Routing */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-sm text-slate-600 dark:text-slate-400 space-y-3">
          <p>&copy; 2026 {companyInfo.legalName}. All rights reserved. Registered in Nawabshah, Sindh, Pakistan.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <button
              onClick={() => {
                setActiveTab('privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setActiveTab('cookies');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors font-medium text-slate-900 dark:text-white"
            >
              Cookie &amp; IP Data Policy
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setActiveTab('terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
            >
              Terms &amp; Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setActiveTab('security');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
            >
              Security Policy
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setActiveTab('refund');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
            >
              Refund Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
