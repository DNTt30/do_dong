-- ═══════════════════════════════════════════════════════════════════════════
-- STEP 4 — Storage Policies cho bucket public-images
-- Chạy CUỐI CÙNG, sau khi step 3 thành công.
-- ═══════════════════════════════════════════════════════════════════════════

-- Đảm bảo bucket tồn tại và đúng cấu hình
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'public-images',
  'public-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public             = EXCLUDED.public,
  file_size_limit    = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Xóa policies cũ nếu có
DROP POLICY IF EXISTS "public_images_read"         ON storage.objects;
DROP POLICY IF EXISTS "public_images_admin_insert" ON storage.objects;
DROP POLICY IF EXISTS "public_images_admin_update" ON storage.objects;
DROP POLICY IF EXISTS "public_images_admin_delete" ON storage.objects;

-- Ai cũng đọc được (bucket public)
CREATE POLICY "public_images_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'public-images');

-- Chỉ admin upload
CREATE POLICY "public_images_admin_insert"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'public-images'
    AND public.is_admin()
    AND lower(storage.extension(name)) IN ('jpg', 'jpeg', 'png', 'webp', 'gif')
  );

-- Chỉ admin update/replace
CREATE POLICY "public_images_admin_update"
  ON storage.objects FOR UPDATE TO authenticated
  USING  (bucket_id = 'public-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'public-images' AND public.is_admin());

-- Chỉ admin xóa
CREATE POLICY "public_images_admin_delete"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'public-images' AND public.is_admin());
