"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Info, Activity, RefreshCw, User, UserPlus } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";

type UnitSystem = "metric" | "imperial";
type Gender = "male" | "female";

interface BodyFatCategory {
    label: string;
    color: string;
    maleRange: string;
    femaleRange: string;
}

const CATEGORIES: BodyFatCategory[] = [
    { label: "Essential Fat", color: "text-blue-400", maleRange: "2-5%", femaleRange: "10-13%" },
    { label: "Athletes", color: "text-green-400", maleRange: "6-13%", femaleRange: "14-20%" },
    { label: "Fitness", color: "text-emerald-400", maleRange: "14-17%", femaleRange: "21-24%" },
    { label: "Average", color: "text-yellow-400", maleRange: "18-24%", femaleRange: "25-31%" },
    { label: "Obese", color: "text-red-400", maleRange: "25%+", femaleRange: "32%+" },
];

export default function BodyFatCalculator() {
    const [unit, setUnit] = useState<UnitSystem>("metric");
    const [gender, setGender] = useState<Gender>("male");

    // Inputs
    const [weight, setWeight] = useState<string>("");
    const [height, setHeight] = useState<string>("");
    const [neck, setNeck] = useState<string>("");
    const [waist, setWaist] = useState<string>("");
    const [hip, setHip] = useState<string>(""); // For women

    const [bodyFat, setBodyFat] = useState<number | null>(null);
    const [category, setCategory] = useState<BodyFatCategory | null>(null);

    const calculateBodyFat = () => {
        let h = parseFloat(height);
        let n = parseFloat(neck);
        let w = parseFloat(waist);
        let hp = parseFloat(hip);

        if (unit === "imperial") {
            h = h * 2.54; // in to cm
            n = n * 2.54;
            w = w * 2.54;
            hp = hp * 2.54;
        }

        if (h > 0 && n > 0 && w > 0 && (gender === "male" || hp > 0)) {
            let result = 0;
            if (gender === "male") {
                // US Navy Formula for Men
                result = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
            } else {
                // US Navy Formula for Women
                result = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
            }

            if (result > 0 && result < 100) {
                setBodyFat(result);

                // Determine Category
                if (gender === "male") {
                    if (result < 6) setCategory(CATEGORIES[0]);
                    else if (result < 14) setCategory(CATEGORIES[1]);
                    else if (result < 18) setCategory(CATEGORIES[2]);
                    else if (result < 25) setCategory(CATEGORIES[3]);
                    else setCategory(CATEGORIES[4]);
                } else {
                    if (result < 14) setCategory(CATEGORIES[0]);
                    else if (result < 21) setCategory(CATEGORIES[1]);
                    else if (result < 25) setCategory(CATEGORIES[2]);
                    else if (result < 32) setCategory(CATEGORIES[3]);
                    else setCategory(CATEGORIES[4]);
                }
            } else {
                setBodyFat(null);
                setCategory(null);
            }
        } else {
            setBodyFat(null);
            setCategory(null);
        }
    };

    useEffect(() => {
        calculateBodyFat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [height, neck, waist, hip, unit, gender]);

    const reset = () => {
        setWeight("");
        setHeight("");
        setNeck("");
        setWaist("");
        setHip("");
        setBodyFat(null);
        setCategory(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <BackButton />
                <div>
                    <h1 className="text-4xl font-black text-gradient">Body Fat Calculator</h1>
                    <p className="text-zinc-400">Estimate your body fat percentage using the US Navy method.</p>
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
                                    onClick={() => setGender("male")}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                                        gender === "male" ? "bg-blue-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                                    )}
                                >
                                    <User size={16} />
                                    Male
                                </button>
                                <button
                                    onClick={() => setGender("female")}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                                        gender === "female" ? "bg-pink-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                                    )}
                                >
                                    <UserPlus size={16} />
                                    Female
                                </button>
                            </div>

                            <div className="flex bg-zinc-800/50 p-1 rounded-xl border border-white/5">
                                <button
                                    onClick={() => setUnit("metric")}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                        unit === "metric" ? "bg-zinc-700 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                                    )}
                                >
                                    Metric (cm)
                                </button>
                                <button
                                    onClick={() => setUnit("imperial")}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                        unit === "imperial" ? "bg-zinc-700 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                                    )}
                                >
                                    Imperial (in)
                                </button>
                            </div>
                        </div>

                        {/* Input Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Height ({unit === "metric" ? "cm" : "in"})</label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    placeholder={unit === "metric" ? "e.g. 175" : "e.g. 69"}
                                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Neck ({unit === "metric" ? "cm" : "in"})</label>
                                <input
                                    type="number"
                                    value={neck}
                                    onChange={(e) => setNeck(e.target.value)}
                                    placeholder={unit === "metric" ? "e.g. 38" : "e.g. 15"}
                                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Waist ({unit === "metric" ? "cm" : "in"})</label>
                                <input
                                    type="number"
                                    value={waist}
                                    onChange={(e) => setWaist(e.target.value)}
                                    placeholder={unit === "metric" ? "e.g. 85" : "e.g. 33"}
                                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                            {gender === "female" && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Hip ({unit === "metric" ? "cm" : "in"})</label>
                                    <input
                                        type="number"
                                        value={hip}
                                        onChange={(e) => setHip(e.target.value)}
                                        placeholder={unit === "metric" ? "e.g. 95" : "e.g. 37"}
                                        className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    />
                                </div>
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
                                <h3 className="text-zinc-100 font-medium">How it works</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    The <span className="text-blue-400 font-medium">US Navy method</span> uses height and circumference measurements to estimate body fat. While not as accurate as a DEXA scan, it provides a reliable estimate for tracking progress.
                                </p>
                                <p className="text-xs text-zinc-500 italic">
                                    Tip: Measure at the narrowest part of the neck, the widest part of the hips (for women), and at the navel for the waist.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-6">
                    <div className={cn(
                        "bg-zinc-900/50 border rounded-2xl p-8 text-center transition-all duration-500",
                        bodyFat ? "border-white/20 shadow-2xl" : "border-white/10 opacity-50"
                    )}>
                        <div className="space-y-2 mb-6">
                            <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Body Fat</h3>
                            <div className="text-6xl font-bold text-zinc-100">
                                {bodyFat ? `${bodyFat.toFixed(1)}%` : "--.-%"}
                            </div>
                        </div>

                        {category && (
                            <div className="space-y-4">
                                <div className={cn("text-xl font-semibold", category.color)}>
                                    {category.label}
                                </div>
                                <div className="text-sm text-zinc-500">
                                    {gender === "male" ? `Male Range: ${category.maleRange}` : `Female Range: ${category.femaleRange}`}
                                </div>
                            </div>
                        )}

                        {!bodyFat && (
                            <div className="flex flex-col items-center gap-3 text-zinc-500 py-8">
                                <Activity size={48} className="opacity-20" />
                                <p className="text-sm">Enter your measurements</p>
                            </div>
                        )}
                    </div>

                    {/* Category List */}
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                        <h4 className="text-zinc-100 font-medium text-sm">Body Fat Categories ({gender === "male" ? "Male" : "Female"})</h4>
                        <div className="space-y-3">
                            {CATEGORIES.map((cat) => (
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
                                    <span className="text-xs text-zinc-400">
                                        {gender === "male" ? cat.maleRange : cat.femaleRange}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
