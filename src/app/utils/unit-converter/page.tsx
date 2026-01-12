"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRightLeft } from "lucide-react";
import Link from "next/link";

type UnitCategory = "length" | "weight" | "temperature" | "data";

const categories: Record<UnitCategory, string[]> = {
    length: ["Meters", "Kilometers", "Centimeters", "Millimeters", "Inches", "Feet", "Yards", "Miles"],
    weight: ["Kilograms", "Grams", "Milligrams", "Pounds", "Ounces"],
    temperature: ["Celsius", "Fahrenheit", "Kelvin"],
    data: ["Bytes", "Kilobytes", "Megabytes", "Gigabytes", "Terabytes"],
};

const conversions: Record<string, number> = {
    // Length (base: Meters)
    Meters: 1,
    Kilometers: 0.001,
    Centimeters: 100,
    Millimeters: 1000,
    Inches: 39.3701,
    Feet: 3.28084,
    Yards: 1.09361,
    Miles: 0.000621371,

    // Weight (base: Grams)
    Grams: 1,
    Kilograms: 0.001,
    Milligrams: 1000,
    Pounds: 0.00220462,
    Ounces: 0.035274,

    // Data (base: Bytes)
    Bytes: 1,
    Kilobytes: 1 / 1024,
    Megabytes: 1 / (1024 * 1024),
    Gigabytes: 1 / (1024 * 1024 * 1024),
    Terabytes: 1 / (1024 * 1024 * 1024 * 1024),
};

export default function UnitConverterPage() {
    const [category, setCategory] = useState<UnitCategory>("length");
    const [fromUnit, setFromUnit] = useState(categories.length[0]);
    const [toUnit, setToUnit] = useState(categories.length[1]);
    const [amount, setAmount] = useState<number | "">("");
    const [result, setResult] = useState<number | "">("");

    useEffect(() => {
        setFromUnit(categories[category][0]);
        setToUnit(categories[category][1]);
        setAmount("");
        setResult("");
    }, [category]);

    useEffect(() => {
        if (amount === "" || isNaN(Number(amount))) {
            setResult("");
            return;
        }

        const val = Number(amount);
        let res = 0;

        if (category === "temperature") {
            if (fromUnit === toUnit) res = val;
            else if (fromUnit === "Celsius" && toUnit === "Fahrenheit") res = (val * 9 / 5) + 32;
            else if (fromUnit === "Celsius" && toUnit === "Kelvin") res = val + 273.15;
            else if (fromUnit === "Fahrenheit" && toUnit === "Celsius") res = (val - 32) * 5 / 9;
            else if (fromUnit === "Fahrenheit" && toUnit === "Kelvin") res = (val - 32) * 5 / 9 + 273.15;
            else if (fromUnit === "Kelvin" && toUnit === "Celsius") res = val - 273.15;
            else if (fromUnit === "Kelvin" && toUnit === "Fahrenheit") res = (val - 273.15) * 9 / 5 + 32;
        } else {
            // Linear conversion
            const baseValue = val / conversions[fromUnit];
            res = baseValue * conversions[toUnit];
        }

        setResult(Number(res.toFixed(6))); // Limit decimals
    }, [amount, fromUnit, toUnit, category]);

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/utils" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Unit Converter</h1>
                    <p className="text-zinc-400">Convert between common units of measurement.</p>
                </div>
            </div>

            <div className="glass-card p-8 space-y-8">
                {/* Category Selector */}
                <div className="flex p-1 bg-zinc-900/50 rounded-xl border border-white/5">
                    {(Object.keys(categories) as UnitCategory[]).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${category === cat
                                ? "bg-zinc-800 text-white shadow-sm"
                                : "text-zinc-500 hover:text-zinc-300"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                    {/* From */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-500 uppercase">From</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                            placeholder="0"
                            className="w-full bg-zinc-950/50 border border-white/10 rounded-lg px-4 py-3 text-zinc-100 text-lg focus:outline-none focus:border-blue-500/50 transition-all"
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none"
                        >
                            {categories[category].map((u) => (
                                <option key={u} value={u}>{u}</option>
                            ))}
                        </select>
                    </div>

                    <div className="text-zinc-600 pt-6">
                        <ArrowRightLeft size={24} />
                    </div>

                    {/* To */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-500 uppercase">To</label>
                        <div className="w-full bg-zinc-900/30 border border-white/5 rounded-lg px-4 py-3 text-zinc-100 text-lg min-h-[54px] flex items-center">
                            {result}
                        </div>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none"
                        >
                            {categories[category].map((u) => (
                                <option key={u} value={u}>{u}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
