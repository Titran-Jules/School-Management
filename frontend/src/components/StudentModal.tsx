import { useState, type FormEvent } from 'react';
import type { GradeLevel, Group } from '../types/types';
import { Field, inputClass } from './ui/FormField';

interface StudentModalProps {
  onClose: () => void;
  onCreate: (data: any) => Promise<void>;
}

const GROUPS: Group[] = ['N1', 'N2', 'N3', 'K1', 'K2', 'K3', 'J1', 'J2', 'J3'];

export const StudentModal = ({ onClose, onCreate }: StudentModalProps) => {
  const [form, setForm] = useState({
    ref: '', firstName: '', lastName: '', email: '', password: '',
    gradeLevel: 'L1' as GradeLevel, group: 'N1' as Group,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await onCreate(form);
      onClose();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-var(--ink)/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-var(--paper-raised) border border-var(--rule) rounded-sm p-6 max-w-md w-full shadow-xl">
        <h2 className="font-display text-lg text-var(--ink) mb-4">Inscrire un élève</h2>
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
          <div className="grid grid-cols-2 gap-3">
            <Field label="Niveau">
              <select
                className={inputClass} value={form.gradeLevel}
                onChange={(e) => setForm({ ...form, gradeLevel: e.target.value as GradeLevel })}
              >
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
              </select>
            </Field>
            <Field label="Groupe">
              <select
                className={inputClass} value={form.group}
                onChange={(e) => setForm({ ...form, group: e.target.value as Group })}
              >
                {GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </Field>
          </div>

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