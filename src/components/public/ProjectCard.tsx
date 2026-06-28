import Link from 'next/link';
import type { Project } from '@/types';
import { ProjectMockup } from './ProjectMockup';
import { StatusPill } from './StatusPill';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-800/50 transition-all duration-300 hover:border-bone/20 hover:bg-ink-800">
      <div className="relative p-3">
        {project.featured && (
          <span className="absolute right-5 top-5 z-30 rounded-full border border-moss/30 bg-ink-950/80 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-moss-400 backdrop-blur">
            Featured
          </span>
        )}
        {/* Placeholder mockup. Drop a real screenshot in /public/projects and
            pass imageUrl to swap it in. */}
        <ProjectMockup
          title={project.title}
          accent={project.accent_color}
          category={project.category}
          liveUrl={project.live_url}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 pt-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs uppercase tracking-[0.14em] text-moss">
            {project.category}
          </span>
          <span className="text-xs text-bone-soft">{project.year}</span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold tracking-tight text-bone">
            {project.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-bone-soft">
            {project.short_description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-bone-soft">
          <StatusPill status={project.status} />
          <span className="text-bone-soft/60">·</span>
          <span>{project.role.split(',')[0]}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tools.slice(0, 4).map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-line bg-bone/[0.03] px-2.5 py-1 text-[11px] text-bone-soft"
            >
              {tool}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-2">
          <Link
            href={`/work/${project.slug}`}
            className="text-sm font-medium text-bone transition-colors hover:text-moss-400 focus-ring rounded"
          >
            Case study →
          </Link>
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-bone-soft transition-colors hover:text-bone focus-ring rounded"
            >
              Live site ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
