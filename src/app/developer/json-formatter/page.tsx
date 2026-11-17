"use client";

import { useState } from "react";
import { ArrowLeft, Copy, Check, Trash2, Braces, AlertCircle, FileJson, Minimize2, Maximize2 } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";

export default function JsonFormatter() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const formatJson = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, 4));
            setError(null);
        } catch (e: any) {
            setError(e.message);
            setOutput("");
        }
    };

    const minifyJson = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed));
            setError(null);
        } catch (e: any) {
            setError(e.message);
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

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-12">
            <div className="flex items-center gap-6">
                <BackButton />
                <div>
                    <h1 className="text-4xl font-black text-gradient">JSON Formatter & Validator</h1>
                    <p className="text-zinc-400 text-lg">Clean, format, and validate your JSON data instantly with total privacy.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" style={{ height: '650px' }}>
                {/* Input Area */}
                <div className="flex flex-col space-y-4 h-full min-h-0 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                            <FileJson size={16} className="text-blue-400" />
                            Input JSON
                        </label>
                        <button
                            onClick={clearAll}
                            className="text-xs font-bold text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1 uppercase tracking-widest"
                        >
                            <Trash2 size={14} />
                            Clear
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Paste your JSON here... e.g. {"name": "WebToolNest", "version": 1.0}'
                        className="flex-1 min-h-0 glass-card p-8 text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none placeholder:text-zinc-700"
                    />
                    <div className="flex gap-4 flex-shrink-0">
                        <button
                            onClick={formatJson}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95"
                        >
                            <Maximize2 size={20} />
                            Format (Pretty)
                        </button>
                        <button
                            onClick={minifyJson}
                            className="flex-1 glass hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 border border-white/5 hover:scale-[1.02] active:scale-95"
                        >
                            <Minimize2 size={20} />
                            Minify
                        </button>
                    </div>
                </div>

                {/* Output Area */}
                <div className="flex flex-col space-y-4 h-full min-h-0 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                            <Braces size={16} className="text-purple-400" />
                            Output
                        </label>
                        {output && (
                            <button
                                onClick={copyToClipboard}
                                className="text-xs font-bold text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-1 uppercase tracking-widest"
                            >
                                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                {copied ? "Copied!" : "Copy Output"}
                            </button>
                        )}
                    </div>
                    <div className="flex-1 min-h-0 overflow-hidden">
                        <pre className={cn(
                            "w-full h-full glass-card p-8 overflow-auto font-mono text-sm transition-all",
                            error ? "border-red-500/50 bg-red-500/5" : "border-white/10"
                        )}>
                            {error ? (
                                <div className="flex items-start gap-4 text-red-400">
                                    <AlertCircle size={24} className="shrink-0 mt-1" />
                                    <div className="space-y-2">
                                        <p className="text-lg font-bold">Invalid JSON</p>
                                        <p className="text-sm opacity-80 leading-relaxed">{error}</p>
                                    </div>
                                </div>
                            ) : (
                                <code className="text-zinc-300 whitespace-pre">
                                    {output || <span className="text-zinc-700 italic">Formatted output will appear here...</span>}
                                </code>
                            )}
                        </pre>
                    </div>
                </div>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="glass-card p-8 space-y-3 group hover:bg-white/5 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Check size={24} className="text-green-400" />
                    </div>
                    <h3 className="text-white font-bold text-xl">Validation</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">Instant validation with detailed error messages for syntax issues and structural problems.</p>
                </div>
                <div className="glass-card p-8 space-y-3 group hover:bg-white/5 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Maximize2 size={24} className="text-blue-400" />
                    </div>
                    <h3 className="text-white font-bold text-xl">Pretty Print</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">Formats messy JSON into a readable structure with standard 4-space indentation for better clarity.</p>
                </div>
                <div className="glass-card p-8 space-y-3 group hover:bg-white/5 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Minimize2 size={24} className="text-purple-400" />
                    </div>
                    <h3 className="text-white font-bold text-xl">Minification</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">Removes all unnecessary whitespace to reduce the size of your JSON payload for production use.</p>
                </div>
            </div>
        </div>
    );
}
