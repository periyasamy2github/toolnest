"use client";

import { useState, useMemo } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    TrendingUp,
    DollarSign,
    IndianRupee,
    Calendar,
    Percent,
    PieChart,
    Target,
    Zap
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

// --- Types ---
type Currency = "INR" | "USD";

export default function SipCalculatorPage() {
    // --- State ---
    const [currency, setCurrency] = useState<Currency>("INR");
    const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
    const [expectedReturn, setExpectedReturn] = useState<number>(12);
    const [timePeriod, setTimePeriod] = useState<number>(10);

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
    const { investedAmount, estimatedReturns, totalValue, yearlyData } = useMemo(() => {
        const monthlyRate = expectedReturn / 12 / 100;
        const months = timePeriod * 12;

        const invested = monthlyInvestment * months;
        const total = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        const returns = total - invested;

        // Generate yearly data for chart
        const data = [];
        let currentVal = 0;
        let currentInv = 0;

        for (let i = 1; i <= timePeriod; i++) {
            const m = i * 12;
            const inv = monthlyInvestment * m;
            const val = monthlyInvestment * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate);
            data.push({ year: i, invested: inv, value: val });
        }

        return {
            investedAmount: Math.round(invested),
            estimatedReturns: Math.round(returns),
            totalValue: Math.round(total),
            yearlyData: data
        };
    }, [monthlyInvestment, expectedReturn, timePeriod]);

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
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">SIP Calculator</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Calculate the future value of your Systematic Investment Plan.</m.p>
                    </div>
                </div>

                {/* Currency Toggle */}
                <m.div variants={fadeInUp} className="flex p-1 rounded-xl bg-zinc-900 border border-white/5 self-start md:self-center">
                    <button
                        onClick={() => setCurrency("INR")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "INR" ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <IndianRupee size={16} />
                        INR
                    </button>
                    <button
                        onClick={() => setCurrency("USD")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "USD" ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20" : "text-zinc-500 hover:text-zinc-300"
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
                        {/* Monthly Investment */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <DollarSign size={16} className="text-blue-400" />
                                    Monthly Investment
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <span className="text-zinc-500 font-mono">{getSymbol()}</span>
                                    <input
                                        type="number"
                                        value={monthlyInvestment}
                                        onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-blue-400 font-mono font-bold w-24 text-right p-0"
                                    />
                                </div>
                            </div>
                            <input
                                type="range" min="500" max={currency === "INR" ? 100000 : 5000} step={500}
                                value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        {/* Expected Return */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <TrendingUp size={16} className="text-emerald-400" />
                                    Expected Return (p.a)
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <input
                                        type="number"
                                        value={expectedReturn}
                                        onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-emerald-400 font-mono font-bold w-12 text-right p-0"
                                    />
                                    <span className="text-zinc-500 font-mono">%</span>
                                </div>
                            </div>
                            <input
                                type="range" min="1" max="30" step="0.5"
                                value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                className="w-full accent-emerald-500"
                            />
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
                                type="range" min="1" max="40" step="1"
                                value={timePeriod} onChange={(e) => setTimePeriod(Number(e.target.value))}
                                className="w-full accent-purple-500"
                            />
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
                    <div className="glass-card p-8 border-purple-500/20 bg-purple-500/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10 text-center space-y-2">
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Total Value</p>
                            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                                {formatCurrency(totalValue)}
                            </h2>
                            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-bold">
                                <TrendingUp size={16} />
                                Wealth Gained: {formatCurrency(estimatedReturns)}
                            </div>
                        </div>
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 space-y-6">
                            <h3 className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                                <PieChart size={16} />
                                Investment Breakdown
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Invested Amount</span>
                                        <span className="text-white font-bold">{formatCurrency(investedAmount)}</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${(investedAmount / totalValue) * 100}%` }} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Est. Returns</span>
                                        <span className="text-emerald-400 font-bold">{formatCurrency(estimatedReturns)}</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: `${(estimatedReturns / totalValue) * 100}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 flex flex-col justify-center gap-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Power of Compounding</h4>
                                    <p className="text-zinc-400 text-xs mt-1">
                                        Your money is growing exponentially. The longer you stay invested, the faster your wealth grows.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                    <Target size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Goal Projection</h4>
                                    <p className="text-zinc-400 text-xs mt-1">
                                        In {timePeriod} years, your investment of {formatCurrency(investedAmount)} will grow by {Math.round((estimatedReturns / investedAmount) * 100)}%.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Growth Chart */}
                    <div className="glass-card p-6 min-h-[300px] flex flex-col">
                        <h3 className="text-sm font-bold text-zinc-400 mb-8 flex items-center gap-2">
                            <TrendingUp size={16} />
                            Wealth Growth Projection
                        </h3>
                        <div className="flex-grow flex items-end gap-1 h-[200px]">
                            {yearlyData.map((d, i) => {
                                const height = (d.value / totalValue) * 100;
                                const investedHeight = (d.invested / d.value) * 100;

                                return (
                                    <div key={i} className="flex-grow group relative flex flex-col justify-end h-full">
                                        <div className="w-full bg-emerald-500/20 group-hover:bg-emerald-500/40 transition-colors rounded-t-sm relative overflow-hidden" style={{ height: `${height}%` }}>
                                            <div className="absolute bottom-0 left-0 right-0 bg-blue-500/40 group-hover:bg-blue-500/60 transition-colors" style={{ height: `${investedHeight}%` }} />
                                        </div>

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                            <div className="glass-card p-2 text-[10px] whitespace-nowrap border-white/20 shadow-xl">
                                                <p className="font-bold text-white">Year {d.year}</p>
                                                <p className="text-emerald-400">Val: {formatCurrency(Math.round(d.value))}</p>
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
