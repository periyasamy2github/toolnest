"use client";

import { useState } from "react";
import { ArrowLeft, Scissors, Copy, Check, RefreshCw, AlignLeft, Minimize2 } from "lucide-react";
import Link from "next/link";

export default function CssToolsPage() {
    const [css, setCss] = useState("");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const minifyCss = () => {
        try {
            setError(null);
            const minified = css
                .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
                .replace(/\s+/g, " ") // Collapse whitespace
                .replace(/\s*([\{\}:;,])\s*/g, "$1") // Remove spaces around symbols
                .trim();
            setOutput(minified);
        } catch (e) {
            setError("Error minifying CSS.");
        }
    };

    const beautifyCss = () => {
        try {
            setError(null);
            let formatted = css
                .replace(/\/\*[\s\S]*?\*\//g, (match) => match + "\n") // Add newline after comments
                .replace(/\s*\{\s*/g, " {\n  ") // Format opening brace
                .replace(/\s*;\s*/g, ";\n  ") // Format semicolon
                .replace(/\s*\}\s*/g, "\n}\n\n") // Format closing brace
                .replace(/,\s*/g, ", ") // Format commas
                .replace(/  \n/g, "") // Clean up empty lines
                .trim();
            setOutput(formatted);
        } catch (e) {
            setError("Error beautifying CSS.");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/developer" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">CSS Tools</h1>
                    <p className="text-zinc-400">Minify or beautify your CSS code for optimization or readability.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <Scissors size={16} />
                            CSS Input
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={minifyCss}
                                className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-all flex items-center gap-2"
                            >
                                <Minimize2 size={14} />
                                Minify
                            </button>
                            <button
                                onClick={beautifyCss}
                                className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all flex items-center gap-2"
                            >
                                <AlignLeft size={14} />
                                Beautify
                            </button>
                        </div>
                    </div>
                    <div className="glass-card p-4 h-[500px]">
                        <textarea
                            value={css}
                            onChange={(e) => setCss(e.target.value)}
                            className="w-full h-full bg-transparent border-none focus:outline-none text-zinc-200 font-mono text-sm resize-none placeholder:text-zinc-600"
                            placeholder=".container { color: red; margin: 10px; }"
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <RefreshCw size={16} />
                            Output
                        </label>
                        <button
                            onClick={copyToClipboard}
                            disabled={!output}
                            className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                            {copied ? "Copied!" : "Copy Result"}
                        </button>
                    </div>
                    <div className="glass-card p-4 h-[500px] overflow-auto">
                        <pre className="text-sm font-mono text-orange-400 whitespace-pre-wrap">
                            {output || <span className="text-zinc-600">/* Output will appear here... */</span>}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
