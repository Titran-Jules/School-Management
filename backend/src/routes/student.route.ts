import { Router } from 'express';
import { StudentController } from '../controllers/student.controller.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { studentRegistrationSchema } from '../schemas/auth.schema.js';

const router = Router();
const studentController = new StudentController();

router.get('/', (req, res) => studentController.getStudents(req, res));
router.get('/:id', (req, res) => studentController.getStudentById(req, res));
router.post('/', validateBody(studentRegistrationSchema), (req, res) => studentController.createStudent(req, res));
router.put('/:id', (req, res) => studentController.updateStudent(req, res));
router.patch('/:id/group', (req, res) => studentController.updateGroup(req, res));
router.delete('/:id', (req, res) => studentController.deleteStudent(req, res));

export default router;