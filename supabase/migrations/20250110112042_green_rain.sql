/*
  # Add rating column to testimonials table

  1. Changes
    - Add `rating` column to `testimonials` table with a default value of 5
    - Rating is an integer between 1 and 5
    - Add check constraint to ensure rating is within valid range

  2. Notes
    - Default rating of 5 stars for existing testimonials
    - Check constraint ensures data integrity
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'testimonials' AND column_name = 'rating'
  ) THEN
    ALTER TABLE testimonials 
    ADD COLUMN rating integer NOT NULL DEFAULT 5 
    CHECK (rating >= 1 AND rating <= 5);
  END IF;
END $$;