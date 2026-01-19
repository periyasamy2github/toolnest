"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
    Key,
    RefreshCw,
    Copy,
    Check,
    Settings2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TokenGenerator() {
    const [token, setToken] = useState("");
    const [length, setLength] = useState(32);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: false,
        hex: false
    });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        generateToken();
    }, [length, options]);

    const generateToken = () => {
        if (options.hex) {
            const array = new Uint8Array(length / 2);
            crypto.getRandomValues(array);
            const hex = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
            setToken(hex);
            return;
        }

        let chars = "";
        if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
        if (options.numbers) chars += "0123456789";
        if (options.symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

        if (!chars) {
            setToken("");
            return;
        }

        let result = "";
        const randomValues = new Uint32Array(length);
        crypto.getRandomValues(randomValues);

        for (let i = 0; i < length; i++) {
            result += chars[randomValues[i] % chars.length];
        }
        setToken(result);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(token);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Token <span className="text-purple-500">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Generate secure random tokens, API keys, and secrets.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                {/* Token Display */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur" />
                    <div className="relative bg-zinc-950 border border-white/10 rounded-xl p-6 flex items-center justify-between gap-4">
                        <div className="font-mono text-xl md:text-2xl text-white break-all">
                            {token || <span className="text-zinc-600">Select options...</span>}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <button
                                onClick={generateToken}
                                className="p-2 text-zinc-400 hover:text-white transition-colors"
                                title="Regenerate"
                            >
                                <RefreshCw size={20} />
                            </button>
                            <button
                                onClick={copyToClipboard}
                                className="p-2 text-zinc-400 hover:text-purple-400 transition-colors"
                                title="Copy"
                                disabled={!token}
                            >
                                {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Length Slider */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-zinc-400">Length</label>
                            <span className="text-sm font-bold text-white bg-white/10 px-2 py-1 rounded-lg">
                                {length}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="8"
                            max="128"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="w-full accent-purple-500"
                        />
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <Settings2 size={16} />
                            Characters
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Uppercase (A-Z)", key: "uppercase" },
                                { label: "Lowercase (a-z)", key: "lowercase" },
                                { label: "Numbers (0-9)", key: "numbers" },
                                { label: "Symbols (!@#)", key: "symbols" },
                                { label: "Hex (0-9, a-f)", key: "hex" },
                            ].map((opt) => (
                                <button
                                    key={opt.key}
                                    onClick={() => setOptions(prev => {
                                        if (opt.key === 'hex') {
                                            return { ...prev, hex: !prev.hex, symbols: false };
                                        }
                                        return { ...prev, [opt.key]: !prev[opt.key as keyof typeof options], hex: false };
                                    })}
                                    className={cn(
                                        "px-4 py-2 rounded-xl text-sm font-medium border transition-all text-left",
                                        options[opt.key as keyof typeof options]
                                            ? "bg-purple-500/10 border-purple-500/50 text-purple-400"
                                            : "bg-zinc-950 border-white/5 text-zinc-500 hover:border-white/10"
                                    )}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
