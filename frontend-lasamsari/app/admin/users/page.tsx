"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Users, Mail, Phone, Shield, Search } from 'lucide-react';

interface User {
    id: number;
    nume: string;
    prenume: string;
    email: string;
    role: string;
    telefon: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(user =>
        `${user.nume} ${user.prenume}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-blue-900">Gestiune Utilizatori</h1>
                <p className="text-gray-500">Administrează membrii comunității LaSamsari</p>
            </div>

            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Caută utilizator după nume sau email..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-910"></div>
                        <p className="text-gray-400">Se încarcă utilizatorii...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="px-8 py-5 font-black">Utilizator</th>
                                    <th className="px-8 py-5 font-black">Contact</th>
                                    <th className="px-8 py-5 font-black">Rol</th>
                                    <th className="px-8 py-5 font-black text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                                                    {user.nume[0]}{user.prenume[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{user.nume} {user.prenume}</p>
                                                    <p className="text-xs text-gray-500">ID: #{user.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                                    <Mail size={12} /> {user.email}
                                                </div>
                                                {user.telefon && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <Phone size={12} /> {user.telefon}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Activ
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
