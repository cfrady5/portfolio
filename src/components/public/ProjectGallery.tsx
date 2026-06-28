'use client';

import { useMemo, useState } from 'react';
import type { Project } from '@/types';
import { ProjectCard } from './ProjectCard';
import { FilterTabs } from './FilterTabs';

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState('All');

  // Build filter tabs dynamically from the categories that actually have
  // projects, so empty categories never show up. Order follows first
  // appearance in the data.
  const filters = useMemo(() => {
    const seen: string[] = [];
    for (const p of projects) {
      if (!seen.includes(p.category)) seen.push(p.category);
    }
    return ['All', ...seen];
  }, [projects]);

  const filtered = useMemo(() => {
    if (active === 'All') return projects;
    return projects.filter((p) => p.category === active);
  }, [active, projects]);

  return (
    <div className="flex flex-col gap-10">
      <FilterTabs options={filters} active={active} onChange={setActive} />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-line bg-ink-800/40 p-16 text-center">
          <p className="text-bone-soft">
            No projects in this category yet — more proof of work on the way.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectGallery;
