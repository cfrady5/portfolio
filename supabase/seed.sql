-- ===========================================================================
-- Frames by Frady — seed data
-- Run AFTER schema.sql. Inserts the 3 clients and 10 portfolio projects with
-- placeholder financials. The canonical, richly-written case-study content
-- lives in src/data/projects.ts — keep them in sync, or treat Supabase as the
-- source of truth once you migrate.
--
-- Safe to re-run: uses fixed slugs + ON CONFLICT to upsert.
-- ===========================================================================

-- --- Clients ---------------------------------------------------------------
insert into public.clients (id, name, company, email, phone, website, status, notes)
values
  ('11111111-1111-1111-1111-111111111101', 'Tyler Hoy', 'THOY Lawncare', 'tyler@thoylawncare.com', '(317) 555-0142', 'https://thoylawncare.com', 'Active', 'Local lawncare. Wants seasonal promos + quote form.'),
  ('11111111-1111-1111-1111-111111111102', 'Dr. Lena Park', 'Heartland BioWorks', 'lena.park@heartlandbioworks.org', '(317) 555-0188', 'https://heartlandbioworks.org', 'Active', 'Biotech. CMS structure + ongoing content. Renewal ~Sep 2026.'),
  ('11111111-1111-1111-1111-111111111103', 'Applied Research Institute', 'Applied Research Institute (ARI)', 'partnerships@appliedresearchinstitute.org', '(765) 555-0117', 'https://appliedresearchinstitute.org', 'Active', 'Role-based work. Keep public framing high-level + approved.')
on conflict (id) do nothing;

-- --- Projects --------------------------------------------------------------
insert into public.projects
  (slug, client_id, title, category, short_description, role, tools, status, live_url, featured, public_visible, year, client_type, problem, result, accent_color, renewal_date)
