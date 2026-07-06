/**
 * AboutVillage — introduces the Nam Dinh bronze crafts village heritage.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Users, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from '@/components/common/SectionTitle';
import { ROUTES } from '@/constants/routes';

const STATS = [
  { icon: Clock, value: '30+', label: 'Năm kinh nghiệm' },
  { icon: Users, value: '5.000+', label: 'Khách hàng tin tưởng' },
  { icon: Award, value: '100+', label: 'Sản phẩm đồng' },
  { icon: Star, value: '4.9/5', label: 'Đánh giá trung bình' },
];

export default function AboutVillage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative h-[420px] md:h-[500px] rounded-2xl overflow-hidden shadow-card-hover">
              <Image
                src="/images/about-village.jpg"
                alt="Làng nghề đúc đồng Nam Định"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-4 border-secondary rounded-2xl -z-10" />
            </div>

            {/* Badge overlay */}
            <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-card-hover p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-bronze flex items-center justify-center text-white font-bold text-lg">
                ⚱
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">Chứng nhận</p>
                <p className="text-xs text-muted-foreground">Làng nghề truyền thống</p>
              </div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <SectionTitle
              label="Về chúng tôi"
              title="Tinh Hoa Đồng Đúc Đất Nam Định"
              align="left"
              className="mb-6"
            />

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                Chúng tôi tự hào là một trong những cơ sở sản xuất đồ đồng thủ công hàng đầu
                tại làng nghề truyền thống Nam Định — nơi có lịch sử đúc đồng hàng trăm năm,
                gắn liền với văn hóa tâm linh và mỹ thuật dân tộc.
              </p>
              <p>
                Mỗi sản phẩm đều được các nghệ nhân lành nghề chế tác tỉ mỉ theo phương pháp
                truyền thống, từ lư đồng, đỉnh đồng, chuông đồng đến tượng đồng — đảm bảo
                chất lượng, độ bền và giá trị nghệ thuật vượt thời gian.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-primary leading-none">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link href={ROUTES.ABOUT} className="btn-primary">
              Tìm hiểu thêm
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
