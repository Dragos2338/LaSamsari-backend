"use client";

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Camera,
    Save,
    ShieldAlert
} from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        nume: user?.nume || '',
        prenume: user?.prenume || '',
        email: user?.email || '',
        telefon: '07xx xxx xxx', // Mocked as not in User object yet
        adresa: 'România, București',
    });
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar Section */}
                <div className="w-full md:w-1/3 bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm flex flex-col items-center text-center">
                    <div className="relative group mb-6">
                        <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-900 text-4xl font-black shadow-inner">
                            {user?.nume[0]}{user?.prenume[0]}
                        </div>
                        <button className="absolute -bottom-2 -right-2 bg-blue-900 text-white p-3 rounded-2xl shadow-xl hover:scale-110 transition-transform">
                            <Camera size={20} />
                        </button>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">{user?.prenume} {user?.nume}</h2>
                    <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mt-1">Utilizator Verificat</p>

                    <div className="w-full h-px bg-gray-50 my-8"></div>

                    <div className="space-y-4 w-full text-left">
                        <div className="flex items-center gap-4 text-gray-500">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                <Mail size={18} />
                            </div>
                            <p className="text-sm font-bold truncate">{user?.email}</p>
                        </div>
                        <div className="flex items-center gap-4 text-gray-500">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                <MapPin size={18} />
                            </div>
                            <p className="text-sm font-bold">București, RO</p>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="flex-1 bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-2xl font-black text-gray-900">Informații Personale</h3>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-blue-600 font-black hover:underline"
                        >
                            {isEditing ? 'Anulează' : 'Editează'}
                        </button>
                    </div>

                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nume</label>
                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-bold disabled:opacity-60"
                                    value={formData.nume}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Prenume</label>
                                <input
                                    type="text"
                                    disabled={!isEditing}
                                    className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-bold disabled:opacity-60"
                                    value={formData.prenume}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    disabled
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 rounded-2xl border border-transparent font-bold opacity-60"
                                    value={formData.email}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Telefon</label>
                                <div className="relative">
                                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-bold disabled:opacity-60"
                                        value={formData.telefon}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Regiune</label>
                                <div className="relative">
                                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-blue-500 outline-none transition-all font-bold disabled:opacity-60"
                                        value={formData.adresa}
                                    />
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <button className="flex items-center justify-center gap-3 w-full bg-blue-900 text-white py-5 rounded-[2rem] font-black text-lg hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20">
                                <Save size={20} />
                                Salvează Modificările
                            </button>
                        )}
                    </form>
                </div>
            </div>

            {/* Security Info */}
            <div className="bg-orange-50 rounded-[40px] p-8 border border-orange-100 flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                    <ShieldAlert size={32} />
                </div>
                <div>
                    <h4 className="text-lg font-black text-orange-900">Protejează-ți contul</h4>
                    <p className="text-orange-700 text-sm font-medium">Nu partaja niciodată datele de autentificare cu alte persoane. Echipa LaSamsari nu îți va cere niciodată parola prin telefon sau email.</p>
                </div>
            </div>
        </div>
    );
}
