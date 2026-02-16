"use client";

import { useState } from "react";
import { Binary, RefreshCw, Copy, Check, ArrowRightLeft } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function BinaryToText() {
    const [binary, setBinary] = useState("");
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const convert = () => {
        setError("");
        if (!binary.trim()) {
            setText("");
            return;
        }

        try {
            const result = binary.trim().split(/\s+/).map(bin => {
                if (!/^[01]+$/.test(bin)) throw new Error("Invalid binary character");
                return String.fromCharCode(parseInt(bin, 2));
            }).join('');
            setText(result);
        } catch (e: any) {
            setError("Invalid binary format");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Binary to <span className="text-blue-500">Text</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert binary code back to readable text.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400">Binary Input</label>
                    <textarea
                        value={binary}
                        onChange={(e) => setBinary(e.target.value)}
                        placeholder="01001000 01100101..."
                        className="w-full h-64 bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none font-mono text-sm resize-none"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400">Text Output</label>
                        {text && (
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
                            value={text}
                            placeholder="Hello World"
                            className="w-full h-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-blue-400 font-mono text-sm resize-none focus:outline-none"
                        />
                        {error && (
                            <div className="absolute inset-0 bg-zinc-950/90 flex items-center justify-center p-6 text-center">
                                <p className="text-red-400">{error}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={convert}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all"
                >
                    <ArrowRightLeft size={20} />
                    Convert to Text
                </button>
            </div>
        </div>
    );
}
