import type { ReactNode } from 'react';

interface FieldProps {
  label: string;
  children: ReactNode;
}

export function Field({ label, children }: FieldProps) {
  return (
    <div>
      <label className="text-xs font-medium text-var(--ink-soft) uppercase tracking-wide">
        {label}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export const inputClass =
  'w-full bg-[var(--paper-raised)] border border-[var(--rule)] rounded-md px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--burgundy)] focus:ring-1 focus:ring-[var(--burgundy)]/30 transition-colors';