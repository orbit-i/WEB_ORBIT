import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { ServiceDetail } from '../types';
import { Check, ArrowRight, Cpu, Sparkles, Layers, ChevronDown, ChevronUp } from 'lucide-react';
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
    <section id="services" className="bg-gray-50/70 text-black py-16 md:py-24 border-b border-gray-200">
      <SeoHead
        title="Verified Enterprise Services & Custom Software"
        description="Explore ORBIT-I verified services: Full-Stack Web Development, Headless WordPress, Mobile Apps (React Native/Flutter), Custom Software & ERPs, Cloud Infrastructure, and APIs."
        keywords={['Web Development', 'WordPress Development', 'Custom Coding', 'Mobile App Development', 'Cloud DevOps', 'Enterprise ERP']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-xs font-mono font-bold mb-3">
              <Sparkles className="h-3 w-3 text-blue-600" />
              <span>Full-Spectrum Engineering &amp; Custom Systems</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-3">
              Enterprise Services &amp; Digital Solutions
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              From enterprise web platforms, custom coding, and WordPress solutions to cross-platform mobile apps, bespoke ERP systems, and cloud infrastructure.
            </p>
          </div>

          <div className="text-xs text-gray-500 font-mono font-semibold">
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
                    ? 'bg-black text-white border-2 border-black'
                    : 'bg-white text-black border border-gray-200 hover:border-blue-600'
                }`}
              >
                {/* Image Header with SEO Alt Text */}
                {service.imageUrl && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900">
                    <img
                      src={service.imageUrl}
                      alt={service.imageAlt || `${service.title} - ORBIT-I Private Limited`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-4 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 text-gray-900 backdrop-blur-xs">
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
                          isAI ? 'text-amber-400' : 'text-blue-600'
                        }`}
                      >
                        {isAI ? 'Autonomous Systems' : 'Core Engineering'}
                      </span>
                    )}
                    <h3
                      className={`text-xl font-bold tracking-tight ${
                        isAI ? 'text-white' : 'text-gray-900 group-hover:text-blue-600 transition-colors'
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Summary / Detailed Description */}
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isAI ? 'text-gray-300' : 'text-gray-600'
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
                        isAI ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                      }`}
                    >
                      <span>{isExpanded ? 'Show Less' : 'Read Full Scope'}</span>
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                  )}

                  {/* Key Deliverables Benefits List */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <span className={`text-[10px] font-mono uppercase font-bold tracking-wider block ${isAI ? 'text-gray-400' : 'text-gray-400'}`}>
                      Key Deliverables:
                    </span>
                    {service.benefits.slice(0, 4).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <Check
                          className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${
                            isAI ? 'text-amber-400' : 'text-emerald-600'
                          }`}
                        />
                        <span className={isAI ? 'text-gray-200' : 'text-gray-700'}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Tech Stack Badges & Action */}
                <div
                  className={`p-6 sm:p-7 pt-4 border-t flex flex-col gap-3 ${
                    isAI ? 'border-white/15' : 'border-gray-100'
                  }`}
                >
                  {/* Tech Stacks (WordPress, Custom Code, React, etc.) */}
                  <div className="flex flex-wrap gap-1.5">
                    {service.technologies.slice(0, 6).map((tech, i) => (
                      <span
                        key={i}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-medium ${
                          isAI
                            ? 'bg-white/10 text-gray-200 border border-white/10'
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className={`text-[11px] font-mono ${isAI ? 'text-gray-400' : 'text-gray-500'}`}>
                      Enterprise SLA
                    </span>

                    {onSelectServiceForConsultation && (
                      <button
                        onClick={() => onSelectServiceForConsultation(service.title)}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all shadow-xs ${
                          isAI
                            ? 'bg-white text-black hover:bg-gray-100'
                            : 'bg-black text-white hover:bg-blue-600'
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
