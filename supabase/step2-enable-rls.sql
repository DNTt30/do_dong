-- ═══════════════════════════════════════════════════════════════════════════
-- STEP 2 — Bật RLS cho từng bảng (chạy TỪNG KHỐI một nếu vẫn deadlock)
-- Chạy file này SAU khi step 1 thành công.
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE products    ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories  ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages    ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders      ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings    ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners     ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
