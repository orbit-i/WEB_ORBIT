import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { MaintenanceSettings, NotFoundPageSettings } from '../../types';
import { MaintenanceScreen } from '../MaintenanceScreen';
import { NotFoundPage } from '../NotFoundPage';
import { ForbiddenPage } from '../ForbiddenPage';
import {
  Sliders,
  AlertTriangle,
  Compass,
  Save,
  Eye,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  Plus,
  Trash2,
  RotateCcw,
  ShieldAlert,
  Search,
} from 'lucide-react';

interface OperationsCmsProps {
  showNotification: (msg: string) => void;
  setActiveTab: (tab: string) => void;
}

export const OperationsCms: React.FC<OperationsCmsProps> = ({ showNotification, setActiveTab }) => {
  const {
    maintenanceSettings,
    updateMaintenanceSettings,
    notFoundSettings,
    updateNotFoundSettings,
  } = useCms();

  const [maintForm, setMaintForm] = useState<MaintenanceSettings>(maintenanceSettings);
  const [notFoundForm, setNotFoundForm] = useState<NotFoundPageSettings>(notFoundSettings);

  // Suggested links inputs
  const [newLinkLabel, setNewLinkLabel] = useState('');
  const [newLinkTab, setNewLinkTab] = useState('home');

  // Preview overlay state
  const [previewActive, setPreviewActive] = useState<'none' | 'maintenance' | '404' | '403'>('none');

  // Save Maintenance Settings
  const handleSaveMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    updateMaintenanceSettings(maintForm);
    showNotification(
      maintForm.enabled
        ? 'MAINTENANCE MODE ACTIVATED across public web routes.'
        : 'Maintenance Mode deactivated. Public site is LIVE and accessible.'
    );
  };

  // Toggle Maintenance directly
  const handleToggleMaintenance = () => {
    const nextState = !maintForm.enabled;
    const updated = { ...maintForm, enabled: nextState };
    setMaintForm(updated);
    updateMaintenanceSettings(updated);
    showNotification(
      nextState
        ? 'MAINTENANCE MODE ACTIVATED across public routes.'
        : 'Site restored to normal public operations.'
    );
  };

  // Save 404 Settings
  const handleSaveNotFound = (e: React.FormEvent) => {
    e.preventDefault();
    updateNotFoundSettings(notFoundForm);
    showNotification('404 Not Found error page parameters updated & live!');
  };

  // Add Suggested Link to 404 page
  const handleAddLink = () => {
    if (!newLinkLabel.trim()) return;
    setNotFoundForm({
      ...notFoundForm,
      suggestedLinks: [
        ...(notFoundForm.suggestedLinks || []),
        { label: newLinkLabel.trim(), tab: newLinkTab },
      ],
    });
    setNewLinkLabel('');
  };

  const handleRemoveLink = (idx: number) => {
    setNotFoundForm({
      ...notFoundForm,
      suggestedLinks: notFoundForm.suggestedLinks.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-10">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h3 className="text-xl font-bold text-black flex items-center gap-2">
            <Sliders className="h-5 w-5 text-black" />
            <span>Site Operations: Maintenance Mode &amp; 404 Error Pages</span>
          </h3>
          <p className="text-xs text-gray-600 mt-0.5">
            Full administrative control over scheduled maintenance downtime, emergency contacts, admin bypass, and 404 Not Found error experiences.
          </p>
        </div>

        {/* Global Live Status Badge */}
        <div className="flex items-center gap-3">
          <div
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-2 border ${
              maintenanceSettings.enabled
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                maintenanceSettings.enabled ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'
              }`}
            ></span>
            <span>
              {maintenanceSettings.enabled ? 'MAINTENANCE MODE: ACTIVE' : 'SYSTEM STATUS: 100% OPERATIONAL'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ========================================================================= */}
        {/* CARD 1: MAINTENANCE MODE CONTROLLER                                      */}
        {/* ========================================================================= */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <AlertTriangle
                  className={`h-5 w-5 ${maintForm.enabled ? 'text-amber-500' : 'text-gray-400'}`}
                />
                <h4 className="text-base font-bold text-black">Maintenance Mode Controller</h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewActive('maintenance')}
                  className="px-3 py-1.5 bg-white border border-gray-300 hover:border-black rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1 transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview Screen</span>
                </button>
              </div>
            </div>

            {/* Quick Toggle Switch */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-black block">Maintenance Gate Status</span>
                <p className="text-[11px] text-gray-500">
                  When enabled, all public visitor traffic is intercepted and redirected to the Maintenance Screen.
                </p>
              </div>

              <button
                type="button"
                onClick={handleToggleMaintenance}
                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  maintForm.enabled ? 'bg-amber-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    maintForm.enabled ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <form onSubmit={handleSaveMaintenance} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Maintenance Headline / Title
                </label>
                <input
                  type="text"
                  value={maintForm.title}
                  onChange={(e) => setMaintForm({ ...maintForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-black focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Downtime Explanation / Public Message
                </label>
                <textarea
                  rows={3}
                  value={maintForm.message}
                  onChange={(e) => setMaintForm({ ...maintForm, message: e.target.value })}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black leading-relaxed"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Estimated Completion Time
                  </label>
                  <input
                    type="text"
                    value={maintForm.estimatedEnd}
                    onChange={(e) => setMaintForm({ ...maintForm, estimatedEnd: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-black"
                    placeholder="e.g. Sep 30, 2026 at 18:00 PKT"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Emergency Hotline
                  </label>
                  <input
                    type="text"
                    value={maintForm.emergencyContactPhone}
                    onChange={(e) =>
                      setMaintForm({ ...maintForm, emergencyContactPhone: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Emergency Support Email
                </label>
                <input
                  type="email"
                  value={maintForm.emergencyContactEmail}
                  onChange={(e) =>
                    setMaintForm({ ...maintForm, emergencyContactEmail: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="adminBypassCheckbox"
                  checked={maintForm.allowAdminBypass}
                  onChange={(e) => setMaintForm({ ...maintForm, allowAdminBypass: e.target.checked })}
                  className="rounded border-gray-300 text-black focus:ring-black h-4 w-4"
                />
                <label htmlFor="adminBypassCheckbox" className="text-xs text-gray-700 font-medium cursor-pointer">
                  Allow Administrative Bypass (Shows direct portal link for staff on maintenance screen)
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-black text-white hover:bg-neutral-800 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Maintenance Configuration</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: 404 NOT FOUND ERROR PAGE CONTROLLER                              */}
        {/* ========================================================================= */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Compass className="h-5 w-5 text-black" />
                <h4 className="text-base font-bold text-black">404 Error Page Experience</h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewActive('404')}
                  className="px-3 py-1.5 bg-white border border-gray-300 hover:border-black rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1 transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview 404</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveNotFound} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Error Page Title</label>
                  <input
                    type="text"
                    value={notFoundForm.title}
                    onChange={(e) => setNotFoundForm({ ...notFoundForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs font-bold text-black focus:outline-none focus:border-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    System Diagnostic Code
                  </label>
                  <input
                    type="text"
                    value={notFoundForm.errorCode}
                    onChange={(e) =>
                      setNotFoundForm({ ...notFoundForm, errorCode: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-black"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Visitor Explanation Message
                </label>
                <textarea
                  rows={3}
                  value={notFoundForm.message}
                  onChange={(e) => setNotFoundForm({ ...notFoundForm, message: e.target.value })}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black leading-relaxed"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Support Action Button Text
                  </label>
                  <input
                    type="text"
                    value={notFoundForm.supportButtonText}
                    onChange={(e) =>
                      setNotFoundForm({ ...notFoundForm, supportButtonText: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-xs text-black focus:outline-none focus:border-black"
                    required
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notFoundForm.showSearch}
                      onChange={(e) =>
                        setNotFoundForm({ ...notFoundForm, showSearch: e.target.checked })
                      }
                      className="rounded border-gray-300 text-black focus:ring-black h-4 w-4"
                    />
                    <span>Show Interactive Services Search Bar</span>
                  </label>
                </div>
              </div>

              {/* Suggested Quick Links on 404 */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <label className="block text-xs font-bold text-gray-800">
                  Quick Navigation Links on 404 ({notFoundForm.suggestedLinks?.length || 0})
                </label>

                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {(notFoundForm.suggestedLinks || []).map((link, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-lg text-xs"
                    >
                      <div className="flex items-center gap-2 font-mono">
                        <span className="font-semibold text-black">{link.label}</span>
                        <span className="text-[10px] text-gray-400">#{link.tab}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(idx)}
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Link Label (e.g. AI Services)..."
                    value={newLinkLabel}
                    onChange={(e) => setNewLinkLabel(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs"
                  />
                  <select
                    value={newLinkTab}
                    onChange={(e) => setNewLinkTab(e.target.value)}
                    className="px-2 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-mono"
                  >
                    <option value="home">home</option>
                    <option value="services">services (AI)</option>
                    <option value="about">about</option>
                    <option value="verify">verify</option>
                    <option value="contact">contact</option>
                    <option value="client-portal">client-portal</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="px-3 py-1.5 bg-gray-200 hover:bg-black hover:text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-black text-white hover:bg-neutral-800 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save 404 Page Configuration</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 3: 403 FORBIDDEN ACCESS SECURITY SCREEN                             */}
        {/* ========================================================================= */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between lg:col-span-2">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-red-600" />
                <h4 className="text-base font-bold text-black">403 Forbidden Access Security Experience</h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewActive('403')}
                  className="px-3.5 py-1.5 bg-white border border-gray-300 hover:border-black rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1 transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview 403 Screen</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-gray-200 rounded-2xl space-y-1">
                <span className="text-[11px] font-mono text-gray-500 uppercase font-bold block">
                  Enforcement Policy
                </span>
                <span className="text-xs font-bold text-black block">
                  Strict Role-Based Multi-Factor Authentication Gate
                </span>
                <p className="text-[11px] text-gray-500">
                  Unauthenticated visitors attempting to access /admin-portal or administrative partitions are intercepted and served this 403 screen.
                </p>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-2xl space-y-1">
                <span className="text-[11px] font-mono text-gray-500 uppercase font-bold block">
                  Active Security Safeguards
                </span>
                <span className="text-xs font-bold text-emerald-600 block">
                  3-Attempt Cooldown Lockout + Full IP Telemetry Logging
                </span>
                <p className="text-[11px] text-gray-500">
                  Suspicious bursts trigger 60-second client lockout and automated IP firewall logging.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN PREVIEW MODAL */}
      {previewActive !== 'none' && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
          {previewActive === 'maintenance' && (
            <MaintenanceScreen
              isPreview={true}
              onExitPreview={() => setPreviewActive('none')}
              onBypass={() => setPreviewActive('none')}
            />
          )}

          {previewActive === '404' && (
            <NotFoundPage
              isPreview={true}
              onExitPreview={() => setPreviewActive('none')}
              setActiveTab={(tab) => {
                setPreviewActive('none');
                setActiveTab(tab);
              }}
              requestedRoute="/invalid-test-url"
            />
          )}

          {previewActive === '403' && (
            <ForbiddenPage
              isPreview={true}
              onExitPreview={() => setPreviewActive('none')}
              setActiveTab={(tab) => {
                setPreviewActive('none');
                setActiveTab(tab);
              }}
              requestedRoute="/admin-portal"
            />
          )}
        </div>
      )}
    </div>
  );
};
