-- Lets a logged-in Supabase Auth user (that's just you) manage portfolio
-- content and upload images. The public (anon role) still can't write
-- anything -- only read published rows, per 0001's policy.

-- Portfolio rows: authenticated can insert/update/delete.
drop policy if exists "Authenticated can insert portfolio items" on portfolio_items;
create policy "Authenticated can insert portfolio items"
  on portfolio_items
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update portfolio items" on portfolio_items;
create policy "Authenticated can update portfolio items"
  on portfolio_items
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete portfolio items" on portfolio_items;
create policy "Authenticated can delete portfolio items"
  on portfolio_items
  for delete
  to authenticated
  using (true);

-- Authenticated also needs to be able to SELECT unpublished/draft rows
-- (the public policy only covers published = true) so the admin list
-- and edit forms can see everything, not just what's live.
drop policy if exists "Authenticated can read all portfolio items" on portfolio_items;
create policy "Authenticated can read all portfolio items"
  on portfolio_items
  for select
  to authenticated
  using (true);

-- Storage: authenticated can upload/replace/delete objects in the
-- "Portfolio Images" bucket. Public read access to that bucket is
-- controlled by the bucket's own "Public bucket" toggle, not by these
-- policies -- this only covers writes.
drop policy if exists "Authenticated can upload portfolio images" on storage.objects;
create policy "Authenticated can upload portfolio images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'Portfolio Images');

drop policy if exists "Authenticated can update portfolio images" on storage.objects;
create policy "Authenticated can update portfolio images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'Portfolio Images')
  with check (bucket_id = 'Portfolio Images');

drop policy if exists "Authenticated can delete portfolio images" on storage.objects;
create policy "Authenticated can delete portfolio images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'Portfolio Images');
