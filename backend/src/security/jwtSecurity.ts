import jwt from "jsonwebtoken";
import { UserRole } from "../models/userModel.js";
import "dotenv/config";

export interface JwtPayload {
    userId: string;
    role: UserRole;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (JWT_SECRET == undefined) {
    throw new Error("JWT is missing in .env");
}

const secret: string = JWT_SECRET;

const JWT_EXPIRES_IN = '1h';

export const JwtSecurity = {
    generateToken(payload: JwtPayload): string {
        return jwt.sign(payload, secret, { expiresIn: JWT_EXPIRES_IN });
    },

    verifyToken(token: string): JwtPayload {
        return jwt.verify(token, secret) as unknown as JwtPayload;
    }
}