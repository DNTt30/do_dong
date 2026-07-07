-- Supabase Schema cho Đồ Đồng Nam Định

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  "categoryId" UUID REFERENCES categories(id) ON DELETE SET NULL,
  "categoryName" TEXT,
  description TEXT,
  "shortDescription" TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  "salePrice" NUMERIC,
  material TEXT,
  color TEXT,
  weight TEXT,
  size TEXT,
  stock INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Blogs Table
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  "coverImage" TEXT,
  category TEXT,
  author TEXT,
  published BOOLEAN DEFAULT true,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Banners Table
CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  link TEXT,
  "isActive" BOOLEAN DEFAULT true,
  "displayOrder" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "customerName" TEXT NOT NULL,
  "customerPhone" TEXT NOT NULL,
  "customerEmail" TEXT,
  "customerAddress" TEXT NOT NULL,
  "customerNote" TEXT,
  "totalAmount" NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, processing, completed, cancelled
  "paymentMethod" TEXT DEFAULT 'cod',
  source TEXT DEFAULT 'order_form', -- order_form, phone, zalo, etc.
  items JSONB NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Settings Table (Key-Value)
CREATE TABLE settings (
  id TEXT PRIMARY KEY, -- e.g. 'general', 'contact'
  value JSONB NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Add RLS (Row Level Security) - Tạm thời public read cho public content
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Tạo policy public read
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (published = true);
CREATE POLICY "Public read access for blogs" ON blogs FOR SELECT USING (published = true);
CREATE POLICY "Public read access for banners" ON banners FOR SELECT USING ("isActive" = true);
CREATE POLICY "Public read access for settings" ON settings FOR SELECT USING (true);

-- Cho phép mọi người insert order (khách không cần đăng nhập)
CREATE POLICY "Anyone can insert order" ON orders FOR INSERT WITH CHECK (true);

-- Các chính sách update/delete/insert khác nên giới hạn cho authenticated users (admin)
