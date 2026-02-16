"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Search, Trash2, AlertCircle, Check, Copy, Flag } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";

export default function RegexTester() {
    const [pattern, setPattern] = useState("");
    const [flags, setFlags] = useState("g");
    const [text, setText] = useState("");
    const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!pattern) {
            setMatches([]);
            setError(null);
            return;
        }

        try {
            const regex = new RegExp(pattern, flags);
            const allMatches = Array.from(text.matchAll(regex));
            setMatches(allMatches);
            setError(null);
        } catch (e: any) {
            setError(e.message);
            setMatches([]);
        }
    }, [pattern, flags, text]);

    const clearAll = () => {
        setPattern("");
        setText("");
        setMatches([]);
        setError(null);
    };

    const copyMatches = () => {
        if (matches.length === 0) return;
        const matchText = matches.map(m => m[0]).join("\n");
        navigator.clipboard.writeText(matchText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            <div className="flex items-center gap-4">
                <BackButton />
                <div>
                    <h1 className="text-4xl font-black text-gradient">Regex Tester</h1>
                    <p className="text-zinc-400">Test and debug regular expressions with live match highlighting.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Configuration */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-6">
                        {/* Pattern Input */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-2">
                                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                    <Search size={16} className="text-pink-400" />
                                    Regular Expression
                                </label>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 bg-zinc-800 px-2 py-1 rounded-lg border border-white/5">
                                        <Flag size={12} className="text-zinc-500" />
                                        <input
                                            type="text"
                                            value={flags}
                                            onChange={(e) => setFlags(e.target.value)}
                                            placeholder="flags"
                                            className="w-12 bg-transparent text-xs text-zinc-300 focus:outline-none"
                                        />
                                    </div>
                                    <button
                                        onClick={clearAll}
                                        className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono">/</span>
                                <input
                                    type="text"
                                    value={pattern}
                                    onChange={(e) => setPattern(e.target.value)}
                                    placeholder="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
                                    className={cn(
                                        "w-full bg-zinc-800/50 border rounded-xl pl-8 pr-12 py-4 text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 transition-all",
                                        error ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:ring-pink-500/50"
                                    )}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono">/{flags}</span>
                            </div>
                            {error && (
                                <div className="flex items-center gap-2 text-red-400 text-xs px-2">
                                    <AlertCircle size={14} />
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* Test Text */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-zinc-400 px-2">Test String</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter text to test your regex against..."
                                className="w-full h-64 bg-zinc-900/50 border border-white/10 rounded-2xl p-6 text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Sidebar */}
                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-zinc-100 font-semibold flex items-center gap-2">
                                Matches
                                <span className="bg-pink-500/20 text-pink-400 text-[10px] px-2 py-0.5 rounded-full">
                                    {matches.length}
                                </span>
                            </h3>
                            {matches.length > 0 && (
                                <button
                                    onClick={copyMatches}
                                    className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1"
                                >
                                    {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                                    {copied ? "Copied" : "Copy All"}
                                </button>
                            )}
                        </div>

                        <div className="space-y-3 max-h-[500px] overflow-auto pr-2 custom-scrollbar">
                            {matches.length > 0 ? (
                                matches.map((match, i) => (
                                    <div key={i} className="bg-zinc-800/50 border border-white/5 rounded-xl p-3 space-y-2 group">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] text-zinc-500 font-mono uppercase">Match {i + 1}</span>
                                            <span className="text-[10px] text-zinc-600 font-mono">Index: {match.index}</span>
                                        </div>
                                        <div className="text-sm text-pink-400 font-mono break-all bg-pink-500/5 p-2 rounded-lg border border-pink-500/10">
                                            {match[0]}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-zinc-600 space-y-2">
                                    <Search size={32} className="mx-auto opacity-20" />
                                    <p className="text-xs">No matches found</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Reference */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 space-y-4">
                        <h4 className="text-zinc-100 font-medium text-xs uppercase tracking-wider">Quick Reference</h4>
                        <div className="space-y-2">
                            {[
                                { char: ".", desc: "Any character" },
                                { char: "\\d", desc: "Digit (0-9)" },
                                { char: "\\w", desc: "Word character" },
                                { char: "\\s", desc: "Whitespace" },
                                { char: "*", desc: "0 or more" },
                                { char: "+", desc: "1 or more" },
                                { char: "?", desc: "0 or 1" },
                                { char: "^", desc: "Start of line" },
                                { char: "$", desc: "End of line" },
                            ].map((ref) => (
                                <div key={ref.char} className="flex items-center justify-between text-[11px]">
                                    <code className="text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded">{ref.char}</code>
                                    <span className="text-zinc-500">{ref.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
