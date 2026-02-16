"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Brain, RefreshCw, AlertTriangle } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";

export default function BurnoutRiskCalculator() {
    const [workHours, setWorkHours] = useState<number>(8);
    const [sleepHours, setSleepHours] = useState<number>(7);
    const [stressLevel, setStressLevel] = useState<number>(5);
    const [breakFrequency, setBreakFrequency] = useState<number>(5);
    const [exerciseFrequency, setExerciseFrequency] = useState<number>(3);

    const [riskLevel, setRiskLevel] = useState<string>("");
    const [recommendation, setRecommendation] = useState<string>("");
    const [riskScore, setRiskScore] = useState<number>(0);

    const calculateRisk = () => {
        let score = 0;

        // Work hours (higher = more risk)
        if (workHours > 10) score += 30;
        else if (workHours > 8) score += 20;
        else if (workHours <= 6) score -= 10;

        // Sleep (less sleep = more risk)
        if (sleepHours < 6) score += 25;
        else if (sleepHours < 7) score += 15;
        else if (sleepHours >= 8) score -= 10;

        // Stress level (direct correlation)
        score += stressLevel * 3;

        // Break frequency (less breaks = more risk)
        score += (10 - breakFrequency) * 2;

        // Exercise frequency (less exercise = more risk)
        if (exerciseFrequency === 0) score += 20;
        else if (exerciseFrequency < 3) score += 10;
        else if (exerciseFrequency >= 5) score -= 15;

        // Normalize to 0-100
        score = Math.max(0, Math.min(100, score));
        setRiskScore(score);

        // Determine risk level and recommendation
        if (score >= 60) {
            setRiskLevel("High");
            setRecommendation("Consider reducing work hours, prioritizing sleep, and seeking professional support. Take regular breaks and incorporate stress-relief activities.");
        } else if (score >= 35) {
            setRiskLevel("Medium");
            setRecommendation("Monitor your stress levels closely. Ensure you're taking regular breaks, getting adequate sleep, and maintaining a healthy work-life balance.");
        } else {
            setRiskLevel("Low");
            setRecommendation("You're managing well! Continue maintaining healthy habits, regular exercise, and adequate rest to keep burnout at bay.");
        }
    };

    useEffect(() => {
        calculateRisk();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workHours, sleepHours, stressLevel, breakFrequency, exerciseFrequency]);

    const reset = () => {
        setWorkHours(8);
        setSleepHours(7);
        setStressLevel(5);
        setBreakFrequency(5);
        setExerciseFrequency(3);
    };

    const getRiskColor = () => {
        if (riskLevel === "High") return "text-red-400";
        if (riskLevel === "Medium") return "text-yellow-400";
        return "text-green-400";
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <BackButton />
                <div>
                    <h1 className="text-4xl font-black text-gradient">Burnout Risk Calculator</h1>
                    <p className="text-zinc-400">Assess your risk of burnout based on work and lifestyle factors.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-zinc-400">Work Hours per Day</label>
                                <span className="text-sm text-blue-400 font-mono">{workHours} hours</span>
                            </div>
                            <input
                                type="range"
                                min="4"
                                max="16"
                                value={workHours}
                                onChange={(e) => setWorkHours(parseInt(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-zinc-400">Sleep Hours</label>
                                <span className="text-sm text-blue-400 font-mono">{sleepHours} hours</span>
                            </div>
                            <input
                                type="range"
                                min="4"
                                max="12"
                                value={sleepHours}
                                onChange={(e) => setSleepHours(parseInt(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-zinc-400">Stress Level</label>
                                <span className="text-sm text-red-400 font-mono">{stressLevel}/10</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={stressLevel}
                                onChange={(e) => setStressLevel(parseInt(e.target.value))}
                                className="w-full accent-red-500"
                            />
                            <p className="text-xs text-zinc-500">How stressed do you feel on average?</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-zinc-400">Break Frequency</label>
                                <span className="text-sm text-blue-400 font-mono">{breakFrequency}/10</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={breakFrequency}
                                onChange={(e) => setBreakFrequency(parseInt(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                            <p className="text-xs text-zinc-500">How often do you take breaks during work?</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-zinc-400">Exercise Frequency</label>
                                <span className="text-sm text-blue-400 font-mono">{exerciseFrequency} days/week</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="7"
                                value={exerciseFrequency}
                                onChange={(e) => setExerciseFrequency(parseInt(e.target.value))}
                                className="w-full accent-blue-500"
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
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-8 text-center">
                        <div className="space-y-4 mb-6">
                            <AlertTriangle className={cn("mx-auto", getRiskColor())} size={48} />
                            <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Burnout Risk</h3>
                            <div className={cn("text-4xl font-bold", getRiskColor())}>
                                {riskLevel || "Calculating..."}
                            </div>
                        </div>

                        <div className="w-full bg-zinc-800/50 rounded-full h-3 overflow-hidden mb-6">
                            <div
                                className={cn(
                                    "h-full transition-all duration-500",
                                    riskScore >= 60 ? "bg-red-500" :
                                        riskScore >= 35 ? "bg-yellow-500" : "bg-green-500"
                                )}
                                style={{ width: `${riskScore}%` }}
                            />
                        </div>

                        {recommendation && (
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                {recommendation}
                            </p>
                        )}
                    </div>

                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                        <p className="text-xs text-zinc-500 italic">
                            For informational purposes only. If you're experiencing severe burnout symptoms, please consult a healthcare professional.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
