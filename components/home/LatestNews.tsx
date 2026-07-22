/**
 * LatestNews — Latest blog articles section for SEO.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { useLatestBlogs } from '@/hooks/useBlogs';
import { ROUTES } from '@/constants/routes';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const FALLBACK_ARTICLES = [
  {
    id: '1',
    slug: 'y-nghia-bo-tam-su-tren-ban-tho',
    title: 'Ý nghĩa của bộ Tam Sự trên bàn thờ gia tiên',
    excerpt: 'Bộ Tam Sự gồm 3 vật phẩm đồng thiêng liêng: đỉnh, đèn và bình hoa — mỗi thứ đều mang ý nghĩa phong thủy sâu sắc.',
    thumbnail: null as string | null,
    category: 'Kiến thức',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    slug: 'cach-bao-quan-do-dong',
    title: 'Cách bảo quản đồ đồng luôn sáng bóng và bền đẹp',
    excerpt: 'Hướng dẫn chi tiết cách vệ sinh, đánh bóng và bảo quản đồ đồng để giữ màu sắc tự nhiên và độ bền hàng chục năm.',
    thumbnail: null as string | null,
    category: 'Bảo quản',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    slug: 'phong-thuy-dinh-dong',
    title: 'Đỉnh đồng và phong thủy: Đặt đúng vị trí mang lại may mắn',
    excerpt: 'Phân tích chi tiết vị trí đặt đỉnh đồng theo phong thủy học, hướng tốt và những điều cần tránh khi bài trí đồ thờ.',
    thumbnail: null as string | null,
    category: 'Phong thủy',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

type ArticleItem = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  thumbnail?: string | null;
  createdAt: string;
};

export default function LatestNews() {
  const { blogs, isLoading } = useLatestBlogs(3);

  const displayArticles: ArticleItem[] =
    blogs.length > 0 ? blogs : FALLBACK_ARTICLES;

  return (
    <section className="py-20 md:py-32 bg-[#FDFBF7]">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#B8860B] uppercase tracking-[0.3em] text-xs font-semibold mb-4"
            >
              Kiến thức & chia sẻ
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif text-black tracking-tight"
            >
              Bài Viết Mới Nhất
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href={ROUTES.BLOG}
              className="inline-flex items-center gap-2 text-sm font-semibold text-black border border-black/20 px-6 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300"
            >
              Xem tất cả bài viết
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Articles grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="aspect-[16/10] bg-gray-100 animate-pulse rounded-2xl" />
                <div className="pt-5 space-y-3">
                  <div className="h-4 bg-gray-100 animate-pulse rounded w-1/4" />
                  <div className="h-5 bg-gray-100 animate-pulse rounded" />
                  <div className="h-4 bg-gray-100 animate-pulse rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayArticles.map((article, index) => {
              const articleDate = article.createdAt
                ? format(new Date(article.createdAt), 'dd MMM yyyy', { locale: vi })
                : '';

              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className="group"
                >
                  <Link href={ROUTES.BLOG_DETAIL(article.slug)}>
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl mb-5">
                      {article.thumbnail ? (
                        <Image
                          src={article.thumbnail}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen size={40} className="text-amber-300" />
                        </div>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-3">
                      {articleDate && (
                        <span className="flex items-center gap-1 text-gray-400 text-xs">
                          <Calendar size={11} />
                          {articleDate}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-black text-lg leading-snug mb-3 line-clamp-2 group-hover:text-[#B8860B] transition-colors duration-300">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    {article.excerpt && (
                      <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                    )}

                    {/* Read more */}
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B8860B] group-hover:gap-3 transition-all duration-200">
                      Đọc thêm
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
