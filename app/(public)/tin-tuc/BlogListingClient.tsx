/**
 * BlogListingClient — paginated blog post grid.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBlogs } from '@/hooks/useBlogs';
import Breadcrumb from '@/components/common/Breadcrumb';
import SectionTitle from '@/components/common/SectionTitle';
import { BlogCardSkeleton } from '@/components/common/LoadingSkeleton';
import { ROUTES } from '@/constants/routes';
import { formatDate, generateExcerpt } from '@/utils/format';

export default function BlogListingClient() {
  const { blogs, isLoading, hasNextPage, loadMore } = useBlogs(9);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await loadMore();
    setIsLoadingMore(false);
  };

  return (
    <div>
      <div className="bg-muted/30 border-b border-border">
        <div className="container py-6">
          <Breadcrumb items={[{ label: 'Tin tức' }]} />
          <SectionTitle title="Tin Tức & Bài Viết" align="left" className="mt-2" />
        </div>
      </div>

      <div className="container py-10">
        {isLoading && blogs.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => <BlogCardSkeleton key={i} />)}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>Chưa có bài viết nào.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                >
                  <Link href={ROUTES.BLOG_DETAIL(blog.slug)} className="group block card-premium overflow-hidden">
                    <div className="relative h-52 overflow-hidden bg-muted">
                      {blog.thumbnail ? (
                        <Image
                          src={blog.thumbnail}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-bronze opacity-20 flex items-center justify-center text-4xl">📰</div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Calendar size={12} />{formatDate(blog.createdAt)}</span>
                        <span className="flex items-center gap-1"><User size={12} />{blog.author}</span>
                      </div>
                      <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
                        {blog.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-3">
                        {blog.excerpt ?? generateExcerpt(blog.content, 150)}
                      </p>
                      <span className="flex items-center gap-1 text-sm font-medium text-primary">
                        Đọc tiếp <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {hasNextPage && (
              <div className="text-center mt-10">
                <button onClick={handleLoadMore} disabled={isLoadingMore} className="btn-outline">
                  {isLoadingMore ? <><Loader2 size={18} className="animate-spin" />Đang tải...</> : 'Xem thêm bài viết'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
