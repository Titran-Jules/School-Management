import type React from "react";
import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles?: string[];
    children?: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Chargement de la session...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        const targetRoute =
            user.role === 'ADMIN' ? '/admin' :
            user.role === 'TEACHER' ? '/teacher' : '/student';
        
        return <Navigate to={targetRoute} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};