/**
 * useSearch hook — realtime search across products and blogs.
 * Uses debouncing to limit Firestore reads.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { searchProducts } from '@/services/product.service';
import { searchBlogs } from '@/services/blog.service';
import type { Product } from '@/types/product.types';
import type { Blog } from '@/types/blog.types';

interface SearchResults {
  products: Product[];
  blogs: Blog[];
}

interface UseSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResults;
  isLoading: boolean;
  hasResults: boolean;
  clearSearch: () => void;
}

const DEBOUNCE_MS = 400;
const MIN_QUERY_LENGTH = 2;

export function useSearch(): UseSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({ products: [], blogs: [] });
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = useCallback(async (q: string) => {
    if (q.length < MIN_QUERY_LENGTH) {
      setResults({ products: [], blogs: [] });
      return;
    }

    setIsLoading(true);
    try {
      const [products, blogs] = await Promise.all([
        searchProducts(q, 8),
        searchBlogs(q, 4),
      ]);
      setResults({ products, blogs });
    } catch (err) {
      console.error('useSearch error:', err);
      setResults({ products: [], blogs: [] });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const clearSearch = () => {
    setQuery('');
    setResults({ products: [], blogs: [] });
  };

  const hasResults =
    results.products.length > 0 || results.blogs.length > 0;

  return {
    query,
    setQuery,
    results,
    isLoading,
    hasResults,
    clearSearch,
  };
}
