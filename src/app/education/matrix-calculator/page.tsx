"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Plus, Minus, X, ArrowRight, RotateCcw, Grid } from "lucide-react";
import { cn } from "@/lib/utils";

type Matrix = number[][];

export default function MatrixCalculator() {
    const [rows, setRows] = useState(2);
    const [cols, setCols] = useState(2);
    const [m1, setM1] = useState<Matrix>([[0, 0], [0, 0]]);
    const [m2, setM2] = useState<Matrix>([[0, 0], [0, 0]]);
    const [op, setOp] = useState<"+" | "-" | "*">("+");
    const [result, setResult] = useState<Matrix | null>(null);

    const updateDimensions = (r: number, c: number) => {
        if (r < 1 || r > 5 || c < 1 || c > 5) return;
        setRows(r);
        setCols(c);

        const newM1 = Array(r).fill(0).map(() => Array(c).fill(0));
        const newM2 = Array(r).fill(0).map(() => Array(c).fill(0));

        // Preserve existing values if possible
        for (let i = 0; i < Math.min(r, m1.length); i++) {
            for (let j = 0; j < Math.min(c, m1[0].length); j++) {
                newM1[i][j] = m1[i][j];
                newM2[i][j] = m2[i][j];
            }
        }

        setM1(newM1);
        setM2(newM2);
        setResult(null);
    };

    const updateCell = (matrix: 1 | 2, r: number, c: number, val: string) => {
        const num = parseFloat(val) || 0;
        if (matrix === 1) {
            const newM = [...m1];
            newM[r] = [...newM[r]];
            newM[r][c] = num;
            setM1(newM);
        } else {
            const newM = [...m2];
            newM[r] = [...newM[r]];
            newM[r][c] = num;
            setM2(newM);
        }
    };

    const calculate = () => {
        const res = Array(rows).fill(0).map(() => Array(cols).fill(0));

        if (op === "+") {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    res[i][j] = m1[i][j] + m2[i][j];
                }
            }
        } else if (op === "-") {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    res[i][j] = m1[i][j] - m2[i][j];
                }
            }
        } else if (op === "*") {
            // Only for square matrices for simplicity in this version
            // Or handle dimension mismatch logic
            if (rows !== cols) {
                alert("Matrix multiplication currently supports square matrices only.");
                return;
            }
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    for (let k = 0; k < cols; k++) {
                        res[i][j] += m1[i][k] * m2[k][j];
                    }
                }
            }
        }

        setResult(res);
    };

    const reset = () => {
        updateDimensions(2, 2);
    };

    const MatrixInput = ({
        data,
        onChange,
        label
    }: {
        data: Matrix;
        onChange: (r: number, c: number, v: string) => void;
        label: string
    }) => (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider text-center">{label}</h3>
            <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 inline-block">
                <div
                    className="grid gap-2"
                    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                >
                    {data.map((row, i) => (
                        row.map((cell, j) => (
                            <input
                                key={`${i}-${j}`}
                                type="number"
                                value={cell || ""}
                                onChange={(e) => onChange(i, j, e.target.value)}
                                className="w-12 h-12 bg-zinc-900 border border-white/10 rounded-lg text-center text-white focus:ring-2 focus:ring-indigo-500/50 outline-none"
                                placeholder="0"
                            />
                        ))
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Matrix <span className="text-indigo-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Perform matrix addition, subtraction, and multiplication.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    <div className="flex items-center gap-4 bg-zinc-950 p-2 rounded-xl border border-white/10">
                        <span className="text-sm text-zinc-400 pl-2">Dimensions:</span>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={rows}
                                onChange={(e) => updateDimensions(parseInt(e.target.value), cols)}
                                className="w-12 bg-zinc-900 border border-white/10 rounded-lg p-2 text-center text-white"
                                min="1" max="5"
                            />
                            <span className="text-zinc-500">x</span>
                            <input
                                type="number"
                                value={cols}
                                onChange={(e) => updateDimensions(rows, parseInt(e.target.value))}
                                className="w-12 bg-zinc-900 border border-white/10 rounded-lg p-2 text-center text-white"
                                min="1" max="5"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 bg-zinc-950 p-1 rounded-xl border border-white/10">
                        {[
                            { val: "+", icon: Plus },
                            { val: "-", icon: Minus },
                            { val: "*", icon: X },
                        ].map((o) => (
                            <button
                                key={o.val}
                                onClick={() => setOp(o.val as any)}
                                className={cn(
                                    "p-3 rounded-lg transition-colors",
                                    op === o.val
                                        ? "bg-indigo-500 text-white"
                                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <o.icon size={20} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Matrices */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 overflow-x-auto pb-4">
                    <MatrixInput
                        data={m1}
                        onChange={(r, c, v) => updateCell(1, r, c, v)}
                        label="Matrix A"
                    />

                    <div className="text-2xl font-bold text-zinc-500">
                        {op === "+" && <Plus />}
                        {op === "-" && <Minus />}
                        {op === "*" && <X />}
                    </div>

                    <MatrixInput
                        data={m2}
                        onChange={(r, c, v) => updateCell(2, r, c, v)}
                        label="Matrix B"
                    />

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={calculate}
                            className="p-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
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
                        <div className="animate-in fade-in slide-in-from-left duration-500 flex items-center gap-8">
                            <div className="text-2xl font-bold text-white">=</div>
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-indigo-400 uppercase tracking-wider text-center">Result</h3>
                                <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 inline-block">
                                    <div
                                        className="grid gap-2"
                                        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                                    >
                                        {result.map((row, i) => (
                                            row.map((cell, j) => (
                                                <div
                                                    key={`${i}-${j}`}
                                                    className="w-12 h-12 flex items-center justify-center text-white font-bold"
                                                >
                                                    {cell}
                                                </div>
                                            ))
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
