'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ArtisanHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FDFBF7]">
      {/* Background Image / Video Placeholder */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero-bg.jpg" // Using an existing or placeholder image
          alt="Góc chế tác đồ đồng thủ công"
          fill
          className="object-cover opacity-15 mix-blend-multiply"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-4 text-center mt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          <motion.span 
            variants={itemVariants}
            className="inline-block py-1.5 px-4 rounded-full bg-amber-100 text-amber-700 border border-amber-200 text-sm font-medium tracking-widest uppercase mb-8 shadow-sm"
          >
            Góc Chế Tác Nam Định
          </motion.span>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-neutral-900 mb-8 leading-tight tracking-tight font-serif"
          >
            Nơi mỗi tác phẩm là <br />
            <span className="text-amber-600 italic">
              một câu chuyện riêng
            </span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-neutral-700 mb-12 leading-relaxed font-light max-w-2xl mx-auto"
          >
            &quot;Chào bạn, mình chế tác đồ đồng tại nhà ở Nam Định. Từ những khối đồng thô ráp, qua hàng vạn nhát búa và sự tỉ mỉ của kỹ thuật khảm, mình mong muốn mang đến những tác phẩm mang đậm dấu ấn cá nhân.&quot;
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#gallery"
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-full font-semibold hover:from-amber-700 hover:to-amber-600 transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Xem Tác Phẩm
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 bg-white text-neutral-800 border border-neutral-300 rounded-full font-semibold hover:bg-neutral-50 transition-all duration-300 w-full sm:w-auto hover:border-neutral-400 shadow-sm"
            >
              Trò Chuyện Cùng Mình
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
