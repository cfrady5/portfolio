import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ProjectForm } from '@/components/dashboard/ProjectForm';
import { getClients, getProjectById } from '@/data';

interface PageProps {
  params: { id: string };
}

export default async function EditProjectPage({ params }: PageProps) {
  const user = await requireUser();
  const project = await getProjectById(params.id);
  if (!project) notFound();
  const clients = await getClients();

  return (
    <DashboardShell
      title="Edit project"
      subtitle={project.title}
      userEmail={user.email ?? undefined}
    >
      <div className="mx-auto max-w-3xl">
        <ProjectForm project={project} clients={clients} />
      </div>
    </DashboardShell>
  );
}
