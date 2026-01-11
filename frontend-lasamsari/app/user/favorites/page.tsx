"use client";

import { Heart, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-black text-blue-900 tracking-tight">Mașini Favorite</h1>
                <p className="text-gray-500 font-medium mt-1">Toate ofertele pe care le-ai salvat pentru mai târziu</p>
            </div>

            <div className="bg-white rounded-[48px] border-2 border-dashed border-gray-100 py-32 text-center">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-200">
                    <Heart size={40} fill="currentColor" />
                </div>
                <h3 className="text-2xl font-black text-blue-900 mb-2">Nu ai nicio mașină la favorite</h3>
                <p className="text-gray-500 font-medium max-w-sm mx-auto mb-10">
                    Apasă pe inimioara oricărui anunț pentru a-l găsi rapid aici.
                </p>
                <Link href="/" className="inline-flex items-center gap-3 bg-blue-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20">
                    Explorează Piața Auto
                    <ArrowRight size={20} />
                </Link>
            </div>
        </div>
    );
}
