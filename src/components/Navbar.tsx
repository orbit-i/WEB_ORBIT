import React, { useState } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/orbitData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  portalRole?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'blog', label: 'Blogs' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/90 bg-white/95 backdrop-blur-md text-black">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-left focus:outline-none group"
          aria-label="ORBIT-I Home"
        >
          <img
            src="/orbit-i-logo.png"
            alt="ORBIT-I"
            className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
              {COMPANY_INFO.name}
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
              Private Limited
            </span>
          </div>
        </button>

        {/* Clean, Decent Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
          {navItems.map((item) => {
            const isActive =
              activeTab === item.id ||
              (item.id === 'blog' && activeTab === 'article') ||
              (item.id === 'careers' && activeTab === 'jobs');

            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`transition-colors py-2 relative ${
                  isActive
                    ? 'text-blue-600 font-bold'
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full animate-in fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Clean Contact Us CTA + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('contact')}
            className="hidden sm:inline-flex items-center gap-2 bg-black text-white hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 shadow-sm"
          >
            <span>Get in Touch</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile menu hamburger toggle button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-gray-800 hover:text-black rounded-xl border border-gray-300 focus:outline-none bg-gray-50 hover:bg-gray-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Decent, Clean Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white/98 backdrop-blur-xl px-5 py-6 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-2xl">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                activeTab === item.id ||
                (item.id === 'blog' && activeTab === 'article') ||
                (item.id === 'careers' && activeTab === 'jobs');

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full text-left py-3 px-4 text-base font-bold rounded-2xl transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight
                    className={`h-4 w-4 ${
                      isActive ? 'text-white' : 'text-gray-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Mobile Footer CTAs */}
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
            <button
              onClick={() => handleNav('contact')}
              className="w-full py-3 px-4 bg-black text-white hover:bg-gray-800 text-center rounded-2xl text-sm font-bold shadow-md transition-colors"
            >
              Contact Us
            </button>

            <button
              onClick={() => handleNav('client-portal')}
              className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center rounded-2xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Client Portal Access</span>
              <span className="text-[10px] font-mono bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">Secure</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
