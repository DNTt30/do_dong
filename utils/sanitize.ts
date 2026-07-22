/**
 * DOMPurify sanitizer utility.
 * Server-safe via isomorphic-dompurify.
 * Use this for any HTML content stored in DB before rendering.
 */

import DOMPurify from 'isomorphic-dompurify';

// ── Allowed tags & attributes ─────────────────────────────────────────────────

const RICH_TEXT_ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'b', 'i', 'u', 's',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'a', 'img',
  'div', 'span',
  'hr',
];

const RICH_TEXT_ALLOWED_ATTR = [
  'href', 'target', 'rel',
  'src', 'alt', 'width', 'height',
  'class', 'id',
  'colspan', 'rowspan',
];

const FORBID_TAGS = ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button'];

const FORBID_ATTR = [
  'onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur',
  'style',
];

// ── Sanitizers ────────────────────────────────────────────────────────────────

/**
 * Sanitize rich HTML content (blog posts, product descriptions).
 * Strips dangerous tags while preserving formatting.
 */
export function sanitizeRichText(dirty: string): string {
  if (!dirty) return '';
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: RICH_TEXT_ALLOWED_TAGS,
    ALLOWED_ATTR: RICH_TEXT_ALLOWED_ATTR,
    FORBID_TAGS,
    FORBID_ATTR,
    ALLOW_DATA_ATTR: false,
    FORCE_BODY: true,
  }) as string;
}

/**
 * Sanitize plain text — strips ALL HTML.
 * Use for names, titles, addresses, etc.
 */
export function sanitizePlainText(dirty: string): string {
  if (!dirty) return '';
  return (DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }) as string).trim();
}

/**
 * Check if a string contains potentially dangerous content.
 */
export function containsXSS(value: string): boolean {
  const patterns = [
    /<script/i,
    /<\/script>/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /data:text\/html/i,
    /vbscript:/i,
    /expression\s*\(/i,
  ];
  return patterns.some((p) => p.test(value));
}
