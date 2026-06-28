import { requireUser } from '@/lib/auth';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ProjectForm } from '@/components/dashboard/ProjectForm';
import { getClients } from '@/data';

export default async function NewProjectPage() {
  const user = await requireUser();
  const clients = await getClients();

  return (
    <DashboardShell
      title="Add project"
      subtitle="Create a new portfolio + business record"
      userEmail={user.email ?? undefined}
    >
      <div className="mx-auto max-w-3xl">
        <ProjectForm clients={clients} />
      </div>
    </DashboardShell>
  );
}
