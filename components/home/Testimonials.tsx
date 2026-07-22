/**
 * Testimonials — Premium customer reviews with Swiper carousel.
 */

'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Anh Nguyễn Văn Hùng',
    location: 'Hà Nội',
    avatar: 'H',
    rating: 5,
    product: 'Bộ Tam Sự Đồng',
    content:
      'Chuông đồng và lư hương do cơ sở chế tác rất tinh xảo, hoa văn sắc nét, âm thanh chuông vang xa và trong trẻo. Chúng tôi rất hài lòng với chất lượng sản phẩm. Giao hàng nhanh, đóng gói cẩn thận.',
  },
  {
    id: '2',
    name: 'Bà Trần Thị Mai',
    location: 'Nam Định',
    avatar: 'M',
    rating: 5,
    product: 'Đỉnh Đồng Cổ',
    content:
      'Đặt bộ lư đồng theo thiết kế riêng, cơ sở tư vấn nhiệt tình, hoàn thành đúng tiến độ. Sản phẩm rất đẹp, xứng đáng là đồ thờ cúng gia tộc lâu dài. Mẹ chủ nhà trực tiếp tư vấn rất tận tâm.',
  },
  {
    id: '3',
    name: 'Ông Lê Thanh Phong',
    location: 'TP. Hồ Chí Minh',
    avatar: 'P',
    rating: 5,
    product: 'Hạc Đồng Cặp',
    content:
      'Đã mua nhiều lần và luôn hài lòng. Sản phẩm đúng như mô tả, chất lượng đồng tốt, không bị oxy hóa sau nhiều năm. Giá cả hợp lý so với chất lượng. Sẽ tiếp tục ủng hộ lâu dài.',
  },
  {
    id: '4',
    name: 'Ban Quản lý Chùa Phúc Lâm',
    location: 'Bắc Ninh',
    avatar: 'C',
    rating: 5,
    product: 'Bộ Ngũ Sự Đồng',
    content:
      'Chùa chúng tôi đặt trọn bộ đồ thờ đồng cho chánh điện mới. Chất lượng vượt mong đợi, hoa văn Phật giáo chạm khắc rất chuẩn và tinh tế. Đơn vị làm việc uy tín, giao hàng đúng hẹn.',
  },
  {
    id: '5',
    name: 'Anh Phạm Đức Trung',
    location: 'Đà Nẵng',
    avatar: 'T',
    rating: 5,
    product: 'Tượng Đồng Phật',
    content:
      'Tượng đồng đặt theo yêu cầu kích thước riêng, cơ sở tư vấn rõ ràng từ đầu. Sản phẩm hoàn thiện đúng như thiết kế, màu đồng tự nhiên rất đẹp. Rất hài lòng và sẽ giới thiệu cho bạn bè.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#B8860B] uppercase tracking-[0.3em] text-xs font-semibold mb-4"
          >
            Đánh giá khách hàng
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-black mb-4 tracking-tight"
          >
            Khách Hàng Nói Về Chúng Tôi
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg font-light"
          >
            Hơn 2.000 khách hàng hài lòng trên toàn quốc
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="!pb-14"
          >
            {TESTIMONIALS.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="h-full bg-[#FDFBF7] rounded-2xl p-6 md:p-8 flex flex-col border border-amber-100/50 hover:border-amber-200 hover:shadow-[0_4px_20px_rgba(184,134,11,0.1)] transition-all duration-300">
                  {/* Quote icon */}
                  <Quote size={24} className="text-[#B8860B]/30 mb-4" fill="#B8860B" fillOpacity={0.15} />

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-[#B8860B]" fill="#B8860B" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-black/75 text-sm md:text-base font-light leading-relaxed mb-6 flex-1">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Product tag */}
                  <div className="inline-flex items-center gap-1.5 bg-amber-50 text-[#B8860B] text-xs font-medium px-3 py-1 rounded-full w-fit mb-5">
                    <span>⚱️</span>
                    {testimonial.product}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B8860B] to-amber-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-black text-sm">{testimonial.name}</p>
                      <p className="text-gray-400 text-xs">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
