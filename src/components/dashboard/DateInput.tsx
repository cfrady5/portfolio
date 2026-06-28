'use client';

interface DateInputProps {
  label: string;
  name: string;
  defaultValue?: string | null;
  hint?: string;
}

export function DateInput({ label, name, defaultValue, hint }: DateInputProps) {
  // Normalize ISO timestamps to YYYY-MM-DD for the date input.
  const value = defaultValue ? defaultValue.slice(0, 10) : '';
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-bone">{label}</span>
      <input
        type="date"
        name={name}
        defaultValue={value}
        className="w-full rounded-xl border border-line bg-ink-900/60 px-3.5 py-2.5 text-sm text-bone focus-ring [color-scheme:dark]"
      />
      {hint && <span className="text-xs text-bone-soft/60">{hint}</span>}
    </label>
  );
}

export default DateInput;
