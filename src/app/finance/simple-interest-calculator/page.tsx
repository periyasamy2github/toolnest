"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, Percent } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function SimpleInterestCalculator() {
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<{
        interest: number;
        totalAmount: number;
    } | null>(null);

    const calculate = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rate);
        const t = parseFloat(years);

        if (isNaN(p) || isNaN(r) || isNaN(t)) return;

        const interest = (p * r * t) / 100;
        const totalAmount = p + interest;

        setResult({
            interest,
            totalAmount
        });
    };

    const reset = () => {
        setPrincipal("");
        setRate("");
        setYears("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Simple Interest <span className="text-yellow-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate simple interest on your principal amount.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Principal Amount</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={principal}
                                onChange={(e) => setPrincipal(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-yellow-500/50 outline-none"
                                placeholder="10000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Interest Rate (p.a)</label>
                        <input
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-yellow-500/50 outline-none"
                            placeholder="5"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Time Period (Years)</label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-yellow-500/50 outline-none"
                            placeholder="2"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-yellow-500 hover:bg-yellow-600 text-zinc-900 rounded-xl transition-colors font-bold shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate Interest <ArrowRight size={20} />
                    </button>
                    <button
                        onClick={reset}
                        className="px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-colors"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>

                {result && (
                    <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom duration-500">
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Total Interest</div>
                            <div className="text-3xl font-bold text-green-400 font-mono">
                                +${result.interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-yellow-400 uppercase tracking-wider">Total Amount</div>
                            <div className="text-4xl font-black text-white font-mono">
                                ${result.totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
