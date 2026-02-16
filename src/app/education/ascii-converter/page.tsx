"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Binary, ArrowRightLeft, Copy, Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function AsciiConverter() {
    const [text, setText] = useState("");
    const [ascii, setAscii] = useState("");
    const [copied, setCopied] = useState(false);

    const handleText = (val: string) => {
        setText(val);
        if (!val) {
            setAscii("");
            return;
        }
        const codes = val.split("").map(char => char.charCodeAt(0)).join(" ");
        setAscii(codes);
    };

    const handleAscii = (val: string) => {
        // Allow numbers and spaces
        if (!/^[0-9\s]*$/.test(val)) return;

        setAscii(val);
        if (!val) {
            setText("");
            return;
        }

        const chars = val.trim().split(/\s+/);
        let str = "";
        for (const code of chars) {
            const num = parseInt(code);
            if (!isNaN(num) && num >= 0 && num <= 65535) {
                str += String.fromCharCode(num);
            }
        }
        setText(str);
    };

    const copyToClipboard = (val: string) => {
        navigator.clipboard.writeText(val);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    ASCII <span className="text-blue-500">Converter</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert text to ASCII codes and vice versa.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <div className="grid md:grid-cols-[1fr,auto,1fr] gap-8 items-start">
                    {/* Text Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <FileText size={16} /> Text
                        </label>
                        <div className="relative">
                            <textarea
                                value={text}
                                onChange={(e) => handleText(e.target.value)}
                                className="w-full h-48 bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none resize-none"
                                placeholder="Hello World"
                            />
                            {text && (
                                <button
                                    onClick={() => copyToClipboard(text)}
                                    className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors"
                                >
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center self-center">
                        <div className="p-4 bg-zinc-800 rounded-full text-zinc-400">
                            <ArrowRightLeft size={24} />
                        </div>
                    </div>

                    {/* ASCII Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <Binary size={16} /> ASCII Codes
                        </label>
                        <div className="relative">
                            <textarea
                                value={ascii}
                                onChange={(e) => handleAscii(e.target.value)}
                                className="w-full h-48 bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none font-mono resize-none"
                                placeholder="72 101 108 108 111 32 87 111 114 108 100"
                            />
                            {ascii && (
                                <button
                                    onClick={() => copyToClipboard(ascii)}
                                    className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors"
                                >
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            )}
                        </div>
                        <p className="text-xs text-zinc-500">Space-separated decimal values</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
