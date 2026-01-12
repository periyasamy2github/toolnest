"use client";

import { useState } from "react";
import { ArrowLeft, Link as LinkIcon, Download, Loader2, AlertCircle, Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SocialDownloaderPage() {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState<string | null>(null);

    const handleDownload = async () => {
        if (!url) return;
        setIsLoading(true);
        setError("");
        setResult(null);

        // Placeholder logic for now
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (url.includes("instagram.com") || url.includes("facebook.com")) {
                // In a real app, we would call an API here.
                // Since we don't have a backend scraper, we show a message.
                setError("Demo Mode: Backend integration required for social media downloading. This feature needs a dedicated server-side scraper.");
            } else {
                setError("Please enter a valid Instagram or Facebook URL.");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/downloader" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Social Media Downloader</h1>
                    <p className="text-zinc-400">Download videos from Instagram and Facebook.</p>
                </div>
            </div>

            <div className="glass-card p-8 space-y-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                            <LinkIcon size={20} />
                        </div>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Paste Instagram or Facebook link here..."
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-zinc-200 focus:outline-none focus:border-blue-500 transition-all"
                        />
                    </div>
                    <button
                        onClick={handleDownload}
                        disabled={isLoading || !url}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : <Download size={20} />}
                        {isLoading ? "Processing..." : "Download"}
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl flex items-center gap-3">
                        <AlertCircle size={24} />
                        <div>
                            <h3 className="font-semibold">Notice</h3>
                            <p>{error}</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/5">
                    <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5 flex items-center gap-4">
                        <div className="bg-pink-500/10 p-4 rounded-full text-pink-500">
                            <Instagram size={32} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-zinc-200">Instagram</h3>
                            <p className="text-sm text-zinc-500">Reels, Stories, Posts</p>
                        </div>
                    </div>
                    <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5 flex items-center gap-4">
                        <div className="bg-blue-500/10 p-4 rounded-full text-blue-500">
                            <Facebook size={32} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-zinc-200">Facebook</h3>
                            <p className="text-sm text-zinc-500">Videos, Reels</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
