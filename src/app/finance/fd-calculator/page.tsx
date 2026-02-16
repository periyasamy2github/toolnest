"use client";

import { useState, useMemo } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Wallet,
    DollarSign,
    IndianRupee,
    Calendar,
    Percent,
    PieChart,
    Landmark
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

// --- Types ---
type Currency = "INR" | "USD";

export default function FdCalculatorPage() {
    // --- State ---
    const [currency, setCurrency] = useState<Currency>("INR");
    const [investment, setInvestment] = useState<number>(100000);
    const [rate, setRate] = useState<number>(7.5);
    const [tenure, setTenure] = useState<number>(5);

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
    const { maturityAmount, interestEarned, pieData } = useMemo(() => {
        // FD Formula: A = P * (1 + r/n)^(n*t)
        // Assuming quarterly compounding for standard bank FDs
        const n = 4;
        const r = rate / 100;
        const t = tenure;

        const amount = investment * Math.pow((1 + r / n), n * t);
        const interest = amount - investment;

        return {
            maturityAmount: Math.round(amount),
            interestEarned: Math.round(interest),
            pieData: [
                { name: "Investment", value: investment, color: "bg-cyan-500" },
                { name: "Interest", value: Math.round(interest), color: "bg-emerald-500" }
            ]
        };
    }, [investment, rate, tenure]);

    const investmentPercent = Math.round((investment / maturityAmount) * 100);
    const interestPercent = 100 - investmentPercent;

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
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">FD Calculator</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Calculate returns on your Fixed Deposits with quarterly compounding.</m.p>
                    </div>
                </div>

                {/* Currency Toggle */}
                <m.div variants={fadeInUp} className="flex p-1 rounded-xl bg-zinc-900 border border-white/5 self-start md:self-center">
                    <button
                        onClick={() => setCurrency("INR")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "INR" ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <IndianRupee size={16} />
                        INR
                    </button>
                    <button
                        onClick={() => setCurrency("USD")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "USD" ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20" : "text-zinc-500 hover:text-zinc-300"
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
                                    Total Investment
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <span className="text-zinc-500 font-mono">{getSymbol()}</span>
                                    <input
                                        type="number"
                                        value={investment}
                                        onChange={(e) => setInvestment(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-blue-400 font-mono font-bold w-28 text-right p-0"
                                    />
                                </div>
                            </div>
                            <input
                                type="range" min="5000" max={currency === "INR" ? 10000000 : 500000} step={5000}
                                value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
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
                                        className="bg-transparent border-none focus:ring-0 text-emerald-400 font-mono font-bold w-16 text-right p-0"
                                    />
                                    <span className="text-zinc-500 font-mono">%</span>
                                </div>
                            </div>
                            <input
                                type="range" min="1" max="15" step="0.1"
                                value={rate} onChange={(e) => setRate(Number(e.target.value))}
                                className="w-full accent-emerald-500"
                            />
                        </div>

                        {/* Tenure Input */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <Calendar size={16} className="text-purple-400" />
                                    Time Period
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <input
                                        type="number"
                                        value={tenure}
                                        onChange={(e) => setTenure(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-purple-400 font-mono font-bold w-12 text-right p-0"
                                    />
                                    <span className="text-zinc-500 font-mono">Yr</span>
                                </div>
                            </div>
                            <input
                                type="range" min="1" max="25" step="1"
                                value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
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
                    <div className="glass-card p-8 border-cyan-500/20 bg-cyan-500/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10 text-center space-y-2">
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Maturity Amount</p>
                            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                                {formatCurrency(maturityAmount)}
                            </h2>
                            <p className="text-cyan-400 text-sm font-medium">
                                Invested Amount: {formatCurrency(investment)}
                            </p>
                        </div>
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Chart Card */}
                        <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[250px]">
                            <h3 className="text-sm font-bold text-zinc-400 mb-6 flex items-center gap-2 self-start">
                                <PieChart size={16} />
                                Returns Breakup
                            </h3>

                            <div className="relative w-48 h-48 rounded-full border-8 border-zinc-800 flex items-center justify-center">
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: `conic-gradient(#06b6d4 ${investmentPercent}%, #10b981 ${investmentPercent}% 100%)`,
                                        maskImage: 'radial-gradient(transparent 60%, black 61%)',
                                        WebkitMaskImage: 'radial-gradient(transparent 60%, black 61%)'
                                    }}
                                />
                                <div className="text-center z-10">
                                    <div className="text-xs text-zinc-500 font-bold">Return Ratio</div>
                                    <div className="text-xl font-black text-white">{interestPercent}%</div>
                                </div>
                            </div>

                            <div className="flex gap-6 mt-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-cyan-500" />
                                    <div className="text-xs font-bold text-zinc-400">Invested</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                    <div className="text-xs font-bold text-zinc-400">Interest</div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Card */}
                        <div className="glass-card p-6 space-y-6 flex flex-col justify-center">
                            <div className="space-y-1">
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Interest Earned</p>
                                <p className="text-3xl font-bold text-emerald-400">{formatCurrency(interestEarned)}</p>
                            </div>
                            <div className="w-full h-px bg-white/5" />
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
                                    <Landmark size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Safe Returns</h4>
                                    <p className="text-zinc-400 text-xs mt-1">
                                        Fixed Deposits offer guaranteed returns and are one of the safest investment options available.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </m.div>
            </div>
        </div>
    );
}
