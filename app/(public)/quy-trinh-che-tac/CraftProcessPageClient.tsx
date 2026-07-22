/**
 * CraftProcessPageClient — Premium craft process page.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Flame, Sparkles, Search, Package, Truck,
  Clock, ThumbsUp, MessageCircle
} from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';

const MAIN_STEPS = [
  {
    icon: Flame,
    step: '01',
    title: 'Chuẩn Bị Nguyên Liệu & Thiết Kế',
    duration: '1-2 ngày',
    description:
      'Đồng nguyên chất được kiểm tra chất lượng, phân loại và chuẩn bị theo đơn hàng. Thợ thủ công phác thảo thiết kế theo yêu cầu khách hàng, tạo khuôn mẫu đất sét hoặc sáp để định hình sản phẩm.',
    details: [
      'Kiểm tra hàm lượng đồng nguyên chất (≥99%)',
      'Phác thảo thiết kế 2D/3D theo yêu cầu',
      'Tạo khuôn mẫu bằng đất sét pha cát',
      'Xác nhận thiết kế với khách hàng trước khi đúc',
    ],
    bgColor: 'bg-orange-500',
    lightBg: 'bg-orange-50',
  },
  {
    icon: Flame,
    step: '02',
    title: 'Nấu Chảy & Đúc Đồng',
    duration: '1 ngày',
    description:
      'Đồng được nung chảy trong lò nhiệt độ cao đạt 1.085°C. Mẻ đồng lỏng sau đó được rót vào khuôn đã chuẩn bị. Sau khi nguội tự nhiên, sản phẩm thô được lấy ra khỏi khuôn và làm sạch phần thừa.',
    details: [
      'Nung đồng đến nhiệt độ 1.085°C',
      'Kiểm tra độ nhớt và độ tinh khiết',
      'Rót đồng lỏng vào khuôn theo kỹ thuật truyền thống',
      'Làm nguội tự nhiên trong 8-12 giờ',
    ],
    bgColor: 'bg-red-500',
    lightBg: 'bg-red-50',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'Chạm Khắc & Hoàn Thiện Hoa Văn',
    duration: '3-7 ngày',
    description:
      'Đây là công đoạn quan trọng nhất, thể hiện tay nghề nghệ nhân. Từng đường nét hoa văn được chạm khắc thủ công bằng đục và búa. Mỗi chi tiết đều đòi hỏi sự tập trung và kiên nhẫn tuyệt đối.',
    details: [
      'Phác thảo hoa văn lên bề mặt đồng',
      'Chạm khắc chi tiết bằng đục thủ công',
      'Hoàn thiện các đường nét nhỏ nhất',
      'Làm sạch phôi đồng sau khi chạm',
    ],
    bgColor: 'bg-amber-500',
    lightBg: 'bg-amber-50',
  },
  {
    icon: Search,
    step: '04',
    title: 'Kiểm Tra Chất Lượng',
    duration: '1 ngày',
    description:
      'Mỗi sản phẩm phải vượt qua kiểm tra 3 cấp độ: kiểm tra nguyên liệu, kiểm tra hoàn thiện và kiểm tra cuối bởi chuyên gia. Chỉ sản phẩm đạt 100% tiêu chuẩn mới được thông qua.',
    details: [
      'Kiểm tra chất lượng đồng bằng thiết bị đo',
      'Kiểm tra độ hoàn thiện hoa văn',
      'Kiểm tra kích thước theo đơn hàng',
      'Phê duyệt bởi chuyên gia (Mẹ tôi — người có 20+ năm kinh nghiệm)',
    ],
    bgColor: 'bg-emerald-500',
    lightBg: 'bg-emerald-50',
  },
  {
    icon: Package,
    step: '05',
    title: 'Đóng Gói Chuyên Dụng',
    duration: '0.5 ngày',
    description:
      'Sản phẩm được lau sạch, phủ lớp bảo vệ và đóng gói bằng vật liệu chuyên dụng chống va đập. Hộp gỗ hoặc hộp carton cứng được sử dụng tùy theo kích thước và giá trị sản phẩm.',
    details: [
      'Lau sạch và phủ lớp bảo vệ bề mặt',
      'Bọc vải nhung chống trầy xước',
      'Đóng hộp gỗ/carton cao cấp',
      'Dán nhãn thông tin và giấy chứng nhận',
    ],
    bgColor: 'bg-blue-500',
    lightBg: 'bg-blue-50',
  },
  {
    icon: Truck,
    step: '06',
    title: 'Giao Hàng Toàn Quốc',
    duration: '2-5 ngày',
    description:
      'Đơn hàng được giao qua đơn vị vận chuyển uy tín. Khách hàng nhận được mã tracking realtime. Cam kết hoàn tiền 100% nếu sản phẩm bị hư hỏng trong quá trình vận chuyển.',
    details: [
      'Giao hàng 63 tỉnh thành toàn quốc',
      'Tracking realtime qua SMS/Zalo',
      'Bảo hiểm hàng hóa trong vận chuyển',
      'Cam kết hoàn tiền nếu hư hỏng khi nhận',
    ],
    bgColor: 'bg-[#B8860B]',
    lightBg: 'bg-amber-50',
  },
];

const COMMITMENTS = [
  { icon: ThumbsUp, title: 'Đồng 100% nguyên chất', desc: 'Không pha kim loại khác. Có thể kiểm tra bằng thiết bị đo hàm lượng.' },
  { icon: Clock, title: 'Đúng tiến độ', desc: 'Cam kết giao hàng theo lịch đã thỏa thuận. Thông báo ngay nếu có trì hoãn.' },
  { icon: MessageCircle, title: 'Cập nhật tiến độ', desc: 'Gửi ảnh/video tiến độ sản xuất theo từng giai đoạn cho khách hàng.' },
];

export default function CraftProcessPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#111] text-white py-20 md:py-32">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#B8860B] uppercase tracking-[0.3em] text-xs font-semibold mb-5"
          >
            Nghề thủ công truyền thống
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            Quy Trình Chế Tác
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
              Đồ Đồng Thủ Công
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Mỗi tác phẩm đồng là kết quả của 6 công đoạn tỉ mỉ, trải qua hàng tuần chế tác thủ công với sự kiểm soát chất lượng nghiêm ngặt từ người thợ có hơn 20 năm kinh nghiệm.
          </motion.p>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl mx-auto px-4 md:px-8">
          <div className="space-y-16 md:space-y-24">
            {MAIN_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7 }}
                  className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Info */}
                  <div className={!isEven ? 'md:order-2' : ''}>
                    <div className={`inline-flex items-center gap-2 ${step.lightBg} px-3 py-1.5 rounded-full mb-4`}>
                      <span className="text-xs font-bold text-gray-500 tracking-widest">Bước {step.step}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{step.duration}</span>
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl text-black mb-4 leading-snug">
                      {step.title}
                    </h2>
                    <p className="text-gray-500 font-light leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-2.5">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <div className={`w-1.5 h-1.5 rounded-full ${step.bgColor} mt-1.5 shrink-0`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div className={`${!isEven ? 'md:order-1' : ''}`}>
                    <div className={`${step.lightBg} rounded-3xl aspect-square flex items-center justify-center relative overflow-hidden`}>
                      <div className={`w-24 h-24 rounded-3xl ${step.bgColor} flex items-center justify-center shadow-2xl`}>
                        <Icon size={48} className="text-white" strokeWidth={1.5} />
                      </div>
                      {/* Decorative circles */}
                      <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full ${step.bgColor} opacity-10`} />
                      <div className={`absolute -bottom-8 -left-8 w-24 h-24 rounded-full ${step.bgColor} opacity-10`} />
                      <span className="absolute bottom-6 right-6 text-8xl font-black text-black/5">{step.step}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-16 md:py-24 bg-[#FDFBF7] border-t border-amber-100/50">
        <div className="container max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-black mb-3">Cam kết của chúng tôi</h2>
            <p className="text-gray-500 font-light">Những gì chúng tôi đảm bảo với từng đơn hàng</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMMITMENTS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-[0_2px_15px_rgba(0,0,0,0.06)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
                  <Icon size={26} className="text-[#B8860B]" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-black mb-2">{title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#111] text-white text-center">
        <div className="container max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Bắt đầu đặt hàng ngay</h2>
          <p className="text-white/60 font-light mb-8">Liên hệ để được tư vấn miễn phí về thiết kế và báo giá</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={CONTACT_INFO.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#B8860B] text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-700 transition-all duration-300 hover:scale-105"
            >
              <MessageCircle size={20} />
              Liên hệ Zalo ngay
            </a>
            <Link
              href="/san-pham"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white border border-white/20 hover:border-white/40 px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              Xem sản phẩm
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
