"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Upload, Download, Image as ImageIcon, LayoutGrid, Grid, Square, Columns } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LayoutType = "grid-2x2" | "grid-3x3" | "row" | "column" | "masonry";

export default function CollageMakerPage() {
    const [images, setImages] = useState<string[]>([]);
    const [layout, setLayout] = useState<LayoutType>("grid-2x2");
    const [gap, setGap] = useState(10);
    const [borderRadius, setBorderRadius] = useState(0);
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [aspectRatio, setAspectRatio] = useState(1); // 1:1 default

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...newImages]);
        }
    };

    const drawCollage = () => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Canvas Setup
        const width = 1200;
        const height = width / aspectRatio;
        canvas.width = width;
        canvas.height = height;

        // Background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);

        // Layout Logic
        const loadedImages = images.map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });

        // Wait for all images to load (simple check, in production use promises)
        // For this demo, we assume they are loaded since they are object URLs from local files
        // But to be safe, we'll just try to draw them. 
        // A better approach is to load them all first.

        const drawImage = (img: HTMLImageElement, x: number, y: number, w: number, h: number) => {
            if (!img.complete) return;

            ctx.save();
            ctx.beginPath();
            ctx.roundRect(x, y, w, h, borderRadius);
            ctx.clip();

            // Object fit: cover
            const scale = Math.max(w / img.width, h / img.height);
            const tx = x + (w - img.width * scale) / 2;
            const ty = y + (h - img.height * scale) / 2;

            ctx.drawImage(img, tx, ty, img.width * scale, img.height * scale);
            ctx.restore();
        };

        // Simple Grid Logic
        if (layout === "grid-2x2") {
            const cols = 2;
            const rows = 2;
            const cellW = (width - gap * (cols + 1)) / cols;
            const cellH = (height - gap * (rows + 1)) / rows;

            loadedImages.slice(0, 4).forEach((img, i) => {
                const col = i % cols;
                const row = Math.floor(i / cols);
                const x = gap + col * (cellW + gap);
                const y = gap + row * (cellH + gap);
                drawImage(img, x, y, cellW, cellH);
            });
        } else if (layout === "grid-3x3") {
            const cols = 3;
            const rows = 3;
            const cellW = (width - gap * (cols + 1)) / cols;
            const cellH = (height - gap * (rows + 1)) / rows;

            loadedImages.slice(0, 9).forEach((img, i) => {
                const col = i % cols;
                const row = Math.floor(i / cols);
                const x = gap + col * (cellW + gap);
                const y = gap + row * (cellH + gap);
                drawImage(img, x, y, cellW, cellH);
            });
        } else if (layout === "row") {
            const count = Math.min(images.length, 4);
            const cellW = (width - gap * (count + 1)) / count;
            const cellH = height - gap * 2;

            loadedImages.slice(0, count).forEach((img, i) => {
                const x = gap + i * (cellW + gap);
                const y = gap;
                drawImage(img, x, y, cellW, cellH);
            });
        } else if (layout === "column") {
            const count = Math.min(images.length, 4);
            const cellW = width - gap * 2;
            const cellH = (height - gap * (count + 1)) / count;

            loadedImages.slice(0, count).forEach((img, i) => {
                const x = gap;
                const y = gap + i * (cellH + gap);
                drawImage(img, x, y, cellW, cellH);
            });
        }
    };

    // Trigger draw when dependencies change
    useEffect(() => {
        // Small delay to ensure images are "ready"
        const timer = setTimeout(drawCollage, 100);
        return () => clearTimeout(timer);
    }, [images, layout, gap, borderRadius, backgroundColor, aspectRatio]);

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const link = document.createElement("a");
        link.download = "collage.png";
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
                        <h1 className="text-4xl font-black text-gradient">Collage Maker</h1>
                        <p className="text-zinc-400 text-lg">Combine your photos into beautiful layouts.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => document.getElementById('collage-upload')?.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                    >
                        <Upload size={18} />
                        Add Images
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={images.length === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download size={18} />
                        Download
                    </button>
                </div>
                <input type="file" id="collage-upload" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Canvas Area */}
                <div className="lg:col-span-8">
                    <div className="glass-card p-4 flex items-center justify-center bg-zinc-950/50 min-h-[600px] overflow-hidden rounded-xl border border-white/10 relative">
                        {images.length === 0 && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 pointer-events-none">
                                <ImageIcon size={64} className="mb-4 opacity-20" />
                                <p>Add images to start creating</p>
                            </div>
                        )}
                        <canvas
                            ref={canvasRef}
                            className="max-w-full h-auto shadow-2xl"
                        />
                    </div>

                    {/* Image List */}
                    <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                        {images.map((src, i) => (
                            <div key={i} className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-white/10 group">
                                <img src={src} alt={`img-${i}`} className="w-full h-full object-cover" />
                                <button
                                    onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Layouts */}
                    <div className="glass-card p-6 space-y-4">
                        <h3 className="font-semibold text-sm text-zinc-400 uppercase flex items-center gap-2">
                            <LayoutGrid size={16} /> Layouts
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => setLayout("grid-2x2")} className={cn("p-3 rounded-lg border flex flex-col items-center gap-2 transition-colors", layout === "grid-2x2" ? "bg-blue-500/20 border-blue-500 text-blue-400" : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800")}>
                                <Grid size={24} />
                                <span className="text-xs">2x2 Grid</span>
                            </button>
                            <button onClick={() => setLayout("grid-3x3")} className={cn("p-3 rounded-lg border flex flex-col items-center gap-2 transition-colors", layout === "grid-3x3" ? "bg-blue-500/20 border-blue-500 text-blue-400" : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800")}>
                                <Grid size={24} />
                                <span className="text-xs">3x3 Grid</span>
                            </button>
                            <button onClick={() => setLayout("row")} className={cn("p-3 rounded-lg border flex flex-col items-center gap-2 transition-colors", layout === "row" ? "bg-blue-500/20 border-blue-500 text-blue-400" : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800")}>
                                <Columns size={24} className="rotate-90" />
                                <span className="text-xs">Row</span>
                            </button>
                            <button onClick={() => setLayout("column")} className={cn("p-3 rounded-lg border flex flex-col items-center gap-2 transition-colors", layout === "column" ? "bg-blue-500/20 border-blue-500 text-blue-400" : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800")}>
                                <Columns size={24} />
                                <span className="text-xs">Column</span>
                            </button>
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="glass-card p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400 uppercase">Gap</label>
                            <input
                                type="range"
                                min="0"
                                max="50"
                                value={gap}
                                onChange={(e) => setGap(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400 uppercase">Border Radius</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={borderRadius}
                                onChange={(e) => setBorderRadius(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400 uppercase">Background</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={backgroundColor}
                                    onChange={(e) => setBackgroundColor(e.target.value)}
                                    className="h-10 w-full bg-zinc-900 border border-white/10 rounded-lg cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400 uppercase">Aspect Ratio</label>
                            <div className="grid grid-cols-3 gap-2">
                                {[1, 16 / 9, 4 / 3, 9 / 16].map((ratio) => (
                                    <button
                                        key={ratio}
                                        onClick={() => setAspectRatio(ratio)}
                                        className={cn(
                                            "py-2 rounded-lg text-xs font-medium border transition-colors",
                                            aspectRatio === ratio
                                                ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                                : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800"
                                        )}
                                    >
                                        {ratio === 1 ? "1:1" : ratio === 16 / 9 ? "16:9" : ratio === 4 / 3 ? "4:3" : "9:16"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
