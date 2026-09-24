-- Contact/booking form submissions. Run this in the Supabase SQL Editor.

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  event_type text check (event_type in ('wedding', 'automotive', 'business', 'other')),
  event_date date,
  budget_range text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'booked', 'closed')),
  created_at timestamptz not null default now()
);

-- RLS: anyone can submit (insert) a lead — that's the whole point of a
-- public contact form. Nobody but a logged-in admin can ever read, update,
-- or delete one; leads contain real people's contact info.
alter table leads enable row level security;

drop policy if exists "Anyone can submit a lead" on leads;
create policy "Anyone can submit a lead"
  on leads
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Authenticated can read leads" on leads;
create policy "Authenticated can read leads"
  on leads
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can update leads" on leads;
create policy "Authenticated can update leads"
  on leads
  for update
  to authenticated
  using (true)
  with check (true);
