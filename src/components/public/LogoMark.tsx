import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// LogoMark — the single source of truth for the brand logo across the site.
//
// >>> To use your real logo: drop /public/brand/frady-logo.png and change
//     LOGO_SRC below to '/brand/frady-logo.png'. That's it — navbar, footer,
//     login, dashboard sidebar, hero, and contact CTA all read from here.
// ---------------------------------------------------------------------------
export const LOGO_SRC = '/brand/frady-logo.svg';

interface LogoMarkProps {
  /** Pixel size of the circular mark. */
  size?: number;
  /** Show the "Caleb Frady" wordmark beside the circle. */
  withWordmark?: boolean;
  /** Wrap in a link to a destination (defaults to '/'). Pass null to disable. */
  href?: string | null;
  className?: string;
  /** Wordmark sub-label override. */
  label?: string;
}

export function LogoMark({
  size = 40,
  withWordmark = false,
  href = '/',
  className,
  label = 'Portfolio',
}: LogoMarkProps) {
  const mark = (
    <span className="inline-flex items-center gap-3">
      <Image
        src={LOGO_SRC}
        alt="Caleb Frady logo"
        width={size}
        height={size}
        priority
        className="rounded-full"
        style={{ width: size, height: size }}
      />
      {withWordmark && (
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight text-bone">
            Caleb Frady
          </span>
          <span className="text-[11px] uppercase tracking-[0.16em] text-moss">
            {label}
          </span>
        </span>
      )}
    </span>
  );

  if (href === null) {
    return <span className={cn('inline-flex', className)}>{mark}</span>;
  }

  return (
    <Link
      href={href}
      aria-label="Caleb Frady — home"
      className={cn('inline-flex focus-ring rounded-full', className)}
    >
      {mark}
    </Link>
  );
}

export default LogoMark;
