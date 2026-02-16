"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Play, Pause, RotateCcw, Timer, Watch, Flag } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";

export default function TimerPage() {
    const [mode, setMode] = useState<"timer" | "stopwatch">("timer");

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <BackButton />
                <div>
                    <h1 className="text-4xl font-black text-gradient">Timer & Stopwatch</h1>
                    <p className="text-zinc-400">Precision timing tools.</p>
                </div>
            </div>

            <div className="glass-card p-2 flex p-1 bg-zinc-900/50 rounded-xl w-fit mx-auto">
                <button
                    onClick={() => setMode("timer")}
                    className={cn(
                        "px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2",
                        mode === "timer" ? "bg-blue-600 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                    )}
                >
                    <Timer size={18} />
                    Timer
                </button>
                <button
                    onClick={() => setMode("stopwatch")}
                    className={cn(
                        "px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2",
                        mode === "stopwatch" ? "bg-blue-600 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                    )}
                >
                    <Watch size={18} />
                    Stopwatch
                </button>
            </div>

            <div className="glass-card p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center">
                {mode === "timer" ? <CountdownTimer /> : <Stopwatch />}
            </div>
        </div>
    );
}

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [inputHours, setInputHours] = useState(0);
    const [inputMinutes, setInputMinutes] = useState(5);
    const [inputSeconds, setInputSeconds] = useState(0);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (timeLeft === 0) {
            const totalSeconds = (inputHours * 3600) + (inputMinutes * 60) + inputSeconds;
            if (totalSeconds > 0) setTimeLeft(totalSeconds);
        }
        setIsActive(true);
    };

    const pauseTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(0);
    };

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center space-y-8 w-full max-w-md">
            {timeLeft > 0 || isActive ? (
                <div className="text-7xl md:text-9xl font-mono font-bold text-zinc-100 tabular-nums tracking-wider">
                    {formatTime(timeLeft)}
                </div>
            ) : (
                <div className="flex items-center gap-4 text-4xl md:text-6xl font-mono font-bold text-zinc-100">
                    <div className="flex flex-col items-center gap-2">
                        <input
                            type="number"
                            min="0"
                            max="99"
                            value={inputHours}
                            onChange={(e) => setInputHours(Number(e.target.value))}
                            className="w-20 md:w-32 bg-transparent border-b-2 border-zinc-700 text-center focus:border-blue-500 focus:outline-none"
                        />
                        <span className="text-xs md:text-sm text-zinc-500 font-sans font-normal">HRS</span>
                    </div>
                    <span>:</span>
                    <div className="flex flex-col items-center gap-2">
                        <input
                            type="number"
                            min="0"
                            max="59"
                            value={inputMinutes}
                            onChange={(e) => setInputMinutes(Number(e.target.value))}
                            className="w-20 md:w-32 bg-transparent border-b-2 border-zinc-700 text-center focus:border-blue-500 focus:outline-none"
                        />
                        <span className="text-xs md:text-sm text-zinc-500 font-sans font-normal">MIN</span>
                    </div>
                    <span>:</span>
                    <div className="flex flex-col items-center gap-2">
                        <input
                            type="number"
                            min="0"
                            max="59"
                            value={inputSeconds}
                            onChange={(e) => setInputSeconds(Number(e.target.value))}
                            className="w-20 md:w-32 bg-transparent border-b-2 border-zinc-700 text-center focus:border-blue-500 focus:outline-none"
                        />
                        <span className="text-xs md:text-sm text-zinc-500 font-sans font-normal">SEC</span>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-6">
                <button
                    onClick={resetTimer}
                    className="p-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                >
                    <RotateCcw size={24} />
                </button>

                <button
                    onClick={isActive ? pauseTimer : startTimer}
                    className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-105",
                        isActive
                            ? "bg-amber-500 hover:bg-amber-600 text-white"
                            : "bg-blue-600 hover:bg-blue-500 text-white"
                    )}
                >
                    {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                </button>
            </div>
        </div>
    );
}

function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => prev + 10);
            }, 10);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive]);

    const formatTime = (ms: number) => {
        const m = Math.floor((ms / 60000) % 60);
        const s = Math.floor((ms / 1000) % 60);
        const centiseconds = Math.floor((ms / 10) % 100);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
    };

    const addLap = () => {
        setLaps(prev => [time, ...prev]);
    };

    const reset = () => {
        setIsActive(false);
        setTime(0);
        setLaps([]);
    };

    return (
        <div className="flex flex-col items-center space-y-8 w-full max-w-md">
            <div className="text-7xl md:text-9xl font-mono font-bold text-zinc-100 tabular-nums tracking-wider">
                {formatTime(time)}
            </div>

            <div className="flex items-center gap-6">
                <button
                    onClick={reset}
                    className="p-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                >
                    <RotateCcw size={24} />
                </button>

                <button
                    onClick={() => setIsActive(!isActive)}
                    className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-105",
                        isActive
                            ? "bg-amber-500 hover:bg-amber-600 text-white"
                            : "bg-blue-600 hover:bg-blue-500 text-white"
                    )}
                >
                    {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                </button>

                <button
                    onClick={addLap}
                    disabled={!isActive}
                    className="p-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
                >
                    <Flag size={24} />
                </button>
            </div>

            {laps.length > 0 && (
                <div className="w-full max-h-60 overflow-y-auto custom-scrollbar space-y-2 border-t border-white/10 pt-4">
                    {laps.map((lap, i) => (
                        <div key={i} className="flex justify-between items-center px-4 py-2 bg-zinc-900/50 rounded-lg">
                            <span className="text-zinc-500">Lap {laps.length - i}</span>
                            <span className="font-mono text-zinc-200">{formatTime(lap)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
