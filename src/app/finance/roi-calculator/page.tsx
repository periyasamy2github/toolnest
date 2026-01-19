"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Calculator, TrendingUp, DollarSign, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ROICalculator() {
    const [initialInvestment, setInitialInvestment] = useState("");
    const [finalValue, setFinalValue] = useState("");
    const [investmentPeriod, setInvestmentPeriod] = useState("");
    const [result, setResult] = useState<{
        roi: number;
        profit: number;
        annualizedRoi: number | null;
    } | null>(null);

    const calculate = () => {
        const initial = parseFloat(initialInvestment);
        const final = parseFloat(finalValue);
        const period = parseFloat(investmentPeriod);

        if (isNaN(initial) || isNaN(final)) return;

        const profit = final - initial;
        const roi = (profit / initial) * 100;

        let annualizedRoi = null;
        if (!isNaN(period) && period > 0) {
            annualizedRoi = (Math.pow(final / initial, 1 / period) - 1) * 100;
        }

        setResult({
            roi,
            profit,
            annualizedRoi
        });
    };

    const reset = () => {
        setInitialInvestment("");
        setFinalValue("");
        setInvestmentPeriod("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    ROI <span className="text-emerald-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate Return on Investment and Annualized ROI.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Initial Investment</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={initialInvestment}
                                onChange={(e) => setInitialInvestment(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                                placeholder="10000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Final Value</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={finalValue}
                                onChange={(e) => setFinalValue(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                                placeholder="15000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Period (Years) <span className="text-zinc-600 text-xs">(Optional)</span></label>
                        <input
                            type="number"
                            value={investmentPeriod}
                            onChange={(e) => setInvestmentPeriod(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                            placeholder="5"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate ROI <ArrowRight size={20} />
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
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-emerald-400 uppercase tracking-wider">Total ROI</div>
                            <div className="text-4xl font-black text-white font-mono">
                                {result.roi.toFixed(2)}%
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Total Profit</div>
                            <div className={cn("text-4xl font-black font-mono", result.profit >= 0 ? "text-green-400" : "text-red-400")}>
                                {result.profit >= 0 ? "+" : "-"}${Math.abs(result.profit).toLocaleString()}
                            </div>
                        </div>
                        {result.annualizedRoi !== null && (
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 text-center space-y-2">
                                <div className="text-sm font-medium text-blue-400 uppercase tracking-wider">Annualized ROI</div>
                                <div className="text-4xl font-black text-white font-mono">
                                    {result.annualizedRoi.toFixed(2)}%
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
