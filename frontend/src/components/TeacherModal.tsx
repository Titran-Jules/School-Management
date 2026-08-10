import { useState, type FormEvent } from 'react';
import type { UE } from '../types/types';
import { Field, inputClass } from './ui/FormField';

interface TeacherModalProps {
  ues: UE[];
  onClose: () => void;
  onCreate: (data: any) => Promise<void>;
}

export function TeacherModal({ ues, onClose, onCreate }: TeacherModalProps) {
  const [form, setForm] = useState({
    ref: '', firstName: '', lastName: '', email: '', password: '',
    selectedUeIds: [] as string[],
  });

  const toggleUe = (id: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      selectedUeIds: checked
        ? [...prev.selectedUeIds, id]
        : prev.selectedUeIds.filter((ueId) => ueId !== id),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await onCreate({ ...form, ueIds: form.selectedUeIds });
      onClose();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-var(--ink)/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-var(--paper-raised) border border-var(--rule) rounded-sm p-6 max-w-md w-full shadow-xl">
        <h2 className="font-display text-lg text-var(--ink) mb-4">Inscrire un enseignant</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Field label="Matricule">
            <input
              type="text" required className={inputClass}
              value={form.ref} onChange={(e) => setForm({ ...form, ref: e.target.value })}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Prénom">
              <input
                type="text" required className={inputClass}
                value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
            </Field>
            <Field label="Nom">
              <input
                type="text" required className={inputClass}
                value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Email">
            <input
              type="email" required className={inputClass}
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Field>
          <Field label="Mot de passe">
            <input
              type="password" required className={inputClass}
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </Field>

          <Field label="Attribuer des UE">
            <div className="max-h-32 overflow-y-auto bg-var(--paper) border border-var(--rule) rounded-md p-2 space-y-1">
              {ues.length === 0 ? (
                <p className="text-xs text-var(--ink-soft) p-1">Aucune UE disponible</p>
              ) : (
                ues.map((ue) => (
                  <label
                    key={ue.id}
                    className="flex items-center gap-2 text-xs text-var(--ink) hover:bg-var(--paper-dim) p-1 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form.selectedUeIds.includes(ue.id)}
                      onChange={(e) => toggleUe(ue.id, e.target.checked)}
                      className="rounded border-var(--rule) text-var(--burgundy) focus:ring-0"
                    />
                    {ue.title}
                  </label>
                ))
              )}
            </div>
          </Field>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button" onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-var(--ink-soft) hover:text-var(--ink)"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-var(--ink) hover:bg-var(--burgundy) text-var(--paper) text-sm font-medium px-4 py-2 rounded-sm transition-colors"
            >
              Inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}