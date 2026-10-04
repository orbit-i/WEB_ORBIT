import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';
import { PartnerAlliance, TrustBadgeItem, PartnersSectionSettings } from '../../types';
import { DEFAULT_PARTNERS_SETTINGS } from '../../data/orbitData';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  Search,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  Building2,
  Cloud,
  Zap,
  Globe,
  Terminal,
  Lock,
  Award,
  Sliders,
  X,
  Save,
  Eye,
  EyeOff,
  Cpu,
  Code2,
  Layers,
  Palette,
  AlertTriangle,
} from 'lucide-react';
import { renderPartnerIcon } from '../PartnersSection';

interface PartnersCmsProps {
  showNotification: (msg: string) => void;
}

export const PartnersCms: React.FC<PartnersCmsProps> = ({ showNotification }) => {
  const {
    partners,
    partnersSettings,
    addPartner,
    updatePartner,
    deletePartner,
    resetPartnersToDefault,
    updatePartnersSettings,
    resetPartnersSettingsToDefault,
  } = useCms();

  const currentSettings: PartnersSectionSettings = partnersSettings || DEFAULT_PARTNERS_SETTINGS;

  // Active Tab within CMS: 'partners' | 'settings' | 'badges'
  const [activeSubTab, setActiveSubTab] = useState<'partners' | 'settings' | 'badges'>('partners');

  // Section Settings Form State
  const [settingsEnabled, setSettingsEnabled] = useState(currentSettings.isEnabled !== false);
  const [settingsBadge, setSettingsBadge] = useState(currentSettings.badgeText || '');
  const [settingsTitle, setSettingsTitle] = useState(currentSettings.title || '');
  const [settingsSubtitle, setSettingsSubtitle] = useState(currentSettings.subtitle || '');
  const [settingsShowBadges, setSettingsShowBadges] = useState(currentSettings.showTrustBadges !== false);

  // Sync with currentSettings when it changes
  useEffect(() => {
    if (partnersSettings) {
      setSettingsEnabled(partnersSettings.isEnabled !== false);
      setSettingsBadge(partnersSettings.badgeText || '');
      setSettingsTitle(partnersSettings.title || '');
      setSettingsSubtitle(partnersSettings.subtitle || '');
      setSettingsShowBadges(partnersSettings.showTrustBadges !== false);
    }
  }, [partnersSettings]);

  // Partners Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Partner Add/Edit Modal
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<PartnerAlliance | null>(null);

  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formBadge, setFormBadge] = useState('Cloud Platform');
  const [formIconType, setFormIconType] = useState('aws');
  const [formLogoUrl, setFormLogoUrl] = useState('');
  const [formWebsiteUrl, setFormWebsiteUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formDisplayOrder, setFormDisplayOrder] = useState<number>(1);
  const [formIsActive, setFormIsActive] = useState<boolean>(true);

  // Trust Badge Add/Edit Modal
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState<TrustBadgeItem | null>(null);
  const [badgeFormLabel, setBadgeFormLabel] = useState('');
  const [badgeFormColor, setBadgeFormColor] = useState('emerald');
  const [badgeFormIsActive, setBadgeFormIsActive] = useState(true);

  const categories = [
    'All',
    'Cloud Platform',
    'Frontend',
    'Backend Engine',
    'DevOps',
    'Edge & Security',
    'AI & Compute',
    'Open Standards',
  ];

  const colorOptions = [
    { value: 'emerald', label: 'Emerald (Success/Secure)', class: 'bg-emerald-500' },
    { value: 'blue', label: 'Blue (Cloud/Tech)', class: 'bg-blue-500' },
    { value: 'purple', label: 'Purple (Engineering/Uptime)', class: 'bg-purple-500' },
    { value: 'indigo', label: 'Indigo (Enterprise/Architecture)', class: 'bg-indigo-500' },
    { value: 'amber', label: 'Amber (Performance)', class: 'bg-amber-500' },
    { value: 'cyan', label: 'Cyan (Modern Reactive)', class: 'bg-cyan-500' },
    { value: 'rose', label: 'Rose (Critical/Special)', class: 'bg-rose-500' },
    { value: 'slate', label: 'Slate (Standard/Neutral)', class: 'bg-slate-400' },
  ];

  // ==========================================
  // Section Settings Handlers
  // ==========================================
  const handleSaveSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await updatePartnersSettings({
      isEnabled: settingsEnabled,
      badgeText: settingsBadge.trim(),
      title: settingsTitle.trim(),
      subtitle: settingsSubtitle.trim(),
      showTrustBadges: settingsShowBadges,
    });
    showNotification('Section settings updated successfully.');
  };

  const handleResetSettings = () => {
    if (confirm('Reset section title, badge, and settings to verified defaults?')) {
      resetPartnersSettingsToDefault();
      showNotification('Section settings reset to defaults.');
    }
  };

  // ==========================================
  // Trust Badges Handlers
  // ==========================================
  const handleOpenAddBadge = () => {
    setEditingBadge(null);
    setBadgeFormLabel('');
    setBadgeFormColor('emerald');
    setBadgeFormIsActive(true);
    setIsBadgeModalOpen(true);
  };

  const handleOpenEditBadge = (badge: TrustBadgeItem) => {
    setEditingBadge(badge);
    setBadgeFormLabel(badge.label);
    setBadgeFormColor(badge.color || 'emerald');
    setBadgeFormIsActive(badge.isActive !== false);
    setIsBadgeModalOpen(true);
  };

  const handleSaveBadge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!badgeFormLabel.trim()) {
      showNotification('Badge label cannot be empty.');
      return;
    }

    const currentBadges = [...(currentSettings.trustBadges || [])];

    if (editingBadge) {
      const updated = currentBadges.map((b) =>
        b.id === editingBadge.id
          ? {
              ...b,
              label: badgeFormLabel.trim(),
              color: badgeFormColor,
              isActive: badgeFormIsActive,
            }
          : b
      );
      await updatePartnersSettings({ trustBadges: updated });
      showNotification(`Updated credential badge: ${badgeFormLabel.trim()}`);
    } else {
      const newBadge: TrustBadgeItem = {
        id: `tb-${Date.now()}`,
        label: badgeFormLabel.trim(),
        color: badgeFormColor,
        isActive: badgeFormIsActive,
      };
      await updatePartnersSettings({ trustBadges: [...currentBadges, newBadge] });
      showNotification(`Added credential badge: ${badgeFormLabel.trim()}`);
    }

    setIsBadgeModalOpen(false);
  };

  const handleDeleteBadge = async (id: string, label: string) => {
    if (confirm(`Are you sure you want to remove the badge "${label}"?`)) {
      const updated = (currentSettings.trustBadges || []).filter((b) => b.id !== id);
      await updatePartnersSettings({ trustBadges: updated });
      showNotification(`Removed badge: ${label}`);
    }
  };

  const handleToggleBadge = async (id: string) => {
    const updated = (currentSettings.trustBadges || []).map((b) =>
      b.id === id ? { ...b, isActive: b.isActive === false ? true : false } : b
    );
    await updatePartnersSettings({ trustBadges: updated });
  };

  // ==========================================
  // Partner Add/Edit Handlers
  // ==========================================
  const handleOpenAddPartner = () => {
    setEditingPartner(null);
    setFormName('');
    setFormCategory('');
    setFormBadge('Cloud Platform');
    setFormIconType('aws');
    setFormLogoUrl('');
    setFormWebsiteUrl('');
    setFormDescription('');
    setFormDisplayOrder(partners.length + 1);
    setFormIsActive(true);
    setIsPartnerModalOpen(true);
  };

  const handleOpenEditPartner = (p: PartnerAlliance) => {
    setEditingPartner(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormBadge(p.badge || 'Cloud Platform');
    setFormIconType(p.iconType || 'aws');
    setFormLogoUrl(p.logoUrl || '');
    setFormWebsiteUrl(p.websiteUrl || '');
    setFormDescription(p.description || '');
    setFormDisplayOrder(p.displayOrder || 1);
    setFormIsActive(p.isActive !== false);
    setIsPartnerModalOpen(true);
  };

  const handleSavePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCategory.trim()) {
      showNotification('Partner name and category are required.');
      return;
    }

    if (editingPartner) {
      await updatePartner(editingPartner.id, {
        name: formName.trim(),
        category: formCategory.trim(),
        badge: formBadge.trim(),
        iconType: formIconType,
        logoUrl: formLogoUrl.trim() || undefined,
        websiteUrl: formWebsiteUrl.trim() || undefined,
        description: formDescription.trim() || undefined,
        displayOrder: formDisplayOrder,
        isActive: formIsActive,
      });
      showNotification(`Updated: ${formName.trim()}`);
    } else {
      const newPartner: PartnerAlliance = {
        id: `partner-${Date.now()}`,
        name: formName.trim(),
        category: formCategory.trim(),
        badge: formBadge.trim(),
        iconType: formIconType,
        logoUrl: formLogoUrl.trim() || undefined,
        websiteUrl: formWebsiteUrl.trim() || undefined,
        description: formDescription.trim() || undefined,
        displayOrder: formDisplayOrder,
        isActive: formIsActive,
      };
      await addPartner(newPartner);
      showNotification(`Added new partner: ${formName.trim()}`);
    }

    setIsPartnerModalOpen(false);
  };

  const handleDeletePartner = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}"?`)) {
      await deletePartner(id);
      showNotification(`Removed: ${name}`);
    }
  };

  const handleTogglePartnerActive = async (partner: PartnerAlliance) => {
    const nextState = partner.isActive === false ? true : false;
    await updatePartner(partner.id, { isActive: nextState });
    showNotification(`${partner.name} is now ${nextState ? 'live' : 'hidden'}.`);
  };

  const handleClearAllPartners = async () => {
    if (
      confirm(
        'Are you sure you want to remove all partners? You can add fresh ones anytime or reset to clean defaults.'
      )
    ) {
      for (const p of [...partners]) {
        await deletePartner(p.id);
      }
      showNotification('All partners cleared.');
    }
  };

  const handleResetPartnersDefaults = () => {
    if (confirm('Reset to verified clean modern technology platforms defaults?')) {
      resetPartnersToDefault();
      showNotification('Reset to clean technology partner defaults.');
    }
  };

  // Filtered partners list
  const filteredPartners = (partners || [])
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.badge && p.badge.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory =
        selectedCategory === 'All' ||
        (p.badge && p.badge.toLowerCase() === selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));

  const totalPartners = (partners || []).length;
  const activePartnersCount = (partners || []).filter((p) => p.isActive !== false).length;
  const activeBadgesCount = (currentSettings.trustBadges || []).filter((b) => b.isActive !== false).length;

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-full text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>CONTROL &amp; MANAGEMENT PORTAL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Partners &amp; Technology Alliances CMS
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
              Full control over the walking partner marquee and technical credential badges. Easily show or hide the section, customize titles, add genuine technology partners, or manage security badges.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleResetPartnersDefaults}
              className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 text-xs font-bold font-mono transition-colors flex items-center gap-1.5"
              title="Reset partners to clean tech stack defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Tech Defaults</span>
            </button>

            <button
              onClick={handleOpenAddPartner}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Partner / Tech</span>
            </button>
          </div>
        </div>

        {/* Sub-Tab Navigation Strip */}
        <div className="mt-6 pt-5 border-t border-gray-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveSubTab('partners')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'partners'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Marquee Partners ({totalPartners})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('settings')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'settings'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Section Settings</span>
              {!settingsEnabled && (
                <span className="w-2 h-2 rounded-full bg-amber-500" title="Section currently disabled" />
              )}
            </button>

            <button
              onClick={() => setActiveSubTab('badges')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'badges'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Trust Badges Strip ({(currentSettings.trustBadges || []).length})</span>
            </button>
          </div>

          {/* Quick Visibility Pill */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-gray-500">Public Section:</span>
            <span
              className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${
                settingsEnabled
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${settingsEnabled ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              {settingsEnabled ? 'VISIBLE ON HOMEPAGE' : 'HIDDEN / DISABLED'}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="text-[10px] font-mono uppercase text-gray-500 font-bold mb-1">
            Total Partners
          </div>
          <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {totalPartners}
          </div>
          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
            Managed in List
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="text-[10px] font-mono uppercase text-gray-500 font-bold mb-1">
            Active in Marquee
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {activePartnersCount}
          </div>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
            Walking Live
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="text-[10px] font-mono uppercase text-gray-500 font-bold mb-1">
            Trust Badges
          </div>
          <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {activeBadgesCount}
          </div>
          <span className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
            Active in Footer Strip
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="text-[10px] font-mono uppercase text-gray-500 font-bold mb-1">
            Section Status
          </div>
          <div className={`text-2xl font-extrabold ${settingsEnabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
            {settingsEnabled ? 'Active' : 'Disabled'}
          </div>
          <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
            Homepage Rendering
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: MARQUEE PARTNERS LIST */}
      {/* ========================================================================= */}
      {activeSubTab === 'partners' && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search partner by name, tag, or category..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
              {totalPartners > 0 && (
                <button
                  onClick={handleClearAllPartners}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Remove all partners"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className={`bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between group ${
                  partner.isActive !== false
                    ? 'border-gray-200 dark:border-slate-800 hover:border-blue-500'
                    : 'border-dashed border-gray-300 dark:border-slate-700 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center p-2 text-blue-600 dark:text-blue-400 shrink-0">
                        {renderPartnerIcon(partner)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {partner.name}
                        </h3>
                        <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 block">
                          Order: #{partner.displayOrder || 1} · {partner.iconType || 'icon'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {partner.badge && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          {partner.badge}
                        </span>
                      )}
                      <button
                        onClick={() => handleTogglePartnerActive(partner)}
                        className={`p-1 rounded-md transition-colors ${
                          partner.isActive !== false
                            ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                            : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                        }`}
                        title={partner.isActive !== false ? 'Active (Click to Hide)' : 'Hidden (Click to Show)'}
                      >
                        {partner.isActive !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs font-mono text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                    {partner.category}
                  </p>

                  {partner.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3">
                      {partner.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                  {partner.websiteUrl ? (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400 font-mono">No Link</span>
                  )}

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditPartner(partner)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-colors"
                      title="Edit Partner"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePartner(partner.id, partner.name)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 transition-colors"
                      title="Delete Partner"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPartners.length === 0 && (
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-12 text-center text-gray-500">
              <ShieldCheck className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                No Partners Configured
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto mb-4">
                Click &ldquo;Add Partner / Tech&rdquo; to add your genuine stack items, or click &ldquo;Reset Tech Defaults&rdquo;.
              </p>
              <button
                onClick={handleOpenAddPartner}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add First Partner</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: SECTION GENERAL SETTINGS */}
      {/* ========================================================================= */}
      {activeSubTab === 'settings' && (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800 mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Partners Section Display Settings
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Control the visibility, heading, badge pill, and descriptive text of the section on the home page.
              </p>
            </div>
            <button
              onClick={handleResetSettings}
              className="px-3.5 py-1.5 rounded-xl border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
            {/* Master Visibility Switch */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-gray-900 dark:text-white block">
                  Show Partners Section on Homepage
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  When turned OFF, the entire section will be hidden from the website immediately.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settingsEnabled}
                  onChange={(e) => setSettingsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Pill Badge Text */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Badge Pill Text (Leave blank to hide badge)
              </label>
              <input
                type="text"
                value={settingsBadge}
                onChange={(e) => setSettingsBadge(e.target.value)}
                placeholder="e.g. TECHNOLOGY STACK & STRATEGIC ALLIANCES"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
              />
              <span className="text-[11px] text-gray-400 mt-1 block">
                Preview: {settingsBadge ? `[ ${settingsBadge} ]` : '(Pill will be hidden)'}
              </span>
            </div>

            {/* Main Section Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Section Heading Title *
              </label>
              <input
                type="text"
                required
                value={settingsTitle}
                onChange={(e) => setSettingsTitle(e.target.value)}
                placeholder="e.g. Technology Ecosystem & Platform Alliances"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 font-bold"
              />
            </div>

            {/* Section Subtitle */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Section Subtitle / Description
              </label>
              <textarea
                rows={3}
                value={settingsSubtitle}
                onChange={(e) => setSettingsSubtitle(e.target.value)}
                placeholder="Enter description explaining your technology stack and partnerships..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 resize-none leading-relaxed"
              />
            </div>

            {/* Trust Badges Strip Toggle */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-gray-900 dark:text-white block">
                  Show Trust Badges Footer Strip
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Displays the status dot badges (e.g., 256-Bit TLS Secured, 99.9% Uptime) beneath the marquee.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settingsShowBadges}
                  onChange={(e) => setSettingsShowBadges(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Section Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: TRUST BADGES STRIP (FOOTER CREDENTIALS) */}
      {/* ========================================================================= */}
      {activeSubTab === 'badges' && (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Technical &amp; Credential Trust Badges
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage the badges displayed at the bottom of the section. Add custom verified badges with custom status colors.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenAddBadge}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Trust Badge</span>
              </button>
            </div>
          </div>

          {/* Toggle for entire strip */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              Trust Badges Strip Visibility:
            </span>
            <button
              onClick={async () => {
                const nextState = !currentSettings.showTrustBadges;
                await updatePartnersSettings({ showTrustBadges: nextState });
                showNotification(`Trust badges strip ${nextState ? 'enabled' : 'disabled'}.`);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                currentSettings.showTrustBadges !== false
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {currentSettings.showTrustBadges !== false ? 'Enabled on Site' : 'Disabled'}
            </button>
          </div>

          {/* Badges List */}
          <div className="space-y-3">
            {(currentSettings.trustBadges || []).map((badge) => {
              const colorObj = colorOptions.find((c) => c.value === badge.color) || colorOptions[0];
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    badge.isActive !== false
                      ? 'bg-white dark:bg-slate-850 border-gray-200 dark:border-slate-800'
                      : 'bg-gray-50 dark:bg-slate-900 border-dashed border-gray-300 dark:border-slate-700 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${colorObj.class} shadow-xs shrink-0`} />
                    <div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                        {badge.label}
                      </span>
                      <span className="text-[10px] text-gray-500 block">
                        Dot Color: {colorObj.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleBadge(badge.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                        badge.isActive !== false
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {badge.isActive !== false ? 'Live' : 'Hidden'}
                    </button>

                    <button
                      onClick={() => handleOpenEditBadge(badge)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-colors"
                      title="Edit Badge"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteBadge(badge.id, badge.label)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 transition-colors"
                      title="Delete Badge"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {(currentSettings.trustBadges || []).length === 0 && (
              <div className="p-8 text-center border border-dashed border-gray-300 dark:border-slate-800 rounded-xl text-gray-400">
                <p className="text-xs mb-2">No trust badges configured.</p>
                <button
                  onClick={handleOpenAddBadge}
                  className="px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add First Badge</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT PARTNER */}
      {/* ========================================================================= */}
      {isPartnerModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800 mb-5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {editingPartner ? 'Update Partner / Technology' : 'Add Partner / Technology'}
                </h3>
              </div>
              <button
                onClick={() => setIsPartnerModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePartner} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Name / Title *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. AWS Cloud Architecture, React, Docker"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Category / Subtitle *
                </label>
                <input
                  type="text"
                  required
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  placeholder="e.g. Cloud Infrastructure & EC2, Modern Frontend"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Badge Pill Tag
                  </label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="e.g. Cloud Platform, DevOps, Frontend"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Icon Preset
                  </label>
                  <select
                    value={formIconType}
                    onChange={(e) => setFormIconType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="aws">AWS Cloud</option>
                    <option value="google-cloud">Google Cloud</option>
                    <option value="microsoft">Microsoft Azure</option>
                    <option value="cloudflare">Cloudflare</option>
                    <option value="docker">Docker</option>
                    <option value="react">React</option>
                    <option value="nodejs">Node.js</option>
                    <option value="linux">Linux Ecosystem</option>
                    <option value="code">Code / Development</option>
                    <option value="cloud">Cloud General</option>
                    <option value="cpu">CPU / Systems</option>
                    <option value="shield">Security Shield</option>
                    <option value="lock">Lock / Encryption</option>
                    <option value="globe">Global Web</option>
                    <option value="zap">High Performance</option>
                    <option value="award">Award / Certified</option>
                    <option value="building">Enterprise Building</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Custom Logo Image URL (Optional - overrides preset icon)
                </label>
                <input
                  type="url"
                  value={formLogoUrl}
                  onChange={(e) => setFormLogoUrl(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Official Website Link URL (Optional)
                </label>
                <input
                  type="url"
                  value={formWebsiteUrl}
                  onChange={(e) => setFormWebsiteUrl(e.target.value)}
                  placeholder="https://aws.amazon.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Brief description of the partnership or architecture standard..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formDisplayOrder}
                    onChange={(e) => setFormDisplayOrder(parseInt(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={formIsActive}
                      onChange={(e) => setFormIsActive(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span>Active on Public Site</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  {editingPartner ? 'Update Partner' : 'Add Partner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT TRUST BADGE */}
      {/* ========================================================================= */}
      {isBadgeModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {editingBadge ? 'Edit Trust Badge' : 'Add Trust Badge'}
              </h3>
              <button
                onClick={() => setIsBadgeModalOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBadge} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Badge Label *
                </label>
                <input
                  type="text"
                  required
                  value={badgeFormLabel}
                  onChange={(e) => setBadgeFormLabel(e.target.value)}
                  placeholder="e.g. 256-Bit TLS Secured, 99.9% Uptime"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Status Dot Color
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {colorOptions.map((c) => (
                    <button
                      type="button"
                      key={c.value}
                      onClick={() => setBadgeFormColor(c.value)}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                        badgeFormColor === c.value
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 shadow-2xs'
                          : 'border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${c.class}`} />
                      <span>{c.value}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={badgeFormIsActive}
                    onChange={(e) => setBadgeFormIsActive(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>Active in Footer Strip</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBadgeModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  {editingBadge ? 'Save Changes' : 'Add Badge'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
