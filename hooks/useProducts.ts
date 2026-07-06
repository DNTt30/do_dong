/**
 * useProducts hook — fetches products with filtering and pagination.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getProducts,
  getFeaturedProducts,
  getNewProducts,
  getRelatedProducts,
} from '@/services/product.service';
import type { Product, ProductFilter } from '@/types/product.types';

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  hasNextPage: boolean;
  loadMore: () => Promise<void>;
  refetch: () => Promise<void>;
}

/**
 * Hook for paginated product listing with filters.
 */
export function useProducts(
  filter: ProductFilter = { published: true },
  pageSize = 12
): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);

  const fetchProducts = useCallback(async (currentPage: number, reset = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getProducts(filter, currentPage, pageSize);
      setProducts((prev) => (reset ? result.items : [...prev, ...result.items]));
      setHasNextPage(result.hasNextPage);
      setPage(result.page);
    } catch (err) {
      setError('Không thể tải danh sách sản phẩm');
      console.error('useProducts error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filter, pageSize]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchProducts(1, true);
  }, [filter.categoryId, filter.featured, filter.sortBy]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = async () => {
    if (!hasNextPage || isLoading) return;
    await fetchProducts(page + 1, false);
  };

  return {
    products,
    isLoading,
    error,
    hasNextPage,
    loadMore,
    refetch: () => fetchProducts(1, true),
  };
}

/** Hook for featured products (homepage use). */
export function useFeaturedProducts(count = 8) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts(count)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [count]);

  return { products, isLoading };
}

/** Hook for new products (homepage use). */
export function useNewProducts(count = 8) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNewProducts(count)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [count]);

  return { products, isLoading };
}

/** Hook for related products (product detail page). */
export function useRelatedProducts(categoryId: string, excludeId: string, count = 6) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!categoryId || !excludeId) return;
    getRelatedProducts(categoryId, excludeId, count)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [categoryId, excludeId, count]);

  return { products, isLoading };
}
