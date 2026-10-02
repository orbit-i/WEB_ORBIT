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
      : 'ORBIT-I Private Limited | Enterprise Software & Cloud Engineering';
    document.title = finalTitle;

    // 2. Meta Description
    const finalDesc =
      description ||
      'ORBIT-I Private Limited engineers custom enterprise software, scalable web platforms, cross-platform mobile apps, and robust cloud DevOps architecture with 99.9% uptime SLA.';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDesc);

    // 3. Meta Keywords
    const defaultKeywords = [
      'ORBIT-I',
      'Software Company Pakistan',
      'Enterprise Software Development',
      'Web Development',
      'Mobile App Development',
      'Custom ERP Systems',
      'WordPress CMS Development',
      'Custom Coding',
      'Cloud DevOps Infrastructure',
      'React Native',
      'Next.js',
      'SECP Verified Company',
      'Nawabshah Software House',
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
      '@type': 'Organization',
      name: COMPANY_INFO.name,
      legalName: COMPANY_INFO.legalName,
      url: 'https://orbit-i.tech/',
      logo: 'https://orbit-i.tech/orbit-circular-logo.png',
      foundingDate: COMPANY_INFO.established,
      founder: {
        '@type': 'Person',
        name: COMPANY_INFO.founder,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nawabshah',
        addressRegion: 'Sindh',
        addressCountry: 'Pakistan',
      },
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

    return () => {
      // Clean up schema on unmount if needed
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schemaJson, author]);

  return null;
};
