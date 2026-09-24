-- Portfolio entries: weddings, automotive, and business/brand work.
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query).

create table if not exists portfolio_items (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (category in ('wedding', 'automotive', 'business')),
  medium text not null check (medium in ('photo', 'film', 'both')),
  summary text,
  story text,
  client text,
  location text,
  cover_image_url text,
  gallery_urls text[] not null default '{}',
  video_url text,
  featured boolean not null default false,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep updated_at current on every edit.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists portfolio_items_set_updated_at on portfolio_items;
create trigger portfolio_items_set_updated_at
  before update on portfolio_items
  for each row
  execute function set_updated_at();

-- Row Level Security: the public (anon) can only ever read published rows.
-- No insert/update/delete policy is defined for anon, so writes are only
-- possible via the Supabase dashboard (as the postgres role, which bypasses
-- RLS) or later via the service-role key in Sprint 5's admin dashboard.
alter table portfolio_items enable row level security;

drop policy if exists "Public can read published portfolio items" on portfolio_items;
create policy "Public can read published portfolio items"
  on portfolio_items
  for select
  to anon, authenticated
  using (published = true);
