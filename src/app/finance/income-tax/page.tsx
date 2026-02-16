"use client";

import { useState, useMemo } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Receipt,
    DollarSign,
    IndianRupee,
    Calculator,
    CheckCircle2,
    XCircle,
    Info,
    Landmark
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function IncomeTaxPage() {
    // --- State ---
    const [income, setIncome] = useState<number>(1200000);
    const [deductions, setDeductions] = useState<number>(150000); // 80C, etc.
    const [hraExemption, setHraExemption] = useState<number>(0);
    const [otherDeductions, setOtherDeductions] = useState<number>(50000); // Standard Deduction

    // --- Helpers ---
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(val);
    };

    // --- Calculations ---
    const calculateTax = (taxableIncome: number, regime: "old" | "new") => {
        let tax = 0;

        if (regime === "new") {
            // New Regime Slabs (FY 2024-25 proposed/assumed for demo)
            // 0-3L: 0, 3-6L: 5%, 6-9L: 10%, 9-12L: 15%, 12-15L: 20%, >15L: 30%
            if (taxableIncome > 1500000) tax += (taxableIncome - 1500000) * 0.30 + 150000;
            else if (taxableIncome > 1200000) tax += (taxableIncome - 1200000) * 0.20 + 90000;
            else if (taxableIncome > 900000) tax += (taxableIncome - 900000) * 0.15 + 45000;
            else if (taxableIncome > 600000) tax += (taxableIncome - 600000) * 0.10 + 15000;
            else if (taxableIncome > 300000) tax += (taxableIncome - 300000) * 0.05;

            // Rebate u/s 87A for income up to 7L
            if (taxableIncome <= 700000) tax = 0;
        } else {
            // Old Regime Slabs
            // 0-2.5L: 0, 2.5-5L: 5%, 5-10L: 20%, >10L: 30%
            if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.30 + 112500;
            else if (taxableIncome > 500000) tax += (taxableIncome - 500000) * 0.20 + 12500;
            else if (taxableIncome > 250000) tax += (taxableIncome - 250000) * 0.05;

            // Rebate u/s 87A for income up to 5L
            if (taxableIncome <= 500000) tax = 0;
        }

        // Cess 4%
        const cess = tax * 0.04;
        return tax + cess;
    };

    const { oldRegimeTax, newRegimeTax, taxSaved, bestRegime } = useMemo(() => {
        const taxableIncomeOld = Math.max(0, income - deductions - hraExemption - otherDeductions);
        const taxableIncomeNew = Math.max(0, income - 50000); // Only Standard Deduction in New Regime

        const oldTax = calculateTax(taxableIncomeOld, "old");
        const newTax = calculateTax(taxableIncomeNew, "new");

        let saved = 0;
        let best = "equal";

        if (oldTax < newTax) {
            saved = newTax - oldTax;
            best = "old";
        } else if (newTax < oldTax) {
            saved = oldTax - newTax;
            best = "new";
        }

        return {
            oldRegimeTax: Math.round(oldTax),
            newRegimeTax: Math.round(newTax),
            taxSaved: Math.round(saved),
            bestRegime: best
        };
    }, [income, deductions, hraExemption, otherDeductions]);

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
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Income Tax Calculator</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Compare Old vs New Tax Regime and save money.</m.p>
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
                        {/* Income Input */}
                        <div className="space-y-4">
                            <label className="text-zinc-300 font-bold flex items-center gap-2 text-sm">
                                <DollarSign size={16} className="text-blue-400" />
                                Annual Gross Income
                            </label>
                            <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-3">
                                <span className="text-zinc-500 font-mono">₹</span>
                                <input
                                    type="number"
                                    value={income}
                                    onChange={(e) => setIncome(Number(e.target.value))}
                                    className="bg-transparent border-none focus:ring-0 text-blue-400 font-mono font-bold w-full text-lg p-0"
                                />
                            </div>
                            <input
                                type="range" min="500000" max="5000000" step="50000"
                                value={income} onChange={(e) => setIncome(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <div className="w-full h-px bg-white/5" />
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Deductions (Old Regime Only)</p>

                        {/* 80C Deductions */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <Receipt size={16} className="text-emerald-400" />
                                    Section 80C (LIC, PPF, ELSS)
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <span className="text-zinc-500 font-mono">₹</span>
                                    <input
                                        type="number"
                                        value={deductions}
                                        onChange={(e) => setDeductions(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-emerald-400 font-mono font-bold w-24 text-right p-0"
                                    />
                                </div>
                            </div>
                            <input
                                type="range" min="0" max="150000" step="5000"
                                value={deductions} onChange={(e) => setDeductions(Number(e.target.value))}
                                className="w-full accent-emerald-500"
                            />
                        </div>

                        {/* HRA Exemption */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <Landmark size={16} className="text-purple-400" />
                                    HRA Exemption
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <span className="text-zinc-500 font-mono">₹</span>
                                    <input
                                        type="number"
                                        value={hraExemption}
                                        onChange={(e) => setHraExemption(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-purple-400 font-mono font-bold w-24 text-right p-0"
                                    />
                                </div>
                            </div>
                            <input
                                type="range" min="0" max="500000" step="5000"
                                value={hraExemption} onChange={(e) => setHraExemption(Number(e.target.value))}
                                className="w-full accent-purple-500"
                            />
                        </div>

                        {/* Other Deductions */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                    <Calculator size={16} className="text-amber-400" />
                                    Other Deductions (80D, etc)
                                </label>
                                <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 rounded-lg px-3 py-1.5">
                                    <span className="text-zinc-500 font-mono">₹</span>
                                    <input
                                        type="number"
                                        value={otherDeductions}
                                        onChange={(e) => setOtherDeductions(Number(e.target.value))}
                                        className="bg-transparent border-none focus:ring-0 text-amber-400 font-mono font-bold w-24 text-right p-0"
                                    />
                                </div>
                            </div>
                            <input
                                type="range" min="0" max="200000" step="5000"
                                value={otherDeductions} onChange={(e) => setOtherDeductions(Number(e.target.value))}
                                className="w-full accent-amber-500"
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
                    {/* Recommendation Card */}
                    <div className={cn(
                        "glass-card p-8 relative overflow-hidden border-2",
                        bestRegime === "old" ? "border-emerald-500/50 bg-emerald-500/5" :
                            bestRegime === "new" ? "border-blue-500/50 bg-blue-500/5" : "border-zinc-500/50"
                    )}>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-2 text-center md:text-left">
                                <div className="flex items-center gap-2 justify-center md:justify-start">
                                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">Recommendation</span>
                                </div>
                                <h2 className="text-3xl font-black text-white">
                                    {bestRegime === "old" ? "Choose Old Regime" : bestRegime === "new" ? "Choose New Regime" : "Both are Equal"}
                                </h2>
                                {bestRegime !== "equal" && (
                                    <p className="text-zinc-300">
                                        You save <span className="text-emerald-400 font-bold text-xl">{formatCurrency(taxSaved)}</span> by choosing the {bestRegime} regime.
                                    </p>
                                )}
                            </div>
                            <div className="p-4 rounded-full bg-white/5 border border-white/10">
                                {bestRegime === "old" ? <CheckCircle2 size={48} className="text-emerald-500" /> :
                                    bestRegime === "new" ? <CheckCircle2 size={48} className="text-blue-500" /> : <Info size={48} className="text-zinc-500" />}
                            </div>
                        </div>
                    </div>

                    {/* Comparison Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Old Regime Card */}
                        <div className={cn(
                            "glass-card p-6 space-y-6 transition-all duration-500",
                            bestRegime === "old" ? "ring-2 ring-emerald-500/50 scale-[1.02]" : "opacity-80 hover:opacity-100"
                        )}>
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-bold text-white">Old Regime</h3>
                                {bestRegime === "old" && <CheckCircle2 className="text-emerald-500" />}
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Total Deductions</span>
                                    <span className="text-zinc-300">{formatCurrency(deductions + hraExemption + otherDeductions)}</span>
                                </div>
                                <div className="w-full h-px bg-white/5" />
                                <div className="flex justify-between items-end">
                                    <span className="text-zinc-400 text-sm">Tax Payable</span>
                                    <span className="text-2xl font-bold text-white">{formatCurrency(oldRegimeTax)}</span>
                                </div>
                            </div>
                        </div>

                        {/* New Regime Card */}
                        <div className={cn(
                            "glass-card p-6 space-y-6 transition-all duration-500",
                            bestRegime === "new" ? "ring-2 ring-blue-500/50 scale-[1.02]" : "opacity-80 hover:opacity-100"
                        )}>
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-bold text-white">New Regime</h3>
                                {bestRegime === "new" && <CheckCircle2 className="text-blue-500" />}
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Standard Deduction</span>
                                    <span className="text-zinc-300">{formatCurrency(50000)}</span>
                                </div>
                                <div className="w-full h-px bg-white/5" />
                                <div className="flex justify-between items-end">
                                    <span className="text-zinc-400 text-sm">Tax Payable</span>
                                    <span className="text-2xl font-bold text-white">{formatCurrency(newRegimeTax)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Note */}
                    <div className="glass-card p-6 flex gap-4 items-start">
                        <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                            <Info size={20} />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-white font-bold">Note</h4>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                The New Regime offers lower tax rates but disallows most deductions like 80C, HRA, etc. The Old Regime has higher rates but allows you to claim deductions to reduce taxable income.
                            </p>
                        </div>
                    </div>
                </m.div>
            </div>
        </div>
    );
}
