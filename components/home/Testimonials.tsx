/**
 * Testimonials — Minimalist Apple-style customer feedback.
 */

'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/pagination';

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Khách hàng Hà Nội',
    content: 'Chuông đồng và lư hương do cơ sở chế tác rất tinh xảo, hoa văn sắc nét, âm thanh chuông vang xa và trong trẻo. Chúng tôi rất hài lòng với chất lượng sản phẩm.',
  },
  {
    id: '2',
    name: 'Khách hàng Nam Định',
    content: 'Đặt bộ lư đồng theo thiết kế riêng, cơ sở tư vấn nhiệt tình, hoàn thành đúng tiến độ. Sản phẩm rất đẹp, xứng đáng là đồ thờ cúng gia tộc lâu dài.',
  },
  {
    id: '3',
    name: 'Khách hàng TP.HCM',
    content: 'Đã mua nhiều lần và luôn hài lòng. Sản phẩm đúng như mô tả, chất lượng đồng tốt, không bị oxy hóa sau nhiều năm. Sẽ tiếp tục ủng hộ.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-32 bg-[#FBFBFD]">
      <div className="container max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-black tracking-tight"
          >
            Khách Hàng Nói Về Chúng Tôi
          </motion.h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="!pb-16"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 md:p-10 rounded-3xl bg-white h-full flex flex-col items-start"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6 text-[#B8860B] text-lg">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>

                {/* Content */}
                <p className="text-black text-lg md:text-xl font-light leading-relaxed mb-8 flex-1">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <p className="font-medium text-sm text-gray-500 tracking-wide uppercase">
                  {testimonial.name}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
