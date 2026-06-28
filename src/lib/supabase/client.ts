'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser-side Supabase client (uses the public anon key).
 * Safe to use in Client Components.
 *
 * Returns `null` when Supabase env vars are not configured yet, so the app
 * gracefully falls back to local data during development.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createBrowserClient(url, anonKey);
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
