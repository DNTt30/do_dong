-- ═══════════════════════════════════════════════════════════════════════════
-- Supabase Row Level Security (RLS) Policies
-- Đồ Đồng Thủ Công Nam Định
--
-- FIX: Tạo function trong schema PUBLIC (không phải auth — bị restricted).
-- Sử dụng auth.jwt() để đọc app_metadata.
--
-- Cách apply:
--   1. Supabase Dashboard → SQL Editor
--   2. Paste toàn bộ file này → Run
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Step 1: Tạo helper function is_admin() trong schema PUBLIC ───────────────
-- SECURITY DEFINER cho phép function đọc auth.jwt() với quyền owner
-- Inline STABLE để Postgres tái sử dụng kết quả trong cùng một transaction

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin',
    false
  );
$$;

-- Revoke public execute, chỉ authenticated user mới gọi được
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- ══════════════════════════════════════════════════════════════════════════════
-- TABLE: products
-- ══════════════════════════════════════════════════════════════════════════════

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "products_public_read" ON products;
CREATE POLICY "products_public_read"
  ON products FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "products_admin_read_all" ON products;
CREATE POLICY "products_admin_read_all"
  ON products FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "products_admin_insert" ON products;
CREATE POLICY "products_admin_insert"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "products_admin_update" ON products;
CREATE POLICY "products_admin_update"
  ON products FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "products_admin_delete" ON products;
CREATE POLICY "products_admin_delete"
  ON products FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ══════════════════════════════════════════════════════════════════════════════
-- TABLE: categories
-- ══════════════════════════════════════════════════════════════════════════════

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "categories_public_read" ON categories;
CREATE POLICY "categories_public_read"
  ON categories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "categories_admin_insert" ON categories;
CREATE POLICY "categories_admin_insert"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "categories_admin_update" ON categories;
CREATE POLICY "categories_admin_update"
  ON categories FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "categories_admin_delete" ON categories;
CREATE POLICY "categories_admin_delete"
  ON categories FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ══════════════════════════════════════════════════════════════════════════════
-- TABLE: blogs
-- ══════════════════════════════════════════════════════════════════════════════

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "blogs_public_read" ON blogs;
CREATE POLICY "blogs_public_read"
  ON blogs FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "blogs_admin_read_all" ON blogs;
CREATE POLICY "blogs_admin_read_all"
  ON blogs FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "blogs_admin_insert" ON blogs;
CREATE POLICY "blogs_admin_insert"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "blogs_admin_update" ON blogs;
CREATE POLICY "blogs_admin_update"
  ON blogs FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "blogs_admin_delete" ON blogs;
CREATE POLICY "blogs_admin_delete"
  ON blogs FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ══════════════════════════════════════════════════════════════════════════════
-- TABLE: messages (liên hệ)
-- Ai cũng có thể gửi, chỉ admin mới đọc được
-- ══════════════════════════════════════════════════════════════════════════════

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "messages_anon_insert" ON messages;
CREATE POLICY "messages_anon_insert"
  ON messages FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "messages_admin_read" ON messages;
CREATE POLICY "messages_admin_read"
  ON messages FOR SELECT
  TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "messages_admin_update" ON messages;
CREATE POLICY "messages_admin_update"
  ON messages FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "messages_admin_delete" ON messages;
CREATE POLICY "messages_admin_delete"
  ON messages FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ══════════════════════════════════════════════════════════════════════════════
-- TABLE: testimonials
-- ══════════════════════════════════════════════════════════════════════════════

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "testimonials_public_read" ON testimonials;
CREATE POLICY "testimonials_public_read"
  ON testimonials FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "testimonials_admin_write" ON testimonials;
CREATE POLICY "testimonials_admin_write"
  ON testimonials FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ══════════════════════════════════════════════════════════════════════════════
-- TABLE: orders
-- ══════════════════════════════════════════════════════════════════════════════

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "orders_customer_insert" ON orders;
CREATE POLICY "orders_customer_insert"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid() OR public.is_admin()
  );

DROP POLICY IF EXISTS "orders_customer_read" ON orders;
CREATE POLICY "orders_customer_read"
  ON orders FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR public.is_admin()
  );

DROP POLICY IF EXISTS "orders_admin_update" ON orders;
CREATE POLICY "orders_admin_update"
  ON orders FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "orders_admin_delete" ON orders;
CREATE POLICY "orders_admin_delete"
  ON orders FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ══════════════════════════════════════════════════════════════════════════════
-- TABLE: settings
-- ══════════════════════════════════════════════════════════════════════════════

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "settings_public_read" ON settings;
CREATE POLICY "settings_public_read"
  ON settings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "settings_admin_write" ON settings;
CREATE POLICY "settings_admin_write"
  ON settings FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ══════════════════════════════════════════════════════════════════════════════
-- TABLE: banners
-- ══════════════════════════════════════════════════════════════════════════════

ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "banners_public_read" ON banners;
CREATE POLICY "banners_public_read"
  ON banners FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "banners_admin_write" ON banners;
CREATE POLICY "banners_admin_write"
  ON banners FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ══════════════════════════════════════════════════════════════════════════════
-- GRANT ADMIN ROLE — Cách duy nhất đúng với Supabase:
--
-- Chạy SQL này trong Supabase Dashboard → SQL Editor:
--
--   UPDATE auth.users
--   SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
--   WHERE email = 'your-admin@email.com';
--
-- Sau đó user cần đăng xuất và đăng nhập lại để JWT được làm mới.
-- ══════════════════════════════════════════════════════════════════════════════
