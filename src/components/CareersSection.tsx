import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { SeoHead } from './common/SeoHead';
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  DollarSign,
  Award,
  Send,
  CheckCircle2,
  Filter,
  Sparkles,
  Building,
  Globe,
  ArrowRight,
  X,
  FileCheck,
  UserCheck,
  Coins,
} from 'lucide-react';
import { JobOpening } from '../types';

interface CareersSectionProps {
  onSelectRoleForApplication?: (roleTitle: string) => void;
}

export const CareersSection: React.FC<CareersSectionProps> = ({
  onSelectRoleForApplication,
}) => {
  const { jobs, pageContents } = useCms();
  const careerData = pageContents?.careers;

  const [activeFilter, setActiveFilter] = useState<
    'all' | 'jobs' | 'paid_internships' | 'unpaid_internships' | 'remote'
  >('all');
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantResumeUrl, setApplicantResumeUrl] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const activeJobs = jobs.filter((j) => j.status === 'active');

  const filtered = activeJobs.filter((job) => {
    const isIntern =
      job.category === 'internship' ||
      job.type.toLowerCase().includes('intern');
    const isPaid =
      job.internshipType === 'paid' ||
      job.type.toLowerCase().includes('paid');
    const isUnpaid =
      job.internshipType === 'unpaid' ||
      job.type.toLowerCase().includes('unpaid');
    const isRemote =
      job.workMode === 'remote' ||
      job.location.toLowerCase().includes('remote');

    if (activeFilter === 'jobs') return !isIntern;
    if (activeFilter === 'paid_internships') return isIntern && isPaid;
    if (activeFilter === 'unpaid_internships') return isIntern && isUnpaid;
    if (activeFilter === 'remote') return isRemote;
    return true;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) {
      alert('Please enter your full name and email address.');
      return;
    }
    setSubmitted(true);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setSubmitted(false);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setApplicantResumeUrl('');
    setCoverNote('');
  };

  return (
    <section className="py-16 md:py-24 bg-[#fafbfc] min-h-[80vh]">
      <SeoHead
        title={careerData?.metaTitle || 'Careers & Internships | ORBIT-I Private Limited'}
        description={careerData?.metaDescription || careerData?.subheadline || 'Explore engineering careers and certified internship cohorts at ORBIT-I Private Limited.'}
        canonicalUrl="https://orbit-i.tech/#careers"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Zone */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{careerData?.badge || 'Join the ORBIT-I Engineering Team'}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
            {careerData?.headline || 'Careers & Internship Opportunities'}
          </h1>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {careerData?.subheadline || careerData?.description || 'Build enterprise digital systems, mission-critical mobile platforms, and advanced cloud infrastructure. Explore full-time engineering roles, paid industry internships with competitive stipends, and university-recognized certified internships.'}
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
            }`}
          >
            All Opportunities ({activeJobs.length})
          </button>
          <button
            onClick={() => setActiveFilter('jobs')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeFilter === 'jobs'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            <span>Permanent Jobs ({activeJobs.filter((j) => j.category === 'job' || !j.type.toLowerCase().includes('intern')).length})</span>
          </button>
          <button
            onClick={() => setActiveFilter('paid_internships')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeFilter === 'paid_internships'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
            }`}
          >
            <Coins className="h-3.5 w-3.5" />
            <span>Paid Internships ({activeJobs.filter((j) => (j.category === 'internship' || j.type.toLowerCase().includes('intern')) && (j.internshipType === 'paid' || j.type.toLowerCase().includes('paid'))).length})</span>
          </button>
          <button
            onClick={() => setActiveFilter('unpaid_internships')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeFilter === 'unpaid_internships'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Unpaid Certified Internships ({activeJobs.filter((j) => (j.category === 'internship' || j.type.toLowerCase().includes('intern')) && (j.internshipType === 'unpaid' || j.type.toLowerCase().includes('unpaid'))).length})</span>
          </button>
          <button
            onClick={() => setActiveFilter('remote')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeFilter === 'remote'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>100% Remote Roles ({activeJobs.filter((j) => j.workMode === 'remote' || j.location.toLowerCase().includes('remote')).length})</span>
          </button>
        </div>

        {/* Open Positions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((job) => {
            const isIntern =
              job.category === 'internship' ||
              job.type.toLowerCase().includes('intern');
            const isPaid =
              job.internshipType === 'paid' ||
              job.type.toLowerCase().includes('paid');

            return (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-gray-200/90 hover:border-blue-500/60 p-6 flex flex-col justify-between shadow-2xs hover:shadow-lg transition-all group"
              >
                <div className="space-y-4">
                  {/* Category & Mode Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    {isIntern ? (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        <span>Internship</span>
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        <span>Job Opening</span>
                      </span>
                    )}

                    {/* Paid / Unpaid indicator for internships */}
                    {isIntern && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isPaid
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-purple-50 text-purple-700 border-purple-200'
                        }`}
                      >
                        {isPaid
                          ? `Paid · ${job.stipendAmount || 'Stipend Offered'}`
                          : 'Unpaid · Verified Certificate'}
                      </span>
                    )}

                    {/* Work Mode */}
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 flex items-center gap-1">
                      {job.workMode === 'remote' ? (
                        <>
                          <Globe className="h-3 w-3 text-blue-600" />
                          <span>Remote</span>
                        </>
                      ) : job.workMode === 'onsite' ? (
                        <>
                          <Building className="h-3 w-3 text-amber-600" />
                          <span>Onsite</span>
                        </>
                      ) : (
                        <>
                          <Building className="h-3 w-3 text-emerald-600" />
                          <span>Hybrid</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Title & Department */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      {job.department} · {job.type}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {job.description}
                  </p>

                  {/* Metadata Specs */}
                  <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-2 text-[11px] text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    {job.duration && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{job.duration}</span>
                      </div>
                    )}
                    {job.experience && (
                      <div className="flex items-center gap-1.5 col-span-2">
                        <Award className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">Req: {job.experience}</span>
                      </div>
                    )}
                  </div>

                  {/* Perks / Benefits pill */}
                  {job.perks && (
                    <div className="text-[10px] text-emerald-700 bg-emerald-50/80 px-2 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-emerald-600 shrink-0" />
                      <span><strong>Perks:</strong>{' '}
                      {Array.isArray(job.perks) ? job.perks.join(' · ') : job.perks}</span>
                    </div>
                  )}
                </div>

                {/* Card Action Button */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-mono">
                    ID: {job.id.slice(0, 10)}
                  </span>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-4 py-2 bg-gray-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <span>View &amp; Apply</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8 space-y-3">
            <Briefcase className="h-10 w-10 text-gray-300 mx-auto" />
            <h4 className="text-base font-bold text-gray-800">No positions found in this category</h4>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Please check other filters or send your general CV to careers@orbit-i.tech.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Application & Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-gray-200 shadow-2xl relative animate-in zoom-in-95 duration-150 my-8">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Application Submitted!</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Thank you, <strong>{applicantName}</strong>! Your application for{' '}
                  <strong>{selectedJob.title}</strong> has been transmitted directly to our talent team at{' '}
                  <strong>{selectedJob.applyEmail || 'careers@orbit-i.tech'}</strong>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 bg-black text-white text-xs font-bold rounded-xl"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {selectedJob.category === 'internship' ? 'Internship Program' : 'Direct Employment'}
                    </span>
                    {selectedJob.internshipType && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {selectedJob.internshipType === 'paid' ? `Paid · ${selectedJob.stipendAmount}` : 'Unpaid · Verified Certificate'}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-black text-gray-900">{selectedJob.title}</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {selectedJob.department} · {selectedJob.location} · {selectedJob.workMode}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700 space-y-2">
                  <p>{selectedJob.description}</p>
                  {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                    <div className="pt-2 border-t border-gray-200">
                      <div className="font-bold text-gray-900 mb-1">Key Requirements:</div>
                      <ul className="list-disc list-inside space-y-0.5 text-gray-600">
                        {selectedJob.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Quick Application Form */}
                <form onSubmit={handleApplySubmit} className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-gray-900">Candidate Quick Application</div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="e.g. Haris Ahmed"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="e.g. haris@example.com"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 mb-1">
                        Portfolio / Resume URL / LinkedIn
                      </label>
                      <input
                        type="url"
                        value={applicantResumeUrl}
                        onChange={(e) => setApplicantResumeUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-gray-700 mb-1">
                      Brief Note / Availability
                    </label>
                    <textarea
                      rows={2}
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      placeholder="Share your interest, previous tech stack experience, or availability..."
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:border-blue-600 resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit Application</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
