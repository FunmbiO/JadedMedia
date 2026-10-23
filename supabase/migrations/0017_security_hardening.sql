-- Field-level validation at the database layer. RLS alone only answers
-- "who can write this row" — it can't express "the name field must be
-- non-empty." Without this, the public anon key (inherently public by
-- design) could be used to call Supabase's REST API directly and insert
-- garbage/spam leads that completely bypass the Next.js app's own
-- required-field checks.
alter table leads
  add constraint leads_name_not_blank check (btrim(name) <> ''),
  add constraint leads_message_not_blank check (btrim(message) <> ''),
  add constraint leads_email_format check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

-- No mime-type or size limit was ever set on the bucket that holds
-- portfolio cover/gallery images and testimonial photos — uploads were
-- validated client-side only (an admin-only surface, but defense in
-- depth is cheap here). 15 MB comfortably covers high-res photography.
update storage.buckets
set
  file_size_limit = 15728640, -- 15 MB
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
where id = 'Portfolio Images';
