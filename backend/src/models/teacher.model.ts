import { User, RegisterUserDTO } from "./user.model.js";
import { UE } from "./ue.model.js";

export interface Teacher extends User {
    ues: UE[];
}

export interface CreateTeacherDTO extends RegisterUserDTO {
    ueIds?: string[];
}

export interface UpdateTeacherDTO extends Partial<CreateTeacherDTO> {}

export type TeacherResponseDTO = Omit<Teacher, 'passwordHash'>;