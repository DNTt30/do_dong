/**
 * FacebookVideos — Embedded Facebook video section.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';

// Placeholder Facebook video IDs — thay bằng video thực tế
const FACEBOOK_VIDEOS = [
  {
    id: 'fb-video-1',
    title: 'Quy trình đúc đồng thủ công tại xưởng',
    description: 'Xem cách chúng tôi tạo ra những tác phẩm đồng tinh xảo từ nguyên liệu thô',
    // Thay bằng Facebook video URL thực tế của bạn
    videoUrl: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fdodongnamdinh%2Fvideos%2F1&show_text=0',
    thumbnail: null,
  },
  {
    id: 'fb-video-2',
    title: 'Chạm khắc hoa văn trên lư đồng',
    description: 'Kỹ thuật chạm khắc thủ công tỉ mỉ — mỗi đường nét đều có ý nghĩa',
    videoUrl: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fdodongnamdinh%2Fvideos%2F2&show_text=0',
    thumbnail: null,
  },
  {
    id: 'fb-video-3',
    title: 'Bộ sưu tập đỉnh đồng cao cấp',
    description: 'Giới thiệu bộ sưu tập đỉnh đồng mới nhất — chế tác theo yêu cầu',
    videoUrl: 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fdodongnamdinh%2Fvideos%2F3&show_text=0',
    thumbnail: null,
  },
];

const FACEBOOK_PAGE_URL = 'https://www.facebook.com/dodongnamdinh';

function VideoCard({ video, index }: { video: typeof FACEBOOK_VIDEOS[0]; index: number }) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group bg-[#1A1A1A] rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Video / Thumbnail */}
      <div className="relative aspect-video bg-[#0D0D0D]">
        {isPlaying ? (
          <iframe
            src={video.videoUrl}
            className="w-full h-full"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            title={video.title}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer group" onClick={() => setIsPlaying(true)}>
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/20 via-transparent to-black/50" />

            {/* Play button */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#B8860B] group-hover:border-[#B8860B] transition-all duration-300 group-hover:scale-110">
                <Play size={24} className="text-white ml-1" fill="white" />
              </div>
              <span className="text-white/60 text-xs font-medium tracking-widest uppercase">
                Nhấn để phát
              </span>
            </div>

            {/* Facebook logo watermark */}
            <div className="absolute top-3 right-3 z-10 bg-[#1877F2] text-white text-xs font-bold px-2 py-1 rounded">
              f Video
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-semibold text-white text-sm md:text-base mb-2 line-clamp-2 leading-snug">
          {video.title}
        </h3>
        <p className="text-white/50 text-xs font-light leading-relaxed line-clamp-2">
          {video.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function FacebookVideos() {
  return (
    <section className="py-20 md:py-32 bg-[#111111]">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
          >
            <div className="w-4 h-4 bg-[#1877F2] rounded-sm flex items-center justify-center text-white font-bold text-[8px]">f</div>
            Facebook Videos
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-tight"
          >
            Xưởng Chế Tác Của Chúng Tôi
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg font-light max-w-lg mx-auto"
          >
            Theo dõi hậu trường chế tác — từ nguyên liệu thô đến tác phẩm hoàn chỉnh
          </motion.p>
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FACEBOOK_VIDEOS.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>

        {/* View more on Facebook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#1877F2] text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-[#1565C0] transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center text-[#1877F2] font-bold text-xs">f</div>
            Xem thêm trên Facebook
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
