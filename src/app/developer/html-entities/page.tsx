"use client";

import { useState } from "react";
import { ArrowLeft, Copy, Check, Trash2, Shield, ArrowRightLeft, Code2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HtmlEntitiesTool() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"escape" | "unescape">("escape");
    const [copied, setCopied] = useState(false);

    const escapeHtml = (str: string) => {
        return str.replace(/[&<>"']/g, (m) => {
            switch (m) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#039;';
                default: return m;
            }
        });
    };

    const unescapeHtml = (str: string) => {
        const doc = new DOMParser().parseFromString(str, "text/html");
        return doc.documentElement.textContent || "";
    };

    const processHtml = () => {
        if (!input.trim()) {
            setOutput("");
            return;
        }
        if (mode === "escape") {
            setOutput(escapeHtml(input));
        } else {
            setOutput(unescapeHtml(input));
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
    };

    const toggleMode = () => {
        setMode(mode === "escape" ? "unescape" : "escape");
        setInput(output);
        setOutput(input);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="flex items-center gap-4">
                <Link href="/developer" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">HTML Escape / Unescape</h1>
                    <p className="text-zinc-400">Safely escape HTML characters to prevent XSS or unescape them back to symbols.</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Mode Toggle */}
                <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/10 w-fit">
                    <button
                        onClick={() => setMode("escape")}
                        className={cn(
                            "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                            mode === "escape" ? "bg-purple-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                        )}
                    >
                        Escape
                    </button>
                    <button
                        onClick={() => setMode("unescape")}
                        className={cn(
                            "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                            mode === "unescape" ? "bg-purple-500 text-white shadow-lg" : "text-zinc-400 hover:text-zinc-200"
                        )}
                    >
                        Unescape
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {/* Input */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <Code2 size={16} className="text-purple-400" />
                                {mode === "escape" ? "HTML to Escape" : "Escaped HTML to Unescape"}
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
                            onKeyUp={processHtml}
                            placeholder={mode === "escape" ? 'e.g. <script>alert("XSS")</script>' : 'e.g. &lt;div&gt;Hello&lt;/div&gt;'}
                            className="w-full h-40 bg-zinc-900/50 border border-white/10 rounded-2xl p-6 text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
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
                                <Shield size={16} className="text-blue-400" />
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
                            "w-full min-h-[160px] bg-zinc-950 border border-white/10 rounded-2xl p-6 font-mono text-sm break-all text-zinc-300 transition-all"
                        )}>
                            {output || <span className="text-zinc-700 italic">Result will appear here...</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
