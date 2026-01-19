"use client";

import { useState } from "react";
import { Calculator, RefreshCw, Activity } from "lucide-react";

export default function EngagementRateCalculator() {
    const [likes, setLikes] = useState("");
    const [comments, setComments] = useState("");
    const [shares, setShares] = useState("");
    const [followers, setFollowers] = useState("");
    const [result, setResult] = useState<number | null>(null);

    const calculate = () => {
        const l = parseFloat(likes) || 0;
        const c = parseFloat(comments) || 0;
        const s = parseFloat(shares) || 0;
        const f = parseFloat(followers) || 0;

        if (f > 0) {
            const totalInteractions = l + c + s;
            const rate = (totalInteractions / f) * 100;
            setResult(rate);
        }
    };

    const getRating = (rate: number) => {
        if (rate < 1) return { label: "Low", color: "text-red-500" };
        if (rate < 3.5) return { label: "Average", color: "text-yellow-500" };
        if (rate < 6) return { label: "High", color: "text-green-500" };
        return { label: "Viral", color: "text-purple-500" };
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Engagement Rate <span className="text-orange-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Measure the performance of your social media posts.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Likes</label>
                                <input
                                    type="number"
                                    value={likes}
                                    onChange={(e) => setLikes(e.target.value)}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Comments</label>
                                <input
                                    type="number"
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Shares (Optional)</label>
                                <input
                                    type="number"
                                    value={shares}
                                    onChange={(e) => setShares(e.target.value)}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Followers</label>
                                <input
                                    type="number"
                                    value={followers}
                                    onChange={(e) => setFollowers(e.target.value)}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                                />
                            </div>
                        </div>

                        <button
                            onClick={calculate}
                            disabled={!followers}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Calculator size={20} />
                            Calculate Rate
                        </button>
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-6">
                    {result !== null ? (
                        <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                            <div className="text-sm text-zinc-400 uppercase tracking-wider">Engagement Rate</div>
                            <div className="text-6xl font-black text-white">{result.toFixed(2)}%</div>
                            <div className={`text-xl font-bold ${getRating(result).color}`}>
                                {getRating(result).label} Performance
                            </div>
                        </div>
                    ) : (
                        <div className="text-zinc-600">
                            <Activity size={48} className="mx-auto mb-4 opacity-20" />
                            <p>Enter your stats to see the result</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
