interface StatCardsProps {
  studentCount: number;
  teacherCount: number;
  ueCount: number;
}

export function StatCards({ studentCount, teacherCount, ueCount }: StatCardsProps) {
  const cards = [
    { label: 'Étudiants inscrits', value: studentCount, tone: 'text-[var(--ink)]' },
    { label: 'Enseignants', value: teacherCount, tone: 'text-[var(--ink)]' },
    { label: "Unités d'enseignement", value: ueCount, tone: 'text-[var(--burgundy)]' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {cards.map((c) => (
        <div
          key={c.label}
          className="relative bg-var(--paper-raised) border border-var(--rule) rounded-sm p-5"
        >
          <span className="absolute top-3 right-3 w-2 h-2 rounded-full border border-var(--rule)" />
          <p className="text-[11px] font-medium text-var(--ink-soft) uppercase tracking-wider">
            {c.label}
          </p>
          <p className={`font-display text-3xl mt-2 ${c.tone}`}>{c.value}</p>
        </div>
      ))}
    </div>
  );
}