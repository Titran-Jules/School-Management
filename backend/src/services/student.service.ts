import { StudentRepository } from '../repositories/student.repository.js';
import { Student, CreateStudentDTO, StudentResponseDTO, Group } from '../models/student.model.js';

export class StudentService {
    constructor(private studentRepository: StudentRepository) {}

    private formatStudentResponse(student: Student): StudentResponseDTO {
        const { passwordHash, ...safeStudent } = student;
        return safeStudent;
    }

    async getAllStudents(): Promise<StudentResponseDTO[]> {
        const students = await this.studentRepository.findAll();
        return students.map(s => this.formatStudentResponse(s));
    }

    async getStudentById(id: string): Promise<StudentResponseDTO> {
        const student = await this.studentRepository.findById(id);
        if (!student) {
            throw new Error('Student not found');
        }
        return this.formatStudentResponse(student);
    }

    async createStudent(data: CreateStudentDTO): Promise<StudentResponseDTO> {
        const existingRef = await this.studentRepository.findByRef(data.ref);
        if (existingRef) {
            throw new Error('REF unavailable');
        }

        const dummyPasswordHash = `hashed_${data.password}`;

        const newStudent = await this.studentRepository.create({
            ref: data.ref,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            passwordHash: dummyPasswordHash,
            role: 'STUDENT',
            gradeLevel: data.gradeLevel,
            group: data.group
        });

        return this.formatStudentResponse(newStudent);
    }

    async updateStudent(id: string, data: CreateStudentDTO): Promise<StudentResponseDTO> {
        const existing = await this.studentRepository.findById(id);
        if (!existing) {
            throw new Error('Student not found');
        }

        const dummyPasswordHash = data.password ? `hashed_${data.password}` : existing.passwordHash;

        const updatedStudent = await this.studentRepository.updateAll(id, {
            ...data,
            passwordHash: dummyPasswordHash,
            role: 'STUDENT'
        });

        if (!updatedStudent) {
            throw new Error('Update failed');
        }

        return this.formatStudentResponse(updatedStudent);
    }

    async updateStudentGroup(id: string, newGroup: Group): Promise<void> {
        const existing = await this.studentRepository.findById(id);
        if (!existing) {
            throw new Error('Student not found');
        }

        await this.studentRepository.updateStudentGroup(id, newGroup);
    }

    async deleteStudent(id: string): Promise<void> {
        const existing = await this.studentRepository.findById(id);
        if (!existing) {
            throw new Error('Student not found');
        }

        await this.studentRepository.deleteStudent(id);
    }
}