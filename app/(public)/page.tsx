/**
 * Homepage — assembles all homepage sections.
 * Server component — generateMetadata for SEO.
 */

import type { Metadata } from 'next';
import { generatePageMetadata, generateOrganizationJsonLd } from '@/utils/seo';
import HeroBanner from '@/components/home/HeroBanner';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import CraftingProcessVideo from '@/components/home/CraftingProcessVideo';
import BrandStory from '@/components/home/BrandStory';
import Testimonials from '@/components/home/Testimonials';

export const metadata: Metadata = generatePageMetadata({
  description:
    'Chuyên sản xuất đồ đồng thủ công truyền thống Nam Định: lư đồng, đỉnh đồng, chuông đồng, tượng đồng. Chất lượng cao, uy tín, giá tốt nhất.',
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

      <HeroBanner />
      <FeaturedCategories />
      <FeaturedProducts />
      <WhyChooseUs />
      <CraftingProcessVideo />
      <BrandStory />
      <Testimonials />
    </>
  );
}
