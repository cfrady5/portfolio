import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary: 'bg-moss text-ink-950 hover:bg-moss-400',
  secondary:
    'border border-bone/20 text-bone hover:border-bone/40 hover:bg-bone/5',
  ghost: 'text-bone/80 hover:text-bone hover:bg-bone/5',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-7 text-base py-3.5',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonAsButton
  extends CommonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  /** Open in a new tab (adds rel noopener). */
  external?: boolean;
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('href' in props && props.href) {
    const { href, external } = props;
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
