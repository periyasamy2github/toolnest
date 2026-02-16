"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, FileDiff, Trash2, Copy, Check, Columns, Rows, Type } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import * as diff from "diff";

type DiffMode = "side-by-side" | "inline";
type DiffType = "chars" | "words" | "lines";

export default function TextDiffChecker() {
    const [oldText, setOldText] = useState("");
    const [newText, setNewText] = useState("");
    const [diffMode, setDiffMode] = useState<DiffMode>("side-by-side");
    const [diffType, setDiffType] = useState<DiffType>("words");
    const [diffResult, setDiffResult] = useState<diff.Change[]>([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let result: diff.Change[] = [];
        if (diffType === "chars") {
            result = diff.diffChars(oldText, newText);
        } else if (diffType === "words") {
            result = diff.diffWords(oldText, newText);
        } else {
            result = diff.diffLines(oldText, newText);
        }
        setDiffResult(result);
    }, [oldText, newText, diffType]);

    const clearAll = () => {
        setOldText("");
        setNewText("");
    };

    const copyResult = () => {
        // This is a bit complex for diff, maybe just copy the new text or a summary
        navigator.clipboard.writeText(newText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <BackButton />
                    <div>
                        <h1 className="text-4xl font-black text-gradient">Text Diff Checker</h1>
                        <p className="text-zinc-400">Compare two texts and highlight changes instantly.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={clearAll}
                        className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                        title="Clear All"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-6 bg-zinc-900/50 border border-white/10 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">View Mode</span>
                    <div className="flex bg-zinc-800/50 p-1 rounded-xl border border-white/5">
                        <button
                            onClick={() => setDiffMode("side-by-side")}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                diffMode === "side-by-side" ? "bg-orange-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                            )}
                        >
                            <Columns size={16} />
                            Side by Side
                        </button>
                        <button
                            onClick={() => setDiffMode("inline")}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                diffMode === "inline" ? "bg-orange-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                            )}
                        >
                            <Rows size={16} />
                            Inline
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Compare By</span>
                    <div className="flex bg-zinc-800/50 p-1 rounded-xl border border-white/5">
                        {(["chars", "words", "lines"] as DiffType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => setDiffType(type)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                                    diffType === type ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200"
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Areas */}
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400 px-2 flex items-center gap-2">
                        <Type size={14} className="text-zinc-500" />
                        Original Text
                    </label>
                    <textarea
                        value={oldText}
                        onChange={(e) => setOldText(e.target.value)}
                        placeholder="Paste original text here..."
                        className="w-full h-64 bg-zinc-900/50 border border-white/10 rounded-2xl p-6 text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
                    />
                </div>
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400 px-2 flex items-center gap-2">
                        <Type size={14} className="text-orange-400" />
                        Changed Text
                    </label>
                    <textarea
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder="Paste modified text here..."
                        className="w-full h-64 bg-zinc-900/50 border border-white/10 rounded-2xl p-6 text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all resize-none"
                    />
                </div>
            </div>

            {/* Diff Result */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                        <FileDiff size={16} className="text-orange-400" />
                        Difference Result
                    </h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 text-green-400">
                            <span className="w-2 h-2 rounded-full bg-green-400" />
                            Added
                        </span>
                        <span className="flex items-center gap-1.5 text-red-400">
                            <span className="w-2 h-2 rounded-full bg-red-400" />
                            Removed
                        </span>
                    </div>
                </div>

                <div className={cn(
                    "bg-zinc-950 border border-white/10 rounded-3xl p-8 font-mono text-sm min-h-[200px] overflow-auto",
                    diffMode === "side-by-side" ? "grid grid-cols-2 gap-8" : "block"
                )}>
                    {diffMode === "side-by-side" ? (
                        <>
                            {/* Left Side: Removed + Unchanged */}
                            <div className="space-y-0.5">
                                {diffResult.map((part, i) => (
                                    !part.added && (
                                        <span
                                            key={i}
                                            className={cn(
                                                "inline-block w-full px-1 rounded",
                                                part.removed ? "bg-red-500/20 text-red-300 border-l-2 border-red-500" : "text-zinc-500"
                                            )}
                                        >
                                            {part.value}
                                        </span>
                                    )
                                ))}
                            </div>
                            {/* Right Side: Added + Unchanged */}
                            <div className="space-y-0.5">
                                {diffResult.map((part, i) => (
                                    !part.removed && (
                                        <span
                                            key={i}
                                            className={cn(
                                                "inline-block w-full px-1 rounded",
                                                part.added ? "bg-green-500/20 text-green-300 border-l-2 border-green-500" : "text-zinc-300"
                                            )}
                                        >
                                            {part.value}
                                        </span>
                                    )
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="whitespace-pre-wrap leading-relaxed">
                            {diffResult.map((part, i) => (
                                <span
                                    key={i}
                                    className={cn(
                                        "rounded px-0.5",
                                        part.added ? "bg-green-500/20 text-green-400" :
                                            part.removed ? "bg-red-500/20 text-red-400 line-through" :
                                                "text-zinc-400"
                                    )}
                                >
                                    {part.value}
                                </span>
                            ))}
                        </div>
                    )}

                    {(!oldText && !newText) && (
                        <div className="col-span-2 flex flex-col items-center justify-center py-20 text-zinc-700 space-y-4">
                            <FileDiff size={48} className="opacity-20" />
                            <p className="text-sm italic">Differences will be highlighted here...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
