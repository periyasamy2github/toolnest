"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, Landmark } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function NPSCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState("");
    const [rate, setRate] = useState("");
    const [currentAge, setCurrentAge] = useState("");
    const [result, setResult] = useState<{
        investedAmount: number;
        interestEarned: number;
        totalCorpus: number;
        annuityAmount: number;
        lumpsumAmount: number;
    } | null>(null);

    const calculate = () => {
        const p = parseFloat(monthlyInvestment);
        const r = parseFloat(rate);
        const age = parseFloat(currentAge);

        if (isNaN(p) || isNaN(r) || isNaN(age) || age >= 60) return;

        const years = 60 - age;
        const months = years * 12;
        const monthlyRate = r / 12 / 100;

        // Formula for Future Value of Annuity (SIP)
        const totalCorpus = p * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        const investedAmount = p * months;
        const interestEarned = totalCorpus - investedAmount;

        // NPS Rules: Min 40% annuity, Max 60% lumpsum
        const annuityAmount = totalCorpus * 0.4;
        const lumpsumAmount = totalCorpus * 0.6;

        setResult({
            investedAmount,
            interestEarned,
            totalCorpus,
            annuityAmount,
            lumpsumAmount
        });
    };

    const reset = () => {
        setMonthlyInvestment("");
        setRate("");
        setCurrentAge("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    NPS <span className="text-teal-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate your National Pension System corpus and benefits.
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
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-teal-500/50 outline-none"
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
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-teal-500/50 outline-none"
                            placeholder="10"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Current Age</label>
                        <input
                            type="number"
                            value={currentAge}
                            onChange={(e) => setCurrentAge(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-teal-500/50 outline-none"
                            placeholder="25"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate Corpus <ArrowRight size={20} />
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
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Interest Earned</div>
                            <div className="text-3xl font-bold text-green-400 font-mono">
                                +${result.interestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                        <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-teal-400 uppercase tracking-wider">Total Corpus</div>
                            <div className="text-4xl font-black text-white font-mono">
                                ${result.totalCorpus.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2 md:col-span-3 grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Annuity (40%)</div>
                                <div className="text-2xl font-bold text-teal-400 font-mono">
                                    ${result.annuityAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Lumpsum (60%)</div>
                                <div className="text-2xl font-bold text-teal-400 font-mono">
                                    ${result.lumpsumAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
