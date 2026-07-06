/**
 * Supabase Storage helpers.
 * Handles image upload, delete, and URL retrieval.
 */

import { supabase } from '@/lib/supabase';

const BUCKET_NAME = 'public-images'; // We assume a default bucket name "public-images"

export interface UploadProgressCallback {
  (progress: number): void;
}

export interface UploadResult {
  url: string;
  path: string;
}

/**
 * Upload a file to Supabase Storage.
 * Supabase js client doesn't support built-in progress events yet in v2 via standard upload.
 */
export async function uploadImage(
  file: File,
  path: string,
  onProgress?: UploadProgressCallback
): Promise<UploadResult> {
  // Mock progress as supabase-js doesn't natively support it yet
  if (onProgress) onProgress(10);
  
  const { error } = await supabase.storage.from(BUCKET_NAME).upload(path, file, {
    cacheControl: '3600',
    upsert: false
  });

  if (error) throw error;
  
  if (onProgress) onProgress(100);

  const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);

  return { url: publicUrl, path };
}

/**
 * Delete a file from Supabase Storage by its full path.
 */
export async function deleteImage(path: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);
  if (error) throw error;
}

/**
 * Get the download URL for a given storage path.
 */
export async function getDownloadURL(path: string): Promise<string> {
  const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
  return publicUrl;
}

/**
 * Generate a unique storage path for an uploaded file.
 * Format: {folder}/{timestamp}-{randomId}.{extension}
 */
export function generateStoragePath(folder: string, file: File): string {
  const extension = file.name.split('.').pop() ?? 'jpg';
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  return `${folder}/${timestamp}-${randomId}.${extension}`;
}

