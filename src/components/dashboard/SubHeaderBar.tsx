import React, { useState } from 'react';
import { Home, ChevronRight, Calendar, Filter, Download, RefreshCw } from 'lucide-react';

interface SubHeaderBarProps {
  title: string;
  breadcrumbs: string[];
  onDateChange?: (range: string) => void;
  onRefresh?: () => void;
  onExport?: () => void;
  dateLabel?: string;
}

export const SubHeaderBar: React.FC<SubHeaderBarProps> = ({
  title,
  breadcrumbs,
  onDateChange,
  onRefresh,
  onExport,
  dateLabel = 'Today: Oct 02',
}) => {
  const [selectedRange, setSelectedRange] = useState<string>(dateLabel);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const ranges = ['Today: Oct 02', 'Yesterday', 'Last 7 Days', 'This Month (Oct 2026)', 'All-Time'];

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    if (onRefresh) onRefresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-4 sm:px-6 bg-[#f4f6fa] border-b border-gray-200/80">
      {/* Left: Title & Breadcrumbs */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
          {title}
        </h2>

        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1 font-medium">
          <Home className="h-3.5 w-3.5 text-gray-400" />
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="h-3 w-3 text-gray-400" />
              <span className={idx === breadcrumbs.length - 1 ? 'text-gray-800 font-semibold' : 'text-gray-500'}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right: Date Picker Pill & Action Buttons */}
      <div className="flex items-center gap-2 relative">
        {/* Date Filter Pill Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-3.5 py-1.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg border border-gray-300 shadow-2xs transition-all flex items-center gap-2 focus:outline-none"
          >
            <Calendar className="h-3.5 w-3.5 text-blue-600" />
            <span>{selectedRange}</span>
            <span className="text-[10px] text-gray-400">▼</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-1 z-30 animate-in fade-in">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setSelectedRange(r);
                    setDropdownOpen(false);
                    if (onDateChange) onDateChange(r);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between ${
                    selectedRange === r
                      ? 'bg-blue-50 text-blue-600 font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{r}</span>
                  {selectedRange === r && <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Purple/Violet Action Button (Exact as reference picture top-right purple button) */}
        <button
          onClick={handleRefreshClick}
          className="p-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-lg shadow-2xs transition-all focus:outline-none"
          title="Refresh Real-Time Metrics"
          aria-label="Refresh Data"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>

        {onExport && (
          <button
            onClick={onExport}
            className="p-2 bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 rounded-lg shadow-2xs transition-colors"
            title="Download CSV / JSON Report"
            aria-label="Export Data"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
