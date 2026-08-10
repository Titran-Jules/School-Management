import { User, RegisterUserDTO } from "./user.model.js";

export type GradeLevel = 'L1' | 'L2' | 'L3';

export type Group = 'N1' | 'N2' | 'N3' | 'K1' | 'K2' | 'K3' | 'J1' | 'J2' | 'J3';

export interface Student extends User {
    gradeLevel: GradeLevel;
    group: Group;
}

export interface CreateStudentDTO extends RegisterUserDTO  {
    gradeLevel: Student['gradeLevel'];
    group: Student['group'];
}

export interface CreateStudentInDbDTO extends Omit<CreateStudentDTO, 'password'> {
    passwordHash: string;
}

export type StudentResponseDTO = Omit<Student, 'passwordHash'>;