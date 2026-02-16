"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function SavingsGoalCalculator() {
    const [goalAmount, setGoalAmount] = useState("");
    const [initialSavings, setInitialSavings] = useState("");
    const [years, setYears] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [result, setResult] = useState<{
        monthlyContribution: number;
        totalContribution: number;
        totalInterest: number;
    } | null>(null);

    const calculate = () => {
        const goal = parseFloat(goalAmount);
        const initial = parseFloat(initialSavings) || 0;
        const t = parseFloat(years);
        const r = parseFloat(interestRate);

        if (isNaN(goal) || isNaN(t) || isNaN(r)) return;

        const monthlyRate = r / 12 / 100;
        const months = t * 12;

        // Future Value of Initial Savings
        const fvInitial = initial * Math.pow(1 + monthlyRate, months);

        // Remaining Goal
        const remainingGoal = goal - fvInitial;

        if (remainingGoal <= 0) {
            setResult({
                monthlyContribution: 0,
                totalContribution: initial,
                totalInterest: fvInitial - initial
            });
            return;
        }

        // PMT Formula: PMT = FV * r / ((1 + r)^n - 1)
        const monthlyContribution = remainingGoal * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
        const totalContribution = initial + (monthlyContribution * months);
        const totalInterest = goal - totalContribution;

        setResult({
            monthlyContribution,
            totalContribution,
            totalInterest
        });
    };

    const reset = () => {
        setGoalAmount("");
        setInitialSavings("");
        setYears("");
        setInterestRate("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Savings Goal <span className="text-emerald-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate how much you need to save monthly to reach your goal.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Goal Amount</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={goalAmount}
                                onChange={(e) => setGoalAmount(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                                placeholder="100000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Initial Savings (Optional)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={initialSavings}
                                onChange={(e) => setInitialSavings(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                                placeholder="5000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Time Period (Years)</label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                            placeholder="5"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Interest Rate (p.a)</label>
                        <input
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none"
                            placeholder="6"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate Monthly Savings <ArrowRight size={20} />
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
                            <div className="text-sm font-medium text-emerald-400 uppercase tracking-wider">Monthly Savings</div>
                            <div className="text-4xl font-black text-white font-mono">
                                ${result.monthlyContribution.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Total Contribution</div>
                            <div className="text-3xl font-bold text-white font-mono">
                                ${result.totalContribution.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Total Interest</div>
                            <div className="text-3xl font-bold text-green-400 font-mono">
                                +${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
