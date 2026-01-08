"use client";

import { useState } from "react";
import { ArrowLeft, Download, Loader2, AlertCircle, Play, Clock, Eye, Music } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface VideoFormat {
    formatId: string;
    quality: string;
    resolution: string;
    ext: string;
    filesizeFormatted: string;
    fps: number;
    hasAudio: boolean;
}

interface VideoInfo {
    id: string;
    title: string;
    thumbnail: string;
    duration: number;
    durationFormatted: string;
    channel: string;
    viewCount: number;
    formats: VideoFormat[];
}

export default function VideoDownloaderPage() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [downloadMessage, setDownloadMessage] = useState("");
    const [error, setError] = useState("");
    const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);

    const handleFetch = async () => {
        if (!url) return;
        setLoading(true);
        setLoadingProgress(0);
        setError("");
        setVideoInfo(null);

        const progressInterval = setInterval(() => {
            setLoadingProgress(prev => prev >= 90 ? prev : prev + Math.random() * 15);
        }, 300);

        try {
            const response = await fetch(`/api/video-downloader?url=${encodeURIComponent(url)}`);
            setLoadingProgress(95);
            const data = await response.json();

            if (!response.ok) {
                if (data.isHostingLimitation) {
                    throw new Error('YouTube Downloader requires self-hosting. This feature is not available on Vercel. Please run locally or on a VPS.');
                }
                throw new Error(data.error || 'Failed to fetch video info');
            }

            setLoadingProgress(100);
            setVideoInfo(data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch video info.");
        } finally {
            clearInterval(progressInterval);
            setLoading(false);
            setLoadingProgress(0);
        }
    };

    const getDownloadUrl = (formatId: string) => {
        return `/api/video-downloader?url=${encodeURIComponent(url)}&format=${formatId}`;
    };

    const handleDownloadClick = (quality: string) => {
        setDownloadMessage(`Download started for ${quality}. Please wait...`);
        setTimeout(() => {
            setDownloadMessage("");
        }, 5000);
    };

    const formatViews = (count: number) => {
        if (!count) return '';
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M views`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K views`;
        return `${count} views`;
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/tools/downloader" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">YouTube Downloader</h1>
                    <p className="text-zinc-400 text-sm">Download videos from YouTube in multiple formats.</p>
                </div>
            </div>

            {/* URL Input */}
            <div className="glass-card p-4 sm:p-6 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Video URL</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
                            className="flex-1 bg-zinc-950/50 border border-white/10 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                        />
                        <button
                            onClick={handleFetch}
                            disabled={loading || !url}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Play size={20} />}
                            {loading ? 'Fetching...' : 'Get Video'}
                        </button>
                    </div>
                </div>

                {/* Loading Progress */}
                {loading && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-zinc-400">
                            <span>Fetching video info...</span>
                            <span>{Math.round(loadingProgress)}%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 transition-all duration-300 ease-out"
                                style={{ width: `${loadingProgress}%` }}
                            />
                        </div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg flex items-center gap-3 text-sm">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}
            </div>

            {/* Video Info */}
            {videoInfo && (
                <div className="glass-card p-4 sm:p-6 space-y-5">
                    {/* Video Preview */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative w-full sm:w-48 aspect-video rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                            {videoInfo.thumbnail && (
                                <img
                                    src={videoInfo.thumbnail}
                                    alt={videoInfo.title}
                                    className="w-full h-full object-cover"
                                />
                            )}
                            <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs text-white flex items-center gap-1">
                                <Clock size={12} />
                                {videoInfo.durationFormatted}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-lg font-semibold text-zinc-100 line-clamp-2">{videoInfo.title}</h2>
                            <p className="text-sm text-zinc-400 mt-1">{videoInfo.channel}</p>
                            {videoInfo.viewCount && (
                                <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                                    <Eye size={12} />
                                    {formatViews(videoInfo.viewCount)}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Download Notice */}
                    {downloadMessage && (
                        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-lg flex items-center gap-3 text-sm">
                            <Loader2 className="animate-spin" size={18} />
                            {downloadMessage}
                        </div>
                    )}

                    {/* Format Selection */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-zinc-300">Available Formats</h3>
                        <div className="grid gap-2">
                            {videoInfo.formats.map((format) => (
                                <div
                                    key={format.formatId}
                                    className="flex items-center justify-between p-3 bg-zinc-900/50 border border-white/5 rounded-lg hover:border-white/10 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-20 text-center">
                                            <span className={cn(
                                                "px-2 py-1 rounded text-xs font-bold",
                                                format.quality.includes('1080') ? "bg-purple-500/20 text-purple-400" :
                                                    format.quality.includes('720') ? "bg-blue-500/20 text-blue-400" :
                                                        format.quality.includes('480') ? "bg-green-500/20 text-green-400" :
                                                            "bg-zinc-500/20 text-zinc-400"
                                            )}>
                                                {format.quality}
                                            </span>
                                        </div>
                                        <div className="text-sm flex items-center gap-2">
                                            <span className="text-zinc-400">{format.resolution}</span>
                                            {format.fps && <span className="text-zinc-600">{format.fps}fps</span>}
                                            {format.hasAudio && (
                                                <span className="text-green-500" title="Has Audio">
                                                    <Music size={12} />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-zinc-500 hidden sm:inline">{format.filesizeFormatted}</span>
                                        <a
                                            href={getDownloadUrl(format.formatId)}
                                            download={`${videoInfo?.title || 'video'}_${format.quality}.mp4`}
                                            onClick={() => handleDownloadClick(format.quality)}
                                            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white"
                                        >
                                            <Download size={16} />
                                            <span className="hidden sm:inline">Download</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="text-center text-xs text-zinc-500 px-4">
                By using this tool, you agree to our Terms of Service. Please respect copyright laws.
            </div>
        </div>
    );
}
