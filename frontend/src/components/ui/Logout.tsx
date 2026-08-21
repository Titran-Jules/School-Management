import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"

export const Logout = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    return (
        <div className="flex justify-between items-center p-4 bg-white border-b">
            <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
                Déconnexion
            </button>
        </div>
    )
}