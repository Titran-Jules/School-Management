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
    passwordHash: string;
    role: UserRole;
}

export type UserResponseDTO = Omit<User, 'passwordHash'>;