/*
  # WhatsApp Analytics Table

  1. New Tables
    - `whatsapp_clicks`
      - `id` (uuid, primary key)
      - `device_type` (text) - Type of device (mobile, tablet, desktop)
      - `location` (jsonb) - Location data (latitude, longitude)
      - `user_agent` (text) - Browser user agent string
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `whatsapp_clicks` table
    - Add policy for public inserts
    - Add policy for authenticated reads
*/

CREATE TABLE IF NOT EXISTS whatsapp_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_type text NOT NULL,
  location jsonb,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE whatsapp_clicks ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Allow public to insert whatsapp clicks"
  ON whatsapp_clicks
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to read analytics
CREATE POLICY "Allow authenticated users to read whatsapp clicks"
  ON whatsapp_clicks
  FOR SELECT
  TO authenticated
  USING (true);