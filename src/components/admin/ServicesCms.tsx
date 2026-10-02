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

export const ServicesCms: React.FC<ServicesCmsProps> = ({ showNotification }) => {
  const { services, addService, updateService, deleteService, resetServicesToDefault } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Core Engineering');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [benefitsText, setBenefitsText] = useState('');
  const [techsText, setTechsText] = useState('');
  const [iconName, setIconName] = useState('Cpu');
  const [imageUrl, setImageUrl] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Core Engineering');
    setSummary('');
    setDescription('');
    setBenefitsText('High performance & sub-second latency\nEnterprise security & RBAC protection\nFull source code & IP ownership\nContinuous automated CI/CD deployments');
    setTechsText('TypeScript, React 19, Node.js, PostgreSQL, Docker');
    setIconName('Cpu');
    setImageUrl('');
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
    setBenefitsText(svc.benefits ? svc.benefits.join('\n') : '');
    setTechsText(svc.technologies ? svc.technologies.join(', ') : '');
    setIconName(svc.iconName || 'Cpu');
    setImageUrl((svc as any).imageUrl || '');
    setIsModalOpen(true);
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
      benefits: benefitsArray.length > 0 ? benefitsArray : ['Enterprise grade delivery and maintenance.'],
      technologies: techsArray.length > 0 ? techsArray : ['TypeScript', 'Modern Stack'],
      iconName,
      processSteps: [
        { title: 'Architecture & Scope', description: 'Comprehensive system planning.' },
        { title: 'Rapid Implementation', description: 'Iterative, sprint-driven code sprints.' },
        { title: 'Deployment & SLA', description: 'Automated deployment and 24/7 monitoring.' },
      ],
      ...(imageUrl ? { imageUrl } : {}),
    };

    if (editingId) {
      await updateService(serviceData);
      showNotification(`Service "${title}" updated successfully.`);
    } else {
      await addService(serviceData);
      showNotification(`New Service "${title}" created and live.`);
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

  // Helper to render icon
  const renderIcon = (name: string) => {
    const found = AVAILABLE_ICONS.find((i) => i.name === name);
    const Comp = found ? found.icon : Cpu;
    return <Comp className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action Bar */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-semibold rounded-full mb-2">
            <Cpu className="h-3.5 w-3.5" />
            <span>SERVICES CMS · SIMPLE &amp; DIRECT</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Services &amp; Solutions Management
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Easily add, edit, or remove enterprise offerings displayed on the public landing page and client portal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 text-xs font-mono font-medium text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center gap-1.5"
            title="Restore original verified services"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-[#2f6fed] hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((svc) => {
          const isAI =
            svc.id === 'srv-ai' ||
            svc.title.toLowerCase().includes('ai') ||
            svc.title.toLowerCase().includes('intelligence');

          return (
            <div
              key={svc.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all bg-white relative group ${
                isAI
                  ? 'border-gray-900 shadow-md ring-1 ring-gray-900/10'
                  : 'border-gray-200 hover:border-gray-400 hover:shadow-xs'
              }`}
            >
              {/* Header inside card */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isAI
                        ? 'bg-black text-amber-300'
                        : 'bg-blue-50 text-[#2f6fed] border border-blue-100'
                    }`}
                  >
                    {renderIcon(svc.iconName || 'Cpu')}
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isAI
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {isAI ? 'Autonomous Systems' : 'Core Engineering'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-[#2f6fed] transition-colors">
                  {svc.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
                  {svc.summary}
                </p>

                {/* Key Benefits Preview */}
                <div className="space-y-1.5 mb-4">
                  {svc.benefits?.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-700">
                      <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}
                  {svc.benefits && svc.benefits.length > 3 && (
                    <span className="text-[10px] text-gray-400 font-mono pl-5 block">
                      +{svc.benefits.length - 3} more benefits
                    </span>
                  )}
                </div>

                {/* Technologies pills */}
                {svc.technologies && svc.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100 mb-4">
                    {svc.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-md text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {svc.technologies.length > 4 && (
                      <span className="text-[10px] text-gray-400 font-mono self-center">
                        +{svc.technologies.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400 truncate max-w-[120px]">
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
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* SIMPLE ADD / EDIT SERVICE MODAL                          */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#2f6fed]" />
                  <span>{editingId ? 'Edit Service' : 'Add New Service'}</span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Fill in the details below. Benefits and tech stack are simple plain text!
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
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Enterprise Cloud & LLM Systems"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Domain / Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none bg-white"
                  >
                    <option value="Autonomous Systems">Autonomous Systems (AI)</option>
                    <option value="Core Engineering">Core Engineering</option>
                    <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                    <option value="Mobile Engineering">Mobile Engineering</option>
                    <option value="Cybersecurity">Cybersecurity &amp; Compliance</option>
                  </select>
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                  Card Summary (1-2 sentences) *
                </label>
                <input
                  type="text"
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="e.g. Autonomous Large Language Models, agentic workflows and fine-tuned pipelines."
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none"
                />
              </div>

              {/* Benefits (Easy Multi-line) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono font-semibold text-gray-700">
                    Key Deliverables / Benefits (1 per line)
                  </label>
                  <span className="text-[10px] text-gray-400 font-mono">
                    Type or paste each benefit on a new line
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  placeholder={"Sub-100ms API latency\nZero-downtime blue/green deployment\nSOC2 & ISO-ready audit logging\nDedicated engineering team"}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-sans leading-relaxed focus:border-[#2f6fed] focus:outline-none"
                />
              </div>

              {/* Technologies (Comma separated) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono font-semibold text-gray-700">
                    Technologies / Tech Stack (Comma separated)
                  </label>
                  <span className="text-[10px] text-gray-400 font-mono">
                    e.g. React 19, TypeScript, PyTorch, Docker
                  </span>
                </div>
                <input
                  type="text"
                  value={techsText}
                  onChange={(e) => setTechsText(e.target.value)}
                  placeholder="React 19, TypeScript, Node.js, PyTorch, Docker, Kubernetes"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-mono focus:border-[#2f6fed] focus:outline-none"
                />
              </div>

              {/* Icon Selector */}
              <div>
                <label className="block text-xs font-mono font-semibold text-gray-700 mb-2">
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
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                          isSelected
                            ? 'bg-[#2f6fed] text-white border-[#2f6fed] shadow-xs'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                        title={item.label}
                      >
                        <IconComp className="h-5 w-5" />
                        <span className="text-[9px] font-mono truncate max-w-full">
                          {item.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Custom Graphic / Image Upload */}
              <div className="pt-2">
                <ImageUploader
                  label="Service Illustration or Graphic (Optional)"
                  value={imageUrl}
                  onChange={setImageUrl}
                  aspectRatio="wide"
                  helperText="Upload custom card banner or graphic from device"
                />
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
                  className="px-6 py-2.5 bg-[#2f6fed] hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
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
