"use client";

import { useState } from "react";
import { ArrowRightLeft, Copy, Check } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function AspectRatio() {
    const [width, setWidth] = useState(1920);
    const [height, setHeight] = useState(1080);
    const [ratio, setRatio] = useState("16:9");

    const calculateRatio = (w: number, h: number) => {
        setWidth(w);
        setHeight(h);

        if (w === 0 || h === 0) return;

        const gcd = (a: number, b: number): number => {
            return b === 0 ? a : gcd(b, a % b);
        };

        const divisor = gcd(w, h);
        setRatio(`${w / divisor}:${h / divisor}`);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Aspect Ratio <span className="text-indigo-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate aspect ratios and resize dimensions while maintaining proportions.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Width</label>
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => calculateRatio(parseInt(e.target.value) || 0, height)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-4 text-xl text-white focus:ring-2 focus:ring-indigo-500/50 outline-none font-mono"
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="text-4xl font-black text-indigo-400 font-mono">{ratio}</div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Aspect Ratio</div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Height</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => calculateRatio(width, parseInt(e.target.value) || 0)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-4 text-xl text-white focus:ring-2 focus:ring-indigo-500/50 outline-none font-mono"
                        />
                    </div>
                </div>

                <div className="flex justify-center py-8">
                    <div
                        className="bg-indigo-500/20 border-2 border-indigo-500 rounded-lg flex items-center justify-center transition-all duration-300"
                        style={{
                            width: '100%',
                            maxWidth: '400px',
                            aspectRatio: `${width}/${height}`
                        }}
                    >
                        <span className="text-indigo-300 font-mono text-sm">{width} x {height}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/5">
                    {[
                        { w: 1920, h: 1080, label: "HD (16:9)" },
                        { w: 1280, h: 720, label: "HD (16:9)" },
                        { w: 1080, h: 1080, label: "Square (1:1)" },
                        { w: 1080, h: 1350, label: "Portrait (4:5)" },
                        { w: 2560, h: 1440, label: "2K (16:9)" },
                        { w: 3840, h: 2160, label: "4K (16:9)" },
                        { w: 2560, h: 1080, label: "Ultrawide (21:9)" },
                        { w: 640, h: 480, label: "VGA (4:3)" },
                    ].map((preset) => (
                        <button
                            key={preset.label + preset.w}
                            onClick={() => calculateRatio(preset.w, preset.h)}
                            className="bg-zinc-950 border border-white/5 hover:border-indigo-500/50 rounded-xl p-3 text-center transition-all"
                        >
                            <div className="text-zinc-400 text-xs uppercase">{preset.label}</div>
                            <div className="text-indigo-400 font-bold text-sm">{preset.w} x {preset.h}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
