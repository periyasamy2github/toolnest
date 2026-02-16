"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
    Hash,
    Copy,
    Check,
    RefreshCw,
    FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

const ALGORITHMS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

export default function HashGenerator() {
    const [input, setInput] = useState("");
    const [hashes, setHashes] = useState<Record<string, string>>({});
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        generateHashes(input);
    }, [input]);

    const generateHashes = async (text: string) => {
        if (!text) {
            setHashes({});
            return;
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const newHashes: Record<string, string> = {};

        for (const algo of ALGORITHMS) {
            try {
                const hashBuffer = await crypto.subtle.digest(algo, data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                newHashes[algo] = hashHex;
            } catch (e) {
                console.error(`Error generating ${algo} hash:`, e);
            }
        }

        setHashes(newHashes);
    };

    const copyToClipboard = (text: string, algo: string) => {
        navigator.clipboard.writeText(text);
        setCopied(algo);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Hash <span className="text-blue-500">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Generate secure hashes using standard algorithms.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Input Text</label>
                            <button
                                onClick={() => setInput("")}
                                className="text-xs text-zinc-500 hover:text-white transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full flex-1 bg-zinc-950 border border-white/10 rounded-xl p-4 text-white placeholder-zinc-600 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none resize-none min-h-[200px]"
                            placeholder="Type or paste content here..."
                        />
                        <div className="mt-4 text-right text-xs text-zinc-500">
                            {input.length} characters
                        </div>
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                    {ALGORITHMS.map((algo) => (
                        <m.div
                            key={algo}
                            layout
                            className="bg-zinc-900/50 border border-white/10 rounded-2xl p-4 backdrop-blur-xl overflow-hidden group hover:border-blue-500/30 transition-all"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                                        <Hash size={14} />
                                    </div>
                                    <span className="text-sm font-bold text-white">{algo}</span>
                                </div>
                                <button
                                    onClick={() => hashes[algo] && copyToClipboard(hashes[algo], algo)}
                                    className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                    disabled={!hashes[algo]}
                                >
                                    {copied === algo ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                                </button>
                            </div>

                            <div className="relative">
                                <div className={cn(
                                    "font-mono text-sm break-all transition-colors",
                                    hashes[algo] ? "text-zinc-300" : "text-zinc-700 italic"
                                )}>
                                    {hashes[algo] || "Waiting for input..."}
                                </div>
                            </div>
                        </m.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
