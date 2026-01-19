"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SalaryHikeCalculator() {
    const [currentSalary, setCurrentSalary] = useState("");
    const [hikePercentage, setHikePercentage] = useState("");
    const [result, setResult] = useState<{
        newSalary: number;
        hikeAmount: number;
        monthlyHike: number;
    } | null>(null);

    const calculate = () => {
        const salary = parseFloat(currentSalary);
        const hike = parseFloat(hikePercentage);

        if (isNaN(salary) || isNaN(hike)) return;

        const hikeAmount = (salary * hike) / 100;
        const newSalary = salary + hikeAmount;
        const monthlyHike = hikeAmount / 12;

        setResult({
            newSalary,
            hikeAmount,
            monthlyHike
        });
    };

    const reset = () => {
        setCurrentSalary("");
        setHikePercentage("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Salary Hike <span className="text-blue-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate your new salary after a percentage hike.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Current Annual Salary</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={currentSalary}
                                onChange={(e) => setCurrentSalary(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                                placeholder="50000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Hike Percentage (%)</label>
                        <input
                            type="number"
                            value={hikePercentage}
                            onChange={(e) => setHikePercentage(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                            placeholder="15"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate New Salary <ArrowRight size={20} />
                    </button>
                    <button
                        onClick={reset}
                        className="px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-colors"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>

                {result && (
                    <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom duration-500">
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-blue-400 uppercase tracking-wider">New Salary</div>
                            <div className="text-4xl font-black text-white font-mono">
                                ${result.newSalary.toLocaleString()}
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Hike Amount</div>
                            <div className="text-3xl font-bold text-green-400 font-mono">
                                +${result.hikeAmount.toLocaleString()}
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Monthly Hike</div>
                            <div className="text-3xl font-bold text-green-400 font-mono">
                                +${result.monthlyHike.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
