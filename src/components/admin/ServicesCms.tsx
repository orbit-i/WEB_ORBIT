import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ServiceDetail } from '../../types';
import { ImageUploader } from './ImageUploader';
import {
  Cpu,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  Sparkles,
  Check,
  Layers,
  Code2,
  Smartphone,
  Wrench,
  Cloud,
  ShieldCheck,
  X,
  ArrowRight,
  Image as ImageIcon,
} from 'lucide-react';

interface ServicesCmsProps {
  showNotification: (msg: string) => void;
}

const AVAILABLE_ICONS = [
  { name: 'Cpu', icon: Cpu, label: 'AI & Processor' },
  { name: 'Sparkles', icon: Sparkles, label: 'Smart / Novel' },
  { name: 'Layers', icon: Layers, label: 'Full-Stack / Platform' },
  { name: 'Code2', icon: Code2, label: 'Software / APIs' },
  { name: 'Smartphone', icon: Smartphone, label: 'Mobile Apps' },
  { name: 'Cloud', icon: Cloud, label: 'Cloud & DevOps' },
  { name: 'ShieldCheck', icon: ShieldCheck, label: 'Security & Auth' },
  { name: 'Wrench', icon: Wrench, label: 'Custom Systems' },
];

const SUGGESTED_TECH_TAGS = [
  'WordPress',
  'Custom Coding',
  'React',
  'Next.js',
  'Node.js',
  'PHP',
  'TypeScript',
  'TailwindCSS',
  'MySQL',
  'React Native',
  'Flutter',
  'Python',
  'Docker',
  'AWS Cloud',
  'REST APIs',
];

