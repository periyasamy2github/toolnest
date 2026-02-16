"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function SalesTaxCalculator() {
    const [amount, setAmount] = useState("");
    const [taxRate, setTaxRate] = useState("");
    const [result, setResult] = useState<{
        taxAmount: number;
        totalAmount: number;
    } | null>(null);

    const calculate = () => {
        const amt = parseFloat(amount);
        const rate = parseFloat(taxRate);

        if (isNaN(amt) || isNaN(rate)) return;

        const taxAmount = (amt * rate) / 100;
        const totalAmount = amt + taxAmount;

        setResult({
            taxAmount,
            totalAmount
        });
    };

    const reset = () => {
        setAmount("");
        setTaxRate("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Sales Tax <span className="text-violet-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate Sales Tax and Total Amount.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Net Amount</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-violet-500/50 outline-none"
                                placeholder="100"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Tax Rate (%)</label>
                        <input
                            type="number"
                            value={taxRate}
                            onChange={(e) => setTaxRate(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-violet-500/50 outline-none"
                            placeholder="8.25"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-violet-500 hover:bg-violet-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate Tax <ArrowRight size={20} />
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
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Tax Amount</div>
                            <div className="text-3xl font-bold text-red-400 font-mono">
                                ${result.taxAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div>
                        <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-violet-400 uppercase tracking-wider">Total Amount</div>
                            <div className="text-4xl font-black text-white font-mono">
                                ${result.totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
