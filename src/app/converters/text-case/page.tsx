"use client";

import { useState } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Type,
    Copy,
    Trash2,
    CheckCircle2,
    CaseSensitive
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function TextCasePage() {
    const [input, setInput] = useState("");
    const [notification, setNotification] = useState("");

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(""), 3000);
    };

    const copyToClipboard = (text: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        showNotification("Copied!");
    };

    // Conversion functions
    const toUpperCase = (str: string) => str.toUpperCase();
    const toLowerCase = (str: string) => str.toLowerCase();
    const toTitleCase = (str: string) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    const toSentenceCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const toCamelCase = (str: string) => str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');
    const toPascalCase = (str: string) => str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, '');
    const toSnakeCase = (str: string) => str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || str;
    const toKebabCase = (str: string) => str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || str;
    const toAlternatingCase = (str: string) => str.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');

    const converters = [
        { name: "UPPERCASE", fn: toUpperCase },
        { name: "lowercase", fn: toLowerCase },
        { name: "Title Case", fn: toTitleCase },
        { name: "Sentence case", fn: toSentenceCase },
        { name: "camelCase", fn: toCamelCase },
        { name: "PascalCase", fn: toPascalCase },
        { name: "snake_case", fn: toSnakeCase },
        { name: "kebab-case", fn: toKebabCase },
        { name: "aLtErNaTiNg cAsE", fn: toAlternatingCase },
    ];

    return (
        <div className="min-h-screen pb-24 space-y-12">
            {/* Header */}
            <m.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div className="flex items-center gap-6">
                    <BackButton />
                    <div>
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Text Case Converter</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Transform text style instantly.</m.p>
                    </div>
                </div>

                <m.div variants={fadeInUp}>
                    <button
                        onClick={() => setInput("")}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors font-bold"
                    >
                        <Trash2 size={18} />
                        Clear Text
                    </button>
                </m.div>
            </m.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Input Panel */}
                <m.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-1 glass-card flex flex-col h-[600px]"
                >
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <div className="flex items-center gap-2 text-zinc-400 font-bold text-sm">
                            <Type size={16} />
                            <span>Input Text</span>
                        </div>
                    </div>
                    <div className="flex-grow relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type or paste your text here..."
                            className="w-full h-full bg-transparent border-none resize-none p-4 font-mono text-sm focus:ring-0 text-zinc-300 placeholder:text-zinc-700"
                            spellCheck={false}
                        />
                    </div>
                </m.div>

                {/* Output Panel */}
                <m.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 h-fit"
                >
                    {converters.map((converter, index) => (
                        <m.div
                            key={converter.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-card p-4 group hover:bg-white/5 transition-colors"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{converter.name}</span>
                                <button
                                    onClick={() => copyToClipboard(converter.fn(input))}
                                    className="p-2 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                                    title="Copy"
                                >
                                    <Copy size={14} />
                                </button>
                            </div>
                            <div className="font-mono text-sm text-zinc-300 break-all min-h-[1.5em]">
                                {input ? converter.fn(input) : <span className="text-zinc-700 italic">Result will appear here...</span>}
                            </div>
                        </m.div>
                    ))}
                </m.div>
            </div>

            {/* Notification Toast */}
            {notification && (
                <m.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-zinc-900 border border-blue-500/50 rounded-full shadow-2xl flex items-center gap-3 z-50"
                >
                    <CheckCircle2 size={18} className="text-blue-500" />
                    <span className="text-white font-medium">{notification}</span>
                </m.div>
            )}
        </div>
    );
}
