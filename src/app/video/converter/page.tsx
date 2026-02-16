"use client";

import { useState, useCallback } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Upload,
    RefreshCw,
    FileVideo,
    CheckCircle2,
    Download,
    X,
    Settings,
    Film
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

const FORMATS = [
    { ext: "mp4", name: "MP4 (H.264)", icon: Film },
    { ext: "webm", name: "WebM (VP9)", icon: Film },
    { ext: "avi", name: "AVI", icon: FileVideo },
    { ext: "mov", name: "MOV (QuickTime)", icon: FileVideo },
    { ext: "mkv", name: "MKV", icon: FileVideo },
];

export default function VideoConverterPage() {
    const [file, setFile] = useState<File | null>(null);
    const [targetFormat, setTargetFormat] = useState("mp4");
    const [isConverting, setIsConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDone, setIsDone] = useState(false);

    const handleConvert = () => {
        setIsConverting(true);
        setProgress(0);

        // Mock conversion
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsConverting(false);
                    setIsDone(true);
                    return 100;
                }
                return prev + 2;
            });
        }, 80);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setIsDone(false);
            setProgress(0);
        }
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
                    <BackButton />
                    <div>
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Video Converter</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Convert videos to any format instantly.</m.p>
                    </div>
                </div>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8 lg:col-start-3 space-y-6"
                >
                    <div className="glass-card p-8 space-y-8">
                        {!file ? (
                            <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center gap-6 hover:bg-white/5 transition-colors relative">
                                <div className="p-6 rounded-full bg-zinc-900 shadow-xl">
                                    <Upload size={48} className="text-green-400" />
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-2xl font-bold text-white">Upload Video to Convert</h3>
                                    <p className="text-zinc-400">Supports all major video formats</p>
                                </div>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {/* File Info */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/50 border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-lg bg-green-500/20 text-green-400">
                                            <FileVideo size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold truncate max-w-[200px] md:max-w-md">{file.name}</h4>
                                            <p className="text-zinc-500 text-xs">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setFile(null)}
                                        className="p-2 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-red-400 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Format Selection */}
                                {!isDone && !isConverting && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                        <div className="space-y-4">
                                            <label className="text-zinc-300 font-bold flex items-center gap-2">
                                                <Settings size={16} className="text-green-400" />
                                                Convert To
                                            </label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {FORMATS.map((fmt) => (
                                                    <button
                                                        key={fmt.ext}
                                                        onClick={() => setTargetFormat(fmt.ext)}
                                                        className={cn(
                                                            "p-4 rounded-xl border text-left transition-all flex items-center gap-3",
                                                            targetFormat === fmt.ext
                                                                ? "bg-green-500/20 border-green-500 text-white"
                                                                : "bg-zinc-900/50 border-white/5 text-zinc-400 hover:bg-white/5"
                                                        )}
                                                    >
                                                        <fmt.icon size={20} />
                                                        <span className="font-bold uppercase">{fmt.ext}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleConvert}
                                            className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-lg shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                        >
                                            <RefreshCw size={20} />
                                            Convert Now
                                        </button>
                                    </div>
                                )}

                                {/* Progress */}
                                {isConverting && (
                                    <div className="space-y-4 animate-in fade-in">
                                        <div className="flex justify-between text-sm text-zinc-400">
                                            <span>Converting to {targetFormat.toUpperCase()}...</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-green-500 transition-all duration-300 ease-out"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Result */}
                                {isDone && (
                                    <div className="space-y-6 animate-in fade-in zoom-in-95">
                                        <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-center space-y-2">
                                            <div className="inline-flex p-3 rounded-full bg-green-500/20 text-green-400 mb-2">
                                                <CheckCircle2 size={32} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white">Conversion Successful!</h3>
                                            <p className="text-zinc-400">
                                                Your video has been converted to <span className="text-white uppercase">{targetFormat}</span>
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => {
                                                if (!file) return;
                                                const url = URL.createObjectURL(file);
                                                const a = document.createElement('a');
                                                a.href = url;
                                                a.download = `converted_${file.name.split('.')[0]}.${targetFormat}`;
                                                document.body.appendChild(a);
                                                a.click();
                                                document.body.removeChild(a);
                                                URL.revokeObjectURL(url);
                                            }}
                                            className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-lg shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                        >
                                            <Download size={20} />
                                            Download Converted Video
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </m.div>
            </div>
        </div>
    );
}
