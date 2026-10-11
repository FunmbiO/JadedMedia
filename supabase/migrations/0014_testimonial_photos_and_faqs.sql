-- Phase 16: a photo per testimonial, plus a real faqs table so FAQ
-- content (currently hardcoded in src/app/faq/page.tsx) is editable from
-- the admin like everything else.

alter table testimonials add column if not exists photo_url text;

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists faqs_set_updated_at on faqs;
create trigger faqs_set_updated_at
  before update on faqs
  for each row
  execute function set_updated_at();

alter table faqs enable row level security;

drop policy if exists "Public can read published faqs" on faqs;
create policy "Public can read published faqs"
  on faqs
  for select
  to anon, authenticated
  using (published = true);

drop policy if exists "Authenticated can insert faqs" on faqs;
create policy "Authenticated can insert faqs"
  on faqs
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update faqs" on faqs;
create policy "Authenticated can update faqs"
  on faqs
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete faqs" on faqs;
create policy "Authenticated can delete faqs"
  on faqs
  for delete
  to authenticated
  using (true);

drop policy if exists "Authenticated can read all faqs" on faqs;
create policy "Authenticated can read all faqs"
  on faqs
  for select
  to authenticated
  using (true);

-- Seed with the copy that was hardcoded in src/app/faq/page.tsx so the
-- live site doesn't go blank the moment this migration runs. Links use
-- a tiny [label](/path) syntax the admin can type and the public page
-- parses — see src/lib/markdown-links.ts.
insert into faqs (question, answer, sort_order) values
  ('What kind of work do you do?',
   'Weddings, cars, and business or brand shoots — photo, film, or both. I don''t work in just one style; if it''s worth capturing, I''ll shoot it.',
   10),
  ('Do you shoot photo, video, or both?',
   'Both, and either on their own too. When you request a quote, let me know what you''re after and I''ll put together what fits the project.',
   20),
  ('How much does it cost?',
   'It depends on the project — scope, location, and how much coverage you need all factor in. There''s no fixed price list; request a quote and I''ll get back to you with real numbers for your specific shoot.',
   30),
  ('Do you travel outside Moncton?',
   'Yes. I''m based in Moncton, New Brunswick, but I''ll travel for the right project — travel costs may apply depending on distance.',
   40),
  ('How do I book you?',
   'Fill out the [contact form](/contact) or request a quote from a specific service, and I''ll follow up to talk through the details before anything''s locked in.',
   50),
  ('How far in advance should I book?',
   'The sooner the better, especially for weddings or a date-specific shoot — but reach out even if your timeline is tight. Worst case, I''ll tell you if it''s not doable.',
   60),
  ('Can I see examples of your work?',
   'Yes — [take a look here](/work).',
   70),
  ('Do you edit the photos and video?',
   'Every shoot is edited before delivery — nothing goes out straight off the camera.',
   80);
