import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { StatCard } from '@/components/dashboard/StatCard';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { Button } from '@/components/public/Button';
import { getAllProjects } from '@/data';
import {
  computeSummary,
  projectsAwaitingPayment,
  projectsWithRenewals,
  recentProjects,
  recentNotes,
} from '@/data/dashboard';
import { formatCurrency, formatDate, daysUntil } from '@/lib/formatters';

const quickActions = [
  { label: 'Add Project', href: '/dashboard/projects/new' },
  { label: 'Add Client', href: '/dashboard/clients' },
  { label: 'View Revenue', href: '/dashboard/revenue' },
  { label: 'View Public Portfolio', href: '/work' },
];

export default async function DashboardOverviewPage() {
  const user = await requireUser();
  const projects = await getAllProjects();
  const s = computeSummary(projects);
  const awaiting = projectsAwaitingPayment(projects);
  const renewals = projectsWithRenewals(projects);
  const recent = recentProjects(projects, 5);
  const notes = recentNotes(projects, 4);

  const metrics = [
    { label: 'Total projects', value: String(s.totalProjects) },
    { label: 'Active client websites', value: String(s.activeClientWebsites) },
    { label: 'Completed websites', value: String(s.completedWebsites) },
    {
      label: 'One-time revenue',
      value: formatCurrency(s.totalOneTimeRevenue),
      hint: 'Collected to date',
    },
    {
      label: 'Monthly recurring',
      value: formatCurrency(s.monthlyRecurringRevenue),
      accent: true,
      hint: 'MRR across retainers',
    },
    {
      label: 'Annual recurring',
      value: formatCurrency(s.annualizedRecurringRevenue),
      hint: 'MRR × 12',
    },
    {
      label: 'Outstanding',
      value: formatCurrency(s.outstandingBalances),
      hint: 'Awaiting payment',
    },
    {
      label: 'Avg project value',
      value: formatCurrency(s.averageProjectValue),
    },
    {
      label: 'Avg monthly retainer',
      value: formatCurrency(s.averageMonthlyRetainer),
    },
    {
      label: 'Needs updates',
      value: String(s.projectsNeedingUpdates),
    },
    {
      label: 'Upcoming renewals',
      value: String(s.upcomingRenewals),
    },
    { label: 'Clients', value: String(s.totalClients) },
  ];

  return (
    <DashboardShell
      title="Overview"
      subtitle="Your business at a glance"
      userEmail={user.email ?? undefined}
      action={
        <Button href="/dashboard/projects/new" size="sm">
          + Add Project
        </Button>
      }
    >
      <div className="flex flex-col gap-8">
        {/* Quick actions */}
        <div className="flex flex-wrap gap-2">
          {quickActions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="rounded-full border border-line bg-ink-800/50 px-4 py-2 text-sm text-bone-soft transition-colors hover:border-bone/20 hover:text-bone focus-ring"
            >
              {a.label}
            </Link>
          ))}
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {metrics.map((m) => (
            <StatCard key={m.label} {...m} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent projects */}
          <section className="card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-bone">Recent projects</h2>
              <Link
                href="/dashboard/projects"
                className="text-xs text-bone-soft hover:text-bone"
              >
                View all →
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {recent.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/dashboard/projects/${p.id}/edit`}
                      className="block truncate text-sm font-medium text-bone hover:text-moss-400"
                    >
                      {p.title}
                    </Link>
                    <p className="truncate text-xs text-bone-soft">
                      {p.client?.company ?? p.client_type} · Updated{' '}
                      {formatDate(p.updated_at)}
                    </p>
                  </div>
                  <StatusBadge status={p.status} />
                </li>
              ))}
            </ul>
          </section>

          {/* Recent notes */}
          <section className="card p-6">
            <h2 className="text-sm font-semibold text-bone">Recent notes</h2>
            <ul className="mt-4 flex flex-col gap-4">
              {notes.length === 0 && (
                <li className="text-sm text-bone-soft">No notes yet.</li>
              )}
              {notes.map((n) => (
                <li key={n.id} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-moss-400">
                      {n.projectTitle}
                    </span>
                    <StatusBadge status={n.priority} />
                  </div>
                  <p className="text-sm text-bone">{n.note}</p>
                  {n.next_action && (
                    <p className="text-xs text-bone-soft">
                      Next: {n.next_action}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Awaiting payment */}
          <section className="card p-6">
            <h2 className="text-sm font-semibold text-bone">
              Projects awaiting payment
            </h2>
            <ul className="mt-4 divide-y divide-line">
              {awaiting.length === 0 && (
                <li className="py-3 text-sm text-bone-soft">
                  Nothing outstanding — all clear.
                </li>
              )}
              {awaiting.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-bone">
                      {p.title}
                    </p>
                    <p className="text-xs text-bone-soft">
                      {p.financials?.payment_status}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-rose-300">
                    {formatCurrency(p.financials?.outstanding_balance)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Upcoming renewals */}
          <section className="card p-6">
            <h2 className="text-sm font-semibold text-bone">Upcoming renewals</h2>
            <ul className="mt-4 divide-y divide-line">
              {renewals.length === 0 && (
                <li className="py-3 text-sm text-bone-soft">
                  No renewals scheduled.
                </li>
              )}
              {renewals.map((p) => {
                const days = daysUntil(p.renewal_date);
                return (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-bone">
                        {p.title}
                      </p>
                      <p className="text-xs text-bone-soft">
                        {formatDate(p.renewal_date)}
                      </p>
                    </div>
                    {days !== null && (
                      <span className="text-xs text-bone-soft">
                        {days >= 0 ? `in ${days}d` : `${Math.abs(days)}d ago`}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
