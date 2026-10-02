import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { VerifiedCertificate } from '../../types';
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Save,
  X,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';

interface CertificatesCmsProps {
  showNotification: (msg: string) => void;
}

export const CertificatesCms: React.FC<CertificatesCmsProps> = ({ showNotification }) => {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useCms();

  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<VerifiedCertificate>>({
    certificateId: '',
    fullName: '',
    email: '',
    phone: '',
    department: 'Full Stack Development',
    role: 'Full Stack Engineering Intern',
    startDate: '2026-01-01',
    endDate: '2026-03-25',
    duration: '3 Months',
    completionStatus: 'completed',
    certificateStatus: 'valid',
    gradePerformance: 'Distinction (A+)',
    verificationCode: '',
    issueDate: '2026-03-25',
    remarks: 'Demonstrated outstanding software engineering and architectural discipline.',
    isAuthentic: true,
  });

  const filteredCerts = certificates.filter(
    (c) =>
      c.certificateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.verificationCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    const nextSeq = String(certificates.length + 1).padStart(2, '0');
    setEditingId(null);
    setFormData({
      certificateId: `ORBIT-I/INT/2026/${nextSeq}`,
      fullName: '',
      email: '',
      phone: '+92 300 0000000',
      department: 'Full Stack Development',
      role: 'Full Stack Engineering Intern',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      duration: '3 Months',
      completionStatus: 'completed',
      certificateStatus: 'valid',
      gradePerformance: 'Distinction (A+)',
      verificationCode: `ORB-SEC-${Math.floor(1000 + Math.random() * 9000)}-VLD-2026`,
      issueDate: new Date().toISOString().split('T')[0],
      remarks: 'Successfully completed enterprise software engineering curriculum at ORBIT-I Private Limited.',
      isAuthentic: true,
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (cert: VerifiedCertificate) => {
    setEditingId(cert.certificateId);
    setFormData({ ...cert });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName?.trim() || !formData.certificateId?.trim()) {
      showNotification('Full Name and Certificate ID are required.');
      return;
    }

    if (editingId) {
      await updateCertificate(editingId, formData as VerifiedCertificate);
      showNotification(`Certificate ${formData.certificateId} updated.`);
    } else {
      await addCertificate(formData as VerifiedCertificate);
      showNotification(`Certificate ${formData.certificateId} issued and registered.`);
    }
    setIsEditing(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently revoke certificate ${id} for ${name}?`)) {
      await deleteCertificate(id);
      showNotification(`Certificate ${id} deleted.`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-mono rounded-full mb-2">
            <Award className="h-3.5 w-3.5 text-amber-400" />
            <span>CENTRAL CREDENTIAL REGISTRY · CRUD ACTIVE</span>
          </div>
          <h2 className="text-2xl font-bold text-black tracking-tight">
            Official Certificates Verification Management
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Issue, update, and manage official internship and training certificates with instant online cryptographic verification.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-black text-white hover:bg-gray-800 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Issue Certificate</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5">
        <Search className="h-4 w-4 text-gray-500 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Certificate ID (e.g. ORBIT-I/INT/2026/01), Student Name, or Verification Code..."
          className="w-full bg-transparent text-sm text-black placeholder:text-gray-400 focus:outline-none"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm('')} className="text-xs text-gray-500 hover:text-black">
            Clear
          </button>
        )}
      </div>

      {/* Certificates Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-mono text-gray-600 uppercase">
              <tr>
                <th className="py-3 px-4">Certificate ID</th>
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4">Department &amp; Role</th>
                <th className="py-3 px-4">Grade</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Verification Code</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCerts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500 font-mono text-xs">
                    No matching certificate records found.
                  </td>
                </tr>
              ) : (
                filteredCerts.map((cert) => (
                  <tr key={cert.certificateId} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-black">
                      {cert.certificateId}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-black">{cert.fullName}</div>
                      <div className="text-xs text-gray-500">{cert.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-xs font-mono font-medium text-blue-600">{cert.department}</div>
                      <div className="text-xs text-gray-700">{cert.role}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 bg-gray-100 text-black rounded-md text-xs font-mono font-semibold">
                        {cert.gradePerformance}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold ${
                          cert.certificateStatus === 'valid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {cert.certificateStatus === 'valid' ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        <span>{cert.certificateStatus}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-gray-600">
                      {cert.verificationCode}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(cert)}
                          className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cert.certificateId, cert.fullName)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-xl font-bold text-black flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-amber-500" />
                <span>{editingId ? 'Edit Certificate Record' : 'Issue Official Certificate'}</span>
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
                    Certificate ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.certificateId || ''}
                    onChange={(e) => setFormData({ ...formData, certificateId: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm font-mono focus:border-black focus:outline-none"
                    placeholder="ORBIT-I/INT/2026/01"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Verification Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.verificationCode || ''}
                    onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm font-mono focus:border-black focus:outline-none"
                    placeholder="ORB-SEC-7890-VLD-2026"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName || ''}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                    placeholder="Candidate full name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Candidate Email
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department || ''}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                    placeholder="e.g. Full Stack Development"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Role / Track
                  </label>
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                    placeholder="e.g. Full Stack Engineering Intern"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate || ''}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate || ''}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration || '3 Months'}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Grade / Distinction
                  </label>
                  <input
                    type="text"
                    value={formData.gradePerformance || 'Distinction (A+)'}
                    onChange={(e) => setFormData({ ...formData, gradePerformance: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Certificate Status
                  </label>
                  <select
                    value={formData.certificateStatus || 'valid'}
                    onChange={(e) => setFormData({ ...formData, certificateStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                  >
                    <option value="valid">Valid (Authentic)</option>
                    <option value="revoked">Revoked</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                    Completion Status
                  </label>
                  <select
                    value={formData.completionStatus || 'completed'}
                    onChange={(e) => setFormData({ ...formData, completionStatus: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                  >
                    <option value="completed">Completed</option>
                    <option value="in_progress">In Progress</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-gray-700 mb-1">
                  Official Remarks
                </label>
                <textarea
                  rows={2}
                  value={formData.remarks || ''}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:border-black focus:outline-none"
                  placeholder="Official comments on performance and deliverables..."
                />
              </div>

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
                  <span>Save Certificate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
