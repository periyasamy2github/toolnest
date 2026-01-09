"use client";

import { useState } from "react";
import { ArrowLeft, Newspaper, Search, Check, AlertCircle, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HeadlineAnalyzerPage() {
    const [headline, setHeadline] = useState("");
    const [score, setScore] = useState<number | null>(null);
    const [analysis, setAnalysis] = useState<{ label: string; value: string; color: string }[]>([]);

    const analyzeHeadline = () => {
        if (!headline.trim()) return;

        const words = headline.trim().split(/\s+/);
        const charCount = headline.length;
        let currentScore = 50;

        // Length analysis
        if (charCount >= 40 && charCount <= 60) currentScore += 20;
        else if (charCount > 60) currentScore -= 10;
        else currentScore -= 5;

        // Word count analysis
        if (words.length >= 6 && words.length <= 12) currentScore += 15;

        // Power words check (simplified)
        const powerWords = ["secret", "free", "amazing", "how", "why", "best", "top", "ultimate", "guide"];
        const hasPowerWord = words.some(w => powerWords.includes(w.toLowerCase()));
        if (hasPowerWord) currentScore += 15;

        setScore(Math.min(currentScore, 100));
        setAnalysis([
            { label: "Length", value: `${charCount} characters`, color: charCount >= 40 && charCount <= 60 ? "text-green-400" : "text-yellow-400" },
            { label: "Word Count", value: `${words.length} words`, color: words.length >= 6 && words.length <= 12 ? "text-green-400" : "text-yellow-400" },
            { label: "Power Words", value: hasPowerWord ? "Found" : "None", color: hasPowerWord ? "text-green-400" : "text-zinc-500" },
            { label: "Sentiment", value: "Neutral", color: "text-zinc-400" },
        ]);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/text" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Headline Analyzer</h1>
                    <p className="text-zinc-400">Optimize your headlines for better engagement and SEO.</p>
                </div>
            </div>

            <div className="glass-card p-6 space-y-6">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                        <Newspaper size={16} />
                        Your Headline
                    </label>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && analyzeHeadline()}
                            placeholder="Enter your headline here..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        />
                        <button
                            onClick={analyzeHeadline}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <Search size={20} />
                            Analyze
                        </button>
                    </div>
                </div>

                {score !== null && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/5">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div className="relative w-32 h-32 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="58"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        className="text-white/5"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="58"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        strokeDasharray={364.4}
                                        strokeDashoffset={364.4 - (364.4 * score) / 100}
                                        className={cn(
                                            "transition-all duration-1000",
                                            score >= 70 ? "text-green-500" : score >= 40 ? "text-yellow-500" : "text-red-500"
                                        )}
                                    />
                                </svg>
                                <span className="absolute text-3xl font-bold text-zinc-100">{score}</span>
                            </div>
                            <span className="text-sm font-medium text-zinc-400 uppercase tracking-widest">Overall Score</span>
                        </div>

                        <div className="md:col-span-2 space-y-4">
                            <h3 className="font-semibold text-zinc-100">Analysis Breakdown</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {analysis.map((item, i) => (
                                    <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-1">
                                        <p className="text-xs text-zinc-500">{item.label}</p>
                                        <p className={cn("font-medium", item.color)}>{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 space-y-4">
                    <h3 className="font-semibold text-zinc-100 flex items-center gap-2">
                        <Info size={18} className="text-blue-400" />
                        Tips for Better Headlines
                    </h3>
                    <ul className="space-y-2 text-sm text-zinc-400">
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                            Keep it between 40-60 characters for best SEO.
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                            Use "Power Words" like 'Secret', 'Ultimate', or 'Free'.
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                            Ask a question or provide a clear benefit.
                        </li>
                    </ul>
                </div>

                <div className="glass-card p-6 space-y-4">
                    <h3 className="font-semibold text-zinc-100 flex items-center gap-2">
                        <AlertCircle size={18} className="text-yellow-400" />
                        Common Mistakes
                    </h3>
                    <ul className="space-y-2 text-sm text-zinc-400">
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5" />
                            Headlines that are too short or vague.
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5" />
                            Overusing clickbait words that reduce trust.
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5" />
                            Ignoring the emotional impact of your words.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
