import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
  className?: string;
}

export function StatCard({ label, value, hint, accent, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-ink-800/50 p-5',
        accent ? 'border-moss/25 bg-moss/[0.04]' : 'border-line',
        className,
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-bone-soft/70">
        {label}
      </p>
      <p
        className={cn(
          'mt-2 text-2xl font-semibold tracking-tight',
          accent ? 'text-moss-400' : 'text-bone',
        )}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-bone-soft/70">{hint}</p>}
    </div>
  );
}

export default StatCard;
