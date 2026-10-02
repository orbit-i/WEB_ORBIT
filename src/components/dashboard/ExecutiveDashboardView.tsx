import React, { useState } from 'react';
import {
  TrendingUp,
  MoreVertical,
  Minus,
  Maximize2,
  X,
  Info,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Server,
  Zap,
  FolderKanban,
  Users,
  Code2,
  Smartphone,
  Cloud,
  FileCheck,
} from 'lucide-react';
import { WorldMapWidget } from './WorldMapWidget';
import { CLIENT_PROJECTS } from '../../data/orbitData';

export const ExecutiveDashboardView: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  // Weekly Operations Velocity Data (Mon to Sun)
  const weeklyStatusData = [
    { day: 'Mon', commits: 18, delivered: 4, inquiries: 3 },
    { day: 'Tue', commits: 24, delivered: 6, inquiries: 2 },
    { day: 'Wed', commits: 32, delivered: 8, inquiries: 5 },
    { day: 'Thu', commits: 28, delivered: 5, inquiries: 4 },
    { day: 'Fri', commits: 40, delivered: 10, inquiries: 7 },
    { day: 'Sat', commits: 22, delivered: 6, inquiries: 3 },
    { day: 'Sun', commits: 14, delivered: 3, inquiries: 2 },
  ];

  // Engineering Milestones & Deliverables
  const milestoneGoals = [
    { title: 'Apex Global Dispatch Telemetry API', current: 78, target: 100, color: 'bg-blue-600' },
    { title: 'Medisphere HIPAA Gateway Security Audit', current: 92, target: 100, color: 'bg-emerald-500' },
    { title: 'AgriCold IoT Cloud Telemetry SLA', current: 100, target: 100, color: 'bg-purple-600' },
    { title: 'ORBIT-I Core Microservices v2.4', current: 85, target: 100, color: 'bg-amber-500' },
  ];

  // Verified Active Engineering Services
  const coreServices = [
    {
      id: 1,
      name: 'Web & Headless WordPress',
      spec: 'React, Next.js, Node.js, Custom Coding',
      tag: 'ACTIVE',
      tagColor: 'bg-blue-100 text-blue-700 border-blue-200',
      icon: Code2,
      iconColor: 'bg-blue-50 text-blue-600',
    },
    {
      id: 2,
      name: 'Mobile App Engineering',
      spec: 'React Native, Flutter, iOS & Android',
      tag: '60 FPS',
      tagColor: 'bg-purple-100 text-purple-700 border-purple-200',
      icon: Smartphone,
      iconColor: 'bg-purple-50 text-purple-600',
    },
    {
      id: 3,
      name: 'Custom ERP Platforms',
      spec: 'Bespoke Workflows, MySQL, Microservices',
      tag: 'ENTERPRISE',
      tagColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      icon: Layers,
      iconColor: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 4,
      name: 'Cloud Infrastructure & DevOps',
      spec: 'Docker, Linux Cloud, 99.98% Uptime SLA',
      tag: 'SLA OK',
      tagColor: 'bg-amber-100 text-amber-700 border-amber-200',
      icon: Cloud,
      iconColor: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Row: Weekly Engineering Delivery Velocity + Real Infrastructure Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Operations Velocity (8 Columns) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-gray-150 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                Engineering Velocity &amp; Sprint Deliverables
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Weekly commits, milestone signoffs, and enterprise inquiries velocity
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Sprints on Schedule
              </span>
            </div>
          </div>

          {/* Body: Velocity Bars + Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 items-center">
            {/* Chart */}
            <div className="md:col-span-7">
              <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3 px-2 font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-600"></span>
                    <span>Code Commits</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
                    <span>Deliverables</span>
                  </span>
                </div>
                <span className="text-[10px] text-gray-400">Scale: 0 - 50</span>
              </div>

              {/* Bar Chart Container */}
              <div className="relative h-48 sm:h-52 flex items-end justify-between px-3 pt-6 border-b border-gray-200">
                {weeklyStatusData.map((item) => {
                  const blueHeight = (item.commits / 50) * 100;
                  const greenHeight = (item.delivered / 15) * 100;
                  const isHovered = hoveredDay === item.day;

                  return (
                    <div
                      key={item.day}
                      onMouseEnter={() => setHoveredDay(item.day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className="relative flex flex-col items-center justify-end h-full z-10 w-9 sm:w-11 cursor-pointer group"
                    >
                      {isHovered && (
                        <div className="absolute -top-10 bg-gray-900 text-white text-[10px] font-mono py-1 px-2 rounded shadow-lg z-20 whitespace-nowrap">
                          {item.day}: {item.commits} commits · {item.delivered} deliverables
                        </div>
                      )}

                      <div className="flex items-end gap-1 h-full">
                        <div
                          style={{ height: `${blueHeight}%` }}
                          className="w-2.5 sm:w-3 bg-blue-600 hover:bg-blue-700 rounded-t-sm transition-all"
                        />
                        <div
                          style={{ height: `${greenHeight}%` }}
                          className="w-2.5 sm:w-3 bg-emerald-500 hover:bg-emerald-600 rounded-t-sm transition-all"
                        />
                      </div>

                      <span className="text-[11px] font-semibold text-gray-500 mt-2">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Milestones Right */}
            <div className="md:col-span-5 md:border-l md:border-gray-150 md:pl-6 space-y-3.5">
              <div className="flex items-center justify-between pb-1">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider font-mono">
                  Active Client Sprints
                </h4>
                <span className="text-[10px] text-gray-400 font-mono">Q1/Q2 2026</span>
              </div>

              <div className="space-y-3">
                {milestoneGoals.map((m) => (
                  <div key={m.title} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-gray-700 text-[11px] truncate max-w-[170px]" title={m.title}>
                        {m.title}
                      </span>
                      <span className="text-gray-500 font-mono text-[10px]">{m.current}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        style={{ width: `${m.current}%` }}
                        className={`h-full rounded-full transition-all ${m.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom KPI Metric Strip */}
          <div className="pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 font-mono uppercase font-bold">Total Retainers</span>
              <div className="text-base sm:text-lg font-bold text-gray-900">$83,000</div>
              <span className="text-[10px] text-emerald-600 font-semibold font-mono">Verified Contracts</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 font-mono uppercase font-bold">Settled Payments</span>
              <div className="text-base sm:text-lg font-bold text-emerald-600">$72,500</div>
              <span className="text-[10px] text-gray-500 font-mono">Wire / Banking Rails</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 font-mono uppercase font-bold">Pending Milestones</span>
              <div className="text-base sm:text-lg font-bold text-amber-600">$10,500</div>
              <span className="text-[10px] text-amber-700 font-semibold font-mono">In Final Review</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 font-mono uppercase font-bold">Active SLA Uptime</span>
              <div className="text-base sm:text-lg font-bold text-blue-600">99.98%</div>
              <span className="text-[10px] text-emerald-600 font-semibold font-mono">Zero Incidents</span>
            </div>
          </div>
        </div>

        {/* Right Cards: Production Architecture Status */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6">
          {/* Card 1: Production Linux Cloud Cluster */}
          <div className="bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[170px]">
            <div className="flex items-center justify-between text-white/90">
              <span className="text-xs font-bold tracking-wide uppercase font-mono">Production Cloud Health</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                99.98% Uptime
              </div>
              <div className="text-xs text-white/80 mt-0.5 font-medium">
                Enterprise Linux Cloud · Rolling 90 Days SLA
              </div>
            </div>

            <div className="pt-2 border-t border-white/20 text-[11px] font-mono text-white/90 flex items-center justify-between">
              <span>Latency: &lt;100ms</span>
              <span>Backups: SHA-256 OK</span>
            </div>
          </div>

          {/* Card 2: Security & Zero-Trust Firewall */}
          <div className="bg-gradient-to-br from-slate-900 to-gray-900 text-white rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[170px] border border-gray-800">
            <div className="flex items-center justify-between text-white/90">
              <span className="text-xs font-bold tracking-wide uppercase font-mono text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>Zero-Trust Security</span>
              </span>
              <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/80">RBAC</span>
            </div>

            <div className="my-2">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                All Clusters Secure
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                Rate-limiting, HSTS, and multi-factor admin auth enforced.
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-emerald-400 flex items-center justify-between">
              <span>Active Sessions: Validated</span>
              <span>Audit Trail: Persisted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Active Client Projects (Card 4) + Verified Capabilities (Card 5) + Visitors (Card 6) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 4: REAL CLIENT CONTRACTS STATUS */}
        <div className="bg-white rounded-2xl p-5 border border-gray-150 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                <FolderKanban className="h-4 w-4 text-blue-600" />
                <span>Institutional Client Sprints</span>
              </h4>
              <span className="text-[10px] text-gray-400 font-mono">Live Retainers</span>
            </div>
            <p className="text-[11px] text-gray-500 mb-3">Enterprise delivery status &amp; milestones</p>

            <div className="divide-y divide-gray-100">
              {CLIENT_PROJECTS.map((prj) => (
                <div key={prj.id} className="py-2.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900 truncate max-w-[160px]">
                      {prj.clientOrg}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                      {prj.progressPercent}%
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 truncate">{prj.title}</div>
                  <div className="text-[10px] text-gray-400 font-mono truncate">{prj.currentMilestone}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 text-center">
            <span className="text-[11px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer">
              Open CRM &amp; Clients Hub →
            </span>
          </div>
        </div>

        {/* CARD 5: CORE ENGINEERING CAPABILITIES */}
        <div className="bg-white rounded-2xl p-5 border border-gray-150 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
                <Code2 className="h-4 w-4 text-blue-600" />
                <span>Verified Core Capabilities</span>
              </h4>
              <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mb-3">Enterprise technology stacks</p>

            <div className="divide-y divide-gray-100">
              {coreServices.map((svc) => {
                const Icon = svc.icon;
                return (
                  <div key={svc.id} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${svc.iconColor}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-gray-900 truncate">{svc.name}</div>
                        <div className="text-[10px] text-gray-400 truncate">{svc.spec}</div>
                      </div>
                    </div>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${svc.tagColor} shrink-0`}>
                      {svc.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 text-center">
            <span className="text-[11px] font-bold text-blue-600 hover:text-blue-800 cursor-pointer">
              Manage Services Catalog →
            </span>
          </div>
        </div>

        {/* CARD 6: VISITORS WORLD MAP */}
        <div className="h-full">
          <WorldMapWidget title="Global Telemetry & Visitors" />
        </div>
      </div>
    </div>
  );
};
