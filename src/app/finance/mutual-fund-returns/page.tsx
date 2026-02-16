"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function MutualFundReturns() {
    const [investmentType, setInvestmentType] = useState<"sip" | "lumpsum">("sip");
    const [amount, setAmount] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<{
        investedAmount: number;
        estimatedReturns: number;
        totalValue: number;
    } | null>(null);

    const calculate = () => {
        const p = parseFloat(amount);
        const r = parseFloat(rate);
        const t = parseFloat(years);

        if (isNaN(p) || isNaN(r) || isNaN(t)) return;

        let investedAmount = 0;
        let totalValue = 0;

        if (investmentType === "lumpsum") {
            investedAmount = p;
            totalValue = p * Math.pow(1 + r / 100, t);
        } else {
            const monthlyRate = r / 12 / 100;
            const months = t * 12;
            investedAmount = p * months;
            totalValue = p * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        }

        setResult({
            investedAmount,
            estimatedReturns: totalValue - investedAmount,
            totalValue
        });
    };

    const reset = () => {
        setAmount("");
        setRate("");
        setYears("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Mutual Fund <span className="text-orange-500">Returns</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate returns on your SIP or Lumpsum investments.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setInvestmentType("sip")}
                        className={cn(
                            "px-6 py-2 rounded-full font-medium transition-all",
                            investmentType === "sip"
                                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        )}
                    >
                        SIP
                    </button>
                    <button
                        onClick={() => setInvestmentType("lumpsum")}
                        className={cn(
                            "px-6 py-2 rounded-full font-medium transition-all",
                            investmentType === "lumpsum"
                                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        )}
                    >
                        Lumpsum
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">
                            {investmentType === "sip" ? "Monthly Investment" : "Total Investment"}
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                                placeholder={investmentType === "sip" ? "5000" : "100000"}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Expected Return Rate (p.a)</label>
                        <input
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                            placeholder="12"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Time Period (Years)</label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                            placeholder="10"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
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
                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-orange-400 uppercase tracking-wider">Total Value</div>
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
