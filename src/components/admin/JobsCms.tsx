import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { JobOpening } from '../../types';
import {
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  Edit3,
  Save,
  RotateCcw,
  Clock,
  MapPin,
  DollarSign,
  Mail,
  X,
  Sparkles,
  Check,
  Building,
  Globe,
  Award,
  Filter,
  Coins,
  FileText,
} from 'lucide-react';

interface JobsCmsProps {
  showNotification: (msg: string) => void;
}

const DEPARTMENTS = [
  'Web Engineering',
  'Artificial Intelligence & Research',
  'Backend & Systems',
  'Enterprise .NET Systems',
  'Product & Design Systems',
  'Database Architecture',
  'DevOps & Cloud Infrastructure',
  'Executive & Operations',
];

export const JobsCms: React.FC<JobsCmsProps> = ({ showNotification }) => {
  const { jobs, addJob, updateJob, deleteJob, resetJobsToDefault } = useCms();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter State
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'jobs' | 'paid_internships' | 'unpaid_internships' | 'remote'
  >('all');

  // Form State
  const [category, setCategory] = useState<'job' | 'internship'>('job');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Web Engineering');
  const [type, setType] = useState('Full-time');
  const [internshipType, setInternshipType] = useState<'paid' | 'unpaid'>('paid');
  const [stipendAmount, setStipendAmount] = useState('PKR 45,000 / month');
  const [workMode, setWorkMode] = useState<'remote' | 'onsite' | 'hybrid'>('hybrid');
  const [duration, setDuration] = useState('3 Months');
  const [location, setLocation] = useState('Hybrid / Remote (Pakistan)');
  const [experience, setExperience] = useState('2+ Years');
  const [salaryRange, setSalaryRange] = useState('PKR 180,000 - 280,000 / mo');
  const [description, setDescription] = useState('');
  const [perksText, setPerksText] = useState('');
  const [requirementsText, setRequirementsText] = useState('');
  const [status, setStatus] = useState<'active' | 'closed'>('active');
  const [applyEmail, setApplyEmail] = useState('careers@orbit-i.tech');

  const handleOpenAdd = (defaultCategory: 'job' | 'internship' = 'job') => {
    setEditingId(null);
    setCategory(defaultCategory);
    if (defaultCategory === 'job') {
      setTitle('');
      setDepartment('Web Engineering');
      setType('Full-time');
      setWorkMode('hybrid');
      setLocation('Hybrid (Karachi / Nawabshah / Remote)');
      setExperience('2+ Years');
      setSalaryRange('PKR 180,000 - 280,000 / mo');
      setDescription('Build mission-critical full-stack applications with React 19, TypeScript, and high-performance APIs.');
      setRequirementsText('Strong TypeScript and modern React experience\nSolid backend knowledge (Node.js/Python)\nClean code practices and Git version control\nFast problem-solving and team communication');
      setPerksText('');
      setDuration('');
    } else {
      setTitle('Applied AI Research Intern');
      setDepartment('Artificial Intelligence & Research');
      setType('Paid Internship');
      setInternshipType('paid');
      setStipendAmount('PKR 45,000 / month');
      setWorkMode('remote');
      setDuration('3 Months');
      setLocation('Remote Worldwide');
      setExperience('Students / Fresh Graduates');
      setSalaryRange('PKR 45,000 / month Stipend');
      setDescription('Work on LLM fine-tuning, autonomous agentic workflows, and NLP pipelines under direct mentorship of CEO Abdul Samad.');
      setPerksText('Monthly Stipend: PKR 45,000\nOfficial SECP Verified Certificate of Completion\nDirect 1-on-1 Mentorship by CEO Abdul Samad\nPre-Placement Offer (PPO) for Top Performers');
      setRequirementsText('Python, PyTorch or transformer fundamentals\nUnderstanding of prompt engineering and vector DBs\nStrong algorithmic and problem-solving attitude');
    }
    setStatus('active');
    setApplyEmail('careers@orbit-i.tech');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job: JobOpening) => {
    setEditingId(job.id);
    const cat = job.category || (job.type.toLowerCase().includes('intern') ? 'internship' : 'job');
    setCategory(cat);
    setTitle(job.title);
    setDepartment(job.department);
    setType(job.type);
    setInternshipType(job.internshipType || (job.type.toLowerCase().includes('unpaid') ? 'unpaid' : 'paid'));
    setStipendAmount(job.stipendAmount || 'PKR 45,000 / month');
    setWorkMode(job.workMode || 'hybrid');
    setDuration(job.duration || '3 Months');
    setLocation(job.location);
    setExperience(job.experience);
    setSalaryRange(job.salaryRange || 'Competitive Market Rate');
    setDescription(job.description || '');
    setPerksText(job.perks ? job.perks.join('\n') : '');
    setRequirementsText(job.requirements ? job.requirements.join('\n') : '');
    setStatus(job.status);
    setApplyEmail(job.applyEmail || 'careers@orbit-i.tech');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showNotification('Position title is required.');
      return;
    }

    const reqArray = requirementsText
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const perksArray = perksText
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const computedType =
      category === 'internship'
        ? internshipType === 'paid'
          ? 'Paid Internship'
          : 'Unpaid Internship'
        : type;

    const jobData: JobOpening = {
      id: editingId || `job-${Date.now()}`,
      title: title.trim(),
      category,
      department,
      type: computedType,
      internshipType: category === 'internship' ? internshipType : undefined,
      stipendAmount: category === 'internship' && internshipType === 'paid' ? stipendAmount.trim() : undefined,
      workMode,
      location: location.trim(),
      duration: category === 'internship' ? duration.trim() : undefined,
      experience: experience.trim(),
      salaryRange: category === 'job' ? salaryRange.trim() : internshipType === 'paid' ? `${stipendAmount.trim()} Stipend` : 'Unpaid (Certificate + Mentorship)',
      description: description.trim(),
      perks: perksArray.length > 0 ? perksArray : undefined,
      requirements: reqArray.length > 0 ? reqArray : ['Relevant software engineering background.'],
      status,
      postedDate: new Date().toISOString().slice(0, 10),
      applyEmail: applyEmail.trim() || 'careers@orbit-i.tech',
    };

    if (editingId) {
      await updateJob(editingId, jobData);
      showNotification(`Opening "${title}" updated successfully.`);
    } else {
      await addJob(jobData);
      showNotification(`New ${category.toUpperCase()} position "${title}" posted live.`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, jTitle: string) => {
    if (window.confirm(`Are you sure you want to remove opening "${jTitle}"?`)) {
      await deleteJob(id);
      showNotification(`Opening "${jTitle}" deleted.`);
    }
  };

  const handleToggleStatus = async (job: JobOpening) => {
    const nextStatus = job.status === 'active' ? 'closed' : 'active';
    await updateJob(job.id, { status: nextStatus });
    showNotification(`Status updated: "${job.title}" is now ${nextStatus.toUpperCase()}`);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset job postings to standard verified defaults?')) {
      resetJobsToDefault();
      showNotification('Openings reset to verified defaults.');
    }
  };

  // Filtered jobs
  const filteredJobs = jobs.filter((j) => {
    const isIntern =
      j.category === 'internship' || j.type.toLowerCase().includes('intern');
    const isPaidIntern =
      isIntern &&
      (j.internshipType === 'paid' ||
        j.type.toLowerCase().includes('paid') ||
        (j.stipendAmount && !j.stipendAmount.toLowerCase().includes('unpaid')));
    const isUnpaidIntern = isIntern && !isPaidIntern;
    const isRemote = j.workMode === 'remote' || j.location.toLowerCase().includes('remote');

    if (activeFilter === 'jobs') return !isIntern;
    if (activeFilter === 'paid_internships') return isPaidIntern;
    if (activeFilter === 'unpaid_internships') return isUnpaidIntern;
    if (activeFilter === 'remote') return isRemote;
    return true;
  });

  const totalJobs = jobs.filter((j) => j.category === 'job' || !j.type.toLowerCase().includes('intern')).length;
  const totalInternships = jobs.length - totalJobs;
  const activeCount = jobs.filter((j) => j.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Action Bar */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-semibold rounded-full mb-2">
            <Briefcase className="h-3.5 w-3.5" />
            <span>CAREERS &amp; RECRUITMENT CMS</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Job Openings &amp; Internship Programs
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Manage permanent jobs, paid &amp; unpaid internships, remote, onsite, and hybrid hiring across ORBIT-I teams.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 text-xs font-mono font-medium text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center gap-1.5"
            title="Reset to default openings"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenAdd('internship')}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <GraduationCap className="h-4 w-4" />
            <span>+ Post Internship</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenAdd('job')}
            className="px-4 py-2.5 bg-[#2f6fed] hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>+ Post Regular Job</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200/80">
          <span className="text-[11px] font-mono text-gray-500 uppercase block mb-1">
            Total Positions
          </span>
          <span className="text-2xl font-bold text-gray-900">{jobs.length}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200/80">
          <span className="text-[11px] font-mono text-gray-500 uppercase block mb-1">
            Regular Jobs
          </span>
          <span className="text-2xl font-bold text-blue-600">{totalJobs}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200/80">
          <span className="text-[11px] font-mono text-gray-500 uppercase block mb-1">
            Internship Programs
          </span>
          <span className="text-2xl font-bold text-emerald-600">{totalInternships}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200/80">
          <span className="text-[11px] font-mono text-gray-500 uppercase block mb-1">
            Active / Accepting
          </span>
          <span className="text-2xl font-bold text-purple-600">{activeCount}</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-3 text-xs">
        <span className="text-gray-500 font-mono flex items-center gap-1 mr-2 text-[11px]">
          <Filter className="h-3 w-3" />
          <span>Filter:</span>
        </span>
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
            activeFilter === 'all'
              ? 'bg-black text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-black'
          }`}
        >
          All ({jobs.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('jobs')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
            activeFilter === 'jobs'
              ? 'bg-[#2f6fed] text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-black'
          }`}
        >
          <Briefcase className="h-3.5 w-3.5" />
          <span>Jobs Only ({totalJobs})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('paid_internships')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
            activeFilter === 'paid_internships'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-black'
          }`}
        >
          <Coins className="h-3.5 w-3.5" />
          <span>Paid Internships ({jobs.filter((j) => (j.category === 'internship' || j.type.toLowerCase().includes('intern')) && (j.internshipType === 'paid' || j.type.toLowerCase().includes('paid'))).length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('unpaid_internships')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
            activeFilter === 'unpaid_internships'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-black'
          }`}
        >
          <GraduationCap className="h-3.5 w-3.5" />
          <span>Unpaid Internships ({jobs.filter((j) => (j.category === 'internship' || j.type.toLowerCase().includes('intern')) && (j.internshipType === 'unpaid' || j.type.toLowerCase().includes('unpaid'))).length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('remote')}
          className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
            activeFilter === 'remote'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-black'
          }`}
        >
          <Globe className="h-3.5 w-3.5" />
          <span>Remote ({jobs.filter((j) => j.workMode === 'remote' || j.location.toLowerCase().includes('remote')).length})</span>
        </button>
      </div>

      {/* Job Openings List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const isActive = job.status === 'active';
          const isInternship =
            job.category === 'internship' || job.type.toLowerCase().includes('intern');
          const isPaid =
            job.internshipType === 'paid' ||
            job.type.toLowerCase().includes('paid') ||
            (job.stipendAmount && !job.stipendAmount.toLowerCase().includes('unpaid'));

          return (
            <div
              key={job.id}
              className={`bg-white border rounded-2xl p-5 sm:p-6 transition-all ${
                isActive
                  ? 'border-gray-200 hover:border-gray-400 shadow-2xs'
                  : 'border-gray-200 opacity-70 bg-gray-50/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Left Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {isActive ? '● ACTIVE & HIRING' : '○ CLOSED'}
                    </span>

                    {/* Category badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1 ${
                        isInternship
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                    >
                      {isInternship ? <GraduationCap className="h-3 w-3" /> : <Briefcase className="h-3 w-3" />}
                      <span>{isInternship ? 'INTERNSHIP' : 'JOB POSITION'}</span>
                    </span>

                    {/* Paid/Unpaid badge for internships */}
                    {isInternship && (
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          isPaid
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {isPaid ? (
                          <>
                            <Coins className="h-3 w-3" />
                            <span>PAID ({job.stipendAmount || 'Stipend'})</span>
                          </>
                        ) : (
                          <>
                            <GraduationCap className="h-3 w-3" />
                            <span>UNPAID (Certificate & Mentorship)</span>
                          </>
                        )}
                      </span>
                    )}

                    {/* Work mode badge */}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-gray-100 text-gray-800 border border-gray-200 uppercase">
                      {job.workMode || 'Hybrid'}
                    </span>

                    <span className="text-xs font-mono text-gray-500">
                      Dept: {job.department}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                    {job.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed max-w-3xl">
                    {job.description}
                  </p>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      <span>{job.location}</span>
                    </span>

                    <span className="flex items-center gap-1 font-mono font-semibold text-emerald-700">
                      <DollarSign className="h-3.5 w-3.5" />
                      <span>
                        {isInternship && job.stipendAmount
                          ? `Stipend: ${job.stipendAmount}`
                          : job.salaryRange || 'Competitive Market Rate'}
                      </span>
                    </span>

                    {job.duration && (
                      <span className="flex items-center gap-1 font-mono text-purple-700">
                        <Clock className="h-3.5 w-3.5" />
                        <span>Duration: {job.duration}</span>
                      </span>
                    )}

                    <span className="flex items-center gap-1 font-mono text-gray-500">
                      <Clock className="h-3.5 w-3.5 text-gray-400" />
                      <span>Exp: {job.experience}</span>
                    </span>

                    {job.applyEmail && (
                      <span className="flex items-center gap-1 text-blue-600 font-mono">
                        <Mail className="h-3.5 w-3.5" />
                        <span>{job.applyEmail}</span>
                      </span>
                    )}
                  </div>

                  {/* Perks for Internships */}
                  {job.perks && job.perks.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-mono text-purple-600 font-bold self-center">
                        Perks &amp; Benefits:
                      </span>
                      {job.perks.map((p, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-800 border border-purple-200 rounded-md text-[10px] font-mono"
                        >
                          <Sparkles className="h-2.5 w-2.5 text-purple-600" />
                          <span>{p}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Requirements List */}
                  {job.requirements && job.requirements.length > 0 && (
                    <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
                      {job.requirements.map((req, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg text-[11px] text-gray-700"
                        >
                          <Check className="h-3 w-3 text-emerald-600 shrink-0" />
                          <span>{req}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(job)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-colors ${
                      isActive
                        ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {isActive ? 'Mark Closed' : 'Activate Role'}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(job)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(job.id, job.title)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Opening"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredJobs.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 text-gray-500 space-y-3">
            <Briefcase className="h-8 w-8 mx-auto text-gray-400" />
            <p className="text-sm font-semibold text-gray-700">No positions match this filter.</p>
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className="px-4 py-2 bg-black text-white text-xs font-bold rounded-xl"
            >
              Show All Openings
            </button>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* POST / EDIT JOB & INTERNSHIP MODAL                       */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  {category === 'internship' ? (
                    <GraduationCap className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <Briefcase className="h-5 w-5 text-[#2f6fed]" />
                  )}
                  <span>
                    {editingId
                      ? `Edit ${category === 'internship' ? 'Internship' : 'Job'} Opening`
                      : `Post New ${category === 'internship' ? 'Internship Program' : 'Job Opening'}`}
                  </span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Configure role specifications, work mode, and compensation structure.
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
              {/* Primary Category Selector */}
              <div>
                <label className="block text-xs font-mono font-semibold text-gray-700 mb-1.5">
                  Position Category *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCategory('job')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      category === 'job'
                        ? 'bg-[#2f6fed] text-white border-[#2f6fed] shadow-xs'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Briefcase className="h-4 w-4" />
                    <span>Regular Job Position</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCategory('internship')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      category === 'internship'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>Internship Program</span>
                  </button>
                </div>
              </div>

              {/* Position Title */}
              <div>
                <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                  {category === 'internship' ? 'Internship Title *' : 'Job Position Title *'}
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={
                    category === 'internship'
                      ? 'e.g. Applied AI & Machine Learning Research Intern'
                      : 'e.g. Senior Full-Stack Engineer (React 19 & Node.js)'
                  }
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none"
                />
              </div>

              {/* Department & Work Mode (Remote / Onsite / Hybrid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none bg-white"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Work Mode (Remote / Onsite / Hybrid) *
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setWorkMode('remote');
                        setLocation('Remote Worldwide');
                      }}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all inline-flex items-center justify-center gap-1.5 ${
                        workMode === 'remote'
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      <Globe className="h-3.5 w-3.5" />
                      <span>Remote</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setWorkMode('onsite');
                        setLocation('Headquarters: Nawabshah, Sindh');
                      }}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all inline-flex items-center justify-center gap-1.5 ${
                        workMode === 'onsite'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      <Building className="h-3.5 w-3.5" />
                      <span>Onsite</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setWorkMode('hybrid');
                        setLocation('Hybrid (Nawabshah / Karachi / Remote)');
                      }}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all inline-flex items-center justify-center gap-1.5 ${
                        workMode === 'hybrid'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      <Building className="h-3.5 w-3.5" />
                      <span>Hybrid</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Conditional Section for INTERNSHIPS: Paid vs Unpaid */}
              {category === 'internship' ? (
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-emerald-950 uppercase">
                      Internship Compensation Structure
                    </label>
                    <span className="text-[11px] font-mono text-emerald-700">
                      Paid with stipend OR Unpaid with certification
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-emerald-200 cursor-pointer text-xs font-bold text-gray-800">
                      <input
                        type="radio"
                        name="internshipCompensation"
                        checked={internshipType === 'paid'}
                        onChange={() => setInternshipType('paid')}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <Coins className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Paid Internship (with Stipend)</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-emerald-200 cursor-pointer text-xs font-bold text-gray-800">
                      <input
                        type="radio"
                        name="internshipCompensation"
                        checked={internshipType === 'unpaid'}
                        onChange={() => setInternshipType('unpaid')}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <GraduationCap className="h-3.5 w-3.5 text-purple-600" />
                      <span>Unpaid (Academic Credit &amp; Cert)</span>
                    </label>
                  </div>

                  {internshipType === 'paid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-mono font-semibold text-gray-700 mb-1">
                          Monthly Stipend Amount *
                        </label>
                        <input
                          type="text"
                          required
                          value={stipendAmount}
                          onChange={(e) => setStipendAmount(e.target.value)}
                          placeholder="e.g. PKR 45,000 / month"
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs bg-white focus:outline-none focus:border-emerald-600 font-mono font-semibold text-emerald-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono font-semibold text-gray-700 mb-1">
                          Program Duration
                        </label>
                        <input
                          type="text"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          placeholder="e.g. 3 Months (Extendable to PPO)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs bg-white focus:outline-none focus:border-emerald-600 font-mono"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[11px] font-mono font-semibold text-gray-700 mb-1">
                        Internship Program Duration
                      </label>
                      <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g. 2 Months (Summer Cohort)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs bg-white focus:outline-none focus:border-emerald-600 font-mono"
                      />
                    </div>
                  )}

                  {/* Perks for interns */}
                  <div>
                    <label className="block text-[11px] font-mono font-semibold text-gray-700 mb-1">
                      Intern Perks &amp; Provisions (1 per line)
                    </label>
                    <textarea
                      rows={2}
                      value={perksText}
                      onChange={(e) => setPerksText(e.target.value)}
                      placeholder={"Official SECP Verified Certificate of Completion\nDirect 1-on-1 Mentorship by CEO Abdul Samad\nLetter of Recommendation"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              ) : (
                /* Regular Job Compensation & Contract Type */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                      Employment Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none bg-white"
                    >
                      <option value="Full-time">Full-time Permanent</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract / Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                      Salary / Compensation Range *
                    </label>
                    <input
                      type="text"
                      required
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                      placeholder="e.g. PKR 180,000 - 280,000 / mo"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs focus:border-[#2f6fed] focus:outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Location & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Workplace Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Remote / Nawabshah / Karachi"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs focus:border-[#2f6fed] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Experience Requirement *
                  </label>
                  <input
                    type="text"
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder={
                      category === 'internship' ? 'Students / Fresh Graduates' : 'e.g. 2-4 Years'
                    }
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs focus:border-[#2f6fed] focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                  Role Overview &amp; Responsibilities *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe key duties, mission, and day-to-day work..."
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-sans leading-relaxed focus:border-[#2f6fed] focus:outline-none"
                />
              </div>

              {/* Requirements (1 per line) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono font-semibold text-gray-700">
                    Candidate Requirements (1 per line)
                  </label>
                  <span className="text-[10px] text-gray-400 font-mono">
                    Type each qualification on a new line
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={requirementsText}
                  onChange={(e) => setRequirementsText(e.target.value)}
                  placeholder={"Solid hands-on experience in TypeScript & React\nExperience with relational DBs\nAbility to collaborate in fast-paced sprints"}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-sans leading-relaxed focus:border-[#2f6fed] focus:outline-none"
                />
              </div>

              {/* Apply Email & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Application Routing Email
                  </label>
                  <input
                    type="email"
                    required
                    value={applyEmail}
                    onChange={(e) => setApplyEmail(e.target.value)}
                    placeholder="careers@orbit-i.tech"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-xs font-mono focus:border-[#2f6fed] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Position Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-[#2f6fed] focus:outline-none bg-white font-mono"
                  >
                    <option value="active">Active (Accepting Applications)</option>
                    <option value="closed">Closed / Filled</option>
                  </select>
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
                  className="px-6 py-2.5 bg-[#2f6fed] hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingId ? 'Save Changes' : `Publish ${category === 'internship' ? 'Internship' : 'Job'}`}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
