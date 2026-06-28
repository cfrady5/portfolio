import type { Client } from '@/types';

// ---------------------------------------------------------------------------
// Local fallback client data (PRIVATE — dashboard only).
// Mirrors the Supabase `clients` table.
// ---------------------------------------------------------------------------

const now = '2026-01-15T00:00:00.000Z';

export const clients: Client[] = [
  {
    id: 'c-thoy',
    name: 'Tyler Hoy',
    company: 'THOY Lawncare',
    email: 'tyler@thoylawncare.com',
    phone: '(317) 555-0142',
    website: 'https://thoylawncare.com',
    status: 'Active',
    notes:
      'Local lawncare. Friendly, responsive. Wants seasonal promos and a simple quote form.',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'c-heartland',
    name: 'Dr. Lena Park',
    company: 'Heartland BioWorks',
    email: 'lena.park@heartlandbioworks.org',
    phone: '(317) 555-0188',
    website: 'https://heartlandbioworks.org',
    status: 'Active',
    notes:
      'Biotech initiative. Needs CMS-driven structure and ongoing content support. Renewal ~Sep 2026.',
    created_at: now,
    updated_at: now,
  },
  {
    id: 'c-ari',
    name: 'Applied Research Institute',
    company: 'Applied Research Institute (ARI)',
    email: 'partnerships@appliedresearchinstitute.org',
    phone: '(765) 555-0117',
    website: 'https://appliedresearchinstitute.org',
    status: 'Active',
    notes:
      'Role-based work (ARI / SciTechCONNECT / RAM / Bizzabo). Keep public framing high-level and approved.',
    created_at: now,
    updated_at: now,
  },
];

export function getClientById(id: string | null): Client | undefined {
  if (!id) return undefined;
  return clients.find((c) => c.id === id);
}
