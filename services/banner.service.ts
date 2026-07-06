/**
 * Banner Service — hero banner and promotional banner operations.
 */

import { supabase } from '@/lib/supabase';
import type { Banner, BannerFormData, BannerPosition } from '@/types/banner.types';

const TABLE = 'banners';

/**
 * Fetch all active banners for a specific position, ordered by display order.
 */
export async function getBanners(position?: BannerPosition): Promise<Banner[]> {
  let query = supabase.from(TABLE).select('*').eq('active', true).order('order', { ascending: true });

  if (position) {
    query = query.eq('position', position);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Banner[];
}

/**
 * Fetch all banners (for admin panel, including inactive).
 */
export async function getAllBanners(): Promise<Banner[]> {
  const { data, error } = await supabase.from(TABLE).select('*').order('order', { ascending: true });
  if (error) throw error;
  return data as Banner[];
}

/**
 * Fetch a single banner by ID.
 */
export async function getBannerById(id: string): Promise<Banner | null> {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as Banner;
}

/**
 * Create a new banner document.
 */
export async function createBanner(
  data: BannerFormData & { image: string; imagePath?: string }
): Promise<string> {
  const { data: inserted, error } = await supabase.from(TABLE).insert([data]).select('id').single();
  if (error) throw error;
  return inserted.id;
}

/**
 * Update an existing banner document.
 */
export async function updateBanner(
  id: string,
  data: Partial<BannerFormData & { image?: string; imagePath?: string }>
): Promise<void> {
  const { error } = await supabase.from(TABLE).update(data).eq('id', id);
  if (error) throw error;
}

/**
 * Delete a banner document by ID.
 */
export async function deleteBanner(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
}

