/**
 * Navigation menu items for Header and Footer.
 */

import type { NavItem } from '@/types/common.types';
import { ROUTES } from './routes';

export const MAIN_NAV: NavItem[] = [
  { label: 'Trang chủ', href: ROUTES.HOME },
  { label: 'Giới thiệu', href: ROUTES.ABOUT },
  {
    label: 'Sản phẩm',
    href: ROUTES.PRODUCTS,
    children: [
      { label: 'Tất cả sản phẩm', href: ROUTES.PRODUCTS },
      { label: 'Lư đồng', href: ROUTES.CATEGORY('lu-dong') },
      { label: 'Đỉnh đồng', href: ROUTES.CATEGORY('dinh-dong') },
      { label: 'Chuông đồng', href: ROUTES.CATEGORY('chuong-dong') },
      { label: 'Tượng đồng', href: ROUTES.CATEGORY('tuong-dong') },
      { label: 'Trống đồng', href: ROUTES.CATEGORY('trong-dong') },
    ],
  },
  { label: 'Tin tức', href: ROUTES.BLOG },
  { label: 'Đặt hàng', href: ROUTES.ORDER },
  { label: 'Liên hệ', href: ROUTES.CONTACT },
];

export const FOOTER_LINKS = {
  sanPham: [
    { label: 'Lư đồng', href: ROUTES.CATEGORY('lu-dong') },
    { label: 'Đỉnh đồng', href: ROUTES.CATEGORY('dinh-dong') },
    { label: 'Chuông đồng', href: ROUTES.CATEGORY('chuong-dong') },
    { label: 'Tượng đồng', href: ROUTES.CATEGORY('tuong-dong') },
    { label: 'Trống đồng', href: ROUTES.CATEGORY('trong-dong') },
  ],
  lienKet: [
    { label: 'Giới thiệu', href: ROUTES.ABOUT },
    { label: 'Đặt hàng', href: ROUTES.ORDER },
    { label: 'Tin tức', href: ROUTES.BLOG },
    { label: 'Liên hệ', href: ROUTES.CONTACT },
  ],
};
