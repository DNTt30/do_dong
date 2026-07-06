/**
 * Admin Dashboard — overview stats and quick links.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Tag, FileText, Image, ArrowRight, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ROUTES } from '@/constants/routes';

interface Stats {
  products: number;
  categories: number;
  blogs: number;
  banners: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({ products: 0, categories: 0, blogs: 0, banners: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: productsCount },
          { count: categoriesCount },
          { count: blogsCount },
          { count: bannersCount }
        ] = await Promise.all([
          supabase.from('products').select('*', { count: 'exact', head: true }),
          supabase.from('categories').select('*', { count: 'exact', head: true }),
          supabase.from('blogs').select('*', { count: 'exact', head: true }),
          supabase.from('banners').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          products: productsCount ?? 0,
          categories: categoriesCount ?? 0,
          blogs: blogsCount ?? 0,
          banners: bannersCount ?? 0,
        });
      } catch (err) {
        console.error('Dashboard stats error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  const STAT_CARDS = [
    { label: 'Sản phẩm', value: stats.products, icon: Package, href: ROUTES.ADMIN.PRODUCTS, color: 'bg-amber-50 text-amber-600' },
    { label: 'Danh mục', value: stats.categories, icon: Tag, href: ROUTES.ADMIN.CATEGORIES, color: 'bg-blue-50 text-blue-600' },
    { label: 'Bài viết', value: stats.blogs, icon: FileText, href: ROUTES.ADMIN.BLOGS, color: 'bg-green-50 text-green-600' },
    { label: 'Banner', value: stats.banners, icon: Image, href: ROUTES.ADMIN.BANNERS, color: 'bg-purple-50 text-purple-600' },
  ];

  const QUICK_LINKS = [
    { label: 'Thêm sản phẩm mới', href: ROUTES.ADMIN.PRODUCT_NEW, icon: Package },
    { label: 'Thêm bài viết mới', href: ROUTES.ADMIN.BLOG_NEW, icon: FileText },
    { label: 'Quản lý banner', href: ROUTES.ADMIN.BANNERS, icon: Image },
    { label: 'Cài đặt website', href: ROUTES.ADMIN.SETTINGS, icon: TrendingUp },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Tổng quan hệ thống quản trị</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-xl border border-border p-5 hover:shadow-card transition-shadow group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                  <Icon size={20} />
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {isLoading ? '—' : card.value}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">{card.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="font-semibold text-foreground mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted transition-colors"
              >
                <Icon size={18} className="text-primary" />
                <span className="text-sm font-medium text-foreground">{link.label}</span>
                <ArrowRight size={14} className="ml-auto text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
