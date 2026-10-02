import React, { useState } from 'react';
import { VERIFIED_CERTIFICATES, COMPANY_INFO } from '../data/orbitData';
import { VerifiedCertificate } from '../types';
import { Search, CheckCircle2, AlertCircle, Award, Calendar, ShieldCheck, Mail, MapPin } from 'lucide-react';

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
    <section className="bg-white text-black py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700 border border-gray-200 mb-3 font-mono">
            <Award className="h-3.5 w-3.5 text-black" />
            <span>Official Intern Credential Registry</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black tracking-tight">
            Internship Certificate Verification
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Verify official credentials, internship completion records, and performance ratings issued to engineering and technology interns by {COMPANY_INFO.legalName}.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mb-10">
          <form onSubmit={handleVerify} className="space-y-4">
            <label className="block text-sm font-semibold text-gray-800">
              Enter Intern Certificate Record ID:
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="e.g. ORBIT-I/INT/2026/01"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-full text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !certInput.trim()}
                className="bg-black text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-semibold transition-all duration-200 text-sm border-2 border-black whitespace-nowrap disabled:opacity-50 shadow-sm"
              >
                {isLoading ? 'Verifying Intern...' : 'Validate Intern Record'}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-gray-600">
              <span className="font-semibold text-gray-500">Sample Intern Record IDs:</span>
              {sampleCertificates.map((id) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => {
                    setCertInput(id);
                    setSearchResult(VERIFIED_CERTIFICATES[id] || null);
                    setHasSearched(true);
                  }}
                  className="px-2.5 py-1 bg-white border border-gray-200 rounded-full hover:border-black text-black font-mono transition-colors font-medium text-[11px]"
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
              <div className="bg-white border-2 border-black rounded-2xl p-6 sm:p-8 text-black shadow-lg">
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-200 shrink-0">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-black block font-mono">
                        OFFICIAL AUTHENTIC RECORD VERIFIED
                      </span>
                      <span className="text-xs text-gray-600">
                        {COMPANY_INFO.legalName} · Official Central Registry
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right font-mono">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">
                      SECURITY CODE
                    </span>
                    <span className="text-xs font-bold text-black">
                      {searchResult.verificationCode}
                    </span>
                  </div>
                </div>

                {/* Intern Details Grid matching user screenshot */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm mb-6">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Full Name:</span>
                    <span className="font-bold text-black text-right">{searchResult.fullName}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Duration:</span>
                    <span className="font-mono text-black font-semibold text-right">
                      {searchResult.startDate} to {searchResult.endDate}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Designation:</span>
                    <span className="font-bold text-black text-right">{searchResult.role}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Performance:</span>
                    <span className="font-bold text-black text-right">
                      {searchResult.gradePerformance}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Department:</span>
                    <span className="text-black font-semibold text-right">{searchResult.department}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Issue Date:</span>
                    <span className="font-mono text-black text-right">{searchResult.issueDate}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Email:</span>
                    <span className="font-mono text-gray-800 text-xs text-right">
                      {searchResult.email}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Status:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs font-mono">
                      {searchResult.certificateStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Supervisor Assessment matching screenshot */}
                {searchResult.remarks && (
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl mb-6 text-xs text-gray-700 space-y-1">
                    <span className="font-bold text-black uppercase tracking-wider block text-[11px]">
                      Supervisor Assessment:
                    </span>
                    <p className="leading-relaxed">
                      {searchResult.remarks}
                    </p>
                  </div>
                )}

                {/* Footer Signatory */}
                <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-600">
                  <span>Signatory: <strong className="text-black">Chief Executive Officer &amp; Founder</strong></span>
                  <span className="font-mono text-black font-semibold">Valid Credential Record</span>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 text-center text-red-900">
                <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold mb-1">
                  Internship Record Not Found
                </h3>
                <p className="text-xs text-red-700 max-w-md mx-auto">
                  No intern record was found matching ID "{certInput}". Please verify the certificate ID printed on your internship completion document.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
