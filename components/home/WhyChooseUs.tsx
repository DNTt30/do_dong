/**
 * WhyChooseUs — Lý do chọn chúng tôi với số liệu cụ thể.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Hammer, Truck, Headphones, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constants/routes';

const REASONS = [
  {
    icon: Hammer,
    title: 'Chế tác thủ công',
    description: 'Từng sản phẩm được hoàn thiện bởi nghệ nhân lành nghề, không qua khuôn đúc công nghiệp.',
    highlight: '100% thủ công',
  },
  {
    icon: Headphones,
    title: 'Tư vấn tận tâm',
    description: 'Đội ngũ có chuyên môn sâu về đồ đồng thờ cúng, sẵn sàng tư vấn 7:00 – 19:00 mỗi ngày.',
    highlight: 'Hỗ trợ 7 ngày/tuần',
  },
  {
    icon: ShieldCheck,
    title: 'Chất liệu chuẩn',
    description: 'Đồng nguyên chất 100%, không pha tạp. Cam kết hoàn tiền nếu phát hiện sai chất liệu.',
    highlight: 'Cam kết hoàn tiền',
  },
  {
    icon: Truck,
    title: 'Giao toàn quốc',
    description: 'Đóng gói chuyên biệt, giao đến 63 tỉnh thành. Theo dõi đơn hàng realtime.',
    highlight: '63 tỉnh thành',
  },
  {
    icon: PenTool,
    title: 'Nhận theo yêu cầu',
    description: 'Khắc tên, khắc chữ, thiết kế hoa văn riêng. Sản phẩm độc quyền theo ý khách.',
    highlight: 'Thiết kế riêng',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#B8860B] uppercase tracking-[0.3em] text-xs font-semibold mb-4"
          >
            Cam kết của chúng tôi
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif text-black mb-4 tracking-tight"
          >
            Tại Sao Chọn Chúng Tôi
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg font-light max-w-xl mx-auto"
          >
            Hơn 10 năm chế tác đồ đồng thủ công, chúng tôi hiểu giá trị của sự tin tưởng
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className="flex flex-col items-center text-center group p-6 rounded-2xl hover:bg-[#FBFBFD] transition-colors duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#F5F5F7] flex items-center justify-center mb-5 text-black group-hover:bg-[#B8860B] group-hover:text-white transition-all duration-500 shadow-sm">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#B8860B] mb-2">
                  {reason.highlight}
                </span>
                <h3 className="font-semibold text-base text-black mb-2">{reason.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA dưới */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link
            href={ROUTES.ORDER}
            className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-full font-semibold text-base hover:bg-[#B8860B] transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Đặt hàng ngay →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
