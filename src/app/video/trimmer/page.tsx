"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Upload,
    Scissors,
    Play,
    Pause,
    Download,
    X,
    RotateCcw
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function VideoTrimmerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [range, setRange] = useState<[number, number]>([0, 100]); // Percentage

    const videoRef = useRef<HTMLVideoElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFile(f);
            setVideoUrl(URL.createObjectURL(f));
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            // Loop if out of range
            const end = (range[1] / 100) * duration;
            if (videoRef.current.currentTime >= end) {
                videoRef.current.pause();
                setIsPlaying(false);
                videoRef.current.currentTime = (range[0] / 100) * duration;
            }
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Video Trimmer</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Cut and extract clips with precision.</m.p>
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
                                    <Upload size={48} className="text-red-400" />
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-2xl font-bold text-white">Upload Video to Trim</h3>
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
                            <div className="space-y-6">
                                {/* Video Player */}
                                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl">
                                    <video
                                        ref={videoRef}
                                        src={videoUrl}
                                        className="w-full h-full object-contain"
                                        onTimeUpdate={handleTimeUpdate}
                                        onLoadedMetadata={handleLoadedMetadata}
                                        onClick={togglePlay}
                                    />

                                    {/* Overlay Controls */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        {!isPlaying && (
                                            <div className="p-6 rounded-full bg-white/10 backdrop-blur-md text-white animate-in zoom-in">
                                                <Play size={48} fill="currentColor" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Timeline Controls */}
                                <div className="p-6 rounded-2xl bg-zinc-950/50 border border-white/5 space-y-6">
                                    <div className="flex justify-between items-center text-sm font-mono text-zinc-400">
                                        <span>{formatTime((range[0] / 100) * duration)}</span>
                                        <span className="text-white font-bold">{formatTime(currentTime)}</span>
                                        <span>{formatTime((range[1] / 100) * duration)}</span>
                                    </div>

                                    {/* Range Slider Mockup */}
                                    <div className="relative h-12 bg-zinc-900 rounded-lg overflow-hidden">
                                        {/* Track */}
                                        <div className="absolute inset-0 flex items-center px-2">
                                            <div className="w-full h-2 bg-zinc-800 rounded-full" />
                                        </div>

                                        {/* Selected Range */}
                                        <div
                                            className="absolute top-0 bottom-0 bg-red-500/20 border-x-2 border-red-500 cursor-ew-resize"
                                            style={{
                                                left: `${range[0]}%`,
                                                right: `${100 - range[1]}%`
                                            }}
                                        />

                                        {/* Inputs (Hidden but functional for demo) */}
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={range[0]}
                                            onChange={(e) => {
                                                const val = Math.min(Number(e.target.value), range[1] - 5);
                                                setRange([val, range[1]]);
                                                if (videoRef.current) videoRef.current.currentTime = (val / 100) * duration;
                                            }}
                                            className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={range[1]}
                                            onChange={(e) => {
                                                const val = Math.max(Number(e.target.value), range[0] + 5);
                                                setRange([range[0], val]);
                                            }}
                                            className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
                                        />
                                    </div>

                                    <div className="flex justify-between items-center gap-4">
                                        <button
                                            onClick={() => {
                                                setVideoUrl(null);
                                                setFile(null);
                                            }}
                                            className="p-3 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                        >
                                            <RotateCcw size={20} />
                                        </button>

                                        <button
                                            onClick={togglePlay}
                                            className="p-4 rounded-full bg-white text-black hover:scale-110 transition-transform"
                                        >
                                            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                                        </button>

                                        <button
                                            onClick={() => {
                                                if (!file) return;
                                                const url = URL.createObjectURL(file);
                                                const a = document.createElement('a');
                                                a.href = url;
                                                a.download = `trimmed_${file.name}`;
                                                document.body.appendChild(a);
                                                a.click();
                                                document.body.removeChild(a);
                                                URL.revokeObjectURL(url);
                                            }}
                                            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold shadow-lg shadow-red-600/20 transition-all flex items-center gap-2"
                                        >
                                            <Download size={20} />
                                            Download Trimmed
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
