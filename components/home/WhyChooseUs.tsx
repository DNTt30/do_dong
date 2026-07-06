/**
 * WhyChooseUs — Minimalist Apple-style reasons to choose us.
 */

'use client';

import React from 'react';
import { ShieldCheck, Hammer, Truck, Headphones, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';

const REASONS = [
  {
    icon: Hammer,
    title: 'Chế tác thủ công',
    description: 'Bởi nghệ nhân lành nghề.',
  },
  {
    icon: Headphones,
    title: 'Tư vấn tận tâm',
    description: 'Chuyên môn sâu sắc.',
  },
  {
    icon: ShieldCheck,
    title: 'Chất liệu chuẩn',
    description: 'Đồng nguyên chất 100%.',
  },
  {
    icon: Truck,
    title: 'Giao toàn quốc',
    description: 'An toàn, nhanh chóng.',
  },
  {
    icon: PenTool,
    title: 'Nhận theo yêu cầu',
    description: 'Khắc chữ, tạo mẫu riêng.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-black mb-4 tracking-tight"
          >
            Tại Sao Chọn Chúng Tôi
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#F5F5F7] flex items-center justify-center mb-6 text-black group-hover:bg-black group-hover:text-white transition-colors duration-500">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-lg text-black mb-2">{reason.title}</h3>
                <p className="text-gray-500 text-sm font-light">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

