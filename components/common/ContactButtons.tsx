/**
 * ContactButtons — fixed floating action buttons for Zalo, Messenger, and Phone.
 * Always visible on all public pages.
 */

'use client';

import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';

import { CONTACT_INFO } from '@/constants/contact';

export default function ContactButtons() {
  const { settings } = useSettings();
  const [isExpanded, setIsExpanded] = useState(false);

  // Use settings from Supabase if available, fall back to constants
  const phone = settings?.phone ?? CONTACT_INFO.phone;
  const zaloPhone = settings?.zaloPhone ?? CONTACT_INFO.zalo;

  const buttons = [
    {
      id: 'phone',
      label: 'Gọi điện',
      href: `tel:${phone}`,
      bgColor: 'bg-green-500 hover:bg-green-600',
      icon: <Phone size={20} />,
    },
    {
      id: 'zalo',
      label: 'Chat Zalo',
      href: `https://zalo.me/${zaloPhone}`,
      bgColor: 'bg-blue-500 hover:bg-blue-600',
      icon: (
        <span className="text-sm font-bold leading-none">ZL</span>
      ),
    },
  ];

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end gap-3">
      {/* Expanded action buttons */}
      <AnimatePresence>
        {isExpanded &&
          buttons.slice(0, -1).map((btn, index) => (
            <motion.div
              key={btn.id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="bg-white text-foreground text-xs font-medium px-2.5 py-1 rounded-full shadow-card whitespace-nowrap">
                {btn.label}
              </span>
              <a
                href={btn.href}
                target={btn.href.startsWith('tel:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full ${btn.bgColor} text-white flex items-center justify-center shadow-gold transition-colors`}
                aria-label={btn.label}
              >
                {btn.icon}
              </a>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Main toggle / phone button */}
      <div className="flex items-center gap-2">
        {!isExpanded && settings?.phone && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white text-foreground text-xs font-medium px-2.5 py-1 rounded-full shadow-card"
          >
            {settings.phone}
          </motion.span>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 rounded-full bg-gradient-bronze text-white flex items-center justify-center shadow-gold hover:scale-105 transition-transform`}
          aria-label="Liên hệ"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Phone size={24} />
          </motion.div>
        </button>
      </div>
    </div>
  );
}
