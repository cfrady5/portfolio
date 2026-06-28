import { requireUser } from '@/lib/auth';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ClientTable } from '@/components/dashboard/ClientTable';
import { Button } from '@/components/public/Button';
import { getAllProjects, getClients } from '@/data';

export default async function ClientsPage() {
  const user = await requireUser();
  const clients = await getClients();
  const projects = await getAllProjects();

  return (
    <DashboardShell
      title="Clients"
      subtitle={`${clients.length} total`}
      userEmail={user.email ?? undefined}
      action={
        // TODO: wire up an add-client modal / form -> Supabase `clients` table.
        <Button href="#add-client" size="sm">
          + Add Client
        </Button>
      }
    >
      <ClientTable clients={clients} projects={projects} />
    </DashboardShell>
  );
}
