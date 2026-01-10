"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, HeartPulse, RefreshCw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HealthScoreGenerator() {
    const [activity, setActivity] = useState<number>(5);
    const [water, setWater] = useState<number>(5);
    const [sleep, setSleep] = useState<number>(7);
    const [diet, setDiet] = useState<number>(5);
    const [stress, setStress] = useState<number>(5);

    const [score, setScore] = useState<number>(0);
    const [category, setCategory] = useState<string>("");

    const calculateScore = () => {
        // Weighted scoring system
        const activityScore = (activity / 10) * 25; // 25% weight
        const waterScore = (water / 10) * 15; // 15% weight
        const sleepScore = Math.min((sleep / 8) * 20, 20); // 20% weight, optimal at 8 hours
        const dietScore = (diet / 10) * 25; // 25% weight
        const stressScore = ((10 - stress) / 10) * 15; // 15% weight, inverted

        const totalScore = Math.round(activityScore + waterScore + sleepScore + dietScore + stressScore);
        setScore(totalScore);

        // Categorize
        if (totalScore >= 80) setCategory("Excellent");
        else if (totalScore >= 60) setCategory("Good");
        else if (totalScore >= 40) setCategory("Average");
        else setCategory("Poor");
    };

    useEffect(() => {
        calculateScore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activity, water, sleep, diet, stress]);

    const reset = () => {
        setActivity(5);
        setWater(5);
        setSleep(7);
        setDiet(5);
        setStress(5);
    };

    const getCategoryColor = () => {
        if (category === "Excellent") return "text-green-400";
        if (category === "Good") return "text-blue-400";
        if (category === "Average") return "text-yellow-400";
        return "text-red-400";
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/health" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Daily Health Score</h1>
                    <p className="text-zinc-400">Track your daily wellness with a comprehensive health score.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-zinc-400">Activity Level</label>
                                <span className="text-sm text-blue-400 font-mono">{activity}/10</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={activity}
                                onChange={(e) => setActivity(parseInt(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                            <p className="text-xs text-zinc-500">How active were you today?</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-zinc-400">Water Intake</label>
                                <span className="text-sm text-blue-400 font-mono">{water}/10</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={water}
                                onChange={(e) => setWater(parseInt(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                            <p className="text-xs text-zinc-500">Did you drink enough water?</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-zinc-400">Sleep Hours</label>
                                <span className="text-sm text-blue-400 font-mono">{sleep} hours</span>
                            </div>
                            <input
                                type="range"
                                min="4"
                                max="12"
                                value={sleep}
                                onChange={(e) => setSleep(parseInt(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                            <p className="text-xs text-zinc-500">How many hours did you sleep?</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-zinc-400">Diet Quality</label>
                                <span className="text-sm text-blue-400 font-mono">{diet}/10</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={diet}
                                onChange={(e) => setDiet(parseInt(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                            <p className="text-xs text-zinc-500">How healthy was your diet today?</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-zinc-400">Stress Level</label>
                                <span className="text-sm text-red-400 font-mono">{stress}/10</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                value={stress}
                                onChange={(e) => setStress(parseInt(e.target.value))}
                                className="w-full accent-red-500"
                            />
                            <p className="text-xs text-zinc-500">How stressed did you feel?</p>
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
                        <div className="space-y-2 mb-6">
                            <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Health Score</h3>
                            <div className="text-6xl font-bold text-zinc-100">
                                {score}
                            </div>
                            <div className="text-xs text-zinc-500">out of 100</div>
                        </div>

                        <div className={cn("text-2xl font-semibold mb-4", getCategoryColor())}>
                            {category}
                        </div>

                        <div className="w-full bg-zinc-800/50 rounded-full h-3 overflow-hidden">
                            <div
                                className={cn(
                                    "h-full transition-all duration-500",
                                    score >= 80 ? "bg-green-500" :
                                        score >= 60 ? "bg-blue-500" :
                                            score >= 40 ? "bg-yellow-500" : "bg-red-500"
                                )}
                                style={{ width: `${score}%` }}
                            />
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                        <p className="text-xs text-zinc-500 italic">
                            For informational purposes only. This score is based on self-reported daily habits.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
