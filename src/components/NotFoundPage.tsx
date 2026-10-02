import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Search, Home, ArrowRight, Sparkles, Compass, Rocket, Globe } from 'lucide-react';
import { SeoHead } from './common/SeoHead';

interface NotFoundPageProps {
  setActiveTab: (tab: string) => void;
  requestedRoute?: string;
  isPreview?: boolean;
  onExitPreview?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  setActiveTab,
  requestedRoute,
  isPreview = false,
  onExitPreview,
}) => {
  const { services } = useCms();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = searchQuery.trim()
    ? services.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 via-white to-indigo-50/30 text-gray-900 flex flex-col justify-between py-12 md:py-16 font-sans selection:bg-blue-600 selection:text-white relative overflow-hidden">
      <SeoHead
        title="404 - Lost in Orbit | Page Not Found"
        description="The page you requested is not in orbit. Navigate back to ORBIT-I Private Limited home or explore our verified services."
      />

      {/* Decorative cute floating cosmic particles */}
      <div className="absolute top-12 left-10 w-3 h-3 rounded-full bg-blue-400/30 animate-pulse pointer-events-none" />
      <div className="absolute top-32 right-16 w-4 h-4 rounded-full bg-indigo-400/25 animate-bounce pointer-events-none" />
      <div className="absolute bottom-24 left-20 w-3.5 h-3.5 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
      <div className="absolute bottom-36 right-28 w-2.5 h-2.5 rounded-full bg-amber-400/40 animate-pulse pointer-events-none" />

      {/* Admin preview banner */}
      {isPreview && (
        <div className="bg-black text-white py-2.5 px-6 text-xs font-mono font-bold flex items-center justify-between mb-8 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ADMINISTRATIVE PREVIEW MODE — Configured 404 Error Layout</span>
          </div>
          {onExitPreview && (
            <button
              onClick={onExitPreview}
              className="bg-white text-black hover:bg-gray-200 px-3 py-1 rounded-full text-[11px] font-semibold transition-colors"
            >
              Back to Admin Portal
            </button>
          )}
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 w-full text-center space-y-8 my-auto relative z-10">
        {/* Cute Orbiting 404 Graphic */}
        <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
          {/* Pulsing Backlight */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/20 via-indigo-400/20 to-sky-300/30 blur-2xl animate-pulse" />

          {/* Orbit Track */}
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-blue-400/40 animate-[spin_10s_linear_infinite]">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-base">🚀</span>
          </div>

          {/* Cute Glowing Planet */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex flex-col items-center justify-center text-white shadow-xl shadow-blue-500/25 border-4 border-white">
            <span className="text-3xl sm:text-4xl font-black tracking-tight leading-none">404</span>
            <span className="text-[10px] font-mono tracking-widest uppercase opacity-80 mt-0.5">Orbit Lost</span>
          </div>
        </div>

        {/* Title & Cute Copy */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-blue-700">
            <Compass className="h-3.5 w-3.5 text-blue-600" />
            <span>COORDINATE OUT OF TRAJECTORY</span>
            {requestedRoute && (
              <>
                <span className="text-blue-300">|</span>
                <span className="text-red-500 truncate max-w-[180px]">{requestedRoute}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Oops! You’ve Drifted Out of Orbit.
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto leading-relaxed">
            The page or satellite coordinate you are searching for has moved, been decommissioned, or never existed in this solar system. Let’s guide you safely back!
          </p>
        </div>

        {/* Search for Services or Resources */}
        <div className="max-w-lg mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search engineering services, blogs, or resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-full text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-xs"
            />
          </div>

          {/* Live Search Results Popover */}
          {searchQuery.trim() && (
            <div className="mt-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-xl text-left space-y-2 animate-in fade-in duration-150">
              <span className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-2">
                Matching Capabilities ({filteredServices.length})
              </span>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleNavigate('services')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50 text-xs flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-blue-600">
                        {service.title}
                      </div>
                      <div className="text-[11px] text-gray-500 line-clamp-1">
                        {service.summary}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))
              ) : (
                <div className="text-xs text-gray-500 p-2 text-center">
                  No matching services found for &quot;{searchQuery}&quot;.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => handleNavigate('home')}
            className="px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </button>

          <button
            onClick={() => handleNavigate('services')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Rocket className="h-4 w-4" />
            <span>Explore Services</span>
          </button>

          <button
            onClick={() => handleNavigate('contact')}
            className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 rounded-full text-xs font-semibold transition-all shadow-xs flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Contact Support</span>
          </button>
        </div>

        {/* Suggested Quick Links */}
        <div className="pt-4 border-t border-gray-200/80 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500 font-medium">
          <span>Popular Coordinates:</span>
          {['about', 'services', 'blog', 'careers', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleNavigate(tab)}
              className="px-3 py-1 bg-white hover:bg-gray-100 border border-gray-200 rounded-full text-[11px] font-mono capitalize text-gray-700 transition-colors"
            >
              /{tab}
            </button>
          ))}
        </div>
      </div>

      <footer className="w-full text-center text-xs text-gray-400 font-mono py-4">
        ORBIT-I Private Limited · Planetary Diagnostic Status Code 404
      </footer>
    </div>
  );
};
