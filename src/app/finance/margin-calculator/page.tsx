"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, Percent } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function MarginCalculator() {
    const [cost, setCost] = useState("");
    const [revenue, setRevenue] = useState("");
    const [result, setResult] = useState<{
        margin: number;
        markup: number;
        profit: number;
    } | null>(null);

    const calculate = () => {
        const c = parseFloat(cost);
        const r = parseFloat(revenue);

        if (isNaN(c) || isNaN(r)) return;

        const profit = r - c;
        const margin = (profit / r) * 100;
        const markup = (profit / c) * 100;

        setResult({
            margin,
            markup,
            profit
        });
    };

    const reset = () => {
        setCost("");
        setRevenue("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Margin <span className="text-amber-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate Profit Margin and Markup.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Cost Price</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-amber-500/50 outline-none"
                                placeholder="100"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Revenue (Selling Price)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={revenue}
                                onChange={(e) => setRevenue(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-amber-500/50 outline-none"
                                placeholder="150"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 text-zinc-900 rounded-xl transition-colors font-bold shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate Margin <ArrowRight size={20} />
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
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-amber-400 uppercase tracking-wider">Gross Margin</div>
                            <div className="text-4xl font-black text-white font-mono">
                                {result.margin.toFixed(2)}%
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Markup</div>
                            <div className="text-3xl font-bold text-white font-mono">
                                {result.markup.toFixed(2)}%
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Total Profit</div>
                            <div className="text-3xl font-bold text-green-400 font-mono">
                                ${result.profit.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
