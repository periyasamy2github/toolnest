"use client";

import { useState } from "react";
import { ArrowLeft, Copy, Check, Trash2, Hash, ArrowRightLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Base64Tool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const processBase64 = () => {
        try {
            if (!input.trim()) {
                setOutput("");
                setError(null);
                return;
            }
            if (mode === "encode") {
                setOutput(btoa(input));
            } else {
                setOutput(atob(input));
            }
            setError(null);
        } catch (e: any) {
            setError(mode === "decode" ? "Invalid Base64 string" : e.message);
            setOutput("");
        }
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clearAll = () => {
        setInput("");
        setOutput("");
        setError(null);
    };

    const toggleMode = () => {
        setMode(mode === "encode" ? "decode" : "encode");
        setInput(output);
        setOutput(input);
        setError(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="flex items-center gap-4">
                <Link href="/developer" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Base64 Encoder / Decoder</h1>
                    <p className="text-zinc-400">Securely encode and decode text to Base64 format.</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Mode Toggle */}
                <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/10 w-fit">
                    <button
                        onClick={() => setMode("encode")}
                        className={cn(
                            "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                            mode === "encode" ? "bg-blue-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                        )}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => setMode("decode")}
                        className={cn(
                            "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                            mode === "decode" ? "bg-blue-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                        )}
                    >
                        Decode
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {/* Input */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <Hash size={16} className="text-blue-400" />
                                {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
                            </label>
                            <button
                                onClick={clearAll}
                                className="text-xs text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1"
                            >
                                <Trash2 size={14} />
                                Clear
                            </button>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyUp={processBase64}
                            placeholder={mode === "encode" ? "Enter text here..." : "Enter Base64 here..."}
                            className="w-full h-40 bg-zinc-900/50 border border-white/10 rounded-2xl p-6 text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                        />
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={toggleMode}
                            className="p-3 rounded-full bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
                            title="Swap Input/Output"
                        >
                            <ArrowRightLeft size={20} />
                        </button>
                    </div>

                    {/* Output */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <ShieldCheck size={16} className="text-green-400" />
                                Result
                            </label>
                            {output && (
                                <button
                                    onClick={copyToClipboard}
                                    className="text-xs text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                                >
                                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                    {copied ? "Copied!" : "Copy Result"}
                                </button>
                            )}
                        </div>
                        <div className={cn(
                            "w-full min-h-[160px] bg-zinc-950 border rounded-2xl p-6 font-mono text-sm break-all transition-all",
                            error ? "border-red-500/50 bg-red-500/5 text-red-400" : "border-white/10 text-zinc-300"
                        )}>
                            {error || output || <span className="text-zinc-700 italic">Result will appear here...</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
