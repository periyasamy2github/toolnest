"use client";

import { useState } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Youtube,
    Search,
    Copy,
    CheckCircle2,
    RefreshCw,
    Tag
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function YouTubeTagGeneratorPage() {
    const [keyword, setKeyword] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateTags = () => {
        if (!keyword.trim()) return;

        setIsGenerating(true);
        setTags([]);

        // Simulate API call with mock data
        setTimeout(() => {
            const mockTags = [
                keyword,
                `${keyword} tutorial`,
                `how to ${keyword}`,
                `best ${keyword}`,
                `${keyword} 2024`,
                `${keyword} guide`,
                `${keyword} for beginners`,
                `${keyword} tips`,
                `${keyword} tricks`,
                `${keyword} review`,
                `learn ${keyword}`,
                `${keyword} explained`,
                `${keyword} examples`,
                `${keyword} course`,
                `advanced ${keyword}`
            ];
            setTags(mockTags);
            setIsGenerating(false);
        }, 1500);
    };

    const copyTags = () => {
        navigator.clipboard.writeText(tags.join(", "));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                    <Link href="/social" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                        <ArrowLeft className="text-zinc-100" />
                    </Link>
                    <div>
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">YouTube Tag Generator</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Boost your video SEO with optimized tags.</m.p>
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
                        {/* Input Section */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search className="text-red-500" size={24} />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your video topic (e.g., 'React JS')"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && generateTags()}
                                className="w-full pl-14 pr-32 py-4 bg-zinc-950/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
                            />
                            <button
                                onClick={generateTags}
                                disabled={isGenerating || !keyword.trim()}
                                className="absolute right-2 top-2 bottom-2 px-6 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isGenerating ? (
                                    <RefreshCw size={18} className="animate-spin" />
                                ) : (
                                    "Generate"
                                )}
                            </button>
                        </div>

                        {/* Results Section */}
                        {tags.length > 0 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Tag size={20} className="text-red-400" />
                                        Generated Tags
                                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-zinc-400 font-normal">
                                            {tags.length}
                                        </span>
                                    </h3>
                                    <button
                                        onClick={copyTags}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                                    >
                                        {copied ? <CheckCircle2 size={16} className="text-green-400" /> : <Copy size={16} />}
                                        {copied ? "Copied!" : "Copy All"}
                                    </button>
                                </div>

                                <div className="p-6 rounded-2xl bg-zinc-950/30 border border-white/5 flex flex-wrap gap-3">
                                    {tags.map((tag, i) => (
                                        <div
                                            key={i}
                                            className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-medium flex items-center gap-2 group cursor-pointer hover:bg-red-500/20 transition-colors"
                                            onClick={() => {
                                                navigator.clipboard.writeText(tag);
                                            }}
                                            title="Click to copy"
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </m.div>
            </div>
        </div>
    );
}
