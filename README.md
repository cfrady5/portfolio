# Caleb Frady — Portfolio + Private Business Dashboard

A premium personal portfolio, proof-of-work gallery, and lightweight business
operating system for **Caleb Frady**.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS · Supabase**.
Deployment-ready for **Vercel**.

---

## ✨ What's inside

**Public site**
- `/` — premium homepage (hero, featured work, what I build, gallery preview, resume snapshot, tools, positioning, contact CTA)
- `/work` — filterable project gallery with premium cards + placeholder mockups
- `/work/[slug]` — strategic case-study pages
- `/resume` — web resume + PDF download
- `/about` — personal positioning ("I build with my name on it")
- `/contact` — contact form (UI-ready; wire a backend when you like)
- `/login` — admin login

**Private dashboard** (auth-protected under `/dashboard`)
- Overview with summary metrics, recent activity, payments & renewals
- Projects management (filterable table of public + private data)
- Add / edit project forms (public portfolio fields **and** private financials)
- Revenue tracking (MRR/ARR, by project, by client, paid vs unpaid, charts)
- Clients management
- Settings

Private pricing, revenue, client info, and notes **never** appear on public pages.

---

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

> **Preview mode:** Without Supabase env vars, the app runs on local fallback
> data (`src/data/*`) and login goes straight to the dashboard so you can
> preview everything. Add your keys to enforce real auth + persistence.

---

## 🔐 Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql`, then `supabase/seed.sql`.
3. Copy `.env.example` → `.env.local` and fill in:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...        # server-only, never exposed
   ```

4. Create your admin user in **Authentication → Users**.
5. (Optional) Restrict the dashboard to specific emails with
   `NEXT_PUBLIC_ADMIN_EMAILS=you@example.com` and tighten the RLS admin
   policies (see comments in `schema.sql`).

The data layer lives behind `src/data/index.ts` — swap the function bodies from
local data to Supabase queries without touching components (TODOs included).

---

## 🖼 Replace the placeholders

| Asset | Where | How |
| --- | --- | --- |
| **Logo** | `public/brand/frady-logo.png` | Add your PNG, set `LOGO_SRC` in `src/components/public/LogoMark.tsx`. Feeds the whole site. |
| **Resume PDF** | `public/resume/Caleb-Frady-Resume.pdf` | Replace the placeholder file. |
| **Screenshots** | `public/projects/` | Add images, reference paths in project data / `project_screenshots`. |
| **Resume content** | `src/data/resume.ts` | Edit text. |
| **Projects** | `src/data/projects.ts` or Supabase | Add/edit projects. |
| **LinkedIn / email / contact backend** | search for `TODO` | Marked inline. |

---

## 🎨 Design system

- **Palette:** near-black backgrounds, off-white (`bone`) text, muted green
  (`moss`) accent, hairline borders. Defined in `tailwind.config.ts`.
- **Components:** reusable public + dashboard components in `src/components`.
- Respects `prefers-reduced-motion`, uses semantic HTML and visible focus rings.

---

## 📦 Deploy to Vercel

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the env vars from `.env.example`.
4. Deploy. The OG image and favicon generate automatically.

---

## 🗂 Project structure

```
src/
  app/            # routes (public + /dashboard)
  components/
    public/       # Navbar, Hero, ProjectCard, CaseStudyLayout, …
    dashboard/    # DashboardShell, ProjectTable, ProjectForm, RevenueChart, …
  data/           # local fallback data + dashboard metric computation
  lib/            # supabase clients, auth guard, formatters, utils
  types/          # shared TypeScript types
supabase/
  schema.sql      # tables, indexes, RLS policies
  seed.sql        # clients + projects + placeholder financials
public/
  brand/          # logo
  resume/         # resume PDF
  projects/       # screenshots
```

Built with clarity. Designed to earn trust. Built with my name on it.
