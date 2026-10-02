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
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface BlogSectionProps {
  onSelectArticle?: (slug: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectArticle }) => {
  const { articles } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Set document title & SEO for Blog hub
  useEffect(() => {
    document.title = 'Engineering Insights & Technical Briefings | ORBIT-I (PVT) LTD';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore technical deep dives, cloud-native architecture, generative AI systems, and software engineering whitepapers from the ORBIT-I engineering team.'
      );
    }
  }, []);

  // Filter published articles
  const publishedArticles = useMemo(() => {
    return articles.filter((art) => art.status === 'published');
  }, [articles]);

  // Categories list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(publishedArticles.map((a) => a.category).filter(Boolean)));
    return ['All', ...cats];
  }, [publishedArticles]);

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

  // Filtered articles based on search, category, and tag
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
    <section id="blog" className="py-20 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Title & Subtitle */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-mono font-bold tracking-wider uppercase text-gray-800">
            <BookOpen className="h-3.5 w-3.5 text-black" />
            <span>Engineering Insights &amp; Architecture Briefings</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-tight">
            Architectural Thinking for Modern Enterprise.
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            In-depth engineering analyses, cloud-native patterns, Generative AI pipelines,
            and mission-critical software principles authored by the ORBIT-I technical leadership.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-6 bg-gray-50/80 p-6 sm:p-8 rounded-3xl border border-gray-200">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by keyword, architecture topic, tag, or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-2xl text-xs sm:text-sm text-black placeholder:text-gray-400 outline-none focus:border-black shadow-xs transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black font-bold p-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Total Results Count */}
            <div className="text-xs font-mono text-gray-500 self-center">
              Showing <span className="font-bold text-black">{filteredArticles.length}</span> published technical{' '}
              {filteredArticles.length === 1 ? 'article' : 'articles'}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedTag('All');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-black text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-200/70 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tags Cloud Pills */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-gray-200">
              <span className="text-[11px] font-mono uppercase text-gray-500 flex items-center gap-1">
                <Tag className="h-3 w-3" />
                <span>Filter by Tag:</span>
              </span>
              <button
                onClick={() => setSelectedTag('All')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                  selectedTag === 'All'
                    ? 'bg-black text-white font-bold'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-black'
                }`}
              >
                #all
              </button>
              {allTags.slice(0, 10).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTag(selectedTag === t ? 'All' : t)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                    selectedTag === t
                      ? 'bg-black text-white font-bold'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-black'
                  }`}
                >
                  #{t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Featured Hero Article Banner (Shown when no search/filters are active) */}
        {!searchQuery && selectedCategory === 'All' && selectedTag === 'All' && featuredArticle && (
          <div
            onClick={() => handleArticleClick(featuredArticle.slug)}
            className="group cursor-pointer bg-gray-950 text-white rounded-3xl overflow-hidden border border-gray-800 shadow-2xl hover:border-gray-600 transition-all grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left Cover Image */}
            <div className="lg:col-span-6 relative overflow-hidden bg-black flex items-center justify-center min-h-[300px] lg:min-h-[420px]">
              {featuredArticle.featuredImage ? (
                <img
                  src={featuredArticle.featuredImage}
                  alt={featuredArticle.imageAlt || featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <BookOpen className="h-16 w-16 text-gray-700" />
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 bg-emerald-500 text-black text-xs font-mono font-bold uppercase rounded-full shadow-lg">
                  Featured Insight
                </span>
              </div>
            </div>

            {/* Right Meta & Content */}
            <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                  <span className="text-emerald-400 font-bold">{featuredArticle.category}</span>
                  <span>·</span>
                  <span>{featuredArticle.publishedDate}</span>
                  <span>·</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-white font-mono">
                    {featuredArticle.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{featuredArticle.author}</div>
                    <div className="text-[11px] text-gray-400 font-mono">ORBIT-I Technical Team</div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Analysis</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Standard Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h3 className="text-xl font-bold text-black flex items-center gap-2">
              <Layers className="h-5 w-5 text-black" />
              <span>All Articles &amp; Technical Reports</span>
            </h3>
            <span className="text-xs font-mono text-gray-500">
              {filteredArticles.length} Articles
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mx-auto text-gray-600">
                <Search className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-black">No articles match your query</h4>
              <p className="text-xs text-gray-600 max-w-md mx-auto">
                Try searching for different keywords, resetting your category filters, or explore our full engineering archive.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedTag('All');
                }}
                className="px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(searchQuery || selectedCategory !== 'All' || selectedTag !== 'All'
                ? filteredArticles
                : standardArticles
              ).map((art) => (
                <article
                  key={art.id}
                  onClick={() => handleArticleClick(art.slug)}
                  className="group cursor-pointer bg-white border border-gray-200 hover:border-black rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Thumbnail Cover */}
                    <div className="relative h-48 bg-gray-900 overflow-hidden">
                      {art.featuredImage ? (
                        <img
                          src={art.featuredImage}
                          alt={art.imageAlt || art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                          <BookOpen className="h-10 w-10 text-gray-700" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-black/80 backdrop-blur-xs text-white text-[11px] font-mono font-medium rounded-full border border-white/20">
                          {art.category}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-gray-500">
                        <span>{art.publishedDate}</span>
                        <span>·</span>
                        <span>{art.readTime}</span>
                      </div>

                      <h4 className="text-lg font-bold text-black group-hover:text-emerald-700 transition-colors leading-snug line-clamp-2">
                        {art.title}
                      </h4>

                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>

                      {/* Tag Chips */}
                      {art.tags && art.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {art.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 bg-gray-100 rounded-md text-[10px] font-mono text-gray-700"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Author & CTA */}
                  <div className="p-6 pt-0 border-t border-gray-100 mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-gray-500 font-medium truncate max-w-[180px]">
                      By {art.author.split('(')[0].trim()}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-black group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                      <span>Read</span>
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Enterprise Technical Consultation CTA */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-bold text-black tracking-tight">
              Looking to implement these enterprise architecture patterns?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              ORBIT-I architects and deploys custom AI pipelines, zero-trust cloud infrastructure,
              and high-throughput distributed systems for global organizations.
            </p>
          </div>

          <a
            href="#contact"
            className="px-8 py-3.5 bg-black text-white hover:bg-gray-800 rounded-full text-xs font-bold whitespace-nowrap shadow-lg hover:shadow-xl transition-all"
          >
            Initiate Architectural Consultation
          </a>
        </div>
      </div>
    </section>
  );
};
