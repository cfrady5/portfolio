import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://framesbyfrady.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Caleb Frady — Frames by Frady',
    template: '%s · Frames by Frady',
  },
  description:
    'Websites, digital systems, and brand experiences built with clarity. Caleb Frady — finance graduate, digital communications specialist, and website builder.',
  keywords: [
    'Caleb Frady',
    'Frames by Frady',
    'website design',
    'web developer',
    'digital communications',
    'portfolio',
  ],
  authors: [{ name: 'Caleb Frady' }],
  creator: 'Caleb Frady',
  openGraph: {
    type: 'website',
    title: 'Caleb Frady — Frames by Frady',
    description:
      'Websites, digital systems, and brand experiences built with clarity.',
    url: siteUrl,
    siteName: 'Frames by Frady',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caleb Frady — Frames by Frady',
    description:
      'Websites, digital systems, and brand experiences built with clarity.',
  },
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-ink-950 font-sans text-bone antialiased">
        {children}
      </body>
    </html>
  );
}
