"use client";

import { useState, useEffect } from "react";
import { Clock, RefreshCw, Copy, Check } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function UnixTimestamp() {
    const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
    const [date, setDate] = useState("");
    const [copied, setCopied] = useState(false);
    const [isLive, setIsLive] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isLive) {
            interval = setInterval(() => {
                setTimestamp(Math.floor(Date.now() / 1000));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isLive]);

    useEffect(() => {
        try {
            setDate(new Date(timestamp * 1000).toISOString());
        } catch (e) {
            setDate("Invalid Timestamp");
        }
    }, [timestamp]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Unix <span className="text-orange-500">Timestamp</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert Unix timestamps to human-readable dates and vice versa.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="flex justify-center">
                    <button
                        onClick={() => setIsLive(!isLive)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isLive ? "bg-green-500/20 text-green-400" : "bg-zinc-800 text-zinc-400"}`}
                    >
                        {isLive ? "Live Updating" : "Paused"}
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-zinc-400">Unix Timestamp (Seconds)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={timestamp}
                                onChange={(e) => {
                                    setIsLive(false);
                                    setTimestamp(parseInt(e.target.value) || 0);
                                }}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-4 text-xl text-white focus:ring-2 focus:ring-orange-500/50 outline-none font-mono"
                            />
                            <button
                                onClick={() => copyToClipboard(timestamp.toString())}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                            >
                                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-medium text-zinc-400">ISO 8601 Date</label>
                        <div className="bg-zinc-950 border border-white/10 rounded-xl px-4 py-4 text-xl text-orange-400 font-mono">
                            {date}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/5">
                    <div className="text-center space-y-1">
                        <div className="text-xs text-zinc-500 uppercase">Year</div>
                        <div className="text-lg font-bold text-white">{new Date(timestamp * 1000).getFullYear()}</div>
                    </div>
                    <div className="text-center space-y-1">
                        <div className="text-xs text-zinc-500 uppercase">Month</div>
                        <div className="text-lg font-bold text-white">{new Date(timestamp * 1000).toLocaleString('default', { month: 'long' })}</div>
                    </div>
                    <div className="text-center space-y-1">
                        <div className="text-xs text-zinc-500 uppercase">Day</div>
                        <div className="text-lg font-bold text-white">{new Date(timestamp * 1000).getDate()}</div>
                    </div>
                    <div className="text-center space-y-1">
                        <div className="text-xs text-zinc-500 uppercase">Time</div>
                        <div className="text-lg font-bold text-white">{new Date(timestamp * 1000).toLocaleTimeString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
