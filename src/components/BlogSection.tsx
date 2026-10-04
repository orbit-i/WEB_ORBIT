import React, { useState, useMemo, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import {
  Search,
  Tag,
  Clock,
  Calendar,
  User,
  ArrowRight,
  BookOpen,
  Filter,
  Sparkles,
  Layers,
  ChevronRight,
  Share2,
} from 'lucide-react';
import { SeoHead } from './common/SeoHead';

interface BlogSectionProps {
  onSelectArticle?: (slug: string) => void;
  initialCategory?: string;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onSelectArticle,
  initialCategory = 'All',
}) => {
  const { articles } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Filter published articles
  const publishedArticles = useMemo(() => {
    return articles.filter((art) => art.status === 'published');
  }, [articles]);

  // Categories list with count
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: publishedArticles.length };
    publishedArticles.forEach((a) => {
      const cat = a.category || 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [publishedArticles]);

  const categories = useMemo(() => {
    return Object.keys(categoryCounts);
  }, [categoryCounts]);

  // Tags list
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    publishedArticles.forEach((a) => {
      if (Array.isArray(a.tags)) {
        a.tags.forEach((t) => tagSet.add(t));
      }
    });
    return Array.from(tagSet);
  }, [publishedArticles]);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return publishedArticles.filter((art) => {
      const matchesCategory =
        selectedCategory === 'All' || art.category === selectedCategory;

      const matchesTag =
        selectedTag === 'All' || (art.tags && art.tags.includes(selectedTag));

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        art.title.toLowerCase().includes(query) ||
        art.excerpt.toLowerCase().includes(query) ||
        art.author.toLowerCase().includes(query) ||
        (art.tags && art.tags.some((t) => t.toLowerCase().includes(query))) ||
        (art.focusKeywords && art.focusKeywords.toLowerCase().includes(query));

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [publishedArticles, selectedCategory, selectedTag, searchQuery]);

  const featuredArticle = publishedArticles.length > 0 ? publishedArticles[0] : null;
  const standardArticles = filteredArticles.filter(
    (a) => !featuredArticle || a.id !== featuredArticle.id || searchQuery || selectedCategory !== 'All' || selectedTag !== 'All'
  );

  const handleArticleClick = (slug: string) => {
    if (onSelectArticle) {
      onSelectArticle(slug);
    } else {
      window.history.pushState(null, '', `/article/${slug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="blog" className="py-16 md:py-24 bg-[#fafbfc] text-gray-900 min-h-screen">
      <SeoHead
        title="Engineering Insights & Technical Briefings"
        description="Explore technical deep dives, cloud-native architecture, WordPress headless CMS, Generative AI pipelines, and software whitepapers from the ORBIT-I engineering leadership."
        keywords={['ORBIT-I Engineering Blog', 'Software Architecture', 'Web Development Blog', 'Cloud DevOps', 'Applied AI']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Dignified Header Section */}
        <div className="max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-bold tracking-wider uppercase text-blue-700">
            <BookOpen className="h-3.5 w-3.5 text-blue-600" />
            <span>ORBIT-I Publications &amp; Engineering Research</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Architectural Insights &amp; Technical Reports
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            In-depth architectural briefings, software patterns, WordPress &amp; custom coding standards, cloud resilience guides, and production retrospectives authored by the ORBIT-I engineering team.
          </p>
        </div>

        {/* Categories Submenu Bar & Search */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Categories Submenu Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedTag('All');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {categoryCounts[cat] || 0}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-blue-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Tags Filter Row (if tags available) */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-gray-100 text-xs">
              <span className="text-[11px] font-mono uppercase text-gray-400 flex items-center gap-1 font-semibold">
                <Tag className="h-3 w-3" />
                <span>Tags:</span>
              </span>
              <button
                onClick={() => setSelectedTag('All')}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono transition-colors ${
                  selectedTag === 'All'
                    ? 'bg-black text-white font-bold'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                #all
              </button>
              {allTags.slice(0, 8).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTag(selectedTag === t ? 'All' : t)}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-mono transition-colors ${
                    selectedTag === t
                      ? 'bg-black text-white font-bold'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  #{t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Featured Hero Article Banner (Proportional & Dignified - Not Oversized) */}
        {!searchQuery && selectedCategory === 'All' && selectedTag === 'All' && featuredArticle && (
          <div
            onClick={() => handleArticleClick(featuredArticle.slug)}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-blue-600 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Featured Image Column (Fixed clean aspect ratio, no stretching) */}
            <div className="lg:col-span-5 relative overflow-hidden bg-gray-900 aspect-[16/10] lg:aspect-auto min-h-[220px]">
              {featuredArticle.featuredImage ? (
                <img
                  src={featuredArticle.featuredImage}
                  alt={featuredArticle.imageAlt || featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-gray-900 to-blue-950 text-white">
                  <BookOpen className="h-12 w-12 text-blue-400" />
                </div>
              )}
              <div className="absolute top-3.5 left-3.5">
                <span className="px-3 py-1 bg-blue-600 text-white text-[11px] font-mono font-bold uppercase rounded-full shadow-md">
                  Featured Insight
                </span>
              </div>
            </div>

            {/* Featured Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-xs font-mono text-gray-500">
                  <span className="text-blue-600 font-bold">{featuredArticle.category}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{featuredArticle.publishedDate}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{featuredArticle.readTime}</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center font-mono shadow-xs">
                    {featuredArticle.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">{featuredArticle.author}</div>
                    <div className="text-[10px] text-gray-400 font-mono">ORBIT-I Editorial</div>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Read Briefing</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Standard Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-600" />
              <span>Articles &amp; Architecture Briefings</span>
            </h3>
            <span className="text-xs font-mono text-gray-500">
              {filteredArticles.length} Published
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-500">
                <Search className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-gray-900">No articles found</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                No published articles matched your search query or selected category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedTag('All');
                }}
                className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchQuery || selectedCategory !== 'All' || selectedTag !== 'All'
                ? filteredArticles
                : standardArticles
              ).map((art) => (
                <article
                  key={art.id}
                  onClick={() => handleArticleClick(art.slug)}
                  className="group cursor-pointer bg-white border border-gray-200 hover:border-blue-600 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    {/* Clean Proportional Image (aspect 16:9, max height 210px) */}
                    <div className="relative aspect-[16/9] max-h-52 bg-gray-900 overflow-hidden">
                      {art.featuredImage ? (
                        <img
                          src={art.featuredImage}
                          alt={art.imageAlt || art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-gray-900 to-blue-900 text-white">
                          <BookOpen className="h-8 w-8 text-blue-300" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono font-bold uppercase rounded-md">
                          {art.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="px-5 pt-1 space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-gray-500">
                        <span>{art.publishedDate}</span>
                        <span>·</span>
                        <span>{art.readTime}</span>
                      </div>

                      <h4 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h4>

                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 pb-5 pt-4 mt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-800 text-[10px] font-bold flex items-center justify-center font-mono">
                        {art.author.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-gray-700 font-medium text-[11px] truncate max-w-[130px]">
                        {art.author.split(' ')[0]}
                      </span>
                    </div>

                    <span className="text-blue-600 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
                      <span>Read</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
