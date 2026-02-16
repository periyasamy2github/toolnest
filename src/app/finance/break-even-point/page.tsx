"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function BreakEvenPoint() {
    const [fixedCosts, setFixedCosts] = useState("");
    const [variableCostPerUnit, setVariableCostPerUnit] = useState("");
    const [sellingPricePerUnit, setSellingPricePerUnit] = useState("");
    const [result, setResult] = useState<{
        breakEvenUnits: number;
        breakEvenRevenue: number;
    } | null>(null);

    const calculate = () => {
        const fc = parseFloat(fixedCosts);
        const vc = parseFloat(variableCostPerUnit);
        const sp = parseFloat(sellingPricePerUnit);

        if (isNaN(fc) || isNaN(vc) || isNaN(sp)) return;

        const contributionMargin = sp - vc;
        if (contributionMargin <= 0) return; // Cannot break even if variable cost >= selling price

        const breakEvenUnits = fc / contributionMargin;
        const breakEvenRevenue = breakEvenUnits * sp;

        setResult({
            breakEvenUnits,
            breakEvenRevenue
        });
    };

    const reset = () => {
        setFixedCosts("");
        setVariableCostPerUnit("");
        setSellingPricePerUnit("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Break Even <span className="text-sky-500">Point</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate the point where revenue equals costs.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Fixed Costs</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={fixedCosts}
                                onChange={(e) => setFixedCosts(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-sky-500/50 outline-none"
                                placeholder="50000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Variable Cost / Unit</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={variableCostPerUnit}
                                onChange={(e) => setVariableCostPerUnit(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-sky-500/50 outline-none"
                                placeholder="10"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Selling Price / Unit</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={sellingPricePerUnit}
                                onChange={(e) => setSellingPricePerUnit(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-sky-500/50 outline-none"
                                placeholder="25"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate Break Even <ArrowRight size={20} />
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
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Break Even Units</div>
                            <div className="text-3xl font-bold text-white font-mono">
                                {result.breakEvenUnits.toLocaleString(undefined, { maximumFractionDigits: 0 })} Units
                            </div>
                        </div>
                        <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-sky-400 uppercase tracking-wider">Break Even Revenue</div>
                            <div className="text-4xl font-black text-white font-mono">
                                ${result.breakEvenRevenue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
