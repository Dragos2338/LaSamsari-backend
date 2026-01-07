"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import {
    BarChart3,
    Car,
    Users,
    LogOut,
    LayoutDashboard,
    Settings
} from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && (!user || user.role !== 'Admin')) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading || !user || user.role !== 'Admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
                <div className="p-8">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                            <Car className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black text-blue-900">AdminPanel</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-900 font-bold transition-all"
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/cars"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100 font-medium transition-all"
                    >
                        <Car size={20} />
                        Gestiune Mașini
                    </Link>
                    <Link
                        href="/admin/users"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100 font-medium transition-all"
                    >
                        <Users size={20} />
                        Utilizatori
                    </Link>
                    <Link
                        href="/admin/stats"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-100 font-medium transition-all"
                    >
                        <BarChart3 size={20} />
                        Analitice
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold">
                                {user.nume[0]}{user.prenume[0]}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-gray-900 truncate">{user.prenume} {user.nume}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-red-600 font-bold text-sm hover:bg-red-50 hover:border-red-100 transition-all"
                        >
                            <LogOut size={16} />
                            Deconectare
                        </button>
                    </div>
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <Settings size={18} />
                        <span className="text-xs font-medium">Setări Sistem</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72">
                <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-10 sticky top-0 z-20">
                    <h2 className="text-xl font-bold text-gray-900">Bun venit înapoi, Administrator!</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                                <Users size={20} />
                            </div>
                        </div>
                    </div>
                </header>
                <div className="p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
