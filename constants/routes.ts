/**
 * Application route constants.
 * Use these instead of hardcoded strings throughout the app.
 */

export const ROUTES = {
  HOME: '/',
  ABOUT: '/gioi-thieu',
  PRODUCTS: '/san-pham',
  PRODUCT_DETAIL: (slug: string) => `/san-pham/${slug}`,
  CATEGORY: (slug: string) => `/san-pham/danh-muc/${slug}`,
  BLOG: '/tin-tuc',
  BLOG_DETAIL: (slug: string) => `/tin-tuc/${slug}`,
  CONTACT: '/lien-he',
  ORDER: '/dat-hang',
  SEARCH: '/tim-kiem',

  // Admin routes
  ADMIN: {
    LOGIN: '/admin/login',
    DASHBOARD: '/admin/dashboard',
    PRODUCTS: '/admin/san-pham',
    PRODUCT_NEW: '/admin/san-pham/them-moi',
    PRODUCT_EDIT: (id: string) => `/admin/san-pham/${id}`,
    CATEGORIES: '/admin/danh-muc',
    CATEGORY_EDIT: (id: string) => `/admin/danh-muc/${id}`,
    BLOGS: '/admin/bai-viet',
    BLOG_NEW: '/admin/bai-viet/them-moi',
    BLOG_EDIT: (id: string) => `/admin/bai-viet/${id}`,
    BANNERS: '/admin/banner',
    SETTINGS: '/admin/cai-dat',
  },
} as const;
