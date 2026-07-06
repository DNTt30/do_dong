/**
 * Formatting utilities for prices, dates, and text.
 */

/**
 * Format a number as Vietnamese Dong currency.
 * Example: 1500000 → "1.500.000 ₫"
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

/**
 * Calculate discount percentage between original and sale price.
 */
export function calcDiscountPercent(price: number, salePrice: number): number {
  if (price <= 0 || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}

/**
 * Format a timestamp to Vietnamese date string.
 * Example: "06/07/2026"
 */
export function formatDate(
  timestamp: string | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('vi-VN', options ?? {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * Format a timestamp as relative time.
 * Example: "3 ngày trước"
 */
export function formatRelativeTime(timestamp: string | Date): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hôm nay';
  if (diffDays === 1) return 'Hôm qua';
  if (diffDays < 7) return `${diffDays} ngày trước`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} tháng trước`;
  return `${Math.floor(diffDays / 365)} năm trước`;
}

/**
 * Truncate text to a maximum number of characters with ellipsis.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

/**
 * Strip HTML tags from a string (for excerpt generation).
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Generate an excerpt from HTML content.
 */
export function generateExcerpt(html: string, maxLength = 160): string {
  return truncateText(stripHtml(html), maxLength);
}
