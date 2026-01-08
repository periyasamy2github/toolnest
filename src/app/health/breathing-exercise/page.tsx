"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Play, Pause, RotateCcw, Info, Wind, Settings2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreathingTechnique {
    id: string;
    name: string;
    description: string;
    inhale: number;
    hold1: number;
    exhale: number;
    hold2: number;
    type: "global" | "indian";
}

const TECHNIQUES: BreathingTechnique[] = [
    {
        id: "box",
        name: "Box Breathing",
        description: "Used by Navy SEALs to stay calm and focused under pressure.",
        inhale: 4,
        hold1: 4,
        exhale: 4,
        hold2: 4,
        type: "global",
    },
    {
        id: "478",
        name: "4-7-8 Relax",
        description: "A natural tranquilizer for the nervous system. Great for sleep.",
        inhale: 4,
        hold1: 7,
        exhale: 8,
        hold2: 0,
        type: "global",
    },
    {
        id: "anulom",
        name: "Anulom Vilom",
        description: "Alternate nostril breathing to balance energy and reduce stress.",
        inhale: 4,
        hold1: 4,
        exhale: 4,
        hold2: 0,
        type: "indian",
    },
    {
        id: "kapalbhati",
        name: "Kapalbhati",
        description: "Skull-shining breath. Rapid exhalations for detoxification.",
        inhale: 1,
        hold1: 0,
        exhale: 1,
        hold2: 0,
        type: "indian",
    },
];

export default function BreathingExercise() {
    const [activeTechnique, setActiveTechnique] = useState<BreathingTechnique>(TECHNIQUES[0]);
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState<"inhale" | "hold1" | "exhale" | "hold2">("inhale");
    const [timeLeft, setTimeLeft] = useState(activeTechnique.inhale);
    const [cycleCount, setCycleCount] = useState(0);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const reset = () => {
        setIsActive(false);
        setPhase("inhale");
        setTimeLeft(activeTechnique.inhale);
        setCycleCount(0);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    useEffect(() => {
        reset();
    }, [activeTechnique]);

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        // Switch Phase
                        if (phase === "inhale") {
                            if (activeTechnique.hold1 > 0) {
                                setPhase("hold1");
                                return activeTechnique.hold1;
                            } else {
                                setPhase("exhale");
                                return activeTechnique.exhale;
                            }
                        } else if (phase === "hold1") {
                            setPhase("exhale");
                            return activeTechnique.exhale;
                        } else if (phase === "exhale") {
                            if (activeTechnique.hold2 > 0) {
                                setPhase("hold2");
                                return activeTechnique.hold2;
                            } else {
                                setCycleCount(c => c + 1);
                                setPhase("inhale");
                                return activeTechnique.inhale;
                            }
                        } else {
                            setCycleCount(c => c + 1);
                            setPhase("inhale");
                            return activeTechnique.inhale;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, phase, activeTechnique]);

    const getPhaseText = () => {
        switch (phase) {
            case "inhale": return "Inhale";
            case "hold1": return "Hold";
            case "exhale": return "Exhale";
            case "hold2": return "Hold";
        }
    };

    const getPhaseColor = () => {
        switch (phase) {
            case "inhale": return "text-blue-400";
            case "hold1": return "text-purple-400";
            case "exhale": return "text-emerald-400";
            case "hold2": return "text-zinc-400";
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/health" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Breathing Exercise</h1>
                    <p className="text-zinc-400">Calm your mind and body with guided breathing.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Guide */}
                <div className="lg:col-span-2 flex flex-col items-center justify-center bg-zinc-900/50 border border-white/10 rounded-3xl p-12 min-h-[500px] relative overflow-hidden">
                    {/* Background Animation */}
                    <div className={cn(
                        "absolute inset-0 bg-gradient-to-b opacity-10 transition-all duration-1000",
                        phase === "inhale" ? "from-blue-500 to-transparent" :
                            phase === "exhale" ? "from-emerald-500 to-transparent" :
                                "from-purple-500 to-transparent"
                    )} />

                    {/* Breathing Circle */}
                    <div className="relative z-10 flex flex-col items-center gap-8">
                        <div className="relative">
                            {/* Outer Pulse */}
                            <div className={cn(
                                "absolute inset-0 rounded-full border-2 transition-all duration-1000",
                                phase === "inhale" ? "scale-150 opacity-0 border-blue-500" : "scale-100 opacity-20 border-white"
                            )} />

                            {/* Main Circle */}
                            <div className={cn(
                                "w-64 h-64 rounded-full border-4 flex items-center justify-center transition-all duration-1000 ease-in-out shadow-2xl shadow-blue-500/10",
                                phase === "inhale" ? "scale-125 border-blue-500 bg-blue-500/5" :
                                    phase === "exhale" ? "scale-75 border-emerald-500 bg-emerald-500/5" :
                                        "scale-100 border-purple-500 bg-purple-500/5"
                            )}>
                                <div className="text-center">
                                    <div className={cn("text-4xl font-bold mb-1", getPhaseColor())}>
                                        {isActive ? getPhaseText() : "Ready?"}
                                    </div>
                                    <div className="text-zinc-500 text-lg">
                                        {isActive ? `${timeLeft}s` : "Click Play"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-6">
                            <button
                                onClick={reset}
                                className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 transition-all"
                                title="Reset"
                            >
                                <RotateCcw size={20} />
                            </button>
                            <button
                                onClick={() => setIsActive(!isActive)}
                                className={cn(
                                    "w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-xl",
                                    isActive ? "bg-zinc-800 text-zinc-100" : "bg-blue-500 text-white hover:bg-blue-600"
                                )}
                            >
                                {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                            </button>
                            <div className="p-3 rounded-full bg-zinc-800 text-zinc-400 flex items-center gap-2">
                                <Wind size={20} />
                                <span className="text-sm font-medium">{cycleCount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Technique Selector */}
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-2 text-zinc-100 font-semibold mb-2">
                            <Settings2 size={18} className="text-blue-400" />
                            Select Technique
                        </div>
                        <div className="space-y-2">
                            {TECHNIQUES.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setActiveTechnique(t)}
                                    className={cn(
                                        "w-full text-left p-4 rounded-xl border transition-all group",
                                        activeTechnique.id === t.id
                                            ? "bg-blue-500/10 border-blue-500/50 text-blue-100"
                                            : "bg-zinc-800/30 border-white/5 text-zinc-400 hover:bg-zinc-800/50 hover:border-white/10"
                                    )}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium group-hover:text-zinc-100">{t.name}</span>
                                        <span className={cn(
                                            "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full",
                                            t.type === "indian" ? "bg-orange-500/20 text-orange-400" : "bg-blue-500/20 text-blue-400"
                                        )}>
                                            {t.type === "indian" ? "Pranayama" : "Global"}
                                        </span>
                                    </div>
                                    <p className="text-xs opacity-60 leading-relaxed">{t.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                            <Info className="text-blue-400 shrink-0 mt-1" size={18} />
                            <div className="space-y-2">
                                <h3 className="text-zinc-100 font-medium text-sm">Benefits</h3>
                                <ul className="text-xs text-zinc-400 space-y-2 list-disc pl-4">
                                    <li>Reduces stress and anxiety</li>
                                    <li>Improves focus and concentration</li>
                                    <li>Balances the nervous system</li>
                                    <li>Helps with better sleep</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
