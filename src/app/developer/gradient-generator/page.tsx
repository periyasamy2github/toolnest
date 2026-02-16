"use client";

import { useState } from "react";
import { ArrowLeft, Copy, Check, Plus, Trash2, RotateCcw, Palette } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";

interface ColorStop {
    id: string;
    color: string;
    position: number;
}

type GradientType = "linear" | "radial" | "conic";

export default function GradientGeneratorPage() {
    const [gradientType, setGradientType] = useState<GradientType>("linear");
    const [angle, setAngle] = useState(90);
    const [colorStops, setColorStops] = useState<ColorStop[]>([
        { id: "1", color: "#667eea", position: 0 },
        { id: "2", color: "#764ba2", position: 100 }
    ]);
    const [copied, setCopied] = useState(false);

    const addColorStop = () => {
        const lastPosition = colorStops[colorStops.length - 1]?.position || 0;
        const newPosition = Math.min(lastPosition + 25, 100);
        setColorStops([...colorStops, {
            id: Date.now().toString(),
            color: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
            position: newPosition
        }]);
    };

    const removeColorStop = (id: string) => {
        if (colorStops.length > 2) {
            setColorStops(colorStops.filter(stop => stop.id !== id));
        }
    };

    const updateColorStop = (id: string, field: keyof ColorStop, value: string | number) => {
        setColorStops(colorStops.map(stop =>
            stop.id === id ? { ...stop, [field]: value } : stop
        ));
    };

    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);

    const generateGradientCSS = () => {
        const stopsStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(", ");

        switch (gradientType) {
            case "linear":
                return `linear-gradient(${angle}deg, ${stopsStr})`;
            case "radial":
                return `radial-gradient(circle, ${stopsStr})`;
            case "conic":
                return `conic-gradient(from ${angle}deg, ${stopsStr})`;
            default:
                return "";
        }
    };

    const cssCode = `background: ${generateGradientCSS()};`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const presets = [
        { name: "Sunset", stops: [{ color: "#f12711", position: 0 }, { color: "#f5af19", position: 100 }] },
        { name: "Ocean", stops: [{ color: "#2193b0", position: 0 }, { color: "#6dd5ed", position: 100 }] },
        { name: "Purple", stops: [{ color: "#667eea", position: 0 }, { color: "#764ba2", position: 100 }] },
        { name: "Mint", stops: [{ color: "#11998e", position: 0 }, { color: "#38ef7d", position: 100 }] },
        { name: "Cherry", stops: [{ color: "#eb3349", position: 0 }, { color: "#f45c43", position: 100 }] },
        { name: "Royal", stops: [{ color: "#141e30", position: 0 }, { color: "#243b55", position: 100 }] },
        { name: "Rainbow", stops: [{ color: "#ff0000", position: 0 }, { color: "#ff7f00", position: 17 }, { color: "#ffff00", position: 33 }, { color: "#00ff00", position: 50 }, { color: "#0000ff", position: 67 }, { color: "#4b0082", position: 83 }, { color: "#8b00ff", position: 100 }] },
        { name: "Neon", stops: [{ color: "#00f260", position: 0 }, { color: "#0575e6", position: 100 }] },
    ];

    const applyPreset = (stops: { color: string; position: number }[]) => {
        setColorStops(stops.map((s, i) => ({ ...s, id: `preset-${i}` })));
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <BackButton />
                <div>
                    <h1 className="text-4xl font-black text-gradient">Gradient Generator</h1>
                    <p className="text-zinc-400 text-lg">Create beautiful CSS gradients visually.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Preview */}
                <div className="space-y-4">
                    <div
                        className="w-full h-80 rounded-2xl shadow-2xl transition-all duration-300"
                        style={{ background: generateGradientCSS() }}
                    />

                    {/* CSS Output */}
                    <div className="glass-card p-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">CSS Code</span>
                            <button
                                onClick={copyToClipboard}
                                className="text-xs font-bold text-zinc-500 hover:text-blue-400 flex items-center gap-1"
                            >
                                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                        <pre className="p-4 bg-zinc-900 rounded-lg text-sm font-mono text-zinc-300 overflow-x-auto">
                            {cssCode}
                        </pre>
                    </div>

                    {/* Presets */}
                    <div className="glass-card p-4">
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 block">Presets</span>
                        <div className="grid grid-cols-4 gap-2">
                            {presets.map((preset) => (
                                <button
                                    key={preset.name}
                                    onClick={() => applyPreset(preset.stops)}
                                    className="group relative"
                                >
                                    <div
                                        className="w-full h-12 rounded-lg transition-transform hover:scale-105 shadow-md"
                                        style={{
                                            background: `linear-gradient(90deg, ${preset.stops.map(s => `${s.color} ${s.position}%`).join(", ")})`
                                        }}
                                    />
                                    <span className="text-[10px] text-zinc-400 mt-1 block text-center">{preset.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="space-y-6">
                    {/* Gradient Type */}
                    <div className="glass-card p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Palette size={18} className="text-purple-400" /> Gradient Type
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {(["linear", "radial", "conic"] as GradientType[]).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setGradientType(type)}
                                    className={cn(
                                        "py-2 rounded-lg text-sm font-bold capitalize transition-colors",
                                        gradientType === type
                                            ? "bg-blue-600 text-white"
                                            : "bg-zinc-800 text-zinc-400 hover:text-white"
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Angle */}
                    {(gradientType === "linear" || gradientType === "conic") && (
                        <div className="glass-card p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white">Angle</h3>
                                <span className="text-sm text-zinc-400">{angle}°</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={angle}
                                    onChange={(e) => setAngle(Number(e.target.value))}
                                    className="flex-1 accent-blue-500"
                                />
                                <div
                                    className="w-12 h-12 rounded-full border-2 border-white/20 relative"
                                    style={{ background: generateGradientCSS() }}
                                >
                                    <div
                                        className="absolute top-1/2 left-1/2 w-1 h-5 bg-white rounded-full origin-bottom"
                                        style={{ transform: `translate(-50%, -100%) rotate(${angle}deg)` }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Color Stops */}
                    <div className="glass-card p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Color Stops</h3>
                            <button
                                onClick={addColorStop}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center gap-1"
                            >
                                <Plus size={14} /> Add Stop
                            </button>
                        </div>
                        <div className="space-y-3">
                            {colorStops.map((stop, index) => (
                                <div key={stop.id} className="flex items-center gap-3">
                                    <div className="relative">
                                        <input
                                            type="color"
                                            value={stop.color}
                                            onChange={(e) => updateColorStop(stop.id, "color", e.target.value)}
                                            className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        value={stop.color}
                                        onChange={(e) => updateColorStop(stop.id, "color", e.target.value)}
                                        className="flex-1 px-3 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-blue-500"
                                    />
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={stop.position}
                                            onChange={(e) => updateColorStop(stop.id, "position", Number(e.target.value))}
                                            className="w-16 px-2 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white text-sm text-center focus:outline-none focus:border-blue-500"
                                        />
                                        <span className="text-zinc-500 text-sm">%</span>
                                    </div>
                                    {colorStops.length > 2 && (
                                        <button
                                            onClick={() => removeColorStop(stop.id)}
                                            className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="glass-card p-6 space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                        <Palette size={20} />
                    </div>
                    <h3 className="text-white font-bold">Multiple Types</h3>
                    <p className="text-zinc-400 text-sm">Linear, radial, and conic gradients.</p>
                </div>
                <div className="glass-card p-6 space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <RotateCcw size={20} />
                    </div>
                    <h3 className="text-white font-bold">Angle Control</h3>
                    <p className="text-zinc-400 text-sm">Adjust angle with visual indicator.</p>
                </div>
                <div className="glass-card p-6 space-y-2">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                        <Copy size={20} />
                    </div>
                    <h3 className="text-white font-bold">Copy CSS</h3>
                    <p className="text-zinc-400 text-sm">One-click copy for your stylesheets.</p>
                </div>
            </div>
        </div>
    );
}
