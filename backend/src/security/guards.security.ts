import { Response, Request, NextFunction } from "express";
import { JwtSecurity, JwtPayload } from "./jwt.security.js";
import { Role } from "./role.security.js";

export interface AuthentificatedRequest extends Request {
    user?: JwtPayload;
}

export const authGuard = (req: AuthentificatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ message: 'Permission denied: Bearer token is missing.'});
    }

    try {
        const payload = JwtSecurity.verifyToken(token);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token invalide.'});
    }
};

export const roleGuard = (...allowedRole: Role[]) => {
    return (req: AuthentificatedRequest, res: Response, next: NextFunction) => {
        if (!req.user || !allowedRole.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Forbidden'});
        }
        next();
    };
};