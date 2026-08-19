import { Request, Response } from 'express';
import { TeacherRepository } from '../repositories/teacherRepository.js';
import { TeacherService } from '../services/teacherService.js';

const teacherRepository = new TeacherRepository();
const teacherService = new TeacherService(teacherRepository);

export class TeacherController {
    async getTeachers(req: Request, res: Response): Promise<void> {
        try {
            const teachers = await teacherService.getAllTeachers();
            res.status(200).json(teachers);
        } catch (error: any) {
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }

    async getTeacherById(req: Request<{id: string}>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const teacher = await teacherService.getTeacherById(id);
            res.status(200).json(teacher);
        } catch (error: any) {
            if (error.message === 'Teacher not found') {
                res.status(404).json({ message: 'Teacher not found' });
                return;
            }
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }

    async createTeacher(req: Request, res: Response): Promise<void> {
        try {
            const { ref, firstName, lastName, email, password, ueIds } = req.body;

            if (!ref || !firstName || !lastName || !email || !password) {
                res.status(400).json({ message: 'Fields missing' });
                return;
            }

            const newTeacher = await teacherService.createTeacher({
                ref,
                firstName,
                lastName,
                email,
                password,
                role: 'TEACHER',
                ueIds
            });

            res.status(201).json(newTeacher);
        } catch (error: any) {
            if (error.message === 'Email already used') {
                res.status(400).json({ message: 'This email is already used' });
                return;
            }
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }

    async updateTeacher(req: Request<{id: string}>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedTeacher = await teacherService.updateTeacher(id, req.body);
            res.status(200).json(updatedTeacher);
        } catch (error: any) {
            if (error.message === 'Teacher not found') {
                res.status(404).json({ message: 'Teacher not found' });
                return;
            }
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }

    async deleteTeacher(req: Request<{id: string}>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await teacherService.deleteTeacher(id);
            res.status(204).send();
        } catch (error: any) {
            if (error.message === 'Teacher not found') {
                res.status(404).json({ message: 'Teacher not found' });
                return;
            }
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }
}