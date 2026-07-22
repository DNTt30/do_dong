/**
 * FeaturedProducts — Large product cards with Messenger CTA.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { ROUTES } from '@/constants/routes';
import { CONTACT_INFO } from '@/constants/contact';
import { formatPrice } from '@/utils/format';
import type { Product } from '@/types/product.types';

const MESSENGER_LINK = 'https://m.me/dodongnamdinh';

function FeaturedProductCard({ product, index }: { product: Product; index: number }) {
  const handleMessenger = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(
      `${MESSENGER_LINK}?text=Tôi muốn hỏi về sản phẩm: ${product.name}`,
      '_blank'
    );
  };

  const handleZalo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(
      `${CONTACT_INFO.zaloLink}?text=Tôi muốn hỏi về sản phẩm: ${product.name}`,
      '_blank'
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4), ease: 'easeOut' }}
      className="group"
    >
      <Link href={ROUTES.PRODUCT_DETAIL(product.slug)} className="block">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F7] rounded-2xl md:rounded-3xl mb-5 overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300">⚱️</div>
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Quick action buttons on hover */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={handleMessenger}
              className="flex-1 flex items-center justify-center gap-2 bg-[#1877F2] text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-[#1565C0] transition-colors"
              aria-label="Liên hệ Messenger"
            >
              <MessageCircle size={14} />
              Messenger
            </button>
            <button
              onClick={handleZalo}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0068FF] text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-[#0054CC] transition-colors"
              aria-label="Liên hệ Zalo"
            >
              <Phone size={14} />
              Zalo
            </button>
          </div>

          {/* Sale badge */}
          {product.salePrice && product.salePrice < product.price && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>

        {/* Product info */}
        <div className="px-1">
          {product.categoryName && (
            <p className="text-[#B8860B] text-xs font-semibold uppercase tracking-widest mb-2">
              {product.categoryName}
            </p>
          )}
          <h3 className="font-semibold text-base md:text-lg text-black mb-2 line-clamp-2 group-hover:text-[#B8860B] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm font-light line-clamp-2 mb-3 leading-relaxed">
            {product.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.contactForPrice || !product.price || product.price === 0 ? (
                <span className="text-base font-bold text-[#B8860B]">Liên hệ báo giá</span>
              ) : (
                <>
                  <span className="text-lg font-bold text-black">
                    {formatPrice(product.salePrice ?? product.price)}
                  </span>
                  {product.salePrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* CTA buttons below card */}
      <div className="flex gap-2 mt-4 px-1">
        <button
          onClick={handleMessenger}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#1877F2]/10 text-[#1877F2] text-xs font-semibold py-2.5 rounded-xl hover:bg-[#1877F2] hover:text-white transition-all duration-200 border border-[#1877F2]/20"
          aria-label={`Hỏi qua Messenger về ${product.name}`}
        >
          <MessageCircle size={13} />
          Messenger
        </button>
        <button
          onClick={handleZalo}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#0068FF]/10 text-[#0068FF] text-xs font-semibold py-2.5 rounded-xl hover:bg-[#0068FF] hover:text-white transition-all duration-200 border border-[#0068FF]/20"
          aria-label={`Hỏi qua Zalo về ${product.name}`}
        >
          <Phone size={13} />
          Zalo
        </button>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const { products, isLoading } = useProducts({ featured: true, published: true }, 6);

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#B8860B] uppercase tracking-[0.3em] text-xs font-semibold mb-4"
          >
            Tuyển chọn hàng đầu
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-black mb-4 tracking-tight"
          >
            Sản Phẩm Nổi Bật
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg font-light max-w-lg mx-auto"
          >
            Những tác phẩm đồng thủ công được yêu thích nhất
          </motion.p>
        </div>

        {/* Products grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="aspect-[4/5] rounded-3xl bg-gray-100 animate-pulse mb-5" />
                <div className="h-4 bg-gray-100 rounded animate-pulse mb-2 w-1/3" />
                <div className="h-5 bg-gray-100 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {products.map((product, index) => (
              <FeaturedProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Chưa có sản phẩm nổi bật</p>
          </div>
        )}

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href={ROUTES.PRODUCTS}
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-[#B8860B] transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Xem toàn bộ sản phẩm →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
