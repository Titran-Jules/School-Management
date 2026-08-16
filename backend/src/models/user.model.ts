export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';

export interface User {
    id: string;
    ref: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    createdAt?: Date;
}

export interface RegisterUserDTO {
    ref: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
}

export interface UserAuth {
    id: string;
    ref: string;
    role: UserRole;
    passwordHash: string;
}

export interface UserLogin {
    id: string;
    ref: string;
    role: UserRole;
}

export interface CreateUserInDbDTO extends Omit<RegisterUserDTO, "password"> {
    passwordHash: string;
}

export type UserResponseDTO = Omit<User, 'passwordHash'>;