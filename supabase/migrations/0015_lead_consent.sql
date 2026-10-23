-- Records that a lead/quote-request submitter agreed to the Privacy
-- Policy at the time they submitted the form — evidence of consent per
-- PIPEDA's accountability principle. Null means the row predates the
-- consent checkbox being added to the forms.
alter table leads add column if not exists consent_at timestamptz;
