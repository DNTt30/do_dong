import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/services/category.service';
import { generatePageMetadata } from '@/utils/seo';
import ProductListingClient from '../../ProductListingClient';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug).catch(() => null);

  if (!category) {
    return generatePageMetadata({
      title: 'Không tìm thấy danh mục',
      noIndex: true,
    });
  }

  return generatePageMetadata({
    title: `Sản phẩm ${category.name}`,
    description: category.description || `Khám phá các sản phẩm ${category.name} thủ công tinh xảo từ làng nghề Nam Định.`,
    canonical: `/san-pham/danh-muc/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = await getCategoryBySlug(resolvedParams.slug).catch(() => null);

  if (!category) {
    notFound();
  }

  return (
    <ProductListingClient initialCategoryId={category.id} />
  );
}
