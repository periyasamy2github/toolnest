"use client";

import { useState, useMemo } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Building,
    DollarSign,
    IndianRupee,
    Calendar,
    Percent,
    Wallet,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

// --- Types ---
type Currency = "INR" | "USD";

export default function HomeLoanAffordabilityPage() {
    // --- State ---
    const [currency, setCurrency] = useState<Currency>("INR");
    const [monthlyIncome, setMonthlyIncome] = useState<number>(100000);
    const [existingEmis, setExistingEmis] = useState<number>(10000);
    const [rate, setRate] = useState<number>(8.5);
    const [tenure, setTenure] = useState<number>(20);

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
    const { eligibleLoanAmount, maxEmi, eligibleEmi } = useMemo(() => {
        // Banks typically allow 50-60% of net income as total EMI capacity
        const foir = 0.50; // Fixed Obligation to Income Ratio (50%)
        const maxMonthlyEmiCapacity = monthlyIncome * foir;
        const availableEmiCapacity = Math.max(0, maxMonthlyEmiCapacity - existingEmis);

        // Calculate Loan Amount from EMI
        // P = (EMI * ((1+r)^n - 1)) / (r * (1+r)^n)
        const r = rate / 12 / 100;
        const n = tenure * 12;

        const loanAmount = (availableEmiCapacity * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));

        return {
            eligibleLoanAmount: Math.round(loanAmount),
            maxEmi: Math.round(maxMonthlyEmiCapacity),
            eligibleEmi: Math.round(availableEmiCapacity)
        };
    }, [monthlyIncome, existingEmis, rate, tenure]);

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
                    <Link href="/finance" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                        <ArrowLeft className="text-zinc-100" />
                    </Link>
                    <div>
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Home Loan Eligibility</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Check how much home loan you can afford based on your salary.</m.p>
                    </div>
                </div>

                {/* Currency Toggle */}
                <m.div variants={fadeInUp} className="flex p-1 rounded-xl bg-zinc-900 border border-white/5 self-start md:self-center">
                    <button
                        onClick={() => setCurrency("INR")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "INR" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <IndianRupee size={16} />
                        INR
                    </button>
                    <button
                        onClick={() => setCurrency("USD")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "USD" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-zinc-500 hover:text-zinc-300"
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
                        {/* Monthly Income */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <Wallet size={16} className="text-blue-400" />
                                    Net Monthly Income
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <span className="text-zinc-500 font-mono">{getSymbol()}</span>
                                    <input
                                        type="number"
                                        value={monthlyIncome}
                                        onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-blue-400 font-mono font-bold w-28 text-right p-0"
                                    />
                                </div>
                            </div>
                            <input
                                type="range" min="10000" max={currency === "INR" ? 500000 : 10000} step={1000}
                                value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        {/* Existing EMIs */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <DollarSign size={16} className="text-red-400" />
                                    Existing Monthly EMIs
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <span className="text-zinc-500 font-mono">{getSymbol()}</span>
                                    <input
                                        type="number"
                                        value={existingEmis}
                                        onChange={(e) => setExistingEmis(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-red-400 font-mono font-bold w-28 text-right p-0"
                                    />
                                </div>
                            </div>
                            <input
                                type="range" min="0" max={monthlyIncome} step={1000}
                                value={existingEmis} onChange={(e) => setExistingEmis(Number(e.target.value))}
                                className="w-full accent-red-500"
                            />
                        </div>

                        {/* Interest Rate */}
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

                        {/* Tenure */}
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
                    <div className="glass-card p-8 border-blue-500/20 bg-blue-500/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10 text-center space-y-2">
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">You are eligible for a loan of</p>
                            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                                {formatCurrency(eligibleLoanAmount)}
                            </h2>
                            <p className="text-blue-400 text-sm font-medium">
                                With an EMI of {formatCurrency(eligibleEmi)}
                            </p>
                        </div>
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 space-y-6">
                            <h3 className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                                <Wallet size={16} />
                                Eligibility Breakdown
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Max EMI Capacity (50%)</span>
                                        <span className="text-white font-bold">{formatCurrency(maxEmi)}</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: '50%' }} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Less: Existing EMIs</span>
                                        <span className="text-red-400 font-bold">-{formatCurrency(existingEmis)}</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500" style={{ width: `${Math.min(100, (existingEmis / maxEmi) * 100)}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 flex flex-col justify-center gap-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                    <CheckCircle2 size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Pro Tip</h4>
                                    <p className="text-zinc-400 text-xs mt-1">
                                        Closing your existing loans can increase your home loan eligibility by approx {formatCurrency(existingEmis * 100)} (approx 100x of monthly EMI).
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
