"use client";

import { useState, useEffect } from "react";
import { Palette, Copy, Check, ArrowRightLeft } from "lucide-react";

export default function RgbToHex() {
    const [r, setR] = useState(0);
    const [g, setG] = useState(0);
    const [b, setB] = useState(0);
    const [hex, setHex] = useState("#000000");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const toHex = (n: number) => {
            const hex = Math.max(0, Math.min(255, n)).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };
        setHex(`#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase());
    }, [r, g, b]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    RGB to <span className="text-red-500">HEX</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert RGB color values to Hexadecimal color codes.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="flex justify-between text-sm font-medium text-zinc-400">
                                <span>Red (R)</span>
                                <span>{r}</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="255"
                                value={r}
                                onChange={(e) => setR(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex justify-between text-sm font-medium text-zinc-400">
                                <span>Green (G)</span>
                                <span>{g}</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="255"
                                value={g}
                                onChange={(e) => setG(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-green-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex justify-between text-sm font-medium text-zinc-400">
                                <span>Blue (B)</span>
                                <span>{b}</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="255"
                                value={b}
                                onChange={(e) => setB(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                        <div
                            className="w-32 h-32 rounded-2xl shadow-2xl border-4 border-white/10 transition-colors duration-200"
                            style={{ backgroundColor: hex }}
                        />
                        <div className="flex items-center gap-4 bg-zinc-950 border border-white/10 rounded-xl px-6 py-3">
                            <span className="text-2xl font-mono font-bold text-white">{hex}</span>
                            <button
                                onClick={copyToClipboard}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
