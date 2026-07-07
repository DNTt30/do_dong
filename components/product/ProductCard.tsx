/**
 * ProductCard — reusable card for product listings.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Product } from '@/types/product.types';
import { ROUTES } from '@/constants/routes';
import { CONTACT_INFO } from '@/constants/contact';
import { formatPrice, calcDiscountPercent } from '@/utils/format';

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export default function ProductCard({ product, index = 0, className }: ProductCardProps) {
  const discountPercent =
    product.salePrice ? calcDiscountPercent(product.price, product.salePrice) : 0;

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(CONTACT_INFO.zaloLink, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
      className={className}
    >
      <Link
        href={ROUTES.PRODUCT_DETAIL(product.slug)}
        className="group block"
      >
        {/* Image wrapper */}
        <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-[#F5F5F7] rounded-2xl mb-5">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-in-out"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">
              ⚱️
            </div>
          )}

          {/* Sale badge */}
          {discountPercent > 0 && (
            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full z-10">
              -{discountPercent}%
            </span>
          )}

          {/* Out of stock overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
              <span className="text-white text-sm font-medium bg-black/60 px-3 py-1 rounded-full">
                Liên hệ đặt trước
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="text-center px-2">
          <h3 className="font-medium text-black text-sm md:text-base mb-3 line-clamp-2 group-hover:text-[#B8860B] transition-colors leading-relaxed tracking-wide">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 justify-center mb-3">
            {product.salePrice ? (
              <>
                <span className="text-base font-semibold text-black">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-base font-semibold text-black">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* CTA — opens Zalo */}
          <button
            onClick={handleContactClick}
            className="text-xs font-medium uppercase tracking-widest text-black border border-black/20 rounded-full px-6 py-2 hover:bg-[#B8860B] hover:text-white hover:border-[#B8860B] transition-all duration-300"
            aria-label={`Liên hệ về sản phẩm ${product.name}`}
          >
            Liên hệ
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
