"use client";

import { useState } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Twitter,
    Search,
    Copy,
    CheckCircle2,
    RefreshCw,
    MessageSquare
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function TweetGeneratorPage() {
    const [topic, setTopic] = useState("");
    const [tweets, setTweets] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generateTweets = () => {
        if (!topic.trim()) return;

        setIsGenerating(true);
        setTweets([]);

        // Simulate API call with mock data
        setTimeout(() => {
            const mockTweets = [
                `Just discovered the power of ${topic} and it's mind-blowing! 🤯 Here's why you should care... 🧵👇`,
                `Unpopular opinion: ${topic} is actually underrated. Here's my take. 💭`,
                `5 reasons why ${topic} is the future: \n\n1. Efficiency ⚡\n2. Scalability 📈\n3. Innovation 💡\n4. Community 🤝\n5. Impact 🌍\n\nWhat would you add?`,
                `If you're not paying attention to ${topic}, you're missing out. Big time. 🚀`,
                `The best advice I ever got about ${topic}? \n\n"Keep it simple." \n\nSometimes we overcomplicate things.`,
                `Stop ignoring ${topic}. Start leveraging it today. Your future self will thank you. 🙌`
            ];
            setTweets(mockTweets);
            setIsGenerating(false);
        }, 1500);
    };

    const copyTweet = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="min-h-screen pb-24 space-y-12">
            {/* Header */}
            <m.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div className="flex items-center gap-6">
                    <Link href="/social" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                        <ArrowLeft className="text-zinc-100" />
                    </Link>
                    <div>
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Tweet Generator</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Create viral tweets in seconds.</m.p>
                    </div>
                </div>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8 lg:col-start-3 space-y-6"
                >
                    <div className="glass-card p-8 space-y-8">
                        {/* Input Section */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search className="text-blue-400" size={24} />
                            </div>
                            <input
                                type="text"
                                placeholder="What's your tweet about? (e.g., 'Productivity')"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && generateTweets()}
                                className="w-full pl-14 pr-32 py-4 bg-zinc-950/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all"
                            />
                            <button
                                onClick={generateTweets}
                                disabled={isGenerating || !topic.trim()}
                                className="absolute right-2 top-2 bottom-2 px-6 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isGenerating ? (
                                    <RefreshCw size={18} className="animate-spin" />
                                ) : (
                                    "Generate"
                                )}
                            </button>
                        </div>

                        {/* Results Section */}
                        {tweets.length > 0 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Twitter size={20} className="text-blue-400" />
                                    Tweet Ideas
                                </h3>

                                <div className="grid gap-4">
                                    {tweets.map((tweet, i) => (
                                        <div
                                            key={i}
                                            className="p-6 rounded-2xl bg-zinc-950/30 border border-white/5 hover:border-blue-500/30 transition-colors group relative"
                                        >
                                            <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">{tweet}</p>
                                            <button
                                                onClick={() => copyTweet(tweet, i)}
                                                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                                title="Copy Tweet"
                                            >
                                                {copiedIndex === i ? <CheckCircle2 size={16} className="text-green-400" /> : <Copy size={16} />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </m.div>
            </div>
        </div>
    );
}
