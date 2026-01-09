"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Timer, Play, Pause, RotateCcw, Flag } from "lucide-react";
import Link from "next/link";

export default function StopwatchPage() {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setTime((prev) => prev + 10);
            }, 10);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive]);

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
    };

    const handleLap = () => {
        setLaps([time, ...laps]);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
        setLaps([]);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/utils" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Stopwatch</h1>
                    <p className="text-zinc-400">Precise stopwatch with lap timing capabilities.</p>
                </div>
            </div>

            <div className="glass-card p-12 flex flex-col items-center space-y-12">
                <div className="text-8xl font-bold font-mono text-zinc-100 tracking-tighter">
                    {formatTime(time)}
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={handleReset}
                        className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 transition-all active:scale-95"
                        title="Reset"
                    >
                        <RotateCcw size={28} />
                    </button>

                    <button
                        onClick={() => setIsActive(!isActive)}
                        className="w-24 h-24 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 transition-all active:scale-90"
                    >
                        {isActive ? <Pause size={40} fill="currentColor" /> : <Play size={40} className="ml-2" fill="currentColor" />}
                    </button>

                    <button
                        onClick={handleLap}
                        disabled={!isActive}
                        className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 transition-all active:scale-95 disabled:opacity-30"
                        title="Lap"
                    >
                        <Flag size={28} />
                    </button>
                </div>
            </div>

            {laps.length > 0 && (
                <div className="glass-card overflow-hidden">
                    <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Laps</h3>
                        <span className="text-xs text-zinc-500">{laps.length} recorded</span>
                    </div>
                    <div className="max-h-64 overflow-auto divide-y divide-white/5">
                        {laps.map((lapTime, index) => (
                            <div key={index} className="p-4 flex justify-between items-center group hover:bg-white/5 transition-colors">
                                <span className="text-sm text-zinc-500 font-mono">Lap {laps.length - index}</span>
                                <span className="text-lg font-bold text-zinc-200 font-mono">{formatTime(lapTime)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
