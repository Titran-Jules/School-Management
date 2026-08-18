import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/pages/LoginPage";
import { ProtectedRoute } from "./components/security/ProtectedRoute";

import { AdminDashboard } from "./components/pages/admin/AdminDashboard";
import { TeacherDashboard } from "./components/pages/teacher/TeacherDashboard";
import { StudentDashboard } from "./components/pages/student/StudentDashboard";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>

        <Route element={<ProtectedRoute allowedRoles={['ADMIN']}/>}>
          <Route path="/admin" element={<AdminDashboard />}/>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
          <Route path="/teacher" element={<TeacherDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
          <Route path="/student" element={<StudentDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;