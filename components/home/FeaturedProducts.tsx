/**
 * FeaturedProducts — Minimalist Apple-style featured products section.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useFeaturedProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/common/LoadingSkeleton';
import { ROUTES } from '@/constants/routes';
import { MOCK_PRODUCTS } from '@/constants/mock';

export default function FeaturedProducts() {
  const { products, isLoading } = useFeaturedProducts(8);
  const displayProducts = products.length > 0 ? products : MOCK_PRODUCTS;

  return (
    <section className="py-20 md:py-32 bg-[#FBFBFD]">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-black mb-6 tracking-tight"
          >
            Sản Phẩm Nổi Bật
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href={ROUTES.PRODUCTS}
              className="inline-flex items-center text-lg text-[#B8860B] hover:text-black transition-colors duration-300 group"
            >
              Xem tất cả sản phẩm
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </motion.div>
        </div>

        {isLoading ? (
          <ProductGridSkeleton count={8} />
        ) : displayProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>Chưa có sản phẩm nổi bật.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
            {displayProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

