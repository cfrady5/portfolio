import { cn } from '@/lib/utils';

export function SkillPill({
  children,
  accent = false,
  className,
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm transition-colors',
        accent
          ? 'border-moss/30 bg-moss/10 text-moss-400'
          : 'border-line bg-bone/[0.03] text-bone-soft hover:text-bone',
        className,
      )}
    >
      {children}
    </span>
  );
}

export default SkillPill;
