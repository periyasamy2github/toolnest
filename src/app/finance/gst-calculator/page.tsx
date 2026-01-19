"use client";

import { useState, useMemo } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Percent,
    DollarSign,
    IndianRupee,
    Calculator,
    ArrowRightLeft,
    Receipt
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

// --- Types ---
type Currency = "INR" | "USD";
type GstMode = "exclusive" | "inclusive";

export default function GstCalculatorPage() {
    // --- State ---
    const [currency, setCurrency] = useState<Currency>("INR");
    const [amount, setAmount] = useState<number>(10000);
    const [gstRate, setGstRate] = useState<number>(18);
    const [mode, setMode] = useState<GstMode>("exclusive");

    // --- Helpers ---
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
            style: "currency",
            currency: currency,
            maximumFractionDigits: 2,
        }).format(val);
    };

    const getSymbol = () => currency === "INR" ? "₹" : "$";

    // --- Calculations ---
    const { netAmount, gstAmount, totalAmount } = useMemo(() => {
        let net = 0;
        let gst = 0;
        let total = 0;

        if (mode === "exclusive") {
            // GST is added to the amount
            net = amount;
            gst = (amount * gstRate) / 100;
            total = net + gst;
        } else {
            // GST is included in the amount
            total = amount;
            gst = amount - (amount * (100 / (100 + gstRate)));
            net = total - gst;
        }

        return {
            netAmount: net,
            gstAmount: gst,
            totalAmount: total
        };
    }, [amount, gstRate, mode]);

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
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">GST Calculator</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Calculate GST Inclusive and Exclusive amounts instantly.</m.p>
                    </div>
                </div>

                {/* Currency Toggle */}
                <m.div variants={fadeInUp} className="flex p-1 rounded-xl bg-zinc-900 border border-white/5 self-start md:self-center">
                    <button
                        onClick={() => setCurrency("INR")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "INR" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <IndianRupee size={16} />
                        INR
                    </button>
                    <button
                        onClick={() => setCurrency("USD")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "USD" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-zinc-500 hover:text-zinc-300"
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
                        {/* Mode Selector */}
                        <div className="flex p-1 rounded-xl bg-zinc-950 border border-white/5">
                            <button
                                onClick={() => setMode("exclusive")}
                                className={cn(
                                    "flex-1 py-3 rounded-lg text-sm font-bold transition-all",
                                    mode === "exclusive" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-zinc-500 hover:text-zinc-300"
                                )}
                            >
                                GST Exclusive
                                <span className="block text-[10px] font-normal opacity-70">Add GST to Amount</span>
                            </button>
                            <button
                                onClick={() => setMode("inclusive")}
                                className={cn(
                                    "flex-1 py-3 rounded-lg text-sm font-bold transition-all",
                                    mode === "inclusive" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-zinc-500 hover:text-zinc-300"
                                )}
                            >
                                GST Inclusive
                                <span className="block text-[10px] font-normal opacity-70">Remove GST from Amount</span>
                            </button>
                        </div>

                        {/* Amount Input */}
                        <div className="space-y-4">
                            <label className="text-zinc-300 font-bold flex items-center gap-2 text-sm">
                                <DollarSign size={16} className="text-blue-400" />
                                {mode === "exclusive" ? "Net Amount" : "Total Amount"}
                            </label>
                            <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-3">
                                <span className="text-zinc-500 font-mono">{getSymbol()}</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="bg-transparent border-none focus:ring-0 text-blue-400 font-mono font-bold w-full text-lg p-0"
                                />
                            </div>
                        </div>

                        {/* GST Rate Selector */}
                        <div className="space-y-4">
                            <label className="text-zinc-300 font-bold flex items-center gap-2 text-sm">
                                <Percent size={16} className="text-emerald-400" />
                                GST Rate
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {[5, 12, 18, 28].map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setGstRate(r)}
                                        className={cn(
                                            "py-2 rounded-lg text-sm font-bold border transition-all",
                                            gstRate === r
                                                ? "bg-emerald-500 text-white border-emerald-500"
                                                : "bg-zinc-950/50 border-white/5 text-zinc-500 hover:bg-white/5"
                                        )}
                                    >
                                        {r}%
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-2">
                                <span className="text-zinc-500 text-xs">Custom Rate:</span>
                                <input
                                    type="number"
                                    value={gstRate}
                                    onChange={(e) => setGstRate(Number(e.target.value))}
                                    className="bg-transparent border-none focus:ring-0 text-emerald-400 font-mono font-bold w-full text-sm p-0"
                                />
                                <span className="text-zinc-500 font-mono">%</span>
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
                    <div className="glass-card p-8 border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="relative z-10 text-center space-y-2">
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Total Amount</p>
                            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                                {formatCurrency(totalAmount)}
                            </h2>
                            <p className="text-indigo-400 text-sm font-medium">
                                {mode === "exclusive" ? "Inclusive of GST" : "Original Price was lower"}
                            </p>
                        </div>
                    </div>

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 space-y-6">
                            <h3 className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                                <Receipt size={16} />
                                Bill Breakdown
                            </h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">Net Amount</span>
                                        <span className="text-white font-bold">{formatCurrency(netAmount)}</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500" style={{ width: `${(netAmount / totalAmount) * 100}%` }} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-400">GST ({gstRate}%)</span>
                                        <span className="text-indigo-400 font-bold">{formatCurrency(gstAmount)}</span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500" style={{ width: `${(gstAmount / totalAmount) * 100}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 flex flex-col justify-center gap-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                    <Calculator size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">CGST & SGST</h4>
                                    <p className="text-zinc-400 text-xs mt-1">
                                        For intra-state transactions, GST is split equally:
                                        <br />
                                        CGST: {formatCurrency(gstAmount / 2)} ({gstRate / 2}%)
                                        <br />
                                        SGST: {formatCurrency(gstAmount / 2)} ({gstRate / 2}%)
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
