/**
 * robots.txt — search engine crawling rules.
 */

import type { MetadataRoute } from 'next';
import { SEO_DEFAULTS } from '@/constants/seo.constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${SEO_DEFAULTS.siteUrl}/sitemap.xml`,
    host: SEO_DEFAULTS.siteUrl,
  };
}
