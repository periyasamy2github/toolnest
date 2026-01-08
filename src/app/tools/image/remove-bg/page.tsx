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
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/tools/image" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Background Remover</h1>
                    <p className="text-zinc-400">Remove image backgrounds automatically using AI (Client-side).</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-zinc-500 hover:bg-zinc-900/50 transition-all">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="hidden"
                                id="bg-upload"
                            />
                            <label htmlFor="bg-upload" className="cursor-pointer flex flex-col items-center gap-4">
                                <div className="bg-zinc-800 p-4 rounded-full">
                                    <Upload className="text-zinc-400" size={32} />
                                </div>
                                {file ? (
                                    <div>
                                        <p className="font-medium text-zinc-200">{file.name}</p>
                                        <p className="text-sm text-zinc-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="font-medium text-zinc-200">Click to upload image</p>
                                        <p className="text-sm text-zinc-500">Supports JPG, PNG</p>
                                    </div>
                                )}
                            </label>
                        </div>

                        {file && (
                            <button
                                onClick={handleRemoveBg}
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <Eraser size={20} />}
                                {isLoading ? progress || "Processing..." : "Remove Background"}
                            </button>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl flex items-center gap-3">
                            <AlertCircle size={24} />
                            <div>
                                <h3 className="font-semibold">Error</h3>
                                <p>{error}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {processedImage ? (
                        <div className="glass-card p-6 space-y-4 h-full flex flex-col">
                            <h3 className="text-xl font-semibold text-zinc-100">Result</h3>
                            <div className="flex-1 bg-zinc-950/50 rounded-xl border border-white/5 flex items-center justify-center p-4 overflow-hidden checkerboard-bg relative">
                                {/* Checkerboard pattern for transparency */}
                                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                                    backgroundImage: `linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)`,
                                    backgroundSize: '20px 20px',
                                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                                }}></div>
                                <img src={processedImage} alt="No BG" className="max-w-full max-h-[300px] object-contain relative z-10" />
                            </div>
                            <a
                                href={processedImage}
                                download="no-bg.png"
                                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-medium transition-colors"
                            >
                                <Download size={20} />
                                Download Result
                            </a>
                        </div>
                    ) : (
                        <div className="h-full border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-600 p-8">
                            <ImageIcon size={48} className="mb-4 opacity-20" />
                            <p>Processed image will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
