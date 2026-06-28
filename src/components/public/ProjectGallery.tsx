'use client';

import { useMemo, useState } from 'react';
import type { Project } from '@/types';
import { ProjectCard } from './ProjectCard';
import { FilterTabs } from './FilterTabs';

// Filter tabs as specified. "All" plus every category used on the public site.
const FILTERS = [
  'All',
  'Websites',
  'Client Work',
  'Concepts',
  'Apps',
  'Brand Identity',
  'ARI / Innovation Ecosystem',
  'Local Business',
  'Government / Defense',
  'CMS / Systems',
];

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState('All');

  const filtered = useMemo(() => {
    if (active === 'All') return projects;
    return projects.filter((p) => p.category === active);
  }, [active, projects]);

  return (
    <div className="flex flex-col gap-10">
      <FilterTabs options={FILTERS} active={active} onChange={setActive} />

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
