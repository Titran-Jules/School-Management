import { Student, CreateStudentDTO, CreateStudentInDbDTO, Group } from "../models/student.model.js";
import { db } from "../config/db.js";

export class StudentRepository {
    async findAll(): Promise<Student[]> {
        const query = `
            SELECT
                u.id, u.ref, u.first_name AS "firstName", u.last_name AS "lastName",
                u.email, u.password_hash AS "passwordHash", u.role, u.created_at AS "createdAt",
                s.grade_level AS "gradeLevel", s.student_group AS "group"
            FROM users u
            JOIN students s ON s.user_id = u.id
            WHERE u.role = 'STUDENT' 
        `;

        const result = await db.query<Student>(query);
        return result.rows;
    }

    async findById(id: string): Promise<Student | null> {
        const query = `
            SELECT
                u.id, u.ref, u.first_name AS "firstName", u.last_name AS "lastName",
                u.email, u.password_hash AS "passwordHash", u.role, u.created_at AS "createdAt",
                s.grade_level AS "gradeLevel", s.student_group AS "group"
            FROM users u
            JOIN students s ON u.id = s.user_id
            WHERE u.role = 'STUDENT' AND u.id = $1
        `;

        const result = await db.query<Student>(query, [id]);
        return result.rows[0] || null;
    }

    async findByRef(ref: string): Promise<Student | null> {
        const query = `
            SELECT
                u.id, u.ref, u.first_name AS "firstName", u.last_name AS "lastName",
                u.email, u.password_hash AS "passwordHash", u.role, u.created_at AS "createdAt",
                s.grade_level AS "gradeLevel", s.student_group AS "group"
            FROM users u
            JOIN students s ON u.id = s.user_id
            WHERE u.role = 'STUDENT' AND u.ref = $1
        `;

        const result = await db.query<Student>(query, [ref]);
        return result.rows[0] || null;
    }

    async updateAll(id: string, data: CreateStudentInDbDTO): Promise<Student | null> {
        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const userQuery = `
                UPDATE users
                SET ref = $1,
                    first_name = $2,
                    last_name = $3,
                    email = $4,
                    password_hash = $5
                WHERE id = $6 AND role = 'STUDENT'
            `;
            const userValues = [
                data.ref,
                data.firstName,
                data.lastName,
                data.email,
                data.passwordHash,
                id
            ];
            const userResult = await client.query(userQuery, userValues);

            if (userResult.rowCount === 0) {
                await client.query('ROLLBACK');
                return null;
            }

            const studentQuery = `
                UPDATE students
                SET grade_level = $1,
                    student_group = $2
                WHERE user_id = $3
            `;
            const studentValues = [data.gradeLevel, data.group, id];
            await client.query(studentQuery, studentValues);

            await client.query('COMMIT');

            return await this.findById(id);

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async updateStudentGroup(id: string, newGroup: Group): Promise<void> {
        const query = `
            UPDATE students
            SET student_group = $1
            WHERE user_id = $2
        `;
        await db.query(query, [newGroup, id]);
    }

    async deleteStudent(id: string): Promise<boolean> {
        const query = `DELETE FROM users WHERE id = $1 AND role = 'STUDENT'`;
        const result = await db.query(query, [id]);
        return (result.rowCount ?? 0) > 0;
    }

    async create(data: CreateStudentInDbDTO): Promise<Student> {
        const client = await db.connect();

        try {
            await client.query('BEGIN');

            const userQuery = `
                INSERT INTO users (ref, first_name, last_name, email, password_hash, role)
                VALUES ($1, $2, $3, $4, $5, 'STUDENT')
                RETURNING id, ref, first_name AS "firstName", last_name AS "lastName", email, password_hash AS "passwordHash", role, created_at AS "createdAt"
            `;

            const userValues = [data.ref, data.firstName, data.lastName, data.email, data.passwordHash];
            const userResult = await client.query(userQuery, userValues);
            const createdUser = userResult.rows[0];

            const studentQuery = `
                INSERT INTO students (user_id, grade_level, student_group)
                VALUES ($1, $2, $3)
            `;

            await client.query(studentQuery, [createdUser.id, data.gradeLevel, data.group]);

            await client.query('COMMIT');

            return {
                ...createdUser,
                gradeLevel: data.gradeLevel,
                group: data.group
            };
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}