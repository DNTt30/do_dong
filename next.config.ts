import type { NextConfig } from 'next';

/**
 * Next.js Production Configuration
 * Includes: image domains, security headers, performance optimizations.
 */

const nextConfig: NextConfig = {
  // ── Images ──────────────────────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Prefer WebP/AVIF for better compression
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 60 days
    minimumCacheTTL: 60 * 24 * 60 * 60,
    qualities: [25, 50, 75, 90, 100],
  },

  // ── Performance ──────────────────────────────────────────────────────────────
  experimental: {
    optimizePackageImports: ['lucide-react', '@supabase/ssr'],
  },

  // ── Trailing slash ───────────────────────────────────────────────────────────
  trailingSlash: false,

  // ── Powered-by header (remove for security) ──────────────────────────────────
  poweredByHeader: false,

  // ── Security & caching headers ────────────────────────────────────────────────
  // NOTE: Core security headers (CSP, HSTS, X-Frame-Options, etc.) are applied
  // in middleware.ts so they cover ALL routes including API routes.
  // The headers below are supplementary for static assets.
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache optimized images
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // Admin routes — no caching
        source: '/admin/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Legacy URL aliases
      {
        source: '/san-pham/danh-muc',
        destination: '/san-pham',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
