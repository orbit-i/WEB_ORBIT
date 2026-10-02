import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Mail,
  Youtube,
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
  ShieldAlert,
  Zap,
  Trash2,
  KeyRound,
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/orbitData';
import {
  getSecurityAlerts,
  triggerSimulatedSecurityAudit,
  clearSecurityAlerts,
  COMPANY_ADMIN_RECIPIENTS,
} from '../../services/securityAlertService';
import { changeAccountPassword } from '../../services/authService';
import { SecurityAlert } from '../../types';

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
  title?: string;
  portalType: 'admin' | 'client';
  user?: {
    name: string;
    email: string;
    role: string;
    sessionStarted?: string;
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
  inquiryCount = 12,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [toastAlert, setToastAlert] = useState<SecurityAlert | null>(null);

  // Change Password Modal state
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwChangeMsg, setPwChangeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const notifRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);
  const profRef = useRef<HTMLDivElement>(null);

  // Sync security alerts from storage and listen to live dispatch events
  useEffect(() => {
    setSecurityAlerts(getSecurityAlerts());

    const handleAlert = (e: Event) => {
      const customEvent = e as CustomEvent<SecurityAlert>;
      setSecurityAlerts(getSecurityAlerts());
      if (customEvent.detail) {
        setToastAlert(customEvent.detail);
        setTimeout(() => setToastAlert(null), 8000);
      }
    };

    const handleClear = () => {
      setSecurityAlerts([]);
      setToastAlert(null);
    };

    window.addEventListener('orbit_security_alert', handleAlert);
    window.addEventListener('orbit_security_alert_cleared', handleClear);

    return () => {
      window.removeEventListener('orbit_security_alert', handleAlert);
      window.removeEventListener('orbit_security_alert_cleared', handleClear);
    };
  }, []);

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

  const notifications = [
    {
      id: 1,
      title: 'New Client Enterprise Inquiry',
      desc: 'Medisphere Systems requested a HIPAA cloud architectural consultation.',
      time: '12m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Production Backup Completed',
      desc: 'Enterprise Linux Cloud MySQL snapshot SHA-256 verified.',
      time: '45m ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Sprint 6 Signed Off',
      desc: 'Apex Global Logistics signed off milestone deliverable.',
      time: '2h ago',
      unread: true,
    },
    {
      id: 4,
      title: 'Certificate Verified Online',
      desc: 'Credential ORBIT-I/INT/2026/01 successfully validated.',
      time: '5h ago',
      unread: true,
    },
  ];

  const recentMessages = [
    {
      id: 1,
      sender: 'Tariq Mansoor',
      org: 'Apex Global Logistics',
      preview: 'Please check the staging API rate limit webhook configuration.',
      time: '10:14 AM',
    },
    {
      id: 2,
      sender: 'Dr. Sarah Collins',
      org: 'Medisphere Systems',
      preview: 'Reviewing the HIPAA data interface security audit report.',
      time: 'Yesterday',
    },
    {
      id: 3,
      sender: 'Khurram Jamil',
      org: 'CloudRail Infrastructure',
      preview: 'Confirmed SLA monitoring window for the upcoming quarter.',
      time: 'Mar 30',
    },
  ];

  const defaultAdminName = 'Administrator';
  const defaultAdminRole = 'Executive Administrator';
  const defaultAdminEmail = 'admin@orbit-i.tech';

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

  const displayName = user?.name || (portalType === 'admin' ? defaultAdminName : defaultClientName);
  const displayRole = (user?.role && roleLabelMap[user.role.toLowerCase()]) || user?.role || (portalType === 'admin' ? defaultAdminRole : defaultClientRole);
  const displayEmail = user?.email || (portalType === 'admin' ? defaultAdminEmail : defaultClientEmail);

  return (
    <header className="bg-gradient-to-r from-[#2563eb] via-[#2f6fed] to-[#3b82f6] text-white shadow-md sticky top-0 z-40 h-16 flex items-center justify-between px-4 sm:px-6">
      {/* Left Zone: Sidebar Hamburger & Breadcrumb indicator */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-white/15 rounded-lg transition-colors text-white focus:outline-none focus:ring-2 focus:ring-white/40"
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

      {/* Right Zone: Search, Avatar, Video, Notifications, Messages, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search Bar / Toggle */}
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

          {/* Mobile search input dropdown */}
          {searchOpen && (
            <div className="md:hidden absolute right-0 top-12 w-64 bg-white text-gray-800 rounded-xl shadow-2xl p-2 border border-gray-200 z-50 animate-in fade-in">
              <input
                type="text"
                autoFocus
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-blue-600"
              />
            </div>
          )}
        </div>

        {/* Video / System Status Action */}
        <div className="relative">
          <button
            onClick={() => alert('Infrastructure Health: Production Cloud Server 99.98% uptime, 0 errors in telemetry buffer.')}
            className="p-2 hover:bg-white/15 rounded-full transition-colors relative text-white/90 hover:text-white"
            title="System Live Stream & Telemetry"
          >
            <Youtube className="h-4.5 w-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
          </button>
        </div>

        {/* Notification Bell with Dynamic Counter & Security Pulse */}
        <div className="relative" ref={notifRef}>
          {(() => {
            const unreadSec = securityAlerts.filter((a) => !a.resolved);
            const hasCritical = unreadSec.some((a) => a.severity === 'critical' || a.severity === 'high');
            const totalCount = notifications.length + unreadSec.length;

            return (
              <>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 hover:bg-white/15 rounded-full transition-colors relative text-white/90 hover:text-white focus:outline-none"
                  title={`Notifications & Security Alerts (${totalCount} total)`}
                  aria-label="Notifications"
                >
                  <Bell className="h-4.5 w-4.5" />
                  {hasCritical ? (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 text-white text-[9px] font-black items-center justify-center border border-white">
                        {totalCount}
                      </span>
                    </span>
                  ) : (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-[#2f6fed] shadow-xs">
                      {totalCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Drawer */}
                {notificationsOpen && (
                  <div className="absolute right-0 sm:right-0 mt-3 w-84 sm:w-[420px] bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-3.5 bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-blue-600" />
                        <span className="font-bold text-xs text-gray-900">Notifications &amp; Activity</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {unreadSec.length > 0 && (
                          <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full border border-red-200 flex items-center gap-1">
                            <ShieldAlert className="h-3 w-3 text-red-600" />
                            {unreadSec.length} Sec Alert{unreadSec.length > 1 ? 's' : ''}
                          </span>
                        )}
                        <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                          {totalCount} Total
                        </span>
                      </div>
                    </div>

                    {/* Interactive Security Test & Broadcast Trigger Bar */}
                    <div className="p-2.5 bg-amber-50/70 border-b border-amber-200/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-amber-900 font-medium text-[11px]">
                        <ShieldCheck className="h-3.5 w-3.5 text-amber-700 shrink-0" />
                        <span>Admin Security Anomaly Sentinel</span>
                      </div>
                      <button
                        onClick={() => {
                          triggerSimulatedSecurityAudit();
                        }}
                        className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-[10px] font-bold flex items-center gap-1 shadow-2xs transition-colors"
                        title="Simulate security probe and broadcast alert to all admins"
                      >
                        <Zap className="h-3 w-3" />
                        <span>Test Audit Alert</span>
                      </button>
                    </div>

                    <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                      {/* Priority Security Alerts Section */}
                      {securityAlerts.length > 0 && (
                        <div className="bg-red-50/30 p-2 space-y-2 border-b border-red-150">
                          <div className="flex items-center justify-between px-1 pt-1 text-[10px] font-bold text-red-800 uppercase tracking-wider">
                            <div className="flex items-center gap-1">
                              <ShieldAlert className="h-3.5 w-3.5 text-red-600" />
                              <span>Live Security Anomalies ({securityAlerts.length})</span>
                            </div>
                            <button
                              onClick={clearSecurityAlerts}
                              className="text-gray-400 hover:text-red-700 text-[10px] flex items-center gap-0.5"
                              title="Clear all recorded security alerts"
                            >
                              <Trash2 className="h-2.5 w-2.5" />
                              <span>Clear</span>
                            </button>
                          </div>

                          {securityAlerts.slice(0, 5).map((sec) => (
                            <div
                              key={sec.id}
                              className="p-2.5 bg-white rounded-xl border border-red-200 text-xs shadow-2xs space-y-1.5"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-red-900 flex items-center gap-1">
                                  <AlertTriangle className="h-3.5 w-3.5 text-red-600 shrink-0" />
                                  {sec.title}
                                </span>
                                <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-red-100 text-red-800 font-bold">
                                  {sec.severity}
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-700 leading-snug">{sec.details}</p>
                              <div className="pt-1 border-t border-gray-100 flex flex-col gap-0.5 text-[10px] text-gray-500 font-mono">
                                <div className="flex items-center justify-between">
                                  <span>Time: {sec.timestamp}</span>
                                  {sec.sourceIp && <span>IP: {sec.sourceIp}</span>}
                                </div>
                                <div className="text-[9px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-150 flex items-center gap-1">
                                  <Mail className="h-3 w-3 text-blue-600 shrink-0" />
                                  <span>Dispatched to: {COMPANY_ADMIN_RECIPIENTS.map((a) => a.email).join(', ')}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Standard System Notifications */}
                      {notifications.map((item) => (
                        <div key={item.id} className="p-3 hover:bg-blue-50/50 transition-colors text-xs">
                          <div className="flex items-start justify-between gap-2">
                            <div className="font-semibold text-gray-900">{item.title}</div>
                            <span className="text-[10px] text-gray-400 shrink-0">{item.time}</span>
                          </div>
                          <div className="text-gray-600 text-[11px] mt-0.5 leading-snug">{item.desc}</div>
                        </div>
                      ))}
                    </div>

                    <div className="p-2.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-[10px] text-gray-500">
                        Admin SMS/Email alerts enabled for {COMPANY_ADMIN_RECIPIENTS.length} officers
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
              </>
            );
          })()}
        </div>

        {/* Messages / Inquiries Envelope with Red Badge '12' */}
        <div className="relative" ref={msgRef}>
          <button
            onClick={() => setMessagesOpen(!messagesOpen)}
            className="p-2 hover:bg-white/15 rounded-full transition-colors relative text-white/90 hover:text-white focus:outline-none"
            title="Messages & Inquiries (12 new)"
            aria-label="Messages"
          >
            <Mail className="h-4.5 w-4.5" />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-[#2f6fed] shadow-xs">
              {inquiryCount > 99 ? '99+' : inquiryCount}
            </span>
          </button>

          {/* Messages Dropdown Drawer */}
          {messagesOpen && (
            <div className="absolute right-0 sm:right-0 mt-3 w-80 sm:w-96 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="font-bold text-xs text-gray-900">Direct Inquiries &amp; Transcripts</span>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-600 font-bold px-2 py-0.5 rounded-full">
                  {inquiryCount} Total
                </span>
              </div>

              <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
                {recentMessages.map((msg) => (
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
                  View all in Inquiries CMS
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Circular Avatar / Profile Dropdown Button */}
        <div className="relative" ref={profRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full hover:bg-white/15 transition-colors border border-white/20 text-left focus:outline-none"
            aria-label="User Profile"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shrink-0 bg-blue-700 shadow-xs">
              <img
                src="/AbdulSamad.jpeg"
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

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-3 w-72 bg-white text-gray-800 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-blue-600 shrink-0">
                    <img
                      src="/AbdulSamad.jpeg"
                      alt={displayName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-gray-900 leading-tight">{displayName}</div>
                    <div className="text-[10px] text-blue-600 font-medium">{displayRole}</div>
                    <div className="text-[10px] text-gray-500 font-mono truncate max-w-[170px]">
                      {displayEmail}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2 text-xs space-y-1">
                {/* Change Password Button */}
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
                      <span>Return to Orbit-iX Website</span>
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

      {/* Floating Urgent Security Alert Toast Banner */}
      {toastAlert && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 max-w-md bg-white text-gray-900 border-2 border-red-500 rounded-2xl shadow-2xl p-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0 border border-red-200">
              <ShieldAlert className="h-6 w-6 text-red-600 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black uppercase text-red-600 tracking-wide flex items-center gap-1">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Security Incident Dispatched</span>
                </span>
                <button
                  onClick={() => setToastAlert(null)}
                  className="text-gray-400 hover:text-black p-0.5 rounded"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <h4 className="text-sm font-bold text-gray-900 mt-0.5">{toastAlert.title}</h4>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{toastAlert.details}</p>
              <div className="mt-2.5 pt-2 border-t border-gray-150 text-[10px] font-mono space-y-1">
                <div className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                  <span>Dispatched via SMS &amp; Email to all administrators</span>
                </div>
                <div className="text-gray-500 truncate">
                  To: {COMPANY_ADMIN_RECIPIENTS.map((a) => a.email).join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Change Password Modal */}
      {changePasswordOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-gray-900 border border-gray-200 shadow-2xl relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setChangePasswordOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-black rounded-lg"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
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
                    text: 'Password updated successfully! Next sign in requires your new password.',
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

