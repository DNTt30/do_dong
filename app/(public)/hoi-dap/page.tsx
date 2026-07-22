/**
 * FAQ Page route — server component for metadata + SEO.
 */

import type { Metadata } from 'next';
import { generatePageMetadata } from '@/utils/seo';
import FAQPageClient from './FAQPageClient';

export const metadata: Metadata = generatePageMetadata({
  title: 'Hỏi Đáp — Giải Đáp Thắc Mắc',
  description:
    'Tìm câu trả lời cho những thắc mắc phổ biến về sản phẩm đồ đồng thủ công Nam Định: chất liệu, đặt hàng, giao hàng, bảo hành.',
  canonical: '/hoi-dap',
});

export default function FAQPage() {
  return <FAQPageClient />;
}
