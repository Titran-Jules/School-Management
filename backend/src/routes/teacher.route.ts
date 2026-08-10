import { Router } from 'express';
import { TeacherController } from '../controllers/teacher.controller.js';

const router = Router();
const teacherController = new TeacherController();

router.get('/', (req, res) => teacherController.getTeachers(req, res));
router.get('/:id', (req, res) => teacherController.getTeacherById(req, res));
router.post('/', (req, res) => teacherController.createTeacher(req, res));
router.put('/:id', (req, res) => teacherController.updateTeacher(req, res));
router.delete('/:id', (req, res) => teacherController.deleteTeacher(req, res));

export default router;