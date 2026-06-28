'use client';

import { cn } from '@/lib/utils';

interface FilterTabsProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
}

export function FilterTabs({ options, active, onChange }: FilterTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects"
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option)}
            className={cn(
              'rounded-full border px-4 py-2 text-sm transition-colors focus-ring',
              isActive
                ? 'border-moss/40 bg-moss/15 text-moss-400'
                : 'border-line text-bone-soft hover:border-bone/20 hover:text-bone',
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default FilterTabs;
