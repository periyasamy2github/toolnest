"use client";

import { ArrowLeft, Download, Video, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const tools = [
    {
        title: "Youtube Downloader",
        description: "Download videos from YouTube, Instagram, Facebook, and TikTok.",
        icon: Video,
        href: "/tools/video-downloader",
        color: "text-red-400",
        bg: "bg-red-400/10",
    },
    {
        title: "Social Media Downloader",
        description: "Specialized downloader for Instagram Reels and Facebook Videos.",
        icon: Instagram,
        href: "/tools/video-downloader", // Pointing to same tool as it handles both now
        color: "text-pink-400",
        bg: "bg-pink-400/10",
    }
];

export default function DownloaderToolsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Downloader Tools</h1>
                    <p className="text-zinc-400">Download media from various platforms.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <Link
                        key={tool.title}
                        href={tool.href}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 hover:bg-zinc-900/80 transition-all duration-300 hover:border-white/20 hover:shadow-xl"
                    >
                        <div className={`p-3 rounded-xl ${tool.bg} ${tool.color} w-fit mb-4`}>
                            <tool.icon size={24} />
                        </div>

                        <h2 className="text-xl font-semibold mb-2 text-zinc-100 group-hover:text-white">
                            {tool.title}
                        </h2>
                        <p className="text-sm text-zinc-400 group-hover:text-zinc-300">
                            {tool.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
