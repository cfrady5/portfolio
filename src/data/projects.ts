import type { Project } from '@/types';

// ---------------------------------------------------------------------------
// Local fallback project data.
// Used when Supabase is not configured yet. The shape matches the Supabase
// schema so you can switch data sources without touching components.
//
// PRIVATE financial values live under `financials` and are ONLY ever read by
// dashboard code — public pages never reference them.
//
// To add a new project built with Claude: copy a block, change the fields,
// give it a unique `slug`, set `public_visible`/`featured`, drop screenshots
// in /public/projects and reference them under `screenshots`.
// ---------------------------------------------------------------------------

const now = '2026-01-15T00:00:00.000Z';

export const projects: Project[] = [
  {
    id: 'p-frames-by-frady',
    client_id: null,
    title: 'Personal Portfolio',
    slug: 'frames-by-frady',
    category: 'Websites',
    short_description:
      'My personal portfolio and proof-of-work site — a place to show the websites, apps, and brands I have built, many of them with Claude.',
    long_description:
      'This is my personal portfolio: a fast, minimal site built to show my work clearly and let it speak for itself. It pairs strategy, story, and execution — the same approach I bring to every build — into one place that makes it easy to see what I make and how I think, backed by a private dashboard for managing projects behind the scenes.',
    role: 'Designer, developer, copywriter',
    tools: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'Vercel', 'Claude'],
    status: 'Active',
    live_url: 'https://framesbyfrady.com',
    repo_url: null,
    featured: true,
    public_visible: true,
    year: '2026',
    client_type: 'Personal',
    problem:
      'I needed one credible home for my work — a place that shows the range of what I build, reads clearly to anyone who lands on it, and is easy to keep current as I ship more.',
    process: [
      'Defined what the work should say about how I think and build',
      'Structured the site around proof of work: clear value, then the projects',
      'Designed a premium, minimal interface system with the cursive mark as the focal point',
      'Wrote concise, honest copy that lets the work lead',
      'Built the portfolio and case-study system on Next.js, Tailwind, and Vercel',
      'Added a private Supabase-backed dashboard to manage projects behind the scenes',
    ],
    features: [
      'Premium, minimal design system',
      'Proof-of-work gallery with live previews',
      'Strategic case-study pages',
      'Fast, accessible, SEO-ready build',
      'Private dashboard for managing projects',
    ],
    result:
      'A personal site that communicates capability in seconds and makes my work easy to browse — with a build process and dashboard I reuse across every project.',
    accent_color: '#7c9a76',
    start_date: '2025-09-01',
    launch_date: '2026-01-10',
    renewal_date: null,
    created_at: now,
    updated_at: now,
    screenshots: [
      {
        id: 's-fbf-1',
        project_id: 'p-frames-by-frady',
        image_url: '/projects/frames-by-frady-1.png',
        alt_text: 'Personal portfolio homepage',
        sort_order: 1,
        created_at: now,
      },
    ],
    financials: {
      id: 'f-frames-by-frady',
      project_id: 'p-frames-by-frady',
      initial_build_price: 0,
      deposit_amount: 0,
      final_payment_amount: 0,
      total_project_price: 0,
      monthly_hosting_fee: 0,
      monthly_maintenance_fee: 0,
      monthly_seo_fee: 0,
      monthly_content_fee: 0,
      other_recurring_fee: 0,
      total_monthly_recurring: 0,
      amount_paid_to_date: 0,
      outstanding_balance: 0,
      payment_status: 'N/A',
      contract_status: 'None',
      created_at: now,
      updated_at: now,
    },
    notes: [
      {
        id: 'n-fbf-1',
        project_id: 'p-frames-by-frady',
        note: 'Flagship brand. Use as the proof-of-work anchor for outreach.',
        next_action: 'Add 2 more case studies and a testimonials section',
        priority: 'High',
        created_at: now,
        updated_at: now,
      },
    ],
  },
  {
    id: 'p-thoy-lawncare',
    client_id: 'c-thoy',
    title: 'THOY Lawncare',
    slug: 'thoy-lawncare',
    category: 'Local Business',
    short_description:
      'A local lawncare landing page concept with clean service sections, friendly branding, and conversion-focused calls to action.',
    long_description:
      'THOY Lawncare is a local-service landing page concept designed to turn neighborhood word-of-mouth into booked jobs. The page leads with the services people actually search for, makes pricing and contact frictionless, and uses friendly, grounded branding that feels like a real local crew you can call today.',
    role: 'Designer, developer, brand direction',
    tools: ['HTML', 'CSS', 'Animation concepts', 'Claude'],
    status: 'In Progress',
    live_url: null,
    repo_url: null,
    featured: true,
    public_visible: true,
    year: '2025',
    client_type: 'Local Service',
    problem:
      'Local service businesses lose jobs because customers cannot quickly see what they offer, whether they serve their area, or how to book. A flyer or Facebook page is not enough to earn trust.',
    process: [
      'Researched how homeowners choose a lawncare provider',
      'Structured the page around services, service area, and a one-tap quote',
      'Designed friendly, trustworthy local branding',
      'Wrote plainspoken copy that answers buying questions',
      'Built responsive sections with subtle motion',
      'Prepared the page for an easy quote-form connection',
    ],
    features: [
      'Service grid with clear descriptions',
      'Click-to-call and quote request CTAs',
      'Service-area and trust section',
      'Seasonal promo banner slot',
      'Mobile-first layout',
    ],
    result:
      'A landing page that makes a local crew look established and easy to hire, turning casual interest into booked estimates.',
    accent_color: '#6f9c5a',
    start_date: '2025-05-01',
    launch_date: null,
    renewal_date: null,
    created_at: now,
    updated_at: now,
    screenshots: [
      {
        id: 's-thoy-1',
        project_id: 'p-thoy-lawncare',
        image_url: '/projects/thoy-lawncare-1.png',
        alt_text: 'THOY Lawncare landing page hero',
        sort_order: 1,
        created_at: now,
      },
    ],
    financials: {
      id: 'f-thoy',
      project_id: 'p-thoy-lawncare',
      initial_build_price: 1200,
      deposit_amount: 400,
      final_payment_amount: 800,
      total_project_price: 1200,
      monthly_hosting_fee: 25,
      monthly_maintenance_fee: 40,
      monthly_seo_fee: 0,
      monthly_content_fee: 0,
      other_recurring_fee: 0,
      total_monthly_recurring: 65,
      amount_paid_to_date: 400,
      outstanding_balance: 800,
      payment_status: 'Deposit Paid',
      contract_status: 'Signed',
      created_at: now,
      updated_at: now,
    },
    notes: [
      {
        id: 'n-thoy-1',
        project_id: 'p-thoy-lawncare',
        note: 'Waiting on final logo direction and service photos.',
        next_action: 'Collect 6 job photos, finalize quote form',
        priority: 'Medium',
        created_at: now,
        updated_at: now,
      },
    ],
  },
  {
    id: 'p-ari-website',
    client_id: 'c-ari',
    title: 'Applied Research Institute — Website Concepts',
    slug: 'ari-website-concepts',
    category: 'ARI / Innovation Ecosystem',
    short_description:
      'Professional website concepts and page systems for innovation, government, and research-focused audiences.',
    long_description:
      'A set of website concepts and reusable page systems for the Applied Research Institute, built to communicate complex innovation and research work to government, industry, and academic audiences. The work focuses on clear information architecture, credible visual language, and content systems that internal teams can maintain.',
    role: 'Designer, frontend builder, content strategist',
    tools: ['HTML', 'CSS', 'JavaScript', 'Claude'],
    status: 'Concept',
    live_url: null,
    repo_url: null,
    featured: true,
    public_visible: true,
    year: '2025',
    client_type: 'Research Organization',
    problem:
      'Research organizations do mission-critical work that is hard for outside audiences to understand. Dense, jargon-heavy pages bury the value and make partnership feel inaccessible.',
    process: [
      'Researched government, industry, and academic audiences',
      'Mapped a clear content hierarchy from mission to programs to engagement',
      'Designed a credible, institutional visual system',
      'Refined copy to translate complex work into plain value',
      'Built modular page components for reuse across sections',
      'Documented the system for internal handoff',
    ],
    features: [
      'Modular program and capability pages',
      'Clear lab-to-impact narrative structure',
      'Credible institutional design language',
      'Reusable content components',
      'Accessibility-minded layouts',
    ],
    result:
      'Concepts that make a complex research organization legible and partnership-ready, with a content system the team can extend.',
    accent_color: '#5b7fa6',
    start_date: '2025-02-01',
    launch_date: null,
    renewal_date: null,
    created_at: now,
    updated_at: now,
    screenshots: [
      {
        id: 's-ari-1',
        project_id: 'p-ari-website',
        image_url: '/projects/ari-website-1.png',
        alt_text: 'ARI website concept page system',
        sort_order: 1,
        created_at: now,
      },
    ],
    financials: {
      id: 'f-ari',
      project_id: 'p-ari-website',
      initial_build_price: 0,
      deposit_amount: 0,
      final_payment_amount: 0,
      total_project_price: 0,
      monthly_hosting_fee: 0,
      monthly_maintenance_fee: 0,
      monthly_seo_fee: 0,
      monthly_content_fee: 0,
      other_recurring_fee: 0,
      total_monthly_recurring: 0,
      amount_paid_to_date: 0,
      outstanding_balance: 0,
      payment_status: 'N/A',
      contract_status: 'None',
      created_at: now,
      updated_at: now,
    },
    notes: [
      {
        id: 'n-ari-1',
        project_id: 'p-ari-website',
        note: 'Internal work tied to ARI role. Keep public framing high-level.',
        next_action: 'Select 3 concepts safe to show publicly',
        priority: 'Medium',
        created_at: now,
        updated_at: now,
      },
    ],
  },
  {
    id: 'p-dow-scitechconnect',
    client_id: 'c-ari',
    title: 'DoW SciTechCONNECT',
    slug: 'dow-scitechconnect',
    category: 'ARI / Innovation Ecosystem',
    short_description:
      'A Higher Logic web experience for a Department of War innovation ecosystem, mapping the pathway from lab to mission impact.',
    long_description:
      'SciTechCONNECT is a web experience for a Department of War innovation ecosystem, built to help researchers, government, industry, and academia understand how science and technology move from the lab to real mission impact. The work translates a complex, multi-stakeholder ecosystem into a clear, navigable journey.',
    role: 'Designer, frontend/CSS builder, content structure',
    tools: ['Higher Logic', 'HTML', 'CSS', 'Claude'],
    status: 'In Progress',
    live_url: null,
    repo_url: null,
    featured: true,
    public_visible: true,
    year: '2026',
    client_type: 'Government / Defense',
    problem:
      'A multi-stakeholder innovation ecosystem is easy to get lost in. Without a clear pathway, researchers and partners cannot see where they fit or how to engage, slowing the route from lab to mission.',
    process: [
      'Mapped the lab-to-mission pathway and stakeholder roles',
      'Structured the experience around clear entry points per audience',
      'Designed within Higher Logic constraints with custom CSS',
      'Organized content so each audience finds its next step',
      'Built and refined responsive layouts and components',
      'Iterated with stakeholders toward launch',
    ],
    features: [
      'Audience-specific entry points',
      'Lab-to-mission pathway visualization',
      'Custom CSS within a Higher Logic platform',
      'Structured resource and program sections',
      'Responsive, accessible layouts',
    ],
    result:
      'A clearer ecosystem experience that helps each audience understand the pathway and find their next step toward mission impact.',
    accent_color: '#3f6f8f',
    start_date: '2025-10-01',
    launch_date: null,
    renewal_date: null,
    created_at: now,
    updated_at: now,
    screenshots: [
      {
        id: 's-stc-1',
        project_id: 'p-dow-scitechconnect',
        image_url: '/projects/dow-scitechconnect-1.png',
        alt_text: 'SciTechCONNECT ecosystem pathway',
        sort_order: 1,
        created_at: now,
      },
    ],
    financials: {
      id: 'f-stc',
      project_id: 'p-dow-scitechconnect',
      initial_build_price: 0,
      deposit_amount: 0,
      final_payment_amount: 0,
      total_project_price: 0,
      monthly_hosting_fee: 0,
      monthly_maintenance_fee: 0,
      monthly_seo_fee: 0,
      monthly_content_fee: 0,
      other_recurring_fee: 0,
      total_monthly_recurring: 0,
      amount_paid_to_date: 0,
      outstanding_balance: 0,
      payment_status: 'N/A',
      contract_status: 'None',
      created_at: now,
      updated_at: now,
    },
    notes: [
      {
        id: 'n-stc-1',
        project_id: 'p-dow-scitechconnect',
        note: 'Internal/role work. Confirm what is approved for public display.',
        next_action: 'Get approval for public screenshots',
        priority: 'High',
        created_at: now,
        updated_at: now,
      },
    ],
  },
  {
    id: 'p-ram',
    client_id: 'c-ari',
    title: 'RAM — Rapid Acquisition Model',
    slug: 'ram-rapid-acquisition-model',
    category: 'Government / Defense',
    short_description:
      'A formal web presence for the Rapid Acquisition Model, communicating acquisition value, marketplace access, and mission relevance.',
    long_description:
      'A formal web presence for the Rapid Acquisition Model (RAM), designed to communicate how the model accelerates acquisition, opens marketplace access, and stays relevant to mission needs. The site gives a serious government audience a clear, credible explanation of value and a path to participate.',
    role: 'Designer, site strategist, Wix/HTML builder',
    tools: ['Wix Studio', 'HTML', 'CSS', 'Claude'],
    status: 'In Progress',
    live_url: null,
    repo_url: null,
    featured: true,
    public_visible: true,
    year: '2026',
    client_type: 'Government / Defense',
    problem:
      'A new acquisition model needs to earn institutional trust fast. Without a clear, formal web presence, decision-makers cannot quickly grasp the value or how to engage.',
    process: [
      'Researched the acquisition audience and their decision criteria',
      'Structured the site around value, access, and mission relevance',
      'Designed a formal, credible visual system in Wix Studio',
      'Wrote precise copy suited to a government audience',
      'Built responsive pages with custom HTML/CSS where needed',
      'Prepared the site for stakeholder review and launch',
    ],
    features: [
      'Clear value and access narrative',
      'Formal, institutional design language',
      'Marketplace and participation pathways',
      'Responsive Wix Studio build',
      'Custom styling for a polished finish',
    ],
    result:
      'A formal, trustworthy presence that helps a government audience understand the model and see a clear path to engage.',
    accent_color: '#4a5d7e',
    start_date: '2025-11-01',
    launch_date: null,
    renewal_date: null,
    created_at: now,
    updated_at: now,
    screenshots: [
      {
        id: 's-ram-1',
        project_id: 'p-ram',
        image_url: '/projects/ram-1.png',
        alt_text: 'RAM acquisition model homepage',
        sort_order: 1,
        created_at: now,
      },
    ],
    financials: {
      id: 'f-ram',
      project_id: 'p-ram',
      initial_build_price: 0,
      deposit_amount: 0,
      final_payment_amount: 0,
      total_project_price: 0,
      monthly_hosting_fee: 0,
      monthly_maintenance_fee: 0,
      monthly_seo_fee: 0,
      monthly_content_fee: 0,
      other_recurring_fee: 0,
      total_monthly_recurring: 0,
      amount_paid_to_date: 0,
      outstanding_balance: 0,
      payment_status: 'N/A',
      contract_status: 'None',
      created_at: now,
      updated_at: now,
    },
    notes: [
      {
        id: 'n-ram-1',
        project_id: 'p-ram',
        note: 'Wix Studio build. Keep public copy high-level and approved.',
        next_action: 'Finalize participation section copy',
        priority: 'Medium',
        created_at: now,
        updated_at: now,
      },
    ],
  },
  {
    id: 'p-heartland-bioworks',
    client_id: 'c-heartland',
    title: 'Heartland BioWorks',
    slug: 'heartland-bioworks',
    category: 'CMS / Systems',
    short_description:
      'A rebuilt web structure for Heartland BioWorks with programs, events, news, media, team, and FAQ pages plus CMS planning.',
    long_description:
      'A rebuilt web structure for Heartland BioWorks, organizing programs, events, news, media, team, and FAQs into a coherent, maintainable system. The work pairs a clean front-end with deliberate CMS planning so the team can publish and update content without a developer in the loop.',
    role: 'Designer, CMS planner, frontend builder',
    tools: ['Wix Studio', 'Supabase planning', 'Claude'],
    status: 'In Progress',
    live_url: null,
    repo_url: null,
    featured: true,
    public_visible: true,
    year: '2026',
    client_type: 'Biotech',
    problem:
      'A growing biotech initiative had scattered content and no clear structure, making the site hard to navigate and harder to keep current.',
    process: [
      'Audited existing content and audience needs',
      'Designed an information architecture across programs, events, news, and media',
      'Planned CMS collections so content is reusable and editable',
      'Designed clean, credible page templates',
      'Built front-end sections and component patterns',
      'Documented the CMS model for the team',
    ],
    features: [
      'Programs, events, news, media, team, and FAQ systems',
      'CMS-driven content collections',
      'Reusable page templates',
      'Clear navigation and IA',
      'Maintainable handoff documentation',
    ],
    result:
      'A coherent, maintainable site structure that the team can keep current — turning scattered content into a clear, credible web presence.',
    accent_color: '#5a8f7b',
    start_date: '2025-09-15',
    launch_date: null,
    renewal_date: '2026-09-15',
    created_at: now,
    updated_at: now,
    screenshots: [
      {
        id: 's-hbw-1',
        project_id: 'p-heartland-bioworks',
        image_url: '/projects/heartland-bioworks-1.png',
        alt_text: 'Heartland BioWorks programs page',
        sort_order: 1,
        created_at: now,
      },
    ],
    financials: {
      id: 'f-hbw',
      project_id: 'p-heartland-bioworks',
      initial_build_price: 4500,
      deposit_amount: 1500,
      final_payment_amount: 3000,
      total_project_price: 4500,
      monthly_hosting_fee: 35,
      monthly_maintenance_fee: 120,
      monthly_seo_fee: 150,
      monthly_content_fee: 200,
      other_recurring_fee: 0,
      total_monthly_recurring: 505,
      amount_paid_to_date: 1500,
      outstanding_balance: 3000,
      payment_status: 'Deposit Paid',
      contract_status: 'Signed',
      created_at: now,
      updated_at: now,
    },
    notes: [
      {
        id: 'n-hbw-1',
        project_id: 'p-heartland-bioworks',
        note: 'CMS collections drafted. Renewal set ~1yr from launch.',
        next_action: 'Migrate news + media content into CMS',
        priority: 'High',
        created_at: now,
        updated_at: now,
      },
    ],
  },
  {
    id: 'p-bulk',
    client_id: null,
    title: 'Bulk',
    slug: 'bulk',
    category: 'Apps',
    short_description:
      'A mobile app concept for bulk sports-card listing — photo intake, item review, CSV generation, and marketplace efficiency.',
    long_description:
      'Bulk is a mobile app concept that streamlines the tedious work of listing sports cards at scale. It is built around a fast photo-intake flow, a quick item review step, automatic CSV generation, and a path to marketplace listing — turning hours of manual entry into a smooth, repeatable workflow.',
    role: 'Product designer, app strategist, brand direction',
    tools: ['Claude', 'Mobile UI concepts', 'Workflow design'],
    status: 'Concept',
    live_url: null,
    repo_url: null,
    featured: true,
    public_visible: true,
    year: '2025',
    client_type: 'Product Concept',
    problem:
      'Listing sports cards in volume is slow and error-prone. Sellers waste hours photographing, entering details, and formatting data for marketplaces.',
    process: [
      'Mapped the end-to-end bulk listing workflow',
      'Identified the slowest, most error-prone steps',
      'Designed a fast photo-intake and review flow',
      'Planned automatic CSV generation for marketplaces',
      'Designed a clean, focused mobile UI',
      'Defined the product brand and positioning',
    ],
    features: [
      'Rapid photo intake',
      'Quick item review and edit',
      'Automatic CSV generation',
      'Marketplace-ready exports',
      'Focused, efficient mobile UI',
    ],
    result:
      'A product concept that could collapse hours of manual listing into a fast, repeatable workflow — designed for real seller efficiency.',
    accent_color: '#c08a3e',
    start_date: '2025-04-01',
    launch_date: null,
    renewal_date: null,
    created_at: now,
    updated_at: now,
    screenshots: [
      {
        id: 's-bulk-1',
        project_id: 'p-bulk',
        image_url: '/projects/bulk-1.png',
        alt_text: 'Bulk app intake screen concept',
        sort_order: 1,
        created_at: now,
      },
    ],
    financials: {
      id: 'f-bulk',
      project_id: 'p-bulk',
      initial_build_price: 0,
      deposit_amount: 0,
      final_payment_amount: 0,
      total_project_price: 0,
      monthly_hosting_fee: 0,
      monthly_maintenance_fee: 0,
      monthly_seo_fee: 0,
      monthly_content_fee: 0,
      other_recurring_fee: 0,
      total_monthly_recurring: 0,
      amount_paid_to_date: 0,
      outstanding_balance: 0,
      payment_status: 'N/A',
      contract_status: 'None',
      created_at: now,
      updated_at: now,
    },
    notes: [
      {
        id: 'n-bulk-1',
        project_id: 'p-bulk',
        note: 'Strong portfolio piece for product thinking.',
        next_action: 'Build a clickable prototype of the intake flow',
        priority: 'Medium',
        created_at: now,
        updated_at: now,
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// GitHub repo URLs.
// Maps each project slug to its REAL repository on github.com/cfrady5.
// These also feed the live screenshot preview when a project has no live_url.
//
//   string  -> link to this repo
//   null    -> no repo (hosted platform / concept) -> keep gradient mockup
//   (unset) -> fall back to https://github.com/<GH_OWNER>/<slug>
// ---------------------------------------------------------------------------
export const GH_OWNER = 'cfrady5';

const REPOS: Record<string, string | null> = {
  'frames-by-frady': `https://github.com/${GH_OWNER}/frames-by-frady`,
  'thoy-lawncare': `https://github.com/${GH_OWNER}/THOY-lawncare`,
  'ari-website-concepts': `https://github.com/${GH_OWNER}/ARI`,
  'dow-scitechconnect': `https://github.com/${GH_OWNER}/SciTech-Connect`,
  'ram-rapid-acquisition-model': `https://github.com/${GH_OWNER}/RAM`,
  'heartland-bioworks': `https://github.com/${GH_OWNER}/HeartlandBioworks`,
  'bulk': `https://github.com/${GH_OWNER}/bulk`,
};

// Live GitHub Pages URLs — the deployed sites. These become each project's
// live_url, so the preview screenshots the RENDERED page (not the repo).
// Only fills in projects that don't already have a live_url (e.g. the
// portfolio itself keeps its custom domain). Trailing slash matters for Pages.
const PAGES: Record<string, string> = {
  'thoy-lawncare': `https://${GH_OWNER}.github.io/THOY-lawncare/`,
  'ari-website-concepts': `https://${GH_OWNER}.github.io/ARI/`,
  'dow-scitechconnect': `https://${GH_OWNER}.github.io/SciTech-Connect/`,
  'ram-rapid-acquisition-model': `https://${GH_OWNER}.github.io/RAM/`,
  'heartland-bioworks': `https://${GH_OWNER}.github.io/HeartlandBioworks/`,
  'bulk': `https://${GH_OWNER}.github.io/bulk/`,
};

for (const p of projects) {
  const mapped = REPOS[p.slug];
  if (mapped !== undefined) {
    p.repo_url = mapped;
  } else if (!p.repo_url) {
    p.repo_url = `https://github.com/${GH_OWNER}/${p.slug}`;
  }

  if (!p.live_url && PAGES[p.slug]) {
    p.live_url = PAGES[p.slug];
  }
}

// ---------------------------------------------------------------------------
// Public-safe selectors. These strip private data before it reaches the
// public site. The data layer (src/data/index.ts) uses these.
// ---------------------------------------------------------------------------

/** Strip private fields (financials, notes, client) for public rendering. */
export function toPublicProject(p: Project): Project {
  const { financials, notes, client, ...rest } = p;
  return rest as Project;
}

export const publicProjects: Project[] = projects
  .filter((p) => p.public_visible)
  .map(toPublicProject);

export const featuredProjects: Project[] = publicProjects.filter(
  (p) => p.featured,
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getPublicProjectBySlug(slug: string): Project | undefined {
  const p = projects.find((x) => x.slug === slug && x.public_visible);
  return p ? toPublicProject(p) : undefined;
}
