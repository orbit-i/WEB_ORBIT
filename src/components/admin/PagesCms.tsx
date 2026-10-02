import React, { useState } from 'react';
import {
  Layout,
  FileText,
  Save,
  RotateCcw,
  Sparkles,
  Search,
  ExternalLink,
  CheckCircle2,
  Info,
  Layers,
  PhoneCall,
  Briefcase,
  BookOpen,
  Home,
  Sliders,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { PageContentItem } from '../../types';

interface PagesCmsProps {
  showNotification: (msg: string) => void;
}

export const PagesCms: React.FC<PagesCmsProps> = ({ showNotification }) => {
  const { pageContents, updatePageContent, resetPageContentsToDefault } = useCms();
  const [selectedPageKey, setSelectedPageKey] = useState<string>('home');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const currentPage = pageContents[selectedPageKey] || {
    id: `page-${selectedPageKey}`,
    pageKey: selectedPageKey as any,
    title: `${selectedPageKey.toUpperCase()} Page`,
    badge: 'ORBIT-I Verified',
    headline: '',
    subheadline: '',
    description: '',
    primaryCtaText: '',
    secondaryCtaText: '',
    metaTitle: '',
    metaDescription: '',
    customFields: {},
  };

  const [formData, setFormData] = useState<PageContentItem>(currentPage);

  const handleSelectPage = (pageKey: string) => {
    setSelectedPageKey(pageKey);
    const target = pageContents[pageKey] || {
      id: `page-${pageKey}`,
      pageKey: pageKey as any,
      title: `${pageKey.charAt(0).toUpperCase() + pageKey.slice(1)} Page`,
      badge: 'ORBIT-I Enterprise',
      headline: '',
      subheadline: '',
      description: '',
      primaryCtaText: '',
      secondaryCtaText: '',
      metaTitle: '',
      metaDescription: '',
      customFields: {},
    };
    setFormData(target);
    setHasUnsavedChanges(false);
  };

  const handleFieldChange = (field: keyof PageContentItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasUnsavedChanges(true);
  };

  const handleCustomFieldChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      customFields: {
        ...(prev.customFields || {}),
        [key]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    updatePageContent(selectedPageKey, formData);
    setHasUnsavedChanges(false);
    showNotification(`Successfully updated live content for ${formData.title}!`);
  };

  const handleReset = () => {
    if (confirm(`Reset ${formData.title} to official default company content?`)) {
      resetPageContentsToDefault();
      setHasUnsavedChanges(false);
      showNotification('Page contents reset to official system defaults.');
    }
  };

  const pageNavOptions = [
    { key: 'home', label: 'Home Page', icon: Home, desc: 'Hero headline, mission badges, CTAs' },
    { key: 'about', label: 'About Page', icon: Info, desc: 'Governance, SECP profile, leadership bio' },
    { key: 'services', label: 'Services Page', icon: Layers, desc: 'Offerings overview, tech stack highlights' },
    { key: 'contact', label: 'Contact Page', icon: PhoneCall, desc: 'Direct phone, email, WhatsApp, address' },
    { key: 'careers', label: 'Careers Page', icon: Briefcase, desc: 'Hiring headline, university cohorts' },
    { key: 'blogs', label: 'Blogs Page', icon: BookOpen, desc: 'Architecture briefings, insights banner' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs tracking-wider uppercase mb-1">
            <Sliders className="w-4 h-4" />
            No-Code Content Management System
          </div>
          <h2 className="text-xl font-bold text-gray-900">Live Website Content & SEO Editor</h2>
          <p className="text-xs text-gray-500 mt-1">
            Edit text, headlines, descriptions, CTAs, and SEO metadata on every public page without writing code.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasUnsavedChanges && (
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 animate-pulse">
              Unsaved Changes
            </span>
          )}
          <button
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
            title="Reset to official corporate defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            Publish Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Page Selector Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2 mb-3">
              Select Public Page
            </h3>
            <div className="space-y-1.5">
              {pageNavOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedPageKey === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectPage(opt.key)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-blue-50/80 text-blue-900 border border-blue-200/80 shadow-xs'
                        : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mt-0.5 ${
                        isSelected ? 'bg-blue-600 text-white shadow-xs' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold truncate">{opt.label}</span>
                        {isSelected && (
                          <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            Editing
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Preview Box */}
          <div className="bg-gradient-to-br from-gray-900 to-slate-900 text-white rounded-2xl p-5 shadow-sm border border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
                Live Public Preview
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                /{selectedPageKey === 'home' ? '' : selectedPageKey}
              </span>
            </div>
            <div className="space-y-2">
              {formData.badge && (
                <span className="inline-block text-[10px] font-semibold bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-400/30">
                  {formData.badge}
                </span>
              )}
              <h4 className="text-base font-bold text-white line-clamp-2">
                {formData.headline || 'No headline set'}
              </h4>
              <p className="text-xs text-gray-300 line-clamp-3">
                {formData.subheadline || formData.description || 'No description preview available.'}
              </p>
              <div className="pt-2 flex items-center gap-2">
                {formData.primaryCtaText && (
                  <span className="text-[11px] bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold">
                    {formData.primaryCtaText}
                  </span>
                )}
                {formData.secondaryCtaText && (
                  <span className="text-[11px] bg-white/10 text-gray-300 px-3 py-1 rounded-lg">
                    {formData.secondaryCtaText}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form Panel */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Editing: {formData.title || selectedPageKey}
              </h3>
              <p className="text-xs text-gray-500">
                Updates are automatically applied to the live route and persist across visits.
              </p>
            </div>
            <a
              href={`#${selectedPageKey}`}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
            >
              View Route <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-4">
            {/* Pill / Badge */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Header Badge / Category Pill
              </label>
              <input
                type="text"
                value={formData.badge || ''}
                onChange={(e) => handleFieldChange('badge', e.target.value)}
                placeholder="e.g. SECP Incorporated & Registered"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Main Headline */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Main Headline (H1 / Section Title) *
              </label>
              <input
                type="text"
                value={formData.headline || ''}
                onChange={(e) => handleFieldChange('headline', e.target.value)}
                placeholder="e.g. Enterprise Software Engineering & Cloud Solutions"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Subheadline */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Subheadline / Lead Paragraph
              </label>
              <textarea
                rows={2}
                value={formData.subheadline || ''}
                onChange={(e) => handleFieldChange('subheadline', e.target.value)}
                placeholder="Brief summary displayed prominently beneath the headline."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Detailed Body Content / Mission Statement
              </label>
              <textarea
                rows={4}
                value={formData.description || ''}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                placeholder="In-depth explanation of this section's core message or process."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Primary Action Button Text
                </label>
                <input
                  type="text"
                  value={formData.primaryCtaText || ''}
                  onChange={(e) => handleFieldChange('primaryCtaText', e.target.value)}
                  placeholder="e.g. Request Discovery"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Secondary Action Button Text
                </label>
                <input
                  type="text"
                  value={formData.secondaryCtaText || ''}
                  onChange={(e) => handleFieldChange('secondaryCtaText', e.target.value)}
                  placeholder="e.g. Read Case Studies"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* SEO Specifics for this Page */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Page-Specific SEO Settings
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Meta Title (Browser Title & Search Result Title)
                  </label>
                  <input
                    type="text"
                    value={formData.metaTitle || ''}
                    onChange={(e) => handleFieldChange('metaTitle', e.target.value)}
                    placeholder="e.g. Services | ORBIT-I Software Engineering"
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Meta Description (Search Snippet)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.metaDescription || ''}
                    onChange={(e) => handleFieldChange('metaDescription', e.target.value)}
                    placeholder="Descriptive 150-160 character snippet for Google search ranking."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Contact Page Custom Fields */}
            {selectedPageKey === 'contact' && (
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                  Live Contact Channels (Instant Update)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Direct Email</label>
                    <input
                      type="email"
                      value={formData.customFields?.directEmail || 'contactus@orbit-i.tech'}
                      onChange={(e) => handleCustomFieldChange('directEmail', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Direct Phone</label>
                    <input
                      type="text"
                      value={formData.customFields?.directPhone || '+92 3190375751'}
                      onChange={(e) => handleCustomFieldChange('directPhone', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Direct WhatsApp</label>
                    <input
                      type="text"
                      value={formData.customFields?.directWhatsApp || '+92 3190375751'}
                      onChange={(e) => handleCustomFieldChange('directWhatsApp', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Corporate Headquarters</label>
                    <input
                      type="text"
                      value={formData.customFields?.headquartersAddress || 'Nawabshah, Sindh, Pakistan'}
                      onChange={(e) => handleCustomFieldChange('headquartersAddress', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 flex justify-end gap-3">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Publish Live Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
