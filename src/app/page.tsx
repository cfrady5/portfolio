import Link from 'next/link';
import { SiteFrame } from '@/components/public/SiteFrame';
import { BrandIntro } from '@/components/public/BrandIntro';
import { Hero } from '@/components/public/Hero';
import { SectionHeading } from '@/components/public/SectionHeading';
import { ProjectCard } from '@/components/public/ProjectCard';
import { SkillPill } from '@/components/public/SkillPill';
import { ContactCTA } from '@/components/public/ContactCTA';
import { Button } from '@/components/public/Button';
import { getFeaturedProjects, getPublicProjects } from '@/data';
import { resume } from '@/data/resume';

const buildOfferings = [
  {
    title: 'Websites',
    body: 'Clean, fast, conversion-minded sites that make organizations easier to understand.',
  },
  {
    title: 'Brand experiences',
    body: 'Visual identity and messaging designed to earn trust at first glance.',
  },
  {
    title: 'Digital systems',
    body: 'CMS-driven structures and workflows that support real-world work.',
  },
  {
    title: 'Strategy & content',
    body: 'Story, structure, and SEO so the right people understand what you do.',
  },
];

export default async function HomePage() {
  const featured = await getFeaturedProjects();
  const allPublic = await getPublicProjects();

  return (
    <SiteFrame>
      {/* One-time draw-on intro of the cursive frady mark */}
      <BrandIntro />

      {/* 2. Hero */}
      <Hero />

      {/* 3. Featured Work */}
      <section className="container-x py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured work"
            title="Proof of work, not promises"
            description="A selection of websites, apps, and brands — built with strategy, story, and execution."
          />
          <Button href="/work" variant="secondary" size="sm" className="shrink-0">
            View all work →
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 6).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 4. What I Build */}
      <section className="border-y border-line bg-ink-900/40">
        <div className="container-x py-20">
          <SectionHeading
            eyebrow="What I build"
            title="More than a developer — a strategic builder"
            description="I combine business, marketing, storytelling, design, and execution to create digital work that is clear, credible, and useful."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {buildOfferings.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-line bg-ink-800/40 p-6"
              >
                <h3 className="text-lg font-semibold tracking-tight text-bone">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bone-soft">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Proof of Work / Gallery Preview */}
      <section className="container-x py-20">
        <SectionHeading
          eyebrow="Gallery preview"
          title="Websites that make organizations easier to understand"
          description="From local business sites to government and innovation ecosystems — a growing body of work built with my name on it."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allPublic.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 6. Resume Snapshot */}
      <section className="border-y border-line bg-ink-900/40">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Resume snapshot"
            title="Finance, communications, and the craft of building"
            description={resume.summary}
          />
          <div className="flex flex-col gap-6">
            {resume.experience.slice(0, 2).map((exp) => (
              <div
                key={exp.role + exp.organization}
                className="rounded-2xl border border-line bg-ink-800/40 p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-bone">
                    {exp.role}
                  </h3>
                  <span className="text-xs text-bone-soft">
                    {exp.start} – {exp.end}
                  </span>
                </div>
                <p className="mt-1 text-sm text-moss-400">{exp.organization}</p>
                <p className="mt-3 text-sm leading-relaxed text-bone-soft">
                  {exp.summary}
                </p>
              </div>
            ))}
            <div className="flex gap-3">
              <Button href="/resume" variant="secondary" size="sm">
                Full resume →
              </Button>
              <Button
                href="/resume/Caleb-Frady-Resume.pdf"
                external
                variant="ghost"
                size="sm"
              >
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Tools & Skills */}
      <section className="container-x py-20">
        <SectionHeading
          eyebrow="Tools & skills"
          title="The stack behind the work"
          align="center"
        />
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {resume.tools.map((tool) => (
            <SkillPill key={tool}>{tool}</SkillPill>
          ))}
          {resume.skills
            .flatMap((s) => s.items)
            .slice(0, 10)
            .map((skill) => (
              <SkillPill key={skill} accent>
                {skill}
              </SkillPill>
            ))}
        </div>
      </section>

      {/* 8. Personal Positioning */}
      <section className="border-y border-line bg-ink-900/40">
        <div className="container-x py-24 text-center">
          <p className="mx-auto max-w-3xl text-balance text-2xl font-medium leading-snug text-bone sm:text-3xl">
            &ldquo;I build with my name on it. Strategy, story, and execution —
            so the work is clear, credible, and earns trust.&rdquo;
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-bone-soft">
            <span className="h-px w-8 bg-moss/50" />
            Caleb Frady
            <span className="h-px w-8 bg-moss/50" />
          </div>
          <div className="mt-8">
            <Link
              href="/about"
              className="text-sm font-medium text-moss-400 transition-colors hover:text-moss focus-ring rounded"
            >
              More about me →
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Contact CTA */}
      <ContactCTA />

      {/* 10. Footer is rendered by SiteFrame */}
    </SiteFrame>
  );
}
