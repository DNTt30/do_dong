-- ═══════════════════════════════════════════════════════════════════════════
-- Supabase Storage Policies — public-images bucket
-- Đồ Đồng Thủ Công Nam Định
--
-- QUAN TRỌNG: Chạy rls-policies.sql TRƯỚC để tạo public.is_admin() function.
--
-- Cách apply:
--   1. Supabase Dashboard → SQL Editor
--   2. Paste file này → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Đảm bảo bucket tồn tại ───────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'public-images',
  'public-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public            = EXCLUDED.public,
  file_size_limit   = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ── Storage RLS Policies ─────────────────────────────────────────────────────

-- Ai cũng có thể xem ảnh (bucket đã public)
DROP POLICY IF EXISTS "public_images_read" ON storage.objects;
CREATE POLICY "public_images_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'public-images');

-- Chỉ admin mới upload được
DROP POLICY IF EXISTS "public_images_admin_insert" ON storage.objects;
CREATE POLICY "public_images_admin_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'public-images'
    AND public.is_admin()
    AND (lower(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp', 'gif'))
  );

-- Chỉ admin mới update/replace được
DROP POLICY IF EXISTS "public_images_admin_update" ON storage.objects;
CREATE POLICY "public_images_admin_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING  (bucket_id = 'public-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'public-images' AND public.is_admin());

-- Chỉ admin mới xóa được
DROP POLICY IF EXISTS "public_images_admin_delete" ON storage.objects;
CREATE POLICY "public_images_admin_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'public-images' AND public.is_admin());
