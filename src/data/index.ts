// ---------------------------------------------------------------------------
// Data access layer.
// Public pages and the dashboard call these functions. Today they return the
// local fallback data in /src/data. When Supabase is configured, swap the
// bodies to query Supabase (a TODO example is included in each function).
//
// Keeping all data access behind this module means components never change
// when you move from local data to Supabase.
// ---------------------------------------------------------------------------

import type { Client, Project } from '@/types';
import {
  projects as localProjects,
  publicProjects as localPublicProjects,
  featuredProjects as localFeatured,
  getPublicProjectBySlug as localPublicBySlug,
  toPublicProject,
} from './projects';
import { clients as localClients } from './clients';

/** PUBLIC: projects where public_visible = true (private fields stripped). */
export async function getPublicProjects(): Promise<Project[]> {
  // TODO (Supabase): when configured, replace with:
  //   const supabase = createClient();
  //   const { data } = await supabase
  //     .from('projects')
  //     .select('*, screenshots:project_screenshots(*)')
  //     .eq('public_visible', true)
  //     .order('featured', { ascending: false });
  //   return data ?? [];
  return localPublicProjects;
}

/** PUBLIC: featured + public projects (homepage). */
export async function getFeaturedProjects(): Promise<Project[]> {
  return localFeatured;
}

/** PUBLIC: a single public project by slug (private fields stripped). */
export async function getPublicProject(slug: string): Promise<Project | undefined> {
  return localPublicBySlug(slug);
}

/** PRIVATE (dashboard): every project, including financials and notes. */
export async function getAllProjects(): Promise<Project[]> {
  // TODO (Supabase): select projects + project_financials + project_notes.
  return localProjects;
}

/** PRIVATE (dashboard): a single project by id, including private data. */
export async function getProjectById(id: string): Promise<Project | undefined> {
  return localProjects.find((p) => p.id === id);
}

/** PRIVATE (dashboard): all clients. */
export async function getClients(): Promise<Client[]> {
  return localClients;
}

export { toPublicProject };
