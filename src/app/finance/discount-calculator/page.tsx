"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { TrendingUp, DollarSign, ArrowRight, RotateCcw, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function DiscountCalculator() {
    const [originalPrice, setOriginalPrice] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [result, setResult] = useState<{
        discountAmount: number;
        finalPrice: number;
    } | null>(null);

    const calculate = () => {
        const price = parseFloat(originalPrice);
        const discount = parseFloat(discountPercentage);

        if (isNaN(price) || isNaN(discount)) return;

        const discountAmount = (price * discount) / 100;
        const finalPrice = price - discountAmount;

        setResult({
            discountAmount,
            finalPrice
        });
    };

    const reset = () => {
        setOriginalPrice("");
        setDiscountPercentage("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Discount <span className="text-rose-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate the final price after discount.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Original Price</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input
                                type="number"
                                value={originalPrice}
                                onChange={(e) => setOriginalPrice(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-rose-500/50 outline-none"
                                placeholder="1000"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Discount (%)</label>
                        <input
                            type="number"
                            value={discountPercentage}
                            onChange={(e) => setDiscountPercentage(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-rose-500/50 outline-none"
                            placeholder="20"
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={calculate}
                        className="flex-1 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2"
                    >
                        Calculate Price <ArrowRight size={20} />
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
                            <div className="text-sm font-medium text-zinc-400 uppercase tracking-wider">You Save</div>
                            <div className="text-3xl font-bold text-green-400 font-mono">
                                ${result.discountAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div>
                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 text-center space-y-2">
                            <div className="text-sm font-medium text-rose-400 uppercase tracking-wider">Final Price</div>
                            <div className="text-4xl font-black text-white font-mono">
                                ${result.finalPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
