import type { Metadata } from 'next';
import { SiteFrame } from '@/components/public/SiteFrame';
import { LogoMark } from '@/components/public/LogoMark';
import { SectionHeading } from '@/components/public/SectionHeading';
import { ContactCTA } from '@/components/public/ContactCTA';
import { Button } from '@/components/public/Button';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Caleb Frady combines finance, marketing, storytelling, communications, and web design to build digital work that is clear, credible, and useful.',
};

const principles = [
  {
    title: 'Clarity over noise',
    body: 'Good work makes complex things easy to understand. I cut clutter so the point lands.',
  },
  {
    title: 'Trust is the product',
    body: 'Design, copy, and structure all exist to make an organization feel credible and easy to believe.',
  },
  {
    title: 'Strategy, story, execution',
    body: 'I think about the business first, shape the story, then build it well — start to finish.',
  },
  {
    title: 'Built with my name on it',
    body: 'I care about quality because the work reflects on my last name. That standard shows up in the details.',
  },
];

export default function AboutPage() {
  return (
    <SiteFrame>
      <section className="bg-radial-fade">
        <div className="container-x flex flex-col items-center gap-8 py-20 text-center sm:py-28">
          <LogoMark size={72} href={null} />
          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-bone sm:text-6xl">
            I build with my name on it.
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-bone-soft">
            I&apos;m Caleb Frady. I combine finance, marketing, storytelling,
            communications, and web design to create digital work that is clear,
            credible, and useful — work an organization can stand behind.
          </p>
        </div>
      </section>

      <section className="container-x grid gap-10 py-16 lg:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-6 text-base leading-relaxed text-bone-soft">
          <p>
            My background is finance — I studied it at Purdue alongside
            entrepreneurship and innovation. That training taught me to think
            about how organizations actually create and capture value, and to
            respect the numbers behind a decision.
          </p>
          <p>
            But I kept gravitating toward the part where strategy meets
            communication: how a business presents itself, tells its story, and
            earns trust. As a digital communications specialist at the Applied
            Research Institute, I&apos;ve built websites and content systems for
            innovation, government, and research audiences — translating complex
            work into something people can understand and act on.
          </p>
          <p>
            This portfolio is where that comes together — a place to show the
            clean, fast, conversion-minded websites and digital systems
            I&apos;ve built, many of them with Claude, that make organizations
            easier to understand and easier to trust.
          </p>
          <p>
            I care deeply about quality, because the work carries my name. I
            don&apos;t ship things I wouldn&apos;t put in front of my own family.
            That standard — strategy, story, and execution done right — is the
            whole point.
          </p>
          <div className="flex gap-3 pt-2">
            <Button href="/work" size="md">
              See the work
            </Button>
            <Button href="/contact" variant="secondary" size="md">
              Get in touch
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {principles.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-line bg-ink-800/40 p-6"
            >
              <h3 className="text-base font-semibold text-bone">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bone-soft">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x py-16">
          <SectionHeading
            eyebrow="How I work"
            title="Digital systems that support real-world work"
            description="Every engagement runs on the same principles: understand the audience, structure the content, design for trust, and build something maintainable."
          />
        </div>
      </section>

      <ContactCTA />
    </SiteFrame>
  );
}
