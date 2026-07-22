/**
 * Footer component — Premium with Google Maps, social links, full navigation.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Facebook, MessageCircle } from 'lucide-react';
import { FOOTER_LINKS } from '@/constants/navigation';
import { ROUTES } from '@/constants/routes';
import { CONTACT_INFO } from '@/constants/contact';
import { getSettings } from '@/services/settings.service';

export default async function Footer() {
  // Server component — fetch settings directly
  let settings = null;
  try {
    settings = await getSettings();
  } catch {
    // Settings not available during build — use fallback values
  }

  const currentYear = new Date().getFullYear();

  const facebookLink = settings?.facebook ?? 'https://www.facebook.com/dodongnamdinh';
  const messengerLink = 'https://m.me/dodongnamdinh';

  return (
    <footer className="bg-[#111111] text-white">
      {/* Google Maps embed */}
      <div className="w-full h-52 md:h-64 relative overflow-hidden border-b border-white/5">
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAFRBMQQliGVa7NSLzBa4Z_PELe5MkL5lo&q=${encodeURIComponent(CONTACT_INFO.mapQuery)}&zoom=14`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bản đồ Đồ Đồng Nam Định"
          className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        />
        {/* Overlay with address */}
        <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white text-xs rounded-lg px-3 py-2 flex items-start gap-2 max-w-[260px]">
          <MapPin size={12} className="text-[#B8860B] shrink-0 mt-0.5" />
          <span>{CONTACT_INFO.address}</span>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand (2 cols wide) */}
          <div className="lg:col-span-2">
            <Link href={ROUTES.HOME} className="block mb-5">
              {settings?.logo ? (
                <Image
                  src={settings.logo}
                  alt={settings.companyName}
                  width={160}
                  height={48}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <div>
                  <div className="font-serif text-3xl font-bold text-[#B8860B]">Đồ Đồng</div>
                  <div className="text-white/60 text-sm font-medium tracking-[0.2em] uppercase mt-0.5">
                    Thủ Công Nam Định
                  </div>
                </div>
              )}
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              {settings?.aboutText ??
                'Chuyên sản xuất đồ đồng thủ công truyền thống tại làng Vạn Điểm, Ý Yên, Nam Định. Cam kết đồng nguyên chất, chế tác tỉ mỉ.'}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mb-6">
              {/* Facebook */}
              <a
                href={facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              {/* Messenger */}
              <a
                href={messengerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300"
                aria-label="Messenger"
              >
                <MessageCircle size={18} />
              </a>
              {/* Zalo */}
              <a
                href={CONTACT_INFO.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0068FF] flex items-center justify-center transition-all duration-300 text-xs font-bold"
                aria-label="Zalo"
              >
                ZL
              </a>
              {/* Phone */}
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#B8860B] flex items-center justify-center transition-all duration-300"
                aria-label="Gọi điện"
              >
                <Phone size={18} />
              </a>
            </div>

            {/* Hotline */}
            <div className="flex items-center gap-2.5">
              <Phone size={14} className="text-[#B8860B]" />
              <div>
                <p className="text-white/40 text-xs mb-0.5">Hotline tư vấn</p>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-white font-semibold hover:text-[#B8860B] transition-colors"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="font-serif text-base font-semibold mb-5 text-[#B8860B]">Sản phẩm</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.sanPham.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick links */}
          <div>
            <h3 className="font-serif text-base font-semibold mb-5 text-[#B8860B]">Thông tin</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.lienKet.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Policy */}
          <div>
            <h3 className="font-serif text-base font-semibold mb-5 text-[#B8860B]">Liên hệ</h3>
            <ul className="space-y-4 mb-8">
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-start gap-2.5 text-sm text-white/50 hover:text-white transition-colors group"
                >
                  <Phone size={14} className="text-[#B8860B] shrink-0 mt-0.5" />
                  <div>
                    <span className="block">{CONTACT_INFO.phoneDisplay}</span>
                    <span className="text-xs text-white/30">7:00 – 19:00 mỗi ngày</span>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-white/50">
                  <MapPin size={14} className="text-[#B8860B] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{CONTACT_INFO.address}</span>
                </div>
              </li>
            </ul>

            <h3 className="font-serif text-base font-semibold mb-4 text-[#B8860B]">Chính sách</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.chinh_sach.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>
            © {currentYear}{' '}
            <span className="text-white/50">
              {settings?.companyName ?? 'Đồ Đồng Thủ Công Nam Định'}
            </span>
            . Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-4">
            <Link href={ROUTES.PRIVACY} className="hover:text-white/60 transition-colors">
              Bảo mật
            </Link>
            <Link href={ROUTES.TERMS} className="hover:text-white/60 transition-colors">
              Điều khoản
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
