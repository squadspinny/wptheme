export interface SEOConfig {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_ORIGIN = 'https://errorease.com';

export function getCanonicalUrl(path: string): string {
  const origin =
    typeof window !== 'undefined' &&
    window.location.origin &&
    !window.location.origin.includes('localhost') &&
    !window.location.origin.includes('127.0.0.1')
      ? window.location.origin
      : DEFAULT_ORIGIN;

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${cleanPath === '/' ? '' : cleanPath}`;
}

export function updatePageSEO(config: SEOConfig): void {
  if (typeof document === 'undefined') return;

  // 1. Page Title
  document.title = config.title;

  // 2. Canonical URL
  const canonicalUrl = getCanonicalUrl(config.canonicalPath);
  let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // Helper to set or update meta tag
  const setMeta = (nameAttr: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector<HTMLMetaElement>(`meta[${nameAttr}="${attrValue}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 3. Meta Description & Robots
  setMeta('name', 'description', config.description);
  setMeta('name', 'robots', 'index, follow');

  if (config.keywords && config.keywords.length > 0) {
    setMeta('name', 'keywords', config.keywords.join(', '));
  }

  // 4. OpenGraph Metadata
  setMeta('property', 'og:type', config.type || 'website');
  setMeta('property', 'og:title', config.title);
  setMeta('property', 'og:description', config.description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('property', 'og:site_name', 'Errorease');

  // 5. Twitter Cards
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', config.title);
  setMeta('name', 'twitter:description', config.description);

  // 6. Schema.org JSON-LD Structured Data
  let scriptEl = document.querySelector<HTMLScriptElement>('#schema-structured-data');
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'schema-structured-data';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  if (config.structuredData) {
    scriptEl.textContent = JSON.stringify(config.structuredData);
  } else {
    scriptEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: config.title,
      description: config.description,
      url: canonicalUrl,
      publisher: {
        '@type': 'Organization',
        name: 'Errorease',
        url: DEFAULT_ORIGIN,
      },
    });
  }
}
