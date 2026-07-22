'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constants/routes';
import { CONTACT_INFO } from '@/constants/contact';

export default function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-black text-white">
      {/* Background with blend mode */}
      <div 
        className="absolute inset-0 bg-[url('/images/banner-default.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 rounded-full px-4 py-1.5 text-sm font-semibold tracking-widest uppercase mb-8">
            Giao hàng toàn quốc — Kiểm tra trước khi thanh toán
          </div>

          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Sẵn sàng thỉnh đồ đồng <br className="hidden md:block" />
            <span className="text-primary">thủ công đỉnh cao?</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/70 font-light mb-10 max-w-2xl mx-auto">
            Liên hệ ngay để nhận tư vấn phong thủy miễn phí và báo giá tốt nhất trực tiếp từ xưởng đúc Nam Định. Không qua trung gian.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-600 transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_rgba(184,134,11,0.4)]"
            >
              <Phone size={20} className="animate-pulse" />
              Gọi {CONTACT_INFO.phoneDisplay || CONTACT_INFO.phone}
            </a>
            
            <Link
              href={ROUTES.PRODUCTS}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 group"
            >
              Xem toàn bộ sản phẩm
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
