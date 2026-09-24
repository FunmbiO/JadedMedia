-- Set the cover image on the existing D1 Autotech entry.
-- Run this after 0001/0002 (already applied).

update portfolio_items
set cover_image_url = 'https://uwxoaxzttrsnnkorkmly.supabase.co/storage/v1/object/public/Portfolio%20Images/IMG_6655.jpg'
where slug = 'd1-autotech-exclusivo';
