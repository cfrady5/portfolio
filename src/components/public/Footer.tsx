import Link from 'next/link';
import { LogoMark } from './LogoMark';

const columns = [
  {
    title: 'Explore',
    links: [
      { href: '/work', label: 'Work' },
      { href: '/resume', label: 'Resume' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      // TODO: replace with your real LinkedIn URL.
      { href: 'https://www.linkedin.com/in/caleb-frady', label: 'LinkedIn' },
      { href: 'mailto:cjfrady5@gmail.com', label: 'Email' },
      { href: '/resume/Caleb-Frady-Resume.pdf', label: 'Resume (PDF)' },
      { href: '/login', label: 'Admin Login' },
    ],
  },
];

export function Footer() {
  const year = '2026'; // Static to avoid hydration mismatches; update yearly.

  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="container-x py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <LogoMark size={44} withWordmark />
            <p className="mt-5 text-sm leading-relaxed text-bone-soft">
              Websites, digital systems, and brand experiences built with
              clarity. Designed to earn trust. Built with my name on it.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-moss">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => {
                    const external = /^https?:|^mailto:/.test(link.href);
                    return (
                      <li key={link.href}>
                        {external ? (
                          <a
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            className="text-sm text-bone-soft transition-colors hover:text-bone"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm text-bone-soft transition-colors hover:text-bone"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-bone-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Caleb Frady · Frames by Frady. All rights reserved.</p>
          <p className="text-bone-soft/70">Strategy, story, and execution.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
