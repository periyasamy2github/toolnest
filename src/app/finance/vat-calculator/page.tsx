"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VATCalculator() {
    const [amount, setAmount] = useState("");
    const [vatRate, setVatRate] = useState("");
    const [isInclusive, setIsInclusive] = useState(false);
    const [result, setResult] = useState<{
        netAmount: number;
        vatAmount: number;
        grossAmount: number;
    } | null>(null);

    const calculate = () => {
        const amt = parseFloat(amount);
        const rate = parseFloat(vatRate);

        if (isNaN(amt) || isNaN(rate)) return;

        let netAmount, vatAmount, grossAmount;

        if (isInclusive) {
            grossAmount = amt;
            netAmount = amt / (1 + rate / 100);
            vatAmount = grossAmount - netAmount;
        } else {
            netAmount = amt;
            vatAmount = amt * (rate / 100);
            grossAmount = netAmount + vatAmount;
        }

        setResult({
            netAmount,
            vatAmount,
            grossAmount
        });
    };

    const reset = () => {
        setAmount("");
        setVatRate("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    VAT <span className="text-fuchsia-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate Value Added Tax (Inclusive or Exclusive).
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setIsInclusive(false)}
                        className={cn(
                            "px-6 py-2 rounded-full font-medium transition-all",
                            !isInclusive
                                ? "bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20"
                                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        )}
                    >
                        Exclusive of VAT
                    </button>
                    <button
                        onClick={() => setIsInclusive(true)}
                        className={cn(
                            "px-6 py-2 rounded-full font-medium transition-all",
                            isInclusive
                                ? "bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20"
                                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                        )}
                    >
                        Inclusive of VAT
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Amount</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-fuchsia-500/50 outline-none"
                                placeholder="1000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">VAT Rate (%)</label>
                        <input
                            type="number"
                            value={vatRate}
                            onChange={(e) => setVatRate(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-fuchsia-500/50 outline-none"
                            placeholder="20"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-fuchsia-500 hover:bg-fuchsia-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-fuchsia-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate VAT <ArrowRight size={20} />
                    </button>
                    <button
                        onClick={reset}
                        className="px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-colors"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>

                {result && (
                    <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom duration-500">
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Net Amount</div>
                            <div className="text-3xl font-bold text-white font-mono">
                                ${result.netAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div>
                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">VAT Amount</div>
                            <div className="text-3xl font-bold text-red-400 font-mono">
                                ${result.vatAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div>
                        <div className="bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-fuchsia-400 uppercase tracking-wider">Gross Amount</div>
                            <div className="text-4xl font-black text-white font-mono">
                                ${result.grossAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
