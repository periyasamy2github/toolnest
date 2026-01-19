"use client";

import { useState, useRef } from "react";
import { ArrowLeft, Upload, Download, FileImage, Settings, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";

type Format = "image/jpeg" | "image/png" | "image/webp" | "image/bmp" | "image/gif" | "image/x-icon";

interface ImageFile {
    id: string;
    file: File;
    preview: string;
    status: "pending" | "converting" | "done" | "error";
    convertedUrl?: string;
    originalSize: number;
    convertedSize?: number;
}

export default function ImageConverterPage() {
    const [files, setFiles] = useState<ImageFile[]>([]);
    const [targetFormat, setTargetFormat] = useState<Format>("image/jpeg");
    const [quality, setQuality] = useState(0.8);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).map(file => ({
                id: crypto.randomUUID(),
                file,
                preview: URL.createObjectURL(file),
                status: "pending" as const,
                originalSize: file.size
            }));
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const convertImage = async (imageFile: ImageFile): Promise<ImageFile> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    resolve({ ...imageFile, status: "error" });
                    return;
                }

                // Fill white background for JPEGs (transparency fix)
                if (targetFormat === "image/jpeg" || targetFormat === "image/bmp") {
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                ctx.drawImage(img, 0, 0);

                canvas.toBlob((blob) => {
                    if (!blob) {
                        resolve({ ...imageFile, status: "error" });
                        return;
                    }
                    const convertedUrl = URL.createObjectURL(blob);
                    resolve({
                        ...imageFile,
                        status: "done",
                        convertedUrl,
                        convertedSize: blob.size
                    });
                }, targetFormat, quality);
            };
            img.onerror = () => resolve({ ...imageFile, status: "error" });
            img.src = imageFile.preview;
        });
    };

    const handleConvertAll = async () => {
        setIsProcessing(true);
        const pendingFiles = files.filter(f => f.status === "pending");

        // Process sequentially to avoid freezing UI
        for (const file of pendingFiles) {
            setFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: "converting" } : f));
            const result = await convertImage(file);
            setFiles(prev => prev.map(f => f.id === file.id ? result : f));
        }
        setIsProcessing(false);
    };

    const removeFile = (id: string) => {
        setFiles(files.filter(f => f.id !== id));
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const getFormatExt = (format: Format) => {
        switch (format) {
            case "image/jpeg": return "jpg";
            case "image/png": return "png";
            case "image/webp": return "webp";
            case "image/bmp": return "bmp";
            case "image/gif": return "gif";
            case "image/x-icon": return "ico";
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/media" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Image Converter</h1>
                    <p className="text-zinc-400 text-lg">Batch convert images to JPG, PNG, WEBP, BMP, GIF, or ICO.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Settings Panel */}
                <div className="space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Settings size={20} className="text-blue-400" />
                            Conversion Settings
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Target Format</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(["image/jpeg", "image/png", "image/webp", "image/bmp", "image/gif", "image/x-icon"] as Format[]).map((fmt) => (
                                        <button
                                            key={fmt}
                                            onClick={() => setTargetFormat(fmt)}
                                            className={cn(
                                                "px-3 py-2 rounded-lg text-sm font-medium transition-all border",
                                                targetFormat === fmt
                                                    ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                                    : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800"
                                            )}
                                        >
                                            {fmt.split("/")[1].replace("x-icon", "ico").toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {targetFormat !== "image/png" && targetFormat !== "image/gif" && targetFormat !== "image/bmp" && (
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <label className="text-sm font-medium text-zinc-300">Quality</label>
                                        <span className="text-sm text-zinc-400">{Math.round(quality * 100)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="1"
                                        step="0.1"
                                        value={quality}
                                        onChange={(e) => setQuality(Number(e.target.value))}
                                        className="w-full accent-blue-500"
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleConvertAll}
                            disabled={isProcessing || files.filter(f => f.status === "pending").length === 0}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isProcessing ? <RefreshCw className="animate-spin" size={20} /> : <RefreshCw size={20} />}
                            {isProcessing ? "Converting..." : "Convert All"}
                        </button>
                    </div>

                    <div className="glass-card p-6 border-dashed border-2 border-zinc-800 hover:border-zinc-700 transition-colors text-center cursor-pointer relative">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-4 py-8">
                            <div className="bg-zinc-800 p-4 rounded-full">
                                <Upload className="text-zinc-400" size={32} />
                            </div>
                            <div>
                                <p className="text-zinc-200 font-medium">Click to upload images</p>
                                <p className="text-sm text-zinc-500">JPG, PNG, WEBP, BMP, GIF, ICO supported</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* File List */}
                <div className="lg:col-span-2 space-y-4">
                    {files.length === 0 ? (
                        <div className="glass-card p-12 flex flex-col items-center justify-center text-zinc-500 min-h-[400px]">
                            <FileImage size={64} className="mb-4 opacity-20" />
                            <p>No images uploaded yet</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <AnimatePresence>
                                {files.map((file) => (
                                    <m.div
                                        key={file.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="glass-card p-4 flex items-center gap-4"
                                    >
                                        <div className="w-16 h-16 bg-zinc-900 rounded-lg overflow-hidden shrink-0 border border-white/10">
                                            <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-zinc-200 font-medium truncate">{file.file.name}</p>
                                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                <span>{formatSize(file.originalSize)}</span>
                                                {file.convertedSize && (
                                                    <>
                                                        <span>→</span>
                                                        <span className="text-blue-400">{formatSize(file.convertedSize)}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {file.status === "pending" && <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">Pending</span>}
                                            {file.status === "converting" && <RefreshCw size={18} className="text-blue-400 animate-spin" />}
                                            {file.status === "done" && (
                                                <a
                                                    href={file.convertedUrl}
                                                    download={`converted-${file.file.name.split('.')[0]}.${getFormatExt(targetFormat)}`}
                                                    className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                                                >
                                                    <Download size={18} />
                                                </a>
                                            )}
                                            {file.status === "error" && <XCircle size={18} className="text-red-400" />}

                                            <button
                                                onClick={() => removeFile(file.id)}
                                                className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                                            >
                                                <XCircle size={18} />
                                            </button>
                                        </div>
                                    </m.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
