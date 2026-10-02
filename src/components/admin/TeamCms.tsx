import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { TeamMember } from '../../types';
import { ImageUploader } from './ImageUploader';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  ShieldCheck,
  Mail,
  Linkedin,
  Phone,
  Image,
  Sparkles,
  RotateCcw,
  X,
  Save,
  UserCheck,
} from 'lucide-react';

interface TeamCmsProps {
  showNotification: (msg: string) => void;
}

export const TeamCms: React.FC<TeamCmsProps> = ({ showNotification }) => {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember, resetTeamToDefault } = useCms();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    tier: 'team',
    department: 'Web Engineering',
    bio: '',
    avatar: '',
    initials: '',
    email: 'contactus@orbit-i.tech',
    linkedin: 'https://www.linkedin.com/company/orbit-i-private-limited/',
    portfolio: 'https://orbit-i.tech',
    whatsapp: '+92 3190375751',
    skills: [],
    displayOrder: 0,
  });

  const [skillInput, setSkillInput] = useState('');

  const departmentsList = [
    'Executive Leadership',
    'Operations & Strategy',
    'Engineering & Technology',
    'Web Engineering',
    'Artificial Intelligence & Research',
    'Backend & Systems',
    'Enterprise .NET Systems',
    'Database Systems & Architecture',
    'Product & Design Systems',
    'Marketing & Growth',
  ];

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      role: '',
      tier: 'team',
      department: 'Web Engineering',
      bio: '',
      avatar: '',
      initials: '',
      email: 'contactus@orbit-i.tech',
      linkedin: 'https://www.linkedin.com/company/orbit-i-private-limited/',
      portfolio: 'https://orbit-i.tech',
      whatsapp: '+92 3190375751',
      skills: ['Software Engineering'],
      displayOrder: teamMembers.length + 1,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingId(member.id);
    setFormData({ ...member });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.role?.trim()) {
      showNotification('Name and role are required.');
      return;
    }

    const initials =
      formData.initials?.trim() ||
      formData.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    if (editingId) {
      await updateTeamMember(editingId, { ...formData, initials });
      showNotification(`Updated member ${formData.name}`);
    } else {
      await addTeamMember({
        id: `tm-${Date.now()}`,
        name: formData.name.trim(),
        role: formData.role.trim(),
        tier: formData.tier || 'team',
        department: formData.department || 'Web Engineering',
        bio: formData.bio || '',
        avatar: formData.avatar || '',
        initials,
        email: formData.email || 'contactus@orbit-i.tech',
        linkedin: formData.linkedin || '',
        portfolio: formData.portfolio || '',
        whatsapp: formData.whatsapp || '',
        skills: formData.skills || [],
        displayOrder: formData.displayOrder || teamMembers.length + 1,
      });
      showNotification(`Added new member ${formData.name}`);
    }
    setIsEditing(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name} from the team?`)) {
      await deleteTeamMember(id);
      showNotification(`Removed ${name} from team registry.`);
    }
  };

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    const current = formData.skills || [];
    if (!current.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...current, skillInput.trim()] });
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: (formData.skills || []).filter((s) => s !== skill),
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-mono rounded-full mb-2">
            <Users className="h-3.5 w-3.5 text-blue-400" />
            <span>ORGANIZATIONAL DIRECTORY · CRUD ACTIVE</span>
          </div>
          <h2 className="text-2xl font-bold text-black tracking-tight">
            Team &amp; Leadership Management
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage company executives, senior engineers, and department staff with full real-time database synchronization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset all team members to official verified defaults?')) {
                resetTeamToDefault();
                showNotification('Reset team list to official ORBIT-I verified defaults.');
              }
            }}
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-black text-white hover:bg-gray-800 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Abdul Samad Spotlight Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-gray-800">
          <img
            src="/AbdulSamad.jpeg"
            alt="Abdul Samad Rind"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/AbdulSamad.jpeg';
            }}
          />
          <div className="absolute top-1.5 right-1.5 bg-emerald-500 w-3 h-3 rounded-full border-2 border-black" />
        </div>

        <div className="flex-1 text-center md:text-left space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[11px] font-mono rounded-full font-semibold">
            <ShieldCheck className="h-3 w-3 text-blue-400" />
            <span>FOUNDER &amp; CHIEF EXECUTIVE OFFICER</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Abdul Samad Rind</h3>
          <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
            Leading ORBIT-I Private Limited from Nawabshah, Sindh. Steering software architecture, enterprise partnerships, and verifiable digital governance.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 text-gray-400" /> contactus@orbit-i.tech
            </span>
            <span className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5 text-gray-400" /> +92 3190375751
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-mono">
            Original Photo Verified
          </span>
        </div>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => {
          const isCEO = member.name.toLowerCase().includes('abdul samad');
          const avatarUrl = member.avatar || (isCEO ? '/AbdulSamad.jpeg' : '');

          return (
            <div
              key={member.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-black transition-all flex flex-col justify-between shadow-xs group relative"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0 flex items-center justify-center relative">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/abdul-samad.jpg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-700 font-mono font-bold text-lg">
                        {member.initials}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-600 block truncate">
                      {member.department}
                    </span>
                    <h4 className="text-base font-bold text-black truncate">{member.name}</h4>
                    <span className="text-xs font-medium text-gray-600 block">{member.role}</span>
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-mono rounded-full font-semibold mt-1 ${
                        member.tier === 'leadership'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {member.tier === 'leadership' ? 'Leadership' : 'Core Staff'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-700 line-clamp-3 leading-relaxed mb-3">{member.bio}</p>

                {/* Skills tags */}
                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {member.skills.slice(0, 3).map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-[10px] font-mono"
                      >
                        {s}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="text-[10px] text-gray-400 font-mono">
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-400">ID: {member.id}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(member)}
                    className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit Member"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id, member.name)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Member"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Dialog for Add / Edit */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-xl font-bold text-black flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-blue-600" />
                <span>{editingId ? 'Edit Team Member' : 'Add New Team Member'}</span>
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-gray-400 hover:text-black rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                    placeholder="e.g. Abdul Samad Rind"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                    placeholder="e.g. Founder & CEO / Senior Engineer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    value={formData.department || 'Web Engineering'}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                  >
                    {departmentsList.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Tier Category
                  </label>
                  <select
                    value={formData.tier || 'team'}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                  >
                    <option value="leadership">Executive Leadership</option>
                    <option value="team">Core Team Member</option>
                  </select>
                </div>
              </div>

              {/* Avatar Upload from device / URL / presets */}
              <ImageUploader
                label="Profile Picture / Avatar (Upload from Device or Select Preset)"
                value={formData.avatar || ''}
                onChange={(url) => setFormData({ ...formData, avatar: url })}
                aspectRatio="avatar"
                helperText="Upload member portrait from computer/phone (JPG, PNG, WebP)"
                presets={[
                  { label: 'CEO Abdul Samad Photo', url: '/AbdulSamad.jpeg' },
                  { label: 'Orbit Official Logo', url: '/orbit-circular-logo.png' },
                ]}
              />

              <div>
                <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                  Professional Bio
                </label>
                <textarea
                  rows={3}
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                  placeholder="Brief summary of engineering role and responsibilities..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin || ''}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              {/* Skills Editor */}
              <div>
                <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                  Technical Skills
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    placeholder="Type skill & press Add (e.g. React, TypeScript)"
                    className="flex-1 px-3.5 py-2 border border-gray-300 rounded-xl text-xs focus:border-black focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-black text-xs font-mono font-semibold rounded-xl"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(formData.skills || []).map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 text-xs font-mono rounded-lg"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-xs"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
