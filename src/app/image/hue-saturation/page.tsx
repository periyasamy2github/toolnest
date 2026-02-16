"use client";

import { useState, useRef, useEffect } from "react";
import { m } from "framer-motion";
import {
    Image as ImageIcon,
    Upload,
    Download,
    RotateCcw,
    Palette,
    Droplets,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function HueSaturation() {
    const [image, setImage] = useState<string | null>(null);
    const [hue, setHue] = useState(0);
    const [saturation, setSaturation] = useState(100);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (image) {
            applyFilters();
        }
    }, [hue, saturation, image]);

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target?.result as string);
            setHue(0);
            setSaturation(100);
        };
        reader.readAsDataURL(file);
    };

    const applyFilters = () => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = image;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.filter = `hue-rotate(${hue}deg) saturate(${saturation}%)`;
            ctx.drawImage(img, 0, 0);
        };
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement("a");
        link.download = "edited-image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Hue & <span className="text-purple-500">Saturation</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Adjust color tones and intensity of your images.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor Section */}
                <div className="lg:col-span-2 space-y-4">
                    <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        className={cn(
                            "relative aspect-video rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center overflow-hidden bg-zinc-900/50",
                            isDragging
                                ? "border-purple-500 bg-purple-500/10"
                                : "border-white/10"
                        )}
                    >
                        {!image ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="cursor-pointer text-center space-y-4 p-6 w-full h-full flex flex-col items-center justify-center group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <ImageIcon size={32} />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-white">
                                        Drop image here or click to upload
                                    </p>
                                    <p className="text-sm text-zinc-500 mt-2">
                                        Supports JPG, PNG, WEBP
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="relative w-full h-full flex items-center justify-center p-4">
                                <canvas
                                    ref={canvasRef}
                                    className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                                />
                                <button
                                    onClick={() => setImage(null)}
                                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500/80 text-white rounded-full backdrop-blur-sm transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                        />
                    </div>
                </div>

                {/* Controls Section */}
                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                        <Palette size={18} />
                                        Hue Rotate
                                    </label>
                                    <span className="text-xs font-bold text-white bg-white/10 px-2 py-1 rounded">
                                        {hue}°
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={hue}
                                    onChange={(e) => setHue(parseInt(e.target.value))}
                                    className="w-full accent-purple-500"
                                    disabled={!image}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                        <Droplets size={18} />
                                        Saturation
                                    </label>
                                    <span className="text-xs font-bold text-white bg-white/10 px-2 py-1 rounded">
                                        {saturation}%
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={saturation}
                                    onChange={(e) => setSaturation(parseInt(e.target.value))}
                                    className="w-full accent-purple-500"
                                    disabled={!image}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                            <button
                                onClick={() => {
                                    setHue(0);
                                    setSaturation(100);
                                }}
                                disabled={!image}
                                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <RotateCcw size={18} />
                                Reset
                            </button>
                            <button
                                onClick={downloadImage}
                                disabled={!image}
                                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-500 text-white hover:bg-purple-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
