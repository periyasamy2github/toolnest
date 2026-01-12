"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Dumbbell, RefreshCw, TrendingDown, TrendingUp, Minus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FitnessAgeCalculator() {
    const [age, setAge] = useState<string>("");
    const [gender, setGender] = useState<"male" | "female">("male");
    const [height, setHeight] = useState<string>("");
    const [weight, setWeight] = useState<string>("");
    const [activityLevel, setActivityLevel] = useState<string>("moderate");
    const [workoutDays, setWorkoutDays] = useState<number>(3);
    const [sleepHours, setSleepHours] = useState<number>(7);
    const [smoking, setSmoking] = useState<boolean>(false);
    const [alcohol, setAlcohol] = useState<boolean>(false);

    const [fitnessAge, setFitnessAge] = useState<number | null>(null);
    const [message, setMessage] = useState<string>("");

    const calculateFitnessAge = () => {
        const ageNum = parseFloat(age);
        const heightNum = parseFloat(height);
        const weightNum = parseFloat(weight);

        if (!ageNum || !heightNum || !weightNum || ageNum < 18 || ageNum > 100) {
            setFitnessAge(null);
            return;
        }

        // Calculate BMI
        const heightM = heightNum / 100;
        const bmi = weightNum / (heightM * heightM);

        // Start with actual age
        let calculatedAge = ageNum;

        // BMI adjustment
        if (bmi < 18.5) calculatedAge += 2;
        else if (bmi >= 18.5 && bmi < 25) calculatedAge -= 2;
        else if (bmi >= 25 && bmi < 30) calculatedAge += 3;
        else calculatedAge += 5;

        // Activity level adjustment
        if (activityLevel === "sedentary") calculatedAge += 5;
        else if (activityLevel === "light") calculatedAge += 2;
        else if (activityLevel === "moderate") calculatedAge -= 1;
        else if (activityLevel === "active") calculatedAge -= 3;
        else if (activityLevel === "very_active") calculatedAge -= 5;

        // Workout days adjustment
        if (workoutDays >= 5) calculatedAge -= 4;
        else if (workoutDays >= 3) calculatedAge -= 2;
        else if (workoutDays === 0) calculatedAge += 3;

        // Sleep adjustment
        if (sleepHours >= 7 && sleepHours <= 9) calculatedAge -= 2;
        else if (sleepHours < 6) calculatedAge += 4;
        else if (sleepHours > 10) calculatedAge += 2;

        // Lifestyle habits
        if (smoking) calculatedAge += 8;
        if (alcohol) calculatedAge += 3;

        // Ensure bounds
        calculatedAge = Math.max(18, Math.min(100, Math.round(calculatedAge)));

        setFitnessAge(calculatedAge);

        // Generate message
        const diff = calculatedAge - ageNum;
        if (diff < -5) {
            setMessage("Excellent! Your fitness age is significantly younger than your actual age. Keep up the great work!");
        } else if (diff < 0) {
            setMessage("Great! Your fitness age is younger than your actual age. You're on the right track!");
        } else if (diff === 0) {
            setMessage("Your fitness age matches your actual age. There's room for improvement!");
        } else if (diff <= 5) {
            setMessage("Your fitness age is slightly higher than your actual age. Consider improving your lifestyle habits.");
        } else {
            setMessage("Your fitness age is notably higher than your actual age. Focus on regular exercise and healthy habits.");
        }
    };

    useEffect(() => {
        calculateFitnessAge();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [age, gender, height, weight, activityLevel, workoutDays, sleepHours, smoking, alcohol]);

    const reset = () => {
        setAge("");
        setHeight("");
        setWeight("");
        setActivityLevel("moderate");
        setWorkoutDays(3);
        setSleepHours(7);
        setSmoking(false);
        setAlcohol(false);
        setFitnessAge(null);
        setMessage("");
    };

    const ageDiff = fitnessAge && age ? fitnessAge - parseFloat(age) : 0;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/health" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Fitness Age Calculator</h1>
                    <p className="text-zinc-400">Discover your fitness age based on your lifestyle and health metrics.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Age (years)</label>
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
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Height (cm)</label>
                                <input
                                    type="number"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    placeholder="e.g. 175"
                                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Weight (kg)</label>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="e.g. 70"
                                    className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Activity Level</label>
                            <select
                                value={activityLevel}
                                onChange={(e) => setActivityLevel(e.target.value)}
                                className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            >
                                <option value="sedentary">Sedentary (little to no exercise)</option>
                                <option value="light">Light (1-2 days/week)</option>
                                <option value="moderate">Moderate (3-5 days/week)</option>
                                <option value="active">Active (6-7 days/week)</option>
                                <option value="very_active">Very Active (intense daily)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium text-zinc-400">Weekly Workout Days</label>
                                <span className="text-sm text-blue-400 font-mono">{workoutDays} days</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="7"
                                value={workoutDays}
                                onChange={(e) => setWorkoutDays(parseInt(e.target.value))}
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
                            Reset Fields
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className={cn(
                        "glass-card p-8 text-center transition-all duration-500",
                        fitnessAge ? "border-white/20 shadow-2xl" : "opacity-50"
                    )}>
                        <div className="space-y-2 mb-6">
                            <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Fitness Age</h3>
                            <div className="text-6xl font-bold text-zinc-100">
                                {fitnessAge || "--"}
                            </div>
                            {fitnessAge && age && (
                                <div className="flex items-center justify-center gap-2 mt-4">
                                    {ageDiff < 0 ? (
                                        <TrendingDown className="text-green-400" size={20} />
                                    ) : ageDiff > 0 ? (
                                        <TrendingUp className="text-red-400" size={20} />
                                    ) : (
                                        <Minus className="text-yellow-400" size={20} />
                                    )}
                                    <span className={cn(
                                        "text-lg font-semibold",
                                        ageDiff < 0 ? "text-green-400" : ageDiff > 0 ? "text-red-400" : "text-yellow-400"
                                    )}>
                                        {ageDiff > 0 ? "+" : ""}{ageDiff} years
                                    </span>
                                </div>
                            )}
                        </div>

                        {message && (
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                {message}
                            </p>
                        )}

                        {!fitnessAge && (
                            <div className="flex flex-col items-center gap-3 text-zinc-500 py-8">
                                <Dumbbell size={48} className="opacity-20" />
                                <p className="text-sm">Enter your details</p>
                            </div>
                        )}
                    </div>

                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                        <p className="text-xs text-zinc-500 italic">
                            For informational purposes only. This is an estimate based on general health factors.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
