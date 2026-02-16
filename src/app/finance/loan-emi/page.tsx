"use client";

import { useState, useEffect, useMemo } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Calculator,
    PieChart,
    DollarSign,
    IndianRupee,
    Calendar,
    Percent,
    RefreshCw,
    TrendingUp,
    Info
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

// --- Types ---
type Currency = "INR" | "USD";

export default function LoanEmiPage() {
    // --- State ---
    const [currency, setCurrency] = useState<Currency>("INR");
    const [principal, setPrincipal] = useState<number>(1000000);
    const [rate, setRate] = useState<number>(8.5);
    const [tenure, setTenure] = useState<number>(5); // Years

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
    const { emi, totalInterest, totalPayment, pieData } = useMemo(() => {
        const r = rate / 12 / 100;
        const n = tenure * 12;

        const emiValue = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPay = emiValue * n;
        const totalInt = totalPay - principal;

        return {
            emi: Math.round(emiValue),
            totalInterest: Math.round(totalInt),
            totalPayment: Math.round(totalPay),
            pieData: [
                { name: "Principal", value: principal, color: "bg-blue-500" },
                { name: "Interest", value: Math.round(totalInt), color: "bg-emerald-500" }
            ]
        };
    }, [principal, rate, tenure]);

    const principalPercent = Math.round((principal / totalPayment) * 100);
    const interestPercent = 100 - principalPercent;

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
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Loan EMI Calculator</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Plan your loans with precision. Calculate EMI and total interest payable.</m.p>
                    </div>
                </div>

                {/* Currency Toggle */}
                <m.div variants={fadeInUp} className="flex p-1 rounded-xl bg-zinc-900 border border-white/5 self-start md:self-center">
                    <button
                        onClick={() => setCurrency("INR")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "INR" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <IndianRupee size={16} />
                        INR
                    </button>
                    <button
                        onClick={() => setCurrency("USD")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "USD" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "text-zinc-500 hover:text-zinc-300"
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
                                    Loan Amount
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <span className="text-zinc-500 font-mono">{getSymbol()}</span>
                                    <input
                                        type="number"
                                        value={principal}
                                        onChange={(e) => setPrincipal(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-blue-400 font-mono font-bold w-28 text-right p-0"
                                    />
                                </div>
                            </div>
                            <input
                                type="range" min="10000" max={currency === "INR" ? 10000000 : 500000} step={currency === "INR" ? 10000 : 1000}
                                value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        {/* Interest Rate Input */}
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
                                type="range" min="1" max="30" step="0.1"
                                value={rate} onChange={(e) => setRate(Number(e.target.value))}
                                className="w-full accent-emerald-500"
                            />
                        </div>

                        {/* Tenure Input */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <Calendar size={16} className="text-purple-400" />
                                    Loan Tenure
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
                                type="range" min="1" max="30" step="1"
                                value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                                className="w-full accent-purple-500"
                            />
                            <div className="flex justify-between text-xs text-zinc-500 font-medium px-1">
                                <span>1 Year</span>
                                <span>30 Years</span>
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
                    {/* Main EMI Card */}
                    <div className="glass-card p-8 border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10 text-center space-y-2">
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Monthly EMI</p>
                            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                                {formatCurrency(emi)}
                            </h2>
                            <p className="text-emerald-400 text-sm font-medium">
                                Total Payment: {formatCurrency(totalPayment)}
                            </p>
                        </div>
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Chart Card */}
                        <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[250px]">
                            <h3 className="text-sm font-bold text-zinc-400 mb-6 flex items-center gap-2 self-start">
                                <PieChart size={16} />
                                Payment Breakup
                            </h3>

                            {/* Custom CSS Pie Chart Representation */}
                            <div className="relative w-48 h-48 rounded-full border-8 border-zinc-800 flex items-center justify-center">
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: `conic-gradient(#3b82f6 ${principalPercent}%, #10b981 ${principalPercent}% 100%)`,
                                        maskImage: 'radial-gradient(transparent 60%, black 61%)',
                                        WebkitMaskImage: 'radial-gradient(transparent 60%, black 61%)'
                                    }}
                                />
                                <div className="text-center z-10">
                                    <div className="text-xs text-zinc-500 font-bold">Interest Ratio</div>
                                    <div className="text-xl font-black text-white">{interestPercent}%</div>
                                </div>
                            </div>

                            <div className="flex gap-6 mt-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    <div className="text-xs font-bold text-zinc-400">Principal</div>
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
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Principal Amount</p>
                                <p className="text-2xl font-bold text-blue-400">{formatCurrency(principal)}</p>
                            </div>
                            <div className="w-full h-px bg-white/5" />
                            <div className="space-y-1">
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Interest</p>
                                <p className="text-2xl font-bold text-emerald-400">{formatCurrency(totalInterest)}</p>
                            </div>
                            <div className="w-full h-px bg-white/5" />
                            <div className="space-y-1">
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Amount Payable</p>
                                <p className="text-2xl font-bold text-white">{formatCurrency(totalPayment)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="glass-card p-6 flex gap-4 items-start">
                        <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                            <Info size={20} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-white font-bold">Did you know?</h4>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Increasing your EMI by just 5% every year can help you close your loan significantly earlier and save huge amounts on interest.
                            </p>
                        </div>
                    </div>
                </m.div>
            </div>
        </div>
    );
}
