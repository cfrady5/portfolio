import { cn } from '@/lib/utils';

const tones: Record<string, string> = {
  // Project statuses
  Active: 'bg-moss/15 text-moss-400 border-moss/25',
  'In Progress': 'bg-amber-400/10 text-amber-300/90 border-amber-400/20',
  Completed: 'bg-sky-400/10 text-sky-300/90 border-sky-400/20',
  Concept: 'bg-bone/5 text-bone-soft border-line',
  Paused: 'bg-zinc-400/10 text-zinc-300/80 border-zinc-400/15',
  Lead: 'bg-violet-400/10 text-violet-300/90 border-violet-400/20',
  'Needs Update': 'bg-rose-400/10 text-rose-300/90 border-rose-400/20',
  // Payment statuses
  'Paid in Full': 'bg-moss/15 text-moss-400 border-moss/25',
  'Deposit Paid': 'bg-amber-400/10 text-amber-300/90 border-amber-400/20',
  'Partially Paid': 'bg-amber-400/10 text-amber-300/90 border-amber-400/20',
  Unpaid: 'bg-rose-400/10 text-rose-300/90 border-rose-400/20',
  Recurring: 'bg-sky-400/10 text-sky-300/90 border-sky-400/20',
  'N/A': 'bg-bone/5 text-bone-soft/70 border-line',
  // Contract statuses
  Signed: 'bg-moss/15 text-moss-400 border-moss/25',
  Sent: 'bg-amber-400/10 text-amber-300/90 border-amber-400/20',
  Draft: 'bg-bone/5 text-bone-soft border-line',
  None: 'bg-bone/5 text-bone-soft/70 border-line',
  Complete: 'bg-sky-400/10 text-sky-300/90 border-sky-400/20',
  // Priorities
  High: 'bg-rose-400/10 text-rose-300/90 border-rose-400/20',
  Medium: 'bg-amber-400/10 text-amber-300/90 border-amber-400/20',
  Low: 'bg-bone/5 text-bone-soft border-line',
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
        tones[status] ?? 'bg-bone/5 text-bone-soft border-line',
        className,
      )}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
