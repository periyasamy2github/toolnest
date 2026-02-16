"use client";

import { useState } from "react";
import { RefreshCw, Copy, Check, Fingerprint } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function MACAddressGenerator() {
    const [format, setFormat] = useState("colon"); // colon, dash, none
    const [casing, setCasing] = useState("upper"); // upper, lower
    const [prefix, setPrefix] = useState(""); // OUI prefix
    const [macs, setMacs] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generate = () => {
        const newMacs = [];
        for (let i = 0; i < 5; i++) {
            let mac = "";
            if (prefix && /^[0-9A-Fa-f]{6}$/.test(prefix.replace(/[^0-9A-Fa-f]/g, ""))) {
                // Use provided prefix
                const cleanPrefix = prefix.replace(/[^0-9A-Fa-f]/g, "");
                mac = cleanPrefix;
                for (let j = 0; j < 6; j++) {
                    mac += Math.floor(Math.random() * 16).toString(16);
                }
            } else {
                // Random
                for (let j = 0; j < 12; j++) {
                    mac += Math.floor(Math.random() * 16).toString(16);
                }
            }

            // Format
            let formatted = mac;
            if (format === "colon") {
                formatted = mac.match(/.{1,2}/g)?.join(":") || mac;
            } else if (format === "dash") {
                formatted = mac.match(/.{1,2}/g)?.join("-") || mac;
            } else if (format === "dot") {
                formatted = mac.match(/.{1,4}/g)?.join(".") || mac;
            }

            // Case
            if (casing === "upper") formatted = formatted.toUpperCase();
            else formatted = formatted.toLowerCase();

            newMacs.push(formatted);
        }
        setMacs(newMacs);
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    MAC Address <span className="text-teal-500">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Generate random MAC addresses with custom formats and prefixes.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Format</label>
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-teal-500/50 outline-none appearance-none"
                        >
                            <option value="colon">MM:MM:MM:SS:SS:SS</option>
                            <option value="dash">MM-MM-MM-SS-SS-SS</option>
                            <option value="dot">MMMM.MMSS.SSSS</option>
                            <option value="none">MMMMMMSSSSSS</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Case</label>
                        <select
                            value={casing}
                            onChange={(e) => setCasing(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-teal-500/50 outline-none appearance-none"
                        >
                            <option value="upper">Uppercase</option>
                            <option value="lower">Lowercase</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Prefix (OUI) - Optional</label>
                        <input
                            type="text"
                            value={prefix}
                            onChange={(e) => setPrefix(e.target.value)}
                            placeholder="00:1A:2B"
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-teal-500/50 outline-none font-mono"
                        />
                    </div>
                </div>

                <button
                    onClick={generate}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all"
                >
                    <RefreshCw size={20} />
                    Generate MAC Addresses
                </button>

                {macs.length > 0 && (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {macs.map((mac, i) => (
                            <div key={i} className="flex items-center justify-between bg-zinc-950 border border-white/5 rounded-xl p-4 group hover:border-teal-500/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Fingerprint size={20} className="text-zinc-600 group-hover:text-teal-500 transition-colors" />
                                    <span className="font-mono text-lg text-zinc-300">{mac}</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(mac, i)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100"
                                >
                                    {copiedIndex === i ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
