"use client";

import { useState } from "react";
import { ArrowRightLeft, Copy, Check } from "lucide-react";

export default function PixelToRem() {
    const [pixels, setPixels] = useState(16);
    const [baseSize, setBaseSize] = useState(16);
    const [rem, setRem] = useState(1);
    const [copied, setCopied] = useState(false);

    const calculate = (px: number, base: number) => {
        setPixels(px);
        setBaseSize(base);
        setRem(parseFloat((px / base).toFixed(4)));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${rem}rem`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Pixel to <span className="text-teal-500">REM</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert pixels to REM units for responsive web design.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Pixels (px)</label>
                            <input
                                type="number"
                                value={pixels}
                                onChange={(e) => calculate(parseFloat(e.target.value) || 0, baseSize)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-4 text-xl text-white focus:ring-2 focus:ring-teal-500/50 outline-none font-mono"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Base Size (px)</label>
                            <input
                                type="number"
                                value={baseSize}
                                onChange={(e) => calculate(pixels, parseFloat(e.target.value) || 16)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-4 text-xl text-white focus:ring-2 focus:ring-teal-500/50 outline-none font-mono"
                            />
                            <p className="text-xs text-zinc-500">Default is usually 16px</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-zinc-950/50 rounded-2xl border border-white/5">
                        <div className="text-6xl font-black text-teal-400 font-mono">
                            {rem}<span className="text-2xl text-teal-500/50">rem</span>
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                        >
                            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            <span>Copy Value</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/5">
                    {[12, 14, 16, 18, 20, 24, 32, 48].map((px) => (
                        <button
                            key={px}
                            onClick={() => calculate(px, baseSize)}
                            className="bg-zinc-950 border border-white/5 hover:border-teal-500/50 rounded-xl p-3 text-center transition-all"
                        >
                            <div className="text-zinc-400 text-sm">{px}px</div>
                            <div className="text-teal-400 font-bold">{(px / baseSize).toFixed(3)}rem</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
