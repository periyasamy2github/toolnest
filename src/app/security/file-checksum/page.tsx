"use client";

import { useState } from "react";
import { FileText, Upload, RefreshCw, Copy, Check } from "lucide-react";

export default function FileChecksum() {
    const [file, setFile] = useState<File | null>(null);
    const [hashes, setHashes] = useState<Record<string, string>>({});
    const [isHashing, setIsHashing] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    const calculateChecksums = async (file: File) => {
        setIsHashing(true);
        setHashes({});

        try {
            const arrayBuffer = await file.arrayBuffer();
            const algos = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
            const newHashes: Record<string, string> = {};

            for (const algo of algos) {
                const hashBuffer = await crypto.subtle.digest(algo, arrayBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                newHashes[algo] = hashHex;
            }

            setHashes(newHashes);
        } catch (e) {
            console.error(e);
        } finally {
            setIsHashing(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (f) {
            setFile(f);
            calculateChecksums(f);
        }
    };

    const copyToClipboard = (text: string, algo: string) => {
        navigator.clipboard.writeText(text);
        setCopied(algo);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    File <span className="text-yellow-500">Checksum</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate file hashes (MD5, SHA-1, SHA-256) locally in your browser.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-12 text-center hover:border-yellow-500 transition-colors relative group">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        {isHashing ? <RefreshCw className="animate-spin text-yellow-500" size={32} /> : <Upload className="text-yellow-500" size={32} />}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        {file ? file.name : "Drop a file here or click to upload"}
                    </h3>
                    <p className="text-zinc-500">
                        {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Files are processed locally and never uploaded"}
                    </p>
                </div>

                {Object.keys(hashes).length > 0 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {Object.entries(hashes).map(([algo, hash]) => (
                            <div key={algo} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-zinc-400">{algo}</span>
                                    <button
                                        onClick={() => copyToClipboard(hash, algo)}
                                        className="text-zinc-500 hover:text-white transition-colors"
                                    >
                                        {copied === algo ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <div className="bg-zinc-950 border border-white/5 rounded-xl p-4 font-mono text-xs text-zinc-300 break-all">
                                    {hash}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
