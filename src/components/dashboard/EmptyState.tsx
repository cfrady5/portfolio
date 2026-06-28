import { Button } from '@/components/public/Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-ink-800/30 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ink-800 text-bone-soft">
        {icon ?? <span className="text-lg">＋</span>}
      </div>
      <h3 className="mt-5 text-base font-semibold text-bone">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-bone-soft">{description}</p>
      )}
      {actionLabel && actionHref && (
        <div className="mt-6">
          <Button href={actionHref} size="sm">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export default EmptyState;
