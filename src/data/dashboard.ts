import type { Project } from '@/types';
import { projects } from './projects';
import { clients } from './clients';

// ---------------------------------------------------------------------------
// Dashboard metric computation.
// Derives summary numbers from project financials so the dashboard stays in
// sync with the underlying data (local fallback or Supabase).
// ---------------------------------------------------------------------------

export interface DashboardSummary {
  totalProjects: number;
  activeClientWebsites: number;
  completedWebsites: number;
  totalOneTimeRevenue: number;
  monthlyRecurringRevenue: number;
  annualizedRecurringRevenue: number;
  outstandingBalances: number;
  averageProjectValue: number;
  averageMonthlyRetainer: number;
  projectsNeedingUpdates: number;
  upcomingRenewals: number;
  totalClients: number;
}

export function computeSummary(items: Project[] = projects): DashboardSummary {
  const withFin = items.filter((p) => p.financials);

  const totalOneTimeRevenue = withFin.reduce(
    (sum, p) => sum + (p.financials?.amount_paid_to_date ?? 0),
    0,
  );

  const monthlyRecurringRevenue = withFin.reduce(
    (sum, p) => sum + (p.financials?.total_monthly_recurring ?? 0),
    0,
  );

  const outstandingBalances = withFin.reduce(
    (sum, p) => sum + (p.financials?.outstanding_balance ?? 0),
    0,
  );

  const paidProjects = withFin.filter(
    (p) => (p.financials?.total_project_price ?? 0) > 0,
  );
  const totalProjectValue = paidProjects.reduce(
    (sum, p) => sum + (p.financials?.total_project_price ?? 0),
    0,
  );

  const retainers = withFin.filter(
    (p) => (p.financials?.total_monthly_recurring ?? 0) > 0,
  );
  const totalRetainerValue = retainers.reduce(
    (sum, p) => sum + (p.financials?.total_monthly_recurring ?? 0),
    0,
  );

  return {
    totalProjects: items.length,
    activeClientWebsites: items.filter(
      (p) => p.status === 'Active' && p.client_id,
    ).length,
    completedWebsites: items.filter((p) => p.status === 'Completed').length,
    totalOneTimeRevenue,
    monthlyRecurringRevenue,
    annualizedRecurringRevenue: monthlyRecurringRevenue * 12,
    outstandingBalances,
    averageProjectValue: paidProjects.length
      ? Math.round(totalProjectValue / paidProjects.length)
      : 0,
    averageMonthlyRetainer: retainers.length
      ? Math.round(totalRetainerValue / retainers.length)
      : 0,
    projectsNeedingUpdates: items.filter((p) => p.status === 'Needs Update')
      .length,
    upcomingRenewals: items.filter((p) => p.renewal_date).length,
    totalClients: clients.length,
  };
}

/** Projects that still have an outstanding balance. */
export function projectsAwaitingPayment(items: Project[] = projects): Project[] {
  return items.filter((p) => (p.financials?.outstanding_balance ?? 0) > 0);
}

/** Projects with a renewal date, soonest first. */
export function projectsWithRenewals(items: Project[] = projects): Project[] {
  return items
    .filter((p) => p.renewal_date)
    .sort(
      (a, b) =>
        new Date(a.renewal_date!).getTime() -
        new Date(b.renewal_date!).getTime(),
    );
}

/** Most recently updated projects. */
export function recentProjects(items: Project[] = projects, limit = 5): Project[] {
  return [...items]
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    )
    .slice(0, limit);
}

/** Flattened recent notes across all projects. */
export function recentNotes(items: Project[] = projects, limit = 5) {
  return items
    .flatMap((p) =>
      (p.notes ?? []).map((n) => ({ ...n, projectTitle: p.title, projectSlug: p.slug })),
    )
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, limit);
}
