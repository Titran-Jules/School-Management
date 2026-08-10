import express, { Application } from "express";
import studentRoutes from "./routes/student.route.js";
import teacherRoutes from "./routes/teacher.route.js";
import ueRoutes from "./routes/ue.route.js";

const app: Application = express();

app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/ues", ueRoutes);

export default app;