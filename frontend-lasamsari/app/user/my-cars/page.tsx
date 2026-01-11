"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import {
    Plus,
    Car as CarIcon,
    Search,
    Clock,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    km: number;
    price: number;
    status: string;
}

export default function MyCarsPage() {
    const { user } = useAuth();
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchMyCars();
        }
    }, [user]);

    const fetchMyCars = async () => {
        try {
            const response = await api.get('/cars/my-cars');
            setCars(response.data);
        } catch (err) {
            console.error("Error fetching my cars:", err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Available': return <CheckCircle2 size={16} className="text-green-500" />;
            case 'Pending': return <Clock size={16} className="text-orange-500" />;
            case 'Sold': return <XCircle size={16} className="text-gray-500" />;
            default: return null;
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Available': return 'bg-green-50 text-green-700 border-green-100';
            case 'Pending': return 'bg-orange-50 text-orange-700 border-orange-100';
            case 'Sold': return 'bg-gray-50 text-gray-700 border-gray-100';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-blue-900 tracking-tight">Mașinile Mele</h1>
                    <p className="text-gray-500 font-medium mt-1">Gestionează anunțurile tale publicate pe LaSamsari</p>
                </div>
                <button className="flex items-center gap-3 bg-blue-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 active:scale-95">
                    <Plus size={20} />
                    Publică un Anunț Nou
                </button>
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4 text-gray-400">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
                    <p className="font-bold uppercase tracking-widest text-xs">Se încarcă garajul tău...</p>
                </div>
            ) : cars.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {cars.map((car) => (
                        <div key={car.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all p-2 flex flex-col sm:flex-row gap-6">
                            <div className="w-full sm:w-48 h-48 bg-gray-50 rounded-[32px] overflow-hidden">
                                <img
                                    src={`https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400&q=80`}
                                    className="w-full h-full object-cover"
                                    alt={car.model}
                                />
                            </div>
                            <div className="flex-1 p-4 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-black text-blue-900">{car.brand} {car.model}</h3>
                                        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(car.status)}`}>
                                            {getStatusIcon(car.status)}
                                            {car.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{car.year}</span>
                                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{car.km.toLocaleString()} KM</span>
                                    </div>
                                </div>
                                <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Preț Cerut</p>
                                        <p className="text-2xl font-black text-blue-900">{car.price.toLocaleString()} €</p>
                                    </div>
                                    <button className="text-sm font-black text-blue-600 hover:text-blue-900 transition-colors bg-blue-50 px-4 py-2 rounded-xl">
                                        Editează
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[48px] border-2 border-dashed border-gray-100 py-32 text-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                        <CarIcon size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-blue-900 mb-2">Garajul tău este gol</h3>
                    <p className="text-gray-500 font-medium max-w-sm mx-auto mb-10">
                        Nu ai adăugat nicio mașină încă. Publică primul tău anunț acum!
                    </p>
                    <button className="bg-blue-900 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20">
                        Publică prima mașină
                    </button>
                </div>
            )}
        </div>
    );
}
