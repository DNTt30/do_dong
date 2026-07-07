'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ARTISAN_WORKS = [
  {
    id: 1,
    title: 'Đỉnh Đồng Khảm Ngũ Sắc',
    description: 'Chế tác giới hạn 3 chiếc mỗi năm. Kỹ thuật khảm vàng, bạc, đồng đỏ, đồng đen, đồng xanh cực kỳ phức tạp trên phôi đồng nồi hè tinh khiết.',
    image: '/images/gallery/dinh-kham-ngu-sac.jpg',
    tag: 'Phiên bản giới hạn'
  },
  {
    id: 2,
    title: 'Tranh Sen Khảm Bạc',
    description: 'Bức tranh khảm thủ công với những nét chạm bạc thanh mảnh, tinh tế. Thể hiện sự thanh tao, thuần khiết.',
    image: '/images/gallery/tranh-sen-kham-bac.jpg',
    tag: 'Custom-made'
  },
  {
    id: 3,
    title: 'Lư Hương Chạm Thủng',
    description: 'Đục chạm thủ công hoàn toàn. Những họa tiết hoa văn được người thợ gò búa chắt chiu từng nhát, mất đến hàng tháng để hoàn thiện.',
    image: '/images/gallery/lu-huong-cham.jpg',
    tag: 'Độc bản'
  }
];

export default function ArtisanGallery() {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">
              Tác Phẩm Nổi Bật
            </h2>
            <p className="text-neutral-600 text-lg">
              Mình không làm số lượng lớn. Mỗi tháng chỉ nhận một vài món để đảm bảo sự tỉ mỉ, tâm huyết nhất cho từng tác phẩm.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTISAN_WORKS.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-500"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-amber-700 text-xs font-semibold rounded-full border border-amber-200 shadow-sm">
                    {work.tag}
                  </span>
                </div>
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 bg-neutral-100">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-serif font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {work.title}
                </h3>
                <p className="text-neutral-200 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {work.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
