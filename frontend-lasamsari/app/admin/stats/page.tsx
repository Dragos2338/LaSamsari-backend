"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import {
    BarChart3,
    TrendingUp,
    Users,
    ShoppingBag,
    ArrowUpRight,
    ArrowDownRight,
    PieChart,
    Activity
} from 'lucide-react';

export default function AnalyticsPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/stats');
                setStats(res.data);
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
    );

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'EUR' }).format(val);
    };

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-black text-blue-900 tracking-tight">Analitice & Rapoarte</h1>
                <p className="text-gray-500 font-medium mt-1">Monitorizează performanța platformei în timp real</p>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Utilizatori Total', value: stats?.totalUsers || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Mașini în Stoc', value: stats?.totalCars || 0, icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Valoare Inventar', value: formatCurrency(stats?.totalInventoryValue || 0), icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Brand-uri Active', value: stats?.carsByBrand?.length || 0, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                                <stat.icon size={28} />
                            </div>
                        </div>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-black text-blue-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Brand Distribution Chart */}
                <div className="bg-white p-10 rounded-[60px] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-black text-blue-900">Distribuție pe Mărci</h3>
                        <PieChart size={24} className="text-gray-300" />
                    </div>
                    <div className="space-y-4">
                        {stats?.carsByBrand?.map((item: any, index: number) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-24 text-sm font-bold text-gray-600">{item.brand}</div>
                                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 rounded-full"
                                        style={{ width: `${(item.count / stats.totalCars) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="w-12 text-sm font-black text-blue-900 text-right">{item.count}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Empty State for Sales Evolution (Since we don't have sales history yet) */}
                <div className="bg-white p-10 rounded-[60px] border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <BarChart3 size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Evoluție Vânzări</h3>
                    <p className="text-gray-400 text-sm mt-2 max-w-xs">Graficul va fi disponibil după ce se vor înregistra primele vânzări în sistem.</p>
                </div>
            </div>
        </div>
    );
}
