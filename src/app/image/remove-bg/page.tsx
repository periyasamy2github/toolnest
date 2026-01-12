"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Upload, Image as ImageIcon, Download, Loader2, AlertCircle, Eraser } from "lucide-react";
import Link from "next/link";
import { removeBackground } from "@imgly/background-removal";

export default function RemoveBgPage() {
    const [file, setFile] = useState<File | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState<string>("");

    const handleRemoveBg = async () => {
        if (!file) return;
        setIsLoading(true);
        setError("");
        setProcessedImage(null);
        setProgress("Initializing AI model...");

        // Check for SharedArrayBuffer support (required for @imgly/background-removal)
        if (typeof SharedArrayBuffer === 'undefined') {
            setError("Browser not supported: SharedArrayBuffer is missing. Please use a modern browser (Chrome, Edge, Firefox) and ensure the site is served with COOP/COEP headers.");
            setIsLoading(false);
            return;
        }

        try {
            const blob = await removeBackground(file, {
                progress: (key: any, current: any, total: any) => {
                    const percent = Math.round((current / total) * 100);
                    setProgress(`Processing: ${percent}%`);
                },
                debug: true,
            });

            const url = URL.createObjectURL(blob);
            setProcessedImage(url);
        } catch (err: any) {
            console.error("Bg Removal Error:", err);
            setError("Failed to remove background. " + (err.message || "Please check your internet connection and try again."));
        } finally {
            setIsLoading(false);
            setProgress("");
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex items-center gap-6">
                <Link href="/image" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                    <ArrowLeft className="text-zinc-100" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Background Remover</h1>
                    <p className="text-zinc-400 text-lg">Remove image backgrounds automatically using AI, 100% privately in your browser.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="glass-card p-8 space-y-8">
                        <div className="group relative border-2 border-dashed border-white/10 glass rounded-3xl p-12 text-center hover:border-blue-500/50 hover:bg-white/5 transition-all duration-500 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="hidden"
                                id="bg-upload"
                            />
                            <label htmlFor="bg-upload" className="relative cursor-pointer flex flex-col items-center gap-6">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-5 rounded-2xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                                    <Upload className="text-white" size={32} />
                                </div>
                                {file ? (
                                    <div className="space-y-2">
                                        <p className="text-xl font-bold text-white">{file.name}</p>
                                        <p className="text-zinc-400 font-medium">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <p className="text-xl font-bold text-white">Click to upload image</p>
                                        <p className="text-zinc-400 font-medium">Supports JPG, PNG (Max 10MB)</p>
                                    </div>
                                )}
                            </label>
                        </div>

                        {file && (
                            <button
                                onClick={handleRemoveBg}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Eraser size={24} />}
                                <span>{isLoading ? progress || "Processing..." : "Remove Background"}</span>
                            </button>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-8 rounded-3xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
                            <AlertCircle size={28} className="shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold mb-1">Error</h3>
                                <p className="text-red-400/80 leading-relaxed">{error}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-8">
                    {processedImage ? (
                        <div className="glass-card p-8 space-y-8 h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-white">Result</h3>
                                <div className="px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold">
                                    AI Processed
                                </div>
                            </div>
                            <div className="flex-1 bg-zinc-950/50 rounded-3xl border border-white/5 flex items-center justify-center p-6 overflow-hidden relative group">
                                {/* Checkerboard pattern for transparency */}
                                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                                    backgroundImage: `linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)`,
                                    backgroundSize: '20px 20px',
                                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                                }}></div>
                                <img src={processedImage} alt="No BG" className="max-w-full max-h-[400px] object-contain relative z-10 rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <a
                                href={processedImage}
                                download="no-bg.png"
                                className="flex items-center justify-center gap-3 w-full bg-white text-zinc-950 hover:bg-zinc-200 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:scale-[1.02] active:scale-95"
                            >
                                <Download size={24} />
                                Download Result
                            </a>
                        </div>
                    ) : (
                        <div className="h-full border-2 border-dashed border-white/5 glass rounded-3xl flex flex-col items-center justify-center text-zinc-500 p-12 text-center">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                <ImageIcon size={40} className="opacity-20" />
                            </div>
                            <p className="text-xl font-medium">Processed image will appear here</p>
                            <p className="text-sm mt-2">AI background removal happens entirely in your browser</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
