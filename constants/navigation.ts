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
      { label: 'Bộ Tam Sự', href: ROUTES.CATEGORY('bo-tam-su') },
      { label: 'Bộ Ngũ Sự', href: ROUTES.CATEGORY('bo-ngu-su') },
      { label: 'Đỉnh Đồng', href: ROUTES.CATEGORY('dinh-dong') },
      { label: 'Lư Hương', href: ROUTES.CATEGORY('lu-huong') },
      { label: 'Hạc Đồng', href: ROUTES.CATEGORY('hac-dong') },
      { label: 'Tượng Đồng', href: ROUTES.CATEGORY('tuong-dong') },
    ],
  },
  {
    label: 'Kiến thức',
    href: ROUTES.BLOG,
    children: [
      { label: 'Tất cả bài viết', href: ROUTES.BLOG },
      { label: 'Quy trình chế tác', href: ROUTES.CRAFT_PROCESS },
      { label: 'Hỏi đáp', href: ROUTES.FAQ },
    ],
  },
  { label: 'Liên hệ', href: ROUTES.CONTACT },
];

export const FOOTER_LINKS = {
  sanPham: [
    { label: 'Bộ Tam Sự', href: ROUTES.CATEGORY('bo-tam-su') },
    { label: 'Bộ Ngũ Sự', href: ROUTES.CATEGORY('bo-ngu-su') },
    { label: 'Đỉnh Đồng', href: ROUTES.CATEGORY('dinh-dong') },
    { label: 'Lư Hương', href: ROUTES.CATEGORY('lu-huong') },
    { label: 'Hạc Đồng', href: ROUTES.CATEGORY('hac-dong') },
    { label: 'Tượng Đồng', href: ROUTES.CATEGORY('tuong-dong') },
  ],
  lienKet: [
    { label: 'Giới thiệu', href: ROUTES.ABOUT },
    { label: 'Quy trình chế tác', href: ROUTES.CRAFT_PROCESS },
    { label: 'Tin tức', href: ROUTES.BLOG },
    { label: 'Hỏi đáp', href: ROUTES.FAQ },
    { label: 'Liên hệ', href: ROUTES.CONTACT },
  ],
  chinh_sach: [
    { label: 'Chính sách bảo mật', href: ROUTES.PRIVACY },
    { label: 'Điều khoản sử dụng', href: ROUTES.TERMS },
    { label: 'Tra cứu đơn hàng', href: ROUTES.ORDER_TRACKING },
  ],
};
