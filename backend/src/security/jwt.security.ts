import jwt from "jsonwebtoken";
import { Role } from "./role.security.js";

export interface JwtPayload {
    userId: string;
    role: Role;
}

const JWT_SECRET = process.env.JWT_SECRET || 'no jwt secret found';
const JWT_EXPIRES_IN = '1h';

export const JwtSecurity = {
    generateToken(payload: JwtPayload): string {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    },

    verifyToken(token: string): JwtPayload {
        return jwt.verify(token, JWT_SECRET) as unknown as JwtPayload;
    }
}