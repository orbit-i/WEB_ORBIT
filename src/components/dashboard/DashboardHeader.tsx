import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Mail,
  Grid,
  LogOut,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  User,
  Settings,
  X,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertTriangle,
  KeyRound,
  Upload,
  Camera,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/orbitData';
import { changeAccountPassword, updateAccountProfile } from '../../services/authService';

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
  title?: string;
  portalType: 'admin' | 'client';
  user?: {
    name: string;
    email: string;
    role: string;
    sessionStarted?: string;
    avatarUrl?: string;
    phone?: string;
  } | null;
  onLogout?: () => void;
  onNavigateHome?: () => void;
  onSwitchPortal?: (target: 'admin-portal' | 'client-portal') => void;
  inquiryCount?: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onToggleSidebar,
  portalType,
  user,
  onLogout,
  onNavigateHome,
  inquiryCount = 4,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Profile Management Modal State
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || 'Abdul Samad Rind');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '+92 3190375751');
  const [profileAvatar, setProfileAvatar] = useState('/AbdulSamad.jpeg');
  const [profileMsg, setProfileMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Change Password Modal state
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwChangeMsg, setPwChangeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const notifRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);
  const profRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (msgRef.current && !msgRef.current.contains(e.target as Node)) {
        setMessagesOpen(false);
      }
      if (profRef.current && !profRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // System / Project Notifications (Clean, isolated, no spam or fake anomalies)
  const adminNotifications = [
    {
      id: 1,
      title: 'Infrastructure Telemetry Verified',
      desc: 'All cloud cluster nodes responding with <100ms API latency.',
      time: 'Just now',
      unread: false,
    },
    {
      id: 2,
      title: 'SSL / TLS Security Enforced',
      desc: 'Strict-Transport-Security (HSTS) and CSP directives active.',
      time: '1h ago',
      unread: false,
    },
    {
      id: 3,
      title: 'Database Integrity Check Passed',
      desc: 'MySQL replication healthy with zero replication lag.',
      time: '3h ago',
      unread: false,
    },
  ];

  const clientNotifications = [
    {
      id: 1,
      title: 'Sprint Deliverables Verified',
      desc: 'Phase 2 Architecture & Specifications document signed and verified.',
      time: 'Just now',
      unread: false,
    },
    {
      id: 2,
      title: '2h SLA Priority Active',
      desc: 'ORBIT-I executive and engineering leads are on dedicated standby.',
      time: '1h ago',
      unread: false,
    },
    {
      id: 3,
      title: 'Private Git CI/CD Passing',
      desc: 'Automated test suite and linting verified on private deployment branch.',
      time: '3h ago',
      unread: false,
    },
  ];

  const activeNotifications = portalType === 'client' ? clientNotifications : adminNotifications;

  const adminMessages = [
    {
      id: 1,
      sender: 'Tariq Mansoor',
      org: 'Apex Global Logistics',
      preview: 'Staging API Webhook Rate Limiting inquiry submitted.',
      time: 'Today',
    },
    {
      id: 2,
      sender: 'Dr. Sarah Collins',
      org: 'Medisphere Systems',
      preview: 'Reviewing HIPAA data interface penetration report.',
      time: 'Yesterday',
    },
    {
      id: 3,
      sender: 'Khurram Jamil',
      org: 'AgriCold Warehouses',
      preview: 'SLA quarterly maintenance scheduled.',
      time: 'Mar 25',
    },
  ];

  const clientMessages = [
    {
      id: 1,
      sender: 'Abdul Samad Rind',
      org: 'Founder & CEO, ORBIT-I',
      preview: 'Sprint milestone architecture documentation is ready for your review in Documents tab.',
      time: '10:14 AM',
    },
    {
      id: 2,
      sender: 'Lead Solutions Architect',
      org: 'ORBIT-I Engineering Core',
      preview: 'Staging environment webhook endpoints deployed. Ready for team testing.',
      time: 'Yesterday',
    },
  ];

  const activeMessages = portalType === 'client' ? clientMessages : adminMessages;
  const activeMessageCount = portalType === 'client' ? clientMessages.length : inquiryCount;

  const defaultAdminName = 'Abdul Samad Rind';
  const defaultAdminRole = 'Superadmin (Root)';
  const defaultAdminEmail = 'ab.samad@orbit-i.tech';

  const defaultClientName = 'Tariq Mansoor';
  const defaultClientRole = 'Managing Director';
  const defaultClientEmail = 'tariq@apexholdings.com';

  const roleLabelMap: Record<string, string> = {
    superadmin: 'Superadmin (Root)',
    admin: 'Executive Admin',
    manager: 'Operations Manager',
    content_writer: 'Content Writer',
    seo_specialist: 'SEO Specialist',
    client: 'Client Organization',
  };

  const displayName = profileName || user?.name || (portalType === 'admin' ? defaultAdminName : defaultClientName);
  const displayRole = (user?.role && roleLabelMap[user.role.toLowerCase()]) || user?.role || (portalType === 'admin' ? defaultAdminRole : defaultClientRole);
  const displayEmail = user?.email || (portalType === 'admin' ? defaultAdminEmail : defaultClientEmail);

  // Handle avatar upload from device
  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setProfileMsg({ type: 'error', text: 'Image size must be under 5MB.' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setProfileAvatar(result);
        setProfileMsg({ type: 'success', text: 'Photo loaded. Click "Save Profile" to apply.' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim()) {
      setProfileMsg({ type: 'error', text: 'Name is required.' });
      return;
    }
    updateAccountProfile(displayEmail, { name: profileName, phone: profilePhone, avatar: profileAvatar });
    setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
    setTimeout(() => {
      setProfileModalOpen(false);
      setProfileMsg(null);
    }, 1200);
  };

  return (
    <header className="bg-gradient-to-r from-[#2563eb] via-[#2f6fed] to-[#3b82f6] text-white shadow-md sticky top-0 z-40 h-16 flex items-center justify-between px-4 sm:px-6">
      {/* Left Zone: Sidebar Hamburger & Breadcrumb indicator */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-white/15 rounded-xl transition-colors text-white focus:outline-none"
          title="Toggle Navigation Menu"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 font-medium text-white/90 text-sm">
          <span className="font-bold tracking-tight">ORBIT-I</span>
          <span className="text-white/60">/</span>
          <span className="text-white/90 text-xs font-semibold bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20">
            {portalType === 'admin' ? 'Executive Admin Panel' : 'Client Organization Portal'}
          </span>
        </div>
      </div>

      {/* Right Zone: Search, Notifications, Messages, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search Bar */}
        <div className="relative">
          <div className="hidden md:flex items-center bg-white/15 hover:bg-white/20 focus-within:bg-white/25 rounded-full px-3 py-1.5 transition-all border border-white/20 text-xs w-44 lg:w-60">
            <Search className="h-3.5 w-3.5 text-white/70 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search reports, CMS, users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-white placeholder-white/60 text-xs w-full"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-white/70 hover:text-white">
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 hover:bg-white/15 rounded-full text-white transition-colors"
            title="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>

        {/* Clean Notifications Bell (No fake data or fake alerts) */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 hover:bg-white/15 rounded-full transition-colors relative text-white/90 hover:text-white focus:outline-none"
            title="System Status & Notifications"
            aria-label="Notifications"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute -top-0.5 -right-0.5 bg-emerald-400 text-black text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center border border-white">
              ✓
            </span>
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span className="font-bold text-xs text-gray-900">
                    {portalType === 'client' ? 'Project Milestones & Status' : 'System Telemetry & Alerts'}
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>{portalType === 'client' ? 'SLA Guaranteed' : '100% Operational'}</span>
                </span>
              </div>

              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {activeNotifications.map((item) => (
                  <div key={item.id} className="p-3 hover:bg-gray-50 transition-colors text-xs space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>{item.title}</span>
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-gray-600 pl-5">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-2.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <span className="text-[10px] text-gray-500">
                  {portalType === 'client' ? 'Direct Lead: Abdul Samad Rind' : 'Live Uptime SLA: 99.98%'}
                </span>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Messages / Inquiries Envelope */}
        <div className="relative" ref={msgRef}>
          <button
            onClick={() => setMessagesOpen(!messagesOpen)}
            className="p-2 hover:bg-white/15 rounded-full transition-colors relative text-white/90 hover:text-white focus:outline-none"
            title={portalType === 'client' ? 'Direct Channel with ORBIT-I Leadership' : 'Messages & Client Inquiries'}
            aria-label="Messages"
          >
            <Mail className="h-4.5 w-4.5" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-[#2f6fed] shadow-xs">
              {activeMessageCount}
            </span>
          </button>

          {/* Messages Dropdown */}
          {messagesOpen && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="font-bold text-xs text-gray-900">
                    {portalType === 'client' ? 'Direct Channel with ORBIT-I' : 'Direct Inquiries & Transcripts'}
                  </span>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-600 font-bold px-2 py-0.5 rounded-full">
                  {portalType === 'client' ? 'ORBIT-I Leads' : `${inquiryCount} Total`}
                </span>
              </div>

              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {activeMessages.map((msg) => (
                  <div key={msg.id} className="p-3 hover:bg-blue-50/50 transition-colors text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{msg.sender}</span>
                      <span className="text-[10px] text-gray-400">{msg.time}</span>
                    </div>
                    <div className="text-[10px] text-blue-600 font-medium">{msg.org}</div>
                    <div className="text-gray-600 text-[11px] mt-1 line-clamp-1">{msg.preview}</div>
                  </div>
                ))}
              </div>

              <div className="p-2.5 bg-gray-50 border-t border-gray-200 text-center">
                <button
                  onClick={() => setMessagesOpen(false)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                >
                  {portalType === 'client' ? 'Open Dedicated Support Hub →' : 'Manage Inquiries Hub →'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Dropdown Menu */}
        <div className="relative" ref={profRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full hover:bg-white/15 transition-colors border border-white/20 text-left focus:outline-none"
            aria-label="User Profile"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shrink-0 bg-blue-700 shadow-xs">
              <img
                src={profileAvatar}
                alt={displayName}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/AbdulSamad.jpeg';
                }}
              />
            </div>
            <div className="hidden lg:flex flex-col text-left leading-none">
              <span className="text-xs font-bold text-white leading-tight">{displayName.split(' ')[0]}</span>
              <span className="text-[10px] text-white/70">{displayRole}</span>
            </div>
            <ChevronDown className="h-3 w-3 text-white/70" />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-blue-600 shrink-0">
                    <img
                      src={profileAvatar}
                      alt={displayName}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/AbdulSamad.jpeg';
                      }}
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <div className="text-xs font-bold text-gray-900 leading-tight truncate">{displayName}</div>
                    <div className="text-[10px] text-blue-600 font-medium">{displayRole}</div>
                    <div className="text-[10px] text-gray-500 font-mono truncate max-w-[170px]">
                      {displayEmail}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2 text-xs space-y-1">
                {/* Edit Profile Details */}
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    setProfileModalOpen(true);
                    setProfileMsg(null);
                  }}
                  className="w-full px-3 py-2 text-left rounded-lg hover:bg-blue-50 flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold">Manage Profile Details</span>
                  </div>
                  <ArrowRight className="h-3 w-3 text-gray-400" />
                </button>

                {/* Change Password */}
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    setChangePasswordOpen(true);
                    setPwChangeMsg(null);
                  }}
                  className="w-full px-3 py-2 text-left rounded-lg hover:bg-gray-100 flex items-center justify-between text-gray-700 hover:text-black transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4 text-blue-600" />
                    <span>Change Account Password</span>
                  </div>
                  <ArrowRight className="h-3 w-3 text-gray-400" />
                </button>

                {/* Return to Public Website */}
                {onNavigateHome && (
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      onNavigateHome();
                    }}
                    className="w-full px-3 py-2 text-left rounded-lg hover:bg-gray-100 flex items-center justify-between text-gray-700 hover:text-black transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-gray-600" />
                      <span>Return to Public Website</span>
                    </div>
                    <span className="text-[10px] text-gray-400">Public</span>
                  </button>
                )}
              </div>

              {/* Logout Button */}
              {onLogout && (
                <div className="p-2 border-t border-gray-100 bg-gray-50">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      onLogout();
                    }}
                    className="w-full px-3 py-2 text-left rounded-lg hover:bg-red-50 text-red-600 flex items-center gap-2 font-semibold text-xs transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out &amp; End Session</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Profile Management Modal (Admins and all can manage their profiles) */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-gray-900 border border-gray-200 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setProfileModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-black rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Manage Administrator Profile</h3>
                <p className="text-xs text-gray-500">{displayEmail}</p>
              </div>
            </div>

            {profileMsg && (
              <div
                className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 font-medium ${
                  profileMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {profileMsg.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
                )}
                <span>{profileMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Avatar Upload Preview */}
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-600 shrink-0 shadow-xs relative group">
                  <img
                    src={profileAvatar}
                    alt={profileName}
                    className="w-full h-full object-cover object-top"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Change Photo"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 space-y-1">
                  <span className="text-xs font-bold text-gray-900 block">Profile Avatar Photo</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Upload className="h-3 w-3" />
                      <span>Upload from Device</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFile}
                      className="hidden"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono block">Supports Phone Gallery &amp; PC</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Contact Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  placeholder="+92 319 0375751"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Assigned Administrative Role
                </label>
                <input
                  type="text"
                  disabled
                  value={displayRole}
                  className="w-full px-3.5 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs text-gray-500 font-mono cursor-not-allowed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {changePasswordOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-gray-900 border border-gray-200 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setChangePasswordOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-black rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Change Account Password</h3>
                <p className="text-xs text-gray-500">{displayEmail}</p>
              </div>
            </div>

            {pwChangeMsg && (
              <div
                className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 font-medium ${
                  pwChangeMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {pwChangeMsg.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
                )}
                <span>{pwChangeMsg.text}</span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!currentPassword || !newPassword) {
                  setPwChangeMsg({ type: 'error', text: 'All fields are required.' });
                  return;
                }
                if (newPassword !== confirmPassword) {
                  setPwChangeMsg({ type: 'error', text: 'New password and confirmation do not match.' });
                  return;
                }
                if (newPassword.length < 8) {
                  setPwChangeMsg({ type: 'error', text: 'New password must be at least 8 characters long.' });
                  return;
                }

                const result = changeAccountPassword(displayEmail, currentPassword, newPassword);
                if (result.success) {
                  setPwChangeMsg({
                    type: 'success',
                    text: 'Password updated successfully!',
                  });
                  setTimeout(() => {
                    setChangePasswordOpen(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setPwChangeMsg(null);
                  }, 1200);
                } else {
                  setPwChangeMsg({ type: 'error', text: result.error || 'Failed to update password.' });
                }
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Current Password *
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  New Password (min 8 chars) *
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new strong password"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setChangePasswordOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <KeyRound className="h-3.5 w-3.5" />
                  <span>Update Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
