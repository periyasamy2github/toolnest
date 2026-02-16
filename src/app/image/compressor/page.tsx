"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowLeft, Upload, Download, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";

export default function ImageCompressorPage() {
    const [file, setFile] = useState<File | null>(null);
    const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
    const [quality, setQuality] = useState(0.8);
    const [isCompressing, setIsCompressing] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.[0]) {
            setFile(acceptedFiles[0]);
            setCompressedFile(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        },
        maxFiles: 1
    });

    const compressImage = async () => {
        if (!file) return;
        setIsCompressing(true);

        try {
            const imageBitmap = await createImageBitmap(file);
            const canvas = document.createElement('canvas');
            canvas.width = imageBitmap.width;
            canvas.height = imageBitmap.height;
            const ctx = canvas.getContext('2d');

            if (!ctx) throw new Error("Could not get canvas context");

            // Fill with white background (important for transparent PNGs converting to JPEG)
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(imageBitmap, 0, 0);

            // Always compress to JPEG for best results, unless it's already a WebP
            const outputType = file.type === 'image/webp' ? 'image/webp' : 'image/jpeg';

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        setCompressedFile(blob);
                    }
                    setIsCompressing(false);
                },
                outputType,
                quality
            );
        } catch (error) {
            console.error("Compression failed", error);
            setIsCompressing(false);
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex items-center gap-6">
                <BackButton />
                <div>
                    <h1 className="text-4xl font-black text-gradient">Image Compressor</h1>
                    <p className="text-zinc-400 text-lg">Reduce image file size without significant quality loss, 100% privately.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Upload Section */}
                <div className="space-y-8">
                    <div
                        {...getRootProps()}
                        className={cn(
                            "group relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-500 h-80 flex flex-col items-center justify-center overflow-hidden",
                            isDragActive
                                ? "border-blue-500 bg-blue-500/10 scale-[1.02] shadow-2xl shadow-blue-500/20"
                                : "border-white/10 glass hover:border-blue-500/50 hover:bg-white/5"
                        )}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <input {...getInputProps()} />
                        <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-5 rounded-2xl mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                            <Upload className="text-white" size={32} />
                        </div>
                        <div className="relative space-y-2">
                            {file ? (
                                <>
                                    <p className="text-xl font-bold text-white">{file.name}</p>
                                    <p className="text-zinc-400 font-medium">{formatSize(file.size)}</p>
                                </>
                            ) : (
                                <>
                                    <p className="text-xl font-bold text-white">Drop image here or click to upload</p>
                                    <p className="text-zinc-400 font-medium">Supports JPG, PNG, WebP (Max 10MB)</p>
                                </>
                            )}
                        </div>
                    </div>

                    {file && (
                        <div className="glass-card p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <label className="text-lg font-bold text-white">Compression Quality</label>
                                    <span className="text-2xl font-black text-blue-400">{Math.round(quality * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={quality}
                                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                    <span>Small Size</span>
                                    <span>Best Quality</span>
                                </div>
                            </div>

                            <button
                                onClick={compressImage}
                                disabled={isCompressing}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isCompressing ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} />
                                        <span>Optimizing...</span>
                                    </>
                                ) : (
                                    <>
                                        <ImageIcon size={24} />
                                        <span>Compress Image</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Result Section */}
                <div className="space-y-8">
                    {compressedFile ? (
                        <div className="glass-card p-8 space-y-8 h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-white">Optimization Result</h3>
                                <div className="px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-bold">
                                    Success
                                </div>
                            </div>

                            <div className="flex-1 bg-zinc-950/50 rounded-3xl border border-white/5 flex items-center justify-center p-6 overflow-hidden relative group">
                                <img
                                    src={URL.createObjectURL(compressedFile)}
                                    alt="Compressed"
                                    className="max-w-full max-h-[400px] object-contain rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="glass p-4 rounded-2xl border border-white/5">
                                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Original</div>
                                    <div className="text-lg font-black text-white">{file ? formatSize(file.size) : '-'}</div>
                                </div>
                                <div className="bg-green-500/10 p-4 rounded-2xl border border-green-500/20">
                                    <div className="text-xs font-bold text-green-500/60 uppercase tracking-widest mb-1">Optimized</div>
                                    <div className="text-lg font-black text-green-400">{formatSize(compressedFile.size)}</div>
                                </div>
                                <div className="bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
                                    <div className="text-xs font-bold text-blue-500/60 uppercase tracking-widest mb-1">Reduction</div>
                                    <div className="text-lg font-black text-blue-400">
                                        {file ? Math.round((1 - compressedFile.size / file.size) * 100) : 0}%
                                    </div>
                                </div>
                            </div>

                            <a
                                href={URL.createObjectURL(compressedFile)}
                                download={`compressed-${file?.name.split('.')[0]}.jpg`}
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
                            <p className="text-xl font-medium">Optimized preview will appear here</p>
                            <p className="text-sm mt-2">Upload an image to see the magic</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
