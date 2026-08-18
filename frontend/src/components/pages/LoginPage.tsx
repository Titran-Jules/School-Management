import type React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
    const [ref, setRef] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            const user = await login(ref, password);

            switch (user.role) {
                case 'ADMIN':
                    navigate('/admin');
                    break;
                case 'TEACHER':
                    navigate('/teacher');
                    break;
                case 'STUDENT':
                    navigate('/student');
                    break;
                default:
                    navigate('/login');
            }
        } catch (err: any) {
            setError(err.message || 'Error connection');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center h-screen items-center ">
            <div className="border flex flex-col items-center justify-center p-8">
                <h2 className="mb-8">Connexion</h2>
                {error && <p>{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col border p-3">
                        <label htmlFor="ref">Référence</label>
                        <input 
                            id="ref"
                            type="text"
                            value={ref}
                            onChange={(e) => setRef(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="flex flex-col border p-3">
                        <label htmlFor="password">Mot de passe </label>
                        <input
                            id="password"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={submitting}>
                        {submitting ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>
            </div>

        </div>
    );
};