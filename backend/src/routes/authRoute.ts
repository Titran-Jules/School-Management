import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { validateBody } from "../middlewares/validateMiddleware.js";
import { userAuthSchema } from "../schemas/authSchema.js";

const router = Router();
const authController = new AuthController();

router.post('/login', validateBody(userAuthSchema), (req, res) => authController.authUser(req, res));

export default router;
