/**
 * HeroBanner — Minimalist "Apple-style" hero section.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constants/routes';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden w-full h-[85vh] min-h-[600px] flex items-center justify-center bg-black" aria-label="Banner chính">
      {/* Background image */}
      <Image
        src="/images/banner-default.jpg"
        alt="Bộ đỉnh đồng đẹp Nam Định"
        fill
        className="object-cover opacity-60"
        priority
        sizes="100vw"
        quality={90}
      />

      {/* Dark gradient overlay for bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

      {/* Content */}
      <div className="relative z-10 container flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-3xl flex flex-col items-center"
        >
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
            ĐỒ ĐỒNG<br />THỦ CÔNG NAM ĐỊNH
          </h1>
          <p className="text-white/90 text-lg md:text-2xl font-light mb-2 tracking-wide">
            Tinh hoa nghề truyền thống
          </p>
          <p className="text-white/70 text-base md:text-lg font-light mb-10 tracking-wide">
            Được chế tác thủ công tỉ mỉ từng chi tiết
          </p>
          
          <Link
            href={ROUTES.PRODUCTS}
            className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            Xem sản phẩm
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

