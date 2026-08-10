import { User, CreateUserInDbDTO } from "./user.model.js";

export type GradeLevel = 'L1' | 'L2' | 'L3';

export type Group = 'N1' | 'N2' | 'N3' | 'K1' | 'K2' | 'K3' | 'J1' | 'J2' | 'J3';

export interface Student extends User {
    gradeLevel: GradeLevel;
    group: Group;
}

export interface CreateStudentDTO extends CreateUserInDbDTO  {
    gradeLevel: Student['gradeLevel'];
    group: Student['group'];
}