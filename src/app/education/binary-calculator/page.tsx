"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Binary, Plus, Minus, X, Divide, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function BinaryCalculator() {
    const [b1, setB1] = useState("");
    const [b2, setB2] = useState("");
    const [op, setOp] = useState<"+" | "-" | "*" | "/">("+");
    const [result, setResult] = useState<{ binary: string; decimal: number } | null>(null);

    const handleInput = (val: string, setter: (v: string) => void) => {
        if (/^[01]*$/.test(val)) {
            setter(val);
        }
    };

    const calculate = () => {
        if (!b1 || !b2) return;

        const n1 = parseInt(b1, 2);
        const n2 = parseInt(b2, 2);
        let res = 0;

        switch (op) {
            case "+": res = n1 + n2; break;
            case "-": res = n1 - n2; break;
            case "*": res = n1 * n2; break;
            case "/": res = Math.floor(n1 / n2); break;
        }

        setResult({
            binary: res.toString(2),
            decimal: res
        });
    };

    const reset = () => {
        setB1("");
        setB2("");
        setResult(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Binary <span className="text-green-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Perform arithmetic operations on binary numbers.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <div className="grid md:grid-cols-[1fr,auto,1fr] gap-8 items-center mb-8">
                    {/* Binary 1 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Binary 1</label>
                        <input
                            type="text"
                            value={b1}
                            onChange={(e) => handleInput(e.target.value, setB1)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-green-500/50 outline-none font-mono text-xl"
                            placeholder="1010"
                        />
                        <div className="text-xs text-zinc-500 text-right">
                            Decimal: {b1 ? parseInt(b1, 2) : 0}
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
                                            ? "bg-green-500 text-white"
                                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <o.icon size={20} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Binary 2 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Binary 2</label>
                        <input
                            type="text"
                            value={b2}
                            onChange={(e) => handleInput(e.target.value, setB2)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-green-500/50 outline-none font-mono text-xl"
                            placeholder="0101"
                        />
                        <div className="text-xs text-zinc-500 text-right">
                            Decimal: {b2 ? parseInt(b2, 2) : 0}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 border-t border-white/10 pt-8">
                    <button
                        onClick={calculate}
                        className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-green-500/20 flex items-center gap-2"
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
                        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center space-y-4">
                            <h3 className="text-sm font-medium text-green-400 uppercase tracking-wider">Result</h3>

                            <div className="space-y-2">
                                <div className="text-sm text-zinc-500">Binary</div>
                                <div className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight break-all">
                                    {result.binary}
                                </div>
                            </div>

                            <div className="h-px bg-green-500/20 w-1/2 mx-auto" />

                            <div className="space-y-1">
                                <div className="text-sm text-zinc-500">Decimal</div>
                                <div className="text-2xl font-bold text-green-400">
                                    {result.decimal}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
