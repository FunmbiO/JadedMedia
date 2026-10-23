-- Switch the publicly displayed contact email from the personal gmail
-- address to the branded hello@jadedmedia.ca alias, matching
-- SITE_CONFIG.email (src/lib/site-config.ts) and the Resend sender
-- address set in Vercel.
update site_content set value = 'hello@jadedmedia.ca' where key = 'contact_email';
