-- Addresses findings from Supabase's own security/performance advisors,
-- run as part of the phase 9 client-ready pass.

-- Performance: leads.service_id (added in 0009) had no covering index,
-- which the advisor flags as a query-performance risk as the table grows.
create index if not exists leads_service_id_idx on leads (service_id);

-- Security: pin search_path so this trigger function can't be tricked by
-- a session-level search_path change into resolving an unexpected
-- object. Safe to set empty here — the function only touches NEW/OLD
-- record fields and now(), and pg_catalog (where now() lives) is always
-- implicitly searched regardless of search_path.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql
set search_path = '';

-- Performance: "Authenticated can read all X" (0005/0007) already covers
-- every row for the authenticated role, so having the published-only
-- policy also apply to authenticated made Postgres evaluate two
-- permissive SELECT policies (OR'd together) on every authenticated
-- query for no benefit. Scoping the published-only policy to anon only
-- — the one role that actually needs it — removes the redundancy.
drop policy if exists "Public can read published portfolio items" on portfolio_items;
create policy "Public can read published portfolio items"
  on portfolio_items
  for select
  to anon
  using (published = true);

drop policy if exists "Public can read published services" on services;
create policy "Public can read published services"
  on services
  for select
  to anon
  using (published = true);
