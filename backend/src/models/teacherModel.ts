import { User, RegisterUserDTO } from "./userModel.js";
import { UE } from "./ueModel.js";

export interface Teacher extends User {
    ues: UE[];
}

export interface CreateTeacherDTO extends RegisterUserDTO {
    ueIds?: string[];
}

export interface UpdateTeacherDTO extends Partial<CreateTeacherDTO> {}

export type TeacherResponseDTO = Omit<Teacher, 'passwordHash'>;