import { UeRepository } from '../repositories/ueRepository.js';
import { UE, CreateUeDTO } from '../models/ueModel.js';

export class UeService {
    constructor(private ueRepository: UeRepository) {}

    async getAllUes(): Promise<UE[]> {
        return await this.ueRepository.findAll();
    }

    async getUeById(id: string): Promise<UE> {
        const ue = await this.ueRepository.findById(id);
        if (!ue) {
            throw new Error('UE not found');
        }
        return ue;
    }

    async createUe(data: CreateUeDTO): Promise<UE> {
        if (!data.title || data.title.trim() === '') {
            throw new Error('Title required');
        }
        return await this.ueRepository.create(data);
    }

    async updateUe(id: string, data: CreateUeDTO): Promise<UE> {
        const updatedUe = await this.ueRepository.update(id, data);
        if (!updatedUe) {
            throw new Error('UE not found');
        }
        return updatedUe;
    }

    async deleteUe(id: string): Promise<void> {
        const deleted = await this.ueRepository.delete(id);
        if (!deleted) {
            throw new Error('UE not found');
        }
    }
}