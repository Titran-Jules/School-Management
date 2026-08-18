import { TeacherRepository } from "../repositories/teacher.repository.js";
import { Teacher, CreateTeacherDTO, UpdateTeacherDTO, TeacherResponseDTO } from "../models/teacher.model.js";
import { PasswordSecurity } from "../security/password.security.js";

export class TeacherService {
    constructor(private teacherRepository: TeacherRepository) {}

    private formatTeacherResponse(teacher: Teacher): TeacherResponseDTO {
        const { passwordHash, ...safeTeacher } = teacher;
        return safeTeacher;
    }

    async getAllTeachers(): Promise<TeacherResponseDTO[]> {
        const teachers = await this.teacherRepository.findAll();
        return teachers.map((t) => this.formatTeacherResponse(t));
    }

    async getTeacherById(id: string): Promise<TeacherResponseDTO> {
        const teacher = await this.teacherRepository.findById(id);
        if (!teacher) {
            throw new Error("Teacher not found");
        }
        return this.formatTeacherResponse(teacher);
    }

    async createTeacher(data: CreateTeacherDTO): Promise<TeacherResponseDTO> {
        const existingEmail = await this.teacherRepository.findByEmail(data.email);
        if (existingEmail) {
            throw new Error('Email unavailable');
        }

        const passwordSecurity = await PasswordSecurity.hash(data.password);

        const newTeacher = await this.teacherRepository.create({
            ref: data.ref,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            passwordHash: passwordSecurity,
            role: 'TEACHER',
            ueIds: data.ueIds
        });

        return this.formatTeacherResponse(newTeacher);
    }

    async updateTeacher(id: string, data: UpdateTeacherDTO): Promise<TeacherResponseDTO> {
        const existingTeacher = await this.teacherRepository.findById(id);
        if (!existingTeacher) {
            throw new Error('Teacher not found');
        }

        let passwordHash: string | undefined = undefined;
        if (data.password) {
            passwordHash = await PasswordSecurity.hash(data.password);
        }

        const updatedTeacher = await this.teacherRepository.update(id, {
            ...data,
            passwordHash
        });

        if (!updatedTeacher) {
            throw new Error('Update failed');
        }

        return this.formatTeacherResponse(updatedTeacher);
    }

    async deleteTeacher(id: string): Promise<void> {
        const deleted = await this.teacherRepository.delete(id);
        if (!deleted) {
            throw new Error('Teacher not found');
        }
    }
}