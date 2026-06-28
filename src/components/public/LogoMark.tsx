import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// LogoMark — the single source of truth for the brand logo across the site.
//
// The mark is the white cursive "frady" on a transparent field. `size` is the
// rendered HEIGHT; width follows LOGO_ASPECT so the wide cursive never squashes.
//
// >>> To swap the logo: replace /public/brand/frady-logo.png and, if your file
//     has a different shape, update LOGO_ASPECT (width / height). Everything —
//     navbar, footer, login, dashboard sidebar, hero animation, contact CTA —
//     reads from here.
// ---------------------------------------------------------------------------
export const LOGO_SRC = '/brand/frady-logo.png';
export const LOGO_ASPECT = 5000 / 2813; // ≈ 1.78 (width / height) of frady-logo.png

interface LogoMarkProps {
  /** Rendered height of the mark in pixels (width follows the logo aspect). */
  size?: number;
  /** Show the "Caleb Frady" wordmark beside the mark. */
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
        width={Math.round(size * LOGO_ASPECT)}
        height={size}
        priority
        className="object-contain"
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
      className={cn('inline-flex focus-ring rounded-md', className)}
    >
      {mark}
    </Link>
  );
}

export default LogoMark;
