"use client";

import { useState } from "react";
import { Copy, RefreshCw, Lock, Check } from "lucide-react";
import bcrypt from "bcryptjs";

export default function BcryptGenerator() {
    const [password, setPassword] = useState("");
    const [rounds, setRounds] = useState(10);
    const [hash, setHash] = useState("");
    const [compareHash, setCompareHash] = useState("");
    const [matchResult, setMatchResult] = useState<boolean | null>(null);
    const [isHashing, setIsHashing] = useState(false);
    const [copied, setCopied] = useState(false);

    const generateHash = async () => {
        if (!password) return;
        setIsHashing(true);
        // Use setTimeout to allow UI update before heavy calculation
        setTimeout(() => {
            const salt = bcrypt.genSaltSync(rounds);
            const hash = bcrypt.hashSync(password, salt);
            setHash(hash);
            setIsHashing(false);
        }, 100);
    };

    const checkMatch = () => {
        if (!password || !compareHash) return;
        const match = bcrypt.compareSync(password, compareHash);
        setMatchResult(match);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(hash);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Bcrypt <span className="text-blue-500">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Hash passwords securely using the Bcrypt algorithm.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Generator */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-6">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Lock size={20} className="text-blue-500" /> Generate Hash
                    </h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Password</label>
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Salt Rounds (4-31)</label>
                            <input
                                type="number"
                                min="4"
                                max="31"
                                value={rounds}
                                onChange={(e) => setRounds(parseInt(e.target.value))}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 outline-none"
                            />
                        </div>

                        <button
                            onClick={generateHash}
                            disabled={!password || isHashing}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isHashing ? <RefreshCw className="animate-spin" /> : <RefreshCw size={20} />}
                            {isHashing ? "Hashing..." : "Generate Hash"}
                        </button>

                        {hash && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-zinc-400">Result</span>
                                    <button onClick={copyToClipboard} className="text-zinc-400 hover:text-white">
                                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <div className="bg-zinc-950 border border-white/5 rounded-xl p-3 font-mono text-xs text-zinc-300 break-all">
                                    {hash}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Verifier */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-6">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                        <Check size={20} className="text-green-500" /> Verify Hash
                    </h3>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Password</label>
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-green-500/50 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Hash to Compare</label>
                            <input
                                type="text"
                                value={compareHash}
                                onChange={(e) => setCompareHash(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-green-500/50 outline-none"
                            />
                        </div>

                        <button
                            onClick={checkMatch}
                            disabled={!password || !compareHash}
                            className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Check Match
                        </button>

                        {matchResult !== null && (
                            <div className={`p-4 rounded-xl text-center font-bold ${matchResult ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                {matchResult ? "Match Found!" : "Does Not Match"}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
