'use client';

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_INFO } from '@/constants/contact';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3"
        >
          {/* Expanded buttons */}
          <AnimatePresence>
            {expanded && (
              <>
                {/* Zalo button */}
                <motion.a
                  key="zalo"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ delay: 0.05 }}
                  href={CONTACT_INFO.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#0068FF] text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-[#0052CC] transition-colors text-sm font-semibold"
                  aria-label="Nhắn Zalo"
                >
                  <MessageCircle size={18} />
                  Nhắn Zalo
                </motion.a>

                {/* Phone button */}
                <motion.a
                  key="phone"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ delay: 0 }}
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-green-600 transition-colors text-sm font-semibold"
                  aria-label="Gọi điện"
                >
                  <Phone size={18} />
                  {CONTACT_INFO.phoneDisplay}
                </motion.a>
              </>
            )}
          </AnimatePresence>

          {/* Main toggle button */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-14 h-14 rounded-full bg-[#B8860B] text-white shadow-[0_4px_20px_rgba(184,134,11,0.5)] flex items-center justify-center hover:bg-[#9a7009] transition-all duration-300 hover:scale-110"
            aria-label="Liên hệ nhanh"
          >
            <AnimatePresence mode="wait">
              {expanded ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="phone"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Phone size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
