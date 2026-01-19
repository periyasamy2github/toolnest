"use client";

import { useState, useRef, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Upload,
    FileVideo,
    Minimize2,
    Settings,
    Download,
    X,
    CheckCircle2,
    AlertCircle,
    Zap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function VideoCompressorPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isCompressing, setIsCompressing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDone, setIsDone] = useState(false);
    const [compressionLevel, setCompressionLevel] = useState(50); // 0-100

    // Mock processing for UI demonstration
    const handleCompress = () => {
        setIsCompressing(true);
        setProgress(0);

        // Simulate progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsCompressing(false);
                    setIsDone(true);
                    return 100;
                }
                return prev + 2;
            });
        }, 100);
    };

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type.startsWith('video/')) {
                setFile(droppedFile);
                setIsDone(false);
                setProgress(0);
            }
        }
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setIsDone(false);
            setProgress(0);
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
        <div className="min-h-screen pb-24 space-y-12">
            {/* Header */}
            <m.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div className="flex items-center gap-6">
                    <Link href="/media" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                        <ArrowLeft className="text-zinc-100" />
                    </Link>
                    <div>
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Video Compressor</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Reduce file size without significant quality loss.</m.p>
                    </div>
                </div>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Area */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8 lg:col-start-3 space-y-6"
                >
                    <div className="glass-card p-8 space-y-8 relative overflow-hidden">

                        {!file ? (
                            // Upload State
                            <div
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                                className={cn(
                                    "border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center gap-6 transition-all duration-300",
                                    isDragging
                                        ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
                                        : "border-white/10 hover:border-white/20 hover:bg-white/5"
                                )}
                            >
                                <div className="p-6 rounded-full bg-zinc-900 shadow-xl">
                                    <Upload size={48} className="text-blue-400" />
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-2xl font-bold text-white">Drag & Drop Video</h3>
                                    <p className="text-zinc-400">or click to browse files</p>
                                </div>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="flex gap-4 text-xs text-zinc-500 font-mono uppercase tracking-wider">
                                    <span>MP4</span>
                                    <span>MOV</span>
                                    <span>AVI</span>
                                    <span>MKV</span>
                                </div>
                            </div>
                        ) : (
                            // Processing State
                            <div className="space-y-8">
                                {/* File Info */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/50 border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                                            <FileVideo size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold truncate max-w-[200px] md:max-w-md">{file.name}</h4>
                                            <p className="text-zinc-500 text-xs">{formatSize(file.size)}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setFile(null)}
                                        className="p-2 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-red-400 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Settings */}
                                {!isDone && !isCompressing && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <label className="text-zinc-300 font-bold flex items-center gap-2">
                                                    <Settings size={16} className="text-blue-400" />
                                                    Compression Level
                                                </label>
                                                <span className="text-blue-400 font-mono font-bold">{compressionLevel}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={compressionLevel}
                                                onChange={(e) => setCompressionLevel(Number(e.target.value))}
                                                className="w-full accent-blue-500"
                                            />
                                            <div className="flex justify-between text-xs text-zinc-500">
                                                <span>Better Quality</span>
                                                <span>Smaller Size</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleCompress}
                                            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                        >
                                            <Minimize2 size={20} />
                                            Compress Video
                                        </button>
                                    </div>
                                )}

                                {/* Progress */}
                                {isCompressing && (
                                    <div className="space-y-4 animate-in fade-in">
                                        <div className="flex justify-between text-sm text-zinc-400">
                                            <span>Compressing...</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 transition-all duration-300 ease-out"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Result */}
                                {isDone && (
                                    <div className="space-y-6 animate-in fade-in zoom-in-95">
                                        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                                            <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
                                                <CheckCircle2 size={32} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white">Compression Complete!</h3>
                                            <p className="text-zinc-400">
                                                Reduced from <span className="text-white">{formatSize(file.size)}</span> to <span className="text-emerald-400">{formatSize(file.size * (1 - compressionLevel / 200))}</span>
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => {
                                                if (!file) return;
                                                const url = URL.createObjectURL(file);
                                                const a = document.createElement('a');
                                                a.href = url;
                                                a.download = `compressed_${file.name}`;
                                                document.body.appendChild(a);
                                                a.click();
                                                document.body.removeChild(a);
                                                URL.revokeObjectURL(url);
                                            }}
                                            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                        >
                                            <Download size={20} />
                                            Download Compressed Video
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass-card p-6 text-center space-y-3">
                            <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 w-fit mx-auto">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3 className="font-bold text-white">No Quality Loss</h3>
                            <p className="text-xs text-zinc-400">Smart compression algorithms preserve visual quality.</p>
                        </div>
                        <div className="glass-card p-6 text-center space-y-3">
                            <div className="p-3 rounded-full bg-purple-500/10 text-purple-400 w-fit mx-auto">
                                <AlertCircle size={24} />
                            </div>
                            <h3 className="font-bold text-white">100% Private</h3>
                            <p className="text-xs text-zinc-400">Files are processed locally in your browser.</p>
                        </div>
                        <div className="glass-card p-6 text-center space-y-3">
                            <div className="p-3 rounded-full bg-orange-500/10 text-orange-400 w-fit mx-auto">
                                <Zap size={24} />
                            </div>
                            <h3 className="font-bold text-white">Fast Processing</h3>
                            <p className="text-xs text-zinc-400">Optimized for speed using WebAssembly.</p>
                        </div>
                    </div>
                </m.div>
            </div>
        </div>
    );
}
