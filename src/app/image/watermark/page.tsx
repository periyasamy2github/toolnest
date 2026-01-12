"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Upload, Download, Image as ImageIcon, Type, Grid, LayoutGrid, Move } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type WatermarkType = "text" | "image";
type Position = "tl" | "tc" | "tr" | "ml" | "mc" | "mr" | "bl" | "bc" | "br" | "tiled";

export default function WatermarkPage() {
    const [baseImage, setBaseImage] = useState<HTMLImageElement | null>(null);
    const [watermarkType, setWatermarkType] = useState<WatermarkType>("text");

    // Text Settings
    const [text, setText] = useState("Confidential");
    const [fontSize, setFontSize] = useState(48);
    const [color, setColor] = useState("#ffffff");

    // Image Settings
    const [watermarkImage, setWatermarkImage] = useState<HTMLImageElement | null>(null);
    const [scale, setScale] = useState(0.5);

    // Common Settings
    const [opacity, setOpacity] = useState(0.5);
    const [rotation, setRotation] = useState(0);
    const [position, setPosition] = useState<Position>("mc");
    const [margin, setMargin] = useState(20);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleBaseImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const img = new Image();
            img.onload = () => setBaseImage(img);
            img.src = URL.createObjectURL(e.target.files[0]);
        }
    };

    const handleWatermarkImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const img = new Image();
            img.onload = () => setWatermarkImage(img);
            img.src = URL.createObjectURL(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (!baseImage || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = baseImage.width;
        canvas.height = baseImage.height;

        // Draw Base Image
        ctx.drawImage(baseImage, 0, 0);

        // Configure Watermark Context
        ctx.globalAlpha = opacity;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        const drawWatermark = (x: number, y: number) => {
            ctx.save();
            ctx.translate(x, y);

            if (watermarkType === "text") {
                ctx.font = `bold ${fontSize}px sans-serif`;
                ctx.fillStyle = color;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(text, 0, 0);
            } else if (watermarkImage) {
                const w = watermarkImage.width * scale;
                const h = watermarkImage.height * scale;
                ctx.drawImage(watermarkImage, -w / 2, -h / 2, w, h);
            }

            ctx.restore();
        };

        if (position === "tiled") {
            // Tiling Logic
            const gap = 200; // Spacing between tiles
            // We need to cover the rotated canvas area, so we draw extra
            const diag = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);

            for (let x = -diag; x < diag; x += gap) {
                for (let y = -diag; y < diag; y += gap) {
                    drawWatermark(canvas.width / 2 + x, canvas.height / 2 + y);
                }
            }
        } else {
            // Positioning Logic
            let x = 0, y = 0;
            const p = position;

            if (p.includes("l")) x = margin + (watermarkType === "image" && watermarkImage ? (watermarkImage.width * scale) / 2 : 0);
            if (p.includes("c")) x = canvas.width / 2;
            if (p.includes("r")) x = canvas.width - margin - (watermarkType === "image" && watermarkImage ? (watermarkImage.width * scale) / 2 : 0);

            if (p.includes("t")) y = margin + (watermarkType === "image" && watermarkImage ? (watermarkImage.height * scale) / 2 : 0);
            if (p.includes("m")) y = canvas.height / 2;
            if (p.includes("b")) y = canvas.height - margin - (watermarkType === "image" && watermarkImage ? (watermarkImage.height * scale) / 2 : 0);

            drawWatermark(x, y);
        }

    }, [baseImage, watermarkType, text, fontSize, color, watermarkImage, scale, opacity, rotation, position, margin]);

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const link = document.createElement("a");
        link.download = "watermarked-image.png";
        link.href = canvasRef.current.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/image" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <ArrowLeft className="text-zinc-400" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black text-gradient">Watermark Tool</h1>
                        <p className="text-zinc-400 text-lg">Protect your images with custom watermarks.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => document.getElementById('base-upload')?.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                    >
                        <Upload size={18} />
                        New Image
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={!baseImage}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download size={18} />
                        Download
                    </button>
                </div>
                <input type="file" id="base-upload" accept="image/*" onChange={handleBaseImageUpload} className="hidden" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Canvas Area */}
                <div className="lg:col-span-8">
                    <div className="glass-card p-4 flex items-center justify-center bg-zinc-950/50 min-h-[600px] overflow-hidden rounded-xl border border-white/10 relative">
                        {!baseImage && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 pointer-events-none">
                                <ImageIcon size={64} className="mb-4 opacity-20" />
                                <p>Upload an image to start</p>
                            </div>
                        )}
                        <canvas
                            ref={canvasRef}
                            className="max-w-full h-auto shadow-2xl"
                        />
                    </div>
                </div>

                {/* Controls */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Watermark Type */}
                    <div className="glass-card p-1 flex gap-1">
                        <button
                            onClick={() => setWatermarkType("text")}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors",
                                watermarkType === "text" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200"
                            )}
                        >
                            <Type size={16} /> Text
                        </button>
                        <button
                            onClick={() => setWatermarkType("image")}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors",
                                watermarkType === "image" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200"
                            )}
                        >
                            <ImageIcon size={16} /> Image
                        </button>
                    </div>

                    {/* Type Specific Controls */}
                    <div className="glass-card p-6 space-y-6">
                        {watermarkType === "text" ? (
                            <>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-zinc-400 uppercase">Text</label>
                                    <input
                                        type="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-200"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-zinc-400 uppercase">Size</label>
                                        <input
                                            type="number"
                                            value={fontSize}
                                            onChange={(e) => setFontSize(Number(e.target.value))}
                                            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-zinc-400 uppercase">Color</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                className="h-10 w-full bg-zinc-900 border border-white/10 rounded-lg cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-zinc-300">Upload Watermark</label>
                                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-4 text-center hover:border-zinc-500 hover:bg-zinc-900/50 transition-all cursor-pointer relative">
                                    <input type="file" accept="image/*" onChange={handleWatermarkImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload className="text-zinc-400" size={24} />
                                        <p className="text-xs text-zinc-500">Click to upload logo</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-zinc-400 uppercase">Scale</label>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="2"
                                        step="0.1"
                                        value={scale}
                                        onChange={(e) => setScale(Number(e.target.value))}
                                        className="w-full accent-blue-500"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Common Controls */}
                    <div className="glass-card p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400 uppercase">Opacity</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={opacity}
                                onChange={(e) => setOpacity(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400 uppercase">Rotation</label>
                            <input
                                type="range"
                                min="-180"
                                max="180"
                                value={rotation}
                                onChange={(e) => setRotation(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400 uppercase">Position</label>
                            <div className="grid grid-cols-3 gap-2">
                                {["tl", "tc", "tr", "ml", "mc", "mr", "bl", "bc", "br"].map((pos) => (
                                    <button
                                        key={pos}
                                        onClick={() => setPosition(pos as Position)}
                                        className={cn(
                                            "h-8 rounded flex items-center justify-center border transition-colors",
                                            position === pos
                                                ? "bg-blue-500 border-blue-500 text-white"
                                                : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800"
                                        )}
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setPosition("tiled")}
                                className={cn(
                                    "w-full mt-2 py-2 rounded-lg text-sm font-medium border transition-colors flex items-center justify-center gap-2",
                                    position === "tiled"
                                        ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                        : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800"
                                )}
                            >
                                <LayoutGrid size={16} /> Tiled Pattern
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
