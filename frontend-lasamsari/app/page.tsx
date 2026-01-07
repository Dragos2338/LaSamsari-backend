"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { Car as CarIcon, Search, ShieldCheck, Zap, ArrowRight, User, ArrowUpRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  km: number;
}

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (err) {
        setError("Nu s-au putut încărca mașinile. Verifică conexiunea.");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="h-20 border-b border-gray-100 flex items-center justify-between px-10 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <CarIcon className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-blue-900">LaSamsari</span>
        </div>
        <div className="flex items-center gap-6">
          {isAuthenticated() ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-900">Salut, {user?.nume}!</span>
              <Link href={user?.role === 'Admin' ? '/admin' : '/user'} className="bg-blue-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 active:scale-95">
                Mergi la Dashboard
              </Link>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-bold text-gray-500 hover:text-blue-900 transition-colors">Autentificare</Link>
              <Link href="/register" className="bg-blue-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 active:scale-95">
                Creează Cont
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-24 px-10 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8">
          <Zap size={14} /> Cele mai noi oferte de astăzi
        </div>
        <h1 className="text-7xl md:text-8xl font-black text-blue-900 mb-6 tracking-tight">
          Găsește-ți mașina <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-indigo-600">fără bătăi de cap.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Peste 2,500 de vehicule verificate tehnic și estetic. Transparență totală, de la preț la istoricul de service.
        </p>
      </header>

      {/* Stats/Social Proof */}
      <section className="bg-gray-50 py-20 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-blue-900 shadow-sm">
              <ShieldCheck size={32} />
            </div>
            <div>
              <p className="text-2xl font-black text-blue-900 leading-none">100% Verificat</p>
              <p className="text-gray-400 font-bold text-sm mt-1">Istoric curat garantat</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-blue-900 shadow-sm">
              <User size={32} />
            </div>
            <div>
              <p className="text-2xl font-black text-blue-900 leading-none">12k+ Clienți</p>
              <p className="text-gray-400 font-bold text-sm mt-1">Mulțumiți de alegere</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-blue-900 shadow-sm">
              <CarIcon size={32} />
            </div>
            <div>
              <p className="text-2xl font-black text-blue-900 leading-none">50+ Mărci</p>
              <p className="text-gray-400 font-bold text-sm mt-1">Disponibile în stoc</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto py-24 px-10">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-black text-blue-900">Explorează Ofertele</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Caută model..." className="pl-12 pr-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all font-medium" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-8 rounded-[32px] text-center border border-red-100">
            ⚠️ {error}. Asigură-te că serverul este pornit.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cars.map((car) => (
              <div key={car.id} className="group bg-white rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="h-64 bg-gray-100 relative overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={car.model} />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-black text-blue-900 shadow-sm">
                    {car.year}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-blue-900 mb-2">{car.brand} {car.model}</h3>
                  <div className="flex gap-3 mb-8">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{car.km.toLocaleString()} KM</span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Garanție 12 Luni</span>
                  </div>
                  <div className="flex justify-between items-center pt-8 border-t border-gray-50">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Preț Final</p>
                      <p className="text-3xl font-black text-blue-900">{car.price.toLocaleString()} €</p>
                    </div>
                    <Link href={`/login`} className="w-14 h-14 bg-gray-50 flex items-center justify-center rounded-2xl text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-all transform active:scale-95">
                      <ArrowRight size={24} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-blue-900 py-20 px-10 text-white rounded-t-[60px]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <CarIcon className="text-blue-900 w-6 h-6" />
              </div>
              <span className="text-2xl font-black">LaSamsari</span>
            </div>
            <p className="text-blue-200 font-medium max-w-sm">
              Suntem partenerul tău de încredere în achiziția auto. Fără costuri ascunse, fără surprize neplăcute.
            </p>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-blue-400 text-xs">Link-uri utile</h4>
            <div className="flex flex-col gap-4 font-bold text-sm">
              <Link href="#" className="hover:text-blue-300 transition-colors">Mașini în stoc</Link>
              <Link href="#" className="hover:text-blue-300 transition-colors">Cum funcționează</Link>
              <Link href="#" className="hover:text-blue-300 transition-colors">Despre noi</Link>
            </div>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-blue-400 text-xs">Suport</h4>
            <div className="flex flex-col gap-4 font-bold text-sm">
              <Link href="#" className="hover:text-blue-300 transition-colors">Contact</Link>
              <Link href="#" className="hover:text-blue-300 transition-colors">Întrebări frecvente</Link>
              <Link href="#" className="hover:text-blue-300 transition-colors">Blog</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-20 border-t border-blue-800/50 mt-20 flex justify-between items-center text-xs font-bold text-blue-400 uppercase tracking-widest">
          <p>© 2026 LaSamsari Auto</p>
          <div className="flex gap-8">
            <span>Instagram</span>
            <span>Facebook</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </footer>
    </div>
  );
}