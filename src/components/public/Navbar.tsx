'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoMark } from './LogoMark';
import { Button } from './Button';
import { cn } from '@/lib/utils';

const links = [
  { href: '/work', label: 'Work' },
  { href: '/resume', label: 'Resume' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink-950/80 backdrop-blur-md">
      <nav className="container-x flex h-16 items-center justify-between">
        <LogoMark size={36} withWordmark />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition-colors focus-ring',
                  active
                    ? 'text-bone'
                    : 'text-bone-soft hover:text-bone',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm text-bone-soft transition-colors hover:text-bone focus-ring rounded-full px-3 py-2"
          >
            Login
          </Link>
          <Button href="/contact" size="sm">
            Work With Me
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-bone md:hidden focus-ring"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={cn(
                'h-px w-5 bg-bone transition-transform',
                open && 'translate-y-[3px] rotate-45',
              )}
            />
            <span
              className={cn(
                'h-px w-5 bg-bone transition-transform',
                open && '-translate-y-[3px] -rotate-45',
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-ink-950 md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm text-bone-soft hover:bg-bone/5 hover:text-bone"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm text-bone-soft hover:bg-bone/5 hover:text-bone"
            >
              Login
            </Link>
            <div className="pt-2">
              <Button href="/contact" size="sm" className="w-full">
                Work With Me
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
