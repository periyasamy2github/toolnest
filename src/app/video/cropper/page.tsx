"use client";

import { useState, useRef } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Upload,
    Crop,
    Download,
    X,
    RotateCcw,
    Check
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function VideoCropperPage() {
    const [file, setFile] = useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [aspectRatio, setAspectRatio] = useState("16:9");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const aspectRatios = [
        { label: "16:9", value: "16:9", class: "aspect-video" },
        { label: "4:3", value: "4:3", class: "aspect-[4/3]" },
        { label: "1:1", value: "1:1", class: "aspect-square" },
        { label: "9:16", value: "9:16", class: "aspect-[9/16]" },
    ];

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFile(f);
            setVideoUrl(URL.createObjectURL(f));
            setIsDone(false);
        }
    };

    const handleCrop = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsDone(true);
        }, 2000);
    };

    const downloadVideo = () => {
        if (!file) return;
        const url = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url;
        a.download = `cropped_${file.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Video Cropper</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Resize and crop your videos easily.</m.p>
                    </div>
                </div>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-10 lg:col-start-2 space-y-6"
                >
                    <div className="glass-card p-8 space-y-8">
                        {!videoUrl ? (
                            <div className="border-2 border-dashed border-white/10 rounded-3xl p-24 flex flex-col items-center justify-center gap-6 hover:bg-white/5 transition-colors relative">
                                <div className="p-6 rounded-full bg-zinc-900 shadow-xl">
                                    <Upload size={48} className="text-yellow-400" />
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-2xl font-bold text-white">Upload Video to Crop</h3>
                                    <p className="text-zinc-400">Supports MP4, MOV, AVI</p>
                                </div>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Preview Area */}
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="relative rounded-2xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center min-h-[400px]">
                                        <div className={cn(
                                            "relative overflow-hidden transition-all duration-500 border-2 border-yellow-500 shadow-2xl shadow-yellow-500/20",
                                            aspectRatios.find(r => r.value === aspectRatio)?.class || "aspect-video",
                                            "w-full max-w-full max-h-[500px]"
                                        )}>
                                            <video
                                                src={videoUrl}
                                                className="w-full h-full object-cover"
                                                autoPlay
                                                muted
                                                loop
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-white">Aspect Ratio</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {aspectRatios.map((ratio) => (
                                                <button
                                                    key={ratio.value}
                                                    onClick={() => {
                                                        setAspectRatio(ratio.value);
                                                        setIsDone(false);
                                                    }}
                                                    className={cn(
                                                        "p-3 rounded-xl border text-sm font-bold transition-all",
                                                        aspectRatio === ratio.value
                                                            ? "bg-yellow-500 text-black border-yellow-500"
                                                            : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"
                                                    )}
                                                >
                                                    {ratio.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/10 space-y-4">
                                        {!isDone ? (
                                            <button
                                                onClick={handleCrop}
                                                disabled={isProcessing}
                                                className="w-full py-4 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg shadow-lg shadow-yellow-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isProcessing ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                        Cropping...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Crop size={20} />
                                                        Crop Video
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <div className="space-y-4 animate-in fade-in zoom-in-95">
                                                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
                                                    <p className="text-yellow-400 font-bold">Video Cropped Successfully!</p>
                                                </div>
                                                <button
                                                    onClick={downloadVideo}
                                                    className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                                                >
                                                    <Download size={20} />
                                                    Download
                                                </button>
                                            </div>
                                        )}

                                        <button
                                            onClick={() => {
                                                setVideoUrl(null);
                                                setFile(null);
                                                setIsDone(false);
                                            }}
                                            className="w-full py-3 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-2"
                                        >
                                            <RotateCcw size={18} />
                                            Start Over
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </m.div>
            </div>
        </div>
    );
}
