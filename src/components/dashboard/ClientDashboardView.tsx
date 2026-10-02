import React, { useState } from 'react';
import {
  TrendingUp,
  MoreVertical,
  Minus,
  Maximize2,
  X,
  Info,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Download,
  Terminal,
  GitBranch,
  Layers,
  Clock,
  ExternalLink,
  Cpu,
} from 'lucide-react';
import { WorldMapWidget } from './WorldMapWidget';
import { ClientProject } from '../../types';

interface ClientDashboardViewProps {
  project: ClientProject;
  onDownloadDoc?: (docName: string) => void;
  onNavigateTab?: (tab: 'overview' | 'repo' | 'docs' | 'support') => void;
}

export const ClientDashboardView: React.FC<ClientDashboardViewProps> = ({
  project,
  onDownloadDoc,
  onNavigateTab,
}) => {
  const [hoveredSprint, setHoveredSprint] = useState<string | null>(null);

  // Client Sprint Velocity Data (Dual bars: Planned vs Completed Story Points)
  const sprintData = [
    { name: 'Spr 1', planned: 8.0, completed: 8.0, pts: '40/40 pts' },
    { name: 'Spr 2', planned: 9.0, completed: 9.0, pts: '45/45 pts' },
    { name: 'Spr 3', planned: 7.5, completed: 7.5, pts: '38/38 pts' },
    { name: 'Spr 4', planned: 8.5, completed: 8.2, pts: '42/44 pts' },
    { name: 'Spr 5', planned: 9.5, completed: 9.5, pts: '48/48 pts' },
    { name: 'Spr 6', planned: 9.0, completed: 7.0, pts: '35/45 pts (Current)' },
    { name: 'Spr 7', planned: 8.5, completed: 0.0, pts: 'Upcoming' },
  ];

  // Milestone Progress bars
  const milestoneProgress = [
    { title: 'Phase 1: Architecture & Data Modeling', percent: 100, color: 'bg-[#2f6fed]', status: 'Completed' },
    { title: 'Phase 2: Relational Schema & Core APIs', percent: 100, color: 'bg-[#10b981]', status: 'Completed' },
    { title: 'Phase 3: Real-Time Ingestion & Driver Portal', percent: 78, color: 'bg-[#f59e0b]', status: 'In Progress' },
    { title: 'Phase 4: Security Audit & Penetration Tests', percent: 45, color: 'bg-[#ef4444]', status: 'Scheduled' },
  ];

  // Artifact files
  const artifacts = [
    { name: 'System_Architecture_v2.4.pdf', size: '2.4 MB', type: 'PDF Spec', badge: 'ARCH' },
    { name: 'Security_Penetration_Audit_Q1.pdf', size: '1.8 MB', type: 'Audit Report', badge: 'AUDIT' },
    { name: 'Database_Schema_Migration_Plan.sql', size: '142 KB', type: 'SQL Schema', badge: 'SCHEMA' },
    { name: 'Driver_Telemetry_Webhook_Contract.json', size: '94 KB', type: 'API Spec', badge: 'API' },
  ];

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* TOP ROW: WEEKLY STATUS (CARD 1) + 2 VIBRANT STAT CARDS (CARDS 2 & 3)     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CARD 1: SPRINT VELOCITY & MILESTONE STATUS (8 COLUMNS) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-gray-150 shadow-xs flex flex-col justify-between">
          {/* Card Window Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                  Sprint Velocity &amp; Milestone Velocity
                </h3>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  {project.status} ({project.progressPercent}%)
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Contract: <span className="font-semibold text-gray-700">{project.title}</span> · {project.serviceType}
              </p>
            </div>

            {/* Window control buttons (_ [] X) */}
            <div className="flex items-center gap-1.5 text-gray-400">
              <button className="p-1 hover:text-black rounded" title="Minimize">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <button className="p-1 hover:text-black rounded" title="Maximize">
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
              <button className="p-1 hover:text-red-500 rounded" title="Close">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Main Body: Dual Bar Chart on Left, Milestone Completion on Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 items-center">
            {/* Left 60%: Dual Grouped Bar Chart (Sprint Points) */}
            <div className="md:col-span-7">
              <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3 px-2">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#2f6fed]"></span>
                    <span>Planned Points</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#10b981]"></span>
                    <span>Accepted Points</span>
                  </span>
                </div>
                <span className="font-mono text-[10px] text-gray-400">Target: 10 pts</span>
              </div>

              {/* Chart Grid Lines & Vertical Bars Container */}
              <div className="relative h-52 sm:h-56 flex items-end justify-between px-3 pt-6 border-b border-gray-200">
                {/* Horizontal reference lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                  <div className="border-b border-gray-200 w-full flex items-center justify-end text-[9px] text-gray-400 pr-1">10</div>
                  <div className="border-b border-gray-200 w-full flex items-center justify-end text-[9px] text-gray-400 pr-1">7.5</div>
                  <div className="border-b border-gray-200 w-full flex items-center justify-end text-[9px] text-gray-400 pr-1">5.0</div>
                  <div className="border-b border-gray-200 w-full flex items-center justify-end text-[9px] text-gray-400 pr-1">2.5</div>
                  <div className="w-full flex items-center justify-end text-[9px] text-gray-400 pr-1">0</div>
                </div>

                {/* Sprint Columns */}
                {sprintData.map((item) => {
                  const blueHeight = (item.planned / 10) * 100;
                  const tealHeight = (item.completed / 10) * 100;
                  const isHovered = hoveredSprint === item.name;

                  return (
                    <div
                      key={item.name}
                      onMouseEnter={() => setHoveredSprint(item.name)}
                      onMouseLeave={() => setHoveredSprint(null)}
                      className="relative flex flex-col items-center justify-end h-full z-10 w-9 sm:w-11 cursor-pointer group"
                    >
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-12 bg-gray-900 text-white text-[10px] font-mono py-1 px-2 rounded shadow-lg pointer-events-none z-20 whitespace-nowrap animate-in fade-in duration-100">
                          {item.name}: {item.pts}
                        </div>
                      )}

                      {/* Grouped Dual Bars */}
                      <div className="flex items-end gap-1.5 h-full">
                        {/* Blue Bar */}
                        <div
                          style={{ height: `${blueHeight}%` }}
                          className="w-2.5 sm:w-3.5 bg-[#2f6fed] hover:bg-blue-600 rounded-t-sm transition-all duration-300"
                        ></div>
                        {/* Teal Bar */}
                        <div
                          style={{ height: `${tealHeight}%` }}
                          className="w-2.5 sm:w-3.5 bg-[#10b981] hover:bg-emerald-600 rounded-t-sm transition-all duration-300"
                        ></div>
                      </div>

                      {/* Label */}
                      <span className="text-[10px] font-semibold text-gray-500 mt-2">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 40%: Milestone Completion */}
            <div className="md:col-span-5 md:border-l md:border-gray-150 md:pl-6 space-y-4">
              <div className="flex items-center justify-between pb-1">
                <h4 className="text-sm font-bold text-gray-800">Contract Milestones</h4>
                <span className="text-[10px] text-emerald-600 font-bold font-mono">
                  {project.progressPercent}% Signed
                </span>
              </div>

              <div className="space-y-3.5">
                {milestoneProgress.map((m) => (
                  <div key={m.title} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-gray-700 text-[11px] truncate max-w-[130px]">
                        {m.title}
                      </span>
                      <span className="text-gray-500 font-mono text-[10px]">
                        {m.percent}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        style={{ width: `${m.percent}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${m.color}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom KPI Metric Tickers (4 Columns from Image) */}
          <div className="pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                <span>▲ 78%</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                Phase 3 Active
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                Sprint Velocity
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600">
                <span>▲ 99.98%</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                High SLA
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                Infrastructure Uptime
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-600">
                <span>▲ 3/3</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                Grade A+
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                Security Audits
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                <span>0 Open</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                Zero Blockers
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                Critical Bugs
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 COLUMNS): TWO VIBRANT SOLID STAT CARDS */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6">
          {/* CARD 2: VIBRANT SOLID BLUE STAT CARD */}
          <div className="bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[170px]">
            <div className="flex items-center justify-between text-white/90">
              <span className="text-xs font-bold tracking-wide uppercase">Staging VPS Node</span>
              <button className="text-white/70 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                99.98%
              </div>
              <div className="text-xs text-white/80 mt-0.5 font-medium">
                Live environment availability
              </div>
            </div>

            {/* White Mini Vertical Bar Chart Graphic */}
            <div className="flex items-end gap-1.5 h-10 pt-2">
              {[40, 60, 50, 80, 55, 90, 70, 100, 85, 95].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-1.5 bg-white/90 rounded-xs"
                ></div>
              ))}
            </div>
          </div>

          {/* CARD 3: VIBRANT SOLID RED/CORAL STAT CARD */}
          <div className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[170px]">
            <div className="flex items-center justify-between text-white/90">
              <span className="text-xs font-bold tracking-wide uppercase">Sprint 6 Sign-Off</span>
              <button className="text-white/70 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                78% Completed
              </div>
              <div className="text-xs text-white/80 mt-0.5 font-medium">
                Pending: Webhook Delivery &amp; UAT
              </div>
            </div>

            {/* Stylized White Area/Spline Wave SVG Graphic */}
            <div className="w-full h-10 relative overflow-hidden pt-1">
              <svg
                viewBox="0 0 300 60"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="clientWhiteWave" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,40 Q 40,15 80,30 T 160,18 T 240,32 T 300,8 L 300,60 L 0,60 Z"
                  fill="url(#clientWhiteWave)"
                />
                <path
                  d="M 0,40 Q 40,15 80,30 T 160,18 T 240,32 T 300,8"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM ROW: EARNINGS (CARD 4) + ARTIFACTS (CARD 5) + TELEMETRY MAP (CARD 6) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 4: CONTRACT ALLOCATION & HOURS */}
        <div className="bg-white rounded-2xl p-5 border border-gray-150 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm sm:text-base font-bold text-gray-800 tracking-tight">Contract Retainer</h4>
              <button className="text-gray-400 hover:text-gray-600" title="Retainer Details">
                <Info className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">Disbursed milestone allocations</p>
          </div>

          <div className="my-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              $34,500.00
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-1">
              <span>78% Disbursed of Milestone</span>
              <span>▲</span>
            </div>
          </div>

          {/* Mini Purple Bar Chart */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-end justify-between gap-1 h-12 pt-2">
              {[35, 50, 40, 70, 55, 85, 65, 95, 75, 90, 80, 85, 92, 88, 70].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-full rounded-xs bg-[#8b5cf6] hover:bg-purple-600 transition-all duration-200"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 5: RECENTLY DELIVERED ARTIFACTS */}
        <div className="bg-white rounded-2xl p-5 border border-gray-150 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-gray-800 tracking-tight">
                  Recently Delivered Artifacts
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Signed deliverables &amp; SHA-256 specs</p>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold">Verified</span>
            </div>

            <div className="divide-y divide-gray-100">
              {artifacts.map((art) => (
                <div key={art.name} className="py-2.5 flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-gray-900 truncate">
                        {art.name}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {art.size} · {art.type}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onDownloadDoc && onDownloadDoc(art.name)}
                    className="p-1.5 hover:bg-gray-100 text-gray-600 hover:text-black rounded-lg transition-colors shrink-0"
                    title={`Download ${art.name}`}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 text-center">
            <button
              onClick={() => onNavigateTab && onNavigateTab('docs')}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800"
            >
              Open Documents Center →
            </button>
          </div>
        </div>

        {/* CARD 6: VISITORS & CLUSTER TELEMETRY MAP */}
        <div className="h-full">
          <WorldMapWidget title="Live Node Telemetry" />
        </div>
      </div>
    </div>
  );
};
