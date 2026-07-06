/**
 * Product listing page — shows all products with category filter.
 */

import type { Metadata } from 'next';
import { generatePageMetadata } from '@/utils/seo';
import ProductListingClient from './ProductListingClient';

export const metadata: Metadata = generatePageMetadata({
  title: 'Sản Phẩm Đồng Thủ Công',
  description:
    'Khám phá toàn bộ sản phẩm đồ đồng thủ công Nam Định: lư đồng, đỉnh đồng, chuông đồng, tượng đồng và nhiều hơn nữa.',
  canonical: '/san-pham',
});

export default function ProductsPage() {
  return <ProductListingClient />;
}
