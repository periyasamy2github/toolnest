"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Info, Activity, RefreshCw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type UnitSystem = "metric" | "imperial";
type BMIStandard = "global" | "asian";

interface BMICategory {
    label: string;
    color: string;
    range: string;
    min: number;
    max: number;
}

const GLOBAL_CATEGORIES: BMICategory[] = [
    { label: "Underweight", color: "text-blue-400", range: "< 18.5", min: 0, max: 18.5 },
    { label: "Normal", color: "text-green-400", range: "18.5 - 24.9", min: 18.5, max: 25 },
    { label: "Overweight", color: "text-yellow-400", range: "25 - 29.9", min: 25, max: 30 },
    { label: "Obese", color: "text-red-400", range: "≥ 30", min: 30, max: 100 },
];

const ASIAN_CATEGORIES: BMICategory[] = [
    { label: "Underweight", color: "text-blue-400", range: "< 18.5", min: 0, max: 18.5 },
    { label: "Normal", color: "text-green-400", range: "18.5 - 22.9", min: 18.5, max: 23 },
    { label: "Overweight", color: "text-yellow-400", range: "23 - 24.9", min: 23, max: 25 },
    { label: "Obese", color: "text-red-400", range: "≥ 25", min: 25, max: 100 },
];

export default function BMICalculator() {
    const [unit, setUnit] = useState<UnitSystem>("metric");
    const [standard, setStandard] = useState<BMIStandard>("asian");

    // Metric
    const [weight, setWeight] = useState<string>("");
    const [height, setHeight] = useState<string>("");

    // Imperial
    const [weightLbs, setWeightLbs] = useState<string>("");
    const [heightFt, setHeightFt] = useState<string>("");
    const [heightIn, setHeightIn] = useState<string>("");

    const [bmi, setBMI] = useState<number | null>(null);
    const [category, setCategory] = useState<BMICategory | null>(null);

    const calculateBMI = () => {
        let w = 0;
        let h = 0;

        if (unit === "metric") {
            w = parseFloat(weight);
            h = parseFloat(height) / 100; // cm to m
        } else {
            w = parseFloat(weightLbs) * 0.453592; // lbs to kg
            const totalInches = (parseFloat(heightFt) * 12) + parseFloat(heightIn);
            h = totalInches * 0.0254; // inches to m
        }

        if (w > 0 && h > 0) {
            const result = w / (h * h);
            setBMI(result);

            const categories = standard === "global" ? GLOBAL_CATEGORIES : ASIAN_CATEGORIES;
            const cat = categories.find(c => result >= c.min && result < c.max) || categories[categories.length - 1];
            setCategory(cat);
        } else {
            setBMI(null);
            setCategory(null);
        }
    };

    useEffect(() => {
        calculateBMI();
    }, [weight, height, weightLbs, heightFt, heightIn, unit, standard]);

    const reset = () => {
        setWeight("");
        setHeight("");
        setWeightLbs("");
        setHeightFt("");
        setHeightIn("");
        setBMI(null);
        setCategory(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/health" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">BMI Calculator</h1>
                    <p className="text-zinc-400">Calculate your Body Mass Index and check your health status.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-6">
                        {/* Toggles */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex bg-zinc-800/50 p-1 rounded-xl border border-white/5">
                                <button
                                    onClick={() => setUnit("metric")}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                        unit === "metric" ? "bg-blue-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                                    )}
                                >
                                    Metric
                                </button>
                                <button
                                    onClick={() => setUnit("imperial")}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                        unit === "imperial" ? "bg-blue-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                                    )}
                                >
                                    Imperial
                                </button>
                            </div>

                            <div className="flex bg-zinc-800/50 p-1 rounded-xl border border-white/5">
                                <button
                                    onClick={() => setStandard("asian")}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                        standard === "asian" ? "bg-purple-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                                    )}
                                >
                                    Asian/Indian
                                </button>
                                <button
                                    onClick={() => setStandard("global")}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                        standard === "global" ? "bg-purple-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                                    )}
                                >
                                    Global (WHO)
                                </button>
                            </div>
                        </div>

                        {/* Input Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {unit === "metric" ? (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">Weight (kg)</label>
                                        <input
                                            type="number"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            placeholder="e.g. 70"
                                            className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">Height (cm)</label>
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            placeholder="e.g. 175"
                                            className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">Weight (lbs)</label>
                                        <input
                                            type="number"
                                            value={weightLbs}
                                            onChange={(e) => setWeightLbs(e.target.value)}
                                            placeholder="e.g. 154"
                                            className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">Height</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                value={heightFt}
                                                onChange={(e) => setHeightFt(e.target.value)}
                                                placeholder="ft"
                                                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                            />
                                            <input
                                                type="number"
                                                value={heightIn}
                                                onChange={(e) => setHeightIn(e.target.value)}
                                                placeholder="in"
                                                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
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
                                <h3 className="text-zinc-100 font-medium">About BMI Standards</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    The <span className="text-purple-400 font-medium">Asian/Indian standard</span> uses lower thresholds because research shows that Asian populations often have a higher body fat percentage at a lower BMI, increasing the risk of type 2 diabetes and cardiovascular disease.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                    <div className={cn(
                        "bg-zinc-900/50 border rounded-2xl p-8 text-center transition-all duration-500",
                        bmi ? "border-white/20 shadow-2xl" : "border-white/10 opacity-50"
                    )}>
                        <div className="space-y-2 mb-6">
                            <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Your BMI</h3>
                            <div className="text-6xl font-bold text-zinc-100">
                                {bmi ? bmi.toFixed(1) : "--.-"}
                            </div>
                        </div>

                        {category && (
                            <div className="space-y-4">
                                <div className={cn("text-xl font-semibold", category.color)}>
                                    {category.label}
                                </div>
                                <div className="text-sm text-zinc-500">
                                    Range: {category.range}
                                </div>
                            </div>
                        )}

                        {!bmi && (
                            <div className="flex flex-col items-center gap-3 text-zinc-500 py-8">
                                <Activity size={48} className="opacity-20" />
                                <p className="text-sm">Enter your details to see results</p>
                            </div>
                        )}
                    </div>

                    {/* Category List */}
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                        <h4 className="text-zinc-100 font-medium text-sm">BMI Categories ({standard === "asian" ? "Asian" : "Global"})</h4>
                        <div className="space-y-3">
                            {(standard === "asian" ? ASIAN_CATEGORIES : GLOBAL_CATEGORIES).map((cat) => (
                                <div
                                    key={cat.label}
                                    className={cn(
                                        "flex items-center justify-between p-3 rounded-xl border transition-all",
                                        category?.label === cat.label
                                            ? "bg-white/5 border-white/20 shadow-lg"
                                            : "border-transparent opacity-60"
                                    )}
                                >
                                    <span className={cn("font-medium", cat.color)}>{cat.label}</span>
                                    <span className="text-xs text-zinc-400">{cat.range}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
