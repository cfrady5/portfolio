import type { Metadata } from 'next';
import { SiteFrame } from '@/components/public/SiteFrame';
import { ContactForm } from '@/components/public/ContactForm';
import { LogoMark } from '@/components/public/LogoMark';
import { Button } from '@/components/public/Button';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Caleb Frady. Websites, brand experiences, and digital systems built with clarity.',
};

export default function ContactPage() {
  return (
    <SiteFrame>
      <div className="container-x grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.3fr]">
        {/* Left: positioning + quick links */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <LogoMark size={64} href={null} />
            <span className="eyebrow">Get in touch</span>
            <h1 className="text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
              Let&apos;s build something clear.
            </h1>
            <p className="text-pretty text-base leading-relaxed text-bone-soft">
              Tell me a little about your project. Whether it&apos;s a new
              website, a brand refresh, or a digital system that supports
              real-world work — I&apos;ll help you make it easier to understand
              and easier to trust.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-line bg-ink-800/40 p-6">
            <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-moss">
              Other ways to connect
            </h2>
            <a
              href="mailto:cjfrady5@gmail.com"
              className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-bone transition-colors hover:bg-bone/5"
            >
              <span>Email</span>
              <span className="text-bone-soft">cjfrady5@gmail.com ↗</span>
            </a>
            {/* TODO: replace with your real LinkedIn URL */}
            <a
              href="https://www.linkedin.com/in/caleb-frady"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-bone transition-colors hover:bg-bone/5"
            >
              <span>LinkedIn</span>
              <span className="text-bone-soft">/in/caleb-frady ↗</span>
            </a>
            <a
              href="/resume/Caleb-Frady-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-bone transition-colors hover:bg-bone/5"
            >
              <span>Resume</span>
              <span className="text-bone-soft">Download PDF ↓</span>
            </a>
          </div>

          <div className="rounded-2xl border border-moss/20 bg-moss/[0.06] p-6">
            <p className="text-sm font-medium text-bone">Open to new work</p>
            <p className="mt-2 text-sm leading-relaxed text-bone-soft">
              I&apos;m open to freelance projects and full-time roles in web
              design, development, and digital communications. If you have
              something in mind, I&apos;d like to hear about it.
            </p>
            <div className="mt-4">
              <Button href="/work" variant="secondary" size="sm">
                See the work →
              </Button>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </SiteFrame>
  );
}
