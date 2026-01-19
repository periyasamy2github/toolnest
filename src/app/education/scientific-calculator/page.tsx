"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Calculator, Delete, RotateCcw, Equal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ScientificCalculator() {
    const [display, setDisplay] = useState("0");
    const [memory, setMemory] = useState<number | null>(null);
    const [isRad, setIsRad] = useState(true);

    const handleInput = (val: string) => {
        if (display === "0" && val !== ".") {
            setDisplay(val);
        } else {
            setDisplay(display + val);
        }
    };

    const clear = () => setDisplay("0");
    const backspace = () => {
        if (display.length === 1) setDisplay("0");
        else setDisplay(display.slice(0, -1));
    };

    const calculate = () => {
        try {
            // Replace symbols with JS math
            let expr = display
                .replace(/×/g, "*")
                .replace(/÷/g, "/")
                .replace(/π/g, "Math.PI")
                .replace(/e/g, "Math.E")
                .replace(/√\(([^)]+)\)/g, "Math.sqrt($1)")
                .replace(/sin\(([^)]+)\)/g, (_, arg) => `Math.sin(${isRad ? arg : `${arg} * Math.PI / 180`})`)
                .replace(/cos\(([^)]+)\)/g, (_, arg) => `Math.cos(${isRad ? arg : `${arg} * Math.PI / 180`})`)
                .replace(/tan\(([^)]+)\)/g, (_, arg) => `Math.tan(${isRad ? arg : `${arg} * Math.PI / 180`})`)
                .replace(/log\(([^)]+)\)/g, "Math.log10($1)")
                .replace(/ln\(([^)]+)\)/g, "Math.log($1)")
                .replace(/\^/g, "**");

            // Safe eval
            const result = new Function(`return ${expr}`)();
            setDisplay(String(parseFloat(result.toFixed(8))));
        } catch (e) {
            setDisplay("Error");
            setTimeout(() => setDisplay("0"), 1500);
        }
    };

    const func = (fn: string) => {
        if (display === "0") setDisplay(`${fn}(`);
        else setDisplay(`${display}${fn}(`);
    };

    const buttons = [
        { label: "Rad", onClick: () => setIsRad(!isRad), active: isRad, type: "mode" },
        { label: "Deg", onClick: () => setIsRad(!isRad), active: !isRad, type: "mode" },
        { label: "x!", onClick: () => { }, type: "func" }, // Factorial logic needed if implemented fully
        { label: "(", onClick: () => handleInput("("), type: "func" },
        { label: ")", onClick: () => handleInput(")"), type: "func" },
        { label: "%", onClick: () => handleInput("%"), type: "func" },
        { label: "AC", onClick: clear, type: "danger" },

        { label: "sin", onClick: () => func("sin"), type: "func" },
        { label: "ln", onClick: () => func("ln"), type: "func" },
        { label: "7", onClick: () => handleInput("7"), type: "num" },
        { label: "8", onClick: () => handleInput("8"), type: "num" },
        { label: "9", onClick: () => handleInput("9"), type: "num" },
        { label: "÷", onClick: () => handleInput("÷"), type: "op" },

        { label: "cos", onClick: () => func("cos"), type: "func" },
        { label: "log", onClick: () => func("log"), type: "func" },
        { label: "4", onClick: () => handleInput("4"), type: "num" },
        { label: "5", onClick: () => handleInput("5"), type: "num" },
        { label: "6", onClick: () => handleInput("6"), type: "num" },
        { label: "×", onClick: () => handleInput("×"), type: "op" },

        { label: "tan", onClick: () => func("tan"), type: "func" },
        { label: "√", onClick: () => func("√"), type: "func" },
        { label: "1", onClick: () => handleInput("1"), type: "num" },
        { label: "2", onClick: () => handleInput("2"), type: "num" },
        { label: "3", onClick: () => handleInput("3"), type: "num" },
        { label: "-", onClick: () => handleInput("-"), type: "op" },

        { label: "EXP", onClick: () => handleInput("e"), type: "func" },
        { label: "x^y", onClick: () => handleInput("^"), type: "func" },
        { label: "0", onClick: () => handleInput("0"), type: "num" },
        { label: ".", onClick: () => handleInput("."), type: "num" },
        { label: "=", onClick: calculate, type: "equal" },
        { label: "+", onClick: () => handleInput("+"), type: "op" },
    ];

    return (
        <div className="max-w-md mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-white tracking-tight">
                    Scientific <span className="text-cyan-500">Calculator</span>
                </h1>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl">
                {/* Display */}
                <div className="bg-zinc-950 rounded-2xl p-6 mb-6 text-right overflow-hidden relative">
                    <div className="text-zinc-500 text-sm mb-1 h-5">
                        {isRad ? "RAD" : "DEG"}
                    </div>
                    <div className="text-4xl font-mono text-white tracking-wider truncate">
                        {display}
                    </div>
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-7 gap-2">
                    {buttons.map((btn, i) => (
                        <button
                            key={i}
                            onClick={btn.onClick}
                            className={cn(
                                "h-12 rounded-lg font-medium text-sm transition-all active:scale-95 flex items-center justify-center",
                                btn.type === "num" && "bg-zinc-800 text-white hover:bg-zinc-700 col-span-1",
                                btn.type === "op" && "bg-zinc-800 text-cyan-400 hover:bg-zinc-700 col-span-1",
                                btn.type === "func" && "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 col-span-1",
                                btn.type === "mode" && cn("col-span-1", btn.active ? "text-cyan-400" : "text-zinc-600"),
                                btn.type === "danger" && "bg-red-500/10 text-red-400 hover:bg-red-500/20 col-span-1",
                                btn.type === "equal" && "bg-cyan-500 text-black hover:bg-cyan-400 col-span-1",
                                btn.label === "0" && "col-span-2"
                            )}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
