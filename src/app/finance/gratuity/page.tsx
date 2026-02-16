"use client";

import { useState, useMemo } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Coins,
    DollarSign,
    IndianRupee,
    Calendar,
    Briefcase,
    Info
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function GratuityCalculatorPage() {
    // --- State ---
    const [basicSalary, setBasicSalary] = useState<number>(50000); // Basic + DA
    const [years, setYears] = useState<number>(5);

    // --- Helpers ---
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(val);
    };

    // --- Calculations ---
    const { gratuityAmount, isEligible } = useMemo(() => {
        // Formula: (15 * Last Drawn Salary * Tenure) / 26
        const amount = (15 * basicSalary * years) / 26;

        // Max limit is 20 Lakhs (as of recent amendments, though often capped at 20L tax free)
        // We will show actual calculation but warn about tax limit if needed

        return {
            gratuityAmount: Math.round(amount),
            isEligible: years >= 5
        };
    }, [basicSalary, years]);

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
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Gratuity Calculator</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Calculate your end-of-service gratuity benefit.</m.p>
                    </div>
                </div>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Controls Panel */}
                <m.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-5 space-y-6"
                >
                    <div className="glass-card p-8 space-y-8">
                        {/* Basic Salary */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <DollarSign size={16} className="text-blue-400" />
                                    Monthly Basic Salary + DA
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <span className="text-zinc-500 font-mono">₹</span>
                                    <input
                                        type="number"
                                        value={basicSalary}
                                        onChange={(e) => setBasicSalary(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-blue-400 font-mono font-bold w-28 text-right p-0"
                                    />
                                </div>
                            </div>
                            <input
                                type="range" min="10000" max="500000" step="1000"
                                value={basicSalary} onChange={(e) => setBasicSalary(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        {/* Years of Service */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <Calendar size={16} className="text-purple-400" />
                                    Years of Service
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <input
                                        type="number"
                                        value={years}
                                        onChange={(e) => setYears(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-purple-400 font-mono font-bold w-12 text-right p-0"
                                    />
                                    <span className="text-zinc-500 font-mono">Yr</span>
                                </div>
                            </div>
                            <input
                                type="range" min="1" max="50" step="1"
                                value={years} onChange={(e) => setYears(Number(e.target.value))}
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
                    <div className={cn(
                        "glass-card p-8 relative overflow-hidden",
                        isEligible ? "border-yellow-500/20 bg-yellow-500/5" : "border-red-500/20 bg-red-500/5"
                    )}>
                        <div className={cn(
                            "absolute top-0 right-0 p-32 blur-[100px] rounded-full pointer-events-none",
                            isEligible ? "bg-yellow-500/10" : "bg-red-500/10"
                        )} />
                        <div className="relative z-10 text-center space-y-2">
                            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest">Gratuity Payable</p>
                            <h2 className={cn(
                                "text-5xl md:text-6xl font-black tracking-tight",
                                isEligible ? "text-white" : "text-zinc-500"
                            )}>
                                {isEligible ? formatCurrency(gratuityAmount) : "Not Eligible"}
                            </h2>
                            {!isEligible && (
                                <p className="text-red-400 text-sm font-medium">
                                    Minimum 5 years of service required.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="glass-card p-6 space-y-6">
                            <h3 className="text-sm font-bold text-zinc-400 flex items-center gap-2">
                                <Briefcase size={16} />
                                Calculation Rules
                            </h3>
                            <div className="space-y-4 text-sm text-zinc-400">
                                <p>Gratuity = (15 × Last Drawn Salary × Tenure) / 26</p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>15 days salary for every completed year</li>
                                    <li>Month considered as 26 working days</li>
                                    <li>Salary = Basic + DA</li>
                                </ul>
                            </div>
                        </div>

                        <div className="glass-card p-6 flex flex-col justify-center gap-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                    <Info size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Tax Exemption</h4>
                                    <p className="text-zinc-400 text-xs mt-1">
                                        Gratuity received up to ₹20 Lakhs is tax-free for government and non-government employees covered under the Gratuity Act.
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
