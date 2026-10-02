import React, { useState, useRef } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { COMPANY_INFO, VERIFIED_SERVICES } from '../data/orbitData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  portalRole: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  portalRole,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menuId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(menuId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm text-black">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Brand Zone - Clean transparent logo and company title */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none"
        >
          <img
            src="/orbit-i-logo.png"
            alt="ORBIT-I"
            className="h-9 sm:h-10 w-auto object-contain bg-transparent"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-black">
              {COMPANY_INFO.name}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-wider text-gray-500 uppercase">
              Private Limited
            </span>
          </div>
        </button>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-700">
          {/* 1. Home */}
          <button
            onClick={() => handleNav('home')}
            className={`transition-colors hover:text-black py-2 ${
              activeTab === 'home' ? 'text-black font-semibold' : 'text-gray-700'
            }`}
          >
            Home
          </button>

          {/* 2. About Us with Submenu */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleNav('about')}
              className={`flex items-center gap-1.5 py-2 transition-colors hover:text-black ${
                activeTab === 'about' ? 'text-black font-semibold' : 'text-gray-700'
              }`}
            >
              <span>About Us</span>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </button>

            {openDropdown === 'about' && (
              <div className="absolute top-full left-0 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <button
                  onClick={() => handleNav('about')}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 font-semibold text-black"
                >
                  About ORBIT-I
                </button>
                <button
                  onClick={() => handleNav('about')}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  Operating Principles
                </button>
                <button
                  onClick={() => handleNav('team')}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 text-gray-700"
                >
                  Meet the Team
                </button>
              </div>
            )}
          </div>

          {/* 3. Services with Submenu */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleNav('services')}
              className={`flex items-center gap-1.5 py-2 transition-colors hover:text-black ${
                activeTab === 'services' ? 'text-black font-semibold' : 'text-gray-700'
              }`}
            >
              <span>Services</span>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </button>

            {openDropdown === 'services' && (
              <div className="absolute top-full left-0 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="text-[10px] font-bold text-gray-400 uppercase px-3 py-1 font-mono">
                  Verified Engineering Services
                </div>
                {VERIFIED_SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleNav('services')}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-gray-100 font-medium text-gray-800 hover:text-black flex items-center justify-between"
                  >
                    <span>{s.title}</span>
                    <ArrowRight className="h-3 w-3 text-gray-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Team (Direct single link, NO DROPDOWN - "Just only team ho bs") */}
          <button
            onClick={() => handleNav('team')}
            className={`transition-colors hover:text-black py-2 ${
              activeTab === 'team' ? 'text-black font-semibold' : 'text-gray-700'
            }`}
          >
            Team
          </button>

          {/* 5. Intern Verification */}
          <button
            onClick={() => handleNav('verify')}
            className={`transition-colors hover:text-black py-2 ${
              activeTab === 'verify' ? 'text-black font-semibold' : 'text-gray-700'
            }`}
          >
            Intern Verification
          </button>

          {/* 6. Insights & Engineering Blog */}
          <button
            onClick={() => handleNav('blog')}
            className={`transition-colors hover:text-black py-2 flex items-center gap-1.5 ${
              activeTab === 'blog' || activeTab === 'article' ? 'text-black font-semibold' : 'text-gray-700'
            }`}
          >
            <span>Insights</span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full">
              New
            </span>
          </button>

          {/* 7. Client Portal */}
          <button
            onClick={() => handleNav('client-portal')}
            className={`transition-colors hover:text-black py-2 ${
              activeTab === 'client-portal' ? 'text-black font-semibold' : 'text-gray-700'
            }`}
          >
            Client Portal
          </button>
        </nav>

        {/* Right Cluster: Contact Us Button + Mobile Hamburger (Placed Directly Side-by-Side) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => handleNav('contact')}
            className="bg-black text-white hover:bg-white hover:text-black px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-200 text-xs sm:text-sm border-2 border-black whitespace-nowrap shadow-sm"
          >
            Contact Us
          </button>

          {/* Mobile menu button directly next to Contact Us */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-800 hover:text-black rounded border border-gray-300 focus:outline-none bg-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white/95 backdrop-blur-md px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-150 shadow-xl">
          <div>
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left py-3 px-4 text-base font-bold rounded-xl transition-colors flex items-center justify-between ${
                activeTab === 'home'
                  ? 'bg-black text-white'
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              <span>Home</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <div className="text-[11px] font-bold text-gray-400 uppercase px-3 py-1 font-mono tracking-wider">
              Company
            </div>
            <button
              onClick={() => handleNav('about')}
              className={`w-full text-left py-2.5 px-3 text-sm rounded-lg transition-colors ${
                activeTab === 'about'
                  ? 'bg-gray-100 text-black font-bold'
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              About ORBIT-I &amp; Principles
            </button>
            <button
              onClick={() => handleNav('team')}
              className={`w-full text-left py-2.5 px-3 text-sm rounded-lg transition-colors flex items-center justify-between ${
                activeTab === 'team'
                  ? 'bg-gray-100 text-black font-bold'
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              <span>Our Team &amp; Leadership</span>
              <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">HQ</span>
            </button>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <div className="text-[11px] font-bold text-gray-400 uppercase px-3 py-1 font-mono tracking-wider">
              Engineering Services
            </div>
            <div className="space-y-1">
              {VERIFIED_SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleNav('services')}
                  className="w-full text-left py-2 px-3 text-xs sm:text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg flex items-center justify-between"
                >
                  <span className="truncate">{s.title}</span>
                  <ArrowRight className="h-3 w-3 text-gray-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <div className="text-[11px] font-bold text-gray-400 uppercase px-3 py-1 font-mono tracking-wider">
              Publications &amp; Insights
            </div>
            <button
              onClick={() => handleNav('blog')}
              className={`w-full text-left py-2.5 px-3 text-sm rounded-lg transition-colors flex items-center justify-between ${
                activeTab === 'blog' || activeTab === 'article'
                  ? 'bg-black text-white font-bold'
                  : 'text-gray-800 font-semibold hover:bg-gray-100'
              }`}
            >
              <span>Insights &amp; Engineering Blog</span>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">New</span>
            </button>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <div className="text-[11px] font-bold text-gray-400 uppercase px-3 py-1 font-mono tracking-wider">
              Credentials &amp; Access
            </div>
            <button
              onClick={() => handleNav('verify')}
              className={`w-full text-left py-2.5 px-3 text-sm rounded-lg transition-colors ${
                activeTab === 'verify'
                  ? 'bg-gray-100 text-black font-bold'
                  : 'text-gray-700 hover:text-black hover:bg-gray-50'
              }`}
            >
              Intern Verification
            </button>
            <button
              onClick={() => handleNav('client-portal')}
              className={`w-full text-left py-2.5 px-3 text-sm rounded-lg transition-colors flex items-center justify-between ${
                activeTab === 'client-portal'
                  ? 'bg-black text-white font-bold'
                  : 'text-gray-800 font-semibold hover:bg-gray-100'
              }`}
            >
              <span>Client Project Portal</span>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Secure</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
