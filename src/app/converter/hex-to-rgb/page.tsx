"use client";

import { useState, useEffect } from "react";
import { Palette, Copy, Check } from "lucide-react";

export default function HexToRgb() {
    const [hex, setHex] = useState("#000000");
    const [rgb, setRgb] = useState("rgb(0, 0, 0)");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            const r = parseInt(result[1], 16);
            const g = parseInt(result[2], 16);
            const b = parseInt(result[3], 16);
            setRgb(`rgb(${r}, ${g}, ${b})`);
        } else {
            setRgb("Invalid HEX");
        }
    }, [hex]);

    const copyToClipboard = () => {
        if (rgb === "Invalid HEX") return;
        navigator.clipboard.writeText(rgb);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    HEX to <span className="text-green-500">RGB</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert Hexadecimal color codes to RGB values.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-zinc-400">HEX Color</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">#</span>
                            <input
                                type="text"
                                value={hex.replace('#', '')}
                                onChange={(e) => setHex('#' + e.target.value)}
                                maxLength={7}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-8 pr-4 py-4 text-xl text-white focus:ring-2 focus:ring-green-500/50 outline-none font-mono uppercase"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                        <div
                            className="w-32 h-32 rounded-2xl shadow-2xl border-4 border-white/10 transition-colors duration-200"
                            style={{ backgroundColor: rgb !== "Invalid HEX" ? rgb : "transparent" }}
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
