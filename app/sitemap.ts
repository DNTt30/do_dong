/**
 * Dynamic sitemap — auto-generates XML sitemap for all pages.
 */

import type { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';
import { SEO_DEFAULTS } from '@/constants/seo.constants';

const BASE_URL = SEO_DEFAULTS.siteUrl;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/gioi-thieu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/san-pham`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/tin-tuc`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/dat-hang`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/lien-he`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/quy-trinh-che-tac`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/hoi-dap`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/chinh-sach-bao-mat`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/dieu-khoan`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  try {
    // Dynamic product pages
    const { data: products } = await supabase.from('products').select('slug, updatedAt').eq('published', true);
    const productPages: MetadataRoute.Sitemap = (products || []).map((p: { slug: string; updatedAt?: string }) => ({
      url: `${BASE_URL}/san-pham/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Dynamic category pages
    const { data: categories } = await supabase.from('categories').select('slug');
    const categoryPages: MetadataRoute.Sitemap = (categories || []).map((c: { slug: string }) => ({
      url: `${BASE_URL}/san-pham/danh-muc/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    // Dynamic blog pages
    const { data: blogs } = await supabase.from('blogs').select('slug, updatedAt').eq('published', true);
    const blogPages: MetadataRoute.Sitemap = (blogs || []).map((b: { slug: string; updatedAt?: string }) => ({
      url: `${BASE_URL}/tin-tuc/${b.slug}`,
      lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [...staticPages, ...productPages, ...categoryPages, ...blogPages];
  } catch {
    // Return static pages if database is unavailable
    return staticPages;
  }
}
