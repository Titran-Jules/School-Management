import { Request, Response } from "express";
import { AuthRepository } from "../repositories/authRepository.js";
import { AuthService } from "../services/authService.js";

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);

export class AuthController {
    async authUser(req: Request, res: Response): Promise<void> {
        try {
            const { ref, password } = req.body;

            if (!ref || !password) {
                res.status(400).json({ message: 'Fields missing' });
                return;
            }

            const result = await authService.login(ref, password);

            res.status(200).json(result);
        } catch (error: any) {
            if (error.message === 'INVALID_REF' || error.message === 'INVALID_PASSWORD') {
                res.status(401).json({ message: 'Ref or password incorrect' });
                return; 
            }

            res.status(500).json({ message: 'Erreur serveur', detail: error.message });
        }
    }
}