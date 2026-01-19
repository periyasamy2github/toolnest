"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Calculator, Plus, Minus, X, Divide, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Fraction = { num: string; den: string };

export default function FractionCalculator() {
    const [f1, setF1] = useState<Fraction>({ num: "", den: "" });
    const [f2, setF2] = useState<Fraction>({ num: "", den: "" });
    const [op, setOp] = useState<"+" | "-" | "*" | "/">("+");
    const [result, setResult] = useState<Fraction | null>(null);
    const [steps, setSteps] = useState<string[]>([]);

    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
    };

    const calculate = () => {
        const n1 = parseInt(f1.num);
        const d1 = parseInt(f1.den);
        const n2 = parseInt(f2.num);
        const d2 = parseInt(f2.den);

        if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) return;

        let resNum = 0;
        let resDen = 0;
        const newSteps = [];

        switch (op) {
            case "+":
                resNum = n1 * d2 + n2 * d1;
                resDen = d1 * d2;
                newSteps.push(`(${n1} × ${d2}) + (${n2} × ${d1}) / (${d1} × ${d2})`);
                break;
            case "-":
                resNum = n1 * d2 - n2 * d1;
                resDen = d1 * d2;
                newSteps.push(`(${n1} × ${d2}) - (${n2} × ${d1}) / (${d1} × ${d2})`);
                break;
            case "*":
                resNum = n1 * n2;
                resDen = d1 * d2;
                newSteps.push(`${n1} × ${n2} / ${d1} × ${d2}`);
                break;
            case "/":
                resNum = n1 * d2;
                resDen = d1 * n2;
                newSteps.push(`${n1} × ${d2} / ${d1} × ${n2}`);
                break;
        }

        newSteps.push(`= ${resNum} / ${resDen}`);

        // Simplify
        const common = Math.abs(gcd(resNum, resDen));
        if (common > 1) {
            resNum /= common;
            resDen /= common;
            newSteps.push(`Simplify by dividing both by ${common}`);
            newSteps.push(`= ${resNum} / ${resDen}`);
        }

        // Handle negative denominator
        if (resDen < 0) {
            resNum = -resNum;
            resDen = -resDen;
        }

        setResult({ num: resNum.toString(), den: resDen.toString() });
        setSteps(newSteps);
    };

    const reset = () => {
        setF1({ num: "", den: "" });
        setF2({ num: "", den: "" });
        setResult(null);
        setSteps([]);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Fraction <span className="text-orange-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Add, subtract, multiply, and divide fractions with steps.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                    {/* Fraction 1 */}
                    <div className="flex flex-col gap-2 w-24">
                        <input
                            type="number"
                            value={f1.num}
                            onChange={(e) => setF1({ ...f1, num: e.target.value })}
                            className="bg-zinc-950 border border-white/10 rounded-xl p-3 text-center text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                            placeholder="Num"
                        />
                        <div className="h-0.5 bg-white/20 w-full" />
                        <input
                            type="number"
                            value={f1.den}
                            onChange={(e) => setF1({ ...f1, den: e.target.value })}
                            className="bg-zinc-950 border border-white/10 rounded-xl p-3 text-center text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                            placeholder="Den"
                        />
                    </div>

                    {/* Operator */}
                    <div className="flex gap-2 bg-zinc-950 p-1 rounded-xl border border-white/10">
                        {[
                            { val: "+", icon: Plus },
                            { val: "-", icon: Minus },
                            { val: "*", icon: X },
                            { val: "/", icon: Divide },
                        ].map((o) => (
                            <button
                                key={o.val}
                                onClick={() => setOp(o.val as any)}
                                className={cn(
                                    "p-3 rounded-lg transition-colors",
                                    op === o.val
                                        ? "bg-orange-500 text-white"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <o.icon size={20} />
                            </button>
                        ))}
                    </div>

                    {/* Fraction 2 */}
                    <div className="flex flex-col gap-2 w-24">
                        <input
                            type="number"
                            value={f2.num}
                            onChange={(e) => setF2({ ...f2, num: e.target.value })}
                            className="bg-zinc-950 border border-white/10 rounded-xl p-3 text-center text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                            placeholder="Num"
                        />
                        <div className="h-0.5 bg-white/20 w-full" />
                        <input
                            type="number"
                            value={f2.den}
                            onChange={(e) => setF2({ ...f2, den: e.target.value })}
                            className="bg-zinc-950 border border-white/10 rounded-xl p-3 text-center text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                            placeholder="Den"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={calculate}
                            className="p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors shadow-lg shadow-orange-500/20"
                        >
                            <ArrowRight size={24} />
                        </button>
                        <button
                            onClick={reset}
                            className="p-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-colors"
                        >
                            <RotateCcw size={24} />
                        </button>
                    </div>

                    {/* Result */}
                    {result && (
                        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left duration-500">
                            <span className="text-2xl font-bold text-white">=</span>
                            <div className="flex flex-col gap-2 w-24">
                                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 text-center text-2xl font-bold text-orange-400">
                                    {result.num}
                                </div>
                                <div className="h-0.5 bg-orange-500/30 w-full" />
                                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 text-center text-2xl font-bold text-orange-400">
                                    {result.den}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Steps */}
                {steps.length > 0 && (
                    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white">Calculation Steps</h3>
                        <div className="space-y-2">
                            {steps.map((step, i) => (
                                <div key={i} className="flex items-center gap-3 text-zinc-400 font-mono">
                                    <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center text-xs border border-white/10">
                                        {i + 1}
                                    </div>
                                    {step}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
