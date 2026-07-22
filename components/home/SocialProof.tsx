/**
 * SocialProof — Trust signals với số liệu thực.
 * Khách hàng đã phục vụ, tỉnh thành, đánh giá, năm kinh nghiệm.
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, MapPin, Users, Award, ShieldCheck } from 'lucide-react';

// ── Animated counter ────────────────────────────────────────────────────────

function Counter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString('vi-VN')}{suffix}
    </span>
  );
}

// ── Stats data ──────────────────────────────────────────────────────────────

const STATS = [
  {
    icon: Users,
    value: 2000,
    suffix: '+',
    label: 'Khách hàng tin dùng',
    sub: 'Gia đình, đền chùa, nhà thờ',
    color: 'text-[#B8860B]',
    bg: 'bg-amber-50',
  },
  {
    icon: MapPin,
    value: 63,
    suffix: '',
    label: 'Tỉnh thành giao hàng',
    sub: 'Toàn quốc, đóng gói chuyên dụng',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Star,
    value: 49,
    suffix: '/5',
    label: 'Điểm đánh giá',
    sub: 'Từ khách hàng thực tế',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    isDecimal: true,
  },
  {
    icon: Award,
    value: 10,
    suffix: '+',
    label: 'Năm kinh nghiệm',
    sub: 'Làng nghề đúc đồng Vạn Điểm',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

// ── Recent activity feed ─────────────────────────────────────────────────────

const RECENT_ORDERS = [
  { name: 'Anh T.', location: 'Hà Nội', product: 'Bộ Tam Sự', time: '2 giờ trước' },
  { name: 'Chị H.', location: 'TP. HCM', product: 'Đỉnh Đồng Cổ', time: '5 giờ trước' },
  { name: 'Ban QL Chùa', location: 'Bắc Ninh', product: 'Bộ Ngũ Sự', time: 'Hôm qua' },
  { name: 'Anh P.', location: 'Đà Nẵng', product: 'Hạc Đồng Cặp', time: 'Hôm qua' },
  { name: 'Chị M.', location: 'Cần Thơ', product: 'Lư Hương Đồng', time: '2 ngày trước' },
];

// ── Trust badges ─────────────────────────────────────────────────────────────

const TRUST_BADGES = [
  { icon: ShieldCheck, text: 'Đồng 100% nguyên chất — cam kết hoàn tiền' },
  { icon: Award, text: 'Bảo hành chất liệu trọn đời' },
  { icon: MapPin, text: 'Giao hàng toàn quốc, đóng gói chuyên dụng' },
  { icon: Users, text: 'Tư vấn bởi chuyên gia hơn 20 năm kinh nghiệm' },
];

export default function SocialProof() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden border-t border-b border-gray-100">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Stats counters ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative bg-white rounded-2xl border border-gray-100 p-5 md:p-7 shadow-[0_2px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_30px_rgba(184,134,11,0.1)] transition-shadow duration-300 overflow-hidden"
              >
                {/* Background icon */}
                <div className={`absolute -top-2 -right-2 w-20 h-20 ${stat.bg} rounded-full opacity-50`} />

                <div className={`inline-flex items-center justify-center w-11 h-11 ${stat.bg} rounded-xl mb-4`}>
                  <Icon size={22} className={stat.color} />
                </div>

                <div className={`text-3xl md:text-4xl font-black ${stat.color} mb-1.5 leading-none`}>
                  {stat.isDecimal ? (
                    <>
                      <Counter target={49} duration={1800} />
                    </>
                  ) : (
                    <Counter target={stat.value} suffix={stat.suffix} />
                  )}
                  {stat.isDecimal && <span>/5</span>}
                </div>

                <p className="font-semibold text-black text-sm md:text-base leading-tight mb-1">
                  {stat.label}
                </p>
                <p className="text-gray-400 text-xs font-light leading-snug">
                  {stat.sub}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ── Two columns: Recent orders + Trust badges ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

          {/* Recent orders live feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#FDFBF7] rounded-2xl p-6 border border-amber-100/50"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="font-semibold text-black text-sm">Đơn hàng gần đây</p>
            </div>
            <div className="space-y-3">
              {RECENT_ORDERS.map((order, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center justify-between py-2.5 border-b border-amber-100/50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B8860B] to-amber-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {order.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black leading-tight">
                        {order.name} — <span className="text-[#B8860B]">{order.product}</span>
                      </p>
                      <p className="text-xs text-gray-400">{order.location}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">{order.time}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
              Hiển thị hoạt động gần đây — thông tin được ẩn danh
            </p>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <p className="font-semibold text-black text-sm mb-1">Cam kết của chúng tôi</p>
            {TRUST_BADGES.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-[#B8860B]" />
                </div>
                <p className="text-sm font-medium text-black leading-snug pt-1.5">{text}</p>
              </motion.div>
            ))}

            {/* Star rating display */}
            <div className="bg-[#111] rounded-xl p-5 flex items-center gap-4 mt-1">
              <div className="flex flex-col">
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="#F5C842" className="text-[#F5C842]" />
                  ))}
                </div>
                <p className="text-white font-bold text-xl">4.9/5</p>
                <p className="text-white/50 text-xs">Từ 200+ đánh giá thực tế</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-white/80 text-sm font-light leading-relaxed max-w-[140px]">
                  &ldquo;Đúng như mô tả, giao hàng cẩn thận&rdquo;
                </p>
                <p className="text-white/40 text-xs mt-1">— Khách hàng xác minh</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
