/**
 * NewProducts — horizontal Swiper for newest products.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { useNewProducts } from '@/hooks/useProducts';
import SectionTitle from '@/components/common/SectionTitle';
import ProductCard from '@/components/product/ProductCard';
import { ROUTES } from '@/constants/routes';
import { MOCK_PRODUCTS } from '@/constants/mock';

import 'swiper/css';
import 'swiper/css/free-mode';

export default function NewProducts() {
  const { products } = useNewProducts(10);

  return (
    <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <SectionTitle
            label="Mới nhất"
            title="Sản Phẩm Mới Về"
            subtitle="Các tác phẩm đồng mới nhất vừa ra lò từ lò đúc truyền thống."
            align="left"
          />
          <Link
            href={ROUTES.PRODUCTS}
            className="shrink-0 flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-600 transition-colors"
          >
            Xem tất cả
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Full-bleed Swiper */}
      <div className="pl-4 md:pl-[calc((100vw-1280px)/2+1rem)]">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={16}
          slidesPerView="auto"
          freeMode
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          className="!pb-4"
        >
          {(products.length > 0 ? products : MOCK_PRODUCTS).map((product, index) => (
            <SwiperSlide key={product.id} style={{ width: '260px' }}>
              <ProductCard product={product} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
