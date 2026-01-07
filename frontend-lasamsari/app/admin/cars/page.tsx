"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    ExternalLink,
    Car as CarIcon,
    X
} from 'lucide-react';

interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    km: number;
    price: number;
}

interface Brand {
    id: number;
    name: string;
}

interface CarModel {
    id: number;
    name: string;
    brandId: number;
}

export default function AdminCarsPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [models, setModels] = useState<CarModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        carModelId: '',
        year: new Date().getFullYear(),
        km: 0,
        price: 0,
        fuel: 'Benzină',
        transmission: 'Manuală'
    });
    const [selectedBrandId, setSelectedBrandId] = useState('');

    useEffect(() => {
        fetchCars();
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const res = await api.get('/brands');
            setBrands(res.data);
        } catch (err) {
            console.error("Error fetching brands:", err);
        }
    };

    const fetchModels = async (brandId: string) => {
        try {
            const res = await api.get('/carmodels');
            const filteredModels = res.data.filter((m: any) => m.brandId === parseInt(brandId));
            setModels(filteredModels);
        } catch (err) {
            console.error("Error fetching models:", err);
        }
    };

    const fetchCars = async () => {
        try {
            const response = await api.get('/Cars');
            setCars(response.data);
        } catch (err) {
            console.error("Error fetching cars:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Ești sigur că vrei să ștergi acest anunț?')) {
            try {
                await api.delete(`/cars/${id}`);
                setCars(cars.filter(c => c.id !== id));
            } catch (err) {
                alert('Eroare la ștergere');
            }
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/cars', {
                ...formData,
                carModelId: parseInt(formData.carModelId),
                year: parseInt(formData.year.toString()),
                km: parseInt(formData.km.toString()),
                price: parseFloat(formData.price.toString())
            });
            setIsModalOpen(false);
            fetchCars();
            // Reset form
            setFormData({
                carModelId: '',
                year: new Date().getFullYear(),
                km: 0,
                price: 0,
                fuel: 'Benzină',
                transmission: 'Manuală'
            });
            setSelectedBrandId('');
        } catch (err) {
            alert('Eroare la adăugarea mașinii. Verifică datele.');
        }
    };

    const filteredCars = cars.filter(car =>
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-blue-900">Gestiune Mașini</h1>
                    <p className="text-gray-500">Administrează inventarul auto al platformei</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 active:scale-95"
                >
                    <Plus size={20} />
                    Adaugă Mașină Nouă
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Caută după marcă sau model..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-gray-600 font-bold hover:bg-gray-50 transition-all">
                        <Filter size={20} />
                        Filtre
                    </button>
                </div>
            </div>

            {/* Cars Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4 text-gray-400">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900"></div>
                        <p className="font-medium">Se încarcă inventarul...</p>
                    </div>
                ) : filteredCars.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="px-8 py-5 font-black">Vehicul</th>
                                    <th className="px-8 py-5 font-black">Detalii Tehnicce</th>
                                    <th className="px-8 py-5 font-black">Preț Vânzare</th>
                                    <th className="px-8 py-5 font-black text-right">Acțiuni</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredCars.map((car) => (
                                    <tr key={car.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                                    <CarIcon size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-base font-black text-gray-900">{car.brand} {car.model}</p>
                                                    <p className="text-xs text-gray-500 font-medium">Ref ID: #{car.id.toString().padStart(5, '0')}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg uppercase tracking-tighter">An {car.year}</span>
                                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg uppercase tracking-tighter">{car.km.toLocaleString()} KM</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-lg font-black text-blue-900">{car.price.toLocaleString()} €</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 text-gray-600 transition-all">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(car.id)}
                                                    className="p-2 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100 text-red-600 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                                <button className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 text-blue-600 transition-all">
                                                    <ExternalLink size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="text-gray-300" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Niciun rezultat găsit</h3>
                        <p className="text-gray-500">Încearcă să schimbi termenii de căutare sau filtrele.</p>
                    </div>
                )}
            </div>

            {/* Add Car Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-2xl font-black text-blue-900">Adaugă Mașină</h3>
                                <p className="text-gray-500">Completează detaliile noului anunț</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                <X size={24} className="text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Marcă</label>
                                    <select
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 transition-all"
                                        value={selectedBrandId}
                                        onChange={(e) => {
                                            setSelectedBrandId(e.target.value);
                                            fetchModels(e.target.value);
                                        }}
                                        required
                                    >
                                        <option value="">Alege Marca</option>
                                        {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Model</label>
                                    <select
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 transition-all"
                                        value={formData.carModelId}
                                        onChange={(e) => setFormData({ ...formData, carModelId: e.target.value })}
                                        required
                                        disabled={!selectedBrandId}
                                    >
                                        <option value="">Alege Modelul</option>
                                        {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">An Fabricație</label>
                                    <input
                                        type="number"
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 transition-all"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Kilometraj (KM)</label>
                                    <input
                                        type="number"
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 transition-all"
                                        value={formData.km}
                                        onChange={(e) => setFormData({ ...formData, km: parseInt(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Preț (€)</label>
                                    <input
                                        type="number"
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 transition-all font-black text-blue-900"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Combustibil</label>
                                    <select
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-blue-500 transition-all"
                                        value={formData.fuel}
                                        onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                                    >
                                        <option value="Benzină">Benzină</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Hibrid">Hibrid</option>
                                        <option value="Electric">Electric</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all"
                                >
                                    Anulează
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-blue-910 bg-blue-900 text-white font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20"
                                >
                                    Salvează Anunțul
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
