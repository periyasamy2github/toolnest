"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Clock, Play, Pause, RotateCcw, Coffee, Brain, Bell, BellOff } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PomodoroPage() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<"work" | "short" | "long">("work");
    const [muted, setMuted] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const modes = {
        work: { label: "Work", time: 25 * 60, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        short: { label: "Short Break", time: 5 * 60, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
        long: { label: "Long Break", time: 15 * 60, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
    };

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (!muted) {
                const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
                audio.play().catch(() => { });
            }
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft, muted]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(modes[mode].time);
    };

    const switchMode = (newMode: "work" | "short" | "long") => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(modes[newMode].time);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const progress = (timeLeft / modes[mode].time) * 100;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/utils" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <ArrowLeft className="text-zinc-400" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black text-gradient">Pomodoro Timer</h1>
                        <p className="text-zinc-400">Stay focused and productive with timed work sessions.</p>
                    </div>
                </div>
                <button
                    onClick={() => setMuted(!muted)}
                    className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 transition-colors"
                >
                    {muted ? <BellOff size={20} /> : <Bell size={20} />}
                </button>
            </div>

            <div className={cn("glass-card p-12 flex flex-col items-center space-y-8 border-2 transition-all duration-500", modes[mode].border)}>
                <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
                    {(Object.keys(modes) as Array<keyof typeof modes>).map((m) => (
                        <button
                            key={m}
                            onClick={() => switchMode(m)}
                            className={cn(
                                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                mode === m ? "bg-white/10 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"
                            )}
                        >
                            {modes[m].label}
                        </button>
                    ))}
                </div>

                <div className="relative w-64 h-64 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                        <circle
                            cx="128"
                            cy="128"
                            r="120"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="text-white/5"
                        />
                        <circle
                            cx="128"
                            cy="128"
                            r="120"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeDasharray={753.98}
                            strokeDashoffset={753.98 - (753.98 * progress) / 100}
                            className={cn("transition-all duration-1000", modes[mode].color)}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-6xl font-bold font-mono text-zinc-100">{formatTime(timeLeft)}</span>
                        <span className={cn("text-xs font-bold uppercase tracking-widest mt-2", modes[mode].color)}>
                            {mode === "work" ? <Brain size={16} className="inline mr-1" /> : <Coffee size={16} className="inline mr-1" />}
                            {modes[mode].label}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={resetTimer}
                        className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-400 transition-all active:scale-95"
                    >
                        <RotateCcw size={24} />
                    </button>
                    <button
                        onClick={toggleTimer}
                        className={cn(
                            "px-12 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 flex items-center gap-3",
                            isActive ? "bg-zinc-800 text-zinc-300" : "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                        )}
                    >
                        {isActive ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                        {isActive ? "Pause" : "Start"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 text-center space-y-2">
                    <p className="text-2xl font-bold text-zinc-100">25</p>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Work Minutes</p>
                </div>
                <div className="glass-card p-6 text-center space-y-2">
                    <p className="text-2xl font-bold text-zinc-100">5</p>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Short Break</p>
                </div>
                <div className="glass-card p-6 text-center space-y-2">
                    <p className="text-2xl font-bold text-zinc-100">15</p>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Long Break</p>
                </div>
            </div>
        </div>
    );
}
