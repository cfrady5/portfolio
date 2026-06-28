'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoMark } from '@/components/public/LogoMark';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/dashboard', label: 'Overview', exact: true },
  { href: '/dashboard/projects', label: 'Projects' },
  { href: '/dashboard/revenue', label: 'Revenue' },
  { href: '/dashboard/clients', label: 'Clients' },
  { href: '/dashboard/settings', label: 'Settings' },
];

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-line bg-ink-900">
      <div className="flex h-16 items-center border-b border-line px-6">
        {/* Dashboard sidebar branding */}
        <LogoMark size={32} withWordmark href="/dashboard" />
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {nav.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'rounded-lg px-3 py-2.5 text-sm transition-colors focus-ring',
                active
                  ? 'bg-bone/[0.06] text-bone'
                  : 'text-bone-soft hover:bg-bone/[0.03] hover:text-bone',
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-line p-4">
        <Link
          href="/"
          className="block rounded-lg px-3 py-2.5 text-sm text-bone-soft transition-colors hover:bg-bone/[0.03] hover:text-bone focus-ring"
        >
          ← View public site
        </Link>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