export const ServicesCms: React.FC<ServicesCmsProps> = ({ showNotification }) => {
  const { services, addService, updateService, deleteService, resetServicesToDefault } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Core Engineering');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [benefitsText, setBenefitsText] = useState('');
  const [techsText, setTechsText] = useState('');
  const [iconName, setIconName] = useState('Code2');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Core Engineering');
    setSummary('');
    setDescription('');
    setDetailedDescription('');
    setBenefitsText('High performance & sub-second latency\nEnterprise security & RBAC protection\nFull source code & IP ownership\nContinuous automated CI/CD deployments');
    setTechsText('WordPress, Custom Coding, React, Next.js, Node.js, PHP, TypeScript, TailwindCSS, MySQL');
    setIconName('Code2');
    setImageUrl('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80');
    setImageAlt('Web Development and Custom Coding by ORBIT-I');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (svc: ServiceDetail) => {
    setEditingId(svc.id);
    setTitle(svc.title);
    setCategory(
      svc.id === 'srv-ai' || svc.title.toLowerCase().includes('ai')
        ? 'Autonomous Systems'
        : 'Core Engineering'
    );
    setSummary(svc.summary || '');
    setDescription(svc.description || '');
    setDetailedDescription(svc.detailedDescription || svc.description || '');
    setBenefitsText(svc.benefits ? svc.benefits.join('\n') : '');
    setTechsText(svc.technologies ? svc.technologies.join(', ') : '');
    setIconName(svc.iconName || 'Code2');
    setImageUrl(svc.imageUrl || '');
    setImageAlt(svc.imageAlt || `${svc.title} - ORBIT-I Private Limited`);
    setIsModalOpen(true);
  };

  const handleAddTechTag = (tag: string) => {
    const current = techsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (!current.includes(tag)) {
      current.push(tag);
      setTechsText(current.join(', '));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showNotification('Service Title is required.');
      return;
    }

    const benefitsArray = benefitsText
      .split('\n')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const techsArray = techsText
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const serviceData: ServiceDetail = {
      id: editingId || `srv-${Date.now()}`,
      slug,
      title: title.trim(),
      summary: summary.trim() || title.trim(),
      description: description.trim() || summary.trim(),
      detailedDescription: detailedDescription.trim() || description.trim() || summary.trim(),
      benefits: benefitsArray.length > 0 ? benefitsArray : ['Enterprise grade delivery and maintenance.'],
      technologies: techsArray.length > 0 ? techsArray : ['TypeScript', 'Modern Stack'],
      iconName,
      imageUrl: imageUrl.trim() || undefined,
      imageAlt: imageAlt.trim() || `${title.trim()} - ORBIT-I Private Limited`,
      processSteps: [
        { title: '01. Technical Discovery', description: 'Requirements mapping, architectural trade-offs, and data modeling.' },
        { title: '02. System Architecture', description: 'Component wireframes, API contracts, and database schema specification.' },
        { title: '03. Sprint-Based Build', description: 'Bi-weekly sprint demos with end-to-end visibility and continuous integration.' },
        { title: '04. Production Deployment', description: 'Security audit, load testing, automated backups, and 30-day post-launch warranty.' },
      ],
    };

    if (editingId) {
      await updateService(serviceData);
      showNotification(`Service "${title}" updated successfully with SEO image and tech stack.`);
    } else {
      await addService(serviceData);
      showNotification(`New Service "${title}" created and published.`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, sTitle: string) => {
    if (services.length <= 1) {
      showNotification('Cannot delete the only remaining service.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete "${sTitle}"?`)) {
      await deleteService(id);
      showNotification(`Service "${sTitle}" has been deleted.`);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all services to verified official defaults? This will restore original offerings.')) {
      resetServicesToDefault();
      showNotification('Services restored to factory defaults.');
    }
  };

  const renderIcon = (name: string) => {
    const found = AVAILABLE_ICONS.find((i) => i.name === name);
    const Comp = found ? found.icon : Cpu;
    return <Comp className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Verified Enterprise Services
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage public engineering capabilities, SEO images, tech stacks (WordPress, Custom Code, React, etc.), and deliverables.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Reset to factory verified offerings"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Service Thumbnail Header */}
            {svc.imageUrl ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900">
                <img
                  src={svc.imageUrl}
                  alt={svc.imageAlt || svc.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 backdrop-blur-xs text-white">
                  {renderIcon(svc.iconName || 'Code2')}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  {renderIcon(svc.iconName || 'Code2')}
                </div>
                <span className="text-[10px] font-mono text-gray-400">No Image Set</span>
              </div>
            )}

            {/* Card Content */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="text-base font-bold text-gray-900 leading-snug">
                  {svc.title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {svc.summary || svc.description}
                </p>

                {/* Tech Stacks */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {svc.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {svc.technologies.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 text-gray-400">
                      +{svc.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400">
                  ID: {svc.id}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(svc)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(svc.id, svc.title)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <span>{editingId ? 'Edit Service & SEO' : 'Add New Service'}</span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Configure service title, SEO image, detailed description, and real tech stack.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-black rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Web Application & Custom Software"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Domain / Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:border-blue-600 focus:outline-none bg-white"
                  >
                    <option value="Core Engineering">Core Engineering</option>
                    <option value="Autonomous Systems">Autonomous Systems (AI)</option>
                    <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                    <option value="Mobile Engineering">Mobile Engineering</option>
                    <option value="Enterprise Architecture">Enterprise Architecture</option>
                  </select>
                </div>
              </div>

              {/* Service Image & SEO Alt Text */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                  <ImageIcon className="h-4 w-4 text-blue-600" />
                  <span>Service Image &amp; SEO Alt Tag</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Image URL or Path
                    </label>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://... or /uploads/..."
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:border-blue-600 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      SEO Alt Text (Image Ranking)
                    </label>
                    <input
                      type="text"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      placeholder="Descriptive text for Google Image search..."
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Device Upload Option */}
                <div>
                  <ImageUploader
                    label="Or Upload from Device (Computer / Phone)"
                    value={imageUrl}
                    onChange={(url) => {
                      setImageUrl(url);
                      if (!imageAlt) setImageAlt(`${title} service image`);
                    }}
                    aspectRatio="wide"
                    helperText="Upload custom card banner or graphic from device"
                  />
                </div>
              </div>

              {/* Card Summary */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Card Summary (1-2 sentences) *
                </label>
                <input
                  type="text"
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="e.g. Fast, secure, and maintainable enterprise web applications built on modern frameworks."
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs sm:text-sm focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Detailed Description */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Detailed Service Description (Rich Overview)
                  </label>
                  <span className="text-[10px] text-gray-400 font-mono">
                    Shown when user expands service card
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={detailedDescription}
                  onChange={(e) => setDetailedDescription(e.target.value)}
                  placeholder="Detailed multi-paragraph breakdown of architecture, technical scope, delivery practices, and business value..."
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs leading-relaxed focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Technologies / Tech Stack with Quick Suggestions */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-gray-700">
                    Technologies / Tech Stack (Comma separated)
                  </label>
                  <span className="text-[10px] text-gray-400 font-mono">
                    e.g. WordPress, Custom Coding, React, Next.js
                  </span>
                </div>
                <input
                  type="text"
                  value={techsText}
                  onChange={(e) => setTechsText(e.target.value)}
                  placeholder="WordPress, Custom Coding, React, Next.js, Node.js, PHP, TypeScript, TailwindCSS"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-mono focus:border-blue-600 focus:outline-none"
                />

                {/* Quick Add Suggestion Pills */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2">
                  <span className="text-[10px] text-gray-400 font-mono">Click to Add:</span>
                  {SUGGESTED_TECH_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddTechTag(tag)}
                      className="px-2 py-0.5 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 rounded text-[10px] font-mono text-gray-700 border border-gray-200 transition-colors"
                    >
                      +{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Benefits (1 per line) */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Key Deliverables / Benefits (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  placeholder={"Sub-100ms API latency\nZero-downtime blue/green deployment\nSOC2 & ISO-ready audit logging\nDedicated engineering team"}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-sans leading-relaxed focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Icon Selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Service Icon
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {AVAILABLE_ICONS.map((item) => {
                    const IconComp = item.icon;
                    const isSelected = iconName === item.name;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setIconName(item.name)}
                        className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                        title={item.label}
                      >
                        <IconComp className="h-4 w-4" />
                        <span className="text-[9px] font-mono truncate max-w-full">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-medium text-gray-600 hover:text-black rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingId ? 'Save Changes' : 'Publish Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
