-- Services shown on /services and the homepage teaser, fully editable from
-- the admin (add, edit, delete, reorder) instead of hardcoded in the page.
-- Run this in the Supabase SQL Editor.

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  bullets text[] not null default '{}',
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Reuses the set_updated_at() function created in 0001_portfolio.sql.
drop trigger if exists services_set_updated_at on services;
create trigger services_set_updated_at
  before update on services
  for each row
  execute function set_updated_at();

alter table services enable row level security;

-- Public (anon) can only ever read published rows.
drop policy if exists "Public can read published services" on services;
create policy "Public can read published services"
  on services
  for select
  to anon, authenticated
  using (published = true);

-- Authenticated (that's just you, via the admin) can fully manage services.
drop policy if exists "Authenticated can insert services" on services;
create policy "Authenticated can insert services"
  on services
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update services" on services;
create policy "Authenticated can update services"
  on services
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete services" on services;
create policy "Authenticated can delete services"
  on services
  for delete
  to authenticated
  using (true);

-- Authenticated also needs to see unpublished/draft rows for the admin
-- list and edit forms, not just what's live.
drop policy if exists "Authenticated can read all services" on services;
create policy "Authenticated can read all services"
  on services
  for select
  to authenticated
  using (true);
