'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    question: 'Làm sao để biết đây là đồng nguyên chất 100%?',
    answer: 'Sản phẩm của chúng tôi được đúc thủ công tại làng nghề Nam Định từ đồng nguyên thanh. Đồng thật có trọng lượng nặng, tiếng vang thanh trong khi gõ vào, và màu sắc có độ sâu đặc trưng. Quý khách được quyền kiểm tra hàng kỹ lưỡng trước khi thanh toán.',
  },
  {
    question: 'Sản phẩm có bị xỉn màu theo thời gian không?',
    answer: 'Đồng thật nguyên chất theo thời gian sẽ xuống màu trầm ấm, tạo nên vẻ đẹp cổ kính và giá trị thời gian (lên nước đồng). Nếu quý khách thích màu sáng bóng như ban đầu, chúng tôi có hướng dẫn cách đánh sáng lại rất đơn giản tại nhà.',
  },
  {
    question: 'Chế độ bảo hành như thế nào?',
    answer: 'Chúng tôi cam kết bảo hành trọn đời về chất liệu đồng (không pha chì, không bong tróc mạ). Hỗ trợ đánh bóng, làm mới trọn đời với chi phí ưu đãi nhất cho khách hàng cũ.',
  },
  {
    question: 'Cửa hàng có giao hàng đi tỉnh không? Phí vận chuyển bao nhiêu?',
    answer: 'Chúng tôi giao hàng toàn quốc. Miễn phí vận chuyển cho đơn hàng từ 5 triệu VNĐ. Quý khách được đồng kiểm tra hàng cùng bưu tá trước khi thanh toán, đảm bảo an toàn tuyệt đối.',
  },
  {
    question: 'Tôi muốn đặt đúc theo mẫu hoặc kích thước riêng có được không?',
    answer: 'Hoàn toàn được. Là xưởng đúc trực tiếp, chúng tôi nhận chế tác theo mọi yêu cầu về kích thước, mẫu mã, họa tiết, khắc chữ, thếp vàng 24k hoặc khảm tam khí, ngũ sắc.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32 bg-primary-50">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-black mb-6"
          >
            Câu Hỏi Thường Gặp
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 font-light"
          >
            Giải đáp những thắc mắc phổ biến trước khi bạn quyết định thỉnh đồ đồng
          </motion.p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-semibold text-black pr-8">
                  {faq.question}
                </span>
                <span className="w-8 h-8 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0">
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="p-6 pt-0 text-gray-600 leading-relaxed font-light border-t border-gray-50 mx-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
