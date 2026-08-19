import { UE, CreateUeDTO } from '../models/ueModel.js';
import { db } from '../config/db.js';

export class UeRepository {

    async findAll(): Promise<UE[]> {
        const query = `
            SELECT id, title
            FROM ues
            ORDER BY title ASC
        `;
        const result = await db.query<UE>(query);
        return result.rows;
    }

    async findById(id: string): Promise<UE | null> {
        const query = `
            SELECT id, title
            FROM ues
            WHERE id = $1
        `;
        const result = await db.query<UE>(query, [id]);
        return result.rows[0] || null;
    }

    async create(data: CreateUeDTO): Promise<UE> {
        const query = `
            INSERT INTO ues (title)
            VALUES ($1)
            RETURNING id, title
        `;
        const result = await db.query<UE>(query, [data.title]);
        return result.rows[0];
    }

    async update(id: string, data: CreateUeDTO): Promise<UE | null> {
        const query = `
            UPDATE ues
            SET title = $1
            WHERE id = $2
            RETURNING id, title
        `;
        const result = await db.query<UE>(query, [data.title, id]);
        return result.rows[0] || null;
    }

    async delete(id: string): Promise<boolean> {
        const query = `
            DELETE FROM ues
            WHERE id = $1
        `;
        const result = await db.query(query, [id]);
        return (result.rowCount ?? 0) > 0;
    }
}