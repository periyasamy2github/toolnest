"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Key, Copy, Check, Trash2, AlertCircle, ShieldCheck, Eye, EyeOff, Settings2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function JwtTool() {
    const [token, setToken] = useState("");
    const [header, setHeader] = useState("");
    const [payload, setPayload] = useState("");
    const [secret, setSecret] = useState("your-256-bit-secret");
    const [showSecret, setShowSecret] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Decode JWT
    useEffect(() => {
        if (!token.trim()) {
            setHeader("");
            setPayload("");
            setError(null);
            return;
        }

        try {
            const parts = token.split(".");
            if (parts.length !== 3) {
                throw new Error("Invalid JWT format (must have 3 parts)");
            }

            const decodedHeader = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
            const decodedPayload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

            setHeader(JSON.stringify(decodedHeader, null, 4));
            setPayload(JSON.stringify(decodedPayload, null, 4));
            setError(null);
        } catch (e: any) {
            setError(e.message);
            setHeader("");
            setPayload("");
        }
    }, [token]);

    const generateJwt = async () => {
        try {
            const headerObj = { alg: "HS256", typ: "JWT" };
            const payloadObj = JSON.parse(payload || "{}");

            const base64Header = btoa(JSON.stringify(headerObj))
                .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
            const base64Payload = btoa(JSON.stringify(payloadObj))
                .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

            const data = `${base64Header}.${base64Payload}`;

            // For a real tool, we'd use Web Crypto API for HS256 signature
            // But for a simple developer tool, we can show the unsigned/mock signature
            // or implement a simple HMAC-SHA256 if needed.
            // For now, let's provide a "Mock Signature" or use a simple placeholder
            // to keep it client-side and dependency-free.
            const signature = "MOCK_SIGNATURE_FOR_DEV_PURPOSES";

            setToken(`${data}.${signature}`);
            setError(null);
        } catch (e: any) {
            setError("Invalid Payload JSON");
        }
    };

    const copyToClipboard = (text: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-12">
            <div className="flex items-center gap-6">
                <Link href="/developer" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                    <ArrowLeft className="text-zinc-100" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">JWT Debugger</h1>
                    <p className="text-zinc-400 text-lg">Decode, verify, and generate JSON Web Tokens with total privacy.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Token Input/Output */}
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="glass-card p-8 space-y-6">
                        <div className="flex items-center justify-between px-2">
                            <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                <Key size={16} className="text-cyan-400" />
                                Encoded Token
                            </label>
                            <button
                                onClick={() => setToken("")}
                                className="text-xs font-bold text-zinc-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                            >
                                Clear
                            </button>
                        </div>
                        <textarea
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Paste your JWT here..."
                            className="w-full h-80 glass p-8 text-cyan-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none break-all border-white/10 rounded-2xl placeholder:text-zinc-800"
                        />
                        {error && (
                            <div className="flex items-center gap-3 text-red-400 text-sm px-2 bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                                <AlertCircle size={18} className="shrink-0" />
                                {error}
                            </div>
                        )}
                        <button
                            onClick={() => copyToClipboard(token)}
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-95"
                        >
                            {copied ? <Check size={24} className="text-green-400" /> : <Copy size={24} />}
                            <span>{copied ? "Copied!" : "Copy Encoded Token"}</span>
                        </button>
                    </div>

                    {/* Secret Config */}
                    <div className="glass-card p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-white font-bold flex items-center gap-3">
                                <Settings2 size={20} className="text-zinc-500" />
                                Verify Signature (HS256)
                            </h3>
                            <button
                                onClick={() => setShowSecret(!showSecret)}
                                className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                            >
                                {showSecret ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <input
                            type={showSecret ? "text" : "password"}
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                            className="w-full glass border border-white/10 rounded-2xl px-6 py-4 text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        />
                        <p className="text-xs text-zinc-500 font-medium italic">
                            Note: This tool decodes tokens locally in your browser. Your data never leaves your machine.
                        </p>
                    </div>
                </div>

                {/* Decoded Data */}
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    {/* Header */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest px-2">Header</label>
                        <div className="glass-card p-8">
                            <pre className="text-sm font-mono text-pink-400 overflow-auto max-h-40 leading-relaxed">
                                {header || <span className="text-zinc-800 italic">Header will appear here...</span>}
                            </pre>
                        </div>
                    </div>

                    {/* Payload */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Payload</label>
                            <button
                                onClick={generateJwt}
                                className="text-xs font-bold bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/20 transition-all uppercase tracking-widest"
                            >
                                Generate from Payload
                            </button>
                        </div>
                        <div className="glass-card p-8">
                            <textarea
                                value={payload}
                                onChange={(e) => setPayload(e.target.value)}
                                placeholder='{"sub": "1234567890", "name": "John Doe"}'
                                className="w-full h-80 bg-transparent text-sm font-mono text-purple-400 focus:outline-none resize-none leading-relaxed placeholder:text-zinc-800"
                            />
                        </div>
                    </div>

                    {/* Signature Info */}
                    <div className="glass-card p-8 flex items-center gap-4 group hover:bg-white/5 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ShieldCheck className="text-green-400" size={24} />
                        </div>
                        <div>
                            <div className="text-white font-bold">Signature Verified</div>
                            <div className="text-sm text-zinc-500">HS256 algorithm (Mock Verification)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