values
  ('frames-by-frady', null, 'Frames by Frady', 'Websites',
   'A small-business website studio that helps local businesses look trustworthy online, get found, and turn visitors into customers.',
   'Founder, designer, developer, copywriter', '{Next.js,Vercel,Claude,GitHub,SEO}', 'Active', 'https://framesbyfrady.com', true, true, '2026', 'Studio',
   'Local businesses often have outdated, templated sites that bury what they do and give visitors no reason to trust them.',
   'A studio identity that communicates trust in seconds, with a repeatable build process from discovery to launch.', '#7c9a76', null),

  ('thoy-lawncare', '11111111-1111-1111-1111-111111111101', 'THOY Lawncare', 'Local Business',
   'A local lawncare landing page concept with clean service sections, friendly branding, and conversion-focused calls to action.',
   'Designer, developer, brand direction', '{HTML,CSS,"Animation concepts",Claude}', 'In Progress', null, true, true, '2025', 'Local Service',
   'Local service businesses lose jobs when customers cannot quickly see services, service area, or how to book.',
   'A landing page that makes a local crew look established and easy to hire.', '#6f9c5a', null),

  ('ari-website-concepts', '11111111-1111-1111-1111-111111111103', 'Applied Research Institute — Website Concepts', 'ARI / Innovation Ecosystem',
   'Professional website concepts and page systems for innovation, government, and research-focused audiences.',
   'Designer, frontend builder, content strategist', '{HTML,CSS,JavaScript,Claude}', 'Concept', null, true, true, '2025', 'Research Organization',
   'Research organizations do mission-critical work that outside audiences struggle to understand.',
   'Concepts that make a complex research organization legible and partnership-ready.', '#5b7fa6', null),

  ('dow-scitechconnect', '11111111-1111-1111-1111-111111111103', 'DoW SciTechCONNECT', 'ARI / Innovation Ecosystem',
   'A Higher Logic web experience for a Department of War innovation ecosystem, mapping the pathway from lab to mission impact.',
   'Designer, frontend/CSS builder, content structure', '{"Higher Logic",HTML,CSS,Claude}', 'In Progress', null, true, true, '2026', 'Government / Defense',
   'A multi-stakeholder innovation ecosystem is easy to get lost in without a clear pathway.',
   'A clearer ecosystem experience that helps each audience find their next step toward mission impact.', '#3f6f8f', null),

  ('ram-rapid-acquisition-model', '11111111-1111-1111-1111-111111111103', 'RAM — Rapid Acquisition Model', 'Government / Defense',
   'A formal web presence for the Rapid Acquisition Model, communicating acquisition value, marketplace access, and mission relevance.',
   'Designer, site strategist, Wix/HTML builder', '{"Wix Studio",HTML,CSS,Claude}', 'In Progress', null, true, true, '2026', 'Government / Defense',
   'A new acquisition model needs to earn institutional trust fast with a clear, formal web presence.',
   'A formal, trustworthy presence that helps a government audience understand the model and engage.', '#4a5d7e', null),

  ('heartland-bioworks', '11111111-1111-1111-1111-111111111102', 'Heartland BioWorks', 'CMS / Systems',
   'A rebuilt web structure for Heartland BioWorks with programs, events, news, media, team, and FAQ pages plus CMS planning.',
   'Designer, CMS planner, frontend builder', '{"Wix Studio","Supabase planning",Claude}', 'In Progress', null, true, true, '2026', 'Biotech',
   'A growing biotech initiative had scattered content and no clear structure.',
   'A coherent, maintainable site structure the team can keep current.', '#5a8f7b', '2026-09-15'),

  ('bizzabo-event-pages', '11111111-1111-1111-1111-111111111103', 'Bizzabo Event Pages', 'Client Work',
   'Formal event landing pages for government, defense, and innovation events — agenda, registration, speakers, and venue.',
   'Designer, event page builder, copy/layout editor', '{Bizzabo,HTML,CSS,Claude}', 'Active', null, false, true, '2025', 'Government / Defense',
   'Event pages are often cluttered and hard to scan, costing registrations.',
   'Event pages that are easy to scan and act on, helping events fill seats.', '#7a6f9c', null),

  ('bulk', null, 'Bulk', 'Apps',
   'A mobile app concept for bulk sports-card listing — photo intake, item review, CSV generation, and marketplace efficiency.',
   'Product designer, app strategist, brand direction', '{Claude,"Mobile UI concepts","Workflow design"}', 'Concept', null, true, true, '2025', 'Product Concept',
   'Listing sports cards in volume is slow and error-prone.',
   'A concept that could collapse hours of manual listing into a fast, repeatable workflow.', '#c08a3e', null),

  ('irc-indiana-research-consortium', null, 'IRC — Indiana Research Consortium', 'Brand Identity',
   'A clean logo and visual identity concept built around the state of Indiana, university markers, and a simple institutional identity.',
   'Brand designer', '{"AI image generation","Design direction"}', 'Concept', null, false, true, '2025', 'Research Consortium',
   'A multi-institution consortium needs a single identity that feels neutral, credible, and shared.',
   'A clean, credible identity concept a multi-institution consortium could adopt.', '#8a6f4a', null),

  ('sketchbook-stoic', null, 'Sketchbook Stoic', 'Concepts',
   'A motivational content concept built around short-form wisdom slides, visual storytelling, and recurring content systems.',
   'Concept creator, content strategist', '{"AI content workflow","Visual direction"}', 'Concept', null, false, true, '2025', 'Content Brand',
   'Most motivational content is inconsistent and forgettable without a system.',
   'A content system that makes a recognizable, sustainable motivational brand possible.', '#9c8f6f', null)
on conflict (slug) do nothing;

-- --- Financials (placeholder values — PRIVATE) -----------------------------
-- Attaches financials to a few real client engagements; concepts default to 0.
insert into public.project_financials
  (project_id, initial_build_price, deposit_amount, final_payment_amount, total_project_price,
   monthly_hosting_fee, monthly_maintenance_fee, monthly_seo_fee, monthly_content_fee,
   total_monthly_recurring, amount_paid_to_date, outstanding_balance, payment_status, contract_status)
select p.id, v.* from (values
  ('thoy-lawncare',     1200, 400, 800, 1200, 25, 40, 0, 0, 65, 400, 800, 'Deposit Paid', 'Signed'),
  ('heartland-bioworks', 4500, 1500, 3000, 4500, 35, 120, 150, 200, 505, 1500, 3000, 'Deposit Paid', 'Signed')
) as v(slug, initial_build_price, deposit_amount, final_payment_amount, total_project_price,
       monthly_hosting_fee, monthly_maintenance_fee, monthly_seo_fee, monthly_content_fee,
       total_monthly_recurring, amount_paid_to_date, outstanding_balance, payment_status, contract_status)
join public.projects p on p.slug = v.slug
on conflict (project_id) do nothing;
