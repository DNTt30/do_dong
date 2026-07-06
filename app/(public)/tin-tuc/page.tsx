/**
 * Blog listing page.
 */

import type { Metadata } from 'next';
import { generatePageMetadata } from '@/utils/seo';
import BlogListingClient from './BlogListingClient';

export const metadata: Metadata = generatePageMetadata({
  title: 'Tin Tức & Bài Viết',
  description: 'Cập nhật tin tức về sản phẩm đồ đồng, làng nghề Nam Định và văn hóa đồ đồng truyền thống.',
  canonical: '/tin-tuc',
});

export default function BlogPage() {
  return <BlogListingClient />;
}
