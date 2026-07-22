'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';
import { motion } from 'framer-motion';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Zalo Button */}
      <motion.a
        href={CONTACT_INFO.zalo}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-[#0068FF] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow relative group"
        aria-label="Chat Zalo"
      >
        <MessageCircle className="text-white w-7 h-7" />
        <span className="absolute right-full mr-4 bg-white text-black text-sm px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium">
          Chat Zalo
        </span>
      </motion.a>

      {/* Phone Button */}
      <motion.a
        href={`tel:${CONTACT_INFO.phone}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-[#B8860B] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow relative group before:content-[''] before:absolute before:inset-0 before:bg-[#B8860B] before:rounded-full before:animate-ping before:opacity-60"
        aria-label="Gọi điện thoại"
      >
        <Phone className="text-white w-6 h-6 animate-[wiggle_1s_ease-in-out_infinite] z-10" />
        <span className="absolute right-full mr-4 bg-white text-black text-sm px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium z-10">
          {CONTACT_INFO.phoneDisplay || CONTACT_INFO.phone}
        </span>
      </motion.a>
    </div>
  );
}
