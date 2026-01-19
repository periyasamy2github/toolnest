"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
    Link as LinkIcon,
    Copy,
    Check,
    Globe,
    Search
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function UrlParser() {
    const [input, setInput] = useState("");
    const [parsed, setParsed] = useState<URL | null>(null);
    const [params, setParams] = useState<Record<string, string>>({});
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        try {
            if (!input) {
                setParsed(null);
                setParams({});
                return;
            }

            // Add protocol if missing for parsing
            const urlStr = input.match(/^https?:\/\//) ? input : `https://${input}`;
            const url = new URL(urlStr);
            setParsed(url);

            const searchParams: Record<string, string> = {};
            url.searchParams.forEach((value, key) => {
                searchParams[key] = value;
            });
            setParams(searchParams);
        } catch (e) {
            setParsed(null);
            setParams({});
        }
    }, [input]);

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    URL <span className="text-green-500">Parser</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Analyze and break down URLs into their components.
                </p>
            </div>

            <div className="space-y-8">
                {/* Input Section */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                            <Globe size={20} />
                        </div>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:ring-2 focus:ring-green-500/50 focus:border-green-500 outline-none font-mono"
                            placeholder="Paste URL here (e.g., https://example.com/path?query=1)"
                        />
                    </div>
                </div>

                {/* Results Section */}
                {parsed && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Components */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <LinkIcon size={20} className="text-green-400" />
                                Components
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { label: "Protocol", value: parsed.protocol },
                                    { label: "Hostname", value: parsed.hostname },
                                    { label: "Port", value: parsed.port || "(default)" },
                                    { label: "Pathname", value: parsed.pathname },
                                    { label: "Hash", value: parsed.hash || "(none)" },
                                ].map((item) => (
                                    <div key={item.label} className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 group hover:border-green-500/30 transition-colors">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{item.label}</span>
                                            <button
                                                onClick={() => copyToClipboard(item.value, item.label)}
                                                className="text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                {copied === item.label ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                        <div className="font-mono text-sm text-white break-all">
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Query Parameters */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Search size={20} className="text-blue-400" />
                                Query Parameters
                            </h3>
                            {Object.keys(params).length > 0 ? (
                                <div className="space-y-3">
                                    {Object.entries(params).map(([key, value]) => (
                                        <div key={key} className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 group hover:border-blue-500/30 transition-colors">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-bold text-blue-400">{key}</span>
                                                <button
                                                    onClick={() => copyToClipboard(value, `param-${key}`)}
                                                    className="text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    {copied === `param-${key}` ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                                </button>
                                            </div>
                                            <div className="font-mono text-sm text-white break-all">
                                                {value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-8 text-center text-zinc-500 italic">
                                    No query parameters found.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
