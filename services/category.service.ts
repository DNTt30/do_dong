/**
 * Category Service — all category-related Supabase operations.
 */

import { supabase } from '@/lib/supabase';
import type { Category, CategoryFormData } from '@/types/category.types';

const TABLE = 'categories';

/**
 * Fetch all categories, ordered by name.
 */
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from(TABLE).select('*').order('name', { ascending: true });
  if (error) throw error;
  return data as Category[];
}

/**
 * Fetch a single category by ID.
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as Category;
}

/**
 * Fetch a single category by its URL slug.
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase.from(TABLE).select('*').eq('slug', slug).single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as Category;
}

/**
 * Create a new category document.
 * Returns the new document ID.
 */
export async function createCategory(
  data: CategoryFormData & { image?: string; imagePath?: string }
): Promise<string> {
  const { data: inserted, error } = await supabase.from(TABLE).insert([data]).select('id').single();
  if (error) throw error;
  return inserted.id;
}

/**
 * Update an existing category document.
 */
export async function updateCategory(
  id: string,
  data: Partial<CategoryFormData & { image?: string; imagePath?: string }>
): Promise<void> {
  const { error } = await supabase.from(TABLE).update(data).eq('id', id);
  if (error) throw error;
}

/**
 * Delete a category document by ID.
 */
export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}

