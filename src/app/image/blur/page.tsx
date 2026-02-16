"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Eraser, Eye, EyeOff } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function BlurImage() {
    const [image, setImage] = useState<string | null>(null);
    const [blurAmount, setBlurAmount] = useState(10);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.src = image;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                if (ctx) {
                    ctx.filter = `blur(${blurAmount}px)`;
                    ctx.drawImage(img, 0, 0);
                    ctx.filter = 'none'; // Reset filter
                }
            };
        }
    }, [image, blurAmount]);

    const downloadImage = () => {
        if (!canvasRef.current) return;
        const link = document.createElement('a');
        link.download = 'blurred-image.png';
        link.href = canvasRef.current.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Blur <span className="text-zinc-500">Image</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Apply blur effects to your images for privacy or aesthetics.
                </p>
            </div>

            <div className="space-y-8">
                {!image ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-96 border-2 border-dashed border-zinc-700 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-zinc-500/50 hover:bg-zinc-500/5 transition-all group"
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Upload size={32} className="text-zinc-400 group-hover:text-white" />
                        </div>
                        <p className="text-lg font-medium text-white">Upload Image to Blur</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1 w-full relative group">
                                    <canvas
                                        ref={canvasRef}
                                        className="w-full h-auto rounded-xl border border-white/10"
                                    />
                                    <button
                                        onClick={() => setImage(null)}
                                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Eraser size={20} />
                                    </button>
                                </div>

                                <div className="w-full md:w-72 space-y-6">
                                    <div className="space-y-4">
                                        <label className="flex justify-between text-sm font-medium text-zinc-400">
                                            <span>Blur Intensity</span>
                                            <span>{blurAmount}px</span>
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="50"
                                            value={blurAmount}
                                            onChange={(e) => setBlurAmount(parseInt(e.target.value))}
                                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                                        />
                                    </div>

                                    <button
                                        onClick={downloadImage}
                                        className="w-full bg-white hover:bg-zinc-200 text-black px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                                    >
                                        <Download size={20} />
                                        Download Image
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
