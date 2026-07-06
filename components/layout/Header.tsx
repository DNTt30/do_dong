/**
 * Header component — sticky navigation with logo, menu, search, and hotline.
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Search, Menu, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MAIN_NAV } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';
import { useSettings } from '@/hooks/useSettings';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { settings } = useSettings();

  // Detect scroll for sticky header styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-white text-sm py-2 hidden md:block">
        <div className="container flex items-center justify-between">
          <span className="text-primary-100">
            Chuyên sản xuất đồ đồng thủ công truyền thống làng nghề Nam Định
          </span>
          <div className="flex items-center gap-4">
            {settings?.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-1.5 text-secondary hover:text-white transition-colors"
              >
                <Phone size={14} />
                <span className="font-semibold">{settings.phone}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          'sticky top-0 z-50 bg-white border-b border-border/50 transition-all duration-300',
          isScrolled ? 'shadow-md' : 'shadow-sm'
        )}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href={ROUTES.HOME} className="flex items-center gap-3 shrink-0">
              {settings?.logo ? (
                <Image
                  src={settings.logo}
                  alt={settings.companyName}
                  width={160}
                  height={48}
                  className="h-10 md:h-12 w-auto object-contain"
                  priority
                />
              ) : (
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold text-primary leading-tight">
                    Đồ Đồng
                  </span>
                  <span className="text-xs text-secondary font-medium tracking-widest uppercase">
                    Nam Định
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {MAIN_NAV.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium',
                      'text-foreground hover:text-primary hover:bg-primary/5',
                      'transition-colors duration-200'
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform duration-200',
                          activeDropdown === item.href && 'rotate-180'
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-card-hover border border-border/50 py-1 overflow-hidden"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-md text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                aria-label="Tìm kiếm"
              >
                <Search size={20} />
              </button>

              {/* Phone (mobile) */}
              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="hidden md:flex lg:hidden items-center gap-1.5 px-3 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary-600 transition-colors"
                >
                  <Phone size={16} />
                  <span>{settings.phone}</span>
                </a>
              )}

              {/* CTA button desktop */}
              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="hidden lg:flex btn-primary text-sm py-2.5"
                >
                  <Phone size={16} />
                  Gọi tư vấn
                </a>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                aria-label="Mở menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        phone={settings?.phone}
      />

      {/* Search Overlay */}
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
