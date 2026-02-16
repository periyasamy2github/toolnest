"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Info,
    TrendingUp,
    TrendingDown,
    Coins,
    PieChart,
    ArrowRight,
    RefreshCw,
    AlertCircle,
    Zap,
    Target,
    LineChart as ChartIcon,
    Wallet,
    ArrowUpRight,
    DollarSign,
    IndianRupee,
    Calendar,
    Clock as ClockIcon
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

// --- Types ---
interface CalculationResult {
    year: number;
    nominalSalary: number;
    realSalary: number;
    investmentValue: number;
    totalWealth: number;
}

type Currency = "INR" | "USD";

export default function SalaryTimeValuePage() {
    // --- State ---
    const [currency, setCurrency] = useState<Currency>("INR");
    const [currentSalary, setCurrentSalary] = useState<number>(1200000);
    const [annualHike, setAnnualHike] = useState<number>(10);
    const [inflationRate, setInflationRate] = useState<number>(6);
    const [investmentPortion, setInvestmentPortion] = useState<number>(20);
    const [expectedReturn, setExpectedReturn] = useState<number>(12);
    const [years, setYears] = useState<number>(20);

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
    const results = useMemo(() => {
        const data: CalculationResult[] = [];
        let nominal = currentSalary;
        let real = currentSalary;
        let investment = 0;

        for (let i = 0; i <= years; i++) {
            const monthlyInvestment = (nominal / 12) * (investmentPortion / 100);

            data.push({
                year: i,
                nominalSalary: Math.round(nominal),
                realSalary: Math.round(real),
                investmentValue: Math.round(investment),
                totalWealth: Math.round(investment)
            });

            // Next year projections
            nominal *= (1 + annualHike / 100);
            real *= (1 + (annualHike - inflationRate) / 100);

            // Compound interest for investment (monthly)
            for (let month = 0; month < 12; month++) {
                investment = (investment + monthlyInvestment) * (1 + (expectedReturn / 100) / 12);
            }
        }
        return data;
    }, [currentSalary, annualHike, inflationRate, investmentPortion, expectedReturn, years]);

    const finalResult = results[results.length - 1];

    // Breakdown Calculations
    const monthly = currentSalary / 12;
    const weekly = currentSalary / 52;
    const daily = currentSalary / 260; // 5-day week
    const hourly = daily / 8;

    return (
        <div className="min-h-screen pb-24 space-y-12">
            {/* Header */}
            <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div className="flex items-center gap-6">
                    <BackButton />
                    <div>
                        <motion.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Salary Time Value</motion.h1>
                        <motion.p variants={fadeInUp} className="text-zinc-400 text-lg">Project your wealth, adjust for inflation, and see the power of compounding.</motion.p>
                    </div>
                </div>

                {/* Currency Toggle */}
                <motion.div variants={fadeInUp} className="flex p-1 rounded-xl bg-zinc-900 border border-white/5 self-start md:self-center">
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
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Controls Panel */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-4 space-y-6"
                >
                    <div className="glass-card p-8 space-y-8">
                        {/* Income Details */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                <Wallet size={16} className="text-blue-500" />
                                Income Details
                            </h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <label className="text-zinc-300">Annual Salary</label>
                                        <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-2 py-1">
                                            <span className="text-zinc-500 font-mono">{getSymbol()}</span>
                                            <input
                                                type="number"
                                                value={currentSalary}
                                                onChange={(e) => setCurrentSalary(Number(e.target.value))}
                                                className="bg-transparent border-none focus:ring-0 text-blue-400 font-mono font-bold w-24 text-right p-0"
                                            />
                                        </div>
                                    </div>
                                    <input
                                        type="range" min="10000" max={currency === "INR" ? 10000000 : 1000000} step={currency === "INR" ? 50000 : 5000}
                                        value={currentSalary} onChange={(e) => setCurrentSalary(Number(e.target.value))}
                                        className="w-full accent-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <label className="text-zinc-300">Expected Annual Hike (%)</label>
                                        <input
                                            type="number"
                                            value={annualHike}
                                            onChange={(e) => setAnnualHike(Number(e.target.value))}
                                            className="bg-zinc-950/50 border border-white/5 rounded-lg px-2 py-1 text-emerald-400 font-mono font-bold w-16 text-right"
                                        />
                                    </div>
                                    <input
                                        type="range" min="0" max="50" step="1"
                                        value={annualHike} onChange={(e) => setAnnualHike(Number(e.target.value))}
                                        className="w-full accent-emerald-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Economic Factors */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                <TrendingDown size={16} className="text-red-500" />
                                Economic Factors
                            </h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <label className="text-zinc-300">Inflation Rate (%)</label>
                                        <input
                                            type="number"
                                            value={inflationRate}
                                            onChange={(e) => setInflationRate(Number(e.target.value))}
                                            className="bg-zinc-950/50 border border-white/5 rounded-lg px-2 py-1 text-red-400 font-mono font-bold w-16 text-right"
                                        />
                                    </div>
                                    <input
                                        type="range" min="0" max="20" step="0.5"
                                        value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))}
                                        className="w-full accent-red-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Investment Strategy */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                <TrendingUp size={16} className="text-purple-500" />
                                Investment Strategy
                            </h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <label className="text-zinc-300">% of Salary Invested</label>
                                        <input
                                            type="number"
                                            value={investmentPortion}
                                            onChange={(e) => setInvestmentPortion(Number(e.target.value))}
                                            className="bg-zinc-950/50 border border-white/5 rounded-lg px-2 py-1 text-purple-400 font-mono font-bold w-16 text-right"
                                        />
                                    </div>
                                    <input
                                        type="range" min="0" max="80" step="5"
                                        value={investmentPortion} onChange={(e) => setInvestmentPortion(Number(e.target.value))}
                                        className="w-full accent-purple-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <label className="text-zinc-300">Expected Returns (%)</label>
                                        <input
                                            type="number"
                                            value={expectedReturn}
                                            onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                            className="bg-zinc-950/50 border border-white/5 rounded-lg px-2 py-1 text-amber-400 font-mono font-bold w-16 text-right"
                                        />
                                    </div>
                                    <input
                                        type="range" min="0" max="30" step="1"
                                        value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))}
                                        className="w-full accent-amber-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Projection Period */}
                        <div className="pt-4 border-t border-white/5">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <label className="text-zinc-300">Projection Period (Years)</label>
                                    <input
                                        type="number"
                                        value={years}
                                        onChange={(e) => setYears(Number(e.target.value))}
                                        className="bg-zinc-950/50 border border-white/5 rounded-lg px-2 py-1 text-zinc-100 font-mono font-bold w-16 text-right"
                                    />
                                </div>
                                <input
                                    type="range" min="1" max="40" step="1"
                                    value={years} onChange={(e) => setYears(Number(e.target.value))}
                                    className="w-full accent-zinc-500"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Results Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-8 space-y-8"
                >
                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="glass-card p-6 border-blue-500/20 bg-blue-500/5">
                            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Final Annual Salary</p>
                            <h4 className="text-2xl font-black text-white">{formatCurrency(finalResult.nominalSalary)}</h4>
                            <div className="mt-2 flex items-center gap-1 text-emerald-400 text-xs font-bold">
                                <ArrowUpRight size={14} />
                                {Math.round((finalResult.nominalSalary / currentSalary - 1) * 100)}% Growth
                            </div>
                        </div>
                        <div className="glass-card p-6 border-red-500/20 bg-red-500/5">
                            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Real Value (Today's {getSymbol()})</p>
                            <h4 className="text-2xl font-black text-white">{formatCurrency(finalResult.realSalary)}</h4>
                            <p className="mt-2 text-zinc-500 text-[10px] leading-tight">
                                Adjusted for {inflationRate}% annual inflation
                            </p>
                        </div>
                        <div className="glass-card p-6 border-purple-500/20 bg-purple-500/5">
                            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-1">Investment Wealth</p>
                            <h4 className="text-2xl font-black text-white">{formatCurrency(finalResult.investmentValue)}</h4>
                            <div className="mt-2 flex items-center gap-1 text-purple-400 text-xs font-bold">
                                <Zap size={14} />
                                Power of Compounding
                            </div>
                        </div>
                    </div>

                    {/* Salary Breakdown Section */}
                    <div className="glass-card p-8 space-y-6">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <RefreshCw size={20} className="text-emerald-500" />
                            Salary Breakdown (Current)
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="space-y-1">
                                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Monthly</p>
                                <p className="text-xl font-bold text-white">{formatCurrency(monthly)}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Weekly</p>
                                <p className="text-xl font-bold text-white">{formatCurrency(weekly)}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Daily (Work)</p>
                                <p className="text-xl font-bold text-white">{formatCurrency(daily)}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Hourly</p>
                                <p className="text-xl font-bold text-white">{formatCurrency(hourly)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Chart Area */}
                    <div className="glass-card p-8 min-h-[400px] flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <ChartIcon size={20} className="text-blue-500" />
                                Wealth & Income Projection
                            </h3>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    <span className="text-xs text-zinc-400">Salary</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                                    <span className="text-xs text-zinc-400">Investments</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow relative flex items-end gap-1 pt-10 h-[300px]">
                            {results.map((r, i) => {
                                const maxVal = Math.max(...results.map(x => x.nominalSalary + x.investmentValue));
                                const salaryHeight = (r.nominalSalary / maxVal) * 100;
                                const investHeight = (r.investmentValue / maxVal) * 100;

                                return (
                                    <div key={i} className="flex-grow group relative flex flex-col justify-end items-center h-full">
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                            <div className="glass-card p-3 text-[10px] whitespace-nowrap border-white/20 shadow-2xl">
                                                <p className="font-bold text-white mb-1">Year {r.year}</p>
                                                <p className="text-blue-400">Salary: {formatCurrency(r.nominalSalary)}</p>
                                                <p className="text-purple-400">Wealth: {formatCurrency(r.investmentValue)}</p>
                                            </div>
                                        </div>

                                        {/* Bars - Using standard div for reliability with better visibility */}
                                        <div className="w-full flex flex-col justify-end h-full">
                                            <div
                                                style={{ height: `${investHeight}%` }}
                                                className="w-full bg-purple-500/60 group-hover:bg-purple-500 transition-all duration-500 rounded-t-sm"
                                            />
                                            <div
                                                style={{ height: `${salaryHeight}%` }}
                                                className="w-full bg-blue-500/60 group-hover:bg-blue-500 transition-all duration-500 rounded-t-sm mt-[1px]"
                                            />
                                        </div>

                                        {/* X-Axis Label */}
                                        {i % 5 === 0 && (
                                            <span className="absolute top-full mt-2 text-[10px] text-zinc-600 font-bold">Y{r.year}</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Insights Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 space-y-4">
                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                <Info size={16} className="text-blue-400" />
                                Inflation Insight
                            </h4>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                In {years} years, your {formatCurrency(finalResult.nominalSalary)} salary will only have the purchasing power of
                                <span className="text-white font-bold"> {formatCurrency(finalResult.realSalary)} </span>
                                in today's money due to a {inflationRate}% annual inflation rate.
                            </p>
                        </div>
                        <div className="glass-card p-6 space-y-4">
                            <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                <Target size={16} className="text-emerald-400" />
                                Wealth Potential
                            </h4>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                By consistently investing {investmentPortion}% of your income at a {expectedReturn}% return, you could accumulate
                                <span className="text-white font-bold"> {formatCurrency(finalResult.investmentValue)} </span>
                                in additional wealth over the next {years} years.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
