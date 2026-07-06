/**
 * AdminLayout — sidebar + topbar wrapper for admin pages.
 * Handles route protection: redirects to login if not authenticated.
 */

'use client';

import React, { type ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Tag,
  FileText,
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Dashboard', href: ROUTES.ADMIN.DASHBOARD, icon: LayoutDashboard },
  { label: 'Sản phẩm', href: ROUTES.ADMIN.PRODUCTS, icon: Package },
  { label: 'Danh mục', href: ROUTES.ADMIN.CATEGORIES, icon: Tag },
  { label: 'Bài viết', href: ROUTES.ADMIN.BLOGS, icon: FileText },
  { label: 'Banner', href: ROUTES.ADMIN.BANNERS, icon: ImageIcon },
  { label: 'Cài đặt', href: ROUTES.ADMIN.SETTINGS, icon: Settings },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, isLoading, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Redirect logic
  useEffect(() => {
    if (isLoading) return;
    if (!user && pathname !== ROUTES.ADMIN.LOGIN) {
      router.push(ROUTES.ADMIN.LOGIN);
    }
    if (user && !isAdmin && pathname !== ROUTES.ADMIN.LOGIN) {
      router.push(ROUTES.HOME);
    }
  }, [user, isAdmin, isLoading, pathname, router]);

  // Allow login page without layout
  if (pathname === ROUTES.ADMIN.LOGIN) return <>{children}</>;

  if (isLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.ADMIN.LOGIN);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-border flex flex-col',
          'transform transition-transform duration-300 ease-in-out',
          'lg:relative lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <Link href={ROUTES.ADMIN.DASHBOARD} className="flex flex-col">
            <span className="font-serif text-base font-bold text-primary">Đồ Đồng</span>
            <span className="text-[10px] text-secondary font-medium tracking-widest uppercase">
              Admin Panel
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-muted"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-bronze text-white text-xs font-bold flex items-center justify-center">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">{user.email}</p>
              <p className="text-[10px] text-muted-foreground">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-muted"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <Link
              href={ROUTES.HOME}
              target="_blank"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Xem website →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
