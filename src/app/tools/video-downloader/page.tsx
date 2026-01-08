"use client";

import { useState } from "react";
import { ArrowLeft, Download, Loader2, AlertCircle, Music, FileVideo } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function VideoDownloaderPage() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [videoInfo, setVideoInfo] = useState<any>(null);

    const handleFetch = async () => {
        if (!url) return;
        setLoading(true);
        setError("");
        setVideoInfo(null);

        try {
            let apiUrl = `/api/video-downloader?url=${encodeURIComponent(url)}`;

            // Check if it's NOT YouTube
            const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
            if (!isYouTube) {
                apiUrl = `/api/social-downloader?url=${encodeURIComponent(url)}`;
            }

            const response = await fetch(apiUrl);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Download failed');
            }

            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `video.mp4`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(a);
        } catch (err: any) {
            setError(err.message || "Failed to fetch video info.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/tools/downloader" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">YouTube Downloader</h1>
                    <p className="text-zinc-400">Download videos from YouTube in MP4 format.</p>
                </div>
            </div>

            <div className="glass-card p-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">Video URL</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Paste URL here..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 bg-zinc-950/50 border border-white/10 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                        />
                        <button
                            onClick={handleFetch}
                            disabled={loading || !url}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Download size={20} />}
                            Download
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-3">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}
            </div>

            <div className="text-center text-sm text-zinc-500">
                By using this tool, you agree to our Terms of Service. Please respect copyright laws.
            </div>
        </div>
    );
}
