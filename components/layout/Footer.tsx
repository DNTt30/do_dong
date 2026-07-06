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
    <footer className="bg-primary text-white">
      {/* Main footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link href={ROUTES.HOME} className="block mb-4">
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
                  <div className="font-serif text-2xl font-bold text-white">Đồ Đồng</div>
                  <div className="text-secondary text-sm font-medium tracking-widest uppercase">
                    Nam Định
                  </div>
                </div>
              )}
            </Link>
            <p className="text-primary-100 text-sm leading-relaxed mb-6">
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
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors"
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
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors text-xs font-bold"
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
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-red-500 flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <span className="text-xs font-bold">YT</span>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-secondary">Sản phẩm</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.sanPham.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-100 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick links */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-secondary">Liên kết</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.lienKet.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-100 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-secondary">Liên hệ</h3>
            <ul className="space-y-3">
              {settings?.phone && (
                <li>
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex items-start gap-2 text-sm text-primary-100 hover:text-white transition-colors"
                  >
                    <Phone size={16} className="shrink-0 mt-0.5 text-secondary" />
                    <span>{settings.phone}</span>
                  </a>
                </li>
              )}
              {settings?.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-start gap-2 text-sm text-primary-100 hover:text-white transition-colors"
                  >
                    <Mail size={16} className="shrink-0 mt-0.5 text-secondary" />
                    <span>{settings.email}</span>
                  </a>
                </li>
              )}
              {settings?.address && (
                <li>
                  <div className="flex items-start gap-2 text-sm text-primary-100">
                    <MapPin size={16} className="shrink-0 mt-0.5 text-secondary" />
                    <span>{settings.address}</span>
                  </div>
                </li>
              )}
              {settings?.workingHours && (
                <li className="text-sm text-primary-100">
                  🕐 {settings.workingHours}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-100">
          <p>© {currentYear} {settings?.companyName ?? 'Đồ Đồng Nam Định'}. Tất cả quyền được bảo lưu.</p>
          <p>Thiết kế bởi <span className="text-secondary">Web Nam Định</span></p>
        </div>
      </div>
    </footer>
  );
}
