"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
    Keyboard,
    Copy,
    Check
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function KeycodeEvent() {
    const [event, setEvent] = useState<KeyboardEvent | null>(null);
    const [history, setHistory] = useState<KeyboardEvent[]>([]);
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();
            setEvent(e);
            setHistory(prev => [e, ...prev].slice(0, 10));
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Keycode <span className="text-amber-500">Event</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Press any key to see its JavaScript event code, key, and details.
                </p>
            </div>

            {!event ? (
                <div className="min-h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-6 animate-pulse">
                        <div className="w-24 h-24 rounded-3xl bg-zinc-900/50 border border-white/10 flex items-center justify-center mx-auto">
                            <Keyboard size={48} className="text-zinc-600" />
                        </div>
                        <p className="text-2xl font-bold text-zinc-500">
                            Press any key on your keyboard...
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    {/* Main Display */}
                    <div className="flex justify-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-[3rem] opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
                            <div className="relative bg-zinc-900 border border-white/10 rounded-[2rem] p-12 min-w-[300px] text-center">
                                <div className="text-8xl font-black text-white mb-4">
                                    {event.keyCode}
                                </div>
                                <div className="text-2xl font-medium text-amber-500 font-mono">
                                    {event.key === " " ? "(Space)" : event.key}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: "event.key", value: event.key },
                            { label: "event.code", value: event.code },
                            { label: "event.which", value: event.which.toString() },
                            { label: "event.location", value: event.location.toString() },
                        ].map((item) => (
                            <div key={item.label} className="bg-zinc-900/50 border border-white/10 rounded-xl p-4 group hover:border-amber-500/30 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-zinc-500 font-mono">{item.label}</span>
                                    <button
                                        onClick={() => copyToClipboard(item.value, item.label)}
                                        className="text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        {copied === item.label ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                    </button>
                                </div>
                                <div className="text-lg font-bold text-white truncate">
                                    {item.value === " " ? "(Space)" : item.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modifiers */}
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { label: "Shift", active: event.shiftKey },
                            { label: "Ctrl", active: event.ctrlKey },
                            { label: "Alt", active: event.altKey },
                            { label: "Meta", active: event.metaKey },
                        ].map((mod) => (
                            <div
                                key={mod.label}
                                className={cn(
                                    "p-4 rounded-xl border text-center transition-colors",
                                    mod.active
                                        ? "bg-amber-500/10 border-amber-500/50 text-amber-400"
                                        : "bg-zinc-900/50 border-white/5 text-zinc-600"
                                )}
                            >
                                <span className="font-bold">{mod.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
