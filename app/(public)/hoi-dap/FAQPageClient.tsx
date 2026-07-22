/**
 * FAQPageClient — Hỏi đáp thường gặp.
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';

const FAQ_CATEGORIES = [
  {
    id: 'san-pham',
    label: 'Sản phẩm',
    questions: [
      {
        q: 'Đồ đồng thủ công của bạn được làm từ chất liệu gì?',
        a: 'Tất cả sản phẩm của chúng tôi được làm từ đồng nguyên chất (hàm lượng ≥99%), không pha tạp kim loại khác. Chúng tôi cam kết hoàn tiền nếu phát hiện sai chất liệu khi kiểm tra bởi đơn vị thứ ba.',
      },
      {
        q: 'Có thể đặt hàng theo kích thước và thiết kế riêng không?',
        a: 'Có. Chúng tôi nhận sản xuất theo yêu cầu riêng — từ kích thước, hoa văn, đến khắc chữ/tên. Khách hàng chỉ cần cung cấp ý tưởng hoặc hình mẫu tham khảo, chúng tôi sẽ tư vấn và phác thảo thiết kế miễn phí.',
      },
      {
        q: 'Sản phẩm đồng có bị oxy hóa hay đổi màu không?',
        a: 'Đồng tự nhiên có xu hướng đổi màu (patina) theo thời gian — đây là quá trình tự nhiên, không ảnh hưởng đến chất lượng. Nhiều khách hàng xem đây là nét đẹp của đồ đồng thủ công. Nếu muốn giữ màu sáng ban đầu, có thể xử lý bề mặt hoặc đánh bóng định kỳ theo hướng dẫn của chúng tôi.',
      },
      {
        q: 'Bộ Tam Sự và Bộ Ngũ Sự khác nhau như thế nào?',
        a: 'Bộ Tam Sự gồm 3 vật phẩm: đỉnh (lư hương), 2 đèn (hoặc 2 bình hoa). Bộ Ngũ Sự gồm 5 vật phẩm: đỉnh, 2 đèn, 2 hạc. Bộ Ngũ Sự đầy đủ hơn, thường được dùng cho bàn thờ lớn hoặc đền chùa.',
      },
    ],
  },
  {
    id: 'dat-hang',
    label: 'Đặt hàng',
    questions: [
      {
        q: 'Làm thế nào để đặt hàng?',
        a: 'Bạn có thể đặt hàng qua 3 kênh: (1) Nhắn tin trực tiếp qua Zalo: 0398 731 293, (2) Nhắn tin Facebook Messenger, (3) Gọi điện trực tiếp. Chúng tôi sẽ phản hồi trong vòng 30 phút trong giờ làm việc (7:00-19:00).',
      },
      {
        q: 'Thời gian sản xuất là bao lâu?',
        a: 'Sản phẩm có sẵn: giao ngay. Sản phẩm sản xuất theo yêu cầu: 7-21 ngày tùy độ phức tạp. Chúng tôi sẽ thông báo thời gian cụ thể trước khi bạn xác nhận đơn hàng.',
      },
      {
        q: 'Có thể xem sản phẩm trực tiếp trước khi mua không?',
        a: 'Có. Xưởng sản xuất của chúng tôi tại Thôn Vạn Điểm 1, Huyện Ý Yên, Tỉnh Nam Định. Khách hàng có thể đến xem trực tiếp và chọn hàng. Vui lòng liên hệ trước để đặt lịch hẹn.',
      },
      {
        q: 'Có hỗ trợ trả góp hoặc thanh toán nhiều lần không?',
        a: 'Có. Với đơn hàng lớn (từ 5 triệu đồng), chúng tôi hỗ trợ đặt cọc 50% khi xác nhận và thanh toán phần còn lại khi nhận hàng. Liên hệ trực tiếp để thỏa thuận phương thức thanh toán phù hợp.',
      },
    ],
  },
  {
    id: 'giao-hang',
    label: 'Giao hàng',
    questions: [
      {
        q: 'Giao hàng đến tỉnh thành nào?',
        a: 'Chúng tôi giao hàng toàn quốc — tất cả 63 tỉnh thành. Đơn hàng được vận chuyển qua các đơn vị uy tín: Giao Hàng Nhanh, J&T Express hoặc xe khách tuyến đường ngắn.',
      },
      {
        q: 'Phí vận chuyển tính như thế nào?',
        a: 'Phí vận chuyển tùy theo khối lượng và khoảng cách. Đơn hàng từ 3 triệu đồng được miễn phí vận chuyển toàn quốc. Liên hệ để nhận báo giá chính xác.',
      },
      {
        q: 'Sản phẩm có được đóng gói an toàn không?',
        a: 'Có. Mỗi sản phẩm được bọc vải nhung hoặc xốp mềm, sau đó đặt trong hộp gỗ hoặc hộp carton cứng chuyên dụng. Chúng tôi cam kết hoàn tiền 100% nếu sản phẩm bị hư hỏng khi nhận.',
      },
      {
        q: 'Có thể theo dõi đơn hàng không?',
        a: 'Có. Chúng tôi cung cấp mã vận đơn sau khi giao hàng cho đơn vị vận chuyển. Bạn có thể tra cứu trạng thái giao hàng realtime trên website của đơn vị vận chuyển.',
      },
    ],
  },
  {
    id: 'bao-hanh',
    label: 'Bảo hành',
    questions: [
      {
        q: 'Chính sách bảo hành như thế nào?',
        a: 'Chúng tôi bảo hành chất liệu đồng trọn đời — nếu phát hiện sản phẩm không phải đồng nguyên chất, chúng tôi hoàn tiền toàn bộ. Bảo hành 12 tháng cho lỗi kỹ thuật do sản xuất (gãy, vỡ, bong tróc không do tác động ngoại lực).',
      },
      {
        q: 'Nếu sản phẩm bị hư hỏng khi vận chuyển thì xử lý thế nào?',
        a: 'Khách hàng cần quay video khi mở hộp nếu có dấu hiệu hư hỏng bên ngoài. Trong vòng 24h sau khi nhận hàng, liên hệ cho chúng tôi qua Zalo kèm hình ảnh/video. Chúng tôi sẽ đổi mới hoặc hoàn tiền trong vòng 3-5 ngày làm việc.',
      },
      {
        q: 'Có thể đổi trả sản phẩm không vừa ý không?',
        a: 'Với sản phẩm có sẵn (không tùy chỉnh), chúng tôi chấp nhận đổi trả trong 7 ngày nếu sản phẩm còn nguyên vẹn, chưa sử dụng. Khách hàng chịu phí vận chuyển đổi trả.',
      },
    ],
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-black text-base pr-6 group-hover:text-[#B8860B] transition-colors duration-200 leading-snug">
          {question}
        </span>
        <ChevronDown
          size={20}
          className={`text-gray-400 shrink-0 mt-0.5 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[#B8860B]' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-gray-500 font-light leading-relaxed pb-5 text-sm md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPageClient() {
  const [activeCategory, setActiveCategory] = useState('san-pham');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const activeQuestions =
    FAQ_CATEGORIES.find((c) => c.id === activeCategory)?.questions ?? [];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-[#FDFBF7] border-b border-amber-100/50 py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#B8860B] uppercase tracking-[0.3em] text-xs font-semibold mb-4"
          >
            Giải đáp thắc mắc
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-black mb-5 tracking-tight"
          >
            Hỏi Đáp
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg font-light max-w-xl mx-auto"
          >
            Tìm câu trả lời cho những thắc mắc phổ biến nhất về sản phẩm, đặt hàng và giao hàng.
          </motion.p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-4 md:px-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenQuestion(null);
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-black text-white'
                    : 'bg-[#F5F5F7] text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Questions */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-gray-100 px-2"
          >
            {activeQuestions.map((item) => (
              <FAQItem
                key={item.q}
                question={item.q}
                answer={item.a}
                isOpen={openQuestion === item.q}
                onToggle={() =>
                  setOpenQuestion(openQuestion === item.q ? null : item.q)
                }
              />
            ))}
          </motion.div>

          {/* Still have questions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 text-center bg-[#FDFBF7] rounded-3xl p-10 border border-amber-100/50"
          >
            <h2 className="font-serif text-2xl md:text-3xl text-black mb-3">
              Chưa tìm được câu trả lời?
            </h2>
            <p className="text-gray-500 font-light mb-8 max-w-md mx-auto">
              Liên hệ trực tiếp với chúng tôi — chúng tôi sẵn sàng tư vấn 7:00–19:00,
              tất cả các ngày.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CONTACT_INFO.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#B8860B] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-amber-700 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle size={18} />
                Nhắn Zalo ngay
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="inline-flex items-center gap-2.5 bg-black text-white px-7 py-3.5 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300"
              >
                <Phone size={18} />
                {CONTACT_INFO.phoneDisplay}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
