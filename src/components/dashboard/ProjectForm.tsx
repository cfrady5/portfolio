'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Client, Project } from '@/types';
import { Button } from '@/components/public/Button';
import { CurrencyInput } from './CurrencyInput';
import { DateInput } from './DateInput';
import { VisibilityToggle, FeaturedToggle } from './Toggle';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';
import { slugify } from '@/lib/utils';

const inputClass =
  'w-full rounded-xl border border-line bg-ink-900/60 px-3.5 py-2.5 text-sm text-bone placeholder:text-bone-soft/40 focus-ring';

const CATEGORIES = [
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
const STATUSES = [
  'Lead',
  'In Progress',
  'Active',
  'Completed',
  'Paused',
  'Concept',
  'Needs Update',
];
const PAYMENT_STATUSES = [
  'Unpaid',
  'Deposit Paid',
  'Partially Paid',
  'Paid in Full',
  'Recurring',
  'N/A',
];
const CONTRACT_STATUSES = ['None', 'Draft', 'Sent', 'Signed', 'Complete'];
const PRIORITIES = ['Low', 'Medium', 'High'];

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={full ? 'sm:col-span-2 flex flex-col gap-1.5' : 'flex flex-col gap-1.5'}>
      <span className="text-sm font-medium text-bone">{label}</span>
      {children}
    </label>
  );
}

function SectionTitle({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div className="border-b border-line pb-3">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-moss">
        {children}
      </h2>
      {note && <p className="mt-1 text-xs text-bone-soft">{note}</p>}
    </div>
  );
}

