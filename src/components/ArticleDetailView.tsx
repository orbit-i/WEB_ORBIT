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
  ChevronRight,
  ThumbsUp,
  MessageSquare,
  Send,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  ShieldCheck,
} from 'lucide-react';

interface CommentItem {
  id: string;
  name: string;
  avatar: string;
  date: string;
  text: string;
  likes: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
}

interface ArticleDetailViewProps {
  slug: string;
  onBackToBlog?: () => void;
  onSelectArticle?: (slug: string) => void;
  onSelectCategory?: (category: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  slug,
  onBackToBlog,
  onSelectArticle,
  onSelectCategory,
}) => {
  const { articles } = useCms();
  const [remoteArticle, setRemoteArticle] = useState<ContentArticle | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Comment composer state
  const [isCommenting, setIsCommenting] = useState(false);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Initial comments matching user provided screenshot style
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c-1',
      name: 'Mike David',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      date: '27 Dec, 2026 at 7:36 am',
      text: 'I really found this architectural breakdown insightful. Especially how connection pool reuse and strict types eliminate cascading failovers under concurrent enterprise spikes.',
      likes: 7,
      commentsCount: 3,
      sharesCount: 1,
    },
    {
      id: 'c-2',
      name: 'Rabeka Benfigar',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      date: '27 Dec, 2026 at 10:15 pm',
      text: 'The approach to schema validation across client and server layers completely transformed our deployment speed and test coverage. Super clean presentation!',
      likes: 5,
      commentsCount: 2,
      sharesCount: 0,
    },
    {
      id: 'c-3',
      name: 'Tim Hudson',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      date: '28 Dec, 2026 at 12:48 am',
      text: 'Clean, elegant implementation and very practical for real-world production environments. Would love to see more whitepapers on this.',
      likes: 9,
      commentsCount: 5,
      sharesCount: 1,
    },
  ]);

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

    const ogTitle = article.metaTitle || `${article.title} | ORBIT-I Technical Briefing`;
    document.title = ogTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', article.metaDescription || article.excerpt);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const currentUrl = article.canonicalUrl || `https://orbit-i.tech/article/${article.slug}`;
    canonical.setAttribute('href', currentUrl);

    // OpenGraph
    let ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute('content', ogTitle);

    let ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute('content', article.metaDescription || article.excerpt);

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
      const el = document.getElementById(schemaScriptId);
      if (el) el.remove();
    };
  }, [article]);

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/article/${article?.slug}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleShare = (platform: 'linkedin' | 'twitter' | 'whatsapp' | 'pinterest') => {
    if (!article) return;
    const url = encodeURIComponent(`${window.location.origin}/article/${article.slug}`);
    const title = encodeURIComponent(article.title);

    let shareUrl = '';
    if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
    } else if (platform === 'pinterest') {
      shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`;
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

  const handleCategoryBreadcrumb = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    if (onBackToBlog) {
      onBackToBlog();
    } else {
      window.history.pushState(null, '', `/blog?category=${encodeURIComponent(cat)}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const isLiked = !c.isLiked;
          return {
            ...c,
            isLiked,
            likes: isLiked ? c.likes + 1 : c.likes - 1,
          };
        }
        return c;
      })
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newEntry: CommentItem = {
      id: `c-${Date.now()}`,
      name: newCommentName.trim(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        newCommentName
      )}`,
      date: 'Just now',
      text: newCommentText.trim(),
      likes: 1,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: true,
    };

    setComments([newEntry, ...comments]);
    setNewCommentName('');
    setNewCommentText('');
    setCommentSuccess(true);
    setIsCommenting(false);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
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
        <div className="max-w-md w-full bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-sm">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto" />
          <h2 className="text-2xl font-bold text-black">Article Not Found</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            The technical report or insights document for slug{' '}
            <code className="bg-gray-200 px-1 py-0.5 rounded font-mono">/{slug}</code> does not exist
            or has been archived.
          </p>
          <button
            onClick={handleBack}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-bold transition-colors"
          >
            Return to Insights Archive
          </button>
        </div>
      </div>
    );
  }

  // Get author avatar or fallback to Abdul Samad picture
  const authorAvatar =
    article.author?.toLowerCase().includes('samad') || !article.author
      ? '/AbdulSamad.jpeg'
      : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(article.author)}`;

  return (
    <article className="py-12 sm:py-16 bg-[#fafbfc] text-gray-900 min-h-screen selection:bg-blue-600 selection:text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Minimalist Breadcrumb (matches: Blog > Category) */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200/80">
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-500">
            <button
              onClick={handleBack}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Blog
            </button>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <button
              onClick={() => handleCategoryBreadcrumb(article.category)}
              className="text-gray-900 hover:text-blue-600 font-semibold transition-colors cursor-pointer truncate max-w-[240px]"
            >
              {article.category}
            </button>
          </nav>

          <button
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back to Archive</span>
          </button>
        </div>

        {/* Featured Cover Image (Proportional, Centered, Elegant - Not Blown Out) */}
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-900 shadow-md border border-gray-200 aspect-[16/10] sm:aspect-[16/9]">
            <img
              src={
                article.featuredImage ||
                'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
              }
              alt={article.imageAlt || article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </div>
        </div>

        {/* Author Avatar, Name & Meta Header (Centered underneath image matching layout) */}
        <div className="text-center space-y-3 pt-2">
          {/* Centered Author Circle Avatar */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white shadow-md mx-auto bg-gray-200">
            <img
              src={authorAvatar}
              alt={article.author}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/AbdulSamad.jpeg';
              }}
            />
          </div>

          {/* Author Name */}
          <div className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
            {article.author}
          </div>

          {/* Article Title (Large Editorial Typography) */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight max-w-3xl mx-auto px-2">
            {article.title}
          </h1>

          {/* Date & Read Time */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 font-mono">
            <span>{article.publishedDate}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Main Editorial Content & Pullquote */}
        <div className="max-w-3xl mx-auto space-y-6 pt-4">
          {/* Excerpt Lead / Intro */}
          {article.excerpt && (
            <p className="text-base sm:text-lg text-gray-700 font-serif leading-relaxed text-center sm:text-left italic border-l-4 border-amber-500 pl-4 py-1.5 bg-amber-50/50 rounded-r-xl">
              {article.excerpt}
            </p>
          )}

          {/* Body Content */}
          <div
            className="prose prose-base sm:prose-lg max-w-none text-gray-800 leading-relaxed space-y-5 prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2.5 prose-blockquote:px-5 prose-blockquote:italic prose-blockquote:rounded-r-xl prose-code:font-mono prose-code:text-blue-700 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase text-gray-400 font-bold flex items-center gap-1">
                <Tag className="h-3 w-3" />
                <span>Tags:</span>
              </span>
              {article.tags.map((t) => (
                <span
                  key={t}
                  onClick={() => handleCategoryBreadcrumb(article.category)}
                  className="px-3 py-1 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded-full text-xs font-mono text-gray-700 transition-colors cursor-pointer"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Two-Column Bottom Area: Left (Share + Comments) | Right (Newsletter Widget) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-gray-200 max-w-5xl mx-auto">
          {/* LEFT ZONE: Share Bar + Comments Section */}
          <div className="lg:col-span-8 space-y-8">
            {/* Share This Post Bar (matches: Share this post with round icons) */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-gray-800 uppercase tracking-wider font-mono">
                Share this post
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors border border-gray-200 relative group"
                  title="Copy Link"
                  aria-label="Copy Link"
                >
                  {copiedLink ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copiedLink && (
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-2 py-0.5 rounded whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>

                {/* Pinterest */}
                <button
                  onClick={() => handleShare('pinterest')}
                  className="w-9 h-9 rounded-full bg-red-50 hover:bg-red-600 text-red-600 hover:text-white flex items-center justify-center transition-colors border border-red-200 text-xs font-bold"
                  title="Share to Pinterest"
                  aria-label="Share to Pinterest"
                >
                  P
                </button>

                {/* LinkedIn */}
                <button
                  onClick={() => handleShare('linkedin')}
                  className="w-9 h-9 rounded-full bg-blue-50 hover:bg-[#0077b5] text-[#0077b5] hover:text-white flex items-center justify-center transition-colors border border-blue-200"
                  title="Share to LinkedIn"
                  aria-label="Share to LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </button>

                {/* Twitter / X */}
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-black text-gray-800 hover:text-white flex items-center justify-center transition-colors border border-gray-300"
                  title="Share to X"
                  aria-label="Share to Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </button>

                {/* WhatsApp */}
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white flex items-center justify-center transition-colors border border-emerald-200"
                  title="Share via WhatsApp"
                  aria-label="Share via WhatsApp"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Comments Header Bar (matches: Gold Comment Button + Note: You must login for comment) */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCommenting(!isCommenting)}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{isCommenting ? 'Cancel Comment' : 'Comment'}</span>
                </button>
                <span className="text-xs text-gray-500 italic">
                  Note: Verified community discussion
                </span>
              </div>

              {commentSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold border border-emerald-200 flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Thank you! Your comment has been published to the thread.</span>
                </div>
              )}

              {/* Interactive Comment Composer Form */}
              {isCommenting && (
                <form
                  onSubmit={handleAddComment}
                  className="p-4 bg-white rounded-2xl border border-amber-300 shadow-sm space-y-3 animate-in fade-in"
                >
                  <div className="text-xs font-bold text-gray-900">Leave a Verified Response</div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name / Organization"
                      value={newCommentName}
                      onChange={(e) => setNewCommentName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share your thoughts on this architecture briefing..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:outline-none focus:border-amber-500 leading-relaxed"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCommenting(false)}
                      className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      Dismiss
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
                    >
                      <Send className="h-3 w-3" />
                      <span>Post Comment</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Comments Feed (matches Mike David, Rabeka Benfigar, Tim Hudson layout) */}
              <div className="space-y-3.5">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-2.5 transition-all hover:border-gray-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
                        <img
                          src={comment.avatar}
                          alt={comment.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                              comment.name
                            )}`;
                          }}
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900">{comment.name}</div>
                        <div className="text-[11px] text-gray-400 font-mono">{comment.date}</div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-700 leading-relaxed pl-13">
                      {comment.text}
                    </p>

                    {/* Social interaction metrics: Like, Comment, Share */}
                    <div className="pl-13 pt-1 flex items-center gap-4 text-[11px] text-gray-500 font-medium">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className={`inline-flex items-center gap-1 hover:text-amber-600 transition-colors ${
                          comment.isLiked ? 'text-amber-600 font-bold' : ''
                        }`}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span>{comment.likes} Like</span>
                      </button>

                      <span className="text-gray-300">·</span>

                      <button
                        onClick={() => setIsCommenting(true)}
                        className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>{comment.commentsCount} Comment</span>
                      </button>

                      <span className="text-gray-300">·</span>

                      <button
                        onClick={handleCopyLink}
                        className="inline-flex items-center gap-1 hover:text-gray-900 transition-colors"
                      >
                        <Share2 className="h-3.5 w-3.5" />
                        <span>{comment.sharesCount} Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT ZONE: Subscribe to Newsletter Card (Matches exact screenshot layout) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-4 sticky top-28">
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-extrabold text-gray-900 tracking-tight">
                  Subscribe to newsletter
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Subscribe to receive the latest blog posts to your inbox every week.
                </p>
              </div>

              {newsletterSubscribed ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold border border-emerald-200 flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Subscribed! You will receive weekly engineering briefings.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Gold Amber Subscribe Button (matches screenshot) */}
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    SUBSCRIBE
                  </button>

                  <p className="text-[10px] text-gray-400 text-center leading-normal">
                    By subscribing you agree with our{' '}
                    <span className="text-gray-600 underline">Privacy Policy</span>.
                  </p>
                </form>
              )}

              {/* Author Leadership Quick Badge */}
              <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 shrink-0">
                  <img
                    src="/AbdulSamad.jpeg"
                    alt="Abdul Samad Rind"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Abdul Samad Rind</div>
                  <div className="text-[10px] text-gray-500 font-mono">Founder &amp; CEO, ORBIT-I</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
