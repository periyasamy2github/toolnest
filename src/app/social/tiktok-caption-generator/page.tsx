"use client";

import { useState } from "react";
import { Copy, RefreshCw, Music, Check } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function TikTokCaptionGenerator() {
    const [topic, setTopic] = useState("");
    const [vibe, setVibe] = useState("trendy");
    const [generatedCaption, setGeneratedCaption] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateCaption = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const templates = [
                `Wait for it... 😱 You won't believe what happened with ${topic}! \n\n#${topic.replace(/\s+/g, "")} #fyp #viral #trending`,
                `POV: You just discovered ${topic} and your life is changed forever ✨ \n\n#${topic.replace(/\s+/g, "")} #lifehack #pov #foryou`,
                `Tell me you love ${topic} without telling me you love ${topic}... I'll go first 👇 \n\n#${topic.replace(/\s+/g, "")} #challenge #duet #tiktok`
            ];

            const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
            setGeneratedCaption(randomTemplate);
            setIsGenerating(false);
        }, 1000);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedCaption);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    TikTok Caption <span className="text-pink-500">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Create viral-worthy captions for your TikTok videos.
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
                                placeholder="e.g., Dance Challenge, Cooking Fail..."
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Vibe</label>
                            <select
                                value={vibe}
                                onChange={(e) => setVibe(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none appearance-none"
                            >
                                <option value="trendy">Trendy</option>
                                <option value="funny">Funny</option>
                                <option value="educational">Educational</option>
                                <option value="aesthetic">Aesthetic</option>
                            </select>
                        </div>

                        <button
                            onClick={generateCaption}
                            disabled={!topic || isGenerating}
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isGenerating ? <RefreshCw className="animate-spin" /> : <Music size={20} />}
                            {isGenerating ? "Generating..." : "Generate Caption"}
                        </button>
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex flex-col h-full min-h-[300px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">Preview</h3>
                        {generatedCaption && (
                            <button
                                onClick={copyToClipboard}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white"
                                title="Copy to clipboard"
                            >
                                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                            </button>
                        )}
                    </div>

                    {generatedCaption ? (
                        <div className="flex-1 bg-zinc-950 border border-white/5 rounded-xl p-6 whitespace-pre-wrap text-zinc-300 leading-relaxed">
                            {generatedCaption}
                        </div>
                    ) : (
                        <div className="flex-1 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-600 p-8">
                            <Music size={48} className="mb-4 opacity-20" />
                            <p>Your caption will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
