/**
 * Product detail page — server component with dynamic metadata and JSON-LD.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/services/product.service';
import { generatePageMetadata, generateProductJsonLd } from '@/utils/seo';
import ProductDetailClient from './ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  return generatePageMetadata({
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.shortDescription,
    image: product.images[0],
    canonical: `/san-pham/${product.slug}`,
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const jsonLd = generateProductJsonLd(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
