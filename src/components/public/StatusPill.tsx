import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/types';

const styles: Record<string, string> = {
  Active: 'bg-moss/15 text-moss-400 border-moss/25',
  'In Progress': 'bg-amber-400/10 text-amber-300/90 border-amber-400/20',
  Completed: 'bg-sky-400/10 text-sky-300/90 border-sky-400/20',
  Concept: 'bg-bone/5 text-bone-soft border-line',
  Paused: 'bg-bone/5 text-bone-soft border-line',
  Lead: 'bg-violet-400/10 text-violet-300/90 border-violet-400/20',
  'Needs Update': 'bg-rose-400/10 text-rose-300/90 border-rose-400/20',
};

export function StatusPill({
  status,
  className,
}: {
  status: ProjectStatus | string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
        styles[status] ?? 'bg-bone/5 text-bone-soft border-line',
        className,
      )}
    >
      {status}
    </span>
  );
}

export default StatusPill;
