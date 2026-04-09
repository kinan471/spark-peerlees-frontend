-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_ar TEXT NOT NULL,
  name_tr TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  image_url TEXT NOT NULL,
  description_ar TEXT,
  description_tr TEXT,
  category TEXT NOT NULL DEFAULT 'ebike',
  stock INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  replied BOOLEAN DEFAULT FALSE
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  site_name TEXT NOT NULL DEFAULT 'Spark Swarder - التنقل الكهربائي',
  tagline TEXT DEFAULT 'منصتك الأولى للدراجات والسكوترات الكهربائية',
  whatsapp_number TEXT NOT NULL DEFAULT '+905555555555',
  primary_color TEXT DEFAULT '#fbbf24',
  secondary_color TEXT DEFAULT '#10b981',
  dark_mode BOOLEAN DEFAULT FALSE,
  language TEXT DEFAULT 'ar' CHECK (language IN ('ar', 'tr')),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (id) 
VALUES ('default')
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to messages" ON messages
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to settings" ON settings
  FOR SELECT USING (true);

-- Create policies for authenticated users (admin)
CREATE POLICY "Allow authenticated users to insert products" ON products
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update products" ON products
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to delete products" ON products
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to insert messages" ON messages
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update messages" ON messages
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to update settings" ON settings
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to insert settings" ON settings
  FOR INSERT TO authenticated WITH CHECK (true);
