"use client";

import { useState } from "react";
import { FileCode2, RefreshCw, Copy, Check, ArrowRightLeft } from "lucide-react";
import TurndownService from "turndown";
import BackButton from "@/components/BackButton";

export default function HtmlToMarkdown() {
    const [html, setHtml] = useState("");
    const [md, setMd] = useState("");
    const [copied, setCopied] = useState(false);

    const convert = () => {
        if (!html.trim()) {
            setMd("");
            return;
        }
        const turndownService = new TurndownService();
        const result = turndownService.turndown(html);
        setMd(result);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(md);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    HTML to <span className="text-indigo-500">Markdown</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert raw HTML to Markdown text instantly.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400">HTML Input</label>
                    <textarea
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        placeholder="<h1>Hello World</h1>"
                        className="w-full h-96 bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none font-mono text-sm resize-none"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400">Markdown Output</label>
                        {md && (
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
                            value={md}
                            placeholder="# Hello World"
                            className="w-full h-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-indigo-400 font-mono text-sm resize-none focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={convert}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all"
                >
                    <ArrowRightLeft size={20} />
                    Convert to Markdown
                </button>
            </div>
        </div>
    );
}
