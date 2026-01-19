"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { Calendar, Cake, Clock, Hourglass } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AgeCalculator() {
    const [dob, setDob] = useState("");
    const [age, setAge] = useState<{
        years: number;
        months: number;
        days: number;
        nextBirthday: { months: number; days: number };
        total: { days: number; hours: number; minutes: number };
    } | null>(null);

    useEffect(() => {
        calculateAge();
    }, [dob]);

    const calculateAge = () => {
        if (!dob) return;

        const birthDate = new Date(dob);
        const today = new Date();

        if (birthDate > today) {
            setAge(null);
            return;
        }

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // Next Birthday
        const nextBday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (today > nextBday) {
            nextBday.setFullYear(today.getFullYear() + 1);
        }

        const diffTime = Math.abs(nextBday.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Total stats
        const totalTime = Math.abs(today.getTime() - birthDate.getTime());
        const totalDays = Math.floor(totalTime / (1000 * 60 * 60 * 24));

        setAge({
            years,
            months,
            days,
            nextBirthday: {
                months: Math.floor(diffDays / 30),
                days: diffDays % 30
            },
            total: {
                days: totalDays,
                hours: totalDays * 24,
                minutes: totalDays * 24 * 60
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Age <span className="text-indigo-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate your exact age and countdown to your next birthday.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="max-w-md mx-auto space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Date of Birth</label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none text-center text-lg"
                    />
                </div>

                {age && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
                        {/* Main Age Display */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 text-center">
                                <div className="text-4xl md:text-6xl font-black text-white mb-2">{age.years}</div>
                                <div className="text-xs md:text-sm text-indigo-400 uppercase tracking-wider font-bold">Years</div>
                            </div>
                            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 text-center">
                                <div className="text-4xl md:text-6xl font-black text-white mb-2">{age.months}</div>
                                <div className="text-xs md:text-sm text-indigo-400 uppercase tracking-wider font-bold">Months</div>
                            </div>
                            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 text-center">
                                <div className="text-4xl md:text-6xl font-black text-white mb-2">{age.days}</div>
                                <div className="text-xs md:text-sm text-indigo-400 uppercase tracking-wider font-bold">Days</div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Next Birthday */}
                            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 flex items-center gap-6">
                                <div className="w-16 h-16 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0">
                                    <Cake size={32} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1">Next Birthday</h3>
                                    <p className="text-zinc-400">
                                        in <span className="text-white font-bold">{age.nextBirthday.months}</span> months and <span className="text-white font-bold">{age.nextBirthday.days}</span> days
                                    </p>
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-4">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Hourglass size={20} className="text-blue-400" />
                                    Life Summary
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-zinc-400">
                                        <span>Total Days</span>
                                        <span className="text-white font-mono">{age.total.days.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-400">
                                        <span>Total Hours</span>
                                        <span className="text-white font-mono">{age.total.hours.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-400">
                                        <span>Total Minutes</span>
                                        <span className="text-white font-mono">{age.total.minutes.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
