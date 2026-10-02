import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Minus,
  Maximize2,
  X,
  Info,
  Smartphone,
  Tv,
  Laptop,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Server,
  Zap,
} from 'lucide-react';
import { WorldMapWidget } from './WorldMapWidget';

export const ExecutiveDashboardView: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [hoveredEarnday, setHoveredEarnDay] = useState<number | null>(null);

  // Grouped Bar Chart Data (Mon to Sun)
  const weeklyStatusData = [
    { day: 'Mon', blueVal: 6.5, tealVal: 7.2, inquiries: 320, conversions: 210 },
    { day: 'Tue', blueVal: 3.0, tealVal: 3.8, inquiries: 180, conversions: 110 },
    { day: 'Wed', blueVal: 7.0, tealVal: 4.1, inquiries: 390, conversions: 240 },
    { day: 'Thu', blueVal: 3.2, tealVal: 5.0, inquiries: 210, conversions: 180 },
    { day: 'Fri', blueVal: 8.5, tealVal: 8.8, inquiries: 480, conversions: 380 },
    { day: 'Sat', blueVal: 9.6, tealVal: 5.8, inquiries: 510, conversions: 310 },
    { day: 'Sun', blueVal: 6.2, tealVal: 7.0, inquiries: 340, conversions: 290 },
  ];

  // Goal Completion Data
  const goalItems = [
    { title: 'Add Products to Reg', current: 540, target: 650, color: 'bg-[#2f6fed]' },
    { title: 'Complete Purchase', current: 310, target: 400, color: 'bg-[#ef4444]' },
    { title: 'Visit Page', current: 480, target: 800, color: 'bg-[#10b981]' },
    { title: 'Send Inquiries', current: 250, target: 500, color: 'bg-[#f59e0b]' },
  ];

  // Bottom Earnings mini-bar heights (15 days)
  const earningsBars = [30, 45, 25, 60, 40, 80, 55, 95, 70, 85, 60, 75, 90, 80, 65];

  // Recently Top Products items
  const topProducts = [
    {
      id: 1,
      name: 'Iphone 7plus',
      spec: '128GB Matte Apple and Black Edition',
      tag: 'HOT',
      tagColor: 'bg-amber-100 text-amber-700 border-amber-300',
      icon: Smartphone,
      iconColor: 'bg-amber-50 text-amber-600',
    },
    {
      id: 2,
      name: 'Apple Tv',
      spec: 'Library For Your Browse & Streaming',
      tag: 'TECH',
      tagColor: 'bg-blue-100 text-blue-700 border-blue-300',
      icon: Tv,
      iconColor: 'bg-blue-50 text-blue-600',
    },
    {
      id: 3,
      name: 'MacBook Air',
      spec: 'Make Big Things Happen, M-Series Chip',
      tag: 'SALE',
      tagColor: 'bg-rose-100 text-rose-700 border-rose-300',
      icon: Laptop,
      iconColor: 'bg-rose-50 text-rose-600',
    },
    {
      id: 4,
      name: 'Orbit ERP Enterprise',
      spec: 'High-Throughput Node.js & MySQL Engine',
      tag: 'PRO',
      tagColor: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      icon: Zap,
      iconColor: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* TOP ROW: WEEKLY STATUS (CARD 1) + 2 VIBRANT STAT CARDS (CARDS 2 & 3)     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CARD 1: WEEKLY STATUS (8 COLUMNS) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-gray-150 shadow-xs flex flex-col justify-between">
          {/* Card Window Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                Weekly Status
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Multi-channel acquisition vs conversions &amp; milestone velocity
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

          {/* Main Body: Dual Bar Chart on Left, Goal Completion on Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 items-center">
            {/* Left 60%: Dual Grouped Bar Chart */}
            <div className="md:col-span-7">
              <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3 px-2">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#2f6fed]"></span>
                    <span>Inquiries</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#10b981]"></span>
                    <span>Conversions</span>
                  </span>
                </div>
                <span className="font-mono text-[10px] text-gray-400">Scale: 0-10</span>
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

                {/* Day Columns */}
                {weeklyStatusData.map((item) => {
                  const blueHeightPercent = (item.blueVal / 10) * 100;
                  const tealHeightPercent = (item.tealVal / 10) * 100;
                  const isHovered = hoveredDay === item.day;

                  return (
                    <div
                      key={item.day}
                      onMouseEnter={() => setHoveredDay(item.day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className="relative flex flex-col items-center justify-end h-full z-10 w-9 sm:w-11 cursor-pointer group"
                    >
                      {/* Interactive Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-12 bg-gray-900 text-white text-[10px] font-mono py-1 px-2 rounded shadow-lg pointer-events-none z-20 whitespace-nowrap animate-in fade-in zoom-in-95 duration-100">
                          <div>{item.day}: Blue {item.blueVal}k | Teal {item.tealVal}k</div>
                        </div>
                      )}

                      {/* Grouped Dual Bars */}
                      <div className="flex items-end gap-1.5 h-full">
                        {/* Blue Bar */}
                        <div
                          style={{ height: `${blueHeightPercent}%` }}
                          className="w-2.5 sm:w-3.5 bg-[#2f6fed] hover:bg-blue-600 rounded-t-sm transition-all duration-300"
                        ></div>
                        {/* Teal Bar */}
                        <div
                          style={{ height: `${tealHeightPercent}%` }}
                          className="w-2.5 sm:w-3.5 bg-[#10b981] hover:bg-emerald-600 rounded-t-sm transition-all duration-300"
                        ></div>
                      </div>

                      {/* Day Label */}
                      <span className="text-[11px] font-semibold text-gray-500 mt-2">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 40%: Goal Completion */}
            <div className="md:col-span-5 md:border-l md:border-gray-150 md:pl-6 space-y-4">
              <div className="flex items-center justify-between pb-1">
                <h4 className="text-sm font-bold text-gray-800">Goal Completion</h4>
                <span className="text-[10px] text-gray-400 font-mono">Q4 Targets</span>
              </div>

              <div className="space-y-3.5">
                {goalItems.map((goal) => {
                  const percent = Math.round((goal.current / goal.target) * 100);
                  return (
                    <div key={goal.title} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-gray-700 text-[11px] truncate max-w-[130px]">
                          {goal.title}
                        </span>
                        <span className="text-gray-500 font-mono text-[10px]">
                          {goal.current}/{goal.target}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          style={{ width: `${percent}%` }}
                          className={`h-full rounded-full transition-all duration-500 ${goal.color}`}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom KPI Metric Tickers (4 Columns from Image) */}
          <div className="pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            {/* Metric 1: Total Revenue */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                <span>▲ 37%</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                $3,249.43
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                Total Revenue
              </div>
            </div>

            {/* Metric 2: Total Cost */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-600">
                <span>▲ 10%</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                $1,179.99
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                Total Cost
              </div>
            </div>

            {/* Metric 3: Total Profit */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-600">
                <span>▲ 55%</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                $1,731.50
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                Total Profit
              </div>
            </div>

            {/* Metric 4: Goal Completions */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-500">
                <span>▼ 25%</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                1,898
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                Goal Completions
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 COLUMNS): TWO VIBRANT SOLID STAT CARDS */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6">
          {/* CARD 2: VIBRANT SOLID BLUE STAT CARD ("Miami, Florida") */}
          <div className="bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[170px]">
            {/* Top row */}
            <div className="flex items-center justify-between text-white/90">
              <span className="text-xs font-bold tracking-wide uppercase">Miami, Florida</span>
              <button className="text-white/70 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            {/* Center Metric & Subtitle */}
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                41,458,245
              </div>
              <div className="text-xs text-white/80 mt-0.5 font-medium">
                Total views / Ingestion requests
              </div>
            </div>

            {/* White Mini Vertical Bar Chart Graphic */}
            <div className="flex items-end gap-1.5 h-10 pt-2">
              {[35, 55, 40, 75, 45, 85, 65, 95, 80, 100].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-1.5 bg-white/90 rounded-xs"
                ></div>
              ))}
            </div>
          </div>

          {/* CARD 3: VIBRANT SOLID RED/CORAL STAT CARD ("Tampa, Florida") */}
          <div className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] text-white rounded-2xl p-5 sm:p-6 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[170px]">
            {/* Top row */}
            <div className="flex items-center justify-between text-white/90">
              <span className="text-xs font-bold tracking-wide uppercase">Tampa, Florida</span>
              <button className="text-white/70 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            {/* Center Metric & Subtitle */}
            <div className="my-2">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                458,195
              </div>
              <div className="text-xs text-white/80 mt-0.5 font-medium">
                Today&apos;s sales / Conversion actions
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
                  <linearGradient id="whiteWaveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,45 Q 30,10 70,35 T 140,20 T 210,38 T 300,5 L 300,60 L 0,60 Z"
                  fill="url(#whiteWaveGradient)"
                />
                <path
                  d="M 0,45 Q 30,10 70,35 T 140,20 T 210,38 T 300,5"
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
      {/* BOTTOM ROW: EARNINGS (CARD 4) + TOP PRODUCTS (CARD 5) + VISITORS (CARD 6) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CARD 4: EARNINGS */}
        <div className="bg-white rounded-2xl p-5 border border-gray-150 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h4 className="text-sm sm:text-base font-bold text-gray-800 tracking-tight">Earnings</h4>
              <button className="text-gray-400 hover:text-gray-600" title="Earnings Breakdown">
                <Info className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">Total earnings of the month</p>
          </div>

          <div className="my-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              $45,215.22
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-1">
              <span>17.15% (30 days)</span>
              <span>▲</span>
            </div>
          </div>

          {/* Mini Purple Bar Chart */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-end justify-between gap-1 h-12 pt-2">
              {earningsBars.map((h, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredEarnDay(i)}
                  onMouseLeave={() => setHoveredEarnDay(null)}
                  style={{ height: `${h}%` }}
                  className={`w-full rounded-xs transition-all duration-200 cursor-pointer ${
                    hoveredEarnday === i ? 'bg-purple-800' : 'bg-[#8b5cf6] hover:bg-purple-600'
                  }`}
                  title={`Day ${i + 1}: ${h}% capacity`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 5: RECENTLY TOP PRODUCTS */}
        <div className="bg-white rounded-2xl p-5 border border-gray-150 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm sm:text-base font-bold text-gray-800 tracking-tight">
                  Recently Top Products
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Highest volume sales &amp; retainers</p>
              </div>
              <span className="text-[10px] text-gray-400 font-mono">Live</span>
            </div>

            <div className="divide-y divide-gray-100">
              {topProducts.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.id} className="py-2.5 flex items-center justify-between gap-3 group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${p.iconColor}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-gray-400 truncate max-w-[160px]">
                          {p.spec}
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.tagColor} shrink-0`}>
                      {p.tag}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 text-center">
            <span className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
              View Product Inventory →
            </span>
          </div>
        </div>

        {/* CARD 6: VISITORS WORLD MAP */}
        <div className="h-full">
          <WorldMapWidget title="Visitors" />
        </div>
      </div>
    </div>
  );
};
