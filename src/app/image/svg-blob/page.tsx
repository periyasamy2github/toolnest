"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
    RefreshCw,
    Download,
    Copy,
    Check,
    Palette,
    Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SvgBlobGenerator() {
    const [complexity, setComplexity] = useState(0.6);
    const [contrast, setContrast] = useState(0.6);
    const [color, setColor] = useState("#3b82f6");
    const [path, setPath] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        generateBlob();
    }, [complexity, contrast]);

    const generateBlob = () => {
        // Simple blob generation logic (approximation of organic shapes)
        const points = [];
        const numPoints = 3 + Math.floor(complexity * 10);
        const radius = 150;
        const center = { x: 200, y: 200 };

        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const variance = (Math.random() - 0.5) * contrast * radius;
            const r = radius + variance;
            points.push({
                x: center.x + Math.cos(angle) * r,
                y: center.y + Math.sin(angle) * r
            });
        }

        // Smooth curve generation
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length; i++) {
            const p0 = points[i];
            const p1 = points[(i + 1) % points.length];
            const mx = (p0.x + p1.x) / 2;
            const my = (p0.y + p1.y) / 2;
            d += ` Q ${p0.x} ${p0.y} ${mx} ${my}`;
        }
        d += " Z";

        setPath(d);
    };

    const getSvgCode = () => {
        return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <path fill="${color}" d="${path}" />
</svg>`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(getSvgCode());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadSvg = () => {
        const blob = new Blob([getSvgCode()], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "blob.svg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    SVG <span className="text-blue-500">Blob Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Generate unique, organic SVG shapes for your designs.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Preview Section */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 flex items-center justify-center min-h-[400px] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                    <m.div
                        key={path}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="relative z-10"
                    >
                        <svg viewBox="0 0 400 400" width="300" height="300" className="drop-shadow-2xl">
                            <path fill={color} d={path} />
                        </svg>
                    </m.div>

                    <button
                        onClick={generateBlob}
                        className="absolute bottom-6 right-6 p-3 bg-white text-black rounded-xl shadow-lg hover:scale-110 transition-transform"
                        title="Regenerate"
                    >
                        <RefreshCw size={24} />
                    </button>
                </div>

                {/* Controls Section */}
                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                    <Settings2 size={16} />
                                    Complexity
                                </label>
                                <span className="text-xs font-bold text-white bg-white/10 px-2 py-1 rounded">
                                    {Math.round(complexity * 10)}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.1"
                                value={complexity}
                                onChange={(e) => setComplexity(parseFloat(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                    <Settings2 size={16} />
                                    Contrast
                                </label>
                                <span className="text-xs font-bold text-white bg-white/10 px-2 py-1 rounded">
                                    {Math.round(contrast * 10)}
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.1"
                                value={contrast}
                                onChange={(e) => setContrast(parseFloat(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <Palette size={16} />
                                Color
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"].map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={cn(
                                            "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110",
                                            color === c ? "border-white scale-110" : "border-transparent"
                                        )}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border-none p-0"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition-colors font-medium"
                            >
                                {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                                Copy SVG
                            </button>
                            <button
                                onClick={downloadSvg}
                                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium"
                            >
                                <Download size={18} />
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
