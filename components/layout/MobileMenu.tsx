/**
 * MobileMenu — slide-in drawer for mobile navigation.
 */

'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, Phone, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MAIN_NAV } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  phone?: string;
}

export default function MobileMenu({ isOpen, onClose, phone }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white shadow-xl lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Link
                href={ROUTES.HOME}
                onClick={onClose}
                className="flex flex-col"
              >
                <span className="font-serif text-lg font-bold text-primary">Đồ Đồng</span>
                <span className="text-xs text-secondary font-medium tracking-widest uppercase">
                  Nam Định
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                aria-label="Đóng menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {MAIN_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 font-medium transition-colors"
                    >
                      {item.label}
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </Link>

                    {/* Sub-items */}
                    {item.children && (
                      <ul className="mt-1 ml-4 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer CTA */}
            {phone && (
              <div className="p-4 border-t border-border bg-muted/30">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-center gap-2 w-full btn-primary"
                >
                  <Phone size={18} />
                  Gọi ngay: {phone}
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
