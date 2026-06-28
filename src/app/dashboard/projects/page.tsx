import { requireUser } from '@/lib/auth';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ProjectTable } from '@/components/dashboard/ProjectTable';
import { Button } from '@/components/public/Button';
import { getAllProjects } from '@/data';

export default async function ProjectsPage() {
  const user = await requireUser();
  const projects = await getAllProjects();

  return (
    <DashboardShell
      title="Projects"
      subtitle={`${projects.length} total`}
      userEmail={user.email ?? undefined}
      action={
        <Button href="/dashboard/projects/new" size="sm">
          + Add Project
        </Button>
      }
    >
      <ProjectTable projects={projects} />
    </DashboardShell>
  );
}
