'use client';

/**
 * FloatingCTA — Premium floating contact widget.
 * Có Messenger, Zalo và Hotline với pulse animation.
 * Hiện sau khi scroll 400px.
 */

import React, { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_INFO } from '@/constants/contact';

const MESSENGER_URL = 'https://m.me/dodongnamdinh';

const BUTTONS = [
  {
    key: 'messenger',
    label: 'Messenger',
    sublabel: 'Chat Facebook',
    href: MESSENGER_URL,
    bgClass: 'bg-[#1877F2]',
    hoverClass: 'hover:bg-[#1565C0]',
    shadowClass: 'shadow-[0_4px_16px_rgba(24,119,242,0.45)]',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
        <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.926 1.46 5.54 3.75 7.25V22l3.44-1.888c.918.254 1.892.388 2.81.388 5.523 0 10-4.145 10-9.241C22 6.145 17.523 2 12 2zm1.024 12.428l-2.55-2.72-4.978 2.72 5.474-5.814 2.614 2.72 4.914-2.72-5.474 5.814z"/>
      </svg>
    ),
  },
  {
    key: 'zalo',
    label: 'Zalo',
    sublabel: 'Nhắn tin ngay',
    href: CONTACT_INFO.zaloLink,
    bgClass: 'bg-[#0068FF]',
    hoverClass: 'hover:bg-[#0054CC]',
    shadowClass: 'shadow-[0_4px_16px_rgba(0,104,255,0.45)]',
    icon: (
      <span className="text-white font-extrabold text-sm leading-none">ZL</span>
    ),
  },
  {
    key: 'phone',
    label: CONTACT_INFO.phoneDisplay,
    sublabel: '7:00 – 19:00 mỗi ngày',
    href: `tel:${CONTACT_INFO.phone}`,
    bgClass: 'bg-emerald-500',
    hoverClass: 'hover:bg-emerald-600',
    shadowClass: 'shadow-[0_4px_16px_rgba(16,185,129,0.45)]',
    icon: <Phone size={20} className="text-white" />,
  },
];

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 400;
      setVisible(shouldShow);
      // Close if user scrolls back to top
      if (!shouldShow) setExpanded(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Show after a delay on mobile even without scroll
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          className="fixed bottom-6 right-4 md:right-6 z-50 flex flex-col items-end gap-2.5"
        >
          {/* Expanded contact options */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-2.5"
              >
                {BUTTONS.map((btn, i) => (
                  <motion.a
                    key={btn.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.06, duration: 0.2 }}
                    href={btn.href}
                    target={btn.key !== 'phone' ? '_blank' : undefined}
                    rel={btn.key !== 'phone' ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-3 ${btn.bgClass} ${btn.hoverClass} text-white pl-3 pr-5 py-2.5 rounded-full ${btn.shadowClass} transition-all duration-200 hover:scale-105 min-w-[180px]`}
                    aria-label={btn.label}
                  >
                    <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                      {btn.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm leading-tight">{btn.label}</span>
                      <span className="text-white/70 text-xs leading-tight">{btn.sublabel}</span>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main toggle button with pulse */}
          <div className="relative">
            {/* Pulse ring */}
            {!expanded && (
              <span className="absolute inset-0 rounded-full bg-[#B8860B] animate-ping opacity-30" />
            )}
            <button
              onClick={() => setExpanded((v) => !v)}
              className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(184,134,11,0.55)] transition-all duration-300 hover:scale-110 ${
                expanded
                  ? 'bg-gray-800 rotate-0'
                  : 'bg-[#B8860B] hover:bg-[#9a7009]'
              }`}
              aria-label={expanded ? 'Đóng' : 'Liên hệ nhanh'}
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
                    <X size={22} className="text-white" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="phone"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Phone size={22} className="text-white" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
