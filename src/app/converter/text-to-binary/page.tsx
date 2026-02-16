"use client";

import { useState } from "react";
import { Binary, RefreshCw, Copy, Check, ArrowRightLeft } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function TextToBinary() {
    const [text, setText] = useState("");
    const [binary, setBinary] = useState("");
    const [copied, setCopied] = useState(false);

    const convert = () => {
        if (!text) {
            setBinary("");
            return;
        }
        const result = text.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');
        setBinary(result);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(binary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Text to <span className="text-green-500">Binary</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert text to binary code (0s and 1s).
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400">Text Input</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Hello World"
                        className="w-full h-64 bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-green-500/50 outline-none font-mono text-sm resize-none"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400">Binary Output</label>
                        {binary && (
                            <button
                                onClick={copyToClipboard}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                    <div className="relative h-64">
                        <textarea
                            readOnly
                            value={binary}
                            placeholder="01001000 01100101..."
                            className="w-full h-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-green-400 font-mono text-sm resize-none focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={convert}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-green-500/20 flex items-center gap-2 transition-all"
                >
                    <ArrowRightLeft size={20} />
                    Convert to Binary
                </button>
            </div>
        </div>
    );
}
