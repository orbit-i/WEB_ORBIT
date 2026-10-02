import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  BookOpen,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Cloud,
  Code2,
  Sun,
  Moon,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/orbitData';
import { useTheme } from '../context/ThemeContext';

export const BLOG_CATEGORIES = [
  {
    name: 'All Publications',
    slug: 'All',
    desc: 'Complete engineering research & whitepapers',
    icon: BookOpen,
  },
  {
    name: 'Software Architecture',
    slug: 'Software Architecture',
    desc: 'High-concurrency microservices & databases',
    icon: Layers,
  },
  {
    name: 'Web & Mobile Engineering',
    slug: 'Web & Mobile Engineering',
    desc: 'TypeScript, React, Node.js & multi-platform',
    icon: Code2,
  },
  {
    name: 'Artificial Intelligence & ML',
    slug: 'Artificial Intelligence & ML',
    desc: 'Enterprise RAG pipelines & LLM orchestration',
    icon: Sparkles,
  },
  {
    name: 'Cloud & DevOps',
    slug: 'Cloud & DevOps',
    desc: 'Zero-downtime deployments & cloud telemetry',
    icon: Cloud,
  },
  {
    name: 'Security & Systems',
    slug: 'Security & Systems',
    desc: 'Cryptographic registries & tamper-evident data',
    icon: ShieldCheck,
  },
];

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string, category?: string) => void;
  portalRole?: string;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onSelectCategory,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [mobileBlogExpanded, setMobileBlogExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setBlogDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setBlogDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (catSlug: string) => {
    if (onSelectCategory) {
      onSelectCategory(catSlug);
    }
    setActiveTab('blog', catSlug);
    setBlogDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'blog', label: 'Blogs', hasDropdown: true },
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

        {/* Clean, Decent Desktop Navigation Links with Categories Submenu */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold">
          {navItems.map((item) => {
            const isActive =
              activeTab === item.id ||
              (item.id === 'blog' && activeTab === 'article') ||
              (item.id === 'careers' && activeTab === 'jobs');

            if (item.hasDropdown) {
              return (
                <div
                  key={item.id}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={() => setBlogDropdownOpen(true)}
                  onMouseLeave={() => setBlogDropdownOpen(false)}
                >
                  <button
                    onClick={() => handleNav('blog')}
                    className={`transition-colors py-2 flex items-center gap-1.5 focus:outline-none relative ${
                      isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-black'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        blogDropdownOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'
                      }`}
                    />
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full animate-in fade-in" />
                    )}
                  </button>

                  {/* Desktop Categories Submenu Popover */}
                  {blogDropdownOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-80 sm:w-96 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 text-left">
                        <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-gray-900 uppercase tracking-wider font-mono">
                            Blog &amp; Publications
                          </span>
                          <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
                            Filter by Category
                          </span>
                        </div>

                        <div className="space-y-1">
                          {BLOG_CATEGORIES.map((cat) => {
                            const IconComponent = cat.icon;
                            return (
                              <button
                                key={cat.slug}
                                onClick={() => handleCategoryNav(cat.slug)}
                                className="w-full px-3 py-2.5 rounded-xl hover:bg-blue-50/80 transition-colors flex items-start gap-3 group text-left"
                              >
                                <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-blue-600 text-gray-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                  <IconComponent className="h-3.5 w-3.5" />
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                  <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                    {cat.name}
                                  </div>
                                  <div className="text-[11px] text-gray-500 line-clamp-1 leading-snug">
                                    {cat.desc}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="pt-2 mt-1 border-t border-gray-100">
                          <button
                            onClick={() => handleNav('blog')}
                            className="w-full py-2 text-center text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center gap-1"
                          >
                            <span>Browse All Research Articles</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`transition-colors py-2 relative ${
                  isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-black'
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

        {/* Right Action: Clean Dedicated Theme Toggle + Contact Us CTA + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dedicated Theme Toggle Button (Without Emoji, Clean SVG Icons) */}
          <button
            onClick={toggleTheme}
            className="px-2.5 sm:px-3.5 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 transition-colors flex items-center gap-1.5 focus:outline-none shadow-2xs cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Color Theme"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="hidden sm:inline text-xs font-bold font-mono">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-gray-700 shrink-0" />
                <span className="hidden sm:inline text-xs font-bold font-mono">Dark</span>
              </>
            )}
          </button>

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

      {/* Decent, Clean Mobile Drawer with Category Submenus */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white/98 backdrop-blur-xl px-5 py-6 space-y-3 animate-in slide-in-from-top-2 duration-150 shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                activeTab === item.id ||
                (item.id === 'blog' && activeTab === 'article') ||
                (item.id === 'careers' && activeTab === 'jobs');

              if (item.hasDropdown) {
                return (
                  <div key={item.id} className="space-y-1">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleNav('blog')}
                        className={`flex-1 text-left py-3 px-4 text-base font-bold rounded-2xl transition-all flex items-center justify-between ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="text-xs font-mono opacity-80">Publications</span>
                      </button>

                      <button
                        onClick={() => setMobileBlogExpanded(!mobileBlogExpanded)}
                        className={`p-3 rounded-2xl border transition-colors ${
                          mobileBlogExpanded
                            ? 'bg-blue-50 border-blue-300 text-blue-600'
                            : 'bg-gray-50 border-gray-200 text-gray-600'
                        }`}
                        title="Toggle Blog Categories"
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            mobileBlogExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Mobile Categories Accordion Submenu */}
                    {mobileBlogExpanded && (
                      <div className="pl-3 pr-1 py-2 space-y-1 border-l-2 border-blue-600 ml-3 bg-gray-50/60 rounded-r-2xl animate-in slide-in-from-top-1">
                        <div className="text-[10px] font-mono uppercase font-bold text-gray-400 px-3 py-1">
                          Article Categories
                        </div>
                        {BLOG_CATEGORIES.map((cat) => (
                          <button
                            key={cat.slug}
                            onClick={() => handleCategoryNav(cat.slug)}
                            className="w-full text-left py-2 px-3 text-xs font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-between"
                          >
                            <span>{cat.name}</span>
                            <ArrowRight className="h-3 w-3 text-gray-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

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
                    className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-400'}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Mobile Footer CTAs & Dedicated Theme Toggle */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2.5">
            {/* Dedicated Theme Toggle Button (Mobile) */}
            <button
              onClick={toggleTheme}
              className="w-full py-2.5 px-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex items-center justify-between text-xs font-bold transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-amber-500" />
                ) : (
                  <Moon className="h-4 w-4 text-gray-700" />
                )}
                <span>{theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
              </span>
              <span className="text-[10px] font-mono text-gray-500 uppercase">{theme}</span>
            </button>

            <button
              onClick={() => handleNav('contact')}
              className="w-full py-3 px-4 bg-black text-white hover:bg-gray-800 text-center rounded-2xl text-sm font-bold shadow-md transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
