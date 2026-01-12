"use client";

import { useState } from "react";
import { ArrowLeft, Search, Copy, Check, Instagram, Hash, RefreshCw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const HASHTAG_DATABASE: { [key: string]: string[] } = {
    travel: ["travel", "travelphotography", "nature", "photography", "travelgram", "love", "photooftheday", "instatravel", "instagood", "wanderlust", "adventure", "travelblogger", "trip", "picoftheday", "landscape", "explore", "vacation", "beautiful", "ig", "naturephotography", "art", "summer", "holiday", "instagram", "traveling", "happy", "bhfyp", "fashion", "beach", "sunset"],
    fitness: ["fitness", "gym", "workout", "fitnessmotivation", "motivation", "fit", "bodybuilding", "training", "health", "lifestyle", "instagood", "fitfam", "healthylifestyle", "sport", "healthy", "gymlife", "personaltrainer", "crossfit", "instagram", "muscle", "exercise", "weightloss", "fitnessjourney", "fashion", "follow", "wellness", "model", "yoga", "gymmotivation", "fitnessmodel"],
    food: ["food", "foodporn", "foodie", "instafood", "foodphotography", "yummy", "delicious", "foodstagram", "instagood", "love", "foodblogger", "foodlover", "like", "follow", "healthyfood", "homemade", "dinner", "foodgasm", "tasty", "photooftheday", "cooking", "restaurant", "lunch", "picoftheday", "bhfyp", "foodies", "instagram", "healthy", "chef", "breakfast"],
    tech: ["tech", "technology", "gadgets", "innovation", "design", "business", "iphone", "apple", "software", "engineering", "future", "electronics", "coding", "computer", "programming", "android", "science", "digital", "gadget", "technews", "iot", "security", "data", "ai", "webdesign", "developer", "blockchain", "marketing", "startup", "robotics"],
    fashion: ["fashion", "love", "style", "instagood", "ootd", "model", "photooftheday", "photography", "beautiful", "follow", "instagram", "beauty", "art", "picoftheday", "instadaily", "me", "like", "smile", "happy", "cute", "followme", "girl", "fashionblogger", "outfit", "myself", "lifestyle", "instafashion", "makeup", "fashionstyle", "smile"],
    art: ["art", "artist", "drawing", "artwork", "painting", "illustration", "digitalart", "sketch", "design", "photography", "love", "arte", "instaart", "draw", "artistsoninstagram", "painting", "creative", "sketchbook", "photooftheday", "beautiful", "abstractart", "fashion", "gallery", "portrait", "contemporaryart", "handmade", "ink", "fanart", "nature", "museum"],
};

export default function InstagramHashtagsPage() {
    const [keyword, setKeyword] = useState("");
    const [count, setCount] = useState(30);
    const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);
    const [selectedHashtags, setSelectedHashtags] = useState<Set<string>>(new Set());

    const generateHashtags = () => {
        const key = keyword.toLowerCase().trim();
        let results: string[] = [];

        if (HASHTAG_DATABASE[key]) {
            results = [...HASHTAG_DATABASE[key]];
        } else {
            // Generic fallback or partial match
            const matches = Object.keys(HASHTAG_DATABASE).filter(k => k.includes(key) || key.includes(k));
            if (matches.length > 0) {
                results = Array.from(new Set(matches.flatMap(m => HASHTAG_DATABASE[m])));
            } else {
                // Return some generic popular tags if no match (removed duplicates)
                results = ["instagood", "photooftheday", "instagram", "trending", "viral", "explore", "love", "happy", "picoftheday", "instadaily", "follow", "like", "photography", "art", "fashion", "beautiful", "nature", "travel", "style", "repost", "tbt", "summer", "selfie", "me", "friends", "fitness", "girl", "motivation", "inspiration", "goals"];
            }
        }

        // Remove duplicates, shuffle, and slice based on user count
        const uniqueResults = Array.from(new Set(results));
        const shuffled = uniqueResults.sort(() => Math.random() - 0.5);
        const limited = shuffled.slice(0, Math.min(count, shuffled.length));

        setGeneratedHashtags(limited);
        setSelectedHashtags(new Set(limited));
    };

    const toggleHashtag = (tag: string) => {
        const newSelected = new Set(selectedHashtags);
        if (newSelected.has(tag)) {
            newSelected.delete(tag);
        } else {
            newSelected.add(tag);
        }
        setSelectedHashtags(newSelected);
    };

    const copyAll = () => {
        const text = Array.from(selectedHashtags).map(tag => `#${tag}`).join(" ");
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/text" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Instagram Hashtag Generator</h1>
                    <p className="text-zinc-400">Generate trending hashtags for your posts.</p>
                </div>
            </div>

            <div className="glass-card p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                        <label className="text-sm font-medium text-zinc-400">Keyword</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && generateHashtags()}
                                placeholder="Enter a keyword (e.g., travel, fitness, art)..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-48 space-y-4">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium text-zinc-400">Count</label>
                            <span className="text-sm text-blue-400 font-mono">{count}</span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="50"
                            step="1"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value))}
                            className="w-full accent-blue-500 h-2 bg-white/5 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-zinc-600 uppercase tracking-widest">
                            <span>10</span>
                            <span>30</span>
                            <span>50</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
                    <div className="flex flex-wrap gap-2 text-sm text-zinc-500">
                        <span>Popular:</span>
                        {["Travel", "Fitness", "Food", "Tech", "Fashion", "Art"].map(tag => (
                            <button
                                key={tag}
                                onClick={() => {
                                    setKeyword(tag);
                                }}
                                className="hover:text-blue-400 transition-colors"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={generateHashtags}
                        className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={20} />
                        Generate
                    </button>
                </div>
            </div>

            {generatedHashtags.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                            <Hash size={20} className="text-blue-400" />
                            Results ({selectedHashtags.size})
                        </h3>
                        <button
                            onClick={copyAll}
                            disabled={selectedHashtags.size === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
                        >
                            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                            {copied ? "Copied!" : "Copy Selected"}
                        </button>
                    </div>

                    <div className="glass-card p-6">
                        <div className="flex flex-wrap gap-2">
                            {generatedHashtags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => toggleHashtag(tag)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg border transition-all text-sm",
                                        selectedHashtags.has(tag)
                                            ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                                            : "bg-white/5 border-white/10 text-zinc-500 hover:border-white/20"
                                    )}
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            <span className="text-blue-400 font-semibold">Tip:</span> Instagram allows up to 30 hashtags per post. Using a mix of popular and niche tags helps reach a wider audience. You've selected {selectedHashtags.size} tags.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
