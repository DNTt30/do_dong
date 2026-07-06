/**
 * useBlogs hook — fetches blog posts with pagination.
 */

'use client';

import { useState, useEffect } from 'react';
import { getBlogs, getLatestBlogs } from '@/services/blog.service';
import type { Blog } from '@/types/blog.types';

interface UseBlogsReturn {
  blogs: Blog[];
  isLoading: boolean;
  error: string | null;
  hasNextPage: boolean;
  loadMore: () => Promise<void>;
}

export function useBlogs(pageSize = 9): UseBlogsReturn {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);

  const fetchBlogs = async (currentPage: number, reset = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getBlogs(currentPage, pageSize);
      setBlogs((prev) => (reset ? result.items : [...prev, ...result.items]));
      setHasNextPage(result.hasNextPage);
      setPage(result.page);
    } catch (err) {
      setError('Không thể tải bài viết');
      console.error('useBlogs error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = async () => {
    if (!hasNextPage || isLoading) return;
    await fetchBlogs(page + 1, false);
  };

  return { blogs, isLoading, error, hasNextPage, loadMore };
}

/** Hook for latest blogs (homepage use). */
export function useLatestBlogs(count = 3) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLatestBlogs(count)
      .then(setBlogs)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [count]);

  return { blogs, isLoading };
}
