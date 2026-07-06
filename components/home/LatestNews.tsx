/**
 * LatestNews — grid of 3 latest blog posts for homepage.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLatestBlogs } from '@/hooks/useBlogs';
import SectionTitle from '@/components/common/SectionTitle';
import { BlogCardSkeleton } from '@/components/common/LoadingSkeleton';
import { ROUTES } from '@/constants/routes';
import { formatDate, generateExcerpt } from '@/utils/format';

export default function LatestNews() {
  const { blogs, isLoading } = useLatestBlogs(3);

  if (!isLoading && blogs.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <SectionTitle
            label="Tin tức"
            title="Tin Tức Mới Nhất"
            subtitle="Cập nhật thông tin về sản phẩm, làng nghề và văn hóa đồ đồng truyền thống."
            align="left"
          />
          <Link
            href={ROUTES.BLOG}
            className="shrink-0 flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-600 transition-colors"
          >
            Xem tất cả
            <ArrowRight size={16} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <BlogCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={ROUTES.BLOG_DETAIL(blog.slug)}
                  className="group block card-premium overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-muted">
                    {blog.thumbnail ? (
                      <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-bronze opacity-20 flex items-center justify-center text-3xl">
                        📰
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(blog.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {blog.author}
                      </span>
                    </div>

                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
                      {blog.title}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                      {blog.excerpt ?? generateExcerpt(blog.content, 120)}
                    </p>

                    <span className="flex items-center gap-1 text-xs font-medium text-primary">
                      Đọc tiếp
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
