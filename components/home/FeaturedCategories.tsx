/**
 * FeaturedCategories — Minimalist Apple-style category grid.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCategories } from '@/hooks/useCategories';
import { Skeleton } from '@/components/common/LoadingSkeleton';
import { ROUTES } from '@/constants/routes';
import { MOCK_CATEGORIES } from '@/constants/mock';

export default function FeaturedCategories() {
  const { categories, isLoading } = useCategories();

  const displayCategories = categories.length > 0 ? categories : MOCK_CATEGORIES;

  return (
    <section className="py-16 md:py-24 bg-primary-50 border-b border-border/10">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-black mb-4 tracking-tight"
          >
            Danh Mục Nổi Bật
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg md:text-xl font-light"
          >
            Lựa chọn theo nhu cầu thờ cúng và trang trí của bạn
          </motion.p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="h-64 w-full rounded-2xl mb-6" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {displayCategories.slice(0, 4).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              >
                <Link
                  href={ROUTES.CATEGORY(category.slug)}
                  className="group flex flex-col items-center"
                >
                  {/* Image container without borders */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#F5F5F7] rounded-3xl mb-6 transition-transform duration-500 group-hover:scale-[1.02]">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover object-center mix-blend-multiply"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl text-gray-300">⚱️</span>
                      </div>
                    )}
                  </div>

                  {/* Minimalist Title */}
                  <h3 className="font-semibold text-xl md:text-2xl text-black text-center tracking-tight group-hover:text-[#B8860B] transition-colors duration-300">
                    {category.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
