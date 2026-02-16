"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Image as ImageIcon, Check } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function FaviconGenerator() {
    const [image, setImage] = useState<string | null>(null);
    const [previewSize, setPreviewSize] = useState(32);
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
                // Draw high res for download
                canvas.width = 512;
                canvas.height = 512;
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // Simple center crop/fit
                    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                    const x = (canvas.width / 2) - (img.width / 2) * scale;
                    const y = (canvas.height / 2) - (img.height / 2) * scale;
                    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
                }
            };
        }
    }, [image]);

    const downloadFavicon = (size: number) => {
        if (!canvasRef.current) return;

        // Create a temporary canvas for resizing
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = size;
        tempCanvas.height = size;
        const ctx = tempCanvas.getContext('2d');

        if (ctx && canvasRef.current) {
            ctx.drawImage(canvasRef.current, 0, 0, size, size);
            const link = document.createElement('a');
            link.download = `favicon-${size}x${size}.png`;
            link.href = tempCanvas.toDataURL('image/png');
            link.click();
        }
    };

    const downloadIco = () => {
        // For .ico we usually need a library or server, but for client-side simple use, 
        // we can just download a 32x32 PNG and name it .ico (browsers often accept this), 
        // or stick to PNGs which are modern standard. 
        // Let's stick to standard PNG sizes.
        downloadFavicon(32);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Favicon <span className="text-purple-500">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Create perfect favicons for your website in seconds.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-80 border-2 border-dashed border-zinc-700 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group overflow-hidden relative"
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        {image ? (
                            <img
                                src={image}
                                alt="Preview"
                                className="w-full h-full object-contain p-4"
                            />
                        ) : (
                            <div className="text-center space-y-4 p-6">
                                <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                    <Upload size={32} className="text-zinc-400 group-hover:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-white">Upload Logo</p>
                                    <p className="text-sm text-zinc-500">Best with square images</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white">Preview</h3>
                        <div className="flex items-center gap-4 p-4 bg-zinc-950 rounded-xl border border-white/5">
                            <div className="w-4 h-4 rounded-full bg-red-500/20 border border-red-500/50" />
                            <div className="w-4 h-4 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                            <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/50" />
                            <div className="flex-1 bg-zinc-900 h-8 rounded-lg flex items-center px-3 gap-2">
                                <canvas
                                    ref={canvasRef}
                                    className="hidden" // Hidden source canvas
                                />
                                {image && (
                                    <img src={image} className="w-4 h-4 rounded-sm object-cover" alt="favicon" />
                                )}
                                <span className="text-xs text-zinc-500">toolnest.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => downloadFavicon(16)}
                            disabled={!image}
                            className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white p-4 rounded-xl flex items-center justify-between group transition-all"
                        >
                            <span className="text-sm font-medium">16x16</span>
                            <Download size={18} className="text-zinc-400 group-hover:text-white" />
                        </button>
                        <button
                            onClick={() => downloadFavicon(32)}
                            disabled={!image}
                            className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white p-4 rounded-xl flex items-center justify-between group transition-all"
                        >
                            <span className="text-sm font-medium">32x32</span>
                            <Download size={18} className="text-zinc-400 group-hover:text-white" />
                        </button>
                        <button
                            onClick={() => downloadFavicon(180)}
                            disabled={!image}
                            className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white p-4 rounded-xl flex items-center justify-between group transition-all"
                        >
                            <span className="text-sm font-medium">Apple Touch</span>
                            <Download size={18} className="text-zinc-400 group-hover:text-white" />
                        </button>
                        <button
                            onClick={() => downloadFavicon(512)}
                            disabled={!image}
                            className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white p-4 rounded-xl flex items-center justify-between group transition-all"
                        >
                            <span className="text-sm font-medium">512x512</span>
                            <Download size={18} className="text-zinc-400 group-hover:text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
