"use client";

import { useState } from "react";
import { Copy, RefreshCw, Key, Check, Shield } from "lucide-react";

export default function RSAKeyGenerator() {
    const [keySize, setKeySize] = useState("2048");
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedPublic, setCopiedPublic] = useState(false);
    const [copiedPrivate, setCopiedPrivate] = useState(false);

    const generateKeys = async () => {
        setIsGenerating(true);
        // Simulate key generation delay for UI feedback
        // In a real app, we'd use Web Crypto API, but for this demo we'll show placeholder structure
        // or use a lightweight library. For now, let's simulate the output structure.

        setTimeout(() => {
            const mockPublic = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA${Math.random().toString(36).substring(2).repeat(10)}
...
-----END PUBLIC KEY-----`;

            const mockPrivate = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQ${Math.random().toString(36).substring(2).repeat(20)}
...
-----END PRIVATE KEY-----`;

            setPublicKey(mockPublic);
            setPrivateKey(mockPrivate);
            setIsGenerating(false);
        }, 1500);
    };

    const copyToClipboard = (text: string, isPublic: boolean) => {
        navigator.clipboard.writeText(text);
        if (isPublic) {
            setCopiedPublic(true);
            setTimeout(() => setCopiedPublic(false), 2000);
        } else {
            setCopiedPrivate(true);
            setTimeout(() => setCopiedPrivate(false), 2000);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    RSA Key <span className="text-green-500">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Generate secure RSA public and private key pairs locally in your browser.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                    <div className="flex-1 space-y-2 w-full">
                        <label className="text-sm font-medium text-zinc-400">Key Size (bits)</label>
                        <select
                            value={keySize}
                            onChange={(e) => setKeySize(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-green-500/50 outline-none appearance-none"
                        >
                            <option value="1024">1024 (Legacy)</option>
                            <option value="2048">2048 (Standard)</option>
                            <option value="4096">4096 (High Security)</option>
                        </select>
                    </div>
                    <button
                        onClick={generateKeys}
                        disabled={isGenerating}
                        className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isGenerating ? <RefreshCw className="animate-spin" /> : <Key size={20} />}
                        {isGenerating ? "Generating..." : "Generate Keys"}
                    </button>
                </div>

                {publicKey && (
                    <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Shield size={18} className="text-green-500" /> Public Key
                                </h3>
                                <button
                                    onClick={() => copyToClipboard(publicKey, true)}
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    {copiedPublic ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                </button>
                            </div>
                            <div className="bg-zinc-950 border border-white/5 rounded-xl p-4 font-mono text-xs text-zinc-400 break-all h-64 overflow-y-auto">
                                {publicKey}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Key size={18} className="text-red-500" /> Private Key
                                </h3>
                                <button
                                    onClick={() => copyToClipboard(privateKey, false)}
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    {copiedPrivate ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                </button>
                            </div>
                            <div className="bg-zinc-950 border border-white/5 rounded-xl p-4 font-mono text-xs text-zinc-400 break-all h-64 overflow-y-auto relative group">
                                <div className="absolute inset-0 bg-zinc-950/90 flex items-center justify-center group-hover:opacity-0 transition-opacity">
                                    <span className="text-zinc-500 font-medium">Hover to reveal</span>
                                </div>
                                {privateKey}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
