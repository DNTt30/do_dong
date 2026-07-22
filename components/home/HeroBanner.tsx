/**
 * HeroBanner — Premium hero với headline đúng yêu cầu.
 * "Tinh hoa đồ đồng thủ công Nam Định"
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
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
  'https://images.unsplash.com/photo-1518707399486-6d702a84ff00?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=2070&auto=format&fit=crop',
];

export default function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative overflow-hidden w-full min-h-[90vh] flex flex-col items-center justify-center bg-black"
      aria-label="Banner chính"
    >
      {/* Background images carousel */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={HERO_IMAGES[currentImageIndex]}
            alt="Đồ đồng truyền thống Nam Định"
            fill
            className="object-cover opacity-55"
            priority={currentImageIndex === 0}
            sizes="100vw"
            quality={90}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-10 container flex flex-col items-center text-center flex-1 justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="max-w-4xl flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-white/90 text-xs font-medium tracking-[0.2em] uppercase mb-8"
          >
            ✦ Làng nghề truyền thống Nam Định ✦
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
          >
            Tinh hoa đồ đồng
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
              thủ công Nam Định
            </span>
          </motion.h1>

          {/* Sub headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-white/80 text-lg md:text-xl lg:text-2xl font-light mb-12 max-w-2xl leading-relaxed"
          >
            Được chế tác thủ công với sự tư vấn bởi người có chuyên môn.
          </motion.p>

          {/* Dual CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href={ROUTES.PRODUCTS}
              className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-full font-semibold text-base hover:bg-amber-50 transition-all duration-300 hover:scale-105 shadow-2xl min-w-[200px] group"
            >
              <span>Xem sản phẩm</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
            <a
              href={CONTACT_INFO.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#B8860B] text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-[#9a7009] transition-all duration-300 hover:scale-105 shadow-[0_4px_24px_rgba(184,134,11,0.5)] min-w-[200px]"
            >
              <MessageCircle size={20} />
              Liên hệ ngay
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats bar at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="relative z-10 w-full"
      >
        <div className="container max-w-5xl mx-auto px-4 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 bg-black/25 hover:bg-black/10 transition-colors duration-300">
                <span className="text-2xl md:text-3xl font-bold text-[#F5C842] leading-none mb-1.5">
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

      {/* Image indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentImageIndex ? 'bg-white w-6' : 'bg-white/40'
            }`}
            aria-label={`Chọn ảnh ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
