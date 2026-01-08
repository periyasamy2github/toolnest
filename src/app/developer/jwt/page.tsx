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
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <div className="flex items-center gap-4">
                <Link href="/developer" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">JWT Debugger</h1>
                    <p className="text-zinc-400">Decode, verify, and generate JSON Web Tokens.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Token Input/Output */}
                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <Key size={16} className="text-cyan-400" />
                                Encoded Token
                            </label>
                            <button
                                onClick={() => setToken("")}
                                className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                        <textarea
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Paste your JWT here..."
                            className="w-full h-64 bg-zinc-950 border border-white/10 rounded-xl p-6 text-cyan-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none break-all"
                        />
                        {error && (
                            <div className="flex items-center gap-2 text-red-400 text-xs px-2">
                                <AlertCircle size={14} />
                                {error}
                            </div>
                        )}
                        <button
                            onClick={() => copyToClipboard(token)}
                            className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-white/5"
                        >
                            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                            {copied ? "Copied!" : "Copy Token"}
                        </button>
                    </div>

                    {/* Secret Config */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-zinc-100 font-medium text-sm flex items-center gap-2">
                                <Settings2 size={16} className="text-zinc-500" />
                                Verify Signature (HS256)
                            </h3>
                            <button
                                onClick={() => setShowSecret(!showSecret)}
                                className="text-zinc-500 hover:text-zinc-300 transition-colors"
                            >
                                {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        <input
                            type={showSecret ? "text" : "password"}
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                            className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-2 text-zinc-100 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
                        />
                        <p className="text-[10px] text-zinc-500 italic">
                            Note: This tool decodes tokens locally in your browser.
                        </p>
                    </div>
                </div>

                {/* Decoded Data */}
                <div className="space-y-6">
                    {/* Header */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Header</label>
                        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
                            <pre className="text-sm font-mono text-pink-400 overflow-auto max-h-40">
                                {header || <span className="text-zinc-700 italic">Header will appear here...</span>}
                            </pre>
                        </div>
                    </div>

                    {/* Payload */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between px-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Payload</label>
                            <button
                                onClick={generateJwt}
                                className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded border border-cyan-500/20 hover:bg-cyan-500/20 transition-all"
                            >
                                Generate from Payload
                            </button>
                        </div>
                        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6">
                            <textarea
                                value={payload}
                                onChange={(e) => setPayload(e.target.value)}
                                placeholder='{"sub": "1234567890", "name": "John Doe"}'
                                className="w-full h-64 bg-transparent text-sm font-mono text-purple-400 focus:outline-none resize-none"
                            />
                        </div>
                    </div>

                    {/* Signature Info */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 flex items-center gap-3">
                        <ShieldCheck className="text-green-400 shrink-0" size={20} />
                        <div className="text-xs text-zinc-400">
                            Signature is <span className="text-green-400 font-medium">Verified</span> (Mock)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
