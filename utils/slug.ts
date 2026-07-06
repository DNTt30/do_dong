/**
 * Slug generation utilities.
 */

import slugify from 'slugify';

/**
 * Generate a URL-friendly slug from a Vietnamese string.
 * Example: "Lư Đồng Cao Cấp" → "lu-dong-cao-cap"
 */
export function generateSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: 'vi',
    trim: true,
  });
}

/**
 * Validate that a slug contains only lowercase letters, numbers, and hyphens.
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
