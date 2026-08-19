import { Request, Response } from 'express';
import { UeRepository } from '../repositories/ueRepository.js';
import { UeService } from '../services/ueService.js';

const ueRepository = new UeRepository();
const ueService = new UeService(ueRepository);

export class UeController {

    async getUes(req: Request, res: Response): Promise<void> {
        try {
            const ues = await ueService.getAllUes();
            res.status(200).json(ues);
        } catch (error: any) {
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }

    async getUeById(req: Request<{id: string}>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const ue = await ueService.getUeById(id);
            res.status(200).json(ue);
        } catch (error: any) {
            if (error.message === 'UE not found') {
                res.status(404).json({ message: 'UE not found' });
                return;
            }
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }

    async createUe(req: Request, res: Response): Promise<void> {
        try {
            const { title } = req.body;
            const newUe = await ueService.createUe({ title });
            res.status(201).json(newUe);
        } catch (error: any) {
            if (error.message === 'Title required') {
                res.status(400).json({ message: 'The title is missing' });
                return;
            }
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }

    async updateUe(req: Request<{id: string}>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const updatedUe = await ueService.updateUe(id, { title });
            res.status(200).json(updatedUe);
        } catch (error: any) {
            if (error.message === 'UE not found') {
                res.status(404).json({ message: 'UE not found' });
                return;
            }
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }

    async deleteUe(req: Request<{id: string}>, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await ueService.deleteUe(id);
            res.status(204).send();
        } catch (error: any) {
            if (error.message === 'UE not found') {
                res.status(404).json({ message: 'UE not found' });
                return;
            }
            res.status(500).json({ message: 'Error server', detail: error.message });
        }
    }
}