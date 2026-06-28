import type { Metadata } from 'next';
import { requireUser } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: false },
};

/**
 * Protects every /dashboard route. requireUser() redirects unauthenticated
 * (or non-admin) visitors to /login. Middleware enforces this too — this is
 * defense in depth at the layout level.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();
  return <>{children}</>;
}
