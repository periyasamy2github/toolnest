"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function SWPCalculator() {
    const [totalInvestment, setTotalInvestment] = useState("");
    const [withdrawalPerMonth, setWithdrawalPerMonth] = useState("");
    const [rate, setRate] = useState("");
    const [years, setYears] = useState("");
    const [result, setResult] = useState<{
        totalInvestment: number;
        totalWithdrawal: number;
        finalValue: number;
    } | null>(null);

    const calculate = () => {
        const investment = parseFloat(totalInvestment);
        const withdrawal = parseFloat(withdrawalPerMonth);
        const r = parseFloat(rate);
        const t = parseFloat(years);

        if (isNaN(investment) || isNaN(withdrawal) || isNaN(r) || isNaN(t)) return;

        const monthlyRate = r / 12 / 100;
        const months = t * 12;

        let balance = investment;
        for (let i = 0; i < months; i++) {
            balance = balance * (1 + monthlyRate) - withdrawal;
        }

        // If balance goes negative, it means money ran out
        if (balance < 0) balance = 0;

        setResult({
            totalInvestment: investment,
            totalWithdrawal: withdrawal * months,
            finalValue: balance
        });
    };

    const reset = () => {
        setTotalInvestment("");
        setWithdrawalPerMonth("");
        setRate("");
        setYears("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    SWP <span className="text-indigo-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate Systematic Withdrawal Plan details.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Total Investment</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={totalInvestment}
                                onChange={(e) => setTotalInvestment(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none"
                                placeholder="1000000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Withdrawal Per Month</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={withdrawalPerMonth}
                                onChange={(e) => setWithdrawalPerMonth(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none"
                                placeholder="5000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Expected Return Rate (p.a)</label>
                        <input
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none"
                            placeholder="8"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Time Period (Years)</label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none"
                            placeholder="10"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate SWP <ArrowRight size={20} />
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
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Total Investment</div>
                            <div className="text-3xl font-bold text-white font-mono">
                                ${result.totalInvestment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Total Withdrawal</div>
                            <div className="text-3xl font-bold text-indigo-400 font-mono">
                                ${result.totalWithdrawal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-indigo-400 uppercase tracking-wider">Final Value</div>
                            <div className="text-4xl font-black text-white font-mono">
                                ${result.finalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
