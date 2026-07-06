/**
 * SEO utility functions for generating metadata and JSON-LD structured data.
 */

import type { Metadata } from 'next';
import { SEO_DEFAULTS } from '@/constants/seo.constants';
import type { Product } from '@/types/product.types';
import type { Blog } from '@/types/blog.types';
import type { BreadcrumbItem } from '@/types/common.types';

/**
 * Build a full page title with site name suffix.
 */
export function buildTitle(pageTitle?: string): string {
  if (!pageTitle) return SEO_DEFAULTS.defaultTitle;
  return `${pageTitle} | ${SEO_DEFAULTS.siteName}`;
}

/**
 * Generate standard Next.js Metadata for a page.
 */
export function generatePageMetadata(options: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
}): Metadata {
  const title = buildTitle(options.title);
  const description = options.description ?? SEO_DEFAULTS.defaultDescription;
  const image = options.image ?? `${SEO_DEFAULTS.siteUrl}${SEO_DEFAULTS.ogImage}`;
  const canonical = options.canonical ?? SEO_DEFAULTS.siteUrl;

  return {
    title,
    description,
    alternates: { canonical },
    robots: options.noIndex ? 'noindex,nofollow' : 'index,follow',
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SEO_DEFAULTS.siteName,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: 'vi_VN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Generate JSON-LD structured data for a Product page.
 */
export function generateProductJsonLd(product: Product): object {
  const imageUrl = product.images[0] ?? `${SEO_DEFAULTS.siteUrl}${SEO_DEFAULTS.ogImage}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: SEO_DEFAULTS.siteName,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      price: product.salePrice ?? product.price,
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SEO_DEFAULTS.siteName,
      },
    },
    url: `${SEO_DEFAULTS.siteUrl}/san-pham/${product.slug}`,
  };
}

/**
 * Generate JSON-LD structured data for an Article (Blog post).
 */
export function generateArticleJsonLd(blog: Blog): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt ?? blog.seoDescription,
    image: blog.thumbnail,
    author: {
      '@type': 'Person',
      name: blog.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_DEFAULTS.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_DEFAULTS.siteUrl}/logo/logo.png`,
      },
    },
    datePublished: blog.createdAt
      ? new Date(blog.createdAt).toISOString()
      : undefined,
    url: `${SEO_DEFAULTS.siteUrl}/tin-tuc/${blog.slug}`,
  };
}

/**
 * Generate JSON-LD BreadcrumbList structured data.
 */
export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${SEO_DEFAULTS.siteUrl}${item.href}` : undefined,
    })),
  };
}

/**
 * Generate JSON-LD Organization structured data (for homepage).
 */
export function generateOrganizationJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_DEFAULTS.siteName,
    url: SEO_DEFAULTS.siteUrl,
    logo: `${SEO_DEFAULTS.siteUrl}/logo/logo.png`,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Vietnamese',
    },
  };
}
