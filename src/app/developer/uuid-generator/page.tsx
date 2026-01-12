"use client";

import { useState } from "react";
import { ArrowLeft, Fingerprint, Copy, Check, RefreshCw, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function UuidGenerator() {
    const [uuids, setUuids] = useState<string[]>([]);
    const [count, setCount] = useState(1);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generateUuid = () => {
        const newUuids = Array.from({ length: count }, () => {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
                const r = (Math.random() * 16) | 0;
                const v = c === "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        });
        setUuids([...newUuids, ...uuids].slice(0, 50)); // Keep last 50
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const clearAll = () => setUuids([]);

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-12">
            <div className="flex items-center gap-4">
                <Link href="/developer" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">UUID Generator</h1>
                    <p className="text-zinc-400">Generate secure, random Version 4 UUIDs instantly.</p>
                </div>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 space-y-8">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex-1 w-full space-y-2">
                        <label className="text-sm font-medium text-zinc-400 px-1">Quantity</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={count}
                                onChange={(e) => setCount(parseInt(e.target.value))}
                                className="flex-1 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                            <span className="text-xl font-bold text-zinc-100 w-8 text-center">{count}</span>
                        </div>
                    </div>
                    <button
                        onClick={generateUuid}
                        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 active:scale-95"
                    >
                        <Plus size={24} />
                        Generate UUIDs
                    </button>
                </div>

                {/* Results */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <Fingerprint size={16} className="text-blue-400" />
                            Generated UUIDs
                        </h3>
                        {uuids.length > 0 && (
                            <button
                                onClick={clearAll}
                                className="text-xs text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1"
                            >
                                <Trash2 size={14} />
                                Clear History
                            </button>
                        )}
                    </div>

                    <div className="space-y-3">
                        {uuids.length > 0 ? (
                            uuids.map((uuid, i) => (
                                <div
                                    key={i}
                                    className="group bg-zinc-800/30 border border-white/5 rounded-2xl p-4 flex items-center justify-between hover:bg-zinc-800/50 hover:border-white/10 transition-all animate-in fade-in slide-in-from-top-2 duration-300"
                                >
                                    <code className="text-zinc-100 font-mono text-sm sm:text-base break-all">
                                        {uuid}
                                    </code>
                                    <button
                                        onClick={() => copyToClipboard(uuid, i)}
                                        className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-blue-400 transition-colors shrink-0 ml-4"
                                    >
                                        {copiedIndex === i ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-zinc-950/30 border border-dashed border-white/5 rounded-2xl space-y-4">
                                <RefreshCw size={48} className="mx-auto text-zinc-800 animate-spin-slow" />
                                <p className="text-zinc-600 text-sm">Click generate to create your first UUID</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6">
                <p className="text-xs text-zinc-500 leading-relaxed text-center">
                    UUID v4 is a universally unique identifier generated using random numbers.
                    The probability of a duplicate is virtually zero, making it perfect for database keys and unique session IDs.
                </p>
            </div>
        </div>
    );
}
