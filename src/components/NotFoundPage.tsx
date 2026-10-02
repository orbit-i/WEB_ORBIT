import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Search, Home, ArrowRight, Mail, Compass, Sparkles, Shield, Cpu, ExternalLink } from 'lucide-react';

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
  const { notFoundSettings, services } = useCms();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services or links based on search
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
    <div className="min-h-screen bg-white text-black flex flex-col justify-between py-12 md:py-20 font-sans selection:bg-black selection:text-white">
      {/* Top Banner if in preview mode from Admin Portal */}
      {isPreview && (
        <div className="bg-black text-white py-2.5 px-6 text-xs font-mono font-bold flex items-center justify-between mb-8 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
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

      <div className="max-w-4xl mx-auto px-6 w-full text-center space-y-10 my-auto">
        {/* Error Code & Graphic */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-300 text-xs font-mono font-bold text-gray-700">
            <Compass className="h-3.5 w-3.5 text-black" />
            <span>{notFoundSettings.errorCode || '404 NOT FOUND'}</span>
            {requestedRoute && (
              <>
                <span className="text-gray-300">|</span>
                <span className="text-red-600 truncate max-w-xs">{requestedRoute}</span>
              </>
            )}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-black">
            {notFoundSettings.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            {notFoundSettings.message}
          </p>
        </div>

        {/* Search for Services or Resources */}
        {notFoundSettings.showSearch && (
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search AI services, software engineering, or company resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-full text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all shadow-xs"
              />
            </div>

            {/* Live Search Results Popover */}
            {searchQuery.trim() && (
              <div className="mt-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-xl text-left space-y-2 animate-in fade-in duration-150">
                <span className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-2">
                  Matching Services ({filteredServices.length})
                </span>
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleNavigate('services')}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors flex items-center justify-between group"
                    >
                      <div className="space-y-0.5 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-black group-hover:underline">
                            {service.title}
                          </span>
                          {service.id === 'srv-ai' && (
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-black text-white rounded-full">
                              AI Flagship
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-1">{service.summary}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-black shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))
                ) : (
                  <div className="py-4 text-center text-xs text-gray-500">
                    No matching services found for &quot;{searchQuery}&quot;. Use the quick links below or contact support.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Suggested Quick Links Grid */}
        {notFoundSettings.suggestedLinks && notFoundSettings.suggestedLinks.length > 0 && (
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">
              Direct System Navigation
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
              {notFoundSettings.suggestedLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavigate(link.tab)}
                  className="px-4 py-2 bg-gray-50 hover:bg-black hover:text-white rounded-full text-xs font-semibold text-gray-800 border border-gray-200 transition-all flex items-center gap-1.5 shadow-2xs group"
                >
                  {link.tab === 'services' ? (
                    <Cpu className="h-3.5 w-3.5 text-blue-600 group-hover:text-white" />
                  ) : link.tab === 'home' ? (
                    <Home className="h-3.5 w-3.5 text-gray-500 group-hover:text-white" />
                  ) : link.tab === 'verify' ? (
                    <Shield className="h-3.5 w-3.5 text-emerald-600 group-hover:text-white" />
                  ) : (
                    <Sparkles className="h-3.5 w-3.5 text-gray-500 group-hover:text-white" />
                  )}
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => handleNavigate('home')}
            className="w-full sm:w-auto px-7 py-3.5 bg-black text-white hover:bg-neutral-800 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Home className="h-4 w-4" />
            <span>Return to Safe Ground (Home)</span>
          </button>

          <button
            onClick={() => handleNavigate('contact')}
            className="w-full sm:w-auto px-7 py-3.5 bg-white text-black hover:bg-gray-100 rounded-full text-xs sm:text-sm font-bold border-2 border-black transition-all flex items-center justify-center gap-2"
          >
            <Mail className="h-4 w-4" />
            <span>{notFoundSettings.supportButtonText || 'Contact Technical Operations'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
