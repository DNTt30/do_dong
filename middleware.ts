import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;
  
  const isAdminRoute = pathname.startsWith('/admin');
  const protectedRoutes = ['/dat-hang', '/lien-he'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Only check Supabase Auth if accessing admin routes or client protected routes
  if (isAdminRoute || isProtectedRoute) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const isAdmin =
      user?.app_metadata?.role === 'admin' ||
      user?.email === 'admin@dodongnamdinh.vn' ||
      user?.email === 'admin123@gmail.com' ||
      user?.email === 'admin123@.com';

    // Protect /admin routes (except /admin/login)
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
      if (!user) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
      }
      if (!isAdmin) {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    }

    // Protect customer routes: /dat-hang, /lien-he
    if (isProtectedRoute && !user) {
      const url = request.nextUrl.clone();
      url.pathname = '/dang-nhap';
      return NextResponse.redirect(url);
    }

    // Redirect to dashboard if logged in and trying to access /admin/login
    if (pathname.startsWith('/admin/login') && user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
