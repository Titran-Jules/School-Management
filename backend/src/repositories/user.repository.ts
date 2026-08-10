import { User, CreateUserInDbDTO } from "../models/user.model.js";
import { db } from "../config/db.js";

export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const query = `SELECT id, ref, email, first_name AS "firstName", last_name AS "lastName", email, password_hash AS "passwordHash", role, created_at AS "createdAt" FROM users WHERE email = $1`;
        const result = await db.query<User>(query, [email]);

        return result.rows[0] || null;
    }

    async create(data: CreateUserInDbDTO): Promise<User> {
        const query = `
            INSERT INTO users (ref, first_name, last_name, email, password_hash, role)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, ref, email, first_name AS "firstName", last_name AS "lastName", email, password_hash AS "passwordHash", role, created_at AS "createdAt"
        `;

        const values = [
            data.ref,
            data.firstName,
            data.lastName,
            data.email,
            data.passwordHash,
            data.role
        ];

        const result = await db.query<User>(query, values);
        return result.rows[0];
    }
}