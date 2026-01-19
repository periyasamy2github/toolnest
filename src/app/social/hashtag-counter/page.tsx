"use client";

import { useState } from "react";
import { Hash, Copy, Check } from "lucide-react";

export default function HashtagCounter() {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    const hashtags = text.match(/#[a-zA-Z0-9_]+/g) || [];
    const uniqueHashtags = [...new Set(hashtags)];

    const copyHashtags = () => {
        navigator.clipboard.writeText(hashtags.join(" "));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Hashtag <span className="text-purple-500">Counter</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Count and extract hashtags from your text instantly.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste your text or caption here..."
                            className="w-full h-64 bg-transparent border-none focus:ring-0 text-zinc-300 resize-none outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-6">
                        <div className="text-center">
                            <div className="text-5xl font-black text-white mb-2">{hashtags.length}</div>
                            <div className="text-zinc-400">Total Hashtags</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-zinc-950 rounded-xl p-3">
                                <div className="text-xl font-bold text-white">{uniqueHashtags.length}</div>
                                <div className="text-xs text-zinc-500">Unique</div>
                            </div>
                            <div className="bg-zinc-950 rounded-xl p-3">
                                <div className="text-xl font-bold text-white">{30 - hashtags.length}</div>
                                <div className="text-xs text-zinc-500">Remaining (IG)</div>
                            </div>
                        </div>
                    </div>

                    {hashtags.length > 0 && (
                        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-white">Extracted Tags</h3>
                                <button
                                    onClick={copyHashtags}
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {uniqueHashtags.map((tag, i) => (
                                    <span key={i} className="text-sm bg-purple-500/10 text-purple-400 px-2 py-1 rounded-md">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
