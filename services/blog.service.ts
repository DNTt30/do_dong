/**
 * Blog Service — all blog post-related Supabase operations.
 */

import { supabase } from '@/lib/supabase';
import type { Blog, BlogFormData } from '@/types/blog.types';
import type { PaginatedResult } from '@/types/common.types';

const TABLE = 'blogs';

/**
 * Fetch a paginated list of published blog posts.
 */
export async function getBlogs(
  page = 1,
  pageSize = 9,
  publishedOnly = true
): Promise<PaginatedResult<Blog>> {
  let query = supabase.from(TABLE).select('*', { count: 'exact' });

  if (publishedOnly) {
    query = query.eq('published', true);
  }

  query = query.order('createdAt', { ascending: false });

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    items: data as Blog[],
    total: count ?? 0,
    page,
    hasNextPage: count ? from + pageSize < count : false,
  };
}

/**
 * Fetch the latest published blog posts for homepage.
 */
export async function getLatestBlogs(count = 3): Promise<Blog[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('published', true)
    .order('createdAt', { ascending: false })
    .limit(count);

  if (error) throw error;
  return data as Blog[];
}

/**
 * Fetch a single blog post by ID.
 */
export async function getBlogById(id: string): Promise<Blog | null> {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as Blog;
}

/**
 * Fetch a single blog post by its URL slug.
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as Blog;
}

/**
 * Search blog posts by title using Supabase text search.
 */
export async function searchBlogs(queryStr: string, count = 5): Promise<Blog[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('published', true)
    .ilike('title', `%${queryStr}%`)
    .limit(count);

  if (error) throw error;
  return data as Blog[];
}

/**
 * Create a new blog post document.
 */
export async function createBlog(
  data: BlogFormData & { thumbnail?: string; thumbnailPath?: string }
): Promise<string> {
  const { data: inserted, error } = await supabase.from(TABLE).insert([data]).select('id').single();
  if (error) throw error;
  return inserted.id;
}

/**
 * Update an existing blog post document.
 */
export async function updateBlog(
  id: string,
  data: Partial<BlogFormData & { thumbnail?: string; thumbnailPath?: string }>
): Promise<void> {
  const { error } = await supabase.from(TABLE).update(data).eq('id', id);
  if (error) throw error;
}

/**
 * Delete a blog post document by ID.
 */
export async function deleteBlog(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}

