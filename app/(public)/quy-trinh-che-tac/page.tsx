/**
 * Quy Trình Chế Tác — Dedicated craft process page.
 */

import type { Metadata } from 'next';
import { generatePageMetadata } from '@/utils/seo';
import CraftProcessPage from './CraftProcessPageClient';

export const metadata: Metadata = generatePageMetadata({
  title: 'Quy Trình Chế Tác Đồ Đồng Thủ Công',
  description:
    'Tìm hiểu quy trình chế tác đồ đồng thủ công truyền thống Nam Định — từ nung chảy đồng, đúc khuôn, chạm khắc đến hoàn thiện và giao hàng.',
  canonical: '/quy-trinh-che-tac',
});

export default function Page() {
  return <CraftProcessPage />;
}
