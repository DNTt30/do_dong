/**
 * useCategories hook — fetches all categories.
 */

'use client';

import { useState, useEffect } from 'react';
import { getCategories } from '@/services/category.service';
import type { Category } from '@/types/category.types';

interface UseCategoriesReturn {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) => {
        setError('Không thể tải danh mục');
        console.error('useCategories error:', err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { categories, isLoading, error };
}
