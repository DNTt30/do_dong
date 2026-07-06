/**
 * SEO constants — default metadata values.
 */

export const SEO_DEFAULTS = {
  siteName: 'Đồ Đồng Thủ Công Nam Định',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dodongnamdinh.vn',
  defaultTitle: 'Đồ Đồng Thủ Công Nam Định - Lư Đồng, Đỉnh Đồng, Tượng Đồng Chính Hãng',
  defaultDescription:
    'Chuyên sản xuất và cung cấp đồ đồng thủ công truyền thống làng nghề Nam Định: lư đồng, đỉnh đồng, chuông đồng, tượng đồng, trống đồng. Chất lượng cao, giá tốt nhất.',
  defaultKeywords: [
    'đồ đồng',
    'đồng thủ công',
    'Nam Định',
    'lư đồng',
    'đỉnh đồng',
    'chuông đồng',
    'tượng đồng',
    'trống đồng',
    'làng nghề đúc đồng',
  ],
  ogImage: '/images/og-default.jpg',
  twitterHandle: '@dodongnamdinh',
} as const;
