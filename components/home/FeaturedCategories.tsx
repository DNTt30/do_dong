/**
 * FeaturedCategories — 6 danh mục chính theo yêu cầu.
 * Bộ Tam Sự, Bộ Ngũ Sự, Đỉnh Đồng, Lư Hương, Hạc Đồng, Tượng Đồng
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { useCategories } from '@/hooks/useCategories';
import { ROUTES } from '@/constants/routes';

const DEFAULT_CATEGORIES = [
  {
    id: 'bo-tam-su',
    name: 'Bộ Tam Sự',
    slug: 'bo-tam-su',
    description: 'Bộ đồ thờ 3 món truyền thống',
    image: null,
    emoji: '🏺',
  },
  {
    id: 'bo-ngu-su',
    name: 'Bộ Ngũ Sự',
    slug: 'bo-ngu-su',
    description: 'Bộ đồ thờ 5 món hoàn chỉnh',
    image: null,
    emoji: '⚱️',
  },
  {
    id: 'dinh-dong',
    name: 'Đỉnh Đồng',
    slug: 'dinh-dong',
    description: 'Đỉnh đồng thờ cúng cao cấp',
    image: null,
    emoji: '🔱',
  },
  {
    id: 'lu-huong',
    name: 'Lư Hương',
    slug: 'lu-huong',
    description: 'Lư hương đồng chính hãng',
    image: null,
    emoji: '🕯️',
  },
  {
    id: 'hac-dong',
    name: 'Hạc Đồng',
    slug: 'hac-dong',
    description: 'Hạc đồng thờ cúng tinh xảo',
    image: null,
    emoji: '🦢',
  },
  {
    id: 'tuong-dong',
    name: 'Tượng Đồng',
    slug: 'tuong-dong',
    description: 'Tượng đồng nghệ thuật',
    image: null,
    emoji: '🗿',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function FeaturedCategories() {
  const { categories, isLoading } = useCategories();

  const displayCategories =
    categories.length >= 6
      ? categories.slice(0, 6)
      : DEFAULT_CATEGORIES;

  return (
    <section className="py-20 md:py-32 bg-[#FDFBF7] border-b border-amber-100/50">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#B8860B] uppercase tracking-[0.3em] text-xs font-semibold mb-4"
          >
            Khám phá bộ sưu tập
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-black mb-4 tracking-tight"
          >
            Danh Mục Nổi Bật
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg font-light max-w-lg mx-auto"
          >
            Lựa chọn theo nhu cầu thờ cúng và trang trí của bạn
          </motion.p>
        </div>

        {/* Category Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-full aspect-square rounded-2xl bg-gray-100 animate-pulse mb-4" />
                <div className="h-4 w-24 bg-gray-100 animate-pulse rounded" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8"
          >
            {displayCategories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link
                  href={ROUTES.CATEGORY(category.slug)}
                  className="group flex flex-col items-center"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-white rounded-2xl mb-4 transition-all duration-500 group-hover:shadow-[0_8px_30px_rgba(184,134,11,0.2)] group-hover:scale-[1.03] border border-amber-100/50">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl md:text-5xl">
                          {'emoji' in category ? (category as { emoji: string }).emoji : '⚱️'}
                        </span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#B8860B]/0 group-hover:bg-[#B8860B]/5 transition-colors duration-300 rounded-2xl" />
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-sm md:text-base text-black text-center tracking-tight group-hover:text-[#B8860B] transition-colors duration-300 leading-tight">
                    {category.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <Link
            href={ROUTES.PRODUCTS}
            className="inline-flex items-center gap-2 text-sm font-semibold text-black border border-black/20 px-7 py-3.5 rounded-full hover:bg-black hover:text-white transition-all duration-300"
          >
            Xem tất cả sản phẩm
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
