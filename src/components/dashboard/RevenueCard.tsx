import { cn } from '@/lib/utils';

interface RevenueCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}

export function RevenueCard({ label, value, sub, accent }: RevenueCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-xl border p-6',
        accent ? 'border-moss/25 bg-moss/[0.05]' : 'border-line bg-ink-800/50',
      )}
    >
      <span className="text-xs font-medium uppercase tracking-wider text-bone-soft/70">
        {label}
      </span>
      <span
        className={cn(
          'text-3xl font-semibold tracking-tight',
          accent ? 'text-moss-400' : 'text-bone',
        )}
      >
        {value}
      </span>
      {sub && <span className="text-xs text-bone-soft/70">{sub}</span>}
    </div>
  );
}

export default RevenueCard;
