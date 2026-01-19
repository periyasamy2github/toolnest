"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LumpsumCalculator() {
    const [investment, setInvestment] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<{
        investedAmount: number;
        estimatedReturns: number;
        totalValue: number;
    } | null>(null);

    const calculate = () => {
        const p = parseFloat(investment);
        const r = parseFloat(rate);
        const t = parseFloat(years);

        if (isNaN(p) || isNaN(r) || isNaN(t)) return;

        const totalValue = p * Math.pow(1 + r / 100, t);
        const estimatedReturns = totalValue - p;

        setResult({
            investedAmount: p,
            estimatedReturns,
            totalValue
        });
    };

    const reset = () => {
        setInvestment("");
        setRate("");
        setYears("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Lumpsum <span className="text-cyan-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate returns on your one-time investment.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Total Investment</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={investment}
                                onChange={(e) => setInvestment(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                placeholder="100000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Expected Return Rate (p.a)</label>
                        <input
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none"
                            placeholder="12"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Time Period (Years)</label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none"
                            placeholder="10"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate Returns <ArrowRight size={20} />
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
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Invested Amount</div>
                            <div className="text-3xl font-bold text-white font-mono">
                                ${result.investedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Est. Returns</div>
                            <div className="text-3xl font-bold text-green-400 font-mono">
                                +${result.estimatedReturns.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-cyan-400 uppercase tracking-wider">Total Value</div>
                            <div className="text-4xl font-black text-white font-mono">
                                ${result.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
