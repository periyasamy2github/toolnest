"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Upload, Copy, Check, Palette } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ColorPalettePage() {
    const [image, setImage] = useState<string | null>(null);
    const [colors, setColors] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = image;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                extractColors(ctx!, img.width, img.height);
            };
        }
    }, [image]);

    const extractColors = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const imageData = ctx.getImageData(0, 0, width, height).data;
        const pixels: [number, number, number][] = [];

        // Sample pixels more densely (every 5th pixel)
        for (let i = 0; i < imageData.length; i += 20) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            const a = imageData[i + 3];

            // Skip transparent pixels
            if (a < 125) continue;

            // Skip very dark and very light pixels
            const brightness = (r + g + b) / 3;
            if (brightness < 20 || brightness > 235) continue;

            pixels.push([r, g, b]);
        }

        // Simple color quantization - group similar colors
        const colorBuckets: { [key: string]: { count: number; r: number; g: number; b: number } } = {};
        const bucketSize = 32; // Group colors in 32-value ranges

        pixels.forEach(([r, g, b]) => {
            const bucketR = Math.floor(r / bucketSize) * bucketSize;
            const bucketG = Math.floor(g / bucketSize) * bucketSize;
            const bucketB = Math.floor(b / bucketSize) * bucketSize;
            const key = `${bucketR}-${bucketG}-${bucketB}`;

            if (!colorBuckets[key]) {
                colorBuckets[key] = { count: 0, r: 0, g: 0, b: 0 };
            }
            colorBuckets[key].count++;
            colorBuckets[key].r += r;
            colorBuckets[key].g += g;
            colorBuckets[key].b += b;
        });

        // Get average color from each bucket and sort by frequency
        const sortedColors = Object.values(colorBuckets)
            .map(bucket => ({
                color: rgbToHex(
                    Math.round(bucket.r / bucket.count),
                    Math.round(bucket.g / bucket.count),
                    Math.round(bucket.b / bucket.count)
                ),
                count: bucket.count
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 8)
            .map(item => item.color);

        setColors(sortedColors);
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    };

    const copyToClipboard = (color: string, index: number) => {
        navigator.clipboard.writeText(color);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/image" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Color Palette Extractor</h1>
                    <p className="text-zinc-400">Extract dominant colors from any image.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="glass-card p-6 aspect-square flex flex-col items-center justify-center relative overflow-hidden group">
                        {image ? (
                            <img src={image} alt="Uploaded" className="max-w-full max-h-full object-contain rounded-lg" />
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto">
                                    <Upload className="text-blue-400" size={32} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-zinc-200 font-medium">Click to upload image</p>
                                    <p className="text-zinc-500 text-sm">PNG, JPG, or WEBP</p>
                                </div>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                    <canvas ref={canvasRef} className="hidden" />
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <h3 className="font-semibold text-zinc-100 flex items-center gap-2">
                            <Palette size={20} className="text-purple-400" />
                            Extracted Palette
                        </h3>

                        {colors.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4">
                                {colors.map((color, index) => (
                                    <button
                                        key={index}
                                        onClick={() => copyToClipboard(color, index)}
                                        className="group relative flex flex-col gap-2 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left"
                                    >
                                        <div
                                            className="w-full h-12 rounded-lg shadow-inner"
                                            style={{ backgroundColor: color }}
                                        />
                                        <div className="flex items-center justify-between px-1">
                                            <span className="font-mono text-xs text-zinc-400 uppercase">{color}</span>
                                            {copiedIndex === index ? (
                                                <Check size={14} className="text-green-400" />
                                            ) : (
                                                <Copy size={14} className="text-zinc-600 group-hover:text-zinc-400" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center space-y-2">
                                <p className="text-zinc-500">Upload an image to see the palette</p>
                            </div>
                        )}
                    </div>

                    {image && (
                        <button
                            onClick={() => {
                                setImage(null);
                                setColors([]);
                            }}
                            className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-zinc-100 hover:bg-white/10 transition-all"
                        >
                            Clear Image
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
