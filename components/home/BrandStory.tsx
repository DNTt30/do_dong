'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BrandStory() {
  return (
    <section className="py-24 md:py-40 bg-white flex items-center justify-center text-center">
      <div className="container max-w-4xl px-6 md:px-12">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-[#B8860B] uppercase tracking-[0.3em] text-sm md:text-base font-semibold mb-8"
        >
          Câu Chuyện Thương Hiệu
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif text-2xl md:text-4xl lg:text-5xl leading-relaxed md:leading-snug text-black"
        >
          &ldquo;Chúng tôi xây dựng thương hiệu với mong muốn đưa những sản phẩm đồ đồng thủ công truyền thống Nam Định đến gần hơn với khách hàng trên cả nước. Mỗi sản phẩm đều được tư vấn bởi người có chuyên môn và hoàn thiện cẩn thận trước khi giao.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
