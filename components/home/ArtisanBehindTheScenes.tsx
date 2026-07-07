'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

const STEPS = [
  {
    title: '1. Chọn Phôi Đồng',
    description: 'Chỉ chọn phôi đồng nồi hè (đồng tinh khiết) để màu sắc khi khảm lên được nổi bật, nền nã và có độ bền vượt thời gian. Một phôi lỗi nhỏ cũng bị loại bỏ.',
    image: '/images/process/chon-phoi.jpg'
  },
  {
    title: '2. Đục Nét (Chạm Âm Bản)',
    description: 'Công đoạn đòi hỏi sự tĩnh tâm tuyệt đối. Từng nhát búa, mũi đục đi xuống tạo thành những đường rãnh mỏng như sợi tóc để lát nữa nạm vàng, bạc vào.',
    image: '/images/process/duc-net.jpg'
  },
  {
    title: '3. Khảm Nạm & Đánh Bóng',
    description: 'Tán vàng, bạc vào các rãnh đã đục. Sau đó là hàng chục giờ đánh bóng bằng các loại giấy ráp, lá chuối khô để bề mặt nhẵn thín, hiện rõ từng đường nét.',
    image: '/images/process/kham-nam.jpg'
  }
];

export default function ArtisanBehindTheScenes() {
  return (
    <section className="py-24 bg-[#FDFBF7] border-t border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Video / Short Clip */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12"
          >
            <div className="relative aspect-[9/16] md:aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-neutral-200 bg-neutral-100 group">
              <video
                src="/videos/nhat-duc-goi-ten.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls
              />
              {/* Optional dark overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
                <p className="text-white font-medium text-lg drop-shadow-md text-center">
                  Góc nhỏ mình cặm cụi mỗi ngày
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: The Process */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-7/12"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">
              Đằng Sau Một Tác Phẩm
            </h2>
            <p className="text-neutral-600 text-lg mb-12 leading-relaxed">
              Không có máy móc sản xuất hàng loạt, không có đường tắt. Mỗi món đồ đều phải trải qua hàng trăm giờ lao động miệt mài, đánh đổi bằng mồ hôi và cả những vết chai sạn trên đôi tay. Nhưng đó là cách duy nhất để tạo ra một món đồ "có hồn".
            </p>

            <div className="space-y-12">
              {STEPS.map((step, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-6 items-start group">
                  <div className="relative w-full sm:w-32 h-24 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 group-hover:border-amber-300 transition-colors shadow-sm">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-3 group-hover:text-amber-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
