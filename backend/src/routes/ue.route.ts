import { Router } from 'express';
import { UeController } from '../controllers/ue.controller.js';

const router = Router();
const ueController = new UeController();

router.get('/', (req, res) => ueController.getUes(req, res));
router.get('/:id', (req, res) => ueController.getUeById(req, res));
router.post('/', (req, res) => ueController.createUe(req, res));
router.put('/:id', (req, res) => ueController.updateUe(req, res));
router.delete('/:id', (req, res) => ueController.deleteUe(req, res));

export default router;