export function ProjectForm({
  project,
  clients,
}: {
  project?: Project;
  clients: Client[];
}) {
  const router = useRouter();
  const isEdit = Boolean(project);
  const f = project?.financials;
  const n = project?.notes?.[0];

  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const fd = new FormData(e.currentTarget);
    const get = (k: string) => (fd.get(k) as string) ?? '';
    const num = (k: string) => parseFloat(get(k) || '0') || 0;

    // Build the public + private payload (matches the Supabase schema).
    const payload = {
      title: get('title'),
      slug: get('slug') || slugify(get('title')),
      category: get('category'),
      short_description: get('short_description'),
      long_description: get('long_description'),
      role: get('role'),
      tools: get('tools')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      status: get('status'),
      live_url: get('live_url') || null,
      repo_url: get('repo_url') || null,
      featured: fd.get('featured') === 'on',
      public_visible: fd.get('public_visible') === 'on',
      year: get('year'),
      client_type: get('client_type'),
      client_id: get('client_id') || null,
      problem: get('problem'),
      process: get('process')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      features: get('features')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      result: get('result'),
      accent_color: get('accent_color') || '#7c9a76',
      start_date: get('start_date') || null,
      launch_date: get('launch_date') || null,
      renewal_date: get('renewal_date') || null,
    };

    const financials = {
      initial_build_price: num('initial_build_price'),
      deposit_amount: num('deposit_amount'),
      final_payment_amount: num('final_payment_amount'),
      total_project_price: num('total_project_price'),
      monthly_hosting_fee: num('monthly_hosting_fee'),
      monthly_maintenance_fee: num('monthly_maintenance_fee'),
      monthly_seo_fee: num('monthly_seo_fee'),
      monthly_content_fee: num('monthly_content_fee'),
      other_recurring_fee: num('other_recurring_fee'),
      total_monthly_recurring:
        num('monthly_hosting_fee') +
        num('monthly_maintenance_fee') +
        num('monthly_seo_fee') +
        num('monthly_content_fee') +
        num('other_recurring_fee'),
      amount_paid_to_date: num('amount_paid_to_date'),
      outstanding_balance: num('outstanding_balance'),
      payment_status: get('payment_status'),
      contract_status: get('contract_status'),
    };

    const note = {
      note: get('internal_note'),
      next_action: get('next_action'),
      priority: get('priority'),
    };

    // -----------------------------------------------------------------------
    // SAVE. When Supabase is configured, write to it. Otherwise (preview mode)
    // we just confirm the payload so the UI is fully testable.
    // -----------------------------------------------------------------------
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      if (supabase) {
        try {
          let projectId = project?.id;
          if (isEdit && projectId) {
            const { error } = await supabase
              .from('projects')
              .update(payload)
              .eq('id', projectId);
            if (error) throw error;
          } else {
            const { data, error } = await supabase
              .from('projects')
              .insert(payload)
              .select('id')
              .single();
            if (error) throw error;
            projectId = data?.id;
          }

          if (projectId) {
            await supabase
              .from('project_financials')
              .upsert({ ...financials, project_id: projectId }, {
                onConflict: 'project_id',
              });
            if (note.note || note.next_action) {
              await supabase
                .from('project_notes')
                .insert({ ...note, project_id: projectId });
            }
          }

          router.push('/dashboard/projects');
          router.refresh();
          return;
        } catch (err) {
          setSaving(false);
          setMessage(
            'Save failed: ' + (err instanceof Error ? err.message : 'unknown error'),
          );
          return;
        }
      }
    }

    // Preview mode (no Supabase yet).
    // eslint-disable-next-line no-console
    console.log('Project payload:', { payload, financials, note });
    setSaving(false);
    setMessage(
      'Preview mode: Supabase is not configured, so this was logged to the console instead of saved. Add your keys to enable persistence.',
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      {/* PUBLIC PORTFOLIO FIELDS */}
      <section className="flex flex-col gap-5">
        <SectionTitle note="These fields can appear on the public portfolio.">
          Public portfolio
        </SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Title">
            <input name="title" required defaultValue={project?.title} className={inputClass} placeholder="Project name" />
          </Field>
          <Field label="Slug">
            <input name="slug" defaultValue={project?.slug} className={inputClass} placeholder="auto-generated-from-title" />
          </Field>
          <Field label="Category">
            <select name="category" defaultValue={project?.category ?? CATEGORIES[0]} className={inputClass}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Status">
            <select name="status" defaultValue={project?.status ?? 'Lead'} className={inputClass}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Short description" full>
            <textarea name="short_description" rows={2} defaultValue={project?.short_description} className={inputClass} placeholder="One or two sentences for cards." />
          </Field>
          <Field label="Long description" full>
            <textarea name="long_description" rows={4} defaultValue={project?.long_description} className={inputClass} placeholder="Overview for the case study." />
          </Field>
          <Field label="Role">
            <input name="role" defaultValue={project?.role} className={inputClass} placeholder="Designer, developer, …" />
          </Field>
          <Field label="Tools (comma separated)">
            <input name="tools" defaultValue={project?.tools.join(', ')} className={inputClass} placeholder="Next.js, Vercel, Claude" />
          </Field>
          <Field label="Live URL">
            <input name="live_url" type="url" defaultValue={project?.live_url ?? ''} className={inputClass} placeholder="https://…" />
          </Field>
          <Field label="Repo URL">
            <input name="repo_url" type="url" defaultValue={project?.repo_url ?? ''} className={inputClass} placeholder="https://github.com/…" />
          </Field>
          <Field label="Year">
            <input name="year" defaultValue={project?.year ?? '2026'} className={inputClass} placeholder="2026" />
          </Field>
          <Field label="Client type">
            <input name="client_type" defaultValue={project?.client_type} className={inputClass} placeholder="Local Business, Government, …" />
          </Field>
          <Field label="Accent color">
            <input name="accent_color" type="text" defaultValue={project?.accent_color ?? '#7c9a76'} className={inputClass} placeholder="#7c9a76" />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <VisibilityToggle name="public_visible" defaultChecked={project?.public_visible ?? false} />
          <FeaturedToggle name="featured" defaultChecked={project?.featured ?? false} />
        </div>

        {/* Case study content */}
        <div className="grid gap-5">
          <Field label="Problem">
            <textarea name="problem" rows={3} defaultValue={project?.problem} className={inputClass} placeholder="What was unclear, outdated, or missing before." />
          </Field>
          <Field label="Process (one step per line)">
            <textarea name="process" rows={5} defaultValue={project?.process.join('\n')} className={inputClass} placeholder={'Researched the audience\nStructured the content\nDesigned the interface'} />
          </Field>
          <Field label="Key features (one per line)">
            <textarea name="features" rows={4} defaultValue={project?.features.join('\n')} className={inputClass} placeholder={'Feature one\nFeature two'} />
          </Field>
          <Field label="Result">
            <textarea name="result" rows={3} defaultValue={project?.result} className={inputClass} placeholder="What the new site or system does better." />
          </Field>
        </div>

        <p className="rounded-lg border border-line bg-bone/[0.02] px-3 py-2 text-xs text-bone-soft">
          Screenshots: add image paths under <code className="text-moss-400">/public/projects</code> and reference them in the
          <code className="text-moss-400"> project_screenshots</code> table (or local data) to replace placeholder mockups.
        </p>
      </section>

      {/* PRIVATE BUSINESS FIELDS */}
      <section className="flex flex-col gap-5">
        <SectionTitle note="Private — never shown on public pages.">
          Private business data
        </SectionTitle>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Client">
            <select name="client_id" defaultValue={project?.client_id ?? ''} className={inputClass}>
              <option value="">— None —</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.company} ({c.name})</option>
              ))}
            </select>
          </Field>
          <div className="hidden sm:block" />

          <CurrencyInput label="Initial build price" name="initial_build_price" defaultValue={f?.initial_build_price} />
          <CurrencyInput label="Total project price" name="total_project_price" defaultValue={f?.total_project_price} />
          <CurrencyInput label="Deposit amount" name="deposit_amount" defaultValue={f?.deposit_amount} />
          <CurrencyInput label="Final payment amount" name="final_payment_amount" defaultValue={f?.final_payment_amount} />

          <CurrencyInput label="Monthly hosting fee" name="monthly_hosting_fee" defaultValue={f?.monthly_hosting_fee} />
          <CurrencyInput label="Monthly maintenance fee" name="monthly_maintenance_fee" defaultValue={f?.monthly_maintenance_fee} />
          <CurrencyInput label="Monthly SEO fee" name="monthly_seo_fee" defaultValue={f?.monthly_seo_fee} />
          <CurrencyInput label="Monthly content fee" name="monthly_content_fee" defaultValue={f?.monthly_content_fee} />
          <CurrencyInput label="Other recurring fee" name="other_recurring_fee" defaultValue={f?.other_recurring_fee} hint="Total MRR is auto-summed on save." />
          <div className="hidden sm:block" />

          <CurrencyInput label="Amount paid to date" name="amount_paid_to_date" defaultValue={f?.amount_paid_to_date} />
          <CurrencyInput label="Outstanding balance" name="outstanding_balance" defaultValue={f?.outstanding_balance} />

          <Field label="Payment status">
            <select name="payment_status" defaultValue={f?.payment_status ?? 'Unpaid'} className={inputClass}>
              {PAYMENT_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Contract status">
            <select name="contract_status" defaultValue={f?.contract_status ?? 'None'} className={inputClass}>
              {CONTRACT_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>

          <DateInput label="Start date" name="start_date" defaultValue={project?.start_date} />
          <DateInput label="Launch date" name="launch_date" defaultValue={project?.launch_date} />
          <DateInput label="Renewal date" name="renewal_date" defaultValue={project?.renewal_date} />
          <Field label="Priority">
            <select name="priority" defaultValue={n?.priority ?? 'Medium'} className={inputClass}>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </Field>

          <Field label="Internal notes" full>
            <textarea name="internal_note" rows={3} defaultValue={n?.note} className={inputClass} placeholder="Private notes about this project." />
          </Field>
          <Field label="Next action" full>
            <input name="next_action" defaultValue={n?.next_action} className={inputClass} placeholder="The next thing to do." />
          </Field>
        </div>
      </section>

      {message && (
        <p className="rounded-lg border border-moss/20 bg-moss/[0.06] px-4 py-3 text-sm text-bone-soft">
          {message}
        </p>
      )}

      <div className="flex items-center gap-3 border-t border-line pt-6">
        <Button type="submit" size="md">
          {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create project'}
        </Button>
        <Button href="/dashboard/projects" variant="secondary" size="md">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default ProjectForm;
