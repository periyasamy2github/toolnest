"use client";

import { useState, useEffect } from "react";
import { Palette, Copy, Check } from "lucide-react";

export default function HslToRgb() {
    const [h, setH] = useState(0);
    const [s, setS] = useState(100);
    const [l, setL] = useState(50);
    const [rgb, setRgb] = useState("rgb(255, 0, 0)");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const hslToRgb = (h: number, s: number, l: number) => {
            s /= 100;
            l /= 100;
            const k = (n: number) => (n + h / 30) % 12;
            const a = s * Math.min(l, 1 - l);
            const f = (n: number) =>
                l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
            return [
                Math.round(255 * f(0)),
                Math.round(255 * f(8)),
                Math.round(255 * f(4)),
            ];
        };
        const [r, g, b] = hslToRgb(h, s, l);
        setRgb(`rgb(${r}, ${g}, ${b})`);
    }, [h, s, l]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(rgb);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    HSL to <span className="text-blue-500">RGB</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert HSL color values to RGB format.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="flex justify-between text-sm font-medium text-zinc-400">
                                <span>Hue (H)</span>
                                <span>{h}°</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="360"
                                value={h}
                                onChange={(e) => setH(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex justify-between text-sm font-medium text-zinc-400">
                                <span>Saturation (S)</span>
                                <span>{s}%</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={s}
                                onChange={(e) => setS(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex justify-between text-sm font-medium text-zinc-400">
                                <span>Lightness (L)</span>
                                <span>{l}%</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={l}
                                onChange={(e) => setL(parseInt(e.target.value))}
                                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
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
