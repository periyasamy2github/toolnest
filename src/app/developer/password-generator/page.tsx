"use client";

import { useState } from "react";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function PasswordGeneratorPage() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });
    const [copied, setCopied] = useState(false);

    const generatePassword = () => {
        const chars = {
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lowercase: "abcdefghijklmnopqrstuvwxyz",
            numbers: "0123456789",
            symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
        };

        let charset = "";
        if (options.uppercase) charset += chars.uppercase;
        if (options.lowercase) charset += chars.lowercase;
        if (options.numbers) charset += chars.numbers;
        if (options.symbols) charset += chars.symbols;

        if (!charset) return;

        let newPassword = "";
        for (let i = 0; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(newPassword);
        setCopied(false);
    };

    const copyToClipboard = () => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Generate on initial load
    useState(() => {
        generatePassword();
    });

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/developer" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Password Generator</h1>
                    <p className="text-zinc-400">Create secure, random passwords instantly.</p>
                </div>
            </div>

            <div className="glass-card p-8 space-y-8">
                {/* Display */}
                <div className="relative">
                    <div className="w-full bg-zinc-950/50 border border-white/10 rounded-xl p-6 text-center">
                        <span className="text-3xl font-mono text-zinc-100 break-all tracking-wider">
                            {password}
                        </span>
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="absolute top-1/2 -translate-y-1/2 right-4 p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                    </button>
                </div>

                {/* Controls */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Length</span>
                            <span className="text-zinc-200">{length} characters</span>
                        </div>
                        <input
                            type="range"
                            min="8"
                            max="64"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="w-full accent-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(options).map(([key, value]) => (
                            <label
                                key={key}
                                className={cn(
                                    "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all",
                                    value
                                        ? "bg-blue-500/10 border-blue-500/50 text-zinc-100"
                                        : "bg-zinc-900/30 border-white/5 text-zinc-500 hover:bg-zinc-900/50"
                                )}
                            >
                                <span className="capitalize">{key}</span>
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={() => setOptions((prev) => ({ ...prev, [key as keyof typeof options]: !prev[key as keyof typeof options] }))}
                                    className="hidden"
                                />
                                <div className={cn(
                                    "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                    value ? "bg-blue-500 border-blue-500" : "border-zinc-600"
                                )}>
                                    {value && <Check size={14} className="text-white" />}
                                </div>
                            </label>
                        ))}
                    </div>

                    <button
                        onClick={generatePassword}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-lg"
                    >
                        <RefreshCw size={20} />
                        Generate New Password
                    </button>
                </div>
            </div>
        </div>
    );
}
