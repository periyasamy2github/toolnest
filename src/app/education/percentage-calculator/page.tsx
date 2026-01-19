"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Calculator, Percent, ArrowRight, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PercentageCalculator() {
    const [values, setValues] = useState({
        whatIs: { x: "", y: "", result: "" },
        isWhatPercent: { x: "", y: "", result: "" },
        increaseDecrease: { x: "", y: "", result: "" }
    });

    const calculate = (type: keyof typeof values) => {
        const x = parseFloat(values[type].x);
        const y = parseFloat(values[type].y);

        if (isNaN(x) || isNaN(y)) return;

        let result = 0;
        switch (type) {
            case "whatIs":
                result = (x / 100) * y;
                break;
            case "isWhatPercent":
                result = (x / y) * 100;
                break;
            case "increaseDecrease":
                result = ((y - x) / x) * 100;
                break;
        }

        setValues(prev => ({
            ...prev,
            [type]: { ...prev[type], result: result.toFixed(2) }
        }));
    };

    const handleChange = (type: keyof typeof values, field: "x" | "y", value: string) => {
        setValues(prev => ({
            ...prev,
            [type]: { ...prev[type], [field]: value, result: "" }
        }));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Percentage <span className="text-blue-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate percentages, increases, and decreases easily.
                </p>
            </div>

            <div className="grid gap-6">
                {/* What is X% of Y? */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Percent size={20} className="text-blue-400" />
                        What is X% of Y?
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex items-center gap-2 w-full">
                            <span className="text-zinc-400 font-medium">What is</span>
                            <input
                                type="number"
                                value={values.whatIs.x}
                                onChange={(e) => handleChange("whatIs", "x", e.target.value)}
                                className="flex-1 bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                                placeholder="X"
                            />
                            <span className="text-zinc-400 font-medium">% of</span>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <input
                                type="number"
                                value={values.whatIs.y}
                                onChange={(e) => handleChange("whatIs", "y", e.target.value)}
                                className="flex-1 bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                                placeholder="Y"
                            />
                            <button
                                onClick={() => calculate("whatIs")}
                                className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                        {values.whatIs.result && (
                            <div className="w-full md:w-auto min-w-[120px] bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
                                <span className="text-2xl font-bold text-blue-400">{values.whatIs.result}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* X is what % of Y? */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Percent size={20} className="text-green-400" />
                        X is what % of Y?
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex items-center gap-2 w-full">
                            <input
                                type="number"
                                value={values.isWhatPercent.x}
                                onChange={(e) => handleChange("isWhatPercent", "x", e.target.value)}
                                className="flex-1 bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-green-500/50 outline-none"
                                placeholder="X"
                            />
                            <span className="text-zinc-400 font-medium">is what % of</span>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <input
                                type="number"
                                value={values.isWhatPercent.y}
                                onChange={(e) => handleChange("isWhatPercent", "y", e.target.value)}
                                className="flex-1 bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-green-500/50 outline-none"
                                placeholder="Y"
                            />
                            <button
                                onClick={() => calculate("isWhatPercent")}
                                className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                        {values.isWhatPercent.result && (
                            <div className="w-full md:w-auto min-w-[120px] bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
                                <span className="text-2xl font-bold text-green-400">{values.isWhatPercent.result}%</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Percentage Change */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Percent size={20} className="text-purple-400" />
                        Percentage Change (Increase/Decrease)
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="flex items-center gap-2 w-full">
                            <span className="text-zinc-400 font-medium">From</span>
                            <input
                                type="number"
                                value={values.increaseDecrease.x}
                                onChange={(e) => handleChange("increaseDecrease", "x", e.target.value)}
                                className="flex-1 bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500/50 outline-none"
                                placeholder="Old Value"
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <span className="text-zinc-400 font-medium">To</span>
                            <input
                                type="number"
                                value={values.increaseDecrease.y}
                                onChange={(e) => handleChange("increaseDecrease", "y", e.target.value)}
                                className="flex-1 bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500/50 outline-none"
                                placeholder="New Value"
                            />
                            <button
                                onClick={() => calculate("increaseDecrease")}
                                className="p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                        {values.increaseDecrease.result && (
                            <div className="w-full md:w-auto min-w-[120px] bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 text-center">
                                <span className={cn(
                                    "text-2xl font-bold",
                                    parseFloat(values.increaseDecrease.result) > 0 ? "text-green-400" : "text-red-400"
                                )}>
                                    {parseFloat(values.increaseDecrease.result) > 0 ? "+" : ""}
                                    {values.increaseDecrease.result}%
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
