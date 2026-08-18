import type { Student, Teacher, UE } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL || '';
const token = localStorage.getItem('token');

export const api = {
  async getStudents(): Promise<Student[]> {
    const res = await fetch(`${API_URL}/api/students`, {
      headers: {'Authorization': `Bearer ${token}`}
    });
    if (!res.ok) throw new Error('Erreur lors du chargement des étudiants');
    return res.json();
  },

  async createStudent(data: any): Promise<Student> {
    const res = await fetch(`${API_URL}/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
       },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Échec de la création');
    }
    return res.json();
  },

  async deleteStudent(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/api/students/${id}`, { 
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${token}`}
     });
    if (!res.ok) throw new Error('Échec de la suppression');
  },

  async getTeachers(): Promise<Teacher[]> {
    const res = await fetch(`${API_URL}/api/teachers`, {
      headers: {'Authorization': `Bearer ${token}`}
    });
    if (!res.ok) throw new Error('Erreur lors du chargement des enseignants');
    return res.json();
  },

  async createTeacher(data: any): Promise<Teacher> {
    const res = await fetch(`${API_URL}/api/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Échec de la création');
    }
    return res.json();
  },

  async deleteTeacher(id: string): Promise<void> {
    const res = await fetch(`${API_URL}/api/teachers/${id}`, { 
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${token}`} 
    });
    if (!res.ok) throw new Error('Échec de la suppression');
  },

  async getUes(): Promise<UE[]> {
    const res = await fetch(`${API_URL}/api/ues`, {
      headers: {'Authorization': `Bearer ${token}`}
    });
    if (!res.ok) throw new Error('Erreur lors du chargement des UEs');
    return res.json();
  }
};