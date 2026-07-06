/**
 * SearchBar — full-screen search overlay with realtime results.
 */

'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, Loader2, FileText, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '@/hooks/useSearch';
import { ROUTES } from '@/constants/routes';
import { formatPrice } from '@/utils/format';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, setQuery, results, isLoading, hasResults, clearSearch } = useSearch();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      clearSearch();
      document.body.style.overflow = '';
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleResultClick = () => {
    onClose();
    clearSearch();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b border-border">
              {isLoading ? (
                <Loader2 size={20} className="text-primary animate-spin shrink-0" />
              ) : (
                <Search size={20} className="text-muted-foreground shrink-0" />
              )}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm, bài viết..."
                className="flex-1 text-foreground placeholder:text-muted-foreground bg-transparent outline-none text-base"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {query.length >= 2 && !isLoading && !hasResults && (
                <div className="p-8 text-center text-muted-foreground">
                  <Search size={40} className="mx-auto mb-3 opacity-30" />
                  <p>Không tìm thấy kết quả cho &quot;{query}&quot;</p>
                </div>
              )}

              {/* Product results */}
              {results.products.length > 0 && (
                <div className="p-3">
                  <div className="flex items-center gap-2 px-2 py-1 mb-2">
                    <Package size={14} className="text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Sản phẩm
                    </span>
                  </div>
                  {results.products.map((product) => (
                    <Link
                      key={product.id}
                      href={ROUTES.PRODUCT_DETAIL(product.slug)}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      {product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-primary font-semibold">
                          {formatPrice(product.salePrice ?? product.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Blog results */}
              {results.blogs.length > 0 && (
                <div className="p-3 border-t border-border/50">
                  <div className="flex items-center gap-2 px-2 py-1 mb-2">
                    <FileText size={14} className="text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Bài viết
                    </span>
                  </div>
                  {results.blogs.map((blog) => (
                    <Link
                      key={blog.id}
                      href={ROUTES.BLOG_DETAIL(blog.slug)}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {blog.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{blog.author}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {!query && (
                <div className="p-6 text-center text-muted-foreground text-sm">
                  Nhập từ khóa để tìm kiếm sản phẩm hoặc bài viết...
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
