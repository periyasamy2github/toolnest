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
        <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex items-center gap-6">
                <Link href="/health" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                    <ArrowLeft className="text-zinc-100" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">BMI Calculator</h1>
                    <p className="text-zinc-400 text-lg">Calculate your Body Mass Index and check your health status with total privacy.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Inputs */}
                <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="glass-card p-8 space-y-8">
                        {/* Toggles */}
                        <div className="flex flex-wrap gap-6">
                            <div className="flex glass p-1.5 rounded-2xl border border-white/10">
                                <button
                                    onClick={() => setUnit("metric")}
                                    className={cn(
                                        "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                                        unit === "metric" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-zinc-500 hover:text-zinc-300"
                                    )}
                                >
                                    Metric
                                </button>
                                <button
                                    onClick={() => setUnit("imperial")}
                                    className={cn(
                                        "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                                        unit === "imperial" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-zinc-500 hover:text-zinc-300"
                                    )}
                                >
                                    Imperial
                                </button>
                            </div>

                            <div className="flex glass p-1.5 rounded-2xl border border-white/10">
                                <button
                                    onClick={() => setStandard("asian")}
                                    className={cn(
                                        "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                                        standard === "asian" ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20" : "text-zinc-500 hover:text-zinc-300"
                                    )}
                                >
                                    Asian/Indian
                                </button>
                                <button
                                    onClick={() => setStandard("global")}
                                    className={cn(
                                        "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                                        standard === "global" ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20" : "text-zinc-500 hover:text-zinc-300"
                                    )}
                                >
                                    Global (WHO)
                                </button>
                            </div>
                        </div>

                        {/* Input Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {unit === "metric" ? (
                                <>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest px-2">Weight (kg)</label>
                                        <input
                                            type="number"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            placeholder="e.g. 70"
                                            className="w-full glass border border-white/10 rounded-2xl px-6 py-4 text-zinc-100 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-800"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest px-2">Height (cm)</label>
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            placeholder="e.g. 175"
                                            className="w-full glass border border-white/10 rounded-2xl px-6 py-4 text-zinc-100 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-800"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest px-2">Weight (lbs)</label>
                                        <input
                                            type="number"
                                            value={weightLbs}
                                            onChange={(e) => setWeightLbs(e.target.value)}
                                            placeholder="e.g. 154"
                                            className="w-full glass border border-white/10 rounded-2xl px-6 py-4 text-zinc-100 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-800"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest px-2">Height</label>
                                        <div className="flex gap-4">
                                            <input
                                                type="number"
                                                value={heightFt}
                                                onChange={(e) => setHeightFt(e.target.value)}
                                                placeholder="ft"
                                                className="w-full glass border border-white/10 rounded-2xl px-6 py-4 text-zinc-100 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-800"
                                            />
                                            <input
                                                type="number"
                                                value={heightIn}
                                                onChange={(e) => setHeightIn(e.target.value)}
                                                placeholder="in"
                                                className="w-full glass border border-white/10 rounded-2xl px-6 py-4 text-zinc-100 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-800"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <button
                            onClick={reset}
                            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest px-2"
                        >
                            <RefreshCw size={16} />
                            Reset Fields
                        </button>
                    </div>

                    {/* Information */}
                    <div className="glass-card p-8 group hover:bg-white/5 transition-all">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Info className="text-blue-400" size={20} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-white font-bold text-lg">About BMI Standards</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    The <span className="text-purple-400 font-bold">Asian/Indian standard</span> uses lower thresholds because research shows that Asian populations often have a higher body fat percentage at a lower BMI, increasing health risks.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className={cn(
                        "glass-card p-10 text-center transition-all duration-700 relative overflow-hidden",
                        bmi ? "border-white/20 shadow-2xl scale-[1.02]" : "opacity-50"
                    )}>
                        {bmi && (
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
                        )}
                        <div className="relative space-y-4 mb-8">
                            <h3 className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Your BMI Score</h3>
                            <div className="text-7xl font-black text-white tracking-tighter">
                                {bmi ? bmi.toFixed(1) : "--.-"}
                            </div>
                        </div>

                        {category && (
                            <div className="relative space-y-4">
                                <div className={cn("text-2xl font-black px-6 py-2 rounded-full inline-block",
                                    category.color.replace('text-', 'bg-').replace('400', '500/10'),
                                    category.color
                                )}>
                                    {category.label}
                                </div>
                                <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
                                    Ideal Range: {category.range}
                                </div>
                            </div>
                        )}

                        {!bmi && (
                            <div className="flex flex-col items-center gap-4 text-zinc-600 py-12">
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-2">
                                    <Activity size={48} className="opacity-20" />
                                </div>
                                <p className="text-sm font-bold uppercase tracking-widest">Enter details to see result</p>
                            </div>
                        )}
                    </div>

                    {/* Category List */}
                    <div className="glass-card p-8 space-y-6">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest px-2">
                            {standard === "asian" ? "Asian" : "Global"} Standards
                        </h4>
                        <div className="space-y-3">
                            {(standard === "asian" ? ASIAN_CATEGORIES : GLOBAL_CATEGORIES).map((cat) => (
                                <div
                                    key={cat.label}
                                    className={cn(
                                        "flex items-center justify-between p-4 rounded-2xl border transition-all duration-300",
                                        category?.label === cat.label
                                            ? "glass bg-white/10 border-white/20 shadow-xl scale-[1.05] z-10"
                                            : "border-transparent opacity-40 grayscale-[0.5]"
                                    )}
                                >
                                    <span className={cn("font-black", cat.color)}>{cat.label}</span>
                                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{cat.range}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
