import { redirect } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';

/**
 * Returns the current authenticated user, or null.
 *
 * NOTE ON DEV MODE:
 * When Supabase is not configured yet (no env vars), this returns a stub admin
 * user so you can preview the entire dashboard locally without auth. As soon as
 * you add your Supabase keys, real authentication is enforced.
 *
 * Tighten admin access in production by checking a custom claim / allow-list —
 * see `isAdmin()` below and the RLS comments in /supabase/schema.sql.
 */
export async function getCurrentUser() {
  if (!isSupabaseConfigured()) {
    // Local preview fallback — remove or guard behind NODE_ENV if you prefer.
    return {
      id: 'local-admin',
      email: 'admin@local.dev',
      isStub: true as const,
    };
  }

  const supabase = createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

/**
 * Optional admin allow-list. Set NEXT_PUBLIC_ADMIN_EMAILS to a comma-separated
 * list to restrict the dashboard to specific accounts. If unset, any
 * authenticated user is treated as admin (fine for a single-owner portfolio).
 */
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const allow = process.env.NEXT_PUBLIC_ADMIN_EMAILS;
  if (!allow) return true;
  return allow
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .includes(email.toLowerCase());
}

/**
 * Guard for dashboard routes. Redirects unauthenticated users to /login.
 * Call at the top of protected layouts/pages.
 */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  if (!isAdmin(user.email)) {
    redirect('/login?error=unauthorized');
  }
  return user;
}
