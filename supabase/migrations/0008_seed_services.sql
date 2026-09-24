-- Backfills the three services that were previously hardcoded on
-- /services, now that they're managed from the admin. Safe to re-run —
-- existing rows with the same slug are left alone.

insert into services (slug, title, description, bullets, sort_order, published)
values
  (
    'wedding',
    'Weddings',
    'Full-day photo and film coverage that captures the vows, the toasts, and the quiet moments in between — delivered as work you''ll return to for decades.',
    array[
      'Full-day photography and/or film coverage',
      'A private online gallery of edited images',
      'A cinematic highlight film (when film is included)',
      'Optional engagement or rehearsal dinner coverage',
      'Full-resolution delivery, yours to keep forever'
    ],
    0,
    true
  ),
  (
    'automotive',
    'Automotive',
    'Editorial stills and cinematic film for cars that deserve better than a phone photo — track days, builds, dealer inventory, and personal collections.',
    array[
      'On-location or studio shoots — track days, builds, dealer inventory',
      'Editorial stills and/or cinematic film',
      'Fast turnaround available for dealer and inventory needs',
      'Print-ready and social-ready exports'
    ],
    1,
    true
  ),
  (
    'business',
    'Business & Brand',
    'Story-driven photo and film for brands who want to feel human — product launches, founder stories, headshots, and campaigns built to hold attention.',
    array[
      'Product photography and video',
      'Founder and team headshots',
      'Brand and campaign films',
      'On-site or studio sessions'
    ],
    2,
    true
  )
on conflict (slug) do nothing;
