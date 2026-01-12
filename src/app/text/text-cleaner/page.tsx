"use client";

import { useState } from "react";
import { ArrowLeft, Eraser, Copy, Check, Trash2, RefreshCw, Settings2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TextCleanerPage() {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    // Options
    const [options, setOptions] = useState({
        removeExtraSpaces: true,
        removeLineBreaks: false,
        removeHtmlTags: false,
        removeEmojis: false,
        removePunctuation: false,
        trimLines: true,
        removeEmptyLines: true,
        removeDuplicateLines: false,
        sentenceCase: false,
    });

    const handleClean = () => {
        let result = text;

        if (options.removeHtmlTags) {
            result = result.replace(/<[^>]*>/g, "");
        }

        if (options.removeEmojis) {
            result = result.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, "");
        }

        if (options.removePunctuation) {
            result = result.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        }

        if (options.removeLineBreaks) {
            result = result.replace(/(\r\n|\n|\r)/gm, " ");
        }

        if (options.trimLines) {
            result = result.split('\n').map(line => line.trim()).join('\n');
        }

        if (options.removeEmptyLines) {
            result = result.split('\n').filter(line => line.trim() !== "").join('\n');
        }

        if (options.removeDuplicateLines) {
            result = Array.from(new Set(result.split('\n'))).join('\n');
        }

        if (options.removeExtraSpaces) {
            result = result.replace(/\s+/g, " ").trim();
        }

        if (options.sentenceCase) {
            result = result.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        }

        setText(result);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/text" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Text Cleaner</h1>
                    <p className="text-zinc-400 text-lg">Clean, format, and optimize your text instantly.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Options Panel */}
                <div className="space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <div className="flex items-center gap-2 text-zinc-100 font-semibold border-b border-white/10 pb-4">
                            <Settings2 size={20} className="text-blue-400" />
                            Cleaning Options
                        </div>

                        <div className="space-y-4">
                            {[
                                { key: "removeExtraSpaces", label: "Remove Extra Spaces" },
                                { key: "removeLineBreaks", label: "Remove Line Breaks" },
                                { key: "removeEmptyLines", label: "Remove Empty Lines" },
                                { key: "removeDuplicateLines", label: "Remove Duplicate Lines" },
                                { key: "trimLines", label: "Trim Each Line" },
                                { key: "removeHtmlTags", label: "Remove HTML Tags" },
                                { key: "removeEmojis", label: "Remove Emojis" },
                                { key: "removePunctuation", label: "Remove Punctuation" },
                                { key: "sentenceCase", label: "Convert to Sentence Case" },
                            ].map((opt) => (
                                <label key={opt.key} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={options[opt.key as keyof typeof options]}
                                            onChange={(e) => setOptions({ ...options, [opt.key]: e.target.checked })}
                                            className="peer sr-only"
                                        />
                                        <div className="w-10 h-6 bg-zinc-800 rounded-full peer-checked:bg-blue-600 transition-colors border border-white/10 peer-checked:border-blue-500"></div>
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                                    </div>
                                    <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">{opt.label}</span>
                                </label>
                            ))}
                        </div>

                        <button
                            onClick={handleClean}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                        >
                            <Eraser size={18} />
                            Clean Text
                        </button>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="glass-card p-1 flex items-center justify-between bg-zinc-900/50">
                        <div className="px-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                            {text.length} characters • {text.split(/\s+/).filter(w => w.length > 0).length} words
                        </div>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setText("")}
                                className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-red-400 transition-colors"
                                title="Clear"
                            >
                                <Trash2 size={18} />
                            </button>
                            <button
                                onClick={copyToClipboard}
                                className="p-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-blue-400 transition-colors"
                                title="Copy"
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste your text here..."
                        className="w-full h-[600px] bg-zinc-950/50 border border-white/10 rounded-xl p-6 text-zinc-300 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none font-mono text-sm leading-relaxed"
                    />
                </div>
            </div>
        </div>
    );
}
