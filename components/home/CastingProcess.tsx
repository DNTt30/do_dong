/**
 * CastingProcess — step-by-step bronze casting process timeline.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/common/SectionTitle';

const STEPS = [
  {
    number: '01',
    title: 'Thiết kế mẫu',
    description: 'Nghệ nhân phác thảo mẫu thủ công hoặc thiết kế 3D, xác định kích thước và hoa văn chi tiết.',
  },
  {
    number: '02',
    title: 'Làm khuôn',
    description: 'Chế tác khuôn đúc từ đất sét chịu nhiệt hoặc cát, đảm bảo độ chính xác cao.',
  },
  {
    number: '03',
    title: 'Nấu đồng',
    description: 'Đồng nguyên liệu được nung chảy ở nhiệt độ 1.083°C, pha chế theo tỷ lệ truyền thống.',
  },
  {
    number: '04',
    title: 'Đổ khuôn',
    description: 'Đồng lỏng được đổ vào khuôn cẩn thận, để nguội tự nhiên trong điều kiện kiểm soát.',
  },
  {
    number: '05',
    title: 'Hoàn thiện',
    description: 'Tháo khuôn, đánh bóng, khắc hoa văn và xử lý bề mặt theo yêu cầu.',
  },
  {
    number: '06',
    title: 'Kiểm định',
    description: 'Kiểm tra chất lượng toàn diện trước khi đóng gói và giao đến tay khách hàng.',
  },
];

export default function CastingProcess() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <SectionTitle
          label="Quy trình"
          title="Quy Trình Đúc Đồng Truyền Thống"
          subtitle="Mỗi sản phẩm đồng trải qua 6 bước thủ công tỉ mỉ, kế thừa kỹ thuật đúc đồng ngàn năm của cha ông."
          className="mb-16"
        />

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-gradient-gold opacity-30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-white border-4 border-secondary flex items-center justify-center mb-4 shadow-gold">
                  <span className="font-serif font-bold text-lg text-gradient-gold">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-semibold text-sm text-foreground mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
