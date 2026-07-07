/**
 * Footer component — logo, description, links, social, map embed, copyright.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook } from 'lucide-react';
import { FOOTER_LINKS } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';
import { getSettings } from '@/services/settings.service';

export default async function Footer() {
  // Server component — fetch settings directly
  const settings = await getSettings();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white border-t border-border/10">
      {/* Main footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link href={ROUTES.HOME} className="block mb-6">
              {settings?.logo ? (
                <Image
                  src={settings.logo}
                  alt={settings.companyName}
                  width={160}
                  height={48}
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <div>
                  <div className="font-serif text-3xl font-bold text-primary">Đồ Đồng</div>
                  <div className="text-white text-sm font-medium tracking-[0.2em] uppercase mt-1">
                    Nam Định
                  </div>
                </div>
              )}
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {settings?.aboutText ??
                'Chuyên sản xuất đồ đồng thủ công truyền thống làng nghề Nam Định. Cam kết chất lượng, uy tín và giá tốt nhất.'}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {settings?.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              )}
              {settings?.zalo && (
                <a
                  href={settings.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition-all duration-300 text-xs font-bold"
                  aria-label="Zalo"
                >
                  ZL
                </a>
              )}
              {settings?.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-600 flex items-center justify-center transition-all duration-300"
                  aria-label="YouTube"
                >
                  <span className="text-xs font-bold">YT</span>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-primary">Sản phẩm</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.sanPham.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-primary">Liên kết</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.lienKet.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-primary">Liên hệ</h3>
            <ul className="space-y-4">
              {settings?.phone && (
                <li>
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex items-start gap-3 text-sm text-white/70 hover:text-primary transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 shrink-0">
                      <Phone size={14} className="text-primary" />
                    </div>
                    <span className="mt-1.5">{settings.phone}</span>
                  </a>
                </li>
              )}
              {settings?.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-start gap-3 text-sm text-white/70 hover:text-primary transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 shrink-0">
                      <Mail size={14} className="text-primary" />
                    </div>
                    <span className="mt-1.5">{settings.email}</span>
                  </a>
                </li>
              )}
              {settings?.address && (
                <li>
                  <div className="flex items-start gap-3 text-sm text-white/70">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <MapPin size={14} className="text-primary" />
                    </div>
                    <span className="mt-1.5 leading-relaxed">{settings.address}</span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {currentYear} {settings?.companyName ?? 'Đồ Đồng Nam Định'}. Tất cả quyền được bảo lưu.</p>
          <p>Thiết kế bởi <span className="text-primary">Web Nam Định</span></p>
        </div>
      </div>
    </footer>
  );
}
