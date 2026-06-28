'use client';

import { useState } from 'react';
import { Button } from './Button';

const PROJECT_TYPES = [
  'New website',
  'Website redesign',
  'Brand identity',
  'Landing page',
  'App / product concept',
  'CMS / system',
  'Other',
];

const BUDGETS = [
  'Under $1k',
  '$1k – $3k',
  '$3k – $6k',
  '$6k – $12k',
  '$12k+',
  'Not sure yet',
];

const TIMELINES = [
  'ASAP',
  '2–4 weeks',
  '1–2 months',
  '3+ months',
  'Just exploring',
];

const fieldClass =
  'w-full rounded-xl border border-line bg-ink-900/60 px-4 py-3 text-sm text-bone placeholder:text-bone-soft/50 focus-ring transition-colors hover:border-bone/15';
const labelClass = 'mb-2 block text-sm font-medium text-bone';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // ---------------------------------------------------------------------
    // BACKEND HOOK — wire one of these up when ready:
    //
    //  • Formspree:  fetch('https://formspree.io/f/<id>', { method: 'POST', body })
    //  • Resend:     POST to a /api/contact route handler that calls Resend.
    //  • Supabase:   insert into a `contact_messages` table via a server action.
    //
    // For now we just show a success state so the UI is fully usable.
    // ---------------------------------------------------------------------
    const data = new FormData(e.currentTarget);
    // eslint-disable-next-line no-console
    console.log('Contact form submission:', Object.fromEntries(data.entries()));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-moss/30 bg-moss/5 p-10 text-center">
        <h3 className="text-xl font-semibold text-bone">Thanks — message ready.</h3>
        <p className="mt-3 text-sm leading-relaxed text-bone-soft">
          The form is wired for UI. Connect Formspree, Resend, or Supabase (see
          the comment in <code className="text-moss-400">ContactForm.tsx</code>)
          to start receiving submissions. In the meantime, email me directly at{' '}
          <a
            href="mailto:cjfrady5@gmail.com"
            className="text-moss-400 underline-offset-4 hover:underline"
          >
            cjfrady5@gmail.com
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-bone-soft hover:text-bone focus-ring rounded"
        >
          ← Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-line bg-ink-800/40 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Company <span className="text-bone-soft/50">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          placeholder="Company or organization"
          className={fieldClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="projectType" className={labelClass}>
            Project type
          </label>
          <select id="projectType" name="projectType" className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget range
          </label>
          <select id="budget" name="budget" className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className={labelClass}>
            Timeline
          </label>
          <select id="timeline" name="timeline" className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project, goals, and what success looks like."
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-bone-soft/70">
          I usually reply within a day or two.
        </p>
        <Button type="submit" size="md">
          Send message
        </Button>
      </div>
    </form>
  );
}

export default ContactForm;
