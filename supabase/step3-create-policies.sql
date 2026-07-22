-- ═══════════════════════════════════════════════════════════════════════════
-- STEP 3 — RLS Policies (đã sửa theo tên bảng thực tế)
-- Bảng có: products, categories, blogs, contacts, orders, settings, banners
-- Chạy SAU khi step 1 (function) và step 2 (ALTER TABLE) đã thành công.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── products ─────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "products_public_read"    ON products;
DROP POLICY IF EXISTS "products_admin_read_all" ON products;
DROP POLICY IF EXISTS "products_admin_insert"   ON products;
DROP POLICY IF EXISTS "products_admin_update"   ON products;
DROP POLICY IF EXISTS "products_admin_delete"   ON products;

CREATE POLICY "products_public_read"
  ON products FOR SELECT USING (published = true);

CREATE POLICY "products_admin_read_all"
  ON products FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "products_admin_insert"
  ON products FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "products_admin_update"
  ON products FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "products_admin_delete"
  ON products FOR DELETE TO authenticated
  USING (public.is_admin());

-- ── categories ───────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "categories_public_read"  ON categories;
DROP POLICY IF EXISTS "categories_admin_insert" ON categories;
DROP POLICY IF EXISTS "categories_admin_update" ON categories;
DROP POLICY IF EXISTS "categories_admin_delete" ON categories;

CREATE POLICY "categories_public_read"
  ON categories FOR SELECT USING (true);

CREATE POLICY "categories_admin_insert"
  ON categories FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "categories_admin_update"
  ON categories FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "categories_admin_delete"
  ON categories FOR DELETE TO authenticated
  USING (public.is_admin());

-- ── blogs ─────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "blogs_public_read"    ON blogs;
DROP POLICY IF EXISTS "blogs_admin_read_all" ON blogs;
DROP POLICY IF EXISTS "blogs_admin_insert"   ON blogs;
DROP POLICY IF EXISTS "blogs_admin_update"   ON blogs;
DROP POLICY IF EXISTS "blogs_admin_delete"   ON blogs;

CREATE POLICY "blogs_public_read"
  ON blogs FOR SELECT USING (published = true);

CREATE POLICY "blogs_admin_read_all"
  ON blogs FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "blogs_admin_insert"
  ON blogs FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "blogs_admin_update"
  ON blogs FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "blogs_admin_delete"
  ON blogs FOR DELETE TO authenticated
  USING (public.is_admin());

-- ── contacts (form liên hệ) ───────────────────────────────────────────────────
-- Ai cũng có thể gửi, chỉ admin mới xem được

DROP POLICY IF EXISTS "contacts_anon_insert"  ON contacts;
DROP POLICY IF EXISTS "contacts_admin_read"   ON contacts;
DROP POLICY IF EXISTS "contacts_admin_update" ON contacts;
DROP POLICY IF EXISTS "contacts_admin_delete" ON contacts;

CREATE POLICY "contacts_anon_insert"
  ON contacts FOR INSERT WITH CHECK (true);

CREATE POLICY "contacts_admin_read"
  ON contacts FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "contacts_admin_update"
  ON contacts FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "contacts_admin_delete"
  ON contacts FOR DELETE TO authenticated
  USING (public.is_admin());

-- ── orders (guest orders — không cần login) ──────────────────────────────────
-- Cấu trúc: id, customerName, customerPhone, customerEmail, ..., items (jsonb)
-- Không có cột user_id → ai cũng đặt được, chỉ admin quản lý

DROP POLICY IF EXISTS "orders_customer_insert" ON orders;
DROP POLICY IF EXISTS "orders_customer_read"   ON orders;
DROP POLICY IF EXISTS "orders_admin_update"    ON orders;
DROP POLICY IF EXISTS "orders_admin_delete"    ON orders;
DROP POLICY IF EXISTS "orders_admin_all"       ON orders;
DROP POLICY IF EXISTS "orders_insert_public"   ON orders;
DROP POLICY IF EXISTS "orders_public_insert"   ON orders;
DROP POLICY IF EXISTS "orders_admin_select"    ON orders;

CREATE POLICY "orders_public_insert"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "orders_admin_select"
  ON orders FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "orders_admin_update"
  ON orders FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "orders_admin_delete"
  ON orders FOR DELETE TO authenticated
  USING (public.is_admin());

-- ── settings ─────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "settings_public_read" ON settings;
DROP POLICY IF EXISTS "settings_admin_write" ON settings;

CREATE POLICY "settings_public_read"
  ON settings FOR SELECT USING (true);

CREATE POLICY "settings_admin_write"
  ON settings FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ── banners ──────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "banners_public_read" ON banners;
DROP POLICY IF EXISTS "banners_admin_write" ON banners;

CREATE POLICY "banners_public_read"
  ON banners FOR SELECT USING (true);

CREATE POLICY "banners_admin_write"
  ON banners FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
