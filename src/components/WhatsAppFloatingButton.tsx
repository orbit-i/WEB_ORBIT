import React from 'react';
import { WhatsAppIcon } from './common/BrandIcons';
import { COMPANY_INFO } from '../data/orbitData';

export const WhatsAppFloatingButton: React.FC = () => {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hello ORBIT-I Private Limited, I would like to inquire about your software engineering services.'
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact ORBIT-I on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba59] hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300"
    >
      <WhatsAppIcon className="h-7 w-7 text-white" />
    </a>
  );
};

