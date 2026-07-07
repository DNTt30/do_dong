'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function ProblemAgitation() {
  return (
    <section className="py-20 md:py-32 bg-secondary text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-50" />
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6"
          >
            Đừng để đồ đồng kém chất lượng<br />làm mất đi sự trang nghiêm
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light"
          >
            Nhiều sản phẩm trên thị trường hiện nay sử dụng đồng pha tạp, công nghệ đúc máy sơ sài, dẫn đến xỉn màu và rỗ bề mặt chỉ sau một thời gian ngắn sử dụng.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-red-950/20 border border-red-900/30 rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="text-red-500 w-8 h-8" />
              <h3 className="text-2xl font-semibold text-red-100">Vấn đề thường gặp</h3>
            </div>
            <ul className="space-y-5">
              {[
                'Đồng pha nhiều chì, tạp chất để giảm giá thành',
                'Nhanh chóng xỉn màu, bong tróc lớp mạ bên ngoài',
                'Hoa văn đúc máy thô cứng, thiếu hồn cốt',
                'Độ dày mỏng, dễ móp méo khi va đập nhẹ',
                'Không có giá trị lưu truyền phong thủy',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/60">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-primary/10 border border-primary/30 rounded-3xl p-8 md:p-10 relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-primary/20 blur-2xl -z-10 rounded-full opacity-50" />

            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="text-primary w-8 h-8" />
              <h3 className="text-2xl font-semibold text-primary">Giải pháp từ Nam Định</h3>
            </div>
            <ul className="space-y-5">
              {[
                '100% đồng thanh khiết (đồng đỏ, đồng vàng nguyên bản)',
                'Màu sắc trường tồn, càng dùng lâu càng lên màu đẹp',
                'Chạm khắc thủ công 100% bởi nghệ nhân thâm niên',
                'Thành đồng dày dặn, đúc đặc nguyên khối nặng tay',
                'Tụ khí phong thủy, gia tăng vượng khí cho gia chủ',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
