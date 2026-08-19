import express, { Application } from "express";
import cors from "cors";

import studentRoutes from "./routes/student.route.js";
import teacherRoutes from "./routes/teacher.route.js";
import ueRoutes from "./routes/ue.route.js";
import loginRoutes from "./routes/auth.route.js";

import { UserRole } from "./models/user.model.js";
import { authGuard, roleGuard } from "./security/guards.security.js";

const app: Application = express();

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use("/api/students", authGuard, roleGuard('ADMIN', 'TEACHER'), studentRoutes);
app.use("/api/teachers", authGuard, roleGuard('ADMIN'), teacherRoutes);
app.use("/api/ues", authGuard, roleGuard('ADMIN', 'TEACHER'), ueRoutes);
app.use("/api/auth", loginRoutes);

export default app;