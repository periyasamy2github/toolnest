"use client";

import { useState, useMemo } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    PieChart,
    DollarSign,
    IndianRupee,
    Plus,
    Trash2,
    TrendingUp,
    TrendingDown,
    Wallet,
    Building,
    CreditCard,
    Car
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

// --- Types ---
type Currency = "INR" | "USD";
type Item = {
    id: string;
    name: string;
    value: number;
    icon: any;
};

export default function NetWorthPage() {
    // --- State ---
    const [currency, setCurrency] = useState<Currency>("INR");

    const [assets, setAssets] = useState<Item[]>([
        { id: "1", name: "Cash & Bank", value: 500000, icon: Wallet },
        { id: "2", name: "Investments", value: 1500000, icon: TrendingUp },
        { id: "3", name: "Real Estate", value: 5000000, icon: Building },
    ]);

    const [liabilities, setLiabilities] = useState<Item[]>([
        { id: "1", name: "Home Loan", value: 3000000, icon: Building },
        { id: "2", name: "Car Loan", value: 500000, icon: Car },
        { id: "3", name: "Credit Card", value: 50000, icon: CreditCard },
    ]);

    // --- Helpers ---
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
            style: "currency",
            currency: currency,
            maximumFractionDigits: 0,
        }).format(val);
    };

    const addItem = (type: "asset" | "liability") => {
        const newItem: Item = {
            id: Math.random().toString(36).substr(2, 9),
            name: type === "asset" ? "New Asset" : "New Liability",
            value: 0,
            icon: type === "asset" ? Wallet : CreditCard
        };
        if (type === "asset") setAssets([...assets, newItem]);
        else setLiabilities([...liabilities, newItem]);
    };

    const updateItem = (type: "asset" | "liability", id: string, field: "name" | "value", val: string | number) => {
        const list = type === "asset" ? assets : liabilities;
        const setList = type === "asset" ? setAssets : setLiabilities;

        setList(list.map(item => item.id === id ? { ...item, [field]: val } : item));
    };

    const deleteItem = (type: "asset" | "liability", id: string) => {
        if (type === "asset") setAssets(assets.filter(i => i.id !== id));
        else setLiabilities(liabilities.filter(i => i.id !== id));
    };

    // --- Calculations ---
    const { totalAssets, totalLiabilities, netWorth } = useMemo(() => {
        const tAssets = assets.reduce((acc, curr) => acc + curr.value, 0);
        const tLiabilities = liabilities.reduce((acc, curr) => acc + curr.value, 0);
        return {
            totalAssets: tAssets,
            totalLiabilities: tLiabilities,
            netWorth: tAssets - tLiabilities
        };
    }, [assets, liabilities]);

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
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Net Worth Tracker</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Know where you stand financially. Track assets vs liabilities.</m.p>
                    </div>
                </div>

                {/* Currency Toggle */}
                <m.div variants={fadeInUp} className="flex p-1 rounded-xl bg-zinc-900 border border-white/5 self-start md:self-center">
                    <button
                        onClick={() => setCurrency("INR")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "INR" ? "bg-green-600 text-white shadow-lg shadow-green-600/20" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <IndianRupee size={16} />
                        INR
                    </button>
                    <button
                        onClick={() => setCurrency("USD")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            currency === "USD" ? "bg-green-600 text-white shadow-lg shadow-green-600/20" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        <DollarSign size={16} />
                        USD
                    </button>
                </m.div>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Controls Panel - Assets & Liabilities */}
                <m.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-7 space-y-8"
                >
                    {/* Assets Section */}
                    <div className="glass-card p-6 space-y-6 border-emerald-500/20">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                                <TrendingUp size={20} />
                                Assets (What you own)
                            </h3>
                            <button onClick={() => addItem("asset")} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <AnimatePresence>
                                {assets.map((item) => (
                                    <m.div
                                        key={item.id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-3 bg-zinc-950/30 p-3 rounded-xl border border-white/5"
                                    >
                                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                            <item.icon size={16} />
                                        </div>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => updateItem("asset", item.id, "name", e.target.value)}
                                            className="bg-transparent border-none focus:ring-0 text-zinc-300 font-medium flex-grow min-w-0"
                                            placeholder="Asset Name"
                                        />
                                        <input
                                            type="number"
                                            value={item.value}
                                            onChange={(e) => updateItem("asset", item.id, "value", Number(e.target.value))}
                                            className="bg-transparent border-none focus:ring-0 text-white font-mono font-bold w-28 text-right"
                                            placeholder="Value"
                                        />
                                        <button onClick={() => deleteItem("asset", item.id)} className="text-zinc-600 hover:text-red-400 transition-colors p-1">
                                            <Trash2 size={16} />
                                        </button>
                                    </m.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-white/5">
                            <span className="text-zinc-400 font-bold">Total Assets</span>
                            <span className="text-emerald-400 font-black text-xl">{formatCurrency(totalAssets)}</span>
                        </div>
                    </div>

                    {/* Liabilities Section */}
                    <div className="glass-card p-6 space-y-6 border-red-500/20">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-red-400 flex items-center gap-2">
                                <TrendingDown size={20} />
                                Liabilities (What you owe)
                            </h3>
                            <button onClick={() => addItem("liability")} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <AnimatePresence>
                                {liabilities.map((item) => (
                                    <m.div
                                        key={item.id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-3 bg-zinc-950/30 p-3 rounded-xl border border-white/5"
                                    >
                                        <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                                            <item.icon size={16} />
                                        </div>
                                        <input
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => updateItem("liability", item.id, "name", e.target.value)}
                                            className="bg-transparent border-none focus:ring-0 text-zinc-300 font-medium flex-grow min-w-0"
                                            placeholder="Liability Name"
                                        />
                                        <input
                                            type="number"
                                            value={item.value}
                                            onChange={(e) => updateItem("liability", item.id, "value", Number(e.target.value))}
                                            className="bg-transparent border-none focus:ring-0 text-white font-mono font-bold w-28 text-right"
                                            placeholder="Value"
                                        />
                                        <button onClick={() => deleteItem("liability", item.id)} className="text-zinc-600 hover:text-red-400 transition-colors p-1">
                                            <Trash2 size={16} />
                                        </button>
                                    </m.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-white/5">
                            <span className="text-zinc-400 font-bold">Total Liabilities</span>
                            <span className="text-red-400 font-black text-xl">{formatCurrency(totalLiabilities)}</span>
                        </div>
                    </div>
                </m.div>

                {/* Results Panel */}
                <m.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-5 space-y-6"
                >
                    {/* Net Worth Card */}
                    <div className={cn(
                        "glass-card p-8 relative overflow-hidden",
                        netWorth >= 0 ? "border-green-500/20 bg-green-500/5" : "border-red-500/20 bg-red-500/5"
                    )}>
                        <div className={cn(
                            "absolute top-0 right-0 p-32 blur-[100px] rounded-full pointer-events-none",
                            netWorth >= 0 ? "bg-green-500/10" : "bg-red-500/10"
                        )} />
                        <div className="relative z-10 text-center space-y-2">
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Your Net Worth</p>
                            <h2 className={cn(
                                "text-5xl md:text-6xl font-black tracking-tight",
                                netWorth >= 0 ? "text-white" : "text-red-400"
                            )}>
                                {formatCurrency(netWorth)}
                            </h2>
                            <p className={cn(
                                "text-sm font-medium",
                                netWorth >= 0 ? "text-green-400" : "text-red-400"
                            )}>
                                {netWorth >= 0 ? "You are financially positive!" : "You have more debt than assets."}
                            </p>
                        </div>
                    </div>

                    {/* Breakdown Chart */}
                    <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[300px]">
                        <h3 className="text-sm font-bold text-zinc-400 mb-6 flex items-center gap-2 self-start">
                            <PieChart size={16} />
                            Wealth Composition
                        </h3>

                        <div className="relative w-56 h-56 rounded-full border-8 border-zinc-800 flex items-center justify-center">
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: `conic-gradient(#ef4444 ${(totalLiabilities / (totalAssets + totalLiabilities)) * 100}%, #10b981 ${(totalLiabilities / (totalAssets + totalLiabilities)) * 100}% 100%)`,
                                    maskImage: 'radial-gradient(transparent 60%, black 61%)',
                                    WebkitMaskImage: 'radial-gradient(transparent 60%, black 61%)'
                                }}
                            />
                            <div className="text-center z-10 space-y-1">
                                <div className="text-xs text-zinc-500 font-bold">Debt Ratio</div>
                                <div className="text-2xl font-black text-white">
                                    {Math.round((totalLiabilities / (totalAssets || 1)) * 100)}%
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-8 mt-8 w-full justify-center">
                            <div className="flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                    <div className="text-xs font-bold text-zinc-400">Assets</div>
                                </div>
                                <span className="text-emerald-400 font-bold text-sm">{Math.round((totalAssets / (totalAssets + totalLiabilities || 1)) * 100)}%</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="text-xs font-bold text-zinc-400">Liabilities</div>
                                </div>
                                <span className="text-red-400 font-bold text-sm">{Math.round((totalLiabilities / (totalAssets + totalLiabilities || 1)) * 100)}%</span>
                            </div>
                        </div>
                    </div>
                </m.div>
            </div>
        </div>
    );
}
