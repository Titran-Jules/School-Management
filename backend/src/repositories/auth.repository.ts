import { db } from "../config/db.js";
import { UserAuth } from "../models/user.model.js";

export class AuthRepository {
    async getUserAccount(ref: string): Promise<UserAuth | null> {
        const query = `
            SELECT id, ref, role, password_hash AS "passwordHash"
            FROM users
            WHERE ref = $1 
        `;

        const result = await db.query(query, [ref]);

        return result.rows[0] || null;
    }
}