"use client";

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import {
    Search,
    MapPin,
    ArrowRight,
    Car as CarIcon,
    Zap,
    ShieldCheck,
    Trophy
} from 'lucide-react';

interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    km: number;
    price: number;
}

export default function UserDashboard() {
    const { user } = useAuth();
    const [recentCars, setRecentCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const response = await api.get('/cars');
                setRecentCars(response.data.slice(0, 4));
            } catch (err) {
                console.error("Error fetching recent cars:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecent();
    }, []);

    return (
        <div className="space-y-12">
            {/* Hero Welcome Section */}
            <section className="relative h-[300px] rounded-[40px] overflow-hidden bg-blue-900 flex items-center px-12">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/80 to-transparent z-10"></div>
                <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
                    alt="Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 max-w-xl">
                    <h1 className="text-5xl font-black text-white mb-4 leading-tight">
                        Salut, {user?.prenume}! 👋
                    </h1>
                    <p className="text-blue-100 text-lg mb-8 font-medium">
                        Cauți ceva special astăzi? Avem peste 1,200 de oferte verificate pregătite pentru tine.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/" className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-xl active:scale-95">
                            Explorează Piața
                        </Link>
                    </div>
                </div>
            </section>

            {/* Quick Stats/Features */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: Zap, title: "Oferte Noi", desc: "Verifică ultimele mașini intrate în stoc astăzi.", color: "bg-orange-500" },
                    { icon: ShieldCheck, title: "Garanție inclusă", desc: "Toate mașinile noastre vin cu istoric verificat.", color: "bg-green-500" },
                    { icon: Trophy, title: "Top Sellers", desc: "Vezi ce modele sunt la mare căutare luna asta.", color: "bg-purple-500" },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                            <item.icon size={24} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                ))}
            </section>

            {/* Recent Activity / Recommendations */}
            <section>
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900">Recomandări pentru tine</h2>
                        <p className="text-gray-500 mt-1">Bazat pe interesele tale recente</p>
                    </div>
                    <Link href="/" className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
                        Vezi tot <ArrowRight size={18} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {loading ? (
                        [1, 2, 3, 4].map(i => <div key={i} className="h-80 bg-gray-100 rounded-[32px] animate-pulse"></div>)
                    ) : recentCars.map((car) => (
                        <Link href={`/cars/${car.id}`} key={car.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all cursor-pointer block">
                            <div className="h-48 bg-gray-100 relative overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=600&q=80"
                                    alt={car.model}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-blue-900 uppercase">
                                    Verificat
                                </div>
                            </div>
                            <div className="p-6">
                                <h4 className="text-lg font-black text-gray-900">{car.brand} {car.model}</h4>
                                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mt-1 mb-4">
                                    <MapPin size={12} /> București, RO
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">Preț</p>
                                        <p className="text-xl font-black text-blue-900">{car.price.toLocaleString()} €</p>
                                    </div>
                                    <button className="p-3 bg-gray-50 rounded-2xl text-blue-900 hover:bg-blue-900 hover:text-white transition-colors">
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
