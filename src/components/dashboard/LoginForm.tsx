'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { LogoMark } from '@/components/public/LogoMark';
import { Button } from '@/components/public/Button';

const fieldClass =
  'w-full rounded-xl border border-line bg-ink-900/60 px-4 py-3 text-sm text-bone placeholder:text-bone-soft/50 focus-ring transition-colors hover:border-bone/15';

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get('redirect') || '/dashboard';
  const configured = isSupabaseConfigured();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(
    params.get('error') === 'unauthorized'
      ? 'That account is not authorized for the dashboard.'
      : null,
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // DEV MODE: no Supabase configured yet -> let the owner into the dashboard
    // so the UI is previewable. Real auth kicks in once env vars are set.
    if (!configured) {
      router.push(redirectTo);
      return;
    }

    setLoading(true);
    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      setError('Supabase client unavailable.');
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center gap-4 text-center">
        <LogoMark size={64} href="/" />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-bone">
            Admin login
          </h1>
          <p className="mt-2 text-sm text-bone-soft">
            Private dashboard for Frames by Frady.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-4 rounded-2xl border border-line bg-ink-800/50 p-6 sm:p-8"
      >
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-bone">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={fieldClass}
            required={configured}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-bone"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={fieldClass}
            required={configured}
          />
        </div>

        {error && (
          <p className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-300">
            {error}
          </p>
        )}

        <Button type="submit" size="md" className="mt-2 w-full">
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>

        {!configured && (
          <p className="rounded-lg border border-line bg-bone/[0.03] px-3 py-3 text-xs leading-relaxed text-bone-soft">
            <strong className="text-bone">Preview mode:</strong> Supabase is not
            configured yet, so sign-in goes straight to the dashboard. Add your
            keys to <code className="text-moss-400">.env.local</code> and create
            an admin user in Supabase Auth to enable real authentication.
          </p>
        )}
      </form>

      <p className="mt-6 text-center text-sm text-bone-soft">
        <a href="/" className="hover:text-bone focus-ring rounded">
          ← Back to site
        </a>
      </p>
    </div>
  );
}

export default LoginForm;
