import type { Student } from '../types/types';
import { Badge } from './ui/Badge';

interface StudentsTableProps {
  students: Student[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export const StudentsTable = ({ students, loading, onDelete }: StudentsTableProps) => {
  if (loading) {
    return (
      <div className="p-12 text-center text-var(--ink-soft) text-sm font-mono">
        Chargement du registre…
      </div>
    );
  }

  return (
    <table className="w-full text-left text-sm text-var(--ink)">
      <thead className="bg-var(--paper-dim) text-var(--ink-soft) uppercase text-[11px] tracking-wider border-b border-var(--rule)">
        <tr>
          <th className="px-6 py-3.5 font-semibold">Ref</th>
          <th className="px-6 py-3.5 font-semibold">Nom & Prénom</th>
          <th className="px-6 py-3.5 font-semibold">Email</th>
          <th className="px-6 py-3.5 font-semibold">Niveau</th>
          <th className="px-6 py-3.5 font-semibold">Groupe</th>
          <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-var(--rule)/60">
        {students.length === 0 ? (
          <tr>
            <td colSpan={6} className="px-6 py-10 text-center text-var(--ink-soft)">
              Aucun étudiant inscrit pour le moment.
            </td>
          </tr>
        ) : (
          students.map((s) => (
            <tr key={s.id} className="hover:bg-var(--paper-dim)/50 transition-colors">
              <td className="px-6 py-4 font-mono text-xs text-var(--ink-soft)">{s.ref}</td>
              <td className="px-6 py-4 font-medium">{s.firstName} {s.lastName}</td>
              <td className="px-6 py-4 text-var(--ink-soft)">{s.email}</td>
              <td className="px-6 py-4"><Badge tone="ink">{s.gradeLevel}</Badge></td>
              <td className="px-6 py-4"><Badge tone="sage">{s.group}</Badge></td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onDelete(s.id)}
                  className="text-xs text-var(--rust) hover:underline"
                >
                  Retirer
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}