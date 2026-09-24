-- Simplifies the service descriptions seeded in 0008 — same info, plainer
-- wording. Bullets left mostly as-is since they were already short and
-- direct.

update services set
  description = 'Full-day photo and film coverage — the vows, the toasts, and everything in between.'
where slug = 'wedding';

update services set
  description = 'Photo and video for cars that deserve better than a phone pic — track days, builds, dealer inventory, personal rides.'
where slug = 'automotive';

update services set
  description = 'Photo and film for brands — product shots, headshots, launches, campaigns.'
where slug = 'business';
