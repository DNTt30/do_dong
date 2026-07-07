'use client';

import Image from 'next/image';
import { MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ArtisanCTA() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#FDFBF7] border-t border-neutral-200">
      {/* Abstract Background Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" 
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" 
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-neutral-200 rounded-3xl p-8 md:p-16 text-center shadow-xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border-2 border-amber-200 shadow-sm relative group">
              <Image
                src="/images/process/behind-the-scenes.jpg" // Using artisan hands as profile fallback
                alt="Người thợ"
                width={96}
                height={96}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">
              Bạn Cần Tìm Một Món Đồ Riêng?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-neutral-600 text-lg mb-10 max-w-2xl mx-auto">
              Hãy nhắn tin trực tiếp cho mình để được tư vấn nhé. Từ việc chọn mẫu, lên ý tưởng họa tiết đến kích thước sao cho phù hợp với không gian nhà bạn.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="https://zalo.me/your-zalo-number"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#0068FF] text-white rounded-xl font-semibold hover:bg-[#0055d4] transition-colors duration-300 shadow-[0_0_15px_rgba(0,104,255,0.2)] hover:shadow-[0_0_25px_rgba(0,104,255,0.4)] transform hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat Zalo Tư Vấn</span>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61590547241248"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-[#0866FF] text-white rounded-xl font-semibold hover:bg-[#0654d4] transition-colors duration-300 shadow-[0_0_15px_rgba(8,102,255,0.2)] hover:shadow-[0_0_25px_rgba(8,102,255,0.4)] transform hover:-translate-y-1"
              >
                <Send className="w-5 h-5" />
                <span>Nhắn Tin Facebook</span>
              </a>
            </motion.div>
            
            <motion.p variants={itemVariants} className="mt-8 text-sm text-neutral-500 italic">
              * Vì ban ngày mình thường bận đục chạm nên có thể trả lời hơi chậm một chút. Bạn cứ để lại lời nhắn nhé!
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
