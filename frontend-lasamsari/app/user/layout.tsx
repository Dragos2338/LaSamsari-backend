"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import {
    Car,
    LogOut,
    User,
    UserCircle2,
    Heart,
    Settings,
    Bell
} from 'lucide-react';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* User Navbar */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/user" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                            <Car className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black text-blue-900">LaSamsari</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-bold text-gray-500 hover:text-blue-900 transition-colors">Piața Auto</Link>
                        <Link href="/user" className="text-sm font-bold text-blue-900">Dashboard</Link>
                        <Link href="/user/my-cars" className="text-sm font-bold text-gray-500 hover:text-blue-900 transition-colors">Mașinile Mele</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-blue-900 transition-colors relative">
                            <Bell size={22} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-100 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-gray-900 leading-none">{user.prenume}</p>
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">Utilizator</p>
                            </div>
                            <div className="group relative">
                                <button className="w-11 h-11 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center text-blue-900 border border-blue-100 hover:shadow-lg transition-all">
                                    <User size={22} />
                                </button>
                                <div className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                    <Link href="/user/profile" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50 text-gray-600 transition-colors">
                                        <UserCircle2 size={18} />
                                        <span className="text-sm font-bold">Profilul meu</span>
                                    </Link>
                                    <Link href="/user/favorites" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50 text-gray-600 transition-colors">
                                        <Heart size={18} />
                                        <span className="text-sm font-bold">Favorite</span>
                                    </Link>
                                    <Link href="/user/settings" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50 text-gray-600 transition-colors">
                                        <Settings size={18} />
                                        <span className="text-sm font-bold">Setări</span>
                                    </Link>
                                    <div className="h-px bg-gray-50 my-2 mx-2"></div>
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 text-red-600 transition-colors"
                                    >
                                        <LogOut size={18} />
                                        <span className="text-sm font-bold">Deconectare</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
                {children}
            </main>

            <footer className="py-10 border-t border-gray-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-400 text-sm font-medium">© 2026 LaSamsari Auto. Toate drepturile rezervate.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="text-sm font-bold text-gray-400 hover:text-blue-900">Termeni și condiții</Link>
                        <Link href="#" className="text-sm font-bold text-gray-400 hover:text-blue-900">Confidențialitate</Link>
                        <Link href="#" className="text-sm font-bold text-gray-400 hover:text-blue-900">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
