import React, { useEffect } from 'react';
import { COMPANY_INFO } from '../../data/orbitData';

export interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile' | 'business.business';
  schemaJson?: Record<string, any>;
  author?: string;
}

export const SeoHead: React.FC<SeoProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  schemaJson,
  author = 'ORBIT-I Private Limited',
}) => {
  useEffect(() => {
    // 1. Page Title
    const finalTitle = title
      ? `${title} | ORBIT-I Private Limited`
      : 'ORBIT-I Private Limited | Leading Software House Nawabshah, Hyderabad, Karachi & Islamabad';
    document.title = finalTitle;

    // 2. Meta Description
    const finalDesc =
      description ||
      'SECP-registered software engineering company headquartered in Nawabshah, Sindh, with delivery operations in Karachi, Hyderabad, Sukkur, Islamabad & Lahore. We build enterprise web platforms, mobile apps, and cloud architectures for Pakistan, UK, US, and UAE businesses.';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDesc);

    // 3. Meta Keywords (Targeting Nawabshah, Hyderabad, Karachi, Sukkur, Islamabad, Lahore, Pakistan, plus UK, US, UAE)
    const defaultKeywords = [
      'ORBIT-I Private Limited',
      'software house in nawabshah',
      'best software company nawabshah',
      'it company nawabshah sindh',
      'software house hyderabad sindh',
      'web development company hyderabad',
      'software house karachi',
      'custom software development karachi',
      'software development company islamabad',
      'it company islamabad rawalpindi',
      'software company lahore',
      'software company sukkur sindh',
      'secp registered software company pakistan',
      'top software house in pakistan',
      'mobile app development pakistan',
      'custom web application development',
      'react developers pakistan',
      'node.js development company',
      'asp.net enterprise solutions',
      'abdul samad rind software engineer',
      'maria almani',
      'muhammad muneeb ur rahman shahzad',
      'offshore software engineering uk us uae',
      'cloud devops infrastructure 99.9 uptime',
    ];
    const finalKeywords = keywords && keywords.length > 0 ? keywords : defaultKeywords;
    let metaKw = document.querySelector('meta[name="keywords"]');
    if (!metaKw) {
      metaKw = document.createElement('meta');
      metaKw.setAttribute('name', 'keywords');
      document.head.appendChild(metaKw);
    }
    metaKw.setAttribute('content', finalKeywords.join(', '));

    // 4. Canonical URL
    const finalCanonical =
      canonicalUrl ||
      (typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}`
        : 'https://orbit-i.tech/');
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', finalCanonical);

    // 5. OpenGraph Tags
    const setMetaProperty = (prop: string, val: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', prop);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    setMetaProperty('og:title', finalTitle);
    setMetaProperty('og:description', finalDesc);
    setMetaProperty('og:url', finalCanonical);
    setMetaProperty('og:type', ogType);
    setMetaProperty('og:site_name', COMPANY_INFO.legalName);
    setMetaProperty(
      'og:image',
      ogImage || 'https://orbit-i.tech/orbit-circular-logo.png'
    );

    // 6. Twitter Card Tags
    const setMetaName = (name: string, val: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', val);
    };

    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:site', '@orbit_i_ltd');
    setMetaName('twitter:title', finalTitle);
    setMetaName('twitter:description', finalDesc);
    setMetaName(
      'twitter:image',
      ogImage || 'https://orbit-i.tech/orbit-circular-logo.png'
    );
    setMetaName('author', author);

    // 7. Schema.org JSON-LD Structured Data
    const scriptId = 'orbit-seo-schema';
    let schemaScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = scriptId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': ['ProfessionalService', 'Organization'],
      name: COMPANY_INFO.name,
      legalName: COMPANY_INFO.legalName,
      url: 'https://orbit-i.tech/',
      logo: 'https://orbit-i.tech/orbit-circular-logo.png',
      foundingDate: COMPANY_INFO.established,
      founder: [
        {
          '@type': 'Person',
          name: COMPANY_INFO.founder,
          jobTitle: 'Founder & CEO',
        },
        {
          '@type': 'Person',
          name: 'Maria Almani',
          jobTitle: 'Co-Founder & COO',
        },
        {
          '@type': 'Person',
          name: 'Muhammad Muneeb Ur Rahman Shahzad',
          jobTitle: 'Co-Founder & CTO',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nawabshah',
        addressRegion: 'Sindh',
        postalCode: '67450',
        addressCountry: 'PK',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 26.2483,
        longitude: 68.4096,
      },
      areaServed: [
        'Nawabshah',
        'Hyderabad',
        'Karachi',
        'Sukkur',
        'Islamabad',
        'Lahore',
        'Pakistan',
        'United Kingdom',
        'United States',
        'United Arab Emirates',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: COMPANY_INFO.phone,
        contactType: 'customer support',
        email: COMPANY_INFO.email,
        availableLanguage: ['English', 'Urdu', 'Sindhi'],
      },
      sameAs: Object.values(COMPANY_INFO.socialLinks).filter(Boolean),
    };

    schemaScript.text = JSON.stringify(schemaJson || defaultSchema);
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schemaJson, author]);

  return null;
};
