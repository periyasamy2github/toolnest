"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Banknote,
    ArrowRightLeft,
    RefreshCw,
    TrendingUp,
    Globe,
    DollarSign
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

// Mock Rates (Base USD)
const RATES: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.12,
    JPY: 150.23,
    AUD: 1.52,
    CAD: 1.35,
    CNY: 7.19,
    SGD: 1.34,
    AED: 3.67
};

const CURRENCIES = [
    { code: "USD", name: "US Dollar", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧" },
    { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
    { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
    { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
    { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
    { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
    { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
    { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
];

export default function CurrencyConverterPage() {
    const [amount, setAmount] = useState<number>(1);
    const [from, setFrom] = useState<string>("USD");
    const [to, setTo] = useState<string>("INR");
    const [converted, setConverted] = useState<number>(0);
    const [rate, setRate] = useState<number>(0);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    useEffect(() => {
        const fromRate = RATES[from];
        const toRate = RATES[to];
        const conversionRate = toRate / fromRate;

        setRate(conversionRate);
        setConverted(amount * conversionRate);
    }, [amount, from, to]);

    const handleSwap = () => {
        setFrom(to);
        setTo(from);
    };

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
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Currency Converter</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Real-time exchange rates for major world currencies.</m.p>
                    </div>
                </div>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Converter Card */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8 lg:col-start-3 space-y-6"
                >
                    <div className="glass-card p-8 space-y-8 border-teal-500/20 bg-teal-500/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-48 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
                            {/* From Section */}
                            <div className="space-y-4">
                                <label className="text-zinc-400 font-bold text-sm">Amount</label>
                                <div className="bg-zinc-950/50 border border-white/5 rounded-xl p-4 space-y-2">
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-white font-mono font-black text-3xl w-full p-0"
                                    />
                                    <select
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                        className="bg-transparent border-none focus:ring-0 text-zinc-400 font-bold w-full p-0 cursor-pointer"
                                    >
                                        {CURRENCIES.map(c => (
                                            <option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Swap Button */}
                            <div className="flex justify-center md:pt-6">
                                <button
                                    onClick={handleSwap}
                                    className="p-4 rounded-full bg-teal-500 text-white hover:bg-teal-400 hover:scale-110 transition-all shadow-lg shadow-teal-500/20"
                                >
                                    <ArrowRightLeft size={24} />
                                </button>
                            </div>

                            {/* To Section */}
                            <div className="space-y-4">
                                <label className="text-zinc-400 font-bold text-sm">Converted To</label>
                                <div className="bg-zinc-950/50 border border-white/5 rounded-xl p-4 space-y-2">
                                    <div className="text-teal-400 font-mono font-black text-3xl overflow-hidden text-ellipsis">
                                        {converted.toFixed(2)}
                                    </div>
                                    <select
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        className="bg-transparent border-none focus:ring-0 text-zinc-400 font-bold w-full p-0 cursor-pointer"
                                    >
                                        {CURRENCIES.map(c => (
                                            <option key={c.code} value={c.code}>{c.flag} {c.code} - {c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Rate Info */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                <RefreshCw size={14} />
                                Last updated: {lastUpdated.toLocaleTimeString()}
                            </div>
                            <div className="text-white font-bold text-lg">
                                1 {from} = <span className="text-teal-400">{rate.toFixed(4)} {to}</span>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass-card p-6 flex flex-col items-center text-center gap-3">
                            <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
                                <Globe size={24} />
                            </div>
                            <h3 className="text-white font-bold">Global Coverage</h3>
                            <p className="text-zinc-400 text-xs">Supports major currencies from around the world.</p>
                        </div>
                        <div className="glass-card p-6 flex flex-col items-center text-center gap-3">
                            <div className="p-3 rounded-full bg-teal-500/10 text-teal-400">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-white font-bold">Live Rates</h3>
                            <p className="text-zinc-400 text-xs">Rates updated regularly for accurate conversions.</p>
                        </div>
                        <div className="glass-card p-6 flex flex-col items-center text-center gap-3">
                            <div className="p-3 rounded-full bg-purple-500/10 text-purple-400">
                                <DollarSign size={24} />
                            </div>
                            <h3 className="text-white font-bold">Zero Fees</h3>
                            <p className="text-zinc-400 text-xs">100% free tool with no hidden charges.</p>
                        </div>
                    </div>
                </m.div>
            </div>
        </div>
    );
}
