import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  MessageSquare,
  Search,
  Filter,
  Trash2,
  CheckCircle,
  Clock,
  Download,
  Mail,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  RefreshCw,
} from 'lucide-react';

interface InquiriesCmsProps {
  showNotification: (msg: string) => void;
}

export const InquiriesCms: React.FC<InquiriesCmsProps> = ({ showNotification }) => {
  const { inquiries, fetchInquiries, updateInquiryStatus, deleteInquiry } = useCms();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchInquiries();
    setIsRefreshing(false);
    showNotification('Inquiries refreshed from database.');
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = filterStatus === 'all' || inq.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      inq.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.serviceRequired?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateInquiryStatus(id, newStatus);
    showNotification(`Status updated to "${newStatus}"`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this inquiry permanently?')) {
      await deleteInquiry(id);
      showNotification('Inquiry deleted.');
    }
  };

  const handleExportCsv = () => {
    if (inquiries.length === 0) {
      showNotification('No inquiries to export.');
      return;
    }

    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Timeline', 'Status', 'Submitted At', 'Message'];
    const rows = inquiries.map((i) => [
      `"${i.id}"`,
      `"${i.name || ''}"`,
      `"${i.email || ''}"`,
      `"${i.phone || ''}"`,
      `"${i.company || ''}"`,
      `"${i.serviceRequired || ''}"`,
      `"${i.budgetRange || ''}"`,
      `"${i.timeline || ''}"`,
      `"${i.status || 'New'}"`,
      `"${i.submittedAt || ''}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `orbit_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Exported inquiries to CSV.');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-mono rounded-full mb-2">
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            <span>CLIENT CONSULTATIONS · LIVE INTAKE</span>
          </div>
          <h2 className="text-2xl font-bold text-black tracking-tight">
            Client Inquiries &amp; Consultations
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Review incoming project proposals, client requests, and consultation briefs submitted via the website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-5 py-2.5 bg-black text-white hover:bg-gray-800 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5">
          <Search className="h-4 w-4 text-gray-500 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, company, or service..."
            className="w-full bg-transparent text-sm text-black placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:border-black focus:outline-none"
          >
            <option value="all">All Inquiries ({inquiries.length})</option>
            <option value="new">New</option>
            <option value="in review">In Review</option>
            <option value="contacted">Contacted</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center text-gray-500 font-mono text-sm">
            No inquiries match your criteria. When clients submit the Contact form, their inquiries appear here.
          </div>
        ) : (
          filteredInquiries.map((inq) => (
            <div
              key={inq.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-black transition-all shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm font-mono shrink-0">
                    {inq.name ? inq.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-black">{inq.name}</h4>
                    <span className="text-xs text-gray-500 font-mono">{inq.id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={inq.status || 'New'}
                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                    className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-lg text-xs font-mono font-semibold text-black"
                  >
                    <option value="New">New</option>
                    <option value="In Review">In Review</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Archived">Archived</option>
                  </select>

                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Inquiry Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-gray-700">
                  <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  <a href={`mailto:${inq.email}`} className="hover:underline truncate">
                    {inq.email}
                  </a>
                </div>

                {inq.phone && (
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <span>{inq.phone}</span>
                  </div>
                )}

                {inq.company && (
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <Building2 className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <span>{inq.company}</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-gray-700">
                  <DollarSign className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  <span>{inq.budgetRange || 'Budget Flexible'}</span>
                </div>
              </div>

              {/* Message */}
              <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-800 leading-relaxed border border-gray-100">
                <div className="text-[11px] font-mono font-semibold text-blue-600 uppercase mb-1">
                  Service Requested: {inq.serviceRequired || 'General Consultation'}
                </div>
                {inq.message}
              </div>

              <div className="text-[11px] font-mono text-gray-400 text-right">
                Submitted at: {inq.submittedAt ? new Date(inq.submittedAt).toLocaleString() : 'Recent'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
