"use client";

import { useState, useMemo } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    PiggyBank,
    DollarSign,
    IndianRupee,
    Calendar,
    Percent,
    TrendingUp,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

// --- Types ---
type Currency = "INR" | "USD";

export default function PpfCalculatorPage() {
    // --- State ---
    const [currency, setCurrency] = useState<Currency>("INR");
    const [yearlyInvestment, setYearlyInvestment] = useState<number>(150000);
    const [timePeriod, setTimePeriod] = useState<number>(15);
    const rate = 7.1; // Current PPF rate is fixed mostly, but kept as constant here

    // --- Helpers ---
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
            style: "currency",
            currency: currency,
            maximumFractionDigits: 0,
        }).format(val);
    };

    const getSymbol = () => currency === "INR" ? "₹" : "$";

    // --- Calculations ---
    const { investedAmount, totalInterest, maturityAmount, yearlyData } = useMemo(() => {
        let currentBalance = 0;
        let totalInv = 0;
        const data = [];

        for (let i = 1; i <= timePeriod; i++) {
            currentBalance += yearlyInvestment;
            const interest = Math.round(currentBalance * (rate / 100));
            currentBalance += interest;
            totalInv += yearlyInvestment;

            data.push({
                year: i,
                invested: totalInv,
                balance: currentBalance
            });
        }

        return {
            investedAmount: totalInv,
            totalInterest: currentBalance - totalInv,
            maturityAmount: currentBalance,
            yearlyData: data
        };
    }, [yearlyInvestment, timePeriod]);

    return (
        <div className="min-h-screen pb-24 space-y-12">
            {/* Header */}
            <m.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div className="flex items-center gap-6">
                    <BackButton />
                    <div>
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">PPF Calculator</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Calculate returns on your Public Provident Fund investment.</m.p>
                    </div>
                </div>

                {/* Currency Toggle */}
                <m.div variants={fadeInUp} className="flex p-1 rounded-xl bg-zinc-900 border border-white/5 self-start md:self-center">
                    <button
                        onClick={() => setCurrency("INR")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "INR" ? "bg-pink-600 text-white shadow-lg shadow-pink-600/20" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <IndianRupee size={16} />
                        INR
                    </button>
                    <button
                        onClick={() => setCurrency("USD")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "USD" ? "bg-pink-600 text-white shadow-lg shadow-pink-600/20" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <DollarSign size={16} />
                        USD
                    </button>
                </m.div>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Controls Panel */}
                <m.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-5 space-y-6"
                >
                    <div className="glass-card p-8 space-y-8">
                        {/* Investment Input */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <DollarSign size={16} className="text-blue-400" />
                                    Yearly Investment
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <span className="text-zinc-500 font-mono">{getSymbol()}</span>
                                    <input
                                        type="number"
                                        value={yearlyInvestment}
                                        onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-blue-400 font-mono font-bold w-28 text-right p-0"
                                    />
                                </div>
                            </div>
                            <input
                                type="range" min="500" max={currency === "INR" ? 150000 : 2000} step={500}
                                value={yearlyInvestment} onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                            <p className="text-xs text-zinc-500">Max investment limit: {formatCurrency(currency === "INR" ? 150000 : 2000)}/year</p>
                        </div>

                        {/* Rate Display */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <Percent size={16} className="text-emerald-400" />
                                    Interest Rate (Fixed)
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5 opacity-70">
                                    <span className="text-emerald-400 font-mono font-bold">{rate}</span>
                                    <span className="text-zinc-500 font-mono">%</span>
                                </div>
                            </div>
                        </div>

                        {/* Time Period */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <Calendar size={16} className="text-purple-400" />
                                    Time Period
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <input
                                        type="number"
                                        value={timePeriod}
                                        onChange={(e) => setTimePeriod(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-purple-400 font-mono font-bold w-12 text-right p-0"
                                    />
                                    <span className="text-zinc-500 font-mono">Yr</span>
                                </div>
                            </div>
                            <input
                                type="range" min="15" max="50" step="5"
                                value={timePeriod} onChange={(e) => setTimePeriod(Number(e.target.value))}
                                className="w-full accent-purple-500"
                            />
                            <p className="text-xs text-zinc-500">Minimum tenure is 15 years</p>
                        </div>
                    </div>
                </m.div>

                {/* Results Panel */}
                <m.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-7 space-y-6"
                >
                    {/* Main Result Card */}
                    <div className="glass-card p-8 border-pink-500/20 bg-pink-500/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-pink-500/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10 text-center space-y-2">
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Maturity Amount</p>
                            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                                {formatCurrency(maturityAmount)}
                            </h2>
                            <p className="text-pink-400 text-sm font-medium">
                                Total Interest: {formatCurrency(totalInterest)}
                            </p>
                        </div>
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 space-y-6">
                            <h3 className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                                <PiggyBank size={16} />
                                Investment Summary
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Total Invested</span>
                                        <span className="text-white font-bold">{formatCurrency(investedAmount)}</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${(investedAmount / maturityAmount) * 100}%` }} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Interest Earned</span>
                                        <span className="text-pink-400 font-bold">{formatCurrency(totalInterest)}</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-pink-500" style={{ width: `${(totalInterest / maturityAmount) * 100}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 flex flex-col justify-center gap-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Tax Free Returns</h4>
                                    <p className="text-zinc-400 text-xs mt-1">
                                        PPF falls under EEE category. Principal, Interest, and Maturity amount are all tax-free in India.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Growth Chart */}
                    <div className="glass-card p-6 min-h-[300px] flex flex-col">
                        <h3 className="text-sm font-bold text-zinc-400 mb-8 flex items-center gap-2">
                            <TrendingUp size={16} />
                            Wealth Growth
                        </h3>
                        <div className="flex-grow flex items-end gap-1 h-[200px]">
                            {yearlyData.map((d, i) => {
                                const height = (d.balance / maturityAmount) * 100;
                                const investedHeight = (d.invested / d.balance) * 100;

                                return (
                                    <div key={i} className="flex-grow group relative flex flex-col justify-end h-full">
                                        <div className="w-full bg-pink-500/20 group-hover:bg-pink-500/40 transition-colors rounded-t-sm relative overflow-hidden" style={{ height: `${height}%` }}>
                                            <div className="absolute bottom-0 left-0 right-0 bg-blue-500/40 group-hover:bg-blue-500/60 transition-colors" style={{ height: `${investedHeight}%` }} />
                                        </div>

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                            <div className="glass-card p-2 text-[10px] whitespace-nowrap border-white/20 shadow-xl">
                                                <p className="font-bold text-white">Year {d.year}</p>
                                                <p className="text-pink-400">Bal: {formatCurrency(d.balance)}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                            <span>Year 1</span>
                            <span>Year {timePeriod}</span>
                        </div>
                    </div>
                </m.div>
            </div>
        </div>
    );
}
