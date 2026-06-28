import { formatCurrency } from '@/lib/formatters';

interface ChartRow {
  label: string;
  value: number;
  sublabel?: string;
}

/**
 * Lightweight horizontal bar chart (pure CSS/Tailwind — no chart library).
 * Bars are scaled to the largest value in the set.
 */
export function RevenueChart({
  title,
  rows,
  emptyLabel = 'No data yet.',
}: {
  title: string;
  rows: ChartRow[];
  emptyLabel?: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  const sorted = [...rows].sort((a, b) => b.value - a.value);

  return (
    <section className="card p-6">
      <h2 className="text-sm font-semibold text-bone">{title}</h2>
      {sorted.length === 0 ? (
        <p className="mt-4 text-sm text-bone-soft">{emptyLabel}</p>
      ) : (
        <ul className="mt-5 flex flex-col gap-4">
          {sorted.map((r) => {
            const pct = Math.round((r.value / max) * 100);
            return (
              <li key={r.label} className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate text-bone">{r.label}</span>
                  <span className="shrink-0 font-medium text-bone-soft">
                    {formatCurrency(r.value)}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-ink-700">
                  <div
                    className="h-full rounded-full bg-moss/70"
                    style={{ width: `${Math.max(pct, 2)}%` }}
                  />
                </div>
                {r.sublabel && (
                  <span className="text-xs text-bone-soft/60">{r.sublabel}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default RevenueChart;
