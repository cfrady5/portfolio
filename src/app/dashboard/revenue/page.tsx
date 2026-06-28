import { requireUser } from '@/lib/auth';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { RevenueCard } from '@/components/dashboard/RevenueCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { getAllProjects, getClients } from '@/data';
import { computeSummary } from '@/data/dashboard';
import { formatCurrency } from '@/lib/formatters';

export default async function RevenuePage() {
  const user = await requireUser();
  const projects = await getAllProjects();
  const clients = await getClients();
  const s = computeSummary(projects);

  // Revenue by project (one-time collected + recurring).
  const byProject = projects
    .filter((p) => p.financials)
    .map((p) => ({
      label: p.title,
      value:
        (p.financials?.amount_paid_to_date ?? 0) +
        (p.financials?.total_monthly_recurring ?? 0) * 12,
      sublabel: `${formatCurrency(
        p.financials?.total_monthly_recurring,
      )}/mo recurring`,
    }))
    .filter((r) => r.value > 0);

  // Revenue by client.
  const byClient = clients
    .map((c) => {
      const cps = projects.filter((p) => p.client_id === c.id && p.financials);
      const value = cps.reduce(
        (sum, p) =>
          sum +
          (p.financials?.amount_paid_to_date ?? 0) +
          (p.financials?.total_monthly_recurring ?? 0) * 12,
        0,
      );
      return { label: c.company, value };
    })
    .filter((r) => r.value > 0);

  const retainers = projects.filter(
    (p) => (p.financials?.total_monthly_recurring ?? 0) > 0,
  );
  const outstanding = projects.filter(
    (p) => (p.financials?.outstanding_balance ?? 0) > 0,
  );

  const bestProject = [...byProject].sort((a, b) => b.value - a.value)[0];

  return (
    <DashboardShell
      title="Revenue"
      subtitle="One-time, recurring, and outstanding"
      userEmail={user.email ?? undefined}
    >
      <div className="flex flex-col gap-8">
        {/* Headline cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <RevenueCard
            label="Total one-time revenue"
            value={formatCurrency(s.totalOneTimeRevenue)}
            sub="Collected to date"
          />
          <RevenueCard
            label="Monthly recurring (MRR)"
            value={formatCurrency(s.monthlyRecurringRevenue)}
            sub={`${retainers.length} active retainers`}
            accent
          />
          <RevenueCard
            label="Annual recurring (ARR)"
            value={formatCurrency(s.annualizedRecurringRevenue)}
            sub="MRR × 12"
          />
          <RevenueCard
            label="Outstanding balances"
            value={formatCurrency(s.outstandingBalances)}
            sub={`${outstanding.length} projects`}
          />
          <RevenueCard
            label="Avg build price"
            value={formatCurrency(s.averageProjectValue)}
          />
          <RevenueCard
            label="Avg monthly retainer"
            value={formatCurrency(s.averageMonthlyRetainer)}
          />
        </div>

        {bestProject && (
          <div className="rounded-xl border border-moss/20 bg-moss/[0.05] px-6 py-4 text-sm text-bone">
            <span className="text-bone-soft">Best project by revenue:</span>{' '}
            <span className="font-semibold">{bestProject.label}</span>{' '}
            <span className="text-moss-400">
              ({formatCurrency(bestProject.value)} est. annual)
            </span>
          </div>
        )}

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RevenueChart title="Revenue by project (est. annual)" rows={byProject} />
          <RevenueChart title="Revenue by client (est. annual)" rows={byClient} />
        </div>

        {/* Paid vs unpaid + retainers table */}
        <section className="card overflow-hidden">
          <div className="border-b border-line px-6 py-4">
            <h2 className="text-sm font-semibold text-bone">
              Paid vs unpaid & active retainers
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-bone-soft/70">
                  <th className="px-6 py-3 font-medium">Project</th>
                  <th className="px-6 py-3 text-right font-medium">Total</th>
                  <th className="px-6 py-3 text-right font-medium">Paid</th>
                  <th className="px-6 py-3 text-right font-medium">Outstanding</th>
                  <th className="px-6 py-3 text-right font-medium">MRR</th>
                  <th className="px-6 py-3 font-medium">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {projects
                  .filter((p) => p.financials)
                  .map((p) => {
                    const f = p.financials!;
                    return (
                      <tr key={p.id} className="hover:bg-bone/[0.02]">
                        <td className="px-6 py-3 font-medium text-bone">
                          {p.title}
                        </td>
                        <td className="px-6 py-3 text-right text-bone-soft">
                          {formatCurrency(f.total_project_price)}
                        </td>
                        <td className="px-6 py-3 text-right text-bone-soft">
                          {formatCurrency(f.amount_paid_to_date)}
                        </td>
                        <td className="px-6 py-3 text-right text-rose-300/90">
                          {f.outstanding_balance > 0
                            ? formatCurrency(f.outstanding_balance)
                            : '—'}
                        </td>
                        <td className="px-6 py-3 text-right text-moss-400">
                          {f.total_monthly_recurring > 0
                            ? formatCurrency(f.total_monthly_recurring)
                            : '—'}
                        </td>
                        <td className="px-6 py-3">
                          <StatusBadge status={f.payment_status} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
