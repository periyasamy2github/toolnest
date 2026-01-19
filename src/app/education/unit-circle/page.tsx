"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Circle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type Angle = {
    deg: number;
    rad: string;
    cos: string;
    sin: string;
    x: number;
    y: number;
};

const angles: Angle[] = [
    { deg: 0, rad: "0", cos: "1", sin: "0", x: 1, y: 0 },
    { deg: 30, rad: "π/6", cos: "√3/2", sin: "1/2", x: 0.866, y: 0.5 },
    { deg: 45, rad: "π/4", cos: "√2/2", sin: "√2/2", x: 0.707, y: 0.707 },
    { deg: 60, rad: "π/3", cos: "1/2", sin: "√3/2", x: 0.5, y: 0.866 },
    { deg: 90, rad: "π/2", cos: "0", sin: "1", x: 0, y: 1 },
    { deg: 120, rad: "2π/3", cos: "-1/2", sin: "√3/2", x: -0.5, y: 0.866 },
    { deg: 135, rad: "3π/4", cos: "-√2/2", sin: "√2/2", x: -0.707, y: 0.707 },
    { deg: 150, rad: "5π/6", cos: "-√3/2", sin: "1/2", x: -0.866, y: 0.5 },
    { deg: 180, rad: "π", cos: "-1", sin: "0", x: -1, y: 0 },
    { deg: 210, rad: "7π/6", cos: "-√3/2", sin: "-1/2", x: -0.866, y: -0.5 },
    { deg: 225, rad: "5π/4", cos: "-√2/2", sin: "-√2/2", x: -0.707, y: -0.707 },
    { deg: 240, rad: "4π/3", cos: "-1/2", sin: "-√3/2", x: -0.5, y: -0.866 },
    { deg: 270, rad: "3π/2", cos: "0", sin: "-1", x: 0, y: -1 },
    { deg: 300, rad: "5π/3", cos: "1/2", sin: "-√3/2", x: 0.5, y: -0.866 },
    { deg: 315, rad: "7π/4", cos: "√2/2", sin: "-√2/2", x: 0.707, y: -0.707 },
    { deg: 330, rad: "11π/6", cos: "√3/2", sin: "-1/2", x: 0.866, y: -0.5 },
];

export default function UnitCircle() {
    const [activeAngle, setActiveAngle] = useState<Angle | null>(null);

    const radius = 150;
    const center = 200;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Unit <span className="text-indigo-500">Circle</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Interactive visualization of trigonometric functions.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Visualization */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex items-center justify-center">
                    <svg width="400" height="400" viewBox="0 0 400 400" className="max-w-full h-auto">
                        {/* Grid */}
                        <line x1="0" y1={center} x2="400" y2={center} stroke="#333" strokeWidth="1" />
                        <line x1={center} y1="0" x2={center} y2="400" stroke="#333" strokeWidth="1" />

                        {/* Circle */}
                        <circle cx={center} cy={center} r={radius} fill="none" stroke="#6366f1" strokeWidth="2" />

                        {/* Points */}
                        {angles.map((a) => {
                            const cx = center + a.x * radius;
                            const cy = center - a.y * radius;
                            const isActive = activeAngle?.deg === a.deg;

                            return (
                                <g key={a.deg} onClick={() => setActiveAngle(a)} className="cursor-pointer group">
                                    {isActive && (
                                        <line
                                            x1={center}
                                            y1={center}
                                            x2={cx}
                                            y2={cy}
                                            stroke="#6366f1"
                                            strokeWidth="2"
                                            strokeDasharray="4 4"
                                        />
                                    )}
                                    <circle
                                        cx={cx}
                                        cy={cy}
                                        r={isActive ? 8 : 5}
                                        fill={isActive ? "#6366f1" : "#333"}
                                        stroke={isActive ? "#fff" : "#6366f1"}
                                        strokeWidth="2"
                                        className="transition-all duration-300"
                                    />
                                    {isActive && (
                                        <>
                                            <line x1={cx} y1={cy} x2={cx} y2={center} stroke="#ef4444" strokeWidth="2" /> {/* Sin */}
                                            <line x1={center} y1={center} x2={cx} y2={center} stroke="#22c55e" strokeWidth="2" /> {/* Cos */}
                                        </>
                                    )}
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* Details */}
                <div className="space-y-6">
                    <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 h-full">
                        {activeAngle ? (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
                                <div className="text-center space-y-2">
                                    <h2 className="text-4xl font-black text-white">{activeAngle.deg}°</h2>
                                    <div className="text-xl text-indigo-400 font-mono">{activeAngle.rad} radians</div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-zinc-950 rounded-xl p-4 border border-white/5 space-y-2">
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Cosine (x)</div>
                                        <div className="text-2xl font-bold text-green-400 font-mono">{activeAngle.cos}</div>
                                        <div className="text-xs text-zinc-600 font-mono">≈ {activeAngle.x.toFixed(3)}</div>
                                    </div>
                                    <div className="bg-zinc-950 rounded-xl p-4 border border-white/5 space-y-2">
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Sine (y)</div>
                                        <div className="text-2xl font-bold text-red-400 font-mono">{activeAngle.sin}</div>
                                        <div className="text-xs text-zinc-600 font-mono">≈ {activeAngle.y.toFixed(3)}</div>
                                    </div>
                                    <div className="bg-zinc-950 rounded-xl p-4 border border-white/5 space-y-2">
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Tangent</div>
                                        <div className="text-xl font-bold text-white font-mono">
                                            {activeAngle.x === 0 ? "Undefined" : (activeAngle.y / activeAngle.x).toFixed(3)}
                                        </div>
                                    </div>
                                    <div className="bg-zinc-950 rounded-xl p-4 border border-white/5 space-y-2">
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider">Coordinates</div>
                                        <div className="text-lg font-bold text-white font-mono">
                                            ({activeAngle.cos}, {activeAngle.sin})
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-zinc-500">
                                <Circle size={48} className="opacity-20" />
                                <p>Click on any point on the circle to view trigonometric values.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
