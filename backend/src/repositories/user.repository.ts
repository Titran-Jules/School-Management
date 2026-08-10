import { User, RegisterUserDTO } from "../models/user.model.js";
import { db } from "../config/db.js";

export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await db.query<User>(query, [email]);

        return result.rows[0] || null;
    }

    async create(data: RegisterUserDTO): Promise<User> {
        const query = `
            INSERT INTO users (ref, first_name, last_name, email, password_hash, role)
            VALUES ($1, $2, $3, $4, $5, $6
            RETURNING *
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