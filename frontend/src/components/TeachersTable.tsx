import type { Teacher } from '../types/types';
import { Badge } from './ui/Badge';

interface TeachersTableProps {
  teachers: Teacher[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export function TeachersTable({ teachers, loading, onDelete }: TeachersTableProps) {
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
          <th className="px-6 py-3.5 font-semibold">Matricule</th>
          <th className="px-6 py-3.5 font-semibold">Enseignant</th>
          <th className="px-6 py-3.5 font-semibold">Email</th>
          <th className="px-6 py-3.5 font-semibold">UE enseignées</th>
          <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-var(--rule)/60">
        {teachers.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-6 py-10 text-center text-var(--ink-soft)">
              Aucun enseignant trouvé.
            </td>
          </tr>
        ) : (
          teachers.map((t) => (
            <tr key={t.id} className="hover:bg-var(--paper-dim)/50 transition-colors">
              <td className="px-6 py-4 font-mono text-xs text-var(--ink-soft)">{t.ref}</td>
              <td className="px-6 py-4 font-medium">{t.firstName} {t.lastName}</td>
              <td className="px-6 py-4 text-var(--ink-soft)">{t.email}</td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {t.ues && t.ues.length > 0 ? (
                    t.ues.map((ue) => (
                      <Badge key={ue.id} tone="burgundy">{ue.title}</Badge>
                    ))
                  ) : (
                    <span className="text-xs text-var(--ink-soft) italic">Aucune UE assignée</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onDelete(t.id)}
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