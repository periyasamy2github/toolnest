"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function InflationCalculator() {
    const [currentCost, setCurrentCost] = useState("");
    const [inflationRate, setInflationRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<{
        futureCost: number;
        difference: number;
        purchasingPower: number;
    } | null>(null);

    const calculate = () => {
        const cost = parseFloat(currentCost);
        const rate = parseFloat(inflationRate);
        const period = parseFloat(years);

        if (isNaN(cost) || isNaN(rate) || isNaN(period)) return;

        const futureCost = cost * Math.pow(1 + rate / 100, period);
        const difference = futureCost - cost;
        const purchasingPower = (cost / futureCost) * 100;

        setResult({
            futureCost,
            difference,
            purchasingPower
        });
    };

    const reset = () => {
        setCurrentCost("");
        setInflationRate("");
        setYears("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Inflation <span className="text-red-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate future value of money based on inflation.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Current Cost</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={currentCost}
                                onChange={(e) => setCurrentCost(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-red-500/50 outline-none"
                                placeholder="1000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Inflation Rate (%)</label>
                        <input
                            type="number"
                            value={inflationRate}
                            onChange={(e) => setInflationRate(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50 outline-none"
                            placeholder="6"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Time Period (Years)</label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-500/50 outline-none"
                            placeholder="10"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate Future Value <ArrowRight size={20} />
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
                        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-red-400 uppercase tracking-wider">Future Cost</div>
                            <div className="text-4xl font-black text-white font-mono">
                                ${result.futureCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Cost Increase</div>
                            <div className="text-3xl font-bold text-red-400 font-mono">
                                +${result.difference.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Purchasing Power</div>
                            <div className="text-3xl font-bold text-yellow-400 font-mono">
                                {result.purchasingPower.toFixed(1)}%
                            </div>
                            <div className="text-xs text-zinc-500">of today's money</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
