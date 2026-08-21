import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import type { Student, Teacher, UE } from '../types/types';
import { useAuth } from '../context/AuthContext';

export const useSchoolData = () => {
  const {user, token} = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [ues, setUes] = useState<UE[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    const activeToken = token || localStorage.getItem("token");
    if (!activeToken) return;
    setLoading(true);
    setError(null);
    try {
      const [sRes, tRes, uRes] = await Promise.allSettled([
        api.getStudents(),
        api.getTeachers(),
        api.getUes(),
      ]);
      if (sRes.status === 'fulfilled') setStudents(sRes.value);
      if (tRes.status === 'fulfilled') setTeachers(tRes.value);
      if (uRes.status === 'fulfilled') setUes(uRes.value);
      if (sRes.status === 'rejected') {
        setError(sRes.reason?.message || 'Erreur lors du chargement des étudiants');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur réseau');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (user){
      loadData();
    }
  }, [user, loadData]);

  const createStudent = async (data: any) => {
    await api.createStudent(data);
    await loadData();
  };

  const createTeacher = async (data: any) => {
    await api.createTeacher(data);
    await loadData();
  };

  const deleteStudent = async (id: string) => {
    if (!confirm('Retirer cet étudiant du registre ?')) return;
    try {
      await api.deleteStudent(id);
      await loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const deleteTeacher = async (id: string) => {
    if (!confirm('Retirer cet enseignant du registre ?')) return;
    try {
      await api.deleteTeacher(id);
      await loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return {
    students,
    teachers,
    ues,
    loading,
    error,
    createStudent,
    createTeacher,
    deleteStudent,
    deleteTeacher,
  };
}