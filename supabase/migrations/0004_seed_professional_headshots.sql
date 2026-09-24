-- Second real portfolio entry: a business/brand photo set.
-- Featured on the homepage alongside D1 Autotech (featured = true) --
-- flip that to false in the Table Editor if you'd rather it only show
-- on /work for now.

insert into portfolio_items (
  slug, title, category, medium, summary, story,
  cover_image_url, gallery_urls, featured, published, sort_order
) values (
  'professional-headshots',
  'Professional Headshots',
  'business',
  'photo',
  '[Add a one-line summary for the work grid]',
  '[Add the full project story for the detail page]',
  'https://uwxoaxzttrsnnkorkmly.supabase.co/storage/v1/object/public/Portfolio%20Images/IMG_5145.JPG',
  array[
    'https://uwxoaxzttrsnnkorkmly.supabase.co/storage/v1/object/public/Portfolio%20Images/4734e411-d7e7-42b4-9b09-4ec5afc53e33.JPG',
    'https://uwxoaxzttrsnnkorkmly.supabase.co/storage/v1/object/public/Portfolio%20Images/IMG_5180.JPG',
    'https://uwxoaxzttrsnnkorkmly.supabase.co/storage/v1/object/public/Portfolio%20Images/IMG_5171.JPG'
  ],
  true,
  true,
  1
)
on conflict (slug) do nothing;
