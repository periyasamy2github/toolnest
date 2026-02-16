"use client";

import { useState } from "react";
import { Copy, RefreshCw, Youtube, Check } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function YouTubeDescriptionGenerator() {
    const [title, setTitle] = useState("");
    const [keywords, setKeywords] = useState("");
    const [generatedDesc, setGeneratedDesc] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateDesc = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const desc = `In this video, I'm going to show you ${title}. \n\nIf you're interested in ${keywords}, this video is for you! We'll cover everything you need to know about ${title} and share some tips and tricks along the way.\n\n🔥 Don't forget to LIKE and SUBSCRIBE for more content like this!\n\nTimestamps:\n0:00 - Intro\n1:30 - What is ${title}?\n3:45 - Key Features\n6:20 - How to use it\n8:50 - Conclusion\n\n🔗 Links mentioned:\n[Link 1]\n[Link 2]\n\nFollow me on social media:\n📸 Instagram: @yourhandle\n🐦 Twitter: @yourhandle\n\n#${keywords.split(",")[0]?.trim() || "video"} #${title.replace(/\s+/g, "")} #YouTube`;

            setGeneratedDesc(desc);
            setIsGenerating(false);
        }, 1000);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedDesc);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    YouTube Description <span className="text-red-600">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Create professional, SEO-friendly descriptions for your videos.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Video Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., How to Bake a Cake"
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-600/50 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Keywords (comma separated)</label>
                            <input
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder="e.g., baking, cake, recipe, tutorial"
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-600/50 outline-none"
                            />
                        </div>

                        <button
                            onClick={generateDesc}
                            disabled={!title || isGenerating}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isGenerating ? <RefreshCw className="animate-spin" /> : <Youtube size={20} />}
                            {isGenerating ? "Generating..." : "Generate Description"}
                        </button>
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex flex-col h-full min-h-[300px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">Preview</h3>
                        {generatedDesc && (
                            <button
                                onClick={copyToClipboard}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white"
                                title="Copy to clipboard"
                            >
                                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                            </button>
                        )}
                    </div>

                    {generatedDesc ? (
                        <div className="flex-1 bg-zinc-950 border border-white/5 rounded-xl p-6 whitespace-pre-wrap text-zinc-300 leading-relaxed text-sm font-mono">
                            {generatedDesc}
                        </div>
                    ) : (
                        <div className="flex-1 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-600 p-8">
                            <Youtube size={48} className="mb-4 opacity-20" />
                            <p>Your description will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
