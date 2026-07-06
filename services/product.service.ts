/**
 * Product Service — all product-related Supabase operations.
 * Components and hooks must never call Supabase directly; always use this service.
 */

import { supabase } from '@/lib/supabase';
import type { Product, ProductFormData, ProductFilter } from '@/types/product.types';
import type { PaginatedResult } from '@/types/common.types';

const TABLE = 'products';

/**
 * Fetch a paginated list of products with optional filters.
 */
export async function getProducts(
  filter: ProductFilter = {},
  page = 1,
  pageSize = 12
): Promise<PaginatedResult<Product>> {
  let query = supabase.from(TABLE).select('*', { count: 'exact' });

  if (filter.published !== undefined) {
    query = query.eq('published', filter.published);
  }
  if (filter.categoryId) {
    query = query.eq('categoryId', filter.categoryId);
  }
  if (filter.featured !== undefined) {
    query = query.eq('featured', filter.featured);
  }

  const sortField = filter.sortBy ?? 'createdAt';
  const sortDir = filter.sortDirection ?? 'desc';
  query = query.order(sortField, { ascending: sortDir === 'asc' });

  // Pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    items: data as Product[],
    total: count ?? 0,
    page,
    hasNextPage: count ? from + pageSize < count : false,
  };
}

/**
 * Fetch a single product by its ID.
 */
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) {
    if (error.code === 'PGRST116') return null; // not found
    throw error;
  }
  return data as Product;
}

/**
 * Fetch a single product by its URL slug.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // not found
    throw error;
  }
  return data as Product;
}

/**
 * Fetch featured products for the homepage.
 */
export async function getFeaturedProducts(count = 8): Promise<Product[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('featured', true)
    .eq('published', true)
    .order('createdAt', { ascending: false })
    .limit(count);

  if (error) throw error;
  return data as Product[];
}

/**
 * Fetch the newest published products.
 */
export async function getNewProducts(count = 8): Promise<Product[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('published', true)
    .order('createdAt', { ascending: false })
    .limit(count);

  if (error) throw error;
  return data as Product[];
}

/**
 * Fetch related products in the same category, excluding the current product.
 */
export async function getRelatedProducts(
  categoryId: string,
  excludeId: string,
  count = 6
): Promise<Product[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('categoryId', categoryId)
    .eq('published', true)
    .neq('id', excludeId)
    .order('createdAt', { ascending: false })
    .limit(count);

  if (error) throw error;
  return data as Product[];
}

/**
 * Search products by name using Supabase text search.
 */
export async function searchProducts(queryStr: string, count = 10): Promise<Product[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('published', true)
    .ilike('name', `%${queryStr}%`)
    .limit(count);

  if (error) throw error;
  return data as Product[];
}

/**
 * Create a new product.
 */
export async function createProduct(
  data: ProductFormData & { images: string[]; imagePaths?: string[] }
): Promise<string> {
  const { data: inserted, error } = await supabase.from(TABLE).insert([data]).select('id').single();
  if (error) throw error;
  return inserted.id;
}

/**
 * Update an existing product.
 */
export async function updateProduct(
  id: string,
  data: Partial<ProductFormData & { images: string[]; imagePaths?: string[] }>
): Promise<void> {
  const { error } = await supabase.from(TABLE).update(data).eq('id', id);
  if (error) throw error;
}

/**
 * Delete a product by ID.
 */
export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}

