import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag
        className={cn(
          'max-w-2xl text-balance text-3xl font-semibold tracking-tight text-bone sm:text-4xl',
          align === 'center' && 'mx-auto',
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            'max-w-2xl text-pretty text-base leading-relaxed text-bone-soft',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
