/**
 * Settings Service — site-wide configuration stored in Supabase.
 * The settings document always has a fixed ID: 'main'.
 */

import { supabase } from '@/lib/supabase';
import type { SiteSettings, SettingsUpdateData } from '@/types/settings.types';

const TABLE = 'settings';
const DOCUMENT_ID = 'main';

/**
 * Fetch site settings from Supabase.
 * Returns null if no settings document exists yet.
 */
export async function getSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase.from(TABLE).select('value').eq('id', DOCUMENT_ID).single();
  if (error) {
    if (error.code === 'PGRST116' || error.code === '42P01') return null;
    console.error('getSettings error:', error);
    throw error;
  }
  return data.value as SiteSettings;
}

/**
 * Save site settings (creates or overwrites the 'main' document).
 */
export async function updateSettings(data: SettingsUpdateData): Promise<void> {
  const { error } = await supabase.from(TABLE).upsert({ id: DOCUMENT_ID, value: data, updatedAt: new Date().toISOString() });
  if (error) throw error;
}

/**
 * Initialize settings with default values on first run.
 */
export async function initializeSettings(defaults: SiteSettings): Promise<void> {
  const existing = await getSettings();
  if (!existing) {
    await updateSettings(defaults);
  }
}
