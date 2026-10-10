-- Replaces the single flat testimonial_quote/name/client_type keys in
-- site_content (phase 15) with a real table — "add another testimonial"
-- needs more than one row, which a flat key/value table can't hold. Same
-- shape and RLS pattern as `services`.

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  client_type text not null default '',
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists testimonials_set_updated_at on testimonials;
create trigger testimonials_set_updated_at
  before update on testimonials
  for each row
  execute function set_updated_at();

alter table testimonials enable row level security;

drop policy if exists "Public can read published testimonials" on testimonials;
create policy "Public can read published testimonials"
  on testimonials
  for select
  to anon, authenticated
  using (published = true);

drop policy if exists "Authenticated can insert testimonials" on testimonials;
create policy "Authenticated can insert testimonials"
  on testimonials
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update testimonials" on testimonials;
create policy "Authenticated can update testimonials"
  on testimonials
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete testimonials" on testimonials;
create policy "Authenticated can delete testimonials"
  on testimonials
  for delete
  to authenticated
  using (true);

drop policy if exists "Authenticated can read all testimonials" on testimonials;
create policy "Authenticated can read all testimonials"
  on testimonials
  for select
  to authenticated
  using (true);

-- The old flat keys are superseded by this table and were never actually
-- filled in (still empty strings from their 0012 seed) — safe to drop.
delete from site_content where key in ('testimonial_quote', 'testimonial_name', 'testimonial_client_type');
