"use client";

import { useState, useRef } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Upload,
    Film,
    Download,
    X,
    Play,
    Pause,
    Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function VideoToGifPage() {
    const [file, setFile] = useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFile(f);
            setVideoUrl(URL.createObjectURL(f));
            setIsDone(false);
        }
    };

    const handleConvert = () => {
        setIsConverting(true);
        setTimeout(() => {
            setIsConverting(false);
            setIsDone(true);
        }, 3000);
    };

    const downloadGif = () => {
        if (!file) return;
        const url = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${file.name.split('.')[0]}.gif`;
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
                    <BackButton />
                    <div>
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Video to GIF</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Turn your favorite video moments into GIFs.</m.p>
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
                        {!videoUrl ? (
                            <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center gap-6 hover:bg-white/5 transition-colors relative">
                                <div className="p-6 rounded-full bg-zinc-900 shadow-xl">
                                    <Film size={48} className="text-purple-400" />
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-2xl font-bold text-white">Upload Video</h3>
                                    <p className="text-zinc-400">MP4, MOV, AVI supported</p>
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
                                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl">
                                    <video
                                        src={videoUrl}
                                        controls
                                        className="w-full h-full object-contain"
                                    />
                                    <button
                                        onClick={() => {
                                            setVideoUrl(null);
                                            setFile(null);
                                            setIsDone(false);
                                        }}
                                        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-red-500 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {!isDone ? (
                                    <button
                                        onClick={handleConvert}
                                        disabled={isConverting}
                                        className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isConverting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Generating GIF...
                                            </>
                                        ) : (
                                            <>
                                                <ImageIcon size={20} />
                                                Generate GIF
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div className="space-y-6 animate-in fade-in zoom-in-95">
                                        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                                            <p className="text-purple-300 font-bold">GIF Generated Successfully!</p>
                                        </div>
                                        <button
                                            onClick={downloadGif}
                                            className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                                        >
                                            <Download size={20} />
                                            Download GIF
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
