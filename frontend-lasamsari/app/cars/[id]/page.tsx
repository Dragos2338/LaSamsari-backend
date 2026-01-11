"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import {
    ChevronLeft,
    Calendar,
    Gauge,
    Droplets,
    Settings2,
    Phone,
    Mail,
    Heart,
    Share2,
    ShieldCheck
} from 'lucide-react';

export default function CarDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [car, setCar] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                // Pentru simplitate, folosim lista completa si filtram, 
                // in mod ideal am avea endpoint separat GET /cars/:id
                const response = await api.get('/cars');
                const found = response.data.find((c: any) => c.id.toString() === id);
                setCar(found);
            } catch (err) {
                console.error("Error fetching car:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    const [isFavorite, setIsFavorite] = useState(false);

    // Image mapping
    const getCarImage = (brand: string) => {
        const images: any = {
            'BMW': 'https://images.unsplash.com/photo-1555215695-3004980adade?auto=format&fit=crop&w=1200&q=90',
            'Audi': 'https://images.unsplash.com/photo-1606152421802-db971dfc674f?auto=format&fit=crop&w=1200&q=90',
            'Mercedes-Benz': 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=90',
            'Volkswagen': 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=90',
            'Volvo': 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=1200&q=90',
            'Ford': 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=1200&q=90',
            'Toyota': 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=90',
            'Porsche': 'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=1200&q=90'
        };
        return images[brand] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=90';
    };

    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
        alert(isFavorite ? 'Eliminat de la favorite' : 'Adăugat la favorite!');
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copiat în clipboard!');
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
    );

    if (!car) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-10 text-center">
            <h1 className="text-4xl font-black text-blue-900 mb-4">Mașina nu a fost găsită</h1>
            <p className="text-gray-500 mb-10">Anunțul pe care îl cauți a fost șters sau este indisponibil.</p>
            <button onClick={() => router.back()} className="bg-blue-900 text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-blue-900/20">
                Înapoi la Piața Auto
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header / Nav */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 font-bold hover:text-blue-900 transition-all">
                        <ChevronLeft size={20} /> Înapoi
                    </button>
                    <div className="flex gap-4">
                        <button
                            onClick={handleFavorite}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:text-red-500'}`}
                        >
                            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                        </button>
                        <button
                            onClick={handleShare}
                            className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-blue-900 transition-all"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Images & Details */}
                <div className="lg:col-span-2 space-y-12">
                    <div className="aspect-[16/9] bg-gray-200 rounded-[60px] overflow-hidden shadow-2xl">
                        <img
                            src={getCarImage(car.brand)}
                            className="w-full h-full object-cover"
                            alt={car.model}
                        />
                    </div>

                    <div className="bg-white p-12 rounded-[60px] shadow-sm border border-gray-100 space-y-12">
                        <div>
                            <div className="flex items-center gap-3 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 w-fit">
                                <ShieldCheck size={14} /> Anunț Verificat LaSamsari
                            </div>
                            <h1 className="text-5xl font-black text-blue-900 mb-4">{car.brand} {car.model}</h1>
                            <p className="text-gray-500 font-medium text-lg leading-relaxed">
                                Stare impecabilă, întreținută obsesiv. Toate reviziile efectuate la reprezentanță conform planului de service. Fără accidente, vopsea originală integral. Interior din piele neagră ca nou.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Calendar, label: 'An', value: car.year },
                                { icon: Gauge, label: 'Kilometraj', value: `${car.km.toLocaleString()} KM` },
                                { icon: Droplets, label: 'Combustibil', value: car.fuel },
                                { icon: Settings2, label: 'Transmisie', value: car.transmission },
                            ].map((spec, i) => (
                                <div key={i} className="bg-gray-50 p-6 rounded-[32px] border border-gray-100/50">
                                    <spec.icon size={20} className="text-blue-600 mb-3" />
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{spec.label}</p>
                                    <p className="text-base font-black text-blue-900">{spec.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sticky Sidebar - Compact & Fixed Overlap */}
                <div className="lg:h-fit lg:sticky lg:top-24 space-y-6">
                    <div className="bg-blue-900 p-8 rounded-[40px] shadow-2xl text-white">
                        <p className="text-blue-300 font-black uppercase tracking-[0.2em] text-[10px] mb-2 leading-none">Preț Final</p>
                        <h2 className="text-4xl font-black mb-8 leading-none">{car.price.toLocaleString()} €</h2>

                        <div className="space-y-3">
                            <button className="w-full bg-white text-blue-900 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-50 transition-all shadow-xl active:scale-95 text-sm">
                                <Phone size={20} /> 07xx xxx xxx
                            </button>
                            <button className="w-full bg-blue-800 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 border border-blue-700/50 hover:bg-blue-700 transition-all text-sm">
                                <Mail size={20} /> Trimite Mesaj
                            </button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center font-black text-lg border border-white/5">
                                AS
                            </div>
                            <div>
                                <p className="text-base font-black leading-none">Admin System</p>
                                <p className="text-blue-400 text-xs font-bold mt-1">Membru din 2024</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-blue-900">Garanție Extinsă</p>
                            <p className="text-gray-400 text-[10px] font-bold">12 luni sau 20,000 km</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
