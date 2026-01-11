"use client";

import { useAuth } from '@/context/AuthContext';
import { Settings, Shield, Bell, CreditCard, User } from 'lucide-react';

export default function SettingsPage() {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl space-y-12">
            <div>
                <h1 className="text-4xl font-black text-blue-900 tracking-tight">Setări Cont</h1>
                <p className="text-gray-500 font-medium mt-1">Gestionează preferințele și securitatea contului tău</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-2">
                    <button className="w-full flex items-center gap-3 px-6 py-4 bg-white border border-gray-100 rounded-2xl text-blue-900 font-black shadow-sm transition-all text-left">
                        <User size={20} /> Profil General
                    </button>
                    <button className="w-full flex items-center gap-3 px-6 py-4 hover:bg-white text-gray-500 font-bold transition-all text-left">
                        <Shield size={20} /> Securitate
                    </button>
                    <button className="w-full flex items-center gap-3 px-6 py-4 hover:bg-white text-gray-500 font-bold transition-all text-left">
                        <Bell size={20} /> Notificări
                    </button>
                </div>

                <div className="md:col-span-2 space-y-8 bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm">
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Nume</label>
                                <input type="text" defaultValue={user?.nume} className="w-full p-5 bg-gray-50 border border-gray-50 rounded-3xl outline-none focus:bg-white focus:border-blue-500 transition-all font-bold text-blue-900" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Prenume</label>
                                <input type="text" defaultValue={user?.prenume} className="w-full p-5 bg-gray-50 border border-gray-50 rounded-3xl outline-none focus:bg-white focus:border-blue-500 transition-all font-bold text-blue-900" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Email</label>
                            <input type="email" defaultValue={user?.email} className="w-full p-5 bg-gray-50 border border-gray-50 rounded-3xl outline-none focus:bg-white focus:border-blue-500 transition-all font-bold text-blue-900" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Telefon</label>
                            <input type="text" placeholder="+40 7..." className="w-full p-5 bg-gray-50 border border-gray-50 rounded-3xl outline-none focus:bg-white focus:border-blue-500 transition-all font-bold text-blue-900" />
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-50 flex justify-end">
                        <button className="bg-blue-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20">
                            Salvează Modificările
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
