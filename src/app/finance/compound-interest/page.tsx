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
    Clock,
    BarChart3,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

// --- Types ---
type Currency = "INR" | "USD";
type Frequency = "yearly" | "half-yearly" | "quarterly" | "monthly";

export default function CompoundInterestPage() {
    // --- State ---
    const [currency, setCurrency] = useState<Currency>("INR");
    const [principal, setPrincipal] = useState<number>(10000);
    const [rate, setRate] = useState<number>(10);
    const [time, setTime] = useState<number>(10);
    const [frequency, setFrequency] = useState<Frequency>("yearly");

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
    const { totalAmount, interestEarned, yearlyData } = useMemo(() => {
        let n = 1;
        if (frequency === "half-yearly") n = 2;
        if (frequency === "quarterly") n = 4;
        if (frequency === "monthly") n = 12;

        const amount = principal * Math.pow((1 + (rate / 100) / n), n * time);
        const interest = amount - principal;

        // Generate yearly data
        const data = [];
        for (let t = 1; t <= time; t++) {
            const amt = principal * Math.pow((1 + (rate / 100) / n), n * t);
            data.push({
                year: t,
                principal: principal,
                interest: Math.round(amt - principal),
                total: Math.round(amt)
            });
        }

        return {
            totalAmount: Math.round(amount),
            interestEarned: Math.round(interest),
            yearlyData: data
        };
    }, [principal, rate, time, frequency]);

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
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Compound Interest</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">See how your money multiplies with the power of compounding.</m.p>
                    </div>
                </div>

                {/* Currency Toggle */}
                <m.div variants={fadeInUp} className="flex p-1 rounded-xl bg-zinc-900 border border-white/5 self-start md:self-center">
                    <button
                        onClick={() => setCurrency("INR")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "INR" ? "bg-amber-600 text-white shadow-lg shadow-amber-600/20" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <IndianRupee size={16} />
                        INR
                    </button>
                    <button
                        onClick={() => setCurrency("USD")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "USD" ? "bg-amber-600 text-white shadow-lg shadow-amber-600/20" : "text-zinc-500 hover:text-zinc-300"
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
                        {/* Principal Input */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <DollarSign size={16} className="text-blue-400" />
                                    Principal Amount
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <span className="text-zinc-500 font-mono">{getSymbol()}</span>
                                    <input
                                        type="number"
                                        value={principal}
                                        onChange={(e) => setPrincipal(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-blue-400 font-mono font-bold w-24 text-right p-0"
                                    />
                                </div>
                            </div>
                            <input
                                type="range" min="1000" max={currency === "INR" ? 10000000 : 100000} step={1000}
                                value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        {/* Rate Input */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <Percent size={16} className="text-emerald-400" />
                                    Interest Rate (p.a)
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <input
                                        type="number"
                                        value={rate}
                                        onChange={(e) => setRate(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-emerald-400 font-mono font-bold w-12 text-right p-0"
                                    />
                                    <span className="text-zinc-500 font-mono">%</span>
                                </div>
                            </div>
                            <input
                                type="range" min="1" max="50" step="0.5"
                                value={rate} onChange={(e) => setRate(Number(e.target.value))}
                                className="w-full accent-emerald-500"
                            />
                        </div>

                        {/* Time Input */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <Calendar size={16} className="text-purple-400" />
                                    Time Period
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <input
                                        type="number"
                                        value={time}
                                        onChange={(e) => setTime(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-purple-400 font-mono font-bold w-12 text-right p-0"
                                    />
                                    <span className="text-zinc-500 font-mono">Yr</span>
                                </div>
                            </div>
                            <input
                                type="range" min="1" max="50" step="1"
                                value={time} onChange={(e) => setTime(Number(e.target.value))}
                                className="w-full accent-purple-500"
                            />
                        </div>

                        {/* Frequency Selector */}
                        <div className="space-y-4">
                            <label className="text-zinc-300 text-sm font-bold flex items-center gap-2">
                                <Clock size={16} className="text-amber-400" />
                                Compounding Frequency
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {["yearly", "half-yearly", "quarterly", "monthly"].map((freq) => (
                                    <button
                                        key={freq}
                                        onClick={() => setFrequency(freq as Frequency)}
                                        className={cn(
                                            "px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all",
                                            frequency === freq
                                                ? "bg-amber-500 text-white border-amber-500"
                                                : "bg-zinc-950/50 border-white/5 text-zinc-500 hover:bg-white/5"
                                        )}
                                    >
                                        {freq}
                                    </button>
                                ))}
                            </div>
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
                    <div className="glass-card p-8 border-amber-500/20 bg-amber-500/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10 text-center space-y-2">
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Maturity Amount</p>
                            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                                {formatCurrency(totalAmount)}
                            </h2>
                            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-bold">
                                <ArrowUpRight size={16} />
                                Interest Earned: {formatCurrency(interestEarned)}
                            </div>
                        </div>
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 space-y-6">
                            <h3 className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                                <BarChart3 size={16} />
                                Growth Breakdown
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Principal</span>
                                        <span className="text-white font-bold">{formatCurrency(principal)}</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${(principal / totalAmount) * 100}%` }} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Interest</span>
                                        <span className="text-amber-400 font-bold">{formatCurrency(interestEarned)}</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500" style={{ width: `${(interestEarned / totalAmount) * 100}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 flex flex-col justify-center gap-4">
                            <div className="text-center">
                                <div className="text-4xl font-black text-white mb-2">
                                    {Math.round((totalAmount / principal) * 100) / 100}x
                                </div>
                                <p className="text-zinc-400 text-xs">
                                    Your money will grow {Math.round((totalAmount / principal) * 100) / 100} times in {time} years.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Growth Chart */}
                    <div className="glass-card p-6 min-h-[300px] flex flex-col">
                        <h3 className="text-sm font-bold text-zinc-400 mb-8 flex items-center gap-2">
                            <TrendingUp size={16} />
                            Yearly Growth
                        </h3>
                        <div className="flex-grow flex items-end gap-1 h-[200px]">
                            {yearlyData.map((d, i) => {
                                const height = (d.total / totalAmount) * 100;
                                const principalHeight = (d.principal / d.total) * 100;

                                return (
                                    <div key={i} className="flex-grow group relative flex flex-col justify-end h-full">
                                        <div className="w-full bg-amber-500/20 group-hover:bg-amber-500/40 transition-colors rounded-t-sm relative overflow-hidden" style={{ height: `${height}%` }}>
                                            <div className="absolute bottom-0 left-0 right-0 bg-blue-500/40 group-hover:bg-blue-500/60 transition-colors" style={{ height: `${principalHeight}%` }} />
                                        </div>

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                            <div className="glass-card p-2 text-[10px] whitespace-nowrap border-white/20 shadow-xl">
                                                <p className="font-bold text-white">Year {d.year}</p>
                                                <p className="text-amber-400">Total: {formatCurrency(d.total)}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                            <span>Year 1</span>
                            <span>Year {time}</span>
                        </div>
                    </div>
                </m.div>
            </div>
        </div>
    );
}
