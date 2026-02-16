"use client";

import { useState } from "react";
import { ArrowLeft, Moon, Sun, Clock, BedDouble } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";

export default function SleepCalculatorPage() {
    const [mode, setMode] = useState<"wakeup" | "sleep">("wakeup");
    const [time, setTime] = useState("07:00");
    const [results, setResults] = useState<string[]>([]);

    const calculateSleep = () => {
        const [hours, minutes] = time.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0);

        const cycles = [6, 5, 4, 3]; // 9h, 7.5h, 6h, 4.5h
        const calculatedTimes: string[] = [];

        if (mode === "wakeup") {
            // Calculate when to go to sleep
            // Subtract 15 mins for falling asleep + 90 min cycles
            cycles.forEach(c => {
                const sleepTime = new Date(date.getTime());
                sleepTime.setMinutes(sleepTime.getMinutes() - (c * 90 + 15));
                calculatedTimes.push(sleepTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            });
        } else {
            // Calculate when to wake up
            // Add 15 mins for falling asleep + 90 min cycles
            cycles.reverse().forEach(c => {
                const wakeTime = new Date(date.getTime());
                wakeTime.setMinutes(wakeTime.getMinutes() + (c * 90 + 15));
                calculatedTimes.push(wakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            });
        }
        setResults(calculatedTimes);
    };

    const calculateNow = () => {
        const now = new Date();
        const cycles = [3, 4, 5, 6]; // 4.5h, 6h, 7.5h, 9h
        const calculatedTimes: string[] = [];

        cycles.forEach(c => {
            const wakeTime = new Date(now.getTime());
            wakeTime.setMinutes(wakeTime.getMinutes() + (c * 90 + 15));
            calculatedTimes.push(wakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        });
        setMode("sleep");
        setResults(calculatedTimes);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <BackButton />
                <div>
                    <h1 className="text-4xl font-black text-gradient">Sleep Calculator</h1>
                    <p className="text-zinc-400 text-lg">Wake up refreshed by calculating your sleep cycles.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Card */}
                <div className="glass-card p-8 space-y-8">
                    <div className="flex bg-zinc-900/50 p-1 rounded-xl">
                        <button
                            onClick={() => setMode("wakeup")}
                            className={cn(
                                "flex-1 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
                                mode === "wakeup" ? "bg-blue-600 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                            )}
                        >
                            <Sun size={18} /> I want to wake up at
                        </button>
                        <button
                            onClick={() => setMode("sleep")}
                            className={cn(
                                "flex-1 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
                                mode === "sleep" ? "bg-blue-600 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                            )}
                        >
                            <Moon size={18} /> I plan to sleep at
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="bg-transparent text-6xl font-bold text-white border-b-2 border-white/10 focus:border-blue-500 outline-none pb-2 text-center w-full"
                            />
                            <Clock className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-600 -z-10 opacity-20" size={80} />
                        </div>

                        <button
                            onClick={calculateSleep}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Calculate
                        </button>

                        <div className="w-full flex items-center gap-4">
                            <div className="h-px bg-white/10 flex-1" />
                            <span className="text-xs text-zinc-500 uppercase">OR</span>
                            <div className="h-px bg-white/10 flex-1" />
                        </div>

                        <button
                            onClick={calculateNow}
                            className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <BedDouble size={20} />
                            I'm going to sleep now
                        </button>
                    </div>
                </div>

                {/* Results Card */}
                <div className="glass-card p-8 flex flex-col justify-center space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <h3 className="text-xl font-bold text-white z-10">
                        {mode === "wakeup" ? "You should fall asleep at:" : "You should wake up at:"}
                    </h3>

                    <div className="space-y-4 z-10">
                        {results.length > 0 ? (
                            results.map((t, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "p-4 rounded-xl border flex items-center justify-between transition-all hover:scale-[1.02]",
                                        i === 0 ? "bg-green-500/20 border-green-500/50" :
                                            i === 1 ? "bg-blue-500/10 border-blue-500/30" :
                                                "bg-zinc-900/50 border-white/5"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                                            i === 0 ? "bg-green-500 text-white" :
                                                i === 1 ? "bg-blue-500 text-white" :
                                                    "bg-zinc-800 text-zinc-400"
                                        )}>
                                            {i === 0 ? "Best" : i + 1}
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-white">{t}</div>
                                            <div className="text-xs text-zinc-400">
                                                {mode === "wakeup" ? `${6 - i} Cycles (${(6 - i) * 1.5}h)` : `${i + 3} Cycles (${(i + 3) * 1.5}h)`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-zinc-500 py-12">
                                <Moon size={48} className="mx-auto mb-4 opacity-20" />
                                <p>Enter a time to see results</p>
                            </div>
                        )}
                    </div>

                    <p className="text-xs text-zinc-500 text-center mt-4 z-10">
                        *Calculations include 14 minutes to fall asleep.
                    </p>
                </div>
            </div>
        </div>
    );
}
