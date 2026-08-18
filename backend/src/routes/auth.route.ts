import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { userAuthSchema } from "../schemas/auth.schema.js";

const router = Router();
const authController = new AuthController();

router.post('/login', validateBody(userAuthSchema), (req, res) => authController.authUser(req, res));

export default router;
