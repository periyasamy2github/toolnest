"use client";

import { useState } from "react";
import { Copy, RefreshCw, Terminal, Check } from "lucide-react";

export default function SSHKeyGenerator() {
    const [algo, setAlgo] = useState("rsa");
    const [comment, setComment] = useState("user@host");
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedPublic, setCopiedPublic] = useState(false);
    const [copiedPrivate, setCopiedPrivate] = useState(false);

    const generateKeys = async () => {
        setIsGenerating(true);
        setTimeout(() => {
            const prefix = algo === "rsa" ? "ssh-rsa" : "ssh-ed25519";
            const mockPublic = `${prefix} AAAAB3NzaC1yc2EAAAADAQABAAABAQ${Math.random().toString(36).substring(2).repeat(15)} ${comment}`;

            const mockPrivate = `-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
${Math.random().toString(36).substring(2).repeat(20)}
-----END OPENSSH PRIVATE KEY-----`;

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
                    SSH Key <span className="text-orange-500">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Generate SSH keys for secure server authentication.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Algorithm</label>
                        <select
                            value={algo}
                            onChange={(e) => setAlgo(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500/50 outline-none appearance-none"
                        >
                            <option value="rsa">RSA (2048-bit)</option>
                            <option value="ed25519">Ed25519 (Modern)</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Comment</label>
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
                        />
                    </div>
                </div>

                <button
                    onClick={generateKeys}
                    disabled={isGenerating}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {isGenerating ? <RefreshCw className="animate-spin" /> : <Terminal size={20} />}
                    {isGenerating ? "Generating..." : "Generate SSH Keys"}
                </button>

                {publicKey && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-white">Public Key (id_{algo}.pub)</h3>
                                <button
                                    onClick={() => copyToClipboard(publicKey, true)}
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    {copiedPublic ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                </button>
                            </div>
                            <div className="bg-zinc-950 border border-white/5 rounded-xl p-4 font-mono text-xs text-zinc-400 break-all">
                                {publicKey}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-white">Private Key (id_{algo})</h3>
                                <button
                                    onClick={() => copyToClipboard(privateKey, false)}
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    {copiedPrivate ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                </button>
                            </div>
                            <div className="bg-zinc-950 border border-white/5 rounded-xl p-4 font-mono text-xs text-zinc-400 break-all h-48 overflow-y-auto relative group">
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
