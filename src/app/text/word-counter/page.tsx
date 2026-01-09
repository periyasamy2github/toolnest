"use client";

import { useState } from "react";
import { ArrowLeft, AlignLeft } from "lucide-react";
import Link from "next/link";

export default function WordCounterPage() {
    const [text, setText] = useState("");

    const stats = {
        words: text.trim() ? text.trim().split(/\s+/).length : 0,
        chars: text.length,
        charsNoSpaces: text.replace(/\s/g, "").length,
        sentences: text.split(/[.!?]+/).filter(Boolean).length,
        paragraphs: text.split(/\n+/).filter(Boolean).length,
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/text" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Word Counter</h1>
                    <p className="text-zinc-400">Analyze text statistics in real-time.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6 h-full">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-[400px] bg-transparent border-none focus:outline-none text-zinc-200 resize-none placeholder:text-zinc-600"
                            placeholder="Type or paste your text here..."
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6 space-y-4">
                        <h3 className="font-semibold text-zinc-100 flex items-center gap-2">
                            <AlignLeft size={20} className="text-blue-400" />
                            Statistics
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Words</span>
                                <span className="font-mono text-zinc-200">{stats.words}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Characters</span>
                                <span className="font-mono text-zinc-200">{stats.chars}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Chars (no spaces)</span>
                                <span className="font-mono text-zinc-200">{stats.charsNoSpaces}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Sentences</span>
                                <span className="font-mono text-zinc-200">{stats.sentences}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-400">Paragraphs</span>
                                <span className="font-mono text-zinc-200">{stats.paragraphs}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
