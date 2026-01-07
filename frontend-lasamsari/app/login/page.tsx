"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/Auth/login', { email, password });
            const { token, user } = response.data;
            login(token, user);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Email sau parolă incorectă');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-blue-900 mb-2">Bine ai revenit!</h1>
                    <p className="text-gray-500 italic">Continuă aventura în lumea auto</p>
                </div>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg animate-shake">
                        <p className="text-sm font-bold">Eroare</p>
                        <p className="text-xs">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                            placeholder="nume@exemplu.ro"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1 ml-1" htmlFor="password">
                            Parolă
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? 'Se procesează...' : 'Autentificare'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Nu ai cont?{' '}
                        <Link href="/register" className="text-blue-600 font-bold hover:underline">
                            Creează unul acum
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
