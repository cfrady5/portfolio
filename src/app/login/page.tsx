import type { Metadata } from 'next';
import { Suspense } from 'react';
import { LoginForm } from '@/components/dashboard/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="bg-radial-fade flex min-h-screen items-center justify-center px-6 py-16">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
