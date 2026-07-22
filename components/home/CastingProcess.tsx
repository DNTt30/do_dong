/**
 * CastingProcess — 5-step craft process timeline.
 * Đúc đồng → Đánh bóng → Kiểm tra → Đóng gói → Giao hàng
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Search, Package, Truck } from 'lucide-react';

const PROCESS_STEPS = [
  {
    icon: Flame,
    step: '01',
    title: 'Đúc Đồng',
    description:
      'Đồng nguyên chất được nung chảy ở nhiệt độ cao, rót vào khuôn đất sét tạo hình theo mẫu thiết kế. Công đoạn này đòi hỏi kinh nghiệm và kỹ thuật cao.',
    color: 'from-orange-500 to-red-500',
    lightColor: 'from-orange-50 to-red-50',
  },
  {
    icon: Sparkles,
    step: '02',
    title: 'Đánh Bóng',
    description:
      'Sản phẩm sau đúc được chạm khắc, đánh bóng thủ công qua nhiều giai đoạn. Mỗi chi tiết hoa văn được nghệ nhân hoàn thiện tỉ mỉ bằng tay.',
    color: 'from-amber-400 to-yellow-500',
    lightColor: 'from-amber-50 to-yellow-50',
  },
  {
    icon: Search,
    step: '03',
    title: 'Kiểm Tra',
    description:
      'Mỗi sản phẩm được kiểm tra nghiêm ngặt về chất lượng đồng, độ chính xác hoa văn và hoàn thiện bề mặt. Chỉ sản phẩm đạt chuẩn mới được tiếp tục.',
    color: 'from-emerald-500 to-teal-500',
    lightColor: 'from-emerald-50 to-teal-50',
  },
  {
    icon: Package,
    step: '04',
    title: 'Đóng Gói',
    description:
      'Sản phẩm được bọc bảo vệ cẩn thận bằng vật liệu chuyên dụng, đảm bảo không trầy xước trong quá trình vận chuyển đến mọi tỉnh thành.',
    color: 'from-blue-500 to-indigo-500',
    lightColor: 'from-blue-50 to-indigo-50',
  },
  {
    icon: Truck,
    step: '05',
    title: 'Giao Hàng',
    description:
      'Giao toàn quốc qua đơn vị vận chuyển uy tín. Khách hàng có thể theo dõi đơn hàng realtime. Cam kết hoàn tiền nếu sản phẩm bị hư hỏng khi nhận.',
    color: 'from-[#B8860B] to-amber-600',
    lightColor: 'from-amber-50 to-orange-50',
  },
];

export default function CastingProcess() {
  return (
    <section className="py-20 md:py-32 bg-[#111111] overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#B8860B] uppercase tracking-[0.3em] text-xs font-semibold mb-4"
          >
            Nghề thủ công truyền thống
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-tight"
          >
            Quy Trình Chế Tác
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg font-light max-w-xl mx-auto"
          >
            Mỗi sản phẩm trải qua 5 giai đoạn kiểm soát chất lượng nghiêm ngặt
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step number above icon */}
                  <span className="text-white/20 text-xs font-bold tracking-widest uppercase mb-3">
                    Bước {step.step}
                  </span>

                  {/* Icon circle */}
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} className="text-white" strokeWidth={1.5} />
                    {/* Glow */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10`} />
                  </div>

                  {/* Arrow between steps (desktop) */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-16 -right-2 text-white/20 text-lg z-10">
                      →
                    </div>
                  )}

                  {/* Content */}
                  <h3 className="font-semibold text-white text-lg mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm font-light leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a
            href="/quy-trinh-che-tac"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium border border-white/10 hover:border-white/30 px-7 py-3.5 rounded-full transition-all duration-300"
          >
            Xem chi tiết quy trình →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
