-- ===========================================================================
-- Frames by Frady — Supabase schema
-- Run this in the Supabase SQL editor (or via the CLI) to provision the
-- database used by the portfolio + private dashboard.
--
-- Tables:
--   clients
--   projects
--   project_financials
--   project_notes
--   project_screenshots
--
-- Security model (see RLS section at the bottom):
--   • PUBLIC (anon): may read ONLY public-safe columns of projects where
--     public_visible = true, and their screenshots. No financials, notes, or
--     client data.
--   • ADMIN (authenticated): full read/write on everything.
-- ===========================================================================

-- Needed for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- clients  (PRIVATE)
-- ---------------------------------------------------------------------------
create table if not exists public.clients (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  company     text,
  email       text,
  phone       text,
  website     text,
  status      text not null default 'Lead',   -- Lead | Active | Past | Prospect
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- projects  (PUBLIC columns + a few private FKs)
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id                 uuid primary key default gen_random_uuid(),
  client_id          uuid references public.clients(id) on delete set null,
  title              text not null,
  slug               text not null unique,
  category           text not null,
  short_description  text,
  long_description   text,
  role               text,
  tools              text[] not null default '{}',
  status             text not null default 'Lead',
  live_url           text,
  repo_url           text,
  featured           boolean not null default false,
  public_visible     boolean not null default false,
  year               text,
  client_type        text,
  problem            text,
  process            text[] not null default '{}',
  features           text[] not null default '{}',
  result             text,
  accent_color       text default '#7c9a76',
  start_date         date,
  launch_date        date,
  renewal_date       date,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- project_financials  (PRIVATE — one row per project)
-- ---------------------------------------------------------------------------
create table if not exists public.project_financials (
  id                       uuid primary key default gen_random_uuid(),
  project_id               uuid not null unique references public.projects(id) on delete cascade,
  initial_build_price      numeric(12,2) not null default 0,
  deposit_amount           numeric(12,2) not null default 0,
  final_payment_amount     numeric(12,2) not null default 0,
  total_project_price      numeric(12,2) not null default 0,
  monthly_hosting_fee      numeric(12,2) not null default 0,
  monthly_maintenance_fee  numeric(12,2) not null default 0,
  monthly_seo_fee          numeric(12,2) not null default 0,
  monthly_content_fee      numeric(12,2) not null default 0,
  other_recurring_fee      numeric(12,2) not null default 0,
  total_monthly_recurring  numeric(12,2) not null default 0,
  amount_paid_to_date      numeric(12,2) not null default 0,
  outstanding_balance      numeric(12,2) not null default 0,
  payment_status           text not null default 'Unpaid',
  contract_status          text not null default 'None',
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- project_notes  (PRIVATE)
-- ---------------------------------------------------------------------------
create table if not exists public.project_notes (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references public.projects(id) on delete cascade,
  note         text,
  next_action  text,
  priority     text not null default 'Medium',  -- Low | Medium | High
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- project_screenshots  (PUBLIC, gated through the parent project)
-- ---------------------------------------------------------------------------
create table if not exists public.project_screenshots (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  image_url   text not null,
  alt_text    text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index if not exists idx_projects_slug            on public.projects (slug);
create index if not exists idx_projects_public_visible  on public.projects (public_visible);
create index if not exists idx_projects_featured        on public.projects (featured);
create index if not exists idx_projects_status          on public.projects (status);
create index if not exists idx_projects_client_id       on public.projects (client_id);
create index if not exists idx_financials_project_id    on public.project_financials (project_id);
create index if not exists idx_notes_project_id         on public.project_notes (project_id);
create index if not exists idx_screenshots_project_id   on public.project_screenshots (project_id);

-- ---------------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------------
drop trigger if exists trg_clients_updated   on public.clients;
create trigger trg_clients_updated   before update on public.clients
  for each row execute function public.set_updated_at();

drop trigger if exists trg_projects_updated  on public.projects;
create trigger trg_projects_updated  before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists trg_financials_updated on public.project_financials;
create trigger trg_financials_updated before update on public.project_financials
  for each row execute function public.set_updated_at();

drop trigger if exists trg_notes_updated     on public.project_notes;
create trigger trg_notes_updated     before update on public.project_notes
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- ROW LEVEL SECURITY
-- ===========================================================================
alter table public.clients             enable row level security;
alter table public.projects            enable row level security;
alter table public.project_financials  enable row level security;
alter table public.project_notes       enable row level security;
alter table public.project_screenshots enable row level security;

-- ---------------------------------------------------------------------------
-- PUBLIC (anon) read access
-- ---------------------------------------------------------------------------
-- Projects: anyone may read rows where public_visible = true.
--
-- NOTE: RLS gates ROWS, not COLUMNS. Private fields (financials, notes, client
-- data) live in SEPARATE tables that anon cannot read at all, so the public
-- site only ever receives public-safe project columns. Do NOT add sensitive
-- columns to `projects` itself. If you ever need to, restrict columns with a
-- VIEW (see commented example below) and grant on the view instead.
drop policy if exists "public read visible projects" on public.projects;
create policy "public read visible projects"
  on public.projects
  for select
  to anon, authenticated
  using (public_visible = true);

-- Screenshots: readable only when their parent project is public.
drop policy if exists "public read screenshots of visible projects" on public.project_screenshots;
create policy "public read screenshots of visible projects"
  on public.project_screenshots
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_screenshots.project_id
        and p.public_visible = true
    )
  );

-- ---------------------------------------------------------------------------
-- ADMIN (authenticated) full access
-- ---------------------------------------------------------------------------
-- These policies grant any signed-in user full control. For a single-owner
-- portfolio that's usually fine (only you have an account).
--
-- >>> TO RESTRICT TO SPECIFIC ADMINS:
--   Replace `to authenticated using (true)` with an allow-list check, e.g.:
--
--     using ( auth.jwt() ->> 'email' in ('cjfrady5@gmail.com') )
--
--   Or add a custom claim / a `profiles` table with an `is_admin` boolean and
--   check it here. The app also supports NEXT_PUBLIC_ADMIN_EMAILS as a second
--   layer (see src/lib/auth.ts).

-- clients
drop policy if exists "admin all clients" on public.clients;
create policy "admin all clients" on public.clients
  for all to authenticated using (true) with check (true);

-- projects (full write; the public read policy above coexists)
drop policy if exists "admin all projects" on public.projects;
create policy "admin all projects" on public.projects
  for all to authenticated using (true) with check (true);

-- project_financials (PRIVATE — authenticated only, no anon policy exists)
drop policy if exists "admin all financials" on public.project_financials;
create policy "admin all financials" on public.project_financials
  for all to authenticated using (true) with check (true);

-- project_notes (PRIVATE — authenticated only)
drop policy if exists "admin all notes" on public.project_notes;
create policy "admin all notes" on public.project_notes
  for all to authenticated using (true) with check (true);

-- project_screenshots (admin write; public read policy above)
drop policy if exists "admin all screenshots" on public.project_screenshots;
create policy "admin all screenshots" on public.project_screenshots
  for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- OPTIONAL: column-restricted public view (uncomment if you ever store
-- sensitive columns directly on `projects`). Grants only safe columns to anon.
-- ---------------------------------------------------------------------------
-- create or replace view public.public_projects as
--   select id, title, slug, category, short_description, long_description,
--          role, tools, status, live_url, repo_url, featured, public_visible,
--          year, client_type, problem, process, features, result, accent_color,
--          start_date, launch_date, created_at, updated_at
--   from public.projects
--   where public_visible = true;
-- grant select on public.public_projects to anon, authenticated;
