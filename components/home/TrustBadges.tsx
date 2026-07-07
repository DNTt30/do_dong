'use client';

import React from 'react';
import { ShieldCheck, Truck, Gem, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const BADGES = [
  {
    icon: Gem,
    title: 'Đồng Nguyên Chất',
    description: 'Cam kết 100% đồng đúc nguyên khối, độ tinh khiết cao',
  },
  {
    icon: ShieldCheck,
    title: 'Bảo Hành Trọn Đời',
    description: 'Chế độ bảo hành màu sắc và độ bền trọn đời sản phẩm',
  },
  {
    icon: Truck,
    title: 'Giao Hàng Toàn Quốc',
    description: 'Miễn phí vận chuyển và lắp đặt tận nơi an toàn',
  },
  {
    icon: Clock,
    title: 'Chế Tác Thủ Công',
    description: 'Tỉ mỉ từng đường nét bởi nghệ nhân Nam Định',
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-primary text-white py-10 border-b border-primary-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {BADGES.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center px-4 pt-6 md:pt-0 first:pt-0"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <badge.icon size={24} className="text-primary-100" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{badge.title}</h3>
              <p className="text-sm text-primary-100/90 font-light max-w-[250px]">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
