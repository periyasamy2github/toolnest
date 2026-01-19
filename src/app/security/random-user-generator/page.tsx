"use client";

import { useState } from "react";
import { User, RefreshCw, Mail, Phone, MapPin, Calendar } from "lucide-react";

export default function RandomUserGenerator() {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const generateUser = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("https://randomuser.me/api/");
            const data = await res.json();
            setUser(data.results[0]);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Random User <span className="text-pink-500">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Generate random user profiles for testing and mockups.
                </p>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={generateUser}
                    disabled={isLoading}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-pink-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {isLoading ? <RefreshCw className="animate-spin" /> : <User size={20} />}
                    {isLoading ? "Generating..." : "Generate New User"}
                </button>
            </div>

            {user && (
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl animate-in fade-in zoom-in duration-300">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div className="flex-shrink-0">
                            <img
                                src={user.picture.large}
                                alt="User"
                                className="w-48 h-48 rounded-full border-4 border-pink-500/20 shadow-2xl"
                            />
                        </div>

                        <div className="flex-1 space-y-6 w-full">
                            <div>
                                <h2 className="text-3xl font-bold text-white">
                                    {user.name.first} {user.name.last}
                                </h2>
                                <p className="text-zinc-400 capitalize">{user.gender} • {user.dob.age} years old</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <InfoItem icon={Mail} label="Email" value={user.email} />
                                <InfoItem icon={Phone} label="Phone" value={user.phone} />
                                <InfoItem icon={MapPin} label="Location" value={`${user.location.city}, ${user.location.country}`} />
                                <InfoItem icon={User} label="Username" value={user.login.username} />
                                <InfoItem icon={Calendar} label="Registered" value={new Date(user.registered.date).toLocaleDateString()} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function InfoItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="bg-zinc-950 border border-white/5 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-pink-500" />
            </div>
            <div className="overflow-hidden">
                <div className="text-xs text-zinc-500 uppercase tracking-wider">{label}</div>
                <div className="text-zinc-200 truncate" title={value}>{value}</div>
            </div>
        </div>
    );
}
