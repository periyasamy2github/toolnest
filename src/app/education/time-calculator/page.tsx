"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Clock, Plus, Minus, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

type Time = { days: string; hours: string; minutes: string; seconds: string };

export default function TimeCalculator() {
    const [t1, setT1] = useState<Time>({ days: "", hours: "", minutes: "", seconds: "" });
    const [t2, setT2] = useState<Time>({ days: "", hours: "", minutes: "", seconds: "" });
    const [op, setOp] = useState<"+" | "-">("+");
    const [result, setResult] = useState<Time | null>(null);

    const toSeconds = (t: Time) => {
        return (
            (parseInt(t.days || "0") * 86400) +
            (parseInt(t.hours || "0") * 3600) +
            (parseInt(t.minutes || "0") * 60) +
            parseInt(t.seconds || "0")
        );
    };

    const fromSeconds = (totalSeconds: number) => {
        const isNegative = totalSeconds < 0;
        let s = Math.abs(totalSeconds);

        const days = Math.floor(s / 86400);
        s %= 86400;
        const hours = Math.floor(s / 3600);
        s %= 3600;
        const minutes = Math.floor(s / 60);
        const seconds = s % 60;

        return {
            days: (isNegative ? "-" : "") + days.toString(),
            hours: hours.toString(),
            minutes: minutes.toString(),
            seconds: seconds.toString()
        };
    };

    const calculate = () => {
        const s1 = toSeconds(t1);
        const s2 = toSeconds(t2);
        let res = 0;

        if (op === "+") res = s1 + s2;
        else res = s1 - s2;

        setResult(fromSeconds(res));
    };

    const reset = () => {
        setT1({ days: "", hours: "", minutes: "", seconds: "" });
        setT2({ days: "", hours: "", minutes: "", seconds: "" });
        setResult(null);
    };

    const TimeInput = ({
        value,
        onChange,
        label
    }: {
        value: Time;
        onChange: (t: Time) => void;
        label: string
    }) => (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider text-center">{label}</h3>
            <div className="grid grid-cols-4 gap-2">
                {["days", "hours", "minutes", "seconds"].map((field) => (
                    <div key={field} className="space-y-1">
                        <input
                            type="number"
                            value={value[field as keyof Time]}
                            onChange={(e) => onChange({ ...value, [field]: e.target.value })}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-center text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                            placeholder="0"
                        />
                        <div className="text-xs text-center text-zinc-500 capitalize">{field}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Time <span className="text-blue-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Add or subtract time durations (Days, Hours, Minutes, Seconds).
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-[1fr,auto,1fr] gap-8 items-center">
                    <TimeInput value={t1} onChange={setT1} label="Time 1" />

                    <div className="flex flex-col items-center gap-4">
                        <div className="flex gap-2 bg-zinc-950 p-1 rounded-xl border border-white/10">
                            {[
                                { val: "+", icon: Plus },
                                { val: "-", icon: Minus },
                            ].map((o) => (
                                <button
                                    key={o.val}
                                    onClick={() => setOp(o.val as any)}
                                    className={cn(
                                        "p-3 rounded-lg transition-colors",
                                        op === o.val
                                            ? "bg-blue-500 text-white"
                                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <o.icon size={20} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <TimeInput value={t2} onChange={setT2} label="Time 2" />
                </div>

                <div className="flex justify-center gap-4 pt-4 border-t border-white/10">
                    <button
                        onClick={calculate}
                        className="flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-blue-500/20"
                    >
                        Calculate <ArrowRight size={20} />
                    </button>
                    <button
                        onClick={reset}
                        className="p-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-colors"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>

                {/* Result */}
                {result && (
                    <div className="animate-in fade-in slide-in-from-bottom duration-500">
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-8 text-center space-y-2">
                            <h3 className="text-sm font-medium text-blue-400 uppercase tracking-wider">Result</h3>
                            <div className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight">
                                {result.days !== "0" && <span className="text-zinc-500 text-2xl mr-2">{result.days}d</span>}
                                {result.hours !== "0" && <span className="text-zinc-400 text-3xl mr-2">{result.hours}h</span>}
                                {result.minutes !== "0" && <span className="text-zinc-300 text-4xl mr-2">{result.minutes}m</span>}
                                <span className="text-blue-400">{result.seconds}s</span>
                            </div>
                            <div className="text-sm text-zinc-500">
                                Total Seconds: {toSeconds(result)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
