'use client';

import { useRouter } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  userEmail?: string;
  onMenuClick?: () => void;
  action?: React.ReactNode;
}

export function DashboardHeader({
  title,
  subtitle,
  userEmail,
  onMenuClick,
  action,
}: DashboardHeaderProps) {
  const router = useRouter();

  async function signOut() {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase?.auth.signOut();
    }
    router.push('/login');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-line bg-ink-900/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-bone lg:hidden focus-ring"
        >
          <span className="flex flex-col gap-1">
            <span className="h-px w-4 bg-bone" />
            <span className="h-px w-4 bg-bone" />
            <span className="h-px w-4 bg-bone" />
          </span>
        </button>
        <div>
          <h1 className="text-base font-semibold tracking-tight text-bone">
            {title}
          </h1>
          {subtitle && <p className="text-xs text-bone-soft">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {action}
        {userEmail && (
          <span className="hidden text-xs text-bone-soft sm:inline">
            {userEmail}
          </span>
        )}
        <button
          type="button"
          onClick={signOut}
          className="rounded-lg border border-line px-3 py-1.5 text-xs text-bone-soft transition-colors hover:border-bone/20 hover:text-bone focus-ring"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;
