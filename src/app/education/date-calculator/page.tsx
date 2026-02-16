"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Calendar, ArrowRight, RotateCcw, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function DateCalculator() {
    const [mode, setMode] = useState<"diff" | "add">("diff");

    // Difference Mode State
    const [d1, setD1] = useState("");
    const [d2, setD2] = useState("");
    const [diffResult, setDiffResult] = useState<{
        years: number;
        months: number;
        days: number;
        totalDays: number;
    } | null>(null);

    // Add/Subtract Mode State
    const [startDate, setStartDate] = useState("");
    const [amount, setAmount] = useState("");
    const [unit, setUnit] = useState<"days" | "weeks" | "months" | "years">("days");
    const [op, setOp] = useState<"+" | "-">("+");
    const [addResult, setAddResult] = useState<string | null>(null);

    const calculateDiff = () => {
        if (!d1 || !d2) return;

        const start = new Date(d1);
        const end = new Date(d2);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Calculate Y/M/D
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        setDiffResult({ years, months, days, totalDays });
    };

    const calculateAdd = () => {
        if (!startDate || !amount) return;

        const date = new Date(startDate);
        const val = parseInt(amount) * (op === "+" ? 1 : -1);

        switch (unit) {
            case "days":
                date.setDate(date.getDate() + val);
                break;
            case "weeks":
                date.setDate(date.getDate() + val * 7);
                break;
            case "months":
                date.setMonth(date.getMonth() + val);
                break;
            case "years":
                date.setFullYear(date.getFullYear() + val);
                break;
        }

        setAddResult(date.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Date <span className="text-pink-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate duration between dates or add/subtract time from a date.
                </p>
            </div>

            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setMode("diff")}
                    className={cn(
                        "px-6 py-3 rounded-xl font-medium transition-colors",
                        mode === "diff"
                            ? "bg-pink-500 text-white"
                            : "bg-zinc-900 text-zinc-400 hover:text-white"
                    )}
                >
                    Date Difference
                </button>
                <button
                    onClick={() => setMode("add")}
                    className={cn(
                        "px-6 py-3 rounded-xl font-medium transition-colors",
                        mode === "add"
                            ? "bg-pink-500 text-white"
                            : "bg-zinc-900 text-zinc-400 hover:text-white"
                    )}
                >
                    Add / Subtract
                </button>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                {mode === "diff" ? (
                    <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Start Date</label>
                                <input
                                    type="date"
                                    value={d1}
                                    onChange={(e) => setD1(e.target.value)}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">End Date</label>
                                <input
                                    type="date"
                                    value={d2}
                                    onChange={(e) => setD2(e.target.value)}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
                                />
                            </div>
                        </div>

                        <button
                            onClick={calculateDiff}
                            className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-pink-500/20"
                        >
                            Calculate Difference
                        </button>

                        {diffResult && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom duration-500">
                                <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-white">{Math.abs(diffResult.years)}</div>
                                    <div className="text-xs text-pink-400 uppercase tracking-wider">Years</div>
                                </div>
                                <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-white">{Math.abs(diffResult.months)}</div>
                                    <div className="text-xs text-pink-400 uppercase tracking-wider">Months</div>
                                </div>
                                <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-white">{Math.abs(diffResult.days)}</div>
                                    <div className="text-xs text-pink-400 uppercase tracking-wider">Days</div>
                                </div>
                                <div className="bg-zinc-800 border border-white/10 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-white">{diffResult.totalDays}</div>
                                    <div className="text-xs text-zinc-400 uppercase tracking-wider">Total Days</div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
                                />
                            </div>

                            <div className="flex gap-2 bg-zinc-950 p-1 rounded-xl border border-white/10 mb-1">
                                <button
                                    onClick={() => setOp("+")}
                                    className={cn(
                                        "p-3 rounded-lg transition-colors",
                                        op === "+" ? "bg-pink-500 text-white" : "text-zinc-400 hover:text-white"
                                    )}
                                >
                                    <Plus size={20} />
                                </button>
                                <button
                                    onClick={() => setOp("-")}
                                    className={cn(
                                        "p-3 rounded-lg transition-colors",
                                        op === "-" ? "bg-pink-500 text-white" : "text-zinc-400 hover:text-white"
                                    )}
                                >
                                    <Minus size={20} />
                                </button>
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-24 bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
                                    placeholder="0"
                                />
                                <select
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value as any)}
                                    className="flex-1 bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
                                >
                                    <option value="days">Days</option>
                                    <option value="weeks">Weeks</option>
                                    <option value="months">Months</option>
                                    <option value="years">Years</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={calculateAdd}
                            className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-pink-500/20"
                        >
                            Calculate Date
                        </button>

                        {addResult && (
                            <div className="animate-in fade-in slide-in-from-bottom duration-500">
                                <div className="bg-pink-500/10 border border-pink-500/20 rounded-2xl p-8 text-center">
                                    <h3 className="text-sm font-medium text-pink-400 uppercase tracking-wider mb-2">Result Date</h3>
                                    <div className="text-3xl md:text-4xl font-black text-white">
                                        {addResult}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
