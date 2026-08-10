export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';
export type GradeLevel = 'L1' | 'L2' | 'L3';
export type Group = 'N1' | 'N2' | 'N3' | 'K1' | 'K2' | 'K3' | 'J1' | 'J2' | 'J3';

export interface UE {
  id: string;
  title: string;
}

export interface Student {
  id: string;
  ref: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  gradeLevel: GradeLevel;
  group: Group;
  createdAt?: string;
}

export interface Teacher {
  id: string;
  ref: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  ues: UE[];
  createdAt?: string;
}