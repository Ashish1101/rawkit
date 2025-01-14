/*
  # Product Details Schema

  1. New Tables
    - `product_details`
      - `id` (uuid, primary key)
      - `product_id` (uuid, references products)
      - `technical_specs` (jsonb)
      - `available_sizes` (text[])
      - `certifications` (text[])
      - `delivery_info` (jsonb)
      - `created_at` (timestamp)
    
    - `product_images`
      - `id` (uuid, primary key)
      - `product_id` (uuid, references products)
      - `image_url` (text)
      - `alt_text` (text)
      - `display_order` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to manage data
*/

-- Create product_details table
CREATE TABLE IF NOT EXISTS product_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  technical_specs jsonb NOT NULL DEFAULT '{}'::jsonb,
  available_sizes text[] NOT NULL DEFAULT '{}',
  certifications text[] NOT NULL DEFAULT '{}',
  delivery_info jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create product_images table
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE product_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Policies for product_details
CREATE POLICY "Allow public read access for product_details"
  ON product_details
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage product_details"
  ON product_details
  FOR ALL
  TO authenticated
  USING (true);

-- Policies for product_images
CREATE POLICY "Allow public read access for product_images"
  ON product_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage product_images"
  ON product_images
  FOR ALL
  TO authenticated
  USING (true);