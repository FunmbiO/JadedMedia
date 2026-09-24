-- Ties a lead to the specific service it was requested from (the new
-- "Get a Custom Quote" popup on /services), and tracks where a lead came
-- from so the admin can tell a quote request apart from the main contact
-- form. Existing leads default to source = 'contact_form'.

alter table leads
  add column if not exists service_id uuid references services(id) on delete set null;

alter table leads
  add column if not exists source text not null default 'contact_form'
    check (source in ('contact_form', 'quote_popup'));
