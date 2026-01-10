"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Coins, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function SmokingCostCalculator() {
    const [cigarettesPerDay, setCigarettesPerDay] = useState<string>("");
    const [costPerCigarette, setCostPerCigarette] = useState<string>("");
    const [yearsSmoked, setYearsSmoked] = useState<string>("");

    const [monthlyCost, setMonthlyCost] = useState<number>(0);
    const [yearlyCost, setYearlyCost] = useState<number>(0);
    const [lifetimeCost, setLifetimeCost] = useState<number>(0);

    const calculateCost = () => {
        const cigs = parseFloat(cigarettesPerDay);
        const cost = parseFloat(costPerCigarette);
        const years = parseFloat(yearsSmoked);

        if (cigs > 0 && cost > 0) {
            const daily = cigs * cost;
            const monthly = daily * 30;
            const yearly = daily * 365;
            const lifetime = years > 0 ? yearly * years : 0;

            setMonthlyCost(monthly);
            setYearlyCost(yearly);
            setLifetimeCost(lifetime);
        } else {
            setMonthlyCost(0);
            setYearlyCost(0);
            setLifetimeCost(0);
        }
    };

    useEffect(() => {
        calculateCost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cigarettesPerDay, costPerCigarette, yearsSmoked]);

    const reset = () => {
        setCigarettesPerDay("");
        setCostPerCigarette("");
        setYearsSmoked("");
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/health" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Cost of Smoking Calculator</h1>
                    <p className="text-zinc-400">Calculate how much money you spend on smoking.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Cigarettes per Day</label>
                            <input
                                type="number"
                                value={cigarettesPerDay}
                                onChange={(e) => setCigarettesPerDay(e.target.value)}
                                placeholder="e.g. 20"
                                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Cost per Cigarette ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={costPerCigarette}
                                onChange={(e) => setCostPerCigarette(e.target.value)}
                                placeholder="e.g. 0.50"
                                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            />
                            <p className="text-xs text-zinc-500">Divide pack price by number of cigarettes in pack</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Years Smoked (optional)</label>
                            <input
                                type="number"
                                value={yearsSmoked}
                                onChange={(e) => setYearsSmoked(e.target.value)}
                                placeholder="e.g. 10"
                                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            />
                        </div>

                        <button
                            onClick={reset}
                            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
                        >
                            <RefreshCw size={14} />
                            Reset
                        </button>
                    </div>

                    <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/10">
                        <h3 className="text-red-400 font-semibold mb-2">Health Impact</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Beyond the financial cost, smoking significantly impacts your health, increasing risks of cancer, heart disease, and respiratory issues. Consider using these savings to invest in your health and future.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6 space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <Coins className="text-yellow-400" size={24} />
                            <h3 className="text-lg font-semibold text-zinc-100">Cost Breakdown</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Monthly</div>
                                <div className="text-2xl font-bold text-zinc-100">
                                    {monthlyCost > 0 ? formatCurrency(monthlyCost) : "$0"}
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Yearly</div>
                                <div className="text-2xl font-bold text-zinc-100">
                                    {yearlyCost > 0 ? formatCurrency(yearlyCost) : "$0"}
                                </div>
                            </div>

                            {lifetimeCost > 0 && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                    <div className="text-xs text-red-400 uppercase tracking-wider mb-1">Lifetime Total</div>
                                    <div className="text-3xl font-bold text-red-400">
                                        {formatCurrency(lifetimeCost)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                        <p className="text-xs text-zinc-500 italic">
                            For informational purposes only. Costs are estimates based on your inputs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
