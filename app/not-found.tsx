/**
 * 404 Not Found — Premium design with animation.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, Phone } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { CONTACT_INFO } from '@/constants/contact';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-xl mx-auto">
        {/* Animated number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <span
              className="font-serif font-black text-[160px] md:text-[220px] leading-none tracking-tighter"
              style={{
                background: 'linear-gradient(135deg, #B8860B 0%, #F5C842 50%, #8B5A2B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              404
            </span>
            {/* Decorative bronze circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-4 -right-4 w-16 h-16 rounded-full border-2 border-dashed border-[#B8860B]/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full border-2 border-dashed border-[#B8860B]/20"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {/* Bronze icon */}
          <div className="text-5xl mb-5">⚱️</div>

          <h1 className="font-serif text-3xl md:text-4xl text-black mb-4 tracking-tight">
            Trang không tìm thấy
          </h1>
          <p className="text-gray-500 font-light text-lg mb-10 leading-relaxed max-w-sm mx-auto">
            Trang bạn đang tìm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={ROUTES.HOME}
              className="inline-flex items-center gap-2.5 bg-black text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#B8860B] transition-all duration-300 hover:scale-105"
            >
              <Home size={18} />
              Về trang chủ
            </Link>
            <Link
              href={ROUTES.PRODUCTS}
              className="inline-flex items-center gap-2.5 border border-black/20 text-black px-7 py-3.5 rounded-full font-semibold hover:bg-black hover:text-white transition-all duration-300"
            >
              <Search size={18} />
              Xem sản phẩm
            </Link>
          </div>

          {/* Contact fallback */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <p className="text-gray-400 text-sm mb-4">Cần hỗ trợ? Liên hệ ngay:</p>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="inline-flex items-center gap-2 text-[#B8860B] font-semibold hover:underline"
            >
              <Phone size={16} />
              {CONTACT_INFO.phoneDisplay}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
