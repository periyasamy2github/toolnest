"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
    Link as LinkIcon,
    Copy,
    Check,
    RefreshCw,
    Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function SlugGenerator() {
    const [input, setInput] = useState("");
    const [slug, setSlug] = useState("");
    const [copied, setCopied] = useState(false);
    const [separator, setSeparator] = useState("-");

    useEffect(() => {
        generateSlug();
    }, [input, separator]);

    const generateSlug = () => {
        if (!input) {
            setSlug("");
            return;
        }

        const newSlug = input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "") // Remove non-word chars
            .replace(/[\s_-]+/g, separator) // Replace spaces/underscores with separator
            .replace(new RegExp(`^${separator}+|${separator}+$`, "g"), ""); // Trim separator

        setSlug(newSlug);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(slug);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Slug <span className="text-blue-500">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert text into SEO-friendly URL slugs.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Input Text</label>
                            <button
                                onClick={() => setInput("")}
                                className="text-xs text-zinc-500 hover:text-white transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full flex-1 bg-zinc-950 border border-white/10 rounded-xl p-4 text-white placeholder-zinc-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none resize-none min-h-[200px]"
                            placeholder="Enter article title or text..."
                        />
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                    <Settings2 size={16} />
                                    Separator
                                </label>
                            </div>
                            <div className="flex gap-2">
                                {[
                                    { label: "Hyphen (-)", value: "-" },
                                    { label: "Underscore (_)", value: "_" },
                                    { label: "Dot (.)", value: "." }
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setSeparator(opt.value)}
                                        className={cn(
                                            "px-4 py-2 rounded-xl text-sm font-medium border transition-all flex-1",
                                            separator === opt.value
                                                ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                                                : "bg-zinc-950 border-white/5 text-zinc-500 hover:border-white/10"
                                        )}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Result</label>
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur" />
                                <div className="relative bg-zinc-950 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
                                    <div className="font-mono text-lg text-white break-all">
                                        {slug || <span className="text-zinc-600 italic">waiting-for-input</span>}
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        disabled={!slug}
                                        className="p-2 text-zinc-400 hover:text-blue-400 transition-colors shrink-0 disabled:opacity-50"
                                    >
                                        {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
