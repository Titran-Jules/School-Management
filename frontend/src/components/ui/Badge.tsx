import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'ink' | 'burgundy' | 'sage';
}

const TONES: Record<string, string> = {
  ink: 'bg-[var(--paper-dim)] text-[var(--ink-soft)] border-[var(--rule)]',
  burgundy: 'bg-[var(--burgundy-dim)] text-[var(--burgundy)] border-[var(--burgundy)]/30',
  sage: 'bg-[var(--sage-dim)] text-[var(--sage)] border-[var(--sage)]/30',
};

export function Badge({ children, tone = 'ink' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2.5 py-1 rounded text-[11px] font-mono font-medium tracking-wide border ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}