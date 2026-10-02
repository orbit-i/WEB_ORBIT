import React from 'react';
import { useCms } from '../context/CmsContext';
import { ServiceDetail } from '../types';
import { Check, ArrowRight, Cpu, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForConsultation?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForConsultation,
}) => {
  const { services } = useCms();

  const isAiService = (service: ServiceDetail) =>
    service.id === 'srv-ai' ||
    service.slug.includes('ai') ||
    service.title.toLowerCase().includes('ai') ||
    service.title.toLowerCase().includes('artificial intelligence');

  return (
    <section className="bg-gray-50 text-black py-16 md:py-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-xs font-mono font-medium mb-3">
              <Sparkles className="h-3 w-3 text-amber-300" />
              <span>Full-Spectrum Engineering &amp; Applied AI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-black tracking-tight mb-3">
              Enterprise Services &amp; AI Solutions
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              From autonomous Large Language Model agents and custom ML pipelines to mission-critical web platforms and cross-platform mobile apps.
            </p>
          </div>

          <div className="text-xs text-gray-500 font-mono">
            <span>{services.length} ACTIVE CAPABILITIES</span>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const isAI = isAiService(service);

            return (
              <div
                key={service.id}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-200 relative group ${
                  isAI
                    ? 'bg-black text-white shadow-xl border-2 border-black'
                    : 'bg-white text-black border border-gray-200 hover:border-black hover:shadow-md'
                }`}
              >
                {/* AI Flagship Pill / Badge */}
                {isAI && (
                  <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border border-white/20">
                    <Cpu className="h-3 w-3 text-amber-300 animate-pulse" />
                    <span>Flagship AI Service</span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wider block mb-1 ${
                        isAI ? 'text-amber-400' : 'text-blue-600'
                      }`}
                    >
                      {isAI ? 'Autonomous Systems' : 'Core Engineering'}
                    </span>
                    <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${isAI ? 'text-white' : 'text-black'}`}>
                      {service.title}
                    </h3>
                  </div>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isAI ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {service.summary}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {service.benefits.slice(0, 4).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs">
                        <Check
                          className={`h-4 w-4 shrink-0 mt-0.5 ${
                            isAI ? 'text-amber-400' : 'text-black'
                          }`}
                        />
                        <span className={isAI ? 'text-gray-200' : 'text-gray-700'}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`pt-5 border-t flex flex-col gap-3 ${
                    isAI ? 'border-white/15' : 'border-gray-100'
                  }`}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {service.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-sm ${
                          isAI
                            ? 'bg-white/10 text-gray-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className={`text-xs ${isAI ? 'text-gray-400' : 'text-gray-500'}`}>
                      Enterprise SLA
                    </span>

                    {onSelectServiceForConsultation && (
                      <button
                        onClick={() => onSelectServiceForConsultation(service.title)}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-colors ${
                          isAI
                            ? 'bg-white text-black hover:bg-gray-100'
                            : 'bg-black text-white hover:bg-neutral-800'
                        }`}
                      >
                        <span>Inquire Consultation</span>
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
