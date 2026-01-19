"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Calculator, BarChart3, RefreshCcw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatisticsCalculator() {
    const [input, setInput] = useState("");
    const [stats, setStats] = useState<{
        count: number;
        sum: number;
        mean: number;
        median: number;
        mode: number[];
        range: number;
        min: number;
        max: number;
        variance: number;
        stdDev: number;
    } | null>(null);

    const calculate = () => {
        // Parse input
        const numbers = input
            .split(/[\s,]+/)
            .map(n => parseFloat(n))
            .filter(n => !isNaN(n))
            .sort((a, b) => a - b);

        if (numbers.length === 0) return;

        const count = numbers.length;
        const sum = numbers.reduce((a, b) => a + b, 0);
        const mean = sum / count;
        const min = numbers[0];
        const max = numbers[count - 1];
        const range = max - min;

        // Median
        let median = 0;
        if (count % 2 === 0) {
            median = (numbers[count / 2 - 1] + numbers[count / 2]) / 2;
        } else {
            median = numbers[Math.floor(count / 2)];
        }

        // Mode
        const frequency: Record<number, number> = {};
        let maxFreq = 0;
        numbers.forEach(n => {
            frequency[n] = (frequency[n] || 0) + 1;
            if (frequency[n] > maxFreq) maxFreq = frequency[n];
        });
        const mode = Object.keys(frequency)
            .map(n => parseFloat(n))
            .filter(n => frequency[n] === maxFreq && maxFreq > 1);

        // Variance & SD
        const variance = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / count;
        const stdDev = Math.sqrt(variance);

        setStats({
            count,
            sum,
            mean,
            median,
            mode,
            range,
            min,
            max,
            variance,
            stdDev
        });
    };

    const reset = () => {
        setInput("");
        setStats(null);
    };

    const StatCard = ({ label, value, sub }: { label: string; value: string | number; sub?: string }) => (
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 text-center hover:border-blue-500/30 transition-colors">
            <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{label}</div>
            <div className="text-2xl font-bold text-white font-mono truncate" title={value.toString()}>
                {typeof value === "number" ? Number.isInteger(value) ? value : value.toFixed(4) : value}
            </div>
            {sub && <div className="text-xs text-zinc-600 mt-1">{sub}</div>}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Statistics <span className="text-blue-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate Mean, Median, Mode, Standard Deviation, and more.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                        <BarChart3 size={16} /> Data Set
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full h-32 bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none font-mono resize-none"
                        placeholder="Enter numbers separated by commas or spaces (e.g., 10, 20, 30, 40, 50)"
                    />
                    <div className="flex gap-4">
                        <button
                            onClick={calculate}
                            disabled={!input}
                            className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                        >
                            Calculate Stats <ArrowRight size={20} />
                        </button>
                        <button
                            onClick={reset}
                            className="px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-colors"
                        >
                            <RefreshCcw size={24} />
                        </button>
                    </div>
                </div>

                {stats && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard label="Count (N)" value={stats.count} />
                            <StatCard label="Sum (Σx)" value={stats.sum} />
                            <StatCard label="Minimum" value={stats.min} />
                            <StatCard label="Maximum" value={stats.max} />
                        </div>

                        <div className="h-px bg-white/10" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 text-center space-y-2">
                                <div className="text-sm font-medium text-blue-400 uppercase tracking-wider">Mean (Average)</div>
                                <div className="text-4xl font-black text-white font-mono">
                                    {Number.isInteger(stats.mean) ? stats.mean : stats.mean.toFixed(4)}
                                </div>
                            </div>
                            <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 text-center space-y-2">
                                <div className="text-sm font-medium text-purple-400 uppercase tracking-wider">Median</div>
                                <div className="text-4xl font-black text-white font-mono">
                                    {Number.isInteger(stats.median) ? stats.median : stats.median.toFixed(4)}
                                </div>
                            </div>
                            <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-6 text-center space-y-2">
                                <div className="text-sm font-medium text-pink-400 uppercase tracking-wider">Mode</div>
                                <div className="text-4xl font-black text-white font-mono">
                                    {stats.mode.length > 0 ? stats.mode.join(", ") : "None"}
                                </div>
                                {stats.mode.length > 0 && <div className="text-xs text-pink-400/70">Most frequent</div>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <StatCard label="Range" value={stats.range} sub="Max - Min" />
                            <StatCard label="Variance (σ²)" value={stats.variance} sub="Population" />
                            <StatCard label="Std Deviation (σ)" value={stats.stdDev} sub="Population" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
