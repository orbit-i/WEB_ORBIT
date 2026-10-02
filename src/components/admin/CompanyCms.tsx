import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { CompanyInfo } from '../../types';
import { ImageUploader } from './ImageUploader';
import {
  Building2,
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Share2,
  CheckCircle,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface CompanyCmsProps {
  showNotification: (msg: string) => void;
}

export const CompanyCms: React.FC<CompanyCmsProps> = ({ showNotification }) => {
  const { companyInfo, updateCompanyInfo } = useCms();
  const [form, setForm] = useState<CompanyInfo>(companyInfo);

  // Custom Social Platform state for adding extra links
  const [customPlatformName, setCustomPlatformName] = useState('');
  const [customPlatformUrl, setCustomPlatformUrl] = useState('');

  const handleAddCustomSocial = () => {
    if (!customPlatformName.trim() || !customPlatformUrl.trim()) {
      showNotification('Both platform name and URL are required.');
      return;
    }
    const cleanKey = customPlatformName.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
    setForm({
      ...form,
      socialLinks: {
        ...form.socialLinks,
        [cleanKey]: customPlatformUrl.trim(),
      },
    });
    setCustomPlatformName('');
    setCustomPlatformUrl('');
    showNotification(`Added custom social platform: ${customPlatformName}`);
  };

  const handleRemoveSocial = (key: string) => {
    const updated = { ...form.socialLinks };
    delete updated[key];
    setForm({
      ...form,
      socialLinks: updated,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateCompanyInfo(form);
    showNotification('Corporate profile and contact details updated and synced to database.');
  };

  // Known predefined social keys to exclude from the custom links repeater
  const standardSocialKeys = [
    'linkedin',
    'twitter',
    'github',
    'youtube',
    'discord',
    'telegram',
    'medium',
    'whatsapp',
    'facebook',
    'instagram',
    'tiktok',
  ];

  const customSocialEntries = Object.entries(form.socialLinks || {}).filter(
    ([key]) => !standardSocialKeys.includes(key) && form.socialLinks[key]
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-gray-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-mono rounded-full mb-2">
          <Building2 className="h-3.5 w-3.5 text-blue-400" />
          <span>CORPORATE IDENTITY · SECP REGISTERED</span>
        </div>
        <h2 className="text-2xl font-bold text-black tracking-tight">
          Company Profile &amp; SECP Information
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Maintain verified corporate information, branding assets, headquarters coordinates, and social media channels.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {/* Company Branding & Logo Upload */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-black border-b border-gray-100 pb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#2f6fed]" />
            <span>Corporate Branding &amp; Visual Identity</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploader
              label="Official Company Logo"
              value={form.logoUrl || '/orbit-circular-logo.png'}
              onChange={(url) => setForm({ ...form, logoUrl: url })}
              aspectRatio="square"
              helperText="Upload official company emblem or brand icon (PNG/SVG)"
              presets={[
                { label: 'Orbit Circular Logo', url: '/orbit-circular-logo.png' },
                { label: 'Orbit Dark Brand', url: '/orbit-logo-dark.png' },
              ]}
            />

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                  Full Registered Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.legalName}
                  onChange={(e) => setForm({ ...form, legalName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                  Corporate Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Legal Registration & Leadership */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-black border-b border-gray-100 pb-3 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <span>Legal Registration &amp; Leadership</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                Founder &amp; CEO *
              </label>
              <input
                type="text"
                required
                value={form.founder}
                onChange={(e) => setForm({ ...form, founder: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-semibold focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                Registration Type
              </label>
              <input
                type="text"
                value={form.registrationType}
                onChange={(e) => setForm({ ...form, registrationType: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                Established Year
              </label>
              <input
                type="text"
                value={form.established}
                onChange={(e) => setForm({ ...form, established: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-mono focus:border-black focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
              Company Executive Summary
            </label>
            <textarea
              rows={3}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
            />
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-black border-b border-gray-100 pb-3 flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            <span>Contact &amp; Physical Headquarters</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                Official Email *
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                Official Phone / WhatsApp *
              </label>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                Headquarters Location *
              </label>
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                Primary Website URL
              </label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Comprehensive Official Social Links */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-black flex items-center gap-2">
              <Share2 className="h-5 w-5 text-purple-600" />
              <span>Official Social Channels &amp; Developer Links</span>
            </h3>
            <span className="text-xs font-mono text-gray-500">
              {Object.keys(form.socialLinks || {}).length} configured
            </span>
          </div>

          <p className="text-xs text-gray-600">
            Configure direct links to your corporate social profiles. Leave empty any platforms you do not wish to display.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* LinkedIn */}
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                LinkedIn Company URL
              </label>
              <input
                type="url"
                placeholder="https://www.linkedin.com/company/orbit-i-private-limited/"
                value={form.socialLinks?.linkedin || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, linkedin: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none"
              />
            </div>

            {/* Twitter / X */}
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                Twitter / X Profile URL
              </label>
              <input
                type="url"
                placeholder="https://x.com/orbit_i_tech"
                value={form.socialLinks?.twitter || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, twitter: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none"
              />
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                GitHub Organization URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/orbit-i-ltd"
                value={form.socialLinks?.github || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, github: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none"
              />
            </div>

            {/* YouTube */}
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                YouTube Channel URL
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/@orbit-i-tech"
                value={form.socialLinks?.youtube || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, youtube: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none"
              />
            </div>

            {/* Discord */}
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                Discord Community Invite URL
              </label>
              <input
                type="url"
                placeholder="https://discord.gg/orbit-i"
                value={form.socialLinks?.discord || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, discord: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none"
              />
            </div>

            {/* Telegram */}
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                Telegram Channel / Group URL
              </label>
              <input
                type="url"
                placeholder="https://t.me/orbit_i_announcements"
                value={form.socialLinks?.telegram || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, telegram: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none"
              />
            </div>

            {/* Medium */}
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                Medium / Tech Publication URL
              </label>
              <input
                type="url"
                placeholder="https://medium.com/@orbit-i"
                value={form.socialLinks?.medium || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, medium: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                WhatsApp Channel URL
              </label>
              <input
                type="url"
                placeholder="https://whatsapp.com/channel/..."
                value={form.socialLinks?.whatsapp || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, whatsapp: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none"
              />
            </div>

            {/* Facebook */}
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                Facebook Page URL
              </label>
              <input
                type="url"
                placeholder="https://facebook.com/orbit-i-tech"
                value={form.socialLinks?.facebook || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, facebook: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none"
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                Instagram Profile URL
              </label>
              <input
                type="url"
                placeholder="https://instagram.com/orbit_i_official"
                value={form.socialLinks?.instagram || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    socialLinks: { ...form.socialLinks, instagram: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none"
              />
            </div>
          </div>

          {/* Dynamic Custom Social Platforms Repeater */}
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-700">
              Custom Social Links ({customSocialEntries.length})
            </h4>

            {customSocialEntries.map(([key, url]) => (
              <div
                key={key}
                className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <span className="font-bold text-gray-900 capitalize block">{key}</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline truncate block font-mono text-[11px]"
                  >
                    {url}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSocial(key)}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                  title="Remove Link"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            {/* Add Custom Social Box */}
            <div className="p-4 bg-gray-50/70 border border-dashed border-gray-300 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-gray-800 block">
                + Add Another Platform (e.g. Threads, Substack, Behance, TikTok)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Platform Name (e.g. Threads or Substack)"
                  value={customPlatformName}
                  onChange={(e) => setCustomPlatformName(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-xl text-xs focus:border-[#2f6fed] focus:outline-none bg-white"
                />
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="URL (https://...)"
                    value={customPlatformUrl}
                    onChange={(e) => setCustomPlatformUrl(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-xs focus:border-[#2f6fed] focus:outline-none bg-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSocial}
                    className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#2f6fed] text-white hover:bg-blue-600 rounded-2xl text-base font-semibold flex items-center gap-2.5 shadow-md transition-colors"
          >
            <Save className="h-5 w-5" />
            <span>Save Company Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
