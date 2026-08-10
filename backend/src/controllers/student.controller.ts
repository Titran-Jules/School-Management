import { Request, Response } from 'express';
import { StudentRepository } from '../repositories/student.repository.js';
import { StudentService } from '../services/student.service.js';

const studentRepository = new StudentRepository();
const studentService = new StudentService(studentRepository);

export class StudentController {

    async getStudents(req: Request, res: Response): Promise<void> {
        try {
            const students = await studentService.getAllStudents();
            res.status(200).json(students);
        } catch (error: any) {
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }

    async getStudentById(req: Request<{id: string}>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const student = await studentService.getStudentById(id);
            res.status(200).json(student);
        } catch (error: any) {
            if (error.message === 'Student not found') {
                res.status(404).json({ message: 'Étudiant non trouvé' });
                return;
            }
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }

    async createStudent(req: Request, res: Response): Promise<void> {
        try {
            const { ref, firstName, lastName, email, password, gradeLevel, group } = req.body;

            if (!ref || !firstName || !lastName || !email || !password || !gradeLevel || !group) {
                res.status(400).json({ message: 'All fields are required' });
                return;
            }

            const newStudent = await studentService.createStudent({
                ref, firstName, lastName, email, password, role: 'STUDENT', gradeLevel, group
            });

            res.status(201).json(newStudent);
        } catch (error: any) {
            if (error.message === 'REF unavailable') {
                res.status(400).json({ message: 'This ref is already used' });
                return;
            }
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }

    async updateStudent(req: Request<{id: string}>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedStudent = await studentService.updateStudent(id, req.body);
            res.status(200).json(updatedStudent);
        } catch (error: any) {
            if (error.message === 'Student not found') {
                res.status(404).json({ message: 'Student not found' });
                return;
            }
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }

    async updateGroup(req: Request<{id: string}>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { group } = req.body;

            if (!group) {
                res.status(400).json({ message: 'The new group is required' });
                return;
            }

            await studentService.updateStudentGroup(id, group);
            res.status(200).json({ message: 'New group updated' });
        } catch (error: any) {
            if (error.message === 'Student not found') {
                res.status(404).json({ message: 'Student not found' });
                return;
            }
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }

    async deleteStudent(req: Request<{id: string}>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await studentService.deleteStudent(id);
            res.status(204).send();
        } catch (error: any) {
            if (error.message === 'Student not found') {
                res.status(404).json({ message: 'Student not found' });
                return;
            }
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }
}