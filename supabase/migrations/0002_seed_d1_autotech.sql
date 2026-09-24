-- First real portfolio entry, from your R2-hosted video. Run this after
-- 0001_portfolio.sql. Edit summary/story/client/location any time via the
-- Supabase Table Editor — no code change needed.

insert into portfolio_items (
  slug, title, category, medium, summary, story, client,
  cover_image_url, video_url, featured, published, sort_order
) values (
  'd1-autotech-exclusivo',
  'D1 Autotech × Exclusivo',
  'automotive',
  'film',
  '[Add a one-line summary for the work grid]',
  '[Add the full project story for the detail page]',
  'D1 Autotech',
  null,
  'https://pub-c53bd5762ed44a3f946885af4622a7c7.r2.dev/D1%20Autotech%20X%20Exclusivo%20(v1%20150k).mp4',
  true,
  true,
  0
)
on conflict (slug) do nothing;
