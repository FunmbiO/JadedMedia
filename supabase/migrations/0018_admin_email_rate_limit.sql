-- Tracks sends from the admin "Send Email" feature so it can be capped
-- per hour. This is the single highest-value target in the app if the
-- admin's own session or credentials are ever compromised — it can
-- email any address, under the verified sending domain, with no limit
-- otherwise.
create table if not exists admin_email_log (
  id uuid primary key default gen_random_uuid(),
  sent_at timestamptz not null default now()
);

alter table admin_email_log enable row level security;

drop policy if exists "Authenticated can read the send log" on admin_email_log;
create policy "Authenticated can read the send log"
  on admin_email_log
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can log a send" on admin_email_log;
create policy "Authenticated can log a send"
  on admin_email_log
  for insert
  to authenticated
  with check (true);
