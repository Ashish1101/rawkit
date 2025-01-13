/*
  # Add sub-products table and relationships

  1. New Tables
    - `sub_products`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key to products)
      - `name` (text)
      - `brand` (text)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `sub_products` table
    - Add policies for public read access
    - Add policies for authenticated management
*/

CREATE TABLE IF NOT EXISTS sub_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  name text NOT NULL,
  brand text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sub_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for sub_products"
  ON sub_products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage sub_products"
  ON sub_products
  FOR ALL
  TO authenticated
  USING (true);