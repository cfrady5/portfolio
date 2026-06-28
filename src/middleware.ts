import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

/**
 * Middleware:
 *  1. Refreshes the Supabase auth session (keeps cookies fresh).
 *  2. Protects every /dashboard route — unauthenticated users are redirected
 *     to /login.
 *
 * When Supabase env vars are not configured yet, middleware does nothing and
 * the app runs in local-preview mode (see src/lib/auth.ts).
 */
export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // No Supabase configured -> local preview mode, skip the guard.
  if (!url || !anonKey) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !user) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets, image optimization,
     * and the favicon — so the session stays fresh sitewide.
     */
    '/((?!_next/static|_next/image|favicon.ico|brand|projects|resume|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)',
  ],
};
