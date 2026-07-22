/**
 * ProductCard — reusable card for product listings.
 * Features: image hover scale, Messenger + Zalo quick CTA, price display.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import type { Product } from '@/types/product.types';
import { ROUTES } from '@/constants/routes';
import { CONTACT_INFO } from '@/constants/contact';
import { formatPrice, calcDiscountPercent } from '@/utils/format';

const MESSENGER_BASE = 'https://m.me/dodongnamdinh';

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export default function ProductCard({ product, index = 0, className }: ProductCardProps) {
  const discountPercent =
    product.salePrice ? calcDiscountPercent(product.price, product.salePrice) : 0;

  const handleMessenger = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = encodeURIComponent(`Tôi muốn hỏi về sản phẩm: ${product.name}`);
    window.open(`${MESSENGER_BASE}?text=${msg}`, '_blank');
  };

  const handleZalo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = encodeURIComponent(`Tôi muốn hỏi về sản phẩm: ${product.name}`);
    window.open(`${CONTACT_INFO.zaloLink}?text=${msg}`, '_blank');
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
        <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-[#F5F5F7] rounded-2xl mb-4">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">
              ⚱️
            </div>
          )}

          {/* Sale badge */}
          {discountPercent > 0 && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-10">
              -{discountPercent}%
            </span>
          )}

          {/* Out of stock overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
              <span className="text-white text-xs font-medium bg-black/60 px-3 py-1 rounded-full">
                Liên hệ đặt trước
              </span>
            </div>
          )}

          {/* Hover action overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={handleMessenger}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#1877F2] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#1565C0] transition-colors"
              aria-label={`Messenger về ${product.name}`}
            >
              <MessageCircle size={13} />
              Messenger
            </button>
            <button
              onClick={handleZalo}
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#0068FF] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#0054CC] transition-colors"
              aria-label={`Zalo về ${product.name}`}
            >
              <Phone size={13} />
              Zalo
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="px-1">
          {product.categoryName && (
            <p className="text-[#B8860B] text-xs font-semibold uppercase tracking-widest mb-1.5">
              {product.categoryName}
            </p>
          )}

          <h3 className="font-semibold text-black text-sm md:text-base mb-2.5 line-clamp-2 group-hover:text-[#B8860B] transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            {product.contactForPrice || !product.price || product.price === 0 ? (
              <span className="text-sm font-bold text-[#B8860B]">
                Liên hệ báo giá
              </span>
            ) : product.salePrice ? (
              <>
                <span className="text-base font-bold text-black">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-black">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Bottom CTA buttons */}
      <div className="flex gap-2 mt-3 px-1">
        <button
          onClick={handleMessenger}
          className="flex-1 flex items-center justify-center gap-1.5 text-[#1877F2] bg-[#1877F2]/8 border border-[#1877F2]/20 text-xs font-semibold py-2.5 rounded-xl hover:bg-[#1877F2] hover:text-white transition-all duration-200"
          aria-label={`Hỏi Messenger về ${product.name}`}
        >
          <MessageCircle size={13} />
          Messenger
        </button>
        <button
          onClick={handleZalo}
          className="flex-1 flex items-center justify-center gap-1.5 text-[#0068FF] bg-[#0068FF]/8 border border-[#0068FF]/20 text-xs font-semibold py-2.5 rounded-xl hover:bg-[#0068FF] hover:text-white transition-all duration-200"
          aria-label={`Hỏi Zalo về ${product.name}`}
        >
          <Phone size={13} />
          Zalo
        </button>
      </div>
    </motion.div>
  );
}
