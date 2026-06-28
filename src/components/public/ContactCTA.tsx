import { Button } from './Button';
import { LogoMark } from './LogoMark';

export function ContactCTA() {
  return (
    <section className="container-x py-20">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-800/60 px-8 py-16 text-center sm:px-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(80% 80% at 50% 0%, rgba(124,154,118,0.12) 0%, transparent 60%)',
          }}
          aria-hidden
        />
        <div className="relative flex flex-col items-center gap-6">
          {/* Contact CTA branding */}
          <LogoMark size={56} href={null} />
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
            Let&apos;s build something with your name on it.
          </h2>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-bone-soft">
            Whether you need a new website, a clearer brand, or a digital system
            that supports real-world work — I&apos;d like to help you make it
            easier to understand and easier to trust.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Start a Project
            </Button>
            <Button href="/work" variant="secondary" size="lg">
              See the Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
