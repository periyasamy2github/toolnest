"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Calculator, ArrowRight, RotateCcw, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type EquationType = "linear" | "quadratic";

export default function EquationSolver() {
    const [type, setType] = useState<EquationType>("linear");

    // Linear: ax + b = 0
    const [la, setLa] = useState("");
    const [lb, setLb] = useState("");

    // Quadratic: ax² + bx + c = 0
    const [qa, setQa] = useState("");
    const [qb, setQb] = useState("");
    const [qc, setQc] = useState("");

    const [result, setResult] = useState<{
        x1?: number | string;
        x2?: number | string;
        steps: string[];
    } | null>(null);

    const solveLinear = () => {
        const a = parseFloat(la);
        const b = parseFloat(lb);

        if (isNaN(a) || isNaN(b)) return;
        if (a === 0) {
            setResult({ steps: ["Coefficient 'a' cannot be zero for a linear equation."] });
            return;
        }

        const x = -b / a;
        setResult({
            x1: x,
            steps: [
                `Equation: ${a}x + ${b} = 0`,
                `Subtract ${b} from both sides: ${a}x = ${-b}`,
                `Divide by ${a}: x = ${-b} / ${a}`,
                `x = ${x}`
            ]
        });
    };

    const solveQuadratic = () => {
        const a = parseFloat(qa);
        const b = parseFloat(qb);
        const c = parseFloat(qc);

        if (isNaN(a) || isNaN(b) || isNaN(c)) return;
        if (a === 0) {
            setResult({ steps: ["Coefficient 'a' cannot be zero for a quadratic equation."] });
            return;
        }

        const discriminant = b * b - 4 * a * c;
        const steps = [
            `Equation: ${a}x² + ${b}x + ${c} = 0`,
            `Discriminant (Δ) = b² - 4ac`,
            `Δ = (${b})² - 4(${a})(${c})`,
            `Δ = ${b * b} - ${4 * a * c}`,
            `Δ = ${discriminant}`
        ];

        if (discriminant > 0) {
            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            steps.push(
                `Discriminant is positive, two real roots exist.`,
                `x = (-b ± √Δ) / 2a`,
                `x1 = (${-b} + ${Math.sqrt(discriminant).toFixed(4)}) / ${2 * a} = ${x1.toFixed(4)}`,
                `x2 = (${-b} - ${Math.sqrt(discriminant).toFixed(4)}) / ${2 * a} = ${x2.toFixed(4)}`
            );
            setResult({ x1, x2, steps });
        } else if (discriminant === 0) {
            const x = -b / (2 * a);
            steps.push(
                `Discriminant is zero, one real root exists.`,
                `x = -b / 2a`,
                `x = ${-b} / ${2 * a} = ${x.toFixed(4)}`
            );
            setResult({ x1: x, steps });
        } else {
            const real = -b / (2 * a);
            const imag = Math.sqrt(-discriminant) / (2 * a);
            steps.push(
                `Discriminant is negative, two complex roots exist.`,
                `x = (-b ± i√|Δ|) / 2a`,
                `x1 = ${real.toFixed(4)} + ${imag.toFixed(4)}i`,
                `x2 = ${real.toFixed(4)} - ${imag.toFixed(4)}i`
            );
            setResult({
                x1: `${real.toFixed(4)} + ${imag.toFixed(4)}i`,
                x2: `${real.toFixed(4)} - ${imag.toFixed(4)}i`,
                steps
            });
        }
    };

    const reset = () => {
        setLa("");
        setLb("");
        setQa("");
        setQb("");
        setQc("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Equation <span className="text-orange-500">Solver</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Solve Linear and Quadratic equations with step-by-step solutions.
                </p>
            </div>

            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => { setType("linear"); reset(); }}
                    className={cn(
                        "px-6 py-3 rounded-xl font-medium transition-colors",
                        type === "linear"
                            ? "bg-orange-500 text-white"
                            : "bg-zinc-900 text-zinc-400 hover:text-white"
                    )}
                >
                    Linear (ax + b = 0)
                </button>
                <button
                    onClick={() => { setType("quadratic"); reset(); }}
                    className={cn(
                        "px-6 py-3 rounded-xl font-medium transition-colors",
                        type === "quadratic"
                            ? "bg-orange-500 text-white"
                            : "bg-zinc-900 text-zinc-400 hover:text-white"
                    )}
                >
                    Quadratic (ax² + bx + c = 0)
                </button>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                {type === "linear" ? (
                    <div className="grid md:grid-cols-2 gap-8 items-end">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Coefficient a</label>
                            <input
                                type="number"
                                value={la}
                                onChange={(e) => setLa(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                                placeholder="2"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Constant b</label>
                            <input
                                type="number"
                                value={lb}
                                onChange={(e) => setLb(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                                placeholder="-4"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8 items-end">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Coefficient a</label>
                            <input
                                type="number"
                                value={qa}
                                onChange={(e) => setQa(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                                placeholder="1"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Coefficient b</label>
                            <input
                                type="number"
                                value={qb}
                                onChange={(e) => setQb(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                                placeholder="-5"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Constant c</label>
                            <input
                                type="number"
                                value={qc}
                                onChange={(e) => setQc(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                                placeholder="6"
                            />
                        </div>
                    </div>
                )}

                <div className="flex gap-4">
                    <button
                        onClick={type === "linear" ? solveLinear : solveQuadratic}
                        className="flex-1 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                    >
                        Solve Equation <ArrowRight size={20} />
                    </button>
                    <button
                        onClick={reset}
                        className="px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-colors"
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>

                {result && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
                            <h3 className="text-sm font-medium text-orange-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Check size={16} /> Solution
                            </h3>
                            <div className="flex flex-col md:flex-row gap-8">
                                {result.x1 !== undefined && (
                                    <div className="text-4xl font-black text-white font-mono">
                                        x₁ = {typeof result.x1 === 'number' ? Number.isInteger(result.x1) ? result.x1 : result.x1.toFixed(4) : result.x1}
                                    </div>
                                )}
                                {result.x2 !== undefined && (
                                    <div className="text-4xl font-black text-white font-mono">
                                        x₂ = {typeof result.x2 === 'number' ? Number.isInteger(result.x2) ? result.x2 : result.x2.toFixed(4) : result.x2}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 space-y-4">
                            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                                <AlertCircle size={16} /> Steps
                            </h3>
                            <div className="space-y-2 font-mono text-sm text-zinc-300">
                                {result.steps.map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <span className="text-zinc-600 select-none">{i + 1}.</span>
                                        <span>{step}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
