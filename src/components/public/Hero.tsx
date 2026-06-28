import { Button } from './Button';
import { PixelLogo } from './PixelLogo';

export function Hero() {
  return (
    <section className="bg-radial-fade relative overflow-hidden">
      <div className="container-x relative flex flex-col items-center gap-10 py-24 text-center sm:py-32">
        {/* Portfolio hero branding — the cursive mark "digitalizes" in pixel by pixel */}
        <PixelLogo height={150} />

        <div className="flex flex-col items-center gap-6 animate-fade-up">
          <span className="eyebrow">Caleb Frady · Proof of work</span>
          <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-bone sm:text-5xl md:text-6xl">
            Websites, digital systems, and brand experiences built with clarity.
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-bone-soft">
            I&apos;m Caleb Frady — a finance graduate, digital communications
            specialist, and website builder focused on helping organizations
            look trustworthy, communicate clearly, and turn attention into
            action.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row animate-fade-up">
          <Button href="/work" size="lg">
            View My Work
          </Button>
          {/* TODO: replace with your real resume PDF in /public/resume */}
          <Button
            href="/resume/Caleb-Frady-Resume.pdf"
            external
            variant="secondary"
            size="lg"
          >
            Download Resume
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Get in touch
          </Button>
        </div>

        <p className="max-w-xl text-sm text-bone-soft/70 animate-fade-up">
          Not just a developer — a strategic builder who understands business,
          marketing, storytelling, design, and execution.
        </p>
      </div>
    </section>
  );
}

export default Hero;
