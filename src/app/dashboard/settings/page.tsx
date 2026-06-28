import { requireUser } from '@/lib/auth';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { LogoMark } from '@/components/public/LogoMark';
import { Button } from '@/components/public/Button';

const inputClass =
  'w-full rounded-xl border border-line bg-ink-900/60 px-3.5 py-2.5 text-sm text-bone placeholder:text-bone-soft/40 focus-ring';

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card p-6">
      <div className="border-b border-line pb-4">
        <h2 className="text-base font-semibold text-bone">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-bone-soft">{description}</p>
        )}
      </div>
      <div className="pt-5">{children}</div>
    </section>
  );
}

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <DashboardShell
      title="Settings"
      subtitle="Admin & portfolio configuration"
      userEmail={user.email ?? undefined}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {/* Admin profile */}
        <SettingsCard
          title="Admin profile"
          description="Your account details. Managed through Supabase Auth."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-bone">Name</span>
              <input className={inputClass} defaultValue="Caleb Frady" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-bone">Email</span>
              <input
                className={inputClass}
                defaultValue={user.email ?? 'cjfrady5@gmail.com'}
                readOnly
              />
            </label>
          </div>
          <div className="mt-4">
            <Button size="sm" variant="secondary">
              Update profile
            </Button>
          </div>
        </SettingsCard>

        {/* Brand / logo management */}
        <SettingsCard
          title="Brand & logo"
          description="The logo drives the entire site. Swap it in one place."
        >
          <div className="flex items-center gap-4">
            <LogoMark size={56} href={null} />
            <div className="text-sm text-bone-soft">
              <p>
                Replace{' '}
                <code className="text-moss-400">/public/brand/frady-logo.png</code>{' '}
                and update <code className="text-moss-400">LOGO_SRC</code> in{' '}
                <code className="text-moss-400">LogoMark.tsx</code>.
              </p>
            </div>
          </div>
        </SettingsCard>

        {/* Public portfolio settings */}
        <SettingsCard
          title="Public portfolio"
          description="Control what appears on the public site."
        >
          <ul className="flex flex-col gap-3 text-sm text-bone-soft">
            <li className="flex items-center justify-between rounded-lg border border-line bg-ink-900/40 px-4 py-3">
              <span>Only show projects where public_visible = true</span>
              <span className="text-moss-400">Enforced</span>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-line bg-ink-900/40 px-4 py-3">
              <span>Homepage features require featured = true</span>
              <span className="text-moss-400">Enforced</span>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-line bg-ink-900/40 px-4 py-3">
              <span>Pricing & client data hidden from public pages</span>
              <span className="text-moss-400">Enforced</span>
            </li>
          </ul>
        </SettingsCard>

        {/* Revenue settings */}
        <SettingsCard
          title="Revenue settings"
          description="Defaults used across financial calculations."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-bone">Currency</span>
              <select className={inputClass} defaultValue="USD">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-bone">
                Default renewal window
              </span>
              <select className={inputClass} defaultValue="12">
                <option value="12">12 months</option>
                <option value="6">6 months</option>
                <option value="3">3 months</option>
              </select>
            </label>
          </div>
        </SettingsCard>

        {/* Export data */}
        <SettingsCard
          title="Export data"
          description="Download your business data for backup or reporting."
        >
          <div className="flex flex-wrap gap-3">
            <Button size="sm" variant="secondary">
              Export projects (CSV)
            </Button>
            <Button size="sm" variant="secondary">
              Export clients (CSV)
            </Button>
            <Button size="sm" variant="secondary">
              Export revenue (CSV)
            </Button>
          </div>
          <p className="mt-3 text-xs text-bone-soft/60">
            {/* Wire these to a route handler that streams CSV from Supabase. */}
            Placeholder — connect to a CSV export route when ready.
          </p>
        </SettingsCard>
      </div>
    </DashboardShell>
  );
}
