/**
 * Custom 404 Not Found page.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = {
  title: '404 — Trang không tồn tại',
  robots: 'noindex',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        {/* Decorative number */}
        <div className="font-serif text-[140px] md:text-[200px] font-bold text-gradient-gold leading-none mb-4 select-none">
          404
        </div>

        <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3">
          Trang không tồn tại
        </h1>
        <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển đến địa chỉ khác.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href={ROUTES.HOME} className="btn-primary">
            Về trang chủ
          </Link>
          <Link href={ROUTES.PRODUCTS} className="btn-outline">
            Xem sản phẩm
          </Link>
          <Link href={ROUTES.CONTACT} className="btn-outline">
            Liên hệ
          </Link>
        </div>
      </div>
    </div>
  );
}
