"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        nume: '',
        prenume: '',
        email: '',
        password: '',
        telefon: '',
        adresa: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await api.post('/Auth/register', formData);
            router.push('/login');
        } catch (err: any) {
            setError(err.response?.data?.message || 'A apărut o eroare la înregistrare');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
            <div className="max-w-2xl w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-blue-900 mb-2">Alătură-te comunității</h1>
                    <p className="text-gray-500 italic">Cea mai mare platformă auto din România</p>
                </div>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg animate-shake">
                        <p className="text-sm font-bold">Eroare</p>
                        <p className="text-xs">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Nume</label>
                            <input
                                name="nume"
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none transition-all"
                                value={formData.nume}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Prenume</label>
                            <input
                                name="prenume"
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none transition-all"
                                value={formData.prenume}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none transition-all"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Parolă</label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none transition-all"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Telefon</label>
                            <input
                                name="telefon"
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none transition-all"
                                value={formData.telefon}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Adresă</label>
                            <input
                                name="adresa"
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none transition-all"
                                value={formData.adresa}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 mt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? 'Se creează contul...' : 'Înregistrare'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Ai deja cont?{' '}
                        <Link href="/login" className="text-blue-600 font-bold hover:underline">
                            Autentifică-te aici
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
