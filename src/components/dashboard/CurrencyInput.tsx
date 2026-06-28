'use client';

interface CurrencyInputProps {
  label: string;
  name: string;
  defaultValue?: number;
  hint?: string;
}

export function CurrencyInput({
  label,
  name,
  defaultValue,
  hint,
}: CurrencyInputProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-bone">{label}</span>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-bone-soft">
          $
        </span>
        <input
          type="number"
          name={name}
          min={0}
          step="0.01"
          defaultValue={defaultValue ?? ''}
          placeholder="0"
          className="w-full rounded-xl border border-line bg-ink-900/60 py-2.5 pl-7 pr-3.5 text-sm text-bone placeholder:text-bone-soft/40 focus-ring"
        />
      </div>
      {hint && <span className="text-xs text-bone-soft/60">{hint}</span>}
    </label>
  );
}

export default CurrencyInput;
