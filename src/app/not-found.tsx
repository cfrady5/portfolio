import Link from 'next/link';
import { LogoMark } from '@/components/public/LogoMark';
import { Button } from '@/components/public/Button';

export default function NotFound() {
  return (
    <div className="bg-radial-fade flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <LogoMark size={64} href={null} />
      <p className="eyebrow">404</p>
      <h1 className="max-w-md text-3xl font-semibold tracking-tight text-bone">
        This page wandered off.
      </h1>
      <p className="max-w-sm text-bone-soft">
        The page you&apos;re looking for doesn&apos;t exist — but the work does.
      </p>
      <div className="flex gap-3">
        <Button href="/" size="md">
          Back home
        </Button>
        <Button href="/work" variant="secondary" size="md">
          View work
        </Button>
      </div>
    </div>
  );
}
