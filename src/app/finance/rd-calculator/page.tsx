"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RDCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<{
        investedAmount: number;
        estimatedReturns: number;
        totalValue: number;
    } | null>(null);

    const calculate = () => {
        const p = parseFloat(monthlyInvestment);
        const r = parseFloat(rate);
        const t = parseFloat(years);

        if (isNaN(p) || isNaN(r) || isNaN(t)) return;

        // RD Formula: M = P * n + P * n(n+1)/2 * r/12/100
        // Where P = Monthly Installment, n = number of months, r = annual interest rate
        // Note: This is a simple interest approximation often used for RD. 
        // Compound interest formula for RD is: P * ((1+r/400)^(4n) - 1) / (1-(1+r/400)^(-1/3)) ... complicated.
        // Let's use the standard compound interest formula for RD:
        // A = P * ((1 + i)^n - 1) / i * (1 + i)
        // where i = r/12/100 (monthly interest rate)

        const i = r / 12 / 100;
        const n = t * 12; // months

        const totalValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        const investedAmount = p * n;
        const estimatedReturns = totalValue - investedAmount;

        setResult({
            investedAmount,
            estimatedReturns,
            totalValue
        });
    };

    const reset = () => {
        setMonthlyInvestment("");
        setRate("");
        setYears("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    RD <span className="text-pink-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate returns on your Recurring Deposit.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Monthly Investment</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={monthlyInvestment}
                                onChange={(e) => setMonthlyInvestment(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
                                placeholder="5000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Interest Rate (p.a)</label>
                        <input
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
                            placeholder="7"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Time Period (Years)</label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
                            placeholder="5"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate Maturity Amount <ArrowRight size={20} />
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
                        <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-pink-400 uppercase tracking-wider">Maturity Value</div>
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
