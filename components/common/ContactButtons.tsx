/**
 * ContactButtons — fixed floating action buttons for Zalo, Messenger, and Phone.
 * Always visible on all public pages.
 */

'use client';

import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/hooks/useSettings';

export default function ContactButtons() {
  const { settings } = useSettings();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!settings) return null;

  const buttons = [
    {
      id: 'phone',
      label: 'Gọi điện',
      href: `tel:${settings.phone}`,
      bgColor: 'bg-green-500 hover:bg-green-600',
      icon: <Phone size={20} />,
    },
    settings.zaloPhone && {
      id: 'zalo',
      label: 'Chat Zalo',
      href: `https://zalo.me/${settings.zaloPhone}`,
      bgColor: 'bg-blue-500 hover:bg-blue-600',
      icon: (
        <span className="text-sm font-bold leading-none">ZL</span>
      ),
    },
    settings.messengerUrl && {
      id: 'messenger',
      label: 'Messenger',
      href: settings.messengerUrl,
      bgColor: 'bg-[#0099FF] hover:bg-blue-600',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
        </svg>
      ),
    },
  ].filter(Boolean) as Array<{
    id: string;
    label: string;
    href: string;
    bgColor: string;
    icon: React.ReactNode;
  }>;

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
        {!isExpanded && settings.phone && (
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
