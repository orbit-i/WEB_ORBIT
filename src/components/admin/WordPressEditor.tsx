import React, { useState, useRef, useMemo } from 'react';
import { ContentArticle, useCms } from '../../context/CmsContext';
import { ImageUploader } from './ImageUploader';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Table,
  Minus,
  Eye,
  Check,
  Save,
  FileText,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Layers,
  User,
  Tag,
  Search,
  Globe,
  Smartphone,
  Monitor,
  CheckCircle2,
  AlertCircle,
  X,
  Plus,
} from 'lucide-react';

interface WordPressEditorProps {
  article: ContentArticle;
  onSave: (article: ContentArticle) => void;
  onCancel: () => void;
}

const POPULAR_TAGS = [
  'artificial-intelligence',
  'llm-orchestration',
  'microservices',
  'cloud-native',
  'typescript',
  'cybersecurity',
  'devops',
  'scalability',
  'api-design',
  'enterprise-software',
];

export const WordPressEditor: React.FC<WordPressEditorProps> = ({
  article,
  onSave,
  onCancel,
}) => {
  const { mediaAssets, articles } = useCms();

  const [formData, setFormData] = useState<ContentArticle>({
    ...article,
    metaTitle: article.metaTitle || article.title || '',
    metaDescription: article.metaDescription || article.excerpt || '',
    focusKeywords: article.focusKeywords || '',
    canonicalUrl: article.canonicalUrl || `https://orbit-i.tech/blog/${article.slug || ''}`,
    imageAlt: article.imageAlt || article.title || 'Technical illustration',
  });

  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual');
  const [tagInput, setTagInput] = useState('');
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkForm, setLinkForm] = useState({ url: 'https://', text: '', newTab: true, noFollow: false });
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageForm, setImageForm] = useState({ url: '', alt: '', caption: '' });
  const [serpDevice, setSerpDevice] = useState<'desktop' | 'mobile'>('desktop');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Available categories pooled from existing articles + defaults
  const availableCategories = useMemo(() => {
    const defaultCats = [
      'Artificial Intelligence & ML',
      'Software Architecture',
      'Web & Mobile Engineering',
      'Cloud Infrastructure & DevOps',
      'Corporate Governance',
      'Cybersecurity & Compliance',
    ];
    const extracted = articles.map((a) => a.category).filter(Boolean);
    return Array.from(new Set([...defaultCats, ...extracted, formData.category])).filter(Boolean);
  }, [articles, formData.category]);

  // Word count & Reading time calculation
  const wordCount = formData.content
    ? formData.content.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length
    : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Live SEO Score & Checklist
  const seoChecklist = useMemo(() => {
    const kw = (formData.focusKeywords || '').toLowerCase().trim();
    const title = (formData.title || '').toLowerCase();
    const metaTitle = (formData.metaTitle || '').toLowerCase();
    const metaDesc = (formData.metaDescription || '').toLowerCase();
    const content = (formData.content || '').toLowerCase();
    const excerpt = (formData.excerpt || '').toLowerCase();

    const hasKeywordInTitle = kw ? title.includes(kw) || metaTitle.includes(kw) : false;
    const hasKeywordInMeta = kw ? metaDesc.includes(kw) || excerpt.includes(kw) : false;
    const hasKeywordInBody = kw ? content.includes(kw) : false;
    const hasGoodLength = wordCount >= 300;
    const hasSubheadings = /<h[2-4]/i.test(formData.content || '');
    const hasImagesWithAlt = /<img[^>]+alt=["'][^"']+["']/i.test(formData.content || '') || !!formData.imageAlt;
    const hasLinks = /<a[^>]+href=/i.test(formData.content || '');
    const hasTags = formData.tags && formData.tags.length >= 2;
    const hasMetaDesc = (formData.metaDescription || '').length >= 100 && (formData.metaDescription || '').length <= 165;
    const hasValidSlug = /^[a-z0-9-]+$/.test(formData.slug);

    let score = 0;
    if (hasKeywordInTitle) score += 20;
    if (hasKeywordInMeta) score += 15;
    if (hasKeywordInBody) score += 15;
    if (hasGoodLength) score += 15;
    if (hasSubheadings) score += 10;
    if (hasImagesWithAlt) score += 10;
    if (hasLinks) score += 5;
    if (hasTags) score += 5;
    if (hasMetaDesc) score += 5;

    return {
      score: Math.min(100, score),
      checks: [
        { label: 'Focus keyword in Title / Meta Title', passed: hasKeywordInTitle, points: 20 },
        { label: 'Focus keyword in Meta Description', passed: hasKeywordInMeta, points: 15 },
        { label: 'Focus keyword in Article Body Content', passed: hasKeywordInBody, points: 15 },
        { label: 'Content Word Count >= 300 words', passed: hasGoodLength, points: 15 },
        { label: 'Structured Headings (H2 / H3 blocks)', passed: hasSubheadings, points: 10 },
        { label: 'Featured Image has descriptive Alt text', passed: hasImagesWithAlt, points: 10 },
        { label: 'Article includes Internal / External Links', passed: hasLinks, points: 5 },
        { label: 'Categorized with at least 2 relevant tags', passed: hasTags, points: 5 },
        { label: 'Meta Description length (100 - 165 chars)', passed: hasMetaDesc, points: 5 },
        { label: 'Clean SEO Permalink slug (kebab-case)', passed: hasValidSlug, points: 0 },
      ],
    };
  }, [formData, wordCount]);

  // Insert HTML tag into content
  const insertFormatting = (tagOpen: string, tagClose: string, defaultText = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = formData.content || '';
    const selectedText = currentText.substring(start, end) || defaultText;

    const updatedText =
      currentText.substring(0, start) +
      tagOpen +
      selectedText +
      tagClose +
      currentText.substring(end);

    setFormData({ ...formData, content: updatedText });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + tagOpen.length,
        start + tagOpen.length + selectedText.length
      );
    }, 10);
  };

  const handleOpenLinkModal = () => {
    const textarea = textareaRef.current;
    const selectedText = textarea
      ? (formData.content || '').substring(textarea.selectionStart, textarea.selectionEnd)
      : '';
    setLinkForm({
      url: 'https://',
      text: selectedText || 'explore more',
      newTab: true,
      noFollow: false,
    });
    setIsLinkModalOpen(true);
  };

  const handleInsertLinkConfirm = () => {
    if (!linkForm.url.trim()) return;
    const relParts = ['noopener', 'noreferrer'];
    if (linkForm.noFollow) relParts.push('nofollow');
    const targetAttr = linkForm.newTab ? ' target="_blank"' : '';
    const relAttr = ` rel="${relParts.join(' ')}"`;
    const linkTag = `<a href="${linkForm.url}"${targetAttr}${relAttr} class="text-black font-semibold underline decoration-emerald-500 hover:text-emerald-700">`;

    insertFormatting(linkTag, '</a>', linkForm.text || 'link');
    setIsLinkModalOpen(false);
  };

  const handleOpenImageModal = () => {
    setImageForm({ url: '', alt: '', caption: '' });
    setIsImageModalOpen(true);
  };

  const handleInsertImageConfirm = () => {
    if (!imageForm.url.trim()) return;
    const altText = imageForm.alt.trim() || formData.title || 'Illustration';
    const figureHtml = `\n<figure class="my-6 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">\n  <img src="${imageForm.url}" alt="${altText}" class="w-full max-h-96 object-cover" />\n  ${
      imageForm.caption ? `<figcaption class="text-xs text-center text-gray-500 py-2.5 px-4 bg-white border-t border-gray-100 font-mono">${imageForm.caption}</figcaption>` : ''
    }\n</figure>\n`;
    insertFormatting(figureHtml, '');
    setIsImageModalOpen(false);
  };

  const handleInsertTable = () => {
    const tableHtml = `
<table class="w-full text-left border-collapse my-6 border border-gray-200 text-xs">
  <thead>
    <tr class="bg-gray-100 border-b border-gray-200">
      <th class="p-3 font-bold text-black">Architecture Tier</th>
      <th class="p-3 font-bold text-black">Key Capabilities</th>
      <th class="p-3 font-bold text-black">Target Latency / SLA</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-gray-100">
      <td class="p-3 font-medium">Edge Ingestion & Gateway</td>
      <td class="p-3">JWT Auth, Rate Limiting, TLS Termination</td>
      <td class="p-3 text-emerald-600 font-semibold">&lt; 15ms</td>
    </tr>
    <tr class="border-b border-gray-100">
      <td class="p-3 font-medium">Microservices Mesh</td>
      <td class="p-3">Event-Driven gRPC &amp; Asynchronous Workers</td>
      <td class="p-3 text-emerald-600 font-semibold">99.99% Uptime</td>
    </tr>
  </tbody>
</table>
`;
    insertFormatting(tableHtml, '');
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const cleanTag = tagInput.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    if (!formData.tags.includes(cleanTag)) {
      setFormData({ ...formData, tags: [...formData.tags, cleanTag] });
    }
    setTagInput('');
  };

  const handleSelectPopularTag = (t: string) => {
    if (!formData.tags.includes(t)) {
      setFormData({ ...formData, tags: [...formData.tags, t] });
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tagToRemove),
    });
  };

  const handleAddCustomCategory = () => {
    if (!newCategoryInput.trim()) return;
    const cleanCat = newCategoryInput.trim();
    setFormData({ ...formData, category: cleanCat });
    setNewCategoryInput('');
    setIsAddingCategory(false);
  };

  const handleAutoGenerateSlug = () => {
    const generated = (formData.title || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    setFormData({
      ...formData,
      slug: generated,
      canonicalUrl: `https://orbit-i.tech/blog/${generated}`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      readTime: `${readingTime} min read`,
      lastModified: new Date().toISOString().split('T')[0],
      seoScore: seoChecklist.score,
    });
  };

  return (
    <div className="bg-white border-2 border-black rounded-3xl overflow-hidden shadow-2xl animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="bg-gray-950 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg text-white">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                ORBIT-I Gutenberg &amp; SEO Engine
              </span>
              <span className="text-gray-500">·</span>
              <span className="text-[11px] text-gray-400 font-mono">
                {wordCount} words · {readingTime} min read
              </span>
              <span className="text-gray-500">·</span>
              <span
                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  seoChecklist.score >= 80
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : seoChecklist.score >= 50
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                SEO Score: {seoChecklist.score}/100
              </span>
            </div>
            <h3 className="text-base font-bold text-white tracking-tight truncate max-w-md">
              {formData.title || 'Untitled Post'}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/20"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Full Article Preview</span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-transparent hover:bg-white/10 text-gray-300 rounded-full text-xs font-semibold transition-colors"
          >
            Discard
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-white text-black hover:bg-gray-200 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Publish / Update Post</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12">
        {/* Main Content Area (8 Cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-gray-200">
          {/* Post Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Article Title (H1)
            </label>
            <input
              type="text"
              placeholder="e.g., Enterprise Generative AI Pipelines: Architecting Scalable LLM Systems"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full text-2xl sm:text-3xl font-extrabold text-black placeholder:text-gray-300 border-none outline-none focus:ring-0 px-0 py-2"
              required
            />
          </div>

          {/* Permalinks / Slug */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-200">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <span className="font-bold text-gray-800">Slug:</span>
              <span className="text-gray-400">orbit-i.tech/blog/</span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="post-slug-url"
                className="bg-transparent border-b border-gray-300 focus:border-black outline-none px-1 text-black font-mono font-medium flex-1 min-w-[140px]"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleAutoGenerateSlug}
              className="px-2.5 py-1 text-[11px] bg-white border border-gray-300 hover:border-black rounded-lg text-gray-700 font-mono transition-colors"
            >
              Generate from Title
            </button>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Article Excerpt &amp; Summary
            </label>
            <textarea
              rows={2}
              placeholder="Enter a compelling 1-2 sentence executive summary of this article..."
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-black outline-none leading-relaxed"
            />
          </div>

          {/* Editor Mode Tabs & Toolbar */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
            {/* Mode Switcher */}
            <div className="bg-gray-100 px-4 py-2 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setEditorMode('visual')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    editorMode === 'visual'
                      ? 'bg-white text-black shadow-xs'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Visual (WYSIWYG)
                </button>
                <button
                  type="button"
                  onClick={() => setEditorMode('code')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                    editorMode === 'code'
                      ? 'bg-white text-black shadow-xs'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  HTML Code View
                </button>
              </div>

              <div className="text-[11px] font-mono text-gray-500">
                HTML5 Semantic Typography
              </div>
            </div>

            {/* Rich Formatting Bar */}
            <div className="bg-white p-2.5 flex flex-wrap items-center gap-1 border-b border-gray-200">
              <button
                type="button"
                onClick={() => insertFormatting('<strong>', '</strong>', 'bold text')}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
                title="Bold (Ctrl+B)"
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<em>', '</em>', 'italic text')}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
                title="Italic (Ctrl+I)"
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<u>', '</u>', 'underlined text')}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
                title="Underline"
              >
                <Underline className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<del>', '</del>', 'struck text')}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
                title="Strikethrough"
              >
                <Strikethrough className="h-4 w-4" />
              </button>

              <span className="w-px h-5 bg-gray-200 mx-1"></span>

              <button
                type="button"
                onClick={() => insertFormatting('<h2 class="text-xl sm:text-2xl font-bold text-black mt-8 mb-4">', '</h2>', 'Section Heading')}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
                title="Heading 2"
              >
                <Heading2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<h3 class="text-lg font-bold text-gray-900 mt-6 mb-3">', '</h3>', 'Subsection Heading')}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
                title="Heading 3"
              >
                <Heading3 className="h-4 w-4" />
              </button>

              <span className="w-px h-5 bg-gray-200 mx-1"></span>

              <button
                type="button"
                onClick={() =>
                  insertFormatting('<ul class="list-disc pl-5 my-4 space-y-2 text-gray-800">\n  <li>', '</li>\n  <li>Second key point</li>\n</ul>', 'First key point')
                }
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
                title="Bulleted List"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  insertFormatting('<ol class="list-decimal pl-5 my-4 space-y-2 text-gray-800">\n  <li>', '</li>\n  <li>Next implementation step</li>\n</ol>', 'Initial phase')
                }
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </button>

              <span className="w-px h-5 bg-gray-200 mx-1"></span>

              <button
                type="button"
                onClick={() =>
                  insertFormatting('<blockquote class="border-l-4 border-black pl-4 py-2 italic my-6 text-gray-700 bg-gray-50 rounded-r-xl">', '</blockquote>', 'Insightful engineering quote or principle')
                }
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
                title="Blockquote"
              >
                <Quote className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  insertFormatting('<pre class="bg-gray-950 text-emerald-400 p-4 rounded-xl font-mono text-xs my-6 overflow-x-auto border border-gray-800"><code>', '</code></pre>', '// Type safe implementation logic\nconst serviceMesh = new EnterpriseOrchestrator();')
                }
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
                title="Code Block"
              >
                <Code className="h-4 w-4" />
              </button>

              <span className="w-px h-5 bg-gray-200 mx-1"></span>

              <button
                type="button"
                onClick={handleOpenLinkModal}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
                title="Insert Link with SEO rel / target"
              >
                <LinkIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleOpenImageModal}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
                title="Insert Image with Alt & Caption"
              >
                <ImageIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleInsertTable}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
                title="Insert Specification Table"
              >
                <Table className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('<hr class="my-8 border-gray-200" />', '')}
                className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
                title="Horizontal Divider"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            {/* Content Area */}
            {editorMode === 'visual' ? (
              <textarea
                ref={textareaRef}
                rows={16}
                placeholder="Write rich article content with HTML formatting, lists, tables, and images..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-4 text-sm text-black outline-none font-sans leading-relaxed focus:bg-white resize-y"
                required
              />
            ) : (
              <textarea
                ref={textareaRef}
                rows={16}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-4 font-mono text-xs bg-gray-950 text-emerald-400 outline-none resize-y leading-relaxed"
                required
              />
            )}
          </div>

          {/* ========================================================= */}
          {/* SEO ENGINE & SERP SIMULATOR SUITE                         */}
          {/* ========================================================= */}
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-black" />
                <h4 className="text-sm font-bold text-black uppercase tracking-wider">
                  Full Search Engine Optimization (SEO) Suite
                </h4>
              </div>
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200 text-xs">
                <button
                  type="button"
                  onClick={() => setSerpDevice('desktop')}
                  className={`px-2.5 py-1 rounded flex items-center gap-1 ${
                    serpDevice === 'desktop' ? 'bg-black text-white font-bold' : 'text-gray-600'
                  }`}
                >
                  <Monitor className="h-3 w-3" />
                  <span>Desktop SERP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSerpDevice('mobile')}
                  className={`px-2.5 py-1 rounded flex items-center gap-1 ${
                    serpDevice === 'mobile' ? 'bg-black text-white font-bold' : 'text-gray-600'
                  }`}
                >
                  <Smartphone className="h-3 w-3" />
                  <span>Mobile SERP</span>
                </button>
              </div>
            </div>

            {/* Google SERP Preview Box */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
              <span className="text-[11px] font-mono uppercase text-gray-400 block mb-2">
                Live Google Search Result Preview
              </span>
              <div className={serpDevice === 'mobile' ? 'max-w-sm' : 'max-w-2xl'}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
                    O
                  </div>
                  <div className="text-xs text-gray-800 font-mono truncate">
                    https://orbit-i.tech <span className="text-gray-400">› blog › {formData.slug || 'article-slug'}</span>
                  </div>
                </div>
                <h5 className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2">
                  {formData.metaTitle || formData.title || 'Enter Post Meta Title'} | ORBIT-I
                </h5>
                <p className="text-xs sm:text-sm text-[#4d5156] mt-1 leading-normal line-clamp-2">
                  {formData.metaDescription || formData.excerpt || 'Enter meta description to simulate Google search results snippet here.'}
                </p>
              </div>
            </div>

            {/* Focus Keywords & Meta Tags Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700">Focus Target Keywords</label>
                  <span className="text-[11px] text-gray-400 font-mono">Comma-separated</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. LLM orchestration, microservices, enterprise ai"
                  value={formData.focusKeywords || ''}
                  onChange={(e) => setFormData({ ...formData, focusKeywords: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs text-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Canonical URL
                </label>
                <input
                  type="url"
                  placeholder="https://orbit-i.tech/blog/slug"
                  value={formData.canonicalUrl || ''}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs text-black font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700">Meta Title Tag</label>
                  <span
                    className={`text-[11px] font-mono ${
                      (formData.metaTitle || '').length > 60
                        ? 'text-rose-500 font-bold'
                        : (formData.metaTitle || '').length >= 45
                        ? 'text-emerald-600 font-bold'
                        : 'text-gray-400'
                    }`}
                  >
                    {(formData.metaTitle || '').length}/60 chars
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Optimal length 50-60 characters"
                  value={formData.metaTitle || ''}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs text-black"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700">Meta Description</label>
                  <span
                    className={`text-[11px] font-mono ${
                      (formData.metaDescription || '').length > 165
                        ? 'text-rose-500 font-bold'
                        : (formData.metaDescription || '').length >= 120
                        ? 'text-emerald-600 font-bold'
                        : 'text-gray-400'
                    }`}
                  >
                    {(formData.metaDescription || '').length}/160 chars
                  </span>
                </div>
                <textarea
                  rows={2}
                  placeholder="Optimal length 120-160 characters for search engine snippets"
                  value={formData.metaDescription || ''}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs text-black"
                />
              </div>
            </div>

            {/* SEO Real-Time Checklist */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-black uppercase tracking-wider">
                  SEO Audit &amp; Content Optimization Checklist
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600">
                  {seoChecklist.checks.filter((c) => c.passed).length} of {seoChecklist.checks.length} passed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {seoChecklist.checks.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 p-2 rounded-lg border ${
                      item.passed
                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                        : 'bg-gray-50 border-gray-200 text-gray-500'
                    }`}
                  >
                    {item.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-gray-400 shrink-0" />
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings (4 Cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 space-y-6 bg-gray-50/70">
          <div className="pb-3 border-b border-gray-200 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-black font-mono">
              Publishing Controls
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                formData.status === 'published'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {formData.status.toUpperCase()}
            </span>
          </div>

          {/* Status & Visibility */}
          <div className="space-y-3 bg-white p-4 rounded-2xl border border-gray-200">
            <label className="block text-xs font-bold text-gray-700">Post Status</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: 'published' })}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                  formData.status === 'published'
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                }`}
              >
                Published
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: 'draft' })}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                  formData.status === 'draft'
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                }`}
              >
                Draft
              </button>
            </div>
          </div>

          {/* Author */}
          <div className="space-y-2 bg-white p-4 rounded-2xl border border-gray-200">
            <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-gray-500" />
              <span>Article Author</span>
            </label>
            <select
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-black outline-none"
            >
              <option value="Abdul Samad Rind (Founder & CEO)">Abdul Samad Rind (Founder &amp; CEO)</option>
              <option value="Muhammad Muneeb (Co-Founder & CTO)">Muhammad Muneeb (Co-Founder &amp; CTO)</option>
              <option value="Maria Almani (Co-Founder & COO)">Maria Almani (Co-Founder &amp; COO)</option>
              <option value="ORBIT-I Engineering Editorial">ORBIT-I Engineering Editorial</option>
            </select>
          </div>

          {/* Category with Custom Add option */}
          <div className="space-y-2 bg-white p-4 rounded-2xl border border-gray-200">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-gray-500" />
                <span>Primary Category</span>
              </label>
              <button
                type="button"
                onClick={() => setIsAddingCategory(!isAddingCategory)}
                className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5"
              >
                <Plus className="h-3 w-3" />
                <span>New Category</span>
              </button>
            </div>

            {isAddingCategory ? (
              <div className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  placeholder="New category name..."
                  value={newCategoryInput}
                  onChange={(e) => setNewCategoryInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddCustomCategory}
                  className="px-3 py-1.5 bg-black text-white text-xs font-bold rounded-lg"
                >
                  Save
                </button>
              </div>
            ) : (
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium text-black outline-none"
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-3 bg-white p-4 rounded-2xl border border-gray-200">
            <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-gray-500" />
              <span>Article Tags ({formData.tags.length})</span>
            </label>

            {/* Current Tags Chips */}
            <div className="flex flex-wrap gap-1.5">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-mono"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-600 font-bold ml-0.5"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>

            {/* Add Custom Tag */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type tag & press Add..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 bg-black text-white rounded-lg text-xs font-bold"
              >
                Add
              </button>
            </div>

            {/* Recommended Tags Quick Add */}
            <div>
              <span className="text-[10px] uppercase font-mono text-gray-400 block mb-1.5">
                Suggested Industry Tags:
              </span>
              <div className="flex flex-wrap gap-1">
                {POPULAR_TAGS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleSelectPopularTag(t)}
                    disabled={formData.tags.includes(t)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                      formData.tags.includes(t)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-black'
                    }`}
                  >
                    +{t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Cover Asset Upload & Alt Text */}
          <div className="space-y-3 bg-white p-4 rounded-2xl border border-gray-200">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-gray-500" />
                <span>Featured Cover Asset</span>
              </label>
              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(true)}
                className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-0.5"
              >
                <span>Media Library</span>
              </button>
            </div>

            <ImageUploader
              label=""
              value={formData.featuredImage || ''}
              onChange={(url) => setFormData({ ...formData, featuredImage: url })}
              aspectRatio="wide"
              helperText="Upload blog cover from your device (PNG, JPG, WebP)"
              presets={[
                { label: 'Orbit Logo', url: '/orbit-circular-logo.png' },
                { label: 'CEO Photo', url: '/AbdulSamad.jpeg' },
              ]}
            />

            <div className="pt-2">
              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                Image Alt Text (SEO &amp; Accessibility)
              </label>
              <input
                type="text"
                placeholder="e.g. Enterprise architecture diagram"
                value={formData.imageAlt || ''}
                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs"
              />
            </div>
          </div>
        </div>
      </form>

      {/* ========================================================= */}
      {/* MODAL 1: ADVANCED LINK INSERTER                          */}
      {/* ========================================================= */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-gray-200">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h4 className="text-sm font-bold text-black flex items-center gap-1.5">
                <LinkIcon className="h-4 w-4" />
                <span>Insert Hyperlink (SEO Compliant)</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Destination URL</label>
                <input
                  type="url"
                  value={linkForm.url}
                  onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Link Anchor Text</label>
                <input
                  type="text"
                  value={linkForm.text}
                  onChange={(e) => setLinkForm({ ...linkForm, text: e.target.value })}
                  placeholder="Display text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-2 pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={linkForm.newTab}
                    onChange={(e) => setLinkForm({ ...linkForm, newTab: e.target.checked })}
                    className="rounded text-black"
                  />
                  <span>Open link in new tab (<code>target="_blank"</code>)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={linkForm.noFollow}
                    onChange={(e) => setLinkForm({ ...linkForm, noFollow: e.target.checked })}
                    className="rounded text-black"
                  />
                  <span>Add <code>rel="nofollow"</code> (SEO link attribute)</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-black"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertLinkConfirm}
                className="px-5 py-2 bg-black text-white text-xs font-bold rounded-xl"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: INLINE IMAGE INSERTER                           */}
      {/* ========================================================= */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 border border-gray-200">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h4 className="text-sm font-bold text-black flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4" />
                <span>Insert Article Image</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <ImageUploader
                label="Article Image (Upload from Computer or Paste Link)"
                value={imageForm.url}
                onChange={(url) => setImageForm({ ...imageForm, url })}
                aspectRatio="wide"
                helperText="Upload image or technical diagram from your computer"
              />

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Alt Text (Search &amp; Accessibility)</label>
                <input
                  type="text"
                  value={imageForm.alt}
                  onChange={(e) => setImageForm({ ...imageForm, alt: e.target.value })}
                  placeholder="Descriptive image explanation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Figcaption / Caption (Optional)</label>
                <input
                  type="text"
                  value={imageForm.caption}
                  onChange={(e) => setImageForm({ ...imageForm, caption: e.target.value })}
                  placeholder="Figure 1: High level pipeline diagram"
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-black"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInsertImageConfirm}
                className="px-5 py-2 bg-black text-white text-xs font-bold rounded-xl"
              >
                Insert Image Block
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: MEDIA ASSETS PICKER                             */}
      {/* ========================================================= */}
      {isMediaPickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <h4 className="text-base font-bold text-black">Select from Media Library</h4>
                <p className="text-xs text-gray-500">Pick an uploaded asset for your featured cover or article body.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 p-1">
              {mediaAssets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => {
                    setFormData({
                      ...formData,
                      featuredImage: asset.url,
                      imageAlt: asset.altText || formData.imageAlt,
                    });
                    setIsMediaPickerOpen(false);
                  }}
                  className="group cursor-pointer border border-gray-200 hover:border-black rounded-2xl p-2 bg-gray-50 hover:bg-white transition-all space-y-2 text-center"
                >
                  <div className="h-28 bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center p-1">
                    <img
                      src={asset.url}
                      alt={asset.altText}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="text-left px-1">
                    <p className="text-xs font-bold text-black truncate">{asset.name}</p>
                    <p className="text-[10px] text-gray-500 font-mono">{asset.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: FULL ARTICLE PREVIEW                            */}
      {/* ========================================================= */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="bg-white text-black rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl space-y-6 relative">
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-6 right-6 px-3.5 py-1.5 bg-gray-100 hover:bg-black hover:text-white rounded-full text-xs font-semibold transition-colors"
            >
              Exit Article Preview
            </button>

            <div className="space-y-3">
              <span className="px-3 py-1 bg-black text-white rounded-full text-xs font-mono uppercase tracking-wider">
                {formData.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                {formData.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-mono pt-1">
                <span>By {formData.author}</span>
                <span>·</span>
                <span>{formData.publishedDate}</span>
                <span>·</span>
                <span>{readingTime} min read</span>
                <span>·</span>
                <span className="text-emerald-600 font-bold">SEO Score: {seoChecklist.score}/100</span>
              </div>
            </div>

            {formData.featuredImage && (
              <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-950 p-4 flex items-center justify-center max-h-80">
                <img
                  src={formData.featuredImage}
                  alt={formData.imageAlt || formData.title}
                  className="max-h-72 object-contain"
                />
              </div>
            )}

            <div
              className="prose prose-sm max-w-none text-gray-800 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            />

            <div className="pt-6 border-t border-gray-200 flex flex-wrap gap-2">
              {formData.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-gray-100 rounded-full text-xs font-mono text-gray-700"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
