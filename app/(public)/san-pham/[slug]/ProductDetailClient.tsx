/**
 * ProductDetailClient — Premium product detail with gallery zoom + sticky sidebar.
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MessageCircle, Phone, Truck, ShieldCheck, Info,
  ZoomIn, X, ChevronLeft, ChevronRight, Star, Clock, Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types/product.types';
import { useSettings } from '@/hooks/useSettings';
import DOMPurify from 'isomorphic-dompurify';
import { formatPrice } from '@/utils/format';
import { CONTACT_INFO } from '@/constants/contact';

interface ProductDetailClientProps {
  product: Product;
}

const MESSENGER_BASE = 'https://m.me/dodongnamdinh';

// ─── Image Gallery ──────────────────────────────────────────────────────────

function ImageGallery({ images, productName }: { images: string[]; productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);

  const openZoom = (index: number) => {
    setZoomIndex(index);
    setIsZoomed(true);
  };

  const closeZoom = () => setIsZoomed(false);

  const prevZoom = () => setZoomIndex((i) => (i - 1 + images.length) % images.length);
  const nextZoom = () => setZoomIndex((i) => (i + 1) % images.length);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-[#F5F5F7] rounded-3xl flex items-center justify-center text-6xl text-gray-300">
        ⚱️
      </div>
    );
  }

  return (
    <>
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden bg-[#F5F5F7] rounded-3xl cursor-zoom-in group" onClick={() => openZoom(activeIndex)}>
        <Image
          src={images[activeIndex]}
          alt={`${productName} - ảnh ${activeIndex + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Zoom hint */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ZoomIn size={16} className="text-black" />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                i === activeIndex
                  ? 'ring-2 ring-[#B8860B] ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
              aria-label={`Xem ảnh ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom lightbox */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={closeZoom}
          >
            {/* Close button */}
            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Đóng"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevZoom(); }}
                  className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Ảnh trước"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextZoom(); }}
                  className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Ảnh sau"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              key={zoomIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-4xl max-h-[85vh] mx-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[zoomIndex]}
                alt={`${productName} - ảnh phóng to ${zoomIndex + 1}`}
                width={1200}
                height={1200}
                className="object-contain w-full h-full max-h-[85vh] rounded-xl"
                priority
              />
              <p className="text-center text-white/50 text-sm mt-3">
                {zoomIndex + 1} / {images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Sticky Contact Sidebar ──────────────────────────────────────────────────

function StickySidebar({ product, phone }: { product: Product; phone?: string }) {
  const isContactOnly = product.contactForPrice || !product.price || product.price === 0;

  const messengerMsg = encodeURIComponent(`Tôi muốn hỏi về sản phẩm: ${product.name}`);
  const zaloMsg = encodeURIComponent(`Tôi muốn hỏi về sản phẩm: ${product.name}`);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-5">
      {/* Product name & price */}
      <div>
        <h3 className="font-serif text-xl font-bold text-black mb-2 leading-snug">{product.name}</h3>
        <div className="text-2xl font-bold">
          {isContactOnly ? (
            <span className="text-[#B8860B]">Liên hệ báo giá</span>
          ) : (
            <span className="text-black">{formatPrice(product.salePrice ?? product.price)}</span>
          )}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Contact buttons */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Liên hệ ngay</p>

        {/* Messenger */}
        <a
          href={`${MESSENGER_BASE}?text=${messengerMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 bg-[#1877F2] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#1565C0] transition-colors duration-200 shadow-sm"
        >
          <MessageCircle size={18} />
          Nhắn tin Messenger
        </a>

        {/* Zalo */}
        <a
          href={`${CONTACT_INFO.zaloLink}?text=${zaloMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 bg-[#0068FF] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#0054CC] transition-colors duration-200 shadow-sm"
        >
          <Phone size={18} />
          Nhắn tin Zalo
        </a>

        {/* Hotline */}
        <a
          href={`tel:${phone ?? CONTACT_INFO.phone}`}
          className="w-full flex items-center justify-center gap-2.5 bg-black text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors duration-200 shadow-sm"
        >
          <Phone size={18} />
          {phone ?? CONTACT_INFO.phoneDisplay}
        </a>
      </div>

      <hr className="border-gray-100" />

      {/* Trust badges */}
      <ul className="space-y-3">
        {[
          { icon: Truck, text: 'Giao hàng toàn quốc, đóng gói chuyên dụng' },
          { icon: ShieldCheck, text: 'Bảo hành chất liệu đồng trọn đời' },
          { icon: Clock, text: 'Tư vấn 7:00 – 19:00 mỗi ngày' },
          { icon: Package, text: 'Sản xuất theo yêu cầu, nhận ký hiệu riêng' },
        ].map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-start gap-2.5 text-sm text-gray-600">
            <Icon size={16} className="text-[#B8860B] shrink-0 mt-0.5" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { settings } = useSettings();

  const specs = [
    { label: 'Chất liệu', value: product.material },
    { label: 'Màu sắc', value: product.color },
    { label: 'Kích thước', value: product.size },
    { label: 'Khối lượng', value: product.weight },
    { label: 'Trạng thái', value: product.stock > 0 ? `Sẵn hàng (${product.stock} sản phẩm)` : 'Đặt trước' },
    { label: 'Thời gian sản xuất', value: '7-14 ngày làm việc' },
    { label: 'Bảo hành', value: 'Trọn đời (chất liệu đồng)' },
    { label: 'Xuất xứ', value: 'Nam Định, Việt Nam' },
  ].filter((s) => s.value);

  return (
    <div className="bg-white min-h-screen">
      {/* ── HERO: Gallery + Info ───────────────────────────────────────────── */}
      <section className="pt-8 pb-16 md:pt-16 md:pb-24 border-b border-gray-100">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <ImageGallery images={product.images} productName={product.name} />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="lg:sticky lg:top-24"
            >
              {/* Category */}
              {product.categoryName && (
                <p className="text-[#B8860B] text-xs font-semibold uppercase tracking-widest mb-3">
                  {product.categoryName}
                </p>
              )}

              {/* Name */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-black leading-tight tracking-tight mb-4">
                {product.name}
              </h1>

              {/* Rating mock */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="#B8860B" className="text-[#B8860B]" />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">(Đánh giá 5/5)</span>
              </div>

              {/* Short description */}
              {product.shortDescription && (
                <p className="text-gray-500 text-base font-light leading-relaxed mb-6">
                  {product.shortDescription}
                </p>
              )}

              {/* Price */}
              <div className="flex items-end gap-4 mb-8">
                {product.contactForPrice || !product.price || product.price === 0 ? (
                  <span className="text-2xl font-bold text-[#B8860B]">Liên hệ báo giá</span>
                ) : (
                  <>
                    <span className="text-3xl font-bold text-black">
                      {formatPrice(product.salePrice ?? product.price)}
                    </span>
                    {product.salePrice && (
                      <span className="text-lg text-gray-400 line-through mb-1">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3 mb-8">
                <a
                  href={`${MESSENGER_BASE}?text=${encodeURIComponent(`Tôi muốn hỏi về sản phẩm: ${product.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#1877F2] text-white py-4 rounded-2xl font-semibold text-base hover:bg-[#1565C0] transition-colors duration-200 shadow-md"
                >
                  <MessageCircle size={20} />
                  Hỏi qua Messenger
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`${CONTACT_INFO.zaloLink}?text=${encodeURIComponent(`Tôi muốn hỏi về sản phẩm: ${product.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#0068FF] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#0054CC] transition-colors duration-200"
                  >
                    <Phone size={16} />
                    Zalo
                  </a>
                  <a
                    href={`tel:${settings?.phone ?? CONTACT_INFO.phone}`}
                    className="flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors duration-200"
                  >
                    <Phone size={16} />
                    Gọi ngay
                  </a>
                </div>
              </div>

              {/* Quick specs */}
              <div className="bg-[#FDFBF7] rounded-2xl p-5 space-y-3">
                {[
                  { label: 'Chất liệu', value: product.material },
                  { label: 'Kích thước', value: product.size },
                  { label: 'Khối lượng', value: product.weight },
                  { label: 'Bảo hành', value: 'Trọn đời (chất liệu đồng)' },
                ]
                  .filter((s) => s.value)
                  .map((spec) => (
                    <div key={spec.label} className="flex justify-between text-sm">
                      <span className="text-gray-400">{spec.label}</span>
                      <span className="font-medium text-black">{spec.value}</span>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DETAILS + STICKY SIDEBAR ──────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">

            {/* Left: Full specs & description */}
            <div className="lg:col-span-2 space-y-14">

              {/* Thông số đầy đủ */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-2xl md:text-3xl font-serif text-black mb-6">Thông số kỹ thuật</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                  {specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex justify-between py-4 px-2 ${
                        i < specs.length - 1 || specs.length % 2 !== 0
                          ? 'border-b border-gray-100'
                          : ''
                      }`}
                    >
                      <span className="text-gray-400 text-sm">{spec.label}</span>
                      <span className="font-medium text-black text-sm text-right max-w-[200px]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Ý nghĩa & mô tả */}
              {product.description && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <h2 className="text-2xl md:text-3xl font-serif text-black mb-6">Ý nghĩa & mô tả</h2>
                  <div
                    className="prose prose-gray prose-headings:font-serif max-w-none text-gray-600 font-light leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
                  />
                </motion.div>
              )}

              {/* Quy trình chế tác */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-2xl md:text-3xl font-serif text-black mb-6">Quy trình chế tác</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { step: '01', title: 'Thiết kế & Đúc mẫu', desc: 'Vẽ phác thảo và tạo khuôn mẫu theo yêu cầu' },
                    { step: '02', title: 'Đúc đồng', desc: 'Nấu chảy đồng ở 1085°C và đổ vào khuôn' },
                    { step: '03', title: 'Chạm khắc', desc: 'Tỉ mỉ từng hoa văn bằng tay nghệ nhân' },
                    { step: '04', title: 'Hoàn thiện & Kiểm định', desc: 'Mài bóng, tạo màu, kiểm tra chất lượng' },
                  ].map((item) => (
                    <div key={item.step} className="bg-[#FDFBF7] rounded-xl p-5 border border-amber-50">
                      <div className="text-[#B8860B] text-xs font-bold mb-2 tracking-widest">Bước {item.step}</div>
                      <h3 className="font-semibold text-black text-sm mb-1.5">{item.title}</h3>
                      <p className="text-gray-500 text-xs font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Hướng dẫn bảo quản */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-[#111] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#B8860B] rounded-full blur-[100px] opacity-15 -mr-16 -mt-16 pointer-events-none" />
                <h2 className="text-xl font-serif text-[#B8860B] mb-5 flex items-center gap-2">
                  <Info size={20} />
                  Hướng dẫn bảo quản
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  <div>
                    <h3 className="font-medium text-white mb-3 text-sm">Cách làm sạch</h3>
                    <ul className="space-y-2 text-white/60 text-sm font-light">
                      {[
                        'Lau bằng khăn mềm, khô để tránh trầy xước',
                        'Không dùng hóa chất tẩy rửa mạnh',
                        'Có thể dùng chanh/giấm loãng nếu bị mờ màu, sau đó lau sạch',
                      ].map((tip) => (
                        <li key={tip} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-[#B8860B] mt-2 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-3 text-sm">Bài trí phong thủy</h3>
                    <ul className="space-y-2 text-white/60 text-sm font-light">
                      {[
                        'Đặt ở nơi trang trọng, sạch sẽ, cao ráo',
                        'Tránh ánh nắng gắt trực tiếp',
                        'Tránh nơi có độ ẩm cao liên tục',
                      ].map((tip) => (
                        <li key={tip} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-[#B8860B] mt-2 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Customer reviews */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-2xl md:text-3xl font-serif text-black mb-6">Đánh giá từ khách hàng</h2>
                <div className="space-y-4">
                  {[
                    { name: 'Anh Minh Tuấn', location: 'Hà Nội', rating: 5, text: 'Sản phẩm đẹp, chất lượng đồng nguyên chất. Giao hàng cẩn thận. Rất hài lòng!' },
                    { name: 'Chị Thu Hương', location: 'TP.HCM', rating: 5, text: 'Nghệ nhân nhiệt tình tư vấn, sản phẩm y như hình. Đặt lần 2 rồi, rất ưng ý!' },
                    { name: 'Anh Đức Anh', location: 'Đà Nẵng', rating: 5, text: 'Chạm khắc tinh xảo, đồng bóng đẹp. Đặt hàng theo kích thước riêng cũng được.' },
                  ].map((review) => (
                    <div key={review.name} className="bg-[#FDFBF7] rounded-2xl p-5 border border-amber-50">
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={13} fill="#B8860B" className="text-[#B8860B]" />
                        ))}
                      </div>
                      <p className="text-gray-700 text-sm font-light leading-relaxed mb-3 italic">
                        &ldquo;{review.text}&rdquo;
                      </p>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B8860B] to-amber-600 text-white text-xs font-bold flex items-center justify-center">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-black text-sm">{review.name}</p>
                          <p className="text-gray-400 text-xs">{review.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Sticky sidebar */}
            <div className="lg:sticky lg:top-24">
              <StickySidebar product={product} phone={settings?.phone} />
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE STICKY CTA ──────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-100 p-4 safe-area-inset-bottom">
        <div className="flex gap-3 max-w-lg mx-auto">
          <a
            href={`${MESSENGER_BASE}?text=${encodeURIComponent(`Tôi muốn hỏi về sản phẩm: ${product.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#1877F2] text-white py-3.5 rounded-xl font-semibold text-sm"
          >
            <MessageCircle size={16} />
            Messenger
          </a>
          <a
            href={`${CONTACT_INFO.zaloLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#0068FF] text-white py-3.5 rounded-xl font-semibold text-sm"
          >
            <Phone size={16} />
            Zalo
          </a>
          <a
            href={`tel:${settings?.phone ?? CONTACT_INFO.phone}`}
            className="flex items-center justify-center gap-2 bg-black text-white py-3.5 px-4 rounded-xl font-semibold text-sm"
          >
            <Phone size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
