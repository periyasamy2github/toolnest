"use client";

import { useState } from "react";
import { Copy, RefreshCw, Facebook, Check } from "lucide-react";

export default function FacebookPostGenerator() {
    const [topic, setTopic] = useState("");
    const [tone, setTone] = useState("casual");
    const [generatedPost, setGeneratedPost] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const generatePost = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const templates = [
                `Hey friends! 👋 Just wanted to share something cool about ${topic}. \n\nIt's amazing how [insert detail] impacts our daily lives. I've been learning so much about this lately! \n\nWhat do you guys think? Let me know in the comments! 👇\n\n#${topic.replace(/\s+/g, "")} #LifeUpdates #SharingIsCaring`,
                `Can we talk about ${topic} for a second? 🤯\n\nI just discovered that [interesting fact]. It totally blew my mind! \n\nHas anyone else experienced this? Tell me your stories! 🗣️\n\n#${topic.replace(/\s+/g, "")} #MindBlown #Discussion`,
                `Feeling super excited about ${topic} today! ✨\n\nWorking on something special and can't wait to share more details soon. Stay tuned! 😉\n\n#${topic.replace(/\s+/g, "")} #Excited #NewThings`
            ];

            const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
            setGeneratedPost(randomTemplate);
            setIsGenerating(false);
        }, 1000);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPost);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Facebook Post <span className="text-blue-500">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Craft engaging Facebook posts to connect with your friends and followers.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Topic or Event</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g., Weekend Trip, New Hobby..."
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Tone</label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none appearance-none"
                            >
                                <option value="casual">Casual</option>
                                <option value="funny">Funny</option>
                                <option value="emotional">Emotional</option>
                                <option value="informative">Informative</option>
                            </select>
                        </div>

                        <button
                            onClick={generatePost}
                            disabled={!topic || isGenerating}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isGenerating ? <RefreshCw className="animate-spin" /> : <Facebook size={20} />}
                            {isGenerating ? "Generating..." : "Generate Post"}
                        </button>
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex flex-col h-full min-h-[300px]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">Preview</h3>
                        {generatedPost && (
                            <button
                                onClick={copyToClipboard}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white"
                                title="Copy to clipboard"
                            >
                                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                            </button>
                        )}
                    </div>

                    {generatedPost ? (
                        <div className="flex-1 bg-zinc-950 border border-white/5 rounded-xl p-6 whitespace-pre-wrap text-zinc-300 leading-relaxed">
                            {generatedPost}
                        </div>
                    ) : (
                        <div className="flex-1 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-600 p-8">
                            <Facebook size={48} className="mb-4 opacity-20" />
                            <p>Your post will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
