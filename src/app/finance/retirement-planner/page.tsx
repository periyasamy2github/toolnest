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
    TrendingUp,
    User,
    HeartPulse,
    ShoppingBag
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

// --- Types ---
type Currency = "INR" | "USD";

export default function RetirementPlannerPage() {
    // --- State ---
    const [currency, setCurrency] = useState<Currency>("INR");
    const [currentAge, setCurrentAge] = useState<number>(30);
    const [retirementAge, setRetirementAge] = useState<number>(60);
    const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
    const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
    const [inflation, setInflation] = useState<number>(6);
    const [preRetirementReturn, setPreRetirementReturn] = useState<number>(12);

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
    const { corpusNeeded, monthlySavings, expenseAtRetirement } = useMemo(() => {
        const yearsToRetire = retirementAge - currentAge;
        const yearsInRetirement = lifeExpectancy - retirementAge;

        // Future value of monthly expenses at retirement age
        const fvExpense = monthlyExpenses * Math.pow(1 + inflation / 100, yearsToRetire);

        // Corpus needed at retirement to sustain expenses for yearsInRetirement
        // Using inflation-adjusted return rate (Real Rate of Return)
        // Assuming post-retirement return is safer, say 8% (conservative estimate hardcoded or could be input)
        const postRetirementReturn = 8;
        const realRate = (postRetirementReturn - inflation) / 100;

        // PV of annuity due formula for corpus
        const annualExpense = fvExpense * 12;
        // Corpus = AnnualExpense * ((1 - (1+r)^-n) / r) * (1+r)  <-- Approximation
        // More accurate: Sum of PV of each year's expense

        // Simplified Corpus calculation:
        // Corpus = (Annual Expense at Retirement) * (Inverse of Annuity Factor adjusted for inflation)
        // Let's use a standard approximation: Corpus ~ 20-25x annual expense usually

        // Precise calculation:
        // We need a corpus that generates 'fvExpense' monthly, increasing by 'inflation' yearly, for 'yearsInRetirement'
        // This is complex. Let's use a standard withdrawal rate approach or simple PV.

        // Using Real Rate of Return formula for Corpus:
        // Corpus = (AnnualExpense / RealRate) * (1 - (1 + RealRate)^(-YearsInRetirement))

        let corpus = 0;
        if (realRate === 0) {
            corpus = annualExpense * yearsInRetirement;
        } else {
            corpus = (annualExpense / realRate) * (1 - Math.pow(1 + realRate, -yearsInRetirement));
        }

        // Monthly SIP needed to reach this corpus
        const monthlyRate = preRetirementReturn / 12 / 100;
        const monthsToInvest = yearsToRetire * 12;

        const sip = corpus / (((Math.pow(1 + monthlyRate, monthsToInvest) - 1) / monthlyRate) * (1 + monthlyRate));

        return {
            corpusNeeded: Math.round(corpus),
            monthlySavings: Math.round(sip),
            expenseAtRetirement: Math.round(fvExpense)
        };
    }, [currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflation, preRetirementReturn]);

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
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Retirement Planner</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Plan your financial freedom. Calculate how much you need to retire.</m.p>
                    </div>
                </div>

                {/* Currency Toggle */}
                <m.div variants={fadeInUp} className="flex p-1 rounded-xl bg-zinc-900 border border-white/5 self-start md:self-center">
                    <button
                        onClick={() => setCurrency("INR")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "INR" ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <IndianRupee size={16} />
                        INR
                    </button>
                    <button
                        onClick={() => setCurrency("USD")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "USD" ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" : "text-zinc-500 hover:text-zinc-300"
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
                        {/* Age Inputs */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-zinc-300 font-bold flex items-center gap-2 text-sm">
                                    <User size={16} className="text-blue-400" />
                                    Current Age
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <input
                                        type="number"
                                        value={currentAge}
                                        onChange={(e) => setCurrentAge(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-blue-400 font-mono font-bold w-full text-center p-0"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-zinc-300 font-bold flex items-center gap-2 text-sm">
                                    <Wallet size={16} className="text-orange-400" />
                                    Retirement Age
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <input
                                        type="number"
                                        value={retirementAge}
                                        onChange={(e) => setRetirementAge(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-orange-400 font-mono font-bold w-full text-center p-0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Monthly Expenses */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <ShoppingBag size={16} className="text-red-400" />
                                    Current Monthly Expenses
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <span className="text-zinc-500 font-mono">{getSymbol()}</span>
                                    <input
                                        type="number"
                                        value={monthlyExpenses}
                                        onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-red-400 font-mono font-bold w-24 text-right p-0"
                                    />
                                </div>
                            </div>
                            <input
                                type="range" min="10000" max={currency === "INR" ? 500000 : 10000} step={1000}
                                value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                                className="w-full accent-red-500"
                            />
                        </div>

                        {/* Inflation & Returns */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <TrendingUp size={16} className="text-emerald-400" />
                                    Expected Inflation (p.a)
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <input
                                        type="number"
                                        value={inflation}
                                        onChange={(e) => setInflation(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-emerald-400 font-mono font-bold w-12 text-right p-0"
                                    />
                                    <span className="text-zinc-500 font-mono">%</span>
                                </div>
                            </div>
                            <input
                                type="range" min="1" max="15" step="0.5"
                                value={inflation} onChange={(e) => setInflation(Number(e.target.value))}
                                className="w-full accent-emerald-500"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <Percent size={16} className="text-purple-400" />
                                    Pre-Retirement Return (p.a)
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <input
                                        type="number"
                                        value={preRetirementReturn}
                                        onChange={(e) => setPreRetirementReturn(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-purple-400 font-mono font-bold w-12 text-right p-0"
                                    />
                                    <span className="text-zinc-500 font-mono">%</span>
                                </div>
                            </div>
                            <input
                                type="range" min="1" max="20" step="0.5"
                                value={preRetirementReturn} onChange={(e) => setPreRetirementReturn(Number(e.target.value))}
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
                    <div className="glass-card p-8 border-orange-500/20 bg-orange-500/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10 text-center space-y-2">
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Retirement Corpus Needed</p>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                                {formatCurrency(corpusNeeded)}
                            </h2>
                            <p className="text-orange-400 text-sm font-medium">
                                To sustain lifestyle till age {lifeExpectancy}
                            </p>
                        </div>
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 space-y-6">
                            <h3 className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                                <Wallet size={16} />
                                Action Plan
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Monthly SIP Required</span>
                                        <span className="text-emerald-400 font-bold text-lg">{formatCurrency(monthlySavings)}</span>
                                    </div>
                                    <p className="text-xs text-zinc-500">
                                        Start investing this amount monthly at {preRetirementReturn}% return to reach your goal.
                                    </p>
                                </div>
                                <div className="w-full h-px bg-white/5" />
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Expense at Age {retirementAge}</span>
                                        <span className="text-red-400 font-bold">{formatCurrency(expenseAtRetirement)}</span>
                                    </div>
                                    <p className="text-xs text-zinc-500">
                                        Your {formatCurrency(monthlyExpenses)} monthly expense will become {formatCurrency(expenseAtRetirement)} due to inflation.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 flex flex-col justify-center gap-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                    <HeartPulse size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Inflation is the Enemy</h4>
                                    <p className="text-zinc-400 text-xs mt-1">
                                        At {inflation}% inflation, your purchasing power halves every {Math.round(72 / inflation)} years. You need investments that beat inflation.
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
