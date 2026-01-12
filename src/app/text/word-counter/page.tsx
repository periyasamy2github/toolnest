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
        <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex items-center gap-6">
                <Link href="/text" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                    <ArrowLeft className="text-zinc-100" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Word Counter</h1>
                    <p className="text-zinc-400 text-lg">Analyze text statistics in real-time with total privacy.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="glass-card p-8 h-full min-h-[500px] flex flex-col">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full flex-1 bg-transparent border-none focus:outline-none text-zinc-100 text-lg leading-relaxed resize-none placeholder:text-zinc-800 font-medium"
                            placeholder="Type or paste your text here to see instant statistics..."
                        />
                        <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                            <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
                                Real-time Analysis Active
                            </div>
                            <button
                                onClick={() => setText("")}
                                className="text-xs font-bold text-zinc-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                            >
                                Clear Text
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="glass-card p-8 space-y-8">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <AlignLeft size={20} className="text-blue-400" />
                            </div>
                            Text Statistics
                        </h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-end group">
                                <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs group-hover:text-zinc-300 transition-colors">Words</span>
                                <span className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">{stats.words}</span>
                            </div>
                            <div className="flex justify-between items-end group">
                                <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs group-hover:text-zinc-300 transition-colors">Characters</span>
                                <span className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">{stats.chars}</span>
                            </div>
                            <div className="flex justify-between items-end group">
                                <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs group-hover:text-zinc-300 transition-colors">Chars (no spaces)</span>
                                <span className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">{stats.charsNoSpaces}</span>
                            </div>
                            <div className="flex justify-between items-end group">
                                <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs group-hover:text-zinc-300 transition-colors">Sentences</span>
                                <span className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">{stats.sentences}</span>
                            </div>
                            <div className="flex justify-between items-end group">
                                <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs group-hover:text-zinc-300 transition-colors">Paragraphs</span>
                                <span className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">{stats.paragraphs}</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-3xl border border-white/5 space-y-4">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest">Privacy Note</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            Your text is processed entirely in your browser. We never store or transmit your content to any server.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
