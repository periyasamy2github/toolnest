"use client";

import { useState } from "react";
import { ArrowLeft, BarChart3, RefreshCw, Search, Info } from "lucide-react";
import Link from "next/link";

export default function KeywordDensityPage() {
    const [text, setText] = useState("");
    const [keywords, setKeywords] = useState<{ word: string; count: number; density: string }[]>([]);

    const analyzeKeywords = () => {
        if (!text.trim()) return;

        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const totalWords = words.length;
        const freq: Record<string, number> = {};

        // Filter out common stop words (simplified)
        const stopWords = ["the", "and", "a", "to", "of", "in", "is", "it", "that", "on", "for", "with", "as", "was", "at", "by", "an", "be", "this", "which"];

        words.forEach(word => {
            if (word.length > 2 && !stopWords.includes(word)) {
                freq[word] = (freq[word] || 0) + 1;
            }
        });

        const sorted = Object.entries(freq)
            .map(([word, count]) => ({
                word,
                count,
                density: ((count / totalWords) * 100).toFixed(2) + "%"
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 15);

        setKeywords(sorted);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/text" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Keyword Density</h1>
                    <p className="text-zinc-400">Analyze the frequency and density of keywords in your content.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <Search size={16} />
                            Your Content
                        </label>
                        <button
                            onClick={analyzeKeywords}
                            className="text-xs px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all flex items-center gap-2"
                        >
                            <RefreshCw size={14} />
                            Analyze Keywords
                        </button>
                    </div>
                    <div className="glass-card p-4 h-[500px]">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-full bg-transparent border-none focus:outline-none text-zinc-200 text-sm resize-none placeholder:text-zinc-600 leading-relaxed"
                            placeholder="Paste your content here to check keyword density..."
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                        <BarChart3 size={16} />
                        Top Keywords
                    </label>
                    <div className="glass-card p-4 h-[500px] overflow-auto">
                        {keywords.length > 0 ? (
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-zinc-500 uppercase border-b border-white/5">
                                    <tr>
                                        <th className="pb-3 font-medium">Keyword</th>
                                        <th className="pb-3 font-medium text-center">Count</th>
                                        <th className="pb-3 font-medium text-right">Density</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {keywords.map((kw, i) => (
                                        <tr key={i} className="group hover:bg-white/5 transition-colors">
                                            <td className="py-3 text-zinc-300 font-medium">{kw.word}</td>
                                            <td className="py-3 text-zinc-400 text-center">{kw.count}</td>
                                            <td className="py-3 text-blue-400 text-right font-mono">{kw.density}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <Info size={32} className="text-zinc-700" />
                                <p className="text-zinc-500 text-xs">Analysis results will appear here after you click "Analyze Keywords".</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
