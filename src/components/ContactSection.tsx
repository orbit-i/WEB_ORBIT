import React, { useState } from 'react';
import { COMPANY_INFO, VERIFIED_SERVICES } from '../data/orbitData';
import { useCms } from '../context/CmsContext';
import { SeoHead } from './common/SeoHead';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService = '' }) => {
  const { pageContents } = useCms();
  const contactData = pageContents?.contact;

  const directEmail = contactData?.customFields?.directEmail || COMPANY_INFO.email;
  const directPhone = contactData?.customFields?.directPhone || COMPANY_INFO.phone;
  const directWhatsApp = contactData?.customFields?.directWhatsApp || COMPANY_INFO.phone;
  const headquarters = contactData?.customFields?.headquartersAddress || COMPANY_INFO.location;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceRequired: initialService || 'Web Application Development',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmittedRef(data.referenceId || `ORB-INQ-${Date.now()}`);
      } else {
        setErrorMessage(data.error || 'Failed to submit inquiry. Please email us directly.');
      }
    } catch {
      setSubmittedRef(`ORB-INQ-${Date.now()}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white text-black py-16 md:py-24">
      <SeoHead
        title={contactData?.metaTitle || `Contact Us | ${COMPANY_INFO.legalName}`}
        description={contactData?.metaDescription || contactData?.subheadline || 'Get in touch with the ORBIT-I engineering leadership for project consultations and technical discovery.'}
        canonicalUrl="https://orbit-i.tech/#contact"
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Contact Info - 5 Cols */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight">
              {contactData?.headline || 'Contact Us'}
            </h2>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {contactData?.subheadline || contactData?.description || 'Have a project in mind or need technical consultation? Reach out directly to discuss your requirements with our engineering leadership.'}
            </p>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-gray-100 rounded-full border border-gray-200 text-black shrink-0 mt-0.5">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase block">Email</span>
                  <a
                    href={`mailto:${directEmail}`}
                    className="text-base font-semibold text-black hover:underline"
                  >
                    {directEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-gray-100 rounded-full border border-gray-200 text-black shrink-0 mt-0.5">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase block">Phone / WhatsApp</span>
                  <a
                    href={`tel:${directPhone.replace(/\s+/g, '')}`}
                    className="text-base font-semibold text-black hover:underline"
                  >
                    {directPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-gray-100 rounded-full border border-gray-200 text-black shrink-0 mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase block">Operating Office</span>
                  <div className="text-sm font-semibold text-black">
                    {headquarters}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-2 text-xs font-medium">
              <a
                href={COMPANY_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-gray-300 rounded-full hover:border-black text-black transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={COMPANY_INFO.socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-gray-300 rounded-full hover:border-black text-black transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={COMPANY_INFO.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-gray-300 rounded-full hover:border-black text-black transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Right: Contact Form - 7 Cols */}
          <div className="lg:col-span-7">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-10">
              {submittedRef ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle2 className="h-12 w-12 text-black mx-auto" />
                  <h3 className="text-2xl font-bold text-black">
                    Thank You for Getting in Touch
                  </h3>
                  <p className="text-sm text-gray-700 max-w-md mx-auto leading-relaxed">
                    Your inquiry has been received. A technical lead will review your message and respond within 1 business day.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmittedRef(null)}
                      className="px-6 py-2.5 bg-black text-white rounded-full text-xs font-medium border-2 border-black hover:bg-white hover:text-black transition-all"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-black mb-4">
                    Send a Message
                  </h3>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 0000000"
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company Ltd"
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Service Required
                    </label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:border-black transition-colors"
                    >
                      {VERIFIED_SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="General Consultation">General Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project requirements..."
                      className="w-full p-4 bg-white border border-gray-300 rounded-lg text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-black text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-medium transition-all duration-200 text-sm border-2 border-black whitespace-nowrap shadow-sm disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
