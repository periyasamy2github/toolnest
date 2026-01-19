"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HRACalculator() {
    const [basicSalary, setBasicSalary] = useState("");
    const [da, setDa] = useState("");
    const [hraReceived, setHraReceived] = useState("");
    const [rentPaid, setRentPaid] = useState("");
    const [isMetro, setIsMetro] = useState(true);
    const [result, setResult] = useState<{
        exemptedHra: number;
        taxableHra: number;
    } | null>(null);

    const calculate = () => {
        const basic = parseFloat(basicSalary);
        const dearnessAllowance = parseFloat(da) || 0;
        const hra = parseFloat(hraReceived);
        const rent = parseFloat(rentPaid);

        if (isNaN(basic) || isNaN(hra) || isNaN(rent)) return;

        const salary = basic + dearnessAllowance;

        // HRA Exemption is minimum of:
        // 1. Actual HRA Received
        // 2. 50% of Salary (Metro) or 40% of Salary (Non-Metro)
        // 3. Rent Paid - 10% of Salary

        const condition1 = hra;
        const condition2 = salary * (isMetro ? 0.5 : 0.4);
        const condition3 = rent - (salary * 0.1);

        const exemptedHra = Math.max(0, Math.min(condition1, condition2, condition3));
        const taxableHra = hra - exemptedHra;

        setResult({
            exemptedHra,
            taxableHra
        });
    };

    const reset = () => {
        setBasicSalary("");
        setDa("");
        setHraReceived("");
        setRentPaid("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    HRA <span className="text-lime-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate your House Rent Allowance exemption.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setIsMetro(true)}
                        className={cn(
                            "px-6 py-2 rounded-full font-medium transition-all",
                            isMetro
                                ? "bg-lime-500 text-zinc-900 shadow-lg shadow-lime-500/20"
                                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        )}
                    >
                        Metro City
                    </button>
                    <button
                        onClick={() => setIsMetro(false)}
                        className={cn(
                            "px-6 py-2 rounded-full font-medium transition-all",
                            !isMetro
                                ? "bg-lime-500 text-zinc-900 shadow-lg shadow-lime-500/20"
                                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        )}
                    >
                        Non-Metro City
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Basic Salary (Yearly)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={basicSalary}
                                onChange={(e) => setBasicSalary(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-lime-500/50 outline-none"
                                placeholder="500000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">DA (Yearly)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={da}
                                onChange={(e) => setDa(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-lime-500/50 outline-none"
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">HRA Received (Yearly)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={hraReceived}
                                onChange={(e) => setHraReceived(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-lime-500/50 outline-none"
                                placeholder="200000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Rent Paid (Yearly)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={rentPaid}
                                onChange={(e) => setRentPaid(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-lime-500/50 outline-none"
                                placeholder="180000"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-lime-500 hover:bg-lime-600 text-zinc-900 rounded-xl transition-colors font-bold shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate Exemption <ArrowRight size={20} />
                    </button>
                    <button
                        onClick={reset}
                        className="px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-colors"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>

                {result && (
                    <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom duration-500">
                        <div className="bg-lime-500/10 border border-lime-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-lime-400 uppercase tracking-wider">Exempted HRA</div>
                            <div className="text-4xl font-black text-white font-mono">
                                ${result.exemptedHra.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Taxable HRA</div>
                            <div className="text-4xl font-black text-red-400 font-mono">
                                ${result.taxableHra.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
