/**
 * Homepage — assembled as an Artisan Landing Page.
 * Server component — generateMetadata for SEO.
 */

import type { Metadata } from 'next';
import { generatePageMetadata, generateOrganizationJsonLd } from '@/utils/seo';

// Components
import ArtisanHero from '@/components/home/ArtisanHero';
import ArtisanGallery from '@/components/home/ArtisanGallery';
import ArtisanBehindTheScenes from '@/components/home/ArtisanBehindTheScenes';
import ArtisanCTA from '@/components/home/ArtisanCTA';

export const metadata: Metadata = generatePageMetadata({
  description:
    'Góc chế tác đồ đồng thủ công Nam Định. Những tác phẩm khảm ngũ sắc, khảm bạc độc bản, mang đậm dấu ấn cá nhân của người thợ.',
});

export default function HomePage() {
  const orgJsonLd = generateOrganizationJsonLd();

  return (
    <>
      {/* JSON-LD Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* 1. Lời chào từ người thợ (Hero Section) */}
      <ArtisanHero />

      {/* 2. Trưng bày tác phẩm (Gallery - 3-5 mẫu đẹp nhất) */}
      <ArtisanGallery />

      {/* 3. "Behind the Scenes" (Hậu trường chế tác) */}
      <ArtisanBehindTheScenes />

      {/* 4. Kết nối trực tiếp (Call to Action Zalo/FB) */}
      <ArtisanCTA />
    </>
  );
}
