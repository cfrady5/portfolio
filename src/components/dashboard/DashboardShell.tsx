'use client';

import { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { cn } from '@/lib/utils';

interface DashboardShellProps {
  title: string;
  subtitle?: string;
  userEmail?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardShell({
  title,
  subtitle,
  userEmail,
  action,
  children,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-ink-950">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-0 h-screen">
          <DashboardSidebar />
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-0 h-full">
            <DashboardSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          title={title}
          subtitle={subtitle}
          userEmail={userEmail}
          action={action}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className={cn('flex-1 p-4 sm:p-6 lg:p-8')}>{children}</main>
      </div>
    </div>
  );
}

export default DashboardShell;
