"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Globe, Clock, Search, Plus, X } from "lucide-react";
import Link from "next/link";

const CITIES = [
    { name: "London", zone: "Europe/London" },
    { name: "New York", zone: "America/New_York" },
    { name: "Tokyo", zone: "Asia/Tokyo" },
    { name: "Dubai", zone: "Asia/Dubai" },
    { name: "Paris", zone: "Europe/Paris" },
    { name: "Sydney", zone: "Australia/Sydney" },
    { name: "Mumbai", zone: "Asia/Kolkata" },
    { name: "Singapore", zone: "Asia/Singapore" },
];

export default function WorldClockPage() {
    const [time, setTime] = useState(new Date());
    const [selectedCities, setSelectedCities] = useState(CITIES.slice(0, 4));

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date, zone: string) => {
        return new Intl.DateTimeFormat("en-US", {
            timeZone: zone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        }).format(date);
    };

    const formatDate = (date: Date, zone: string) => {
        return new Intl.DateTimeFormat("en-US", {
            timeZone: zone,
            weekday: "short",
            month: "short",
            day: "numeric",
        }).format(date);
    };

    const removeCity = (name: string) => {
        setSelectedCities(selectedCities.filter(c => c.name !== name));
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/utils" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <ArrowLeft className="text-zinc-400" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black text-gradient">World Clock</h1>
                        <p className="text-zinc-400">Track current time across major global cities.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                    <Clock size={18} className="text-blue-400" />
                    <span className="text-lg font-mono font-bold text-zinc-100">
                        {time.toLocaleTimeString()}
                    </span>
                    <span className="text-xs text-zinc-500 ml-2 uppercase tracking-widest">Local</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {selectedCities.map((city) => (
                    <div key={city.name} className="glass-card p-6 space-y-4 relative group">
                        <button
                            onClick={() => removeCity(city.name)}
                            className="absolute top-4 right-4 p-1 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <X size={14} />
                        </button>
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-zinc-100">{city.name}</h3>
                            <p className="text-xs text-zinc-500 uppercase tracking-widest">{city.zone}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl font-bold font-mono text-blue-400">
                                {formatTime(time, city.zone)}
                            </p>
                            <p className="text-xs text-zinc-400">
                                {formatDate(time, city.zone)}
                            </p>
                        </div>
                    </div>
                ))}

                {selectedCities.length < CITIES.length && (
                    <button
                        onClick={() => {
                            const nextCity = CITIES.find(c => !selectedCities.includes(c));
                            if (nextCity) setSelectedCities([...selectedCities, nextCity]);
                        }}
                        className="glass-card p-6 flex flex-col items-center justify-center gap-3 border-dashed hover:bg-white/5 transition-all text-zinc-500 hover:text-zinc-300"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                            <Plus size={20} />
                        </div>
                        <span className="text-sm font-medium">Add City</span>
                    </button>
                )}
            </div>

            <div className="glass-card p-8 bg-gradient-to-br from-blue-600/10 to-transparent border-blue-500/10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                        <Globe size={48} className="text-blue-400 animate-pulse" />
                    </div>
                    <div className="flex-1 space-y-2 text-center md:text-left">
                        <h3 className="text-xl font-bold text-zinc-100">Global Time Synchronization</h3>
                        <p className="text-zinc-400 text-sm max-w-2xl">
                            Our world clock uses high-precision international time standards to ensure you're always in sync with your global team, no matter where they are.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
