"use client";

import { useState } from "react";
import { ArrowLeft, Copy, Check, Trash2, Braces, AlertCircle, FileJson, Minimize2, Maximize2 } from "lucide-react";
import Link from "next/link";
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
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <div className="flex items-center gap-4">
                <Link href="/developer" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">JSON Formatter & Validator</h1>
                    <p className="text-zinc-400">Clean, format, and validate your JSON data instantly.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ height: '600px' }}>
                {/* Input Area */}
                <div className="flex flex-col space-y-4 h-full min-h-0">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <FileJson size={16} className="text-blue-400" />
                            Input JSON
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
                        placeholder='Paste your JSON here... e.g. {"name": "ToolNest", "version": 1.0}'
                        className="flex-1 min-h-0 bg-zinc-900/50 border border-white/10 rounded-2xl p-6 text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                    />
                    <div className="flex gap-3 flex-shrink-0">
                        <button
                            onClick={formatJson}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10"
                        >
                            <Maximize2 size={18} />
                            Format (Pretty)
                        </button>
                        <button
                            onClick={minifyJson}
                            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-white/5"
                        >
                            <Minimize2 size={18} />
                            Minify
                        </button>
                    </div>
                </div>

                {/* Output Area */}
                <div className="flex flex-col space-y-4 h-full min-h-0">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <Braces size={16} className="text-green-400" />
                            Output
                        </label>
                        {output && (
                            <button
                                onClick={copyToClipboard}
                                className="text-xs text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                            >
                                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        )}
                    </div>
                    <div className="flex-1 min-h-0 overflow-hidden">
                        <pre className={cn(
                            "w-full h-full bg-zinc-950 border rounded-2xl p-6 overflow-auto font-mono text-sm transition-all",
                            error ? "border-red-500/50 bg-red-500/5" : "border-white/10"
                        )}>
                            {error ? (
                                <div className="flex items-start gap-3 text-red-400">
                                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="font-bold">Invalid JSON</p>
                                        <p className="text-xs opacity-80">{error}</p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 space-y-2">
                    <h3 className="text-zinc-100 font-medium flex items-center gap-2">
                        <Check size={16} className="text-green-400" />
                        Validation
                    </h3>
                    <p className="text-xs text-zinc-400">Instant validation with detailed error messages for syntax issues.</p>
                </div>
                <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 space-y-2">
                    <h3 className="text-zinc-100 font-medium flex items-center gap-2">
                        <Maximize2 size={16} className="text-blue-400" />
                        Pretty Print
                    </h3>
                    <p className="text-xs text-zinc-400">Formats messy JSON into a readable structure with 4-space indentation.</p>
                </div>
                <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 space-y-2">
                    <h3 className="text-zinc-100 font-medium flex items-center gap-2">
                        <Minimize2 size={16} className="text-purple-400" />
                        Minification
                    </h3>
                    <p className="text-xs text-zinc-400">Removes all whitespace to reduce the size of your JSON payload.</p>
                </div>
            </div>
        </div>
    );
}
