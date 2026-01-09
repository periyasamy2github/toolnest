"use client";

import { useState } from "react";
import { ArrowLeft, BookOpen, RefreshCw, Info, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ReadabilityPage() {
    const [text, setText] = useState("");
    const [results, setResults] = useState<{
        score: number;
        grade: string;
        stats: { label: string; value: number }[];
    } | null>(null);

    const calculateReadability = () => {
        if (!text.trim()) return;

        const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
        const words = text.trim().split(/\s+/).filter(Boolean);
        const wordCount = words.length || 1;

        // Simplified syllable count (vowel groups)
        const syllables = words.reduce((acc, word) => {
            const count = word.toLowerCase().match(/[aeiouy]{1,2}/g)?.length || 1;
            return acc + count;
        }, 0);

        // Flesch Reading Ease formula
        const score = 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (syllables / wordCount);
        const roundedScore = Math.max(0, Math.min(100, Math.round(score)));

        let grade = "";
        if (roundedScore >= 90) grade = "5th Grade (Very Easy)";
        else if (roundedScore >= 80) grade = "6th Grade (Easy)";
        else if (roundedScore >= 70) grade = "7th Grade (Fairly Easy)";
        else if (roundedScore >= 60) grade = "8th-9th Grade (Standard)";
        else if (roundedScore >= 50) grade = "10th-12th Grade (Fairly Difficult)";
        else if (roundedScore >= 30) grade = "College (Difficult)";
        else grade = "College Graduate (Very Difficult)";

        setResults({
            score: roundedScore,
            grade,
            stats: [
                { label: "Words", value: wordCount },
                { label: "Sentences", value: sentences },
                { label: "Syllables", value: syllables },
                { label: "Avg. Word/Sent", value: Number((wordCount / sentences).toFixed(1)) },
            ]
        });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/text" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Readability Score</h1>
                    <p className="text-zinc-400">Check how easy your text is to read using the Flesch Reading Ease scale.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <BookOpen size={16} />
                            Your Content
                        </label>
                        <button
                            onClick={calculateReadability}
                            className="text-xs px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all flex items-center gap-2"
                        >
                            <RefreshCw size={14} />
                            Check Readability
                        </button>
                    </div>
                    <div className="glass-card p-4 h-[500px]">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-full bg-transparent border-none focus:outline-none text-zinc-200 text-sm resize-none placeholder:text-zinc-600 leading-relaxed"
                            placeholder="Paste your article or text here to analyze its readability..."
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    {results ? (
                        <div className="glass-card p-6 space-y-8 sticky top-8">
                            <div className="text-center space-y-2">
                                <div className="text-5xl font-bold text-blue-400">{results.score}</div>
                                <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest">Readability Score</p>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                                    <p className="text-xs text-zinc-500 mb-1">Target Audience</p>
                                    <p className="font-semibold text-zinc-100">{results.grade}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {results.stats.map((stat, i) => (
                                        <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5">
                                            <p className="text-[10px] text-zinc-500 uppercase">{stat.label}</p>
                                            <p className="text-lg font-semibold text-zinc-200">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5 space-y-3">
                                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Quick Tips</h4>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-xs text-zinc-400">
                                        <CheckCircle2 size={14} className="text-green-500 mt-0.5" />
                                        Use shorter sentences.
                                    </div>
                                    <div className="flex items-start gap-2 text-xs text-zinc-400">
                                        <CheckCircle2 size={14} className="text-green-500 mt-0.5" />
                                        Avoid complex multi-syllable words.
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card p-8 text-center space-y-4 h-full flex flex-col justify-center border-dashed">
                            <Info size={40} className="mx-auto text-zinc-700" />
                            <p className="text-zinc-500 text-sm">Enter some text and click "Check Readability" to see the analysis.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
