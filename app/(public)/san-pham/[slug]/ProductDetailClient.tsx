/**
 * ProductDetailClient — Minimalist Apple-style product landing page.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { MessageCircle, Phone, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '@/types/product.types';
import { useSettings } from '@/hooks/useSettings';
import { formatPrice } from '@/utils/format';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { settings } = useSettings();

  const specs = [
    { label: 'Chất liệu', value: product.material },
    { label: 'Màu sắc', value: product.color },
    { label: 'Kích thước', value: product.size },
    { label: 'Khối lượng', value: product.weight },
    { label: 'Trạng thái', value: product.stock > 0 ? 'Sẵn sàng giao' : 'Đặt trước' },
  ].filter((s) => s.value);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="pt-10 pb-16 md:pt-20 md:pb-24 border-b border-gray-100">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
            
            {/* Massive Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full md:w-1/2 relative aspect-square bg-[#F5F5F7] rounded-[2rem] md:rounded-[3rem] overflow-hidden"
            >
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover mix-blend-multiply"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl text-gray-300">⚱️</div>
              )}
            </motion.div>

            {/* Typography & CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
            >
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-black leading-tight tracking-tight mb-6">
                {product.name}
              </h1>
              
              <p className="text-gray-500 text-lg md:text-2xl font-light leading-relaxed mb-8 max-w-xl">
                {product.shortDescription}
              </p>

              <div className="text-3xl md:text-4xl font-semibold text-black mb-10">
                {product.salePrice ? formatPrice(product.salePrice) : formatPrice(product.price)}
              </div>

              {/* Mobile CTA (Hidden on Desktop, as Desktop has Sticky Sidebar) */}
              <div className="flex w-full flex-col gap-4 md:hidden">
                <a href={`tel:${settings?.phone}`} className="w-full bg-black text-white rounded-full py-4 text-lg font-medium flex justify-center items-center gap-2">
                  <Phone size={20} /> Gọi tư vấn ngay
                </a>
                <a href={`https://zalo.me/${settings?.zaloPhone}`} target="_blank" rel="noreferrer" className="w-full bg-[#0068FF] text-white rounded-full py-4 text-lg font-medium flex justify-center items-center gap-2">
                  <MessageCircle size={20} /> Nhắn tin Zalo
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. STORYTELLING & STICKY SIDEBAR */}
      <section className="py-20 md:py-32">
        <div className="container max-w-7xl mx-auto px-4 md:px-8 relative">
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24 relative items-start">
            
            {/* Left: Scroll Content (Specs, Description, Process) */}
            <div className="w-full md:w-2/3 flex flex-col gap-24">
              
              {/* Specs */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif text-black mb-10">Thông số chế tác</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                  {specs.map((spec) => (
                    <div key={spec.label} className="border-b border-gray-200 pb-4">
                      <p className="text-gray-400 text-sm tracking-widest uppercase mb-1">{spec.label}</p>
                      <p className="text-black text-lg md:text-xl font-medium">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Description / Ý nghĩa */}
              {product.description && (
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-4xl font-serif text-black mb-10">Ý nghĩa tác phẩm</h2>
                  <div className="prose prose-lg md:prose-xl text-gray-600 font-light leading-relaxed prose-headings:font-serif prose-headings:text-black"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </motion.div>
              )}

              {/* Quy trình chế tác (Tĩnh mockup) */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif text-black mb-10">Quy trình thủ công</h2>
                <div className="grid grid-cols-1 gap-12">
                  <div className="relative aspect-[16/9] bg-[#F5F5F7] rounded-3xl overflow-hidden">
                    <Image src="/images/banner-default.jpg" alt="Quy trình đúc đồng" fill className="object-cover mix-blend-multiply opacity-80" />
                  </div>
                  <p className="text-xl md:text-2xl font-light text-center leading-relaxed text-black max-w-2xl mx-auto">
                    Từng đường nét hoa văn đều được chạm khắc hoàn toàn bằng tay bởi những nghệ nhân có hơn 30 năm kinh nghiệm tại làng nghề Nam Định.
                  </p>
                </div>
              </motion.div>

            </div>

            {/* Right: Sticky Sidebar (Desktop only) */}
            <div className="hidden md:block w-full md:w-1/3 sticky top-32">
              <div className="bg-[#FBFBFD] rounded-[2rem] p-10 flex flex-col gap-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-serif text-black">Liên hệ sở hữu</h3>
                <p className="text-gray-500 font-light">Tác phẩm đang có sẵn. Vui lòng liên hệ để được tư vấn kích thước phù hợp với không gian của bạn.</p>
                
                <div className="flex flex-col gap-4">
                  <a href={`tel:${settings?.phone}`} className="w-full bg-black text-white hover:bg-gray-800 transition-colors rounded-full py-4 text-lg font-medium flex justify-center items-center gap-3">
                    <Phone size={20} /> {settings?.phone ?? '0123 456 789'}
                  </a>
                  <a href={`https://zalo.me/${settings?.zaloPhone}`} target="_blank" rel="noreferrer" className="w-full bg-white border border-gray-200 text-black hover:border-black transition-colors rounded-full py-4 text-lg font-medium flex justify-center items-center gap-3">
                    <MessageCircle size={20} /> Chat Zalo
                  </a>
                </div>

                <hr className="border-gray-200 my-2" />

                <div className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-3"><Truck size={18} className="text-[#B8860B]" /> Giao hàng tận nơi toàn quốc</div>
                  <div className="flex items-center gap-3"><ShieldCheck size={18} className="text-[#B8860B]" /> Bảo hành chất liệu trọn đời</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
