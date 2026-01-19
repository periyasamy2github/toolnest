"use client";

import { useState } from "react";
import { Copy, RefreshCw, Linkedin, Check } from "lucide-react";

export default function LinkedInPostGenerator() {
    const [topic, setTopic] = useState("");
    const [tone, setTone] = useState("professional");
    const [generatedPost, setGeneratedPost] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const generatePost = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const templates = [
                `🚀 Excited to share my thoughts on ${topic}!\n\nIn today's rapidly evolving landscape, it's crucial to stay ahead of the curve. I've been diving deep into ${topic} and here are my key takeaways:\n\n1️⃣ Point 1 about ${topic}\n2️⃣ Point 2 about ${topic}\n3️⃣ Point 3 about ${topic}\n\nWhat are your thoughts on this? Let's discuss in the comments! 👇\n\n#${topic.replace(/\s+/g, "")} #ProfessionalDevelopment #Growth #Innovation`,
                `💡 Insight of the day: ${topic} is changing the game.\n\nI recently encountered a challenge related to ${topic} and it got me thinking about how we approach problems in our industry. \n\nHere's what I learned...\n\n[Insert personal story or insight]\n\nAgree or disagree? 🤔\n\n#${topic.replace(/\s+/g, "")} #Leadership #Insights #Career`,
                `Big news! 🎉 I'm thrilled to announce that I'm focusing more on ${topic}.\n\nThis has been a passion of mine for a while, and I believe it's the future of our industry because:\n\n✅ Reason 1\n✅ Reason 2\n✅ Reason 3\n\nWho else is working on this? Let's connect! 🤝\n\n#${topic.replace(/\s+/g, "")} #Announcement #Networking #Future`
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
                    LinkedIn Post <span className="text-blue-600">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Create engaging, professional LinkedIn posts in seconds.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Topic or Keyword</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g., Artificial Intelligence, Remote Work..."
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-600/50 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Tone</label>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-600/50 outline-none appearance-none"
                            >
                                <option value="professional">Professional</option>
                                <option value="casual">Casual</option>
                                <option value="enthusiastic">Enthusiastic</option>
                                <option value="thought-provoking">Thought-Provoking</option>
                            </select>
                        </div>

                        <button
                            onClick={generatePost}
                            disabled={!topic || isGenerating}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isGenerating ? <RefreshCw className="animate-spin" /> : <Linkedin size={20} />}
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
                            <Linkedin size={48} className="mb-4 opacity-20" />
                            <p>Your post will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
