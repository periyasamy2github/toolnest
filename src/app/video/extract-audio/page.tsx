"use client";

import { useState } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Upload,
    Music,
    Download,
    FileAudio,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function ExtractAudioPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setIsDone(false);
        }
    };

    const handleExtract = () => {
        setIsProcessing(true);
        // Simulate processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsDone(true);
        }, 2000);
    };

    const downloadAudio = () => {
        if (!file) return;
        // In a real app, this would be the extracted audio blob
        // For demo, we just download the original file but named as mp3
        const url = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${file.name.split('.')[0]}.mp3`;
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
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Extract Audio</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Get MP3 audio from any video file.</m.p>
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
                                    <Music size={48} className="text-cyan-400" />
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-2xl font-bold text-white">Upload Video</h3>
                                    <p className="text-zinc-400">MP4, MOV, AVI, MKV supported</p>
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
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
                                        <FileAudio size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-white truncate">{file.name}</h4>
                                        <p className="text-sm text-zinc-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setFile(null);
                                            setIsDone(false);
                                        }}
                                        className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                                    >
                                        Change
                                    </button>
                                </div>

                                {!isDone ? (
                                    <button
                                        onClick={handleExtract}
                                        disabled={isProcessing}
                                        className="w-full py-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg shadow-lg shadow-cyan-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Extracting Audio...
                                            </>
                                        ) : (
                                            <>
                                                <Music size={20} />
                                                Extract MP3
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div className="space-y-6 animate-in fade-in zoom-in-95">
                                        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center gap-3 text-cyan-300 font-bold">
                                            <CheckCircle2 size={20} />
                                            Audio Extracted Successfully!
                                        </div>
                                        <button
                                            onClick={downloadAudio}
                                            className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                                        >
                                            <Download size={20} />
                                            Download MP3
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
