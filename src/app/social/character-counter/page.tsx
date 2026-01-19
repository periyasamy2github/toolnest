"use client";

import { useState } from "react";
import { Type, AlignLeft, AlignCenter } from "lucide-react";

export default function CharacterCounter() {
    const [text, setText] = useState("");

    const stats = {
        characters: text.length,
        words: text.trim() ? text.trim().split(/\s+/).length : 0,
        sentences: text.split(/[.!?]+/).filter(Boolean).length,
        paragraphs: text.split(/\n\n+/).filter(Boolean).length,
        spaces: text.split(" ").length - 1,
    };

    const limits = [
        { name: "Twitter", limit: 280, color: "bg-blue-500" },
        { name: "Instagram Caption", limit: 2200, color: "bg-pink-500" },
        { name: "LinkedIn Post", limit: 3000, color: "bg-blue-700" },
        { name: "Facebook Post", limit: 63206, color: "bg-blue-600" },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Character <span className="text-green-500">Counter</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Real-time character and word counting for social media.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Start typing or paste your text here..."
                            className="w-full h-96 bg-transparent border-none focus:ring-0 text-zinc-300 resize-none outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-950 rounded-xl p-4 text-center">
                                <div className="text-3xl font-black text-white">{stats.characters}</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider">Characters</div>
                            </div>
                            <div className="bg-zinc-950 rounded-xl p-4 text-center">
                                <div className="text-3xl font-black text-white">{stats.words}</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider">Words</div>
                            </div>
                            <div className="bg-zinc-950 rounded-xl p-4 text-center">
                                <div className="text-3xl font-black text-white">{stats.sentences}</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider">Sentences</div>
                            </div>
                            <div className="bg-zinc-950 rounded-xl p-4 text-center">
                                <div className="text-3xl font-black text-white">{stats.paragraphs}</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider">Paragraphs</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-4">
                        <h3 className="font-semibold text-white">Platform Limits</h3>
                        <div className="space-y-4">
                            {limits.map((platform) => {
                                const percentage = Math.min((stats.characters / platform.limit) * 100, 100);
                                const remaining = platform.limit - stats.characters;
                                const isOver = remaining < 0;

                                return (
                                    <div key={platform.name} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">{platform.name}</span>
                                            <span className={isOver ? "text-red-500" : "text-zinc-500"}>
                                                {remaining} left
                                            </span>
                                        </div>
                                        <div className="h-2 bg-zinc-950 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-300 ${isOver ? "bg-red-500" : platform.color}`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
