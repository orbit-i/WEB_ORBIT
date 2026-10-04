import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { ServiceDetail } from '../types';
import { Check, ArrowRight, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { SeoHead } from './common/SeoHead';

interface ServicesSectionProps {
  onSelectServiceForConsultation?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForConsultation,
}) => {
  const { services } = useCms();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isAiService = (service: ServiceDetail) =>
    service.id === 'srv-ai' ||
    service.slug.includes('ai') ||
    service.title.toLowerCase().includes('ai') ||
    service.title.toLowerCase().includes('artificial intelligence');

  return (
    <section id="services" className="bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 md:py-24 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <SeoHead
        title="Verified Enterprise Services & Custom Software"
        description="Explore ORBIT-I verified services: Full-Stack Web Development, Headless WordPress, Mobile Apps (React Native/Flutter), Custom Software & ERPs, Cloud Infrastructure, and APIs."
        keywords={['Web Development', 'WordPress Development', 'Custom Coding', 'Mobile App Development', 'Cloud DevOps', 'Enterprise ERP']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-full text-xs font-mono font-bold mb-3">
              <Sparkles className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              <span>Full-Spectrum Engineering &amp; Custom Systems</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-3">
              Enterprise Services &amp; Digital Solutions
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              From enterprise web platforms, custom coding, and WordPress solutions to cross-platform mobile apps, bespoke ERP systems, and cloud infrastructure.
            </p>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono font-semibold">
            <span>{services.length} ACTIVE CAPABILITIES</span>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const isAI = isAiService(service);
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                className={`rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative group shadow-sm hover:shadow-xl ${
                  isAI
                    ? 'bg-slate-950 text-white border-2 border-slate-900'
                    : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 hover:border-blue-600 dark:hover:border-blue-500'
                }`}
              >
                {/* Image Header with SEO Alt Text */}
                {service.imageUrl && (
                  <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-900">
                    <img
                      src={service.imageUrl}
                      alt={service.imageAlt || `${service.title} - ORBIT-I Private Limited`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-4 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 text-slate-900 backdrop-blur-xs">
                      {isAI ? 'Autonomous Systems' : 'Core Engineering'}
                    </span>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Title */}
                  <div>
                    {!service.imageUrl && (
                      <span
                        className={`text-xs font-mono font-bold uppercase tracking-wider block mb-1 ${
                          isAI ? 'text-amber-400' : 'text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {isAI ? 'Autonomous Systems' : 'Core Engineering'}
                      </span>
                    )}
                    <h3
                      className={`text-xl font-bold tracking-tight ${
                        isAI
                          ? 'text-white'
                          : 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Summary / Detailed Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isAI ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {isExpanded && service.detailedDescription
                      ? service.detailedDescription
                      : service.summary || service.description}
                  </p>

                  {/* Expand / Collapse toggle if detailed description exists */}
                  {service.detailedDescription && service.detailedDescription !== service.summary && (
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : service.id)}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold font-mono transition-colors ${
                        isAI ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 dark:text-blue-400 hover:underline'
                      }`}
                    >
                      <span>{isExpanded ? 'Show Less' : 'Read Full Scope'}</span>
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                  )}

                  {/* Key Deliverables Benefits List */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider block text-slate-400">
                      Key Deliverables:
                    </span>
                    {service.benefits.slice(0, 4).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <Check
                          className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${
                            isAI ? 'text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                          }`}
                        />
                        <span className={isAI ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Tech Stack Badges & Action */}
                <div
                  className={`p-6 sm:p-7 pt-4 border-t flex flex-col gap-3 ${
                    isAI ? 'border-white/15' : 'border-slate-100 dark:border-slate-800'
                  }`}
                >
                  {/* Tech Stacks */}
                  <div className="flex flex-wrap gap-1.5">
                    {service.technologies.slice(0, 6).map((tech, i) => (
                      <span
                        key={i}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-medium ${
                          isAI
                            ? 'bg-white/10 text-slate-200 border border-white/10'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className={`text-[11px] font-mono ${isAI ? 'text-slate-400' : 'text-slate-500'}`}>
                      Enterprise SLA
                    </span>

                    {onSelectServiceForConsultation && (
                      <button
                        onClick={() => onSelectServiceForConsultation(service.title)}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all shadow-xs ${
                          isAI
                            ? 'bg-white text-slate-900 hover:bg-slate-100'
                            : 'bg-slate-950 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700'
                        }`}
                      >
                        <span>Inquire Now</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
