/**
 * Contact page — form, map, and contact information.
 */

import type { Metadata } from 'next';
import { generatePageMetadata } from '@/utils/seo';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = generatePageMetadata({
  title: 'Liên Hệ',
  description:
    'Liên hệ với chúng tôi để được tư vấn về sản phẩm đồng thủ công Nam Định. Hotline, Zalo, Messenger sẵn sàng hỗ trợ 7 ngày/tuần.',
  canonical: '/lien-he',
});

export default function ContactPage() {
  return <ContactPageClient />;
}
