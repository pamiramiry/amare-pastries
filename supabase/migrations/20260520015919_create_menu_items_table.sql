/*
  # Create menu_items table

  1. New Tables
    - `menu_items`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `description` (text) - Short description
      - `price` (numeric) - Price in CAD
      - `category` (text) - One of: Cups, Cakes, Cookies
      - `image_url` (text) - Path to image in public folder
      - `is_featured` (boolean) - Whether it appears as a best seller
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Public read access for menu items (this is a public-facing menu)

  3. Seed data
    - 12 products matching the provided images
*/

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  price numeric(6,2) NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT 'Cups',
  image_url text NOT NULL DEFAULT '',
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view menu items"
  ON menu_items
  FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO menu_items (name, description, price, category, image_url, is_featured) VALUES
  ('Vanilla Dream Cup', 'Layers of fluffy vanilla cream, golden pearls, and a mini fork on top. Light and indulgent.', 12.00, 'Cups', '/amare-spoon.png', true),
  ('Strawberry Gold Cup', 'Fresh strawberry slices with gold leaf flakes on velvety cream. A luxury treat.', 14.00, 'Cups', '/amare-strawberies.png', true),
  ('Lotus Biscoff Cup', 'Our fan favourite — creamy Biscoff layers topped with crushed Lotus cookie crumbles. Crafted con amor.', 13.00, 'Cups', '/amare-lotus.webp', true),
  ('Oreo Dream Cup', 'Rich chocolate layers with Oreo pieces and white cream. A classic done right.', 13.00, 'Cups', '/amare-oreo.webp', true),
  ('Signature Cup', 'Our signature dessert cup with whipped cream and chocolate chips. Simple and perfect.', 11.00, 'Cups', '/amare-cup.png', false),
  ('Classic Cup Trio', 'Three signature cups to share — Oreo, Caramel, and Tiramisu in one set.', 34.00, 'Cups', '/amare-3cups.webp', false),
  ('Dessert Cup Assorted', 'A curated selection of our most-loved cup flavours. Perfect for events.', 38.00, 'Cups', '/amare-cups.webp', false),
  ('Caramel Dream Cup', 'Golden caramel drizzle over creamy layers with a cinnamon dusting. Warm and comforting.', 13.00, 'Cups', '/amare-1cup.webp', false),
  ('Tres Leches Cake Slice', 'Classic tres leches cake with light whipped frosting and coconut shavings. Moist and delicate.', 8.00, 'Cakes', '/cake2.png', false),
  ('Celebration Cake', 'Custom layered celebration cake. Contact us to personalize for your special occasion.', 65.00, 'Cakes', '/amare-cake.png', false),
  ('White Choc Chip Cookies', 'Thick, chewy cookies loaded with white chocolate chips. Baked to golden perfection.', 4.00, 'Cookies', '/amare-cookies.webp', false),
  ('Oreo Stuffed Cookies', 'Giant cookies stuffed with whole Oreo pieces. A bite full of crunch and cream.', 5.00, 'Cookies', '/amare-oreo.webp', false);
