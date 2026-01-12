"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Hourglass, RefreshCw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LifeExpectancyCalculator() {
    const [age, setAge] = useState<string>("");
    const [gender, setGender] = useState<"male" | "female">("male");
    const [bmiCategory, setBmiCategory] = useState<string>("normal");
    const [activityLevel, setActivityLevel] = useState<string>("moderate");
    const [smoking, setSmoking] = useState<boolean>(false);
    const [alcohol, setAlcohol] = useState<boolean>(false);
    const [sleepQuality, setSleepQuality] = useState<string>("good");

    const [lifeExpectancy, setLifeExpectancy] = useState<number>(0);
    const [yearsRemaining, setYearsRemaining] = useState<number>(0);
    const [message, setMessage] = useState<string>("");

    const calculateLifeExpectancy = () => {
        const ageNum = parseFloat(age);
        if (!ageNum || ageNum < 18 || ageNum > 100) {
            setLifeExpectancy(0);
            setYearsRemaining(0);
            return;
        }

        // Base life expectancy (conservative global averages)
        let baseExpectancy = gender === "male" ? 76 : 81;

        // BMI adjustments
        if (bmiCategory === "underweight") baseExpectancy -= 3;
        else if (bmiCategory === "normal") baseExpectancy += 2;
        else if (bmiCategory === "overweight") baseExpectancy -= 2;
        else if (bmiCategory === "obese") baseExpectancy -= 5;

        // Activity level adjustments
        if (activityLevel === "sedentary") baseExpectancy -= 3;
        else if (activityLevel === "light") baseExpectancy -= 1;
        else if (activityLevel === "moderate") baseExpectancy += 2;
        else if (activityLevel === "active") baseExpectancy += 4;
        else if (activityLevel === "very_active") baseExpectancy += 5;

        // Lifestyle habits
        if (smoking) baseExpectancy -= 10;
        if (alcohol) baseExpectancy -= 2;

        // Sleep quality
        if (sleepQuality === "poor") baseExpectancy -= 3;
        else if (sleepQuality === "good") baseExpectancy += 2;
        else if (sleepQuality === "excellent") baseExpectancy += 3;

        // Ensure realistic bounds
        baseExpectancy = Math.max(ageNum + 5, Math.min(100, baseExpectancy));

        setLifeExpectancy(Math.round(baseExpectancy));
        setYearsRemaining(Math.round(baseExpectancy - ageNum));

        // Generate message
        const years = baseExpectancy - ageNum;
        if (years > 50) {
            setMessage("Excellent! Your healthy lifestyle choices are contributing to a long, fulfilling life ahead.");
        } else if (years > 30) {
            setMessage("Great! You have many wonderful years ahead. Continue maintaining your healthy habits.");
        } else if (years > 15) {
            setMessage("You have good years ahead. Consider improving lifestyle factors to extend your healthy lifespan.");
        } else {
            setMessage("Focus on improving your health habits. Small changes can make a significant difference in your quality of life.");
        }
    };

    useEffect(() => {
        calculateLifeExpectancy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [age, gender, bmiCategory, activityLevel, smoking, alcohol, sleepQuality]);

    const reset = () => {
        setAge("");
        setGender("male");
        setBmiCategory("normal");
        setActivityLevel("moderate");
        setSmoking(false);
        setAlcohol(false);
        setSleepQuality("good");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/health" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Life Expectancy Calculator</h1>
                    <p className="text-zinc-400">Estimate your life expectancy based on lifestyle and health factors.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Current Age</label>
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="e.g. 30"
                                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Gender</label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setGender("male")}
                                        className={cn(
                                            "flex-1 py-3 rounded-xl border transition-all",
                                            gender === "male"
                                                ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                                                : "bg-zinc-800/50 border-white/10 text-zinc-400"
                                        )}
                                    >
                                        Male
                                    </button>
                                    <button
                                        onClick={() => setGender("female")}
                                        className={cn(
                                            "flex-1 py-3 rounded-xl border transition-all",
                                            gender === "female"
                                                ? "bg-pink-500/10 border-pink-500/50 text-pink-400"
                                                : "bg-zinc-800/50 border-white/10 text-zinc-400"
                                        )}
                                    >
                                        Female
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">BMI Category</label>
                            <select
                                value={bmiCategory}
                                onChange={(e) => setBmiCategory(e.target.value)}
                                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            >
                                <option value="underweight">Underweight</option>
                                <option value="normal">Normal</option>
                                <option value="overweight">Overweight</option>
                                <option value="obese">Obese</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Activity Level</label>
                            <select
                                value={activityLevel}
                                onChange={(e) => setActivityLevel(e.target.value)}
                                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            >
                                <option value="sedentary">Sedentary</option>
                                <option value="light">Light</option>
                                <option value="moderate">Moderate</option>
                                <option value="active">Active</option>
                                <option value="very_active">Very Active</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Sleep Quality</label>
                            <select
                                value={sleepQuality}
                                onChange={(e) => setSleepQuality(e.target.value)}
                                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            >
                                <option value="poor">Poor</option>
                                <option value="fair">Fair</option>
                                <option value="good">Good</option>
                                <option value="excellent">Excellent</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setSmoking(!smoking)}
                                className={cn(
                                    "p-4 rounded-xl border transition-all text-left",
                                    smoking
                                        ? "bg-red-500/10 border-red-500/50"
                                        : "bg-zinc-800/50 border-white/10"
                                )}
                            >
                                <div className="text-sm font-medium text-zinc-300">Smoking</div>
                                <div className="text-xs text-zinc-500 mt-1">{smoking ? "Yes" : "No"}</div>
                            </button>
                            <button
                                onClick={() => setAlcohol(!alcohol)}
                                className={cn(
                                    "p-4 rounded-xl border transition-all text-left",
                                    alcohol
                                        ? "bg-orange-500/10 border-orange-500/50"
                                        : "bg-zinc-800/50 border-white/10"
                                )}
                            >
                                <div className="text-sm font-medium text-zinc-300">Alcohol</div>
                                <div className="text-xs text-zinc-500 mt-1">{alcohol ? "Yes" : "No"}</div>
                            </button>
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
                        <Hourglass className="mx-auto text-blue-400 mb-4" size={48} />

                        <div className="space-y-4 mb-6">
                            <div>
                                <h3 className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-2">Estimated Life Expectancy</h3>
                                <div className="text-5xl font-bold text-zinc-100">
                                    {lifeExpectancy > 0 ? lifeExpectancy : "--"}
                                </div>
                                <div className="text-sm text-zinc-500 mt-1">years old</div>
                            </div>

                            {yearsRemaining > 0 && (
                                <div className="pt-4 border-t border-white/10">
                                    <div className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Years Remaining</div>
                                    <div className="text-3xl font-bold text-blue-400">
                                        {yearsRemaining}
                                    </div>
                                </div>
                            )}
                        </div>

                        {message && (
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                {message}
                            </p>
                        )}
                    </div>

                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                        <p className="text-xs text-zinc-500 italic">
                            For informational purposes only. This is a conservative estimate based on general health factors and should not be considered medical advice.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
