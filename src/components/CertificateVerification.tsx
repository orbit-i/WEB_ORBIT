import React, { useState } from 'react';
import { VERIFIED_CERTIFICATES, COMPANY_INFO } from '../data/orbitData';
import { VerifiedCertificate } from '../types';
import { Search, CheckCircle2, AlertCircle, Award } from 'lucide-react';

export const CertificateVerification: React.FC = () => {
  const [certInput, setCertInput] = useState<string>('ORBIT-I/INT/2026/01');
  const [searchResult, setSearchResult] = useState<VerifiedCertificate | null>(
    VERIFIED_CERTIFICATES['ORBIT-I/INT/2026/01'] || null
  );
  const [hasSearched, setHasSearched] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    const query = certInput.trim().toUpperCase();

    setTimeout(() => {
      const match = VERIFIED_CERTIFICATES[query];
      setSearchResult(match || null);
      setHasSearched(true);
      setIsLoading(false);
    }, 150);
  };

  const sampleCertificates = [
    'ORBIT-I/INT/2026/01',
    'ORBIT-I/INT/2026/02',
    'ORBIT-I/INT/2026/03',
  ];

  return (
    <section className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 md:py-24 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 mb-3 font-mono">
            <Award className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Official Intern Credential Registry</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-slate-950 dark:text-white tracking-tight">
            Internship Certificate Verification
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Verify official credentials, internship completion records, and performance ratings issued to engineering and technology interns by {COMPANY_INFO.legalName}.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 mb-10 shadow-sm">
          <form onSubmit={handleVerify} className="space-y-4">
            <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
              Enter Intern Certificate Record ID:
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="e.g. ORBIT-I/INT/2026/01"
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition-colors font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !certInput.trim()}
                className="bg-slate-950 dark:bg-blue-600 text-white hover:bg-slate-800 dark:hover:bg-blue-700 px-8 py-3 rounded-full font-semibold transition-all duration-200 text-sm whitespace-nowrap disabled:opacity-50 shadow-sm"
              >
                {isLoading ? 'Verifying Intern...' : 'Validate Intern Record'}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-500">Sample Intern Record IDs:</span>
              {sampleCertificates.map((id) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => {
                    setCertInput(id);
                    setSearchResult(VERIFIED_CERTIFICATES[id] || null);
                    setHasSearched(true);
                  }}
                  className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full hover:border-blue-600 text-slate-800 dark:text-slate-200 font-mono transition-colors font-medium text-[11px]"
                >
                  {id}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Verification Result Display */}
        {hasSearched && (
          <div>
            {searchResult ? (
              <div className="bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 rounded-3xl p-6 sm:p-8 text-slate-900 dark:text-slate-100 shadow-xl">
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800 shrink-0">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-white block font-mono">
                        OFFICIAL AUTHENTIC RECORD VERIFIED
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {COMPANY_INFO.legalName} · Official Central Registry
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right font-mono">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">
                      SECURITY CODE
                    </span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      {searchResult.verificationCode}
                    </span>
                  </div>
                </div>

                {/* Intern Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm mb-6">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Full Name:</span>
                    <span className="font-bold text-slate-900 dark:text-white text-right">{searchResult.fullName}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Duration:</span>
                    <span className="font-mono text-slate-900 dark:text-white font-semibold text-right">
                      {searchResult.startDate} to {searchResult.endDate}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Designation:</span>
                    <span className="font-bold text-slate-900 dark:text-white text-right">{searchResult.role}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Performance:</span>
                    <span className="font-bold text-slate-900 dark:text-white text-right">
                      {searchResult.gradePerformance}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Department:</span>
                    <span className="text-slate-900 dark:text-white font-semibold text-right">{searchResult.department}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Issue Date:</span>
                    <span className="font-mono text-slate-900 dark:text-white text-right">{searchResult.issueDate}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Email:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300 text-xs text-right">
                      {searchResult.email}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Status:</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded text-xs font-mono">
                      {searchResult.certificateStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Supervisor Assessment */}
                {searchResult.remarks && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl mb-6 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block text-[11px]">
                      Supervisor Assessment:
                    </span>
                    <p className="leading-relaxed">
                      {searchResult.remarks}
                    </p>
                  </div>
                )}

                {/* Footer Signatory */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>Signatory: <strong className="text-slate-900 dark:text-white">Chief Executive Officer &amp; Founder</strong></span>
                  <span className="font-mono text-slate-900 dark:text-white font-semibold">Valid Credential Record</span>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl p-6 sm:p-8 text-center text-red-900 dark:text-red-200">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold mb-1">
                  Internship Record Not Found
                </h3>
                <p className="text-xs text-red-700 dark:text-red-300 max-w-md mx-auto">
                  No intern record was found matching ID &quot;{certInput}&quot;. Please verify the certificate ID printed on your internship completion document.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
