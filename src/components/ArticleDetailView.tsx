import React, { useEffect, useState, useMemo } from 'react';
import { useCms, ContentArticle } from '../context/CmsContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Copy,
  Check,
  Tag,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Globe,
  ExternalLink,
  ChevronRight,
  Layers,
} from 'lucide-react';

interface ArticleDetailViewProps {
  slug: string;
  onBackToBlog?: () => void;
  onSelectArticle?: (slug: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  slug,
  onBackToBlog,
  onSelectArticle,
}) => {
  const { articles } = useCms();
  const [remoteArticle, setRemoteArticle] = useState<ContentArticle | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Find article in local CMS context state
  const localArticle = useMemo(() => {
    return articles.find((a) => a.slug === slug);
  }, [articles, slug]);

  // If not found in memory, fetch directly from backend endpoint
  useEffect(() => {
    if (!localArticle) {
      setLoading(true);
      fetch(`/api/articles/${slug}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setRemoteArticle(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [slug, localArticle]);

  const article = localArticle || remoteArticle;

  // Real-time SEO tags, OpenGraph, and Schema.org injection
  useEffect(() => {
    if (!article) return;

    // Document Title
    const ogTitle = article.metaTitle || `${article.title} | ORBIT-I Technical Briefing`;
    document.title = ogTitle;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', article.metaDescription || article.excerpt);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const currentUrl = article.canonicalUrl || `https://orbit-i.tech/blog/${article.slug}`;
    canonical.setAttribute('href', currentUrl);

    // OpenGraph Title
    let ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute('content', ogTitle);

    // OpenGraph Description
    let ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute('content', article.metaDescription || article.excerpt);

    // OpenGraph Image
    let ogImgEl = document.querySelector('meta[property="og:image"]');
    if (ogImgEl && article.featuredImage) {
      ogImgEl.setAttribute('content', article.featuredImage);
    }

    // JSON-LD Schema.org Structured Data
    const schemaScriptId = 'orbit-article-jsonld';
    let schemaScript = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = schemaScriptId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: article.title,
      description: article.excerpt,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'ORBIT-I (PVT) LTD',
        logo: {
          '@type': 'ImageObject',
          url: 'https://orbit-i.tech/orbit-circular-logo.png',
        },
      },
      datePublished: article.publishedDate,
      dateModified: article.lastModified || article.publishedDate,
      image: article.featuredImage ? [article.featuredImage] : [],
      articleSection: article.category,
      keywords: article.tags?.join(', ') || article.focusKeywords,
      url: currentUrl,
    };

    schemaScript.text = JSON.stringify(structuredData);

    return () => {
      // Cleanup schema script on unmount
      const el = document.getElementById(schemaScriptId);
      if (el) el.remove();
    };
  }, [article]);

  // Related articles
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return articles
      .filter((a) => a.id !== article.id && a.status === 'published')
      .filter((a) => a.category === article.category || a.tags.some((t) => article.tags.includes(t)))
      .slice(0, 3);
  }, [articles, article]);

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/#article/${article?.slug}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleShare = (platform: 'linkedin' | 'twitter' | 'whatsapp') => {
    if (!article) return;
    const url = encodeURIComponent(`${window.location.origin}/#article/${article.slug}`);
    const title = encodeURIComponent(article.title);

    let shareUrl = '';
    if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleBack = () => {
    if (onBackToBlog) {
      onBackToBlog();
    } else {
      window.history.pushState(null, '', '/blog');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRelated = (relatedSlug: string) => {
    if (onSelectArticle) {
      onSelectArticle(relatedSlug);
    } else {
      window.history.pushState(null, '', `/article/${relatedSlug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">
            Fetching verified engineering brief...
          </p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen py-24 bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-10 text-center space-y-4">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto" />
          <h2 className="text-2xl font-bold text-black">Article Not Found</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            The technical report or insights document for slug <code className="bg-gray-200 px-1 py-0.5 rounded font-mono">/{slug}</code> does not exist or has been archived.
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-2.5 bg-black text-white rounded-full text-xs font-bold"
          >
            Return to Insights Archive
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="py-16 sm:py-20 bg-white text-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-black group transition-colors"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Insights Hub</span>
          </button>

          <nav className="flex items-center gap-1.5 text-[11px] font-mono text-gray-500 overflow-x-auto">
            <a href="#home" className="hover:text-black">
              Home
            </a>
            <ChevronRight className="h-3 w-3 text-gray-400 shrink-0" />
            <a href="#blog" className="hover:text-black">
              Insights
            </a>
            <ChevronRight className="h-3 w-3 text-gray-400 shrink-0" />
            <span className="text-black font-semibold truncate max-w-[200px]">{article.category}</span>
          </nav>
        </div>

        {/* Article Header & Metadata */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 bg-black text-white text-xs font-mono font-bold uppercase rounded-full tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-gray-400">·</span>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
              <Calendar className="h-3.5 w-3.5" />
              <span>{article.publishedDate}</span>
            </div>
            <span className="text-xs text-gray-400">·</span>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono">
              <Clock className="h-3.5 w-3.5" />
              <span>{article.readTime}</span>
            </div>
            {article.seoScore && (
              <>
                <span className="text-xs text-gray-400">·</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Verified Architecture</span>
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Excerpt Lead */}
          {article.excerpt && (
            <p className="text-lg sm:text-xl text-gray-600 font-serif italic border-l-4 border-black pl-5 py-1 leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Author Card & Social Share Bar */}
          <div className="pt-4 pb-4 border-y border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm font-mono shadow-sm">
                {article.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-bold text-black">{article.author}</div>
                <div className="text-xs text-gray-500 font-mono">
                  ORBIT-I (PVT) LTD Engineering Board
                </div>
              </div>
            </div>

            {/* Social Share Suite */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-gray-200"
                title="Copy Article URL"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedLink ? 'Copied Link!' : 'Copy Link'}</span>
              </button>

              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 bg-gray-100 hover:bg-[#0077b5] hover:text-white rounded-xl text-gray-700 transition-colors"
                title="Share to LinkedIn"
              >
                <Share2 className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => handleShare('twitter')}
                className="p-2 bg-gray-100 hover:bg-black hover:text-white rounded-xl text-gray-700 transition-colors"
                title="Share to X"
              >
                <Globe className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Cover Asset */}
        {article.featuredImage && (
          <figure className="rounded-3xl overflow-hidden border border-gray-200 shadow-xl bg-gray-950">
            <img
              src={article.featuredImage}
              alt={article.imageAlt || article.title}
              className="w-full max-h-[500px] object-cover"
            />
            {article.imageAlt && (
              <figcaption className="text-xs font-mono text-gray-400 py-3 px-6 bg-gray-900 border-t border-gray-800 text-center">
                {article.imageAlt}
              </figcaption>
            )}
          </figure>
        )}

        {/* Article Body Content */}
        <div
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6 prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-black prose-p:leading-relaxed prose-a:text-black prose-a:font-semibold prose-a:underline prose-a:decoration-emerald-500 hover:prose-a:text-emerald-700 prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-xl prose-code:font-mono prose-code:text-emerald-700 prose-pre:bg-gray-950 prose-pre:text-emerald-400 prose-pre:rounded-2xl prose-pre:border prose-pre:border-gray-800 prose-img:rounded-2xl prose-img:border prose-img:border-gray-200"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags Section */}
        {article.tags && article.tags.length > 0 && (
          <div className="pt-8 border-t border-gray-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-gray-500">
              <Tag className="h-3.5 w-3.5" />
              <span>Categorized Topics &amp; Architecture Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 bg-gray-100 hover:bg-black hover:text-white rounded-xl text-xs font-mono text-gray-800 transition-colors cursor-pointer"
                  onClick={handleBack}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-lg font-mono shrink-0 shadow-md">
              {article.author.slice(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-black">{article.author}</h4>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-mono font-bold">
                  Verified Executive
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Executive Leadership &amp; Engineering Directorate at ORBIT-I (PVT) LTD.
                Specializing in distributed computing, generative AI pipelines, and enterprise-scale software architecture.
              </p>
            </div>
          </div>
        </div>

        {/* Related Technical Articles */}
        {relatedArticles.length > 0 && (
          <div className="pt-10 border-t border-gray-200 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-black flex items-center gap-2">
                <Layers className="h-5 w-5 text-black" />
                <span>Related Engineering Briefings</span>
              </h3>
              <button
                onClick={handleBack}
                className="text-xs font-bold text-black hover:underline flex items-center gap-1"
              >
                <span>View all insights</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => handleSelectRelated(rel.slug)}
                  className="group cursor-pointer bg-white border border-gray-200 hover:border-black rounded-2xl p-5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-600">
                      {rel.category}
                    </span>
                    <h5 className="text-sm font-bold text-black group-hover:text-emerald-700 leading-snug line-clamp-2">
                      {rel.title}
                    </h5>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-400 mt-4">
                    <span>{rel.readTime}</span>
                    <span className="font-bold text-black group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Read &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Consultation Callout */}
        <div className="bg-black text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-2xl">
          <span className="px-3.5 py-1 bg-white/10 text-emerald-400 rounded-full text-xs font-mono uppercase tracking-wider font-bold">
            Enterprise Architecture Services
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Need Expert Architectural Guidance on Your Tech Stack?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Our engineering team designs, audits, and deploys high-scale software infrastructures,
            AI pipelines, and secure cloud platforms tailored to your business needs.
          </p>
          <div className="pt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black hover:bg-gray-200 rounded-full text-xs font-bold transition-all shadow-lg"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
