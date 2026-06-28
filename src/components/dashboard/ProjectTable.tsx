'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/types';
import { StatusBadge } from './StatusBadge';
import { EmptyState } from './EmptyState';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { cn } from '@/lib/utils';

const FILTERS = [
  'All',
  'Active',
  'Completed',
  'In Progress',
  'Paused',
  'Lead',
  'Needs Update',
  'Awaiting Payment',
  'Public on Portfolio',
  'Hidden from Portfolio',
  'Recurring Revenue',
  'No Recurring Revenue',
] as const;

type Filter = (typeof FILTERS)[number];

function matches(p: Project, filter: Filter): boolean {
  switch (filter) {
    case 'All':
      return true;
    case 'Awaiting Payment':
      return (p.financials?.outstanding_balance ?? 0) > 0;
    case 'Public on Portfolio':
      return p.public_visible;
    case 'Hidden from Portfolio':
      return !p.public_visible;
    case 'Recurring Revenue':
      return (p.financials?.total_monthly_recurring ?? 0) > 0;
    case 'No Recurring Revenue':
      return (p.financials?.total_monthly_recurring ?? 0) === 0;
    default:
      return p.status === filter;
  }
}

export function ProjectTable({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (!matches(p, filter)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          (p.client?.company ?? '').toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [projects, filter, query]);

  return (
    <div className="flex flex-col gap-5">
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, clients, categories…"
          className="w-full max-w-sm rounded-xl border border-line bg-ink-900/60 px-4 py-2.5 text-sm text-bone placeholder:text-bone-soft/50 focus-ring"
        />
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs transition-colors focus-ring',
                filter === f
                  ? 'border-moss/40 bg-moss/15 text-moss-400'
                  : 'border-line text-bone-soft hover:border-bone/20 hover:text-bone',
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No matching projects"
          description="Try a different filter or add a new project."
          actionLabel="Add Project"
          actionHref="/dashboard/projects/new"
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[1100px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line bg-ink-900/60 text-left text-xs uppercase tracking-wider text-bone-soft/70">
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Visibility</th>
                <th className="px-4 py-3 text-right font-medium">Project price</th>
                <th className="px-4 py-3 text-right font-medium">Paid</th>
                <th className="px-4 py-3 text-right font-medium">Outstanding</th>
                <th className="px-4 py-3 text-right font-medium">MRR</th>
                <th className="px-4 py-3 font-medium">Renewal</th>
                <th className="px-4 py-3 font-medium">Next action</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((p) => {
                const f = p.financials;
                const nextAction = p.notes?.[0]?.next_action;
                return (
                  <tr
                    key={p.id}
                    className="transition-colors hover:bg-bone/[0.02]"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/projects/${p.id}/edit`}
                        className="font-medium text-bone hover:text-moss-400"
                      >
                        {p.title}
                      </Link>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        {p.featured && (
                          <span className="text-[10px] uppercase tracking-wider text-moss-400">
                            ★ Featured
                          </span>
                        )}
                        {p.live_url && (
                          <a
                            href={p.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-bone-soft hover:text-bone"
                          >
                            Live ↗
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-bone-soft">
                      {p.client?.company ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-bone-soft">{p.category}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        status={p.public_visible ? 'Active' : 'None'}
                        className="!text-[10px]"
                      />
                      <span className="ml-1 text-xs text-bone-soft">
                        {p.public_visible ? 'Public' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-bone">
                      {formatCurrency(f?.total_project_price)}
                    </td>
                    <td className="px-4 py-3 text-right text-bone-soft">
                      {formatCurrency(f?.amount_paid_to_date)}
                    </td>
                    <td
                      className={cn(
                        'px-4 py-3 text-right',
                        (f?.outstanding_balance ?? 0) > 0
                          ? 'text-rose-300'
                          : 'text-bone-soft',
                      )}
                    >
                      {formatCurrency(f?.outstanding_balance)}
                    </td>
                    <td className="px-4 py-3 text-right text-moss-400">
                      {formatCurrency(f?.total_monthly_recurring)}
                    </td>
                    <td className="px-4 py-3 text-bone-soft">
                      {formatDate(p.renewal_date)}
                    </td>
                    <td className="max-w-[180px] truncate px-4 py-3 text-bone-soft">
                      {nextAction ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/dashboard/projects/${p.id}/edit`}
                        className="text-xs text-bone-soft hover:text-bone"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-bone-soft/60">
        Showing {filtered.length} of {projects.length} projects.
      </p>
    </div>
  );
}

export default ProjectTable;
