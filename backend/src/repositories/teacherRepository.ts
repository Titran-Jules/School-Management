import { db } from "../config/db.js";
import { Teacher, CreateTeacherDTO, UpdateTeacherDTO } from "../models/teacherModel.js";

export interface CreateTeacherInDbDTO extends Omit<CreateTeacherDTO, 'password'> {
    passwordHash: string;
}

export class TeacherRepository {
    async findAll(): Promise<Teacher[]> {
        const query = `
            SELECT 
                u.id, u.ref, u.first_name AS "firstName", u.last_name AS "lastName",
                u.email, u.password_hash AS "passwordHash", u.role, u.created_at AS "createdAt",
                COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT('id', ue.id, 'title', ue.title)
                    ) FILTER (WHERE ue.id IS NOT NULL), '[]'
                ) AS ues
            FROM users u
            LEFT JOIN teacher_ues tu ON u.id = tu.teacher_id
            LEFT JOIN ues ue ON tu.ue_id = ue.id
            WHERE u.role = 'TEACHER'
            GROUP BY u.id
            ORDER BY u.last_name ASC
        `;
        const result = await db.query<Teacher>(query);
        return result.rows;
    }

    async findById(id: string): Promise<Teacher | null> {
        const query = `
            SELECT 
                u.id, u.ref, u.first_name AS "firstName", u.last_name AS "lastName",
                u.email, u.password_hash AS "passwordHash", u.role, u.created_at AS "createdAt",
                COALESCE(
                    JSON_AGG(
                        JSON_BUILD_OBJECT('id', ue.id, 'title', ue.title)
                    ) FILTER (WHERE ue.id IS NOT NULL), '[]'
                ) AS ues
            FROM users u
            LEFT JOIN teacher_ues tu ON u.id = tu.teacher_id
            LEFT JOIN ues ue ON tu.ue_id = ue.id
            WHERE u.id = $1 AND u.role = 'TEACHER'
            GROUP BY u.id
        `;
        const result = await db.query<Teacher>(query, [id]);
        return result.rows[0] || null;
    }

    async findByEmail(email: string): Promise<Teacher | null> {
        const query = `SELECT id, email FROM users WHERE email = $1`;
        const result = await db.query<Teacher>(query, [email]);
        return result.rows[0] || null;
    }

    async create(data: CreateTeacherInDbDTO): Promise<Teacher> {
        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const userQuery = `
                INSERT INTO users (ref, first_name, last_name, email, password_hash, role)
                VALUES ($1, $2, $3, $4, $5, 'TEACHER')
                RETURNING id
            `;
            const userValues = [data.ref, data.firstName, data.lastName, data.email, data.passwordHash];
            const userResult = await client.query(userQuery, userValues);
            const teacherId = userResult.rows[0].id;

            if (data.ueIds && data.ueIds.length > 0) {
                for (const ueId of data.ueIds) {
                    await client.query(
                        'INSERT INTO teacher_ues (teacher_id, ue_id) VALUES ($1, $2)',
                        [teacherId, ueId]
                    );
                }
            }

            await client.query('COMMIT');
            return (await this.findById(teacherId))!;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async update(id: string, data: Partial<CreateTeacherInDbDTO>): Promise<Teacher | null> {
        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const userQuery = `
                UPDATE users
                SET ref = COALESCE($1, ref),
                    first_name = COALESCE($2, first_name),
                    last_name = COALESCE($3, last_name),
                    email = COALESCE($4, email),
                    password_hash = COALESCE($5, password_hash)
                WHERE id = $6 AND role = 'TEACHER'
            `;
            const userValues = [
                data.ref || null,
                data.firstName || null,
                data.lastName || null,
                data.email || null,
                data.passwordHash || null,
                id
            ];
            const userResult = await client.query(userQuery, userValues);

            if (userResult.rowCount === 0) {
                await client.query('ROLLBACK');
                return null;
            }

            if (data.ueIds !== undefined) {
                await client.query('DELETE FROM teacher_ues WHERE teacher_id = $1', [id]);

                for (const ueId of data.ueIds) {
                    await client.query(
                        'INSERT INTO teacher_ues (teacher_id, ue_id) VALUES ($1, $2)',
                        [id, ueId]
                    );
                }
            }

            await client.query('COMMIT');
            return await this.findById(id);
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async delete(id: string): Promise<boolean> {
        const query = `DELETE FROM users WHERE id = $1 AND role = 'TEACHER'`;
        const result = await db.query(query, [id]);
        return (result.rowCount ?? 0) > 0;
    }
}