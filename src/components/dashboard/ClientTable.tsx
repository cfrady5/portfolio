'use client';

import { useState } from 'react';
import type { Client, Project } from '@/types';
import { StatusBadge } from './StatusBadge';
import { EmptyState } from './EmptyState';
import { formatCurrency } from '@/lib/formatters';
import { cn } from '@/lib/utils';

interface ClientRow extends Client {
  projectCount: number;
  totalCharged: number;
  monthlyRecurring: number;
}

export function ClientTable({
  clients,
  projects,
}: {
  clients: Client[];
  projects: Project[];
}) {
  const rows: ClientRow[] = clients.map((c) => {
    const cps = projects.filter((p) => p.client_id === c.id);
    return {
      ...c,
      projectCount: cps.length,
      totalCharged: cps.reduce(
        (s, p) => s + (p.financials?.total_project_price ?? 0),
        0,
      ),
      monthlyRecurring: cps.reduce(
        (s, p) => s + (p.financials?.total_monthly_recurring ?? 0),
        0,
      ),
    };
  });

  const [selected, setSelected] = useState<ClientRow | null>(rows[0] ?? null);

  if (clients.length === 0) {
    return (
      <EmptyState
        title="No clients yet"
        description="Add your first client to start tracking projects, charges, and recurring revenue."
        actionLabel="Add client"
        actionHref="#add-client"
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-line bg-ink-900/60 text-left text-xs uppercase tracking-wider text-bone-soft/70">
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Projects</th>
              <th className="px-4 py-3 text-right font-medium">Charged</th>
              <th className="px-4 py-3 text-right font-medium">MRR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((c) => (
              <tr
                key={c.id}
                onClick={() => setSelected(c)}
                className={cn(
                  'cursor-pointer transition-colors hover:bg-bone/[0.02]',
                  selected?.id === c.id && 'bg-bone/[0.03]',
                )}
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-bone">{c.company}</p>
                  <p className="text-xs text-bone-soft">{c.name}</p>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3 text-right text-bone-soft">
                  {c.projectCount}
                </td>
                <td className="px-4 py-3 text-right text-bone-soft">
                  {formatCurrency(c.totalCharged)}
                </td>
                <td className="px-4 py-3 text-right text-moss-400">
                  {formatCurrency(c.monthlyRecurring)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail / edit preview */}
      <div className="card h-fit p-6">
        {selected ? (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-moss">
                Client detail
              </p>
              <h2 className="mt-1 text-lg font-semibold text-bone">
                {selected.company}
              </h2>
              <p className="text-sm text-bone-soft">{selected.name}</p>
            </div>

            <dl className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-bone-soft">Email</dt>
                <dd className="text-bone">{selected.email || '—'}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-bone-soft">Phone</dt>
                <dd className="text-bone">{selected.phone || '—'}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-bone-soft">Website</dt>
                <dd className="truncate text-bone">{selected.website || '—'}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-bone-soft">Projects</dt>
                <dd className="text-bone">{selected.projectCount}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-bone-soft">Total charged</dt>
                <dd className="text-bone">
                  {formatCurrency(selected.totalCharged)}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-bone-soft">Monthly recurring</dt>
                <dd className="text-moss-400">
                  {formatCurrency(selected.monthlyRecurring)}
                </dd>
              </div>
            </dl>

            {selected.notes && (
              <div className="rounded-lg border border-line bg-ink-900/40 p-3">
                <p className="text-xs uppercase tracking-wider text-bone-soft/60">
                  Notes
                </p>
                <p className="mt-1 text-sm text-bone-soft">{selected.notes}</p>
              </div>
            )}

            <p className="text-xs text-bone-soft/60">
              {/* Connect this to a Supabase update mutation to make it editable. */}
              Editing clients connects to the <code className="text-moss-400">clients</code> table once Supabase is configured.
            </p>
          </div>
        ) : (
          <p className="text-sm text-bone-soft">Select a client to view details.</p>
        )}
      </div>
    </div>
  );
}

export default ClientTable;
