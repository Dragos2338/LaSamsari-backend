"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import {
    TrendingUp,
    Car,
    Users,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    Clock
} from 'lucide-react';

interface CarData {
    id: number;
    brand: string;
    model: string;
    price: number;
    year: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalCars: 0,
        totalUsers: 0,
        totalSales: 0,
        activeListings: 0
    });
    const [recentCars, setRecentCars] = useState<CarData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, carsRes] = await Promise.all([
                    api.get('/stats'),
                    api.get('/cars')
                ]);

                setRecentCars(carsRes.data.slice(0, 5));
                setStats({
                    totalCars: statsRes.data.totalCars,
                    totalUsers: statsRes.data.totalUsers,
                    totalSales: statsRes.data.totalSalesValue,
                    activeListings: statsRes.data.activeListings
                });
            } catch (err) {
                console.error("Error fetching admin stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const statCards = [
        { title: 'Total Mașini', value: stats.totalCars, icon: Car, color: 'bg-blue-500', trend: '+12%', isUp: true },
        { title: 'Utilizatori', value: stats.totalUsers, icon: Users, color: 'bg-purple-500', trend: '+5%', isUp: true },
        { title: 'Volum Vânzări', value: `${stats.totalSales.toLocaleString()} €`, icon: Wallet, color: 'bg-green-500', trend: '-2%', isUp: false },
        { title: 'Anunțuri Active', value: stats.activeListings, icon: TrendingUp, color: 'bg-orange-500', trend: '+18%', isUp: true },
    ];

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-40 bg-gray-200 rounded-3xl"></div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-bold ${stat.isUp ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                {stat.trend}
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                        <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Listings */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-900">Ultimele adăugări</h3>
                        <button className="text-blue-600 text-sm font-bold hover:underline">Vezi tot</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-bold">Mașină</th>
                                    <th className="px-6 py-4 font-bold">Preț</th>
                                    <th className="px-6 py-4 font-bold">Status</th>
                                    <th className="px-6 py-4 font-bold">Acțiuni</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentCars.map((car) => (
                                    <tr key={car.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                    <Car size={18} className="text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{car.brand} {car.model}</p>
                                                    <p className="text-xs text-gray-500">An {car.year}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-black text-gray-900">{car.price.toLocaleString()} €</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Activ</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200">
                                                <Clock size={16} className="text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions / Activity */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Activitate Recentă</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                        {i % 2 === 0 ? <Users size={18} /> : <Car size={18} />}
                                    </div>
                                    {i < 4 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gray-100"></div>}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">
                                        {i % 2 === 0 ? 'Utilizator nou înregistrat' : 'Anunț nou verificat'}
                                    </p>
                                    <p className="text-xs text-gray-500">Acum {i * 15} minute</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-colors">
                        Încărcați mai multe
                    </button>
                </div>
            </div>
        </div>
    );
}
