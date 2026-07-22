/**
 * Next.js Middleware — Authentication, Authorization & Security Headers.
 *
 * Security model:
 * - /admin/* (except /admin/login) → requires Supabase session + app_metadata.role === 'admin'
 * - /admin/login → redirects to dashboard if already authenticated as admin
 * - All responses → security headers injected
 */

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// ── Routes configuration ─────────────────────────────────────────────────────

const ADMIN_ROUTE = '/admin';
const ADMIN_LOGIN = '/admin/login';

/** Routes that require a logged-in customer session */
const CUSTOMER_PROTECTED = ['/dat-hang'];

// ── Security headers ─────────────────────────────────────────────────────────

function applySecurityHeaders(response: NextResponse): NextResponse {
  // Strict Transport Security (HTTPS only, 1 year)
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');

  // Prevent MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Referrer policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions policy — disable unused features
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self), payment=(), usb=()'
  );

  // Content Security Policy
  // Note: 'unsafe-inline' for styles needed by Tailwind/Next.js inline styles.
  // Tighten after moving to CSS-in-JS or hashed nonces.
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net https://www.google.com https://maps.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://*.supabase.co https://lh3.googleusercontent.com https://images.unsplash.com https://www.facebook.com https://www.google.com https://maps.gstatic.com https://maps.googleapis.com",
      "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://www.facebook.com",
      "frame-src 'self' https://www.google.com https://www.facebook.com https://www.youtube.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; ')
  );

  // Remove potentially revealing headers
  response.headers.delete('X-Powered-By');
  response.headers.delete('Server');

  return response;
}

// ── Main middleware ───────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip for static assets (belt-and-suspenders alongside config.matcher)
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/_next/') ||
    /\.(svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf)$/.test(pathname)
  ) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const isAdminRoute = pathname.startsWith(ADMIN_ROUTE);
  const isCustomerProtected = CUSTOMER_PROTECTED.some((r) => pathname.startsWith(r));

  if (!isAdminRoute && !isCustomerProtected) {
    // No auth needed — just inject security headers
    return applySecurityHeaders(supabaseResponse);
  }

  // ── Build Supabase server client (cookie-based) ──────────────────────────

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: always use getUser() (not getSession()) — getUser() validates
  // the token against Supabase Auth server, not just the local cookie.
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  const isAuthenticated = !userError && !!user;
  const isAdmin = isAuthenticated && user?.app_metadata?.role === 'admin';

  // ── Admin route protection ────────────────────────────────────────────────

  if (isAdminRoute) {
    if (pathname.startsWith(ADMIN_LOGIN)) {
      // Already admin → go to dashboard
      if (isAdmin) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin/dashboard';
        const redirect = NextResponse.redirect(url);
        return applySecurityHeaders(redirect);
      }
      // Allow access to login page
      return applySecurityHeaders(supabaseResponse);
    }

    // Any other /admin/* route:
    if (!isAuthenticated) {
      // Not logged in → redirect to login
      const url = request.nextUrl.clone();
      url.pathname = ADMIN_LOGIN;
      url.searchParams.set('next', pathname);
      const redirect = NextResponse.redirect(url);
      return applySecurityHeaders(redirect);
    }

    if (!isAdmin) {
      // Logged in but NOT admin → redirect to homepage with message
      const url = request.nextUrl.clone();
      url.pathname = '/';
      url.searchParams.set('error', 'unauthorized');
      const redirect = NextResponse.redirect(url);
      return applySecurityHeaders(redirect);
    }
  }

  // ── Customer protected routes ─────────────────────────────────────────────

  if (isCustomerProtected && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/dang-nhap';
    url.searchParams.set('next', pathname);
    const redirect = NextResponse.redirect(url);
    return applySecurityHeaders(redirect);
  }

  return applySecurityHeaders(supabaseResponse);
}

// ── Matcher ───────────────────────────────────────────────────────────────────

export const config = {
  matcher: [
    /*
     * Run middleware on all paths EXCEPT:
     * - _next/static (Next.js static assets)
     * - _next/image  (Next.js image optimization)
     * - favicon.ico
     * - public images/fonts
     */
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)',
  ],
};
