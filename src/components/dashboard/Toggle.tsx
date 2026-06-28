'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ToggleProps {
  label: string;
  name: string;
  defaultChecked?: boolean;
  description?: string;
}

/** Accessible switch backed by a hidden checkbox so it posts with the form. */
function Toggle({ label, name, defaultChecked, description }: ToggleProps) {
  const [checked, setChecked] = useState(Boolean(defaultChecked));

  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-line bg-ink-900/40 p-4">
      <div>
        <span className="text-sm font-medium text-bone">{label}</span>
        {description && (
          <p className="mt-0.5 text-xs text-bone-soft">{description}</p>
        )}
      </div>
      <label className="relative inline-flex shrink-0 cursor-pointer items-center">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={cn(
            'h-6 w-11 rounded-full border transition-colors',
            checked
              ? 'border-moss/40 bg-moss/30'
              : 'border-line bg-ink-700',
          )}
        />
        <span
          className={cn(
            'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-bone transition-transform',
            checked && 'translate-x-5',
          )}
        />
      </label>
    </div>
  );
}

export function VisibilityToggle(props: Omit<ToggleProps, 'label'> & { label?: string }) {
  return (
    <Toggle
      label={props.label ?? 'Public portfolio visibility'}
      description="Show this project on the public /work gallery."
      name={props.name}
      defaultChecked={props.defaultChecked}
    />
  );
}

export function FeaturedToggle(props: Omit<ToggleProps, 'label'> & { label?: string }) {
  return (
    <Toggle
      label={props.label ?? 'Featured'}
      description="Highlight on the homepage (requires public visibility)."
      name={props.name}
      defaultChecked={props.defaultChecked}
    />
  );
}

export default Toggle;
