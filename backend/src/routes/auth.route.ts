import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

const router = Router();
const authController = new AuthController();

router.get('/login', (req, res) => authController.authUser(req, res));

export default router;
