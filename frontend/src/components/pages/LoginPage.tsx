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
            setError(err.message || 'Erreur de connexion');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center min-h-screen items-center bg-var(--paper) font-body text-var(--ink) p-4">
            <div className="w-full max-w-md border border-var(--ink) bg-var(--paper-raised) p-10 relative">
                <div className="absolute top-5 right-5 w-2 h-2 border border-var(--ink) rounded-full"></div>

                <h2 className="mb-10 text-4xl font-display text-var(--ink)">
                    Connexion
                </h2>

                {error && (
                    <div className="mb-6 border border-var(--rust) bg-var(--rust-dim) text-var(--rust) p-3 text-sm font-family:var(--font-mono)">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="ref" 
                            className="text-xs font-bold uppercase tracking-widest text-var(--ink-soft)"
                        >
                            Référence
                        </label>
                        <input 
                            id="ref"
                            type="text"
                            value={ref}
                            onChange={(e) => setRef(e.target.value)}
                            required 
                            className="border border-var(--ink) bg-var(--paper) p-3 font-family:var(--font-mono) focus:outline-none focus:ring-1 focus:ring-var(--ink) transition-all"
                            placeholder="Ex: STD25xxx"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="password" 
                            className="text-xs font-bold uppercase tracking-widest text-var(--ink-soft)"
                        >
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border border-var(--ink) bg-var(--paper) p-3 font-family:var(--font-mono) focus:outline-none focus:ring-1 focus:ring-var(--ink) transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={submitting}
                        className="mt-4 border border-var(--ink) bg-var(--ink) text-var(--paper-raised) py-3 px-4 uppercase tracking-widest text-sm font-bold hover:bg-var(--paper-raised) hover:text-var(--ink) transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? 'Authentification...' : 'Se connecter'}
                    </button>
                </form>
            </div>
        </div>
    );
};