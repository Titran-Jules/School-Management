import type { Student, Teacher, UE } from "../types/types";

export const api = {
  async getStudents(): Promise<Student[]> {
    const res = await fetch('/api/students');
    if (!res.ok) throw new Error('Erreur lors du chargement des étudiants');
    return res.json();
  },

  async createStudent(data: any): Promise<Student> {
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Échec de la création');
    }
    return res.json();
  },

  async deleteStudent(id: string): Promise<void> {
    const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Échec de la suppression');
  },

  async getTeachers(): Promise<Teacher[]> {
    const res = await fetch('/api/teachers');
    if (!res.ok) throw new Error('Erreur lors du chargement des enseignants');
    return res.json();
  },

  async createTeacher(data: any): Promise<Teacher> {
    const res = await fetch('/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Échec de la création');
    }
    return res.json();
  },

  async deleteTeacher(id: string): Promise<void> {
    const res = await fetch(`/api/teachers/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Échec de la suppression');
  },

  async getUes(): Promise<UE[]> {
    const res = await fetch('/api/ues');
    if (!res.ok) throw new Error('Erreur lors du chargement des UEs');
    return res.json();
  }
};