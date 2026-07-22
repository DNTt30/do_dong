/**
 * BrandStory — Câu chuyện thương hiệu: Founder + Mẹ (chuyên gia đồng).
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code2, Award, Users } from 'lucide-react';
import { BUSINESS_STATS } from '@/constants/contact';

const VALUES = [
  {
    icon: Heart,
    title: 'Tâm huyết gia đình',
    description: 'Mỗi sản phẩm là sự kết hợp giữa tình yêu nghề và kiến thức chuyên sâu được truyền từ đời này sang đời khác.',
  },
  {
    icon: Award,
    title: 'Chuyên môn sâu',
    description: 'Mẹ tôi — người thợ chính — đã gắn bó với nghề đồng hơn 20 năm, là người tư vấn và kiểm tra chất lượng mỗi sản phẩm.',
  },
  {
    icon: Code2,
    title: 'Công nghệ hiện đại',
    description: 'Tôi — người sáng lập — xây dựng nền tảng công nghệ và marketing để đưa tinh hoa làng nghề đến với khách hàng toàn quốc.',
  },
  {
    icon: Users,
    title: 'Kết nối trực tiếp',
    description: 'Không qua trung gian. Mua trực tiếp từ xưởng sản xuất, đảm bảo giá tốt nhất và cam kết chất lượng từ nguồn gốc.',
  },
];

export default function BrandStory() {
  return (
    <section className="py-20 md:py-32 bg-[#FDFBF7] overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="text-[#B8860B] uppercase tracking-[0.3em] text-xs font-semibold mb-4">
              Câu chuyện của chúng tôi
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-black mb-8 tracking-tight leading-tight">
              Tinh hoa nghề đồng
              <br />
              <span className="text-[#B8860B]">từ trái tim gia đình</span>
            </h2>

            <div className="space-y-5 text-gray-600 text-base font-light leading-relaxed mb-10">
              <p>
                <strong className="font-semibold text-black">Đồ Đồng Thủ Công Nam Định</strong> ra đời từ một gia đình có truyền thống lâu đời trong nghề chế tác đồng tại tỉnh Nam Định — vùng đất nổi tiếng với làng nghề đúc đồng Vạn Điểm.
              </p>
              <p>
                <strong className="font-semibold text-black">Mẹ tôi</strong> là chuyên gia đồng nhiều năm kinh nghiệm. Bà là người trực tiếp tư vấn kỹ thuật, kiểm tra từng sản phẩm trước khi đến tay khách hàng. Mỗi sản phẩm đều được bà xem xét kỹ lưỡng về chất liệu, hoa văn và hoàn thiện bề mặt.
              </p>
              <p>
                <strong className="font-semibold text-black">Tôi</strong> — người sáng lập — phụ trách công nghệ, marketing và bán hàng. Tôi xây dựng cầu nối để tinh hoa nghề thủ công gia đình có thể đến với khách hàng trên toàn quốc một cách dễ dàng, tin cậy.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {Object.entries({
                [BUSINESS_STATS.yearsExperience]: 'Năm kinh nghiệm',
                [BUSINESS_STATS.productsSold]: 'Sản phẩm',
                [BUSINESS_STATS.happyCustomers]: 'Khách hàng',
                [BUSINESS_STATS.provinces]: 'Tỉnh thành',
              }).map(([value, label]) => (
                <div key={label} className="border-l-2 border-[#B8860B] pl-4">
                  <div className="text-2xl font-bold text-black">{value}</div>
                  <div className="text-sm text-gray-500 font-light">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Values grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {VALUES.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(184,134,11,0.12)] transition-shadow duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-[#B8860B] group-hover:to-amber-700 transition-all duration-300">
                    <Icon size={22} className="text-[#B8860B] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-black text-sm mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-xs font-light leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
