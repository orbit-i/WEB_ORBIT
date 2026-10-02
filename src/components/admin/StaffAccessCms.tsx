import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserPlus,
  Trash2,
  KeyRound,
  Lock,
  Mail,
  User,
  Building,
  CheckCircle2,
  AlertTriangle,
  Crown,
  FileEdit,
  Sliders,
  X,
  Sparkles,
  Filter,
} from 'lucide-react';
import {
  getStoredAccounts,
  provisionStaffAccount,
  revokeStaffAccount,
  saveStoredAccounts,
  updateStaffRole,
  resetStaffPasswordByAdmin,
} from '../../services/authService';
import { dispatchSecurityAlert } from '../../services/securityAlertService';
import { AuthAccount, PortalAccessRole } from '../../types';

interface StaffAccessCmsProps {
  currentUser?: {
    name: string;
    email: string;
    role: string;
  } | null;
  showNotification: (msg: string) => void;
}

export const StaffAccessCms: React.FC<StaffAccessCmsProps> = ({
  currentUser,
  showNotification,
}) => {
  const [accounts, setAccounts] = useState<AuthAccount[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetModalAccount, setResetModalAccount] = useState<AuthAccount | null>(null);
  const [newStaffPassword, setNewStaffPassword] = useState('');

  // Setup / Edit Access Role state
  const [editRoleAccount, setEditRoleAccount] = useState<AuthAccount | null>(null);
  const [editRoleValue, setEditRoleValue] = useState<PortalAccessRole>('manager');
  const [editDeptValue, setEditDeptValue] = useState('');

  // Filter state
  const [roleFilter, setRoleFilter] = useState<'all' | 'superadmin' | 'admin' | 'manager' | 'content_writer' | 'seo_specialist'>('all');

  // Form state for new provision
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [role, setRole] = useState<PortalAccessRole>('manager');
  const [password, setPassword] = useState('OrbitTeam#2026!');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const callerRole = (currentUser?.role || 'superadmin').toLowerCase() as PortalAccessRole;
  const isSuperadmin =
    callerRole === 'superadmin' ||
    callerRole.includes('founder') ||
    callerRole.includes('ceo');

  useEffect(() => {
    refreshAccounts();
  }, []);

  const refreshAccounts = () => {
    const all = getStoredAccounts();
    // Only show corporate staff accounts (not external clients)
    setAccounts(all.filter((a) => a.portalType === 'admin'));
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Name and email are required.');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    const effectiveCallerRole = isSuperadmin ? 'superadmin' : 'admin';
    const result = provisionStaffAccount(effectiveCallerRole, {
      name,
      email,
      department,
      role,
      password,
    });

    if (result.success && result.user) {
      showNotification(`Account provisioned successfully for ${name} (${role.toUpperCase()})`);
      setIsModalOpen(false);
      setName('');
      setEmail('');
      setPassword('OrbitTeam#2026!');
      setErrorMsg(null);
      refreshAccounts();

      if (role === 'superadmin') {
        dispatchSecurityAlert({
          type: 'system_anomaly',
          severity: 'warning',
          title: 'New Superadmin Role Provisioned',
          details: `A new Superadmin account "${email}" was created by ${currentUser?.name || 'Administrator'}.`,
          sourceIp: '182.180.124.90',
        });
      }
    } else {
      setErrorMsg(result.error || 'Failed to create staff account.');
    }
  };

  const handleRevoke = (targetId: string, targetName: string) => {
    if (!confirm(`Are you sure you want to revoke and delete account for "${targetName}"?`)) {
      return;
    }

    const effectiveCallerRole = isSuperadmin ? 'superadmin' : 'admin';
    const result = revokeStaffAccount(effectiveCallerRole, targetId);

    if (result.success) {
      showNotification(`Staff access revoked for "${targetName}".`);
      refreshAccounts();
    } else {
      alert(result.error || 'Failed to revoke staff access.');
    }
  };

  const handleManualPasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalAccount) return;
    if (newStaffPassword.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    const effectiveCallerRole = isSuperadmin ? 'superadmin' : 'admin';
    const result = resetStaffPasswordByAdmin(effectiveCallerRole, resetModalAccount.id, newStaffPassword);
    if (result.success) {
      showNotification(`Password updated successfully for ${resetModalAccount.name}`);
      setResetModalAccount(null);
      setNewStaffPassword('');
      refreshAccounts();
    } else {
      alert(result.error || 'Failed to update password.');
    }
  };

  const handleUpdateRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editRoleAccount) return;

    const effectiveCallerRole = isSuperadmin ? 'superadmin' : 'admin';
    const result = updateStaffRole(effectiveCallerRole, editRoleAccount.id, editRoleValue);

    if (result.success) {
      if (editDeptValue) {
        const all = getStoredAccounts();
        const target = all.find((a) => a.id === editRoleAccount.id);
        if (target) {
          target.department = editDeptValue.trim();
          saveStoredAccounts(all);
        }
      }
      showNotification(`Access permissions updated for ${editRoleAccount.name} (${editRoleValue.toUpperCase()})`);
      setEditRoleAccount(null);
      refreshAccounts();
    } else {
      alert(result.error || 'Failed to update role.');
    }
  };

  const superadmins = accounts.filter((a) => a.role === 'superadmin');
  const admins = accounts.filter((a) => a.role === 'admin');
  const managers = accounts.filter((a) => a.role === 'manager');
  const writers = accounts.filter((a) => a.role === 'content_writer');
  const seos = accounts.filter((a) => a.role === 'seo_specialist');

  const filteredAccounts = accounts.filter((acc) => {
    if (roleFilter === 'all') return true;
    return acc.role === roleFilter;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner & Action */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Staff &amp; Access Governance
            </h2>
          </div>
          <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
            Provision dedicated accounts for Superadmins, Admins, Operations Managers, Content Writers, and SEO Specialists.
            Manage access setup, reset credentials, or revoke permissions securely.
          </p>
        </div>

        <button
          onClick={() => {
            setIsModalOpen(true);
            setErrorMsg(null);
          }}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <UserPlus className="h-4 w-4" />
          <span>Provision New Team Account</span>
        </button>
      </div>

      {/* Role Scopes Cards (5 Roles Supported) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Superadmin Card */}
        <div className="bg-white rounded-xl border border-purple-200 p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
              <Crown className="h-4 w-4 text-purple-600" />
              <span>Superadmin</span>
            </span>
            <span className="text-[10px] font-mono bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
              {superadmins.length} Active
            </span>
          </div>
          <p className="text-[11px] text-gray-600 leading-snug">
            Full root governance, lockout control, database, and staff provisioning.
          </p>
        </div>

        {/* Executive Admin Card */}
        <div className="bg-white rounded-xl border border-blue-200 p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>Executive Admin</span>
            </span>
            <span className="text-[10px] font-mono bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
              {admins.length} Active
            </span>
          </div>
          <p className="text-[11px] text-gray-600 leading-snug">
            Manages services, jobs, team, certificates, SECP profile, and inquiries.
          </p>
        </div>

        {/* Manager Card */}
        <div className="bg-white rounded-xl border border-amber-200 p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <UserCheck className="h-4 w-4 text-amber-600" />
              <span>Operations Manager</span>
            </span>
            <span className="text-[10px] font-mono bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
              {managers.length} Active
            </span>
          </div>
          <p className="text-[11px] text-gray-600 leading-snug">
            Operations management, client engagement velocity, and sprint milestones.
          </p>
        </div>

        {/* Content Writer Card */}
        <div className="bg-white rounded-xl border border-emerald-200 p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <FileEdit className="h-4 w-4 text-emerald-600" />
              <span>Content Writer</span>
            </span>
            <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              {writers.length} Active
            </span>
          </div>
          <p className="text-[11px] text-gray-600 leading-snug">
            Scoped to Article Editor, blog publishing, drafts, and media library assets.
          </p>
        </div>

        {/* SEO Specialist Card */}
        <div className="bg-white rounded-xl border border-cyan-200 p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-900 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-cyan-600" />
              <span>SEO Specialist</span>
            </span>
            <span className="text-[10px] font-mono bg-cyan-100 text-cyan-800 font-bold px-2 py-0.5 rounded-full">
              {seos.length} Active
            </span>
          </div>
          <p className="text-[11px] text-gray-600 leading-snug">
            SEO &amp; Schema metadata, focus keywords, XML sitemaps, and search audits.
          </p>
        </div>
      </div>

      {/* Staff Accounts Table Container */}
      <div className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-2xs">
        {/* Table Header with Filter Tabs */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs font-bold text-gray-800">
              Filter by Role:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setRoleFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                roleFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All ({accounts.length})
            </button>
            <button
              onClick={() => setRoleFilter('superadmin')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                roleFilter === 'superadmin'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Superadmins ({superadmins.length})
            </button>
            <button
              onClick={() => setRoleFilter('admin')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                roleFilter === 'admin'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Admins ({admins.length})
            </button>
            <button
              onClick={() => setRoleFilter('manager')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                roleFilter === 'manager'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Managers ({managers.length})
            </button>
            <button
              onClick={() => setRoleFilter('content_writer')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                roleFilter === 'content_writer'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Writers ({writers.length})
            </button>
            <button
              onClick={() => setRoleFilter('seo_specialist')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                roleFilter === 'seo_specialist'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              SEO ({seos.length})
            </button>
          </div>
        </div>

        {/* Staff Rows */}
        <div className="divide-y divide-gray-150 overflow-x-auto">
          {filteredAccounts.length === 0 ? (
            <div className="p-8 text-center text-xs text-gray-500">
              No staff accounts match the selected role filter.
            </div>
          ) : (
            filteredAccounts.map((acc) => {
              const roleBadge =
                acc.role === 'superadmin' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full border border-purple-200">
                    <Crown className="h-3 w-3" />
                    <span>Superadmin</span>
                  </span>
                ) : acc.role === 'admin' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Executive Admin</span>
                  </span>
                ) : acc.role === 'manager' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <UserCheck className="h-3 w-3" />
                    <span>Operations Manager</span>
                  </span>
                ) : acc.role === 'seo_specialist' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800 px-2.5 py-0.5 rounded-full border border-cyan-200">
                    <Sparkles className="h-3 w-3" />
                    <span>SEO Specialist</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <FileEdit className="h-3 w-3" />
                    <span>Content Writer</span>
                  </span>
                );

              const isProtectedRoot =
                acc.role === 'superadmin' && accounts.filter((a) => a.role === 'superadmin').length <= 1;

              return (
                <div
                  key={acc.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-xs text-gray-700 shrink-0">
                      {acc.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900 truncate">
                          {acc.name}
                        </span>
                        {roleBadge}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 font-mono mt-0.5">
                        <span>{acc.email}</span>
                        <span>·</span>
                        <span>Dept: {acc.department || 'Corporate'}</span>
                        {acc.isSetupRequired && (
                          <>
                            <span>·</span>
                            <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                              Setup Pending
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {/* Setup Access / Role button */}
                    <button
                      onClick={() => {
                        setEditRoleAccount(acc);
                        setEditRoleValue(acc.role);
                        setEditDeptValue(acc.department || '');
                      }}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-purple-50 text-gray-700 hover:text-purple-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors border border-gray-200"
                      title="Setup access and adjust role permissions"
                    >
                      <Sliders className="h-3.5 w-3.5 text-purple-600" />
                      <span>Setup Role / Access</span>
                    </button>

                    {/* Reset Password button */}
                    <button
                      onClick={() => {
                        setResetModalAccount(acc);
                        setNewStaffPassword('');
                      }}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors border border-gray-200"
                      title="Reset Password for this account"
                    >
                      <KeyRound className="h-3.5 w-3.5 text-blue-600" />
                      <span>Reset Password</span>
                    </button>

                    {/* Revoke button */}
                    {!isProtectedRoot && (
                      <button
                        onClick={() => handleRevoke(acc.id, acc.name)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Revoke and delete account"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Provision Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 text-gray-900 border border-gray-200 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-black rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <UserPlus className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Provision New Team Account</h3>
                <p className="text-xs text-gray-500">
                  Add staff with strictly scoped role privileges across company departments.
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateStaff} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ali Raza"
                    className="w-full pl-9 pr-3.5 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Corporate Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ali.raza@orbit-i.tech"
                    className="w-full pl-9 pr-3.5 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-blue-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. Engineering, SEO, Editorial"
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Assigned Role *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as PortalAccessRole)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-blue-600 font-bold"
                  >
                    {isSuperadmin && <option value="superadmin">Superadmin (Root Governance)</option>}
                    {isSuperadmin && <option value="admin">Executive Admin (All CMS)</option>}
                    <option value="manager">Operations Manager (Sprints &amp; Support)</option>
                    <option value="content_writer">Content Writer (Articles &amp; Media)</option>
                    <option value="seo_specialist">SEO Specialist (Search &amp; Schema)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Initial Account Password (min 8 chars) *
                </label>
                <input
                  type="text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter initial password"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-blue-600 font-mono"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  Staff member can change their password at any time from their profile menu.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Provision Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Setup / Edit Role Modal */}
      {editRoleAccount && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-gray-900 border border-gray-200 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setEditRoleAccount(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-black rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Sliders className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Setup Access &amp; Role</h3>
                <p className="text-xs text-gray-500">
                  Update role level and departmental scope for {editRoleAccount.name}.
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateRoleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Assigned Authority Role *
                </label>
                <select
                  value={editRoleValue}
                  onChange={(e) => setEditRoleValue(e.target.value as PortalAccessRole)}
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-purple-600 font-bold"
                >
                  {isSuperadmin && <option value="superadmin">Superadmin (Root Governance)</option>}
                  {isSuperadmin && <option value="admin">Executive Admin (All CMS)</option>}
                  <option value="manager">Operations Manager (Sprints &amp; Operations)</option>
                  <option value="content_writer">Content Writer (Articles &amp; Media)</option>
                  <option value="seo_specialist">SEO Specialist (Search &amp; Schema)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={editDeptValue}
                  onChange={(e) => setEditDeptValue(e.target.value)}
                  placeholder="e.g. Operations, Marketing, SEO"
                  className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-purple-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditRoleAccount(null)}
                  className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold"
                >
                  Save Access Setup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Password Reset Modal */}
      {resetModalAccount && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-gray-900 border border-gray-200 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setResetModalAccount(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-black rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <KeyRound className="h-5 w-5 text-blue-600" />
              <h3 className="text-sm font-bold text-gray-900">Reset Staff Password</h3>
            </div>
            <p className="text-xs text-gray-600 mb-4">
              Enter a new password for <strong>{resetModalAccount.name}</strong> ({resetModalAccount.email}):
            </p>

            <form onSubmit={handleManualPasswordReset} className="space-y-3">
              <input
                type="text"
                required
                value={newStaffPassword}
                onChange={(e) => setNewStaffPassword(e.target.value)}
                placeholder="Enter new password (min 8 chars)"
                className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl outline-none focus:border-blue-600 font-mono"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setResetModalAccount(null)}
                  className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
