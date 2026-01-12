"use client";

import { useState } from "react";
import { ArrowLeft, Calculator, Search, Plus, Trash2, Info } from "lucide-react";
import Link from "next/link";
import indianFoodDatabase from "@/data/indianFoodDatabase";

// Static Food Database (Indian-focused & Generic)
const foodDatabase = [
    { name: "Rice (Cooked)", unit: "cup", calories: 205, protein: 4.3, carbs: 44.5, fat: 0.4 },
    { name: "Roti / Chapati", unit: "piece", calories: 104, protein: 3.1, carbs: 17, fat: 3.7 },
    { name: "Dal (Cooked)", unit: "cup", calories: 198, protein: 12, carbs: 28, fat: 4 },
    { name: "Chicken Curry", unit: "cup", calories: 243, protein: 22, carbs: 8, fat: 14 },
    { name: "Egg (Boiled)", unit: "piece", calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3 },
    { name: "Banana", unit: "piece", calories: 105, protein: 1.3, carbs: 27, fat: 0.3 },
    { name: "Apple", unit: "piece", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { name: "Milk (Whole)", unit: "cup", calories: 149, protein: 8, carbs: 12, fat: 8 },
    { name: "Tea (with sugar/milk)", unit: "cup", calories: 45, protein: 1, carbs: 8, fat: 1 },
    { name: "Idli", unit: "piece", calories: 39, protein: 2, carbs: 8, fat: 0 },
    { name: "Dosa (Plain)", unit: "piece", calories: 133, protein: 4, carbs: 23, fat: 3 },
    { name: "Paneer (Raw)", unit: "100g", calories: 265, protein: 18, carbs: 1.2, fat: 20.8 },
    { name: "Curd / Yogurt", unit: "cup", calories: 142, protein: 11, carbs: 15, fat: 4 },
];

export default function CaloriesCalculatorPage() {
    // BMR State
    const [age, setAge] = useState<number | "">("");
    const [gender, setGender] = useState<"male" | "female">("male");
    const [weight, setWeight] = useState<number | "">("");
    const [height, setHeight] = useState<number | "">("");
    const [activity, setActivity] = useState<number>(1.2);
    const [goal, setGoal] = useState<"loss" | "maintain" | "gain">("maintain");
    const [dailyCalories, setDailyCalories] = useState<number | null>(null);

    // Food Tracker State
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFoods, setSelectedFoods] = useState<any[]>([]);

    const calculateBMR = () => {
        if (!age || !weight || !height) return;

        // Mifflin-St Jeor Equation
        let bmr = 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age);
        bmr = gender === "male" ? bmr + 5 : bmr - 161;

        let tdee = bmr * activity;

        if (goal === "loss") tdee -= 500;
        if (goal === "gain") tdee += 500;

        setDailyCalories(Math.round(tdee));
    };

    const addFood = (food: any) => {
        setSelectedFoods([...selectedFoods, { ...food, id: Date.now() }]);
        setSearchTerm("");
    };

    const removeFood = (id: number) => {
        setSelectedFoods(selectedFoods.filter(f => f.id !== id));
    };

    const totalFoodCalories = selectedFoods.reduce((sum, item) => sum + item.calories, 0);

    const filteredFoods = foodDatabase.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/health" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Calories Calculator</h1>
                    <p className="text-zinc-400">Calculate your daily needs and track your food.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* BMR Calculator Section */}
                <div className="glass-card p-6 space-y-6">
                    <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                        <Calculator size={20} className="text-green-400" />
                        Daily Needs Calculator
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-400">Gender</label>
                            <div className="flex bg-zinc-900/50 rounded-lg p-1">
                                <button
                                    onClick={() => setGender("male")}
                                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${gender === "male" ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                                >
                                    Male
                                </button>
                                <button
                                    onClick={() => setGender("female")}
                                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${gender === "female" ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                                >
                                    Female
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-400">Age (years)</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(Number(e.target.value))}
                                className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-green-500"
                                placeholder="25"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-400">Height (cm)</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(Number(e.target.value))}
                                className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-green-500"
                                placeholder="175"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-zinc-400">Weight (kg)</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(Number(e.target.value))}
                                className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-green-500"
                                placeholder="70"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-zinc-400">Activity Level</label>
                        <select
                            value={activity}
                            onChange={(e) => setActivity(Number(e.target.value))}
                            className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-green-500"
                        >
                            <option value={1.2}>Sedentary (Little or no exercise)</option>
                            <option value={1.375}>Lightly active (1-3 days/week)</option>
                            <option value={1.55}>Moderately active (3-5 days/week)</option>
                            <option value={1.725}>Very active (6-7 days/week)</option>
                            <option value={1.9}>Super active (Physical job)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-zinc-400">Goal</label>
                        <select
                            value={goal}
                            onChange={(e) => setGoal(e.target.value as any)}
                            className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-green-500"
                        >
                            <option value="loss">Weight Loss (-500 cal)</option>
                            <option value="maintain">Maintain Weight</option>
                            <option value="gain">Weight Gain (+500 cal)</option>
                        </select>
                    </div>

                    <button
                        onClick={calculateBMR}
                        className="w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                        Calculate Daily Needs
                    </button>

                    {dailyCalories && (
                        <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center">
                            <p className="text-zinc-400 text-sm mb-1">Recommended Daily Intake</p>
                            <p className="text-3xl font-bold text-green-400">{dailyCalories} kcal</p>
                        </div>
                    )}
                </div>

                {/* Food Tracker Section */}
                <div className="space-y-6">
                    <div className="glass-card p-6 space-y-6 h-full flex flex-col">
                        <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                            <Search size={20} className="text-blue-400" />
                            Food Calories Search
                        </h2>

                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-zinc-100 focus:outline-none focus:border-blue-500"
                                placeholder="Search food (e.g., Rice, Apple)..."
                            />
                            <Search className="absolute left-3 top-2.5 text-zinc-500" size={18} />

                            {searchTerm && (
                                <div className="absolute z-10 w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                                    {filteredFoods.length > 0 ? (
                                        filteredFoods.map((food, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => addFood(food)}
                                                className="w-full text-left px-4 py-3 hover:bg-zinc-800 flex items-center justify-between group"
                                            >
                                                <div>
                                                    <p className="text-zinc-200 font-medium">{food.name}</p>
                                                    <p className="text-xs text-zinc-500">{food.calories} kcal / {food.unit}</p>
                                                </div>
                                                <Plus size={18} className="text-zinc-500 group-hover:text-green-400" />
                                            </button>
                                        ))
                                    ) : (
                                        <div className="p-4 text-center text-zinc-500 text-sm">No food found</div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 min-h-[200px]">
                            {selectedFoods.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                                    <Info size={32} className="mb-2 opacity-50" />
                                    <p>Add foods to see total calories</p>
                                </div>
                            ) : (
                                selectedFoods.map((food) => (
                                    <div key={food.id} className="bg-zinc-900/30 border border-white/5 rounded-lg p-3 flex items-center justify-between">
                                        <div>
                                            <p className="text-zinc-200 font-medium">{food.name}</p>
                                            <div className="flex gap-3 text-xs text-zinc-500">
                                                <span>{food.calories} kcal</span>
                                                <span>P: {food.protein}g</span>
                                                <span>C: {food.carbs}g</span>
                                                <span>F: {food.fat}g</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFood(food.id)}
                                            className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-zinc-600 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="border-t border-white/10 pt-4">
                            <div className="flex justify-between items-center text-lg font-semibold">
                                <span className="text-zinc-300">Total Calories</span>
                                <span className="text-blue-400">{totalFoodCalories} kcal</span>
                            </div>
                            {dailyCalories && (
                                <div className="mt-2">
                                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${totalFoodCalories > dailyCalories ? "bg-red-500" : "bg-blue-500"}`}
                                            style={{ width: `${Math.min((totalFoodCalories / dailyCalories) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-center mt-1 text-zinc-500">
                                        {Math.round((totalFoodCalories / dailyCalories) * 100)}% of daily goal
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
