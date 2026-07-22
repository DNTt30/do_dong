/**
 * Homepage — Premium landing page theo yêu cầu.
 * Server component — generateMetadata for SEO.
 */

import type { Metadata } from 'next';
import { generatePageMetadata, generateOrganizationJsonLd } from '@/utils/seo';

// Sections
import HeroBanner from '@/components/home/HeroBanner';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import SocialProof from '@/components/home/SocialProof';
import CastingProcess from '@/components/home/CastingProcess';
import BrandStory from '@/components/home/BrandStory';
import Testimonials from '@/components/home/Testimonials';
import FacebookVideos from '@/components/home/FacebookVideos';
import LatestNews from '@/components/home/LatestNews';

export const metadata: Metadata = generatePageMetadata({
  description:
    'Đồ đồng thủ công Nam Định — Tinh hoa chế tác truyền thống. Lư đồng, đỉnh đồng, tượng đồng, hạc đồng chính hãng. Tư vấn bởi chuyên gia, giao toàn quốc.',
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

      {/* 1. Hero Section */}
      <HeroBanner />

      {/* 2. Featured Categories */}
      <FeaturedCategories />

      {/* 3. Featured Products */}
      <FeaturedProducts />

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Social Proof — Số liệu tin cậy */}
      <SocialProof />

      {/* 5. Craft Process Timeline */}
      <CastingProcess />

      {/* 6. Brand Story */}
      <BrandStory />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Facebook Videos */}
      <FacebookVideos />

      {/* 9. Latest Articles */}
      <LatestNews />
    </>
  );
}
