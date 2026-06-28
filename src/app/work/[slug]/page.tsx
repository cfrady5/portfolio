import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteFrame } from '@/components/public/SiteFrame';
import { CaseStudyLayout } from '@/components/public/CaseStudyLayout';
import { getPublicProject, getPublicProjects } from '@/data';

interface PageProps {
  params: { slug: string };
}

// Pre-render all public project slugs at build time.
export async function generateStaticParams() {
  const projects = await getPublicProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = await getPublicProject(params.slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.short_description,
    openGraph: {
      title: project.title,
      description: project.short_description,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const project = await getPublicProject(params.slug);
  if (!project) notFound();

  // Pick the next public project for the "Next project" CTA.
  const all = await getPublicProjects();
  const index = all.findIndex((p) => p.slug === project.slug);
  const nextProject = all[(index + 1) % all.length] ?? null;

  return (
    <SiteFrame>
      <CaseStudyLayout
        project={project}
        nextProject={nextProject?.slug === project.slug ? null : nextProject}
      />
    </SiteFrame>
  );
}
