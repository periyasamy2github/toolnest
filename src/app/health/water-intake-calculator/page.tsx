"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Info, Droplets, RefreshCw, Activity, Sun } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type UnitSystem = "metric" | "imperial";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
type Climate = "normal" | "hot";

export default function WaterIntakeCalculator() {
    const [unit, setUnit] = useState<UnitSystem>("metric");
    const [weight, setWeight] = useState<string>("");
    const [weightLbs, setWeightLbs] = useState<string>("");
    const [activity, setActivity] = useState<ActivityLevel>("moderate");
    const [climate, setClimate] = useState<Climate>("normal");

    const [waterLiters, setWaterLiters] = useState<number | null>(null);
    const [glasses, setGlasses] = useState<number | null>(null);

    const calculateWater = () => {
        let w = 0;
        if (unit === "metric") {
            w = parseFloat(weight);
        } else {
            w = parseFloat(weightLbs) * 0.453592; // lbs to kg
        }

        if (w > 0) {
            // Base: 35ml per kg
            let totalMl = w * 35;

            // Activity adjustment
            const activityAdditions = {
                sedentary: 0,
                light: 350,
                moderate: 700,
                active: 1050,
                very_active: 1400,
            };
            totalMl += activityAdditions[activity];

            // Climate adjustment
            if (climate === "hot") {
                totalMl += 500;
            }

            const liters = totalMl / 1000;
            setWaterLiters(liters);
            setGlasses(Math.ceil(totalMl / 250)); // 250ml per glass
        } else {
            setWaterLiters(null);
            setGlasses(null);
        }
    };

    useEffect(() => {
        calculateWater();
    }, [weight, weightLbs, unit, activity, climate]);

    const reset = () => {
        setWeight("");
        setWeightLbs("");
        setActivity("moderate");
        setClimate("normal");
        setWaterLiters(null);
        setGlasses(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/health" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Water Intake Calculator</h1>
                    <p className="text-zinc-400">Calculate your daily hydration needs based on your lifestyle.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-6">
                        {/* Unit Toggle */}
                        <div className="flex bg-zinc-800/50 p-1 rounded-xl border border-white/5 w-fit">
                            <button
                                onClick={() => setUnit("metric")}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                    unit === "metric" ? "bg-blue-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                                )}
                            >
                                Metric (kg)
                            </button>
                            <button
                                onClick={() => setUnit("imperial")}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                    unit === "imperial" ? "bg-blue-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                                )}
                            >
                                Imperial (lbs)
                            </button>
                        </div>

                        {/* Weight Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Your Weight</label>
                            <input
                                type="number"
                                value={unit === "metric" ? weight : weightLbs}
                                onChange={(e) => unit === "metric" ? setWeight(e.target.value) : setWeightLbs(e.target.value)}
                                placeholder={unit === "metric" ? "e.g. 70" : "e.g. 154"}
                                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            />
                        </div>

                        {/* Activity Level */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <Activity size={16} className="text-blue-400" />
                                Activity Level
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                                {(["sedentary", "light", "moderate", "active", "very_active"] as ActivityLevel[]).map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setActivity(level)}
                                        className={cn(
                                            "px-3 py-2 rounded-lg text-xs font-medium border transition-all capitalize",
                                            activity === level
                                                ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                                                : "bg-zinc-800/30 border-white/5 text-zinc-500 hover:bg-zinc-800/50"
                                        )}
                                    >
                                        {level.replace("_", " ")}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Climate */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <Sun size={16} className="text-yellow-400" />
                                Climate
                            </label>
                            <div className="flex gap-2">
                                {(["normal", "hot"] as Climate[]).map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setClimate(c)}
                                        className={cn(
                                            "flex-1 px-4 py-2 rounded-lg text-sm font-medium border transition-all capitalize",
                                            climate === c
                                                ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-500"
                                                : "bg-zinc-800/30 border-white/5 text-zinc-500 hover:bg-zinc-800/50"
                                        )}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={reset}
                            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
                        >
                            <RefreshCw size={14} />
                            Reset Fields
                        </button>
                    </div>

                    {/* Information */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                            <Info className="text-blue-400 shrink-0 mt-1" size={18} />
                            <div className="space-y-2">
                                <h3 className="text-zinc-100 font-medium">Why Hydration Matters</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    Water is essential for almost every function in your body. It helps regulate temperature, transport nutrients, and flush out toxins. Your needs increase with physical activity and in warmer climates.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                    <div className={cn(
                        "bg-zinc-900/50 border rounded-2xl p-8 text-center transition-all duration-500 relative overflow-hidden",
                        waterLiters ? "border-blue-500/30 shadow-2xl shadow-blue-500/10" : "border-white/10 opacity-50"
                    )}>
                        {/* Water Wave Animation Background */}
                        {waterLiters && (
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-blue-500/5 animate-pulse" />
                        )}

                        <div className="relative z-10 space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Daily Goal</h3>
                                <div className="text-6xl font-bold text-zinc-100 flex items-baseline justify-center gap-2">
                                    {waterLiters ? waterLiters.toFixed(1) : "--.-"}
                                    <span className="text-2xl text-zinc-500 font-medium">L</span>
                                </div>
                            </div>

                            {glasses && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center gap-2 text-blue-400 font-semibold text-lg">
                                        <Droplets size={20} />
                                        ~{glasses} Glasses
                                    </div>
                                    <p className="text-xs text-zinc-500">
                                        Based on standard 250ml glasses
                                    </p>
                                </div>
                            )}

                            {!waterLiters && (
                                <div className="flex flex-col items-center gap-3 text-zinc-500 py-8">
                                    <Droplets size={48} className="opacity-20" />
                                    <p className="text-sm">Enter weight to see goal</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hydration Tips */}
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                        <h4 className="text-zinc-100 font-medium text-sm">Hydration Tips</h4>
                        <div className="space-y-3">
                            {[
                                "Drink a glass right after waking up.",
                                "Keep a reusable bottle with you.",
                                "Eat water-rich fruits like watermelon.",
                                "Don't wait until you're thirsty."
                            ].map((tip, i) => (
                                <div key={i} className="flex items-start gap-3 text-xs text-zinc-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                                    {tip}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
