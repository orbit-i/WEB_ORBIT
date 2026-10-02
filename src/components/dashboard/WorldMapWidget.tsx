import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, MapPin } from 'lucide-react';

interface WorldMapWidgetProps {
  title?: string;
}

export const WorldMapWidget: React.FC<WorldMapWidgetProps> = ({
  title = 'Visitors',
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const telemetryNodes = [
    { id: 'pk', name: 'Pakistan (Hub & HQ)', x: 67, y: 44, visitors: '14,820', status: 'Primary Node' },
    { id: 'us-east', name: 'US-East (Virginia)', x: 26, y: 38, visitors: '8,412', status: 'Active' },
    { id: 'us-west', name: 'US-West (California)', x: 18, y: 39, visitors: '4,190', status: 'Active' },
    { id: 'eu', name: 'EU-Central (Frankfurt)', x: 51, y: 32, visitors: '6,230', status: 'Active' },
    { id: 'uk', name: 'UK (London)', x: 47, y: 30, visitors: '3,845', status: 'Active' },
    { id: 'uae', name: 'UAE (Dubai)', x: 62, y: 46, visitors: '5,110', status: 'Active' },
    { id: 'sg', name: 'Singapore (East Asia)', x: 78, y: 55, visitors: '3,790', status: 'Active' },
    { id: 'au', name: 'Australia (Sydney)', x: 88, y: 74, visitors: '2,140', status: 'Active' },
  ];

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 2.2));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-150 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-gray-800 tracking-tight">{title}</h4>
          <span className="text-[11px] text-gray-400">Global visitor telemetry &amp; live traffic</span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            onClick={handleZoomIn}
            className="p-1 hover:bg-white text-gray-600 hover:text-black rounded transition-colors text-xs"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1 hover:bg-white text-gray-600 hover:text-black rounded transition-colors text-xs"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1 hover:bg-white text-gray-600 hover:text-black rounded transition-colors text-xs"
            title="Reset"
            aria-label="Reset View"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Interactive SVG World Map Canvas */}
      <div className="relative w-full h-44 sm:h-52 bg-[#f8fafc] rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center">
        <div
          className="w-full h-full transition-transform duration-300 relative flex items-center justify-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.95" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Subtle Latitude/Longitude Grid Lines */}
            <g stroke="#e2e8f0" strokeWidth="0.6" strokeDasharray="3,3" opacity="0.6">
              <line x1="50" y1="125" x2="950" y2="125" />
              <line x1="50" y1="250" x2="950" y2="250" />
              <line x1="50" y1="375" x2="950" y2="375" />
              <line x1="250" y1="50" x2="250" y2="450" />
              <line x1="500" y1="50" x2="500" y2="450" />
              <line x1="750" y1="50" x2="750" y2="450" />
            </g>

            {/* North America */}
            <path
              d="M 120,80 Q 150,70 220,75 Q 260,90 280,120 Q 290,160 270,210 Q 230,230 190,240 Q 170,220 150,170 Q 130,130 120,80 Z"
              fill="url(#mapGradient)"
              opacity="0.9"
            />
            {/* Greenland */}
            <path
              d="M 310,50 Q 360,45 380,75 Q 360,110 320,105 Q 300,80 310,50 Z"
              fill="url(#mapGradient)"
              opacity="0.75"
            />
            {/* South America */}
            <path
              d="M 270,260 Q 320,270 340,320 Q 330,390 290,440 Q 260,410 260,340 Q 250,290 270,260 Z"
              fill="url(#mapGradient)"
              opacity="0.9"
            />
            {/* Europe */}
            <path
              d="M 450,110 Q 520,100 550,140 Q 530,180 470,185 Q 440,160 450,110 Z"
              fill="url(#mapGradient)"
              opacity="0.9"
            />
            {/* Africa */}
            <path
              d="M 460,200 Q 550,200 560,260 Q 540,340 500,390 Q 460,360 450,290 Q 440,240 460,200 Z"
              fill="url(#mapGradient)"
              opacity="0.9"
            />
            {/* Asia & Russia */}
            <path
              d="M 550,90 Q 720,70 850,110 Q 890,160 840,220 Q 770,230 730,280 Q 670,290 620,240 Q 570,220 560,160 Q 540,120 550,90 Z"
              fill="url(#mapGradient)"
              opacity="0.92"
            />
            {/* Indian Subcontinent / Pakistan Node */}
            <path
              d="M 640,230 Q 690,235 690,285 Q 665,315 640,290 Q 625,260 640,230 Z"
              fill="url(#mapGradient)"
              opacity="0.95"
            />
            {/* Southeast Asia Islands */}
            <path
              d="M 760,290 Q 800,300 810,330 Q 780,345 760,320 Z"
              fill="url(#mapGradient)"
              opacity="0.85"
            />
            {/* Australia */}
            <path
              d="M 800,350 Q 880,340 900,390 Q 880,440 820,430 Q 790,400 800,350 Z"
              fill="url(#mapGradient)"
              opacity="0.9"
            />

            {/* Glowing Telemetry Node Rings & Markers */}
            {telemetryNodes.map((node) => {
              const cx = node.x * 10;
              const cy = node.y * 5;
              const isSelected = selectedNode === node.id;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer group"
                  onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                >
                  {/* Pulsing Outer Wave Ring */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 14 : 9}
                    fill="none"
                    stroke={node.id === 'pk' ? '#10b981' : '#38bdf8'}
                    strokeWidth="2"
                    opacity="0.75"
                    className="animate-ping"
                  />
                  {/* Outer Glow Circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 10 : 7}
                    fill={node.id === 'pk' ? '#10b981' : '#38bdf8'}
                    opacity="0.4"
                  />
                  {/* Core White Dot */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 5 : 3.5}
                    fill="#ffffff"
                    stroke={node.id === 'pk' ? '#059669' : '#0284c7'}
                    strokeWidth="1.5"
                  />
                </g>
              );
            })}
          </svg>

          {/* Interactive Floating Tooltip */}
          {selectedNode && (
            <div className="absolute top-2 left-2 bg-gray-900/90 backdrop-blur-md text-white text-[11px] p-2.5 rounded-lg shadow-xl border border-gray-700 pointer-events-none z-10 animate-in fade-in zoom-in-95 duration-150">
              {(() => {
                const node = telemetryNodes.find((n) => n.id === selectedNode);
                if (!node) return null;
                return (
                  <div>
                    <div className="font-bold flex items-center gap-1.5 text-white">
                      <span className={`w-2 h-2 rounded-full ${node.id === 'pk' ? 'bg-emerald-400' : 'bg-sky-400'}`}></span>
                      <span>{node.name}</span>
                    </div>
                    <div className="text-gray-300 text-[10px] mt-0.5">
                      Live Traffic: <span className="font-semibold text-white">{node.visitors}</span>
                    </div>
                    <div className="text-[9px] text-gray-400 mt-0.5">{node.status}</div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {/* Mini Node Badges Footer */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-medium text-gray-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Pakistan (Hub)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            US &amp; Global Nodes
          </span>
        </div>
        <span className="font-mono text-[10px] text-gray-400">42,547 Total Live</span>
      </div>
    </div>
  );
};
