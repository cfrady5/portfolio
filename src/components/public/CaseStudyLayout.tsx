import Link from 'next/link';
import type { Project } from '@/types';
import { Button } from './Button';
import { ProjectMockup } from './ProjectMockup';
import { StatusPill } from './StatusPill';
import { SkillPill } from './SkillPill';
import { ContactCTA } from './ContactCTA';

interface CaseStudyLayoutProps {
  project: Project;
  /** The next project to feature in the "Next project" CTA. */
  nextProject?: Project | null;
}

function Block({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 border-t border-line py-12 md:grid-cols-[200px_1fr]">
      <div>
        <span className="eyebrow">{label}</span>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-bone">
          {title}
        </h2>
      </div>
      <div className="text-base leading-relaxed text-bone-soft">{children}</div>
    </section>
  );
}

export function CaseStudyLayout({ project, nextProject }: CaseStudyLayoutProps) {
  return (
    <article>
      {/* Hero */}
      <header className="container-x pt-16">
        <Link
          href="/work"
          className="text-sm text-bone-soft transition-colors hover:text-bone focus-ring rounded"
        >
          ← Back to work
        </Link>

        <div className="mt-8 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-[0.14em] text-moss">
              {project.category}
            </span>
            <StatusPill status={project.status} />
            <span className="text-xs text-bone-soft">{project.year}</span>
          </div>

          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-relaxed text-bone-soft">
            {project.short_description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.live_url && (
              <Button href={project.live_url} external size="md">
                Visit live site ↗
              </Button>
            )}
            {project.repo_url && (
              <Button href={project.repo_url} external variant="secondary" size="md">
                View code ↗
              </Button>
            )}
            <Button href="/contact" variant="secondary" size="md">
              Get in touch
            </Button>
          </div>
        </div>

        <div className="mt-12">
          <ProjectMockup
            title={project.title}
            accent={project.accent_color}
            category={project.category}
            liveUrl={project.live_url ?? project.repo_url}
          />
        </div>
      </header>

      {/* Meta strip */}
      <div className="container-x mt-12 grid grid-cols-2 gap-6 rounded-2xl border border-line bg-ink-800/40 p-6 sm:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-bone-soft/60">Role</p>
          <p className="mt-1 text-sm text-bone">{project.role}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-bone-soft/60">
            Client type
          </p>
          <p className="mt-1 text-sm text-bone">{project.client_type}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-bone-soft/60">
            Status
          </p>
          <p className="mt-1 text-sm text-bone">{project.status}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-bone-soft/60">Year</p>
          <p className="mt-1 text-sm text-bone">{project.year}</p>
        </div>
      </div>

      {/* Body */}
      <div className="container-x mt-4">
        <Block label="Overview" title="What the project is">
          <p>{project.long_description}</p>
        </Block>

        <Block label="Problem" title="What was missing before">
          <p>{project.problem}</p>
        </Block>

        <Block label="My role" title="What I owned">
          <p>{project.role}.</p>
        </Block>

        <Block label="Process" title="How it came together">
          <ol className="flex flex-col gap-3">
            {project.process.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-moss/30 text-xs text-moss-400">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Block>

        <Block label="Key features" title="What it includes">
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-line bg-bone/[0.02] p-4"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                <span className="text-sm text-bone">{feature}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block label="Tools used" title="The stack">
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <SkillPill key={tool}>{tool}</SkillPill>
            ))}
          </div>
        </Block>

        <Block label="Result" title="What improved">
          <p>{project.result}</p>
        </Block>

        {/* Screenshot gallery — placeholder mockups until real screenshots are added.
            Replace by setting image paths in project_screenshots / project data. */}
        <Block label="Gallery" title="A closer look">
          <div className="grid gap-4 sm:grid-cols-2">
            {(project.screenshots && project.screenshots.length > 0
              ? project.screenshots
              : [{ id: 'ph', alt_text: project.title }]
            ).map((shot, i) => (
              <ProjectMockup
                key={'id' in shot ? shot.id : i}
                title={project.title}
                accent={project.accent_color}
                category={project.category}
                liveUrl={project.live_url ?? project.repo_url}
              />
            ))}
          </div>
        </Block>
      </div>

      {/* Next project CTA */}
      {nextProject && (
        <div className="container-x py-12">
          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-ink-800/50 p-8 transition-colors hover:border-bone/20 sm:flex-row sm:items-center"
          >
            <div>
              <span className="eyebrow">Next project</span>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-bone">
                {nextProject.title}
              </p>
            </div>
            <span className="text-bone-soft transition-colors group-hover:text-moss-400">
              View case study →
            </span>
          </Link>
        </div>
      )}

      <ContactCTA />
    </article>
  );
}

export default CaseStudyLayout;
