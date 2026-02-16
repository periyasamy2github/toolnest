"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Hash, Plus, Minus, X, Divide, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function HexCalculator() {
    const [h1, setH1] = useState("");
    const [h2, setH2] = useState("");
    const [op, setOp] = useState<"+" | "-" | "*" | "/">("+");
    const [result, setResult] = useState<{ hex: string; decimal: number; binary: string } | null>(null);

    const handleInput = (val: string, setter: (v: string) => void) => {
        if (/^[0-9A-Fa-f]*$/.test(val)) {
            setter(val.toUpperCase());
        }
    };

    const calculate = () => {
        if (!h1 || !h2) return;

        const n1 = parseInt(h1, 16);
        const n2 = parseInt(h2, 16);
        let res = 0;

        switch (op) {
            case "+": res = n1 + n2; break;
            case "-": res = n1 - n2; break;
            case "*": res = n1 * n2; break;
            case "/": res = Math.floor(n1 / n2); break;
        }

        setResult({
            hex: res.toString(16).toUpperCase(),
            decimal: res,
            binary: res.toString(2)
        });
    };

    const reset = () => {
        setH1("");
        setH2("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Hex <span className="text-purple-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Perform arithmetic operations on hexadecimal numbers.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <div className="grid md:grid-cols-[1fr,auto,1fr] gap-8 items-center mb-8">
                    {/* Hex 1 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Hex 1</label>
                        <input
                            type="text"
                            value={h1}
                            onChange={(e) => handleInput(e.target.value, setH1)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500/50 outline-none font-mono text-xl"
                            placeholder="1A"
                        />
                        <div className="text-xs text-zinc-500 text-right">
                            Decimal: {h1 ? parseInt(h1, 16) : 0}
                        </div>
                    </div>

                    {/* Operator */}
                    <div className="flex flex-col items-center gap-4">
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
                                            ? "bg-purple-500 text-white"
                                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <o.icon size={20} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Hex 2 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Hex 2</label>
                        <input
                            type="text"
                            value={h2}
                            onChange={(e) => handleInput(e.target.value, setH2)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500/50 outline-none font-mono text-xl"
                            placeholder="FF"
                        />
                        <div className="text-xs text-zinc-500 text-right">
                            Decimal: {h2 ? parseInt(h2, 16) : 0}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 border-t border-white/10 pt-8">
                    <button
                        onClick={calculate}
                        className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-purple-500/20 flex items-center gap-2"
                    >
                        Calculate <ArrowRight size={20} />
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
                    <div className="mt-8 animate-in fade-in slide-in-from-bottom duration-500">
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-8 text-center space-y-6">
                            <h3 className="text-sm font-medium text-purple-400 uppercase tracking-wider">Result</h3>

                            <div className="space-y-2">
                                <div className="text-sm text-zinc-500">Hexadecimal</div>
                                <div className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight">
                                    {result.hex}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-purple-500/20">
                                <div className="space-y-1">
                                    <div className="text-sm text-zinc-500">Decimal</div>
                                    <div className="text-xl font-bold text-purple-400">
                                        {result.decimal}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-zinc-500">Binary</div>
                                    <div className="text-xl font-bold text-purple-400 truncate px-4">
                                        {result.binary}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
