"use client";

import { useState } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Search,
    Download,
    Image as ImageIcon,
    Youtube,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function ThumbnailDownloaderPage() {
    const [url, setUrl] = useState("");
    const [videoId, setVideoId] = useState<string | null>(null);
    const [error, setError] = useState("");

    const extractVideoId = (input: string) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = input.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    };

    const handleSearch = () => {
        const id = extractVideoId(url);
        if (id) {
            setVideoId(id);
            setError("");
        } else {
            setVideoId(null);
            setError("Invalid YouTube URL. Please try again.");
        }
    };

    const thumbnails = videoId ? [
        { label: "Max Resolution (4K)", size: "1280x720", url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
        { label: "High Definition (1080p)", size: "640x480", url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
        { label: "High Quality (480p)", size: "480x360", url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
        { label: "Medium Quality (360p)", size: "320x180", url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
    ] : [];

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
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Thumbnail Downloader</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Get high-quality thumbnails from any YouTube video.</m.p>
                    </div>
                </div>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8 lg:col-start-3 space-y-6"
                >
                    {/* Search Bar */}
                    <div className="glass-card p-8 space-y-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Youtube className="text-red-500" size={24} />
                            </div>
                            <input
                                type="text"
                                placeholder="Paste YouTube URL here..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="w-full pl-14 pr-32 py-4 bg-zinc-950/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                            />
                            <button
                                onClick={handleSearch}
                                className="absolute right-2 top-2 bottom-2 px-6 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-all"
                            >
                                Get
                            </button>
                        </div>
                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Results */}
                    {videoId && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            {thumbnails.map((thumb, i) => (
                                <div key={i} className="glass-card p-6 flex flex-col md:flex-row gap-6 items-center">
                                    <div className="relative w-full md:w-64 aspect-video rounded-lg overflow-hidden bg-black">
                                        <img
                                            src={thumb.url}
                                            alt={thumb.label}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 text-center md:text-left space-y-2">
                                        <h3 className="text-white font-bold text-lg">{thumb.label}</h3>
                                        <p className="text-zinc-500 text-sm">{thumb.size}</p>
                                    </div>
                                    <a
                                        href={thumb.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download={`thumbnail-${videoId}.jpg`}
                                        className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-2 transition-all whitespace-nowrap"
                                    >
                                        <Download size={18} />
                                        Download
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </m.div>
            </div>
        </div>
    );
}
