"use client";

import { useState } from "react";
import { FileCode2, RefreshCw, Copy, Check, ArrowRightLeft } from "lucide-react";
import { marked } from "marked";

export default function MarkdownToHtml() {
    const [md, setMd] = useState("");
    const [html, setHtml] = useState("");
    const [copied, setCopied] = useState(false);

    const convert = async () => {
        if (!md.trim()) {
            setHtml("");
            return;
        }
        const result = await marked(md);
        setHtml(result);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(html);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Markdown to <span className="text-cyan-500">HTML</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert Markdown text to raw HTML instantly.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400">Markdown Input</label>
                    <textarea
                        value={md}
                        onChange={(e) => setMd(e.target.value)}
                        placeholder="# Hello World&#10;**Bold** text"
                        className="w-full h-96 bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none font-mono text-sm resize-none"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400">HTML Output</label>
                        {html && (
                            <button
                                onClick={copyToClipboard}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                    <div className="relative h-96">
                        <textarea
                            readOnly
                            value={html}
                            placeholder="<h1>Hello World</h1>..."
                            className="w-full h-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-cyan-400 font-mono text-sm resize-none focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={convert}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
                >
                    <ArrowRightLeft size={20} />
                    Convert to HTML
                </button>
            </div>
        </div>
    );
}
