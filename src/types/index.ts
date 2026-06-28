// ---------------------------------------------------------------------------
// Core domain types for Frames by Frady.
// These mirror the Supabase schema in /supabase/schema.sql so the app can
// switch from local fallback data to Supabase cleanly.
// ---------------------------------------------------------------------------

export type ProjectCategory =
  | 'Websites'
  | 'Client Work'
  | 'Concepts'
  | 'Apps'
  | 'Brand Identity'
  | 'ARI / Innovation Ecosystem'
  | 'Local Business'
  | 'Government / Defense'
  | 'CMS / Systems';

export type ProjectStatus =
  | 'Lead'
  | 'In Progress'
  | 'Active'
  | 'Completed'
  | 'Paused'
  | 'Concept'
  | 'Needs Update';

export type PaymentStatus =
  | 'Unpaid'
  | 'Deposit Paid'
  | 'Partially Paid'
  | 'Paid in Full'
  | 'Recurring'
  | 'N/A';

export type ContractStatus =
  | 'None'
  | 'Draft'
  | 'Sent'
  | 'Signed'
  | 'Complete';

export type Priority = 'Low' | 'Medium' | 'High';

/** Public-facing portfolio fields. Safe to render on the public site. */
export interface Project {
  id: string;
  client_id: string | null;
  title: string;
  slug: string;
  category: ProjectCategory;
  short_description: string;
  long_description: string;
  role: string;
  tools: string[];
  status: ProjectStatus;
  live_url: string | null;
  repo_url: string | null;
  featured: boolean;
  public_visible: boolean;
  year: string;
  client_type: string;
  // Case-study content.
  problem: string;
  process: string[];
  features: string[];
  result: string;
  accent_color: string;
  // Lifecycle dates (public-safe — used for "year"/status context).
  start_date: string | null;
  launch_date: string | null;
  renewal_date: string | null;
  created_at: string;
  updated_at: string;
  // Joined relations (optional — populated by data layer).
  screenshots?: ProjectScreenshot[];
  financials?: ProjectFinancials;
  notes?: ProjectNote[];
  client?: Client | null;
}

/** PRIVATE — never rendered on public pages. Dashboard / Supabase only. */
export interface ProjectFinancials {
  id: string;
  project_id: string;
  initial_build_price: number;
  deposit_amount: number;
  final_payment_amount: number;
  total_project_price: number;
  monthly_hosting_fee: number;
  monthly_maintenance_fee: number;
  monthly_seo_fee: number;
  monthly_content_fee: number;
  other_recurring_fee: number;
  total_monthly_recurring: number;
  amount_paid_to_date: number;
  outstanding_balance: number;
  payment_status: PaymentStatus;
  contract_status: ContractStatus;
  created_at: string;
  updated_at: string;
}

/** PRIVATE — internal notes / next actions. */
export interface ProjectNote {
  id: string;
  project_id: string;
  note: string;
  next_action: string;
  priority: Priority;
  created_at: string;
  updated_at: string;
}

export interface ProjectScreenshot {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
  created_at: string;
}

/** PRIVATE — client records. */
export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  status: 'Lead' | 'Active' | 'Past' | 'Prospect';
  notes: string;
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Resume types
// ---------------------------------------------------------------------------

export interface ResumeExperience {
  role: string;
  organization: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  focus: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  email: string;
  summary: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: Skill[];
  tools: string[];
}

// ---------------------------------------------------------------------------
// Dashboard types
// ---------------------------------------------------------------------------

export interface DashboardMetric {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}
