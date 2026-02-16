"use client";

import { useState, useEffect } from "react";
import { Copy, RefreshCw, Hash, Check } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function HMACGenerator() {
    const [input, setInput] = useState("");
    const [secret, setSecret] = useState("");
    const [algo, setAlgo] = useState("SHA-256");
    const [hmac, setHmac] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        generateHMAC();
    }, [input, secret, algo]);

    const generateHMAC = async () => {
        if (!input || !secret) {
            setHmac("");
            return;
        }

        const encoder = new TextEncoder();
        const keyData = encoder.encode(secret);
        const msgData = encoder.encode(input);

        try {
            const key = await crypto.subtle.importKey(
                "raw",
                keyData,
                { name: "HMAC", hash: algo },
                false,
                ["sign"]
            );

            const signature = await crypto.subtle.sign("HMAC", key, msgData);
            const hashArray = Array.from(new Uint8Array(signature));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            setHmac(hashHex);
        } catch (e) {
            console.error(e);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hmac);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    HMAC <span className="text-purple-500">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Compute Hash-based Message Authentication Codes using various algorithms.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Input String</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text to hash..."
                        className="w-full h-32 bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50 outline-none resize-none"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Secret Key</label>
                        <input
                            type="text"
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                            placeholder="Enter secret key..."
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Algorithm</label>
                        <select
                            value={algo}
                            onChange={(e) => setAlgo(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500/50 outline-none appearance-none"
                        >
                            <option value="SHA-1">SHA-1</option>
                            <option value="SHA-256">SHA-256</option>
                            <option value="SHA-384">SHA-384</option>
                            <option value="SHA-512">SHA-512</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white">Computed HMAC</h3>
                        {hmac && (
                            <button
                                onClick={copyToClipboard}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                    <div className="bg-zinc-950 border border-white/5 rounded-xl p-4 font-mono text-sm text-zinc-300 break-all min-h-[60px] flex items-center">
                        {hmac || <span className="text-zinc-600 italic">Result will appear here...</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
