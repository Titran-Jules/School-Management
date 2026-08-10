import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import type { Student, Teacher, UE } from '../types/types';

export function useSchoolData() {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [ues, setUes] = useState<UE[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [sData, tData, uData] = await Promise.all([
        api.getStudents(),
        api.getTeachers(),
        api.getUes(),
      ]);
      setStudents(sData);
      setTeachers(tData);
      setUes(uData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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