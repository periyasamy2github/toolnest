"use client";

import { useState } from "react";
import { m } from "framer-motion";
import {
    FileLock2,
    Lock,
    Unlock,
    Copy,
    Check,
    ArrowRightLeft,
    AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TextEncryptor() {
    const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
    const [input, setInput] = useState("");
    const [password, setPassword] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const process = async () => {
        setError("");
        setOutput("");

        if (!input || !password) {
            setError("Please provide both text and a password.");
            return;
        }

        try {
            if (mode === "encrypt") {
                await encryptText();
            } else {
                await decryptText();
            }
        } catch (e) {
            setError("Operation failed. Check your password or input format.");
            console.error(e);
        }
    };

    const getKey = async (pass: string, salt: Uint8Array) => {
        const enc = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            "raw",
            enc.encode(pass),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );
        return crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: salt as any,
                iterations: 100000,
                hash: "SHA-256"
            },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt", "decrypt"]
        );
    };

    const encryptText = async () => {
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await getKey(password, salt);
        const enc = new TextEncoder();

        const encryptedContent = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv },
            key,
            enc.encode(input)
        );

        // Format: salt + iv + ciphertext (all base64 encoded and joined)
        const buffer = new Uint8Array(salt.length + iv.length + encryptedContent.byteLength);
        buffer.set(salt, 0);
        buffer.set(iv, salt.length);
        buffer.set(new Uint8Array(encryptedContent), salt.length + iv.length);

        setOutput(btoa(String.fromCharCode(...Array.from(buffer))));
    };

    const decryptText = async () => {
        try {
            const data = new Uint8Array(atob(input).split("").map(c => c.charCodeAt(0)));
            const salt = data.slice(0, 16);
            const iv = data.slice(16, 28);
            const ciphertext = data.slice(28);

            const key = await getKey(password, salt);
            const decryptedContent = await crypto.subtle.decrypt(
                { name: "AES-GCM", iv: iv },
                key,
                ciphertext
            );

            const dec = new TextDecoder();
            setOutput(dec.decode(decryptedContent));
        } catch (e) {
            throw new Error("Decryption failed");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Text <span className="text-red-500">Encryptor</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Securely encrypt and decrypt text using AES-GCM.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2 bg-zinc-950 p-1 rounded-lg border border-white/5">
                                <button
                                    onClick={() => setMode("encrypt")}
                                    className={cn(
                                        "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                                        mode === "encrypt" ? "bg-red-500 text-white" : "text-zinc-400 hover:text-white"
                                    )}
                                >
                                    <Lock size={16} /> Encrypt
                                </button>
                                <button
                                    onClick={() => setMode("decrypt")}
                                    className={cn(
                                        "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                                        mode === "decrypt" ? "bg-red-500 text-white" : "text-zinc-400 hover:text-white"
                                    )}
                                >
                                    <Unlock size={16} /> Decrypt
                                </button>
                            </div>
                        </div>

                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-48 bg-zinc-950 border border-white/10 rounded-xl p-4 text-white placeholder-zinc-600 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none resize-none font-mono text-sm"
                            placeholder={mode === "encrypt" ? "Enter text to encrypt..." : "Paste encrypted text here..."}
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none"
                                placeholder="Enter encryption password"
                            />
                        </div>

                        <button
                            onClick={process}
                            className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                        >
                            {mode === "encrypt" ? <Lock size={18} /> : <Unlock size={18} />}
                            {mode === "encrypt" ? "Encrypt Text" : "Decrypt Text"}
                        </button>

                        {error && (
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                                <AlertTriangle size={16} />
                                {error}
                            </div>
                        )}
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Output</label>
                            <button
                                onClick={copyToClipboard}
                                disabled={!output}
                                className="p-2 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
                            >
                                {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                            </button>
                        </div>

                        <div className="flex-1 bg-zinc-950 border border-white/10 rounded-xl p-4 relative overflow-hidden group">
                            {output ? (
                                <div className="font-mono text-sm text-zinc-300 break-all whitespace-pre-wrap">
                                    {output}
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-zinc-700 text-sm italic">
                                    Result will appear here...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
