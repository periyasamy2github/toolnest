"use client";

import { useState, useEffect } from "react";
import { Palette, Copy, Check } from "lucide-react";

export default function CmykToRgb() {
    const [c, setC] = useState(0);
    const [m, setM] = useState(100);
    const [y, setY] = useState(100);
    const [k, setK] = useState(0);
    const [rgb, setRgb] = useState("rgb(255, 0, 0)");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const cmykToRgb = (c: number, m: number, y: number, k: number) => {
            c /= 100;
            m /= 100;
            y /= 100;
            k /= 100;
            const r = 255 * (1 - c) * (1 - k);
            const g = 255 * (1 - m) * (1 - k);
            const b = 255 * (1 - y) * (1 - k);
            return [Math.round(r), Math.round(g), Math.round(b)];
        };
        const [r, g, b] = cmykToRgb(c, m, y, k);
        setRgb(`rgb(${r}, ${g}, ${b})`);
    }, [c, m, y, k]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(rgb);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    CMYK to <span className="text-cyan-500">RGB</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert CMYK color values to RGB format.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="flex justify-between text-sm font-medium text-zinc-400">
                                <span>Cyan (C)</span>
                                <span>{c}%</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={c}
                                onChange={(e) => setC(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex justify-between text-sm font-medium text-zinc-400">
                                <span>Magenta (M)</span>
                                <span>{m}%</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={m}
                                onChange={(e) => setM(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex justify-between text-sm font-medium text-zinc-400">
                                <span>Yellow (Y)</span>
                                <span>{y}%</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={y}
                                onChange={(e) => setY(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex justify-between text-sm font-medium text-zinc-400">
                                <span>Key/Black (K)</span>
                                <span>{k}%</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={k}
                                onChange={(e) => setK(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-500"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                        <div
                            className="w-32 h-32 rounded-2xl shadow-2xl border-4 border-white/10 transition-colors duration-200"
                            style={{ backgroundColor: rgb }}
                        />
                        <div className="flex items-center gap-4 bg-zinc-950 border border-white/10 rounded-xl px-6 py-3">
                            <span className="text-xl font-mono font-bold text-white">{rgb}</span>
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
