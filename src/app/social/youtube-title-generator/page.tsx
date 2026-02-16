"use client";

import { useState } from "react";
import { Copy, RefreshCw, Youtube, Check } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function YouTubeTitleGenerator() {
    const [topic, setTopic] = useState("");
    const [style, setStyle] = useState("clickbait");
    const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generateTitles = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const templates = [
                `Why ${topic} is the Future (Must Watch!)`,
                `I Tried ${topic} for 30 Days and This Happened...`,
                `The Ultimate Guide to ${topic} in 2024`,
                `Stop Doing ${topic} Wrong! (Do This Instead)`,
                `10 Secrets About ${topic} No One Tells You`,
                `${topic} Explained in 5 Minutes`,
                `Is ${topic} Worth It? Honest Review`,
                `How to Master ${topic} Fast`
            ];

            // Shuffle and pick 5
            const shuffled = templates.sort(() => 0.5 - Math.random());
            setGeneratedTitles(shuffled.slice(0, 5));
            setIsGenerating(false);
        }, 1000);
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    YouTube Title <span className="text-red-600">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Generate catchy, high-CTR titles for your YouTube videos.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Video Topic</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g., Coding, Fitness, Travel..."
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-600/50 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Style</label>
                            <select
                                value={style}
                                onChange={(e) => setStyle(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-600/50 outline-none appearance-none"
                            >
                                <option value="clickbait">Clickbait / Catchy</option>
                                <option value="educational">Educational / How-to</option>
                                <option value="listicle">Listicle / Top 10</option>
                                <option value="storytime">Storytime / Personal</option>
                            </select>
                        </div>

                        <button
                            onClick={generateTitles}
                            disabled={!topic || isGenerating}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isGenerating ? <RefreshCw className="animate-spin" /> : <Youtube size={20} />}
                            {isGenerating ? "Generating..." : "Generate Titles"}
                        </button>
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex flex-col h-full min-h-[300px]">
                    <h3 className="text-xl font-semibold text-white mb-4">Results</h3>

                    {generatedTitles.length > 0 ? (
                        <div className="space-y-3">
                            {generatedTitles.map((title, index) => (
                                <div key={index} className="flex items-center justify-between bg-zinc-950 border border-white/5 rounded-xl p-4 group hover:border-red-600/50 transition-colors">
                                    <span className="text-zinc-300 font-medium">{title}</span>
                                    <button
                                        onClick={() => copyToClipboard(title, index)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100"
                                        title="Copy to clipboard"
                                    >
                                        {copiedIndex === index ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-600 p-8">
                            <Youtube size={48} className="mb-4 opacity-20" />
                            <p>Generated titles will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
