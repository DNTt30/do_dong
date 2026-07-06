'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CraftingProcessVideo() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif mb-4"
          >
            Quy Trình Chế Tác
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Mỗi sản phẩm là một tác phẩm nghệ thuật đúc kết từ tâm huyết của nghệ nhân.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video w-full max-w-5xl mx-auto rounded-3xl overflow-hidden bg-[#1A1A1A]"
        >
          {/* Placeholder for actual Video/YouTube Embed */}
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" 
            title="Quy trình đúc đồng" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
