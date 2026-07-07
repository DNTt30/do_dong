/**
 * HeroBanner — Minimalist Apple-style hero với stats và dual CTA.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '@/constants/routes';
import { CONTACT_INFO, BUSINESS_STATS } from '@/constants/contact';

const STATS = [
  { value: BUSINESS_STATS.yearsExperience, label: 'Năm kinh nghiệm' },
  { value: BUSINESS_STATS.productsSold, label: 'Sản phẩm đã bán' },
  { value: BUSINESS_STATS.happyCustomers, label: 'Khách hàng tin dùng' },
  { value: BUSINESS_STATS.provinces, label: 'Tỉnh thành giao hàng' },
];

const HERO_IMAGES = [
  '/images/banner-default.jpg',
  'https://images.unsplash.com/photo-1518707399486-6d702a84ff00?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=2070&auto=format&fit=crop',
  '/images/product-1.jpg',
];

export default function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative overflow-hidden w-full h-[75vh] min-h-[500px] flex flex-col items-center justify-center bg-black"
      aria-label="Banner chính"
    >
      {/* Background images carousel */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGES[currentImageIndex]}
            alt="Đồ đồng truyền thống Nam Định"
            fill
            className="object-cover opacity-60"
            priority={currentImageIndex === 0}
            sizes="100vw"
            quality={90}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-[1]" />

      {/* Content */}
      <div className="relative z-10 container flex flex-col items-center text-center flex-1 justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-3xl flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-xs font-medium tracking-widest uppercase mb-8"
          >
            ✦ Làng nghề truyền thống Nam Định ✦
          </motion.div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
            ĐỒ ĐỒNG<br />THỦ CÔNG NAM ĐỊNH
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light mb-10 tracking-wide max-w-xl">
            Chế tác thủ công tỉ mỉ — chất liệu đồng nguyên chất — giao toàn quốc
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href={ROUTES.PRODUCTS}
              className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-full font-semibold text-base hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl min-w-[180px]"
            >
              Xem sản phẩm
            </Link>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="inline-flex items-center justify-center gap-2 bg-[#B8860B] text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-[#9a7009] transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_rgba(184,134,11,0.4)] min-w-[180px]"
            >
              <Phone size={18} />
              Gọi tư vấn ngay
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10 w-full"
      >
        <div className="container max-w-4xl mx-auto px-4 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center py-5 px-4 bg-black/20">
                <span className="text-2xl md:text-3xl font-bold text-white leading-none mb-1">
                  {stat.value}
                </span>
                <span className="text-white/60 text-xs font-medium tracking-wide text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
