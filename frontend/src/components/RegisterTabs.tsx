type Tab = 'students' | 'teachers';

interface RegisterTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  studentCount: number;
  teacherCount: number;
  onRegister: () => void;
}

export const RegisterTabs = ({
  activeTab,
  onTabChange,
  studentCount,
  teacherCount,
  onRegister,
}: RegisterTabsProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
      <div className="flex">
        {(['students', 'teachers'] as const).map((tab) => {
          const isActive = activeTab === tab;
          const label = tab === 'students' ? 'Étudiants' : 'Enseignants';
          const count = tab === 'students' ? studentCount : teacherCount;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-5 py-2.5 text-sm rounded-t-md border border-b-0 -mb-px transition-colors ${
                isActive
                  ? 'bg-var(--paper-raised) border-var(--rule) text-var(--ink) font-display font-semibold'
                  : 'bg-transparent border-transparent text-var(--ink-soft) hover:text-var(--ink) font-medium'
              }`}
            >
              {label} <span className="font-mono text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={onRegister}
        className="bg-var(--ink) hover:bg-var(--burgundy) text-var(--paper) text-sm font-medium px-4 py-2.5 rounded-sm transition-colors mb-2"
      >
        + Inscrire un {activeTab === 'students' ? 'étudiant' : 'enseignant'}
      </button>
    </div>
  );
}