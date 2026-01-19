"use client";

import { useState } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    FileJson,
    Database,
    ArrowRightLeft,
    Copy,
    Download,
    Trash2,
    AlertCircle,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";
import yaml from "js-yaml";

export default function YamlJsonPage() {
    const [mode, setMode] = useState<"yaml-to-json" | "json-to-yaml">("yaml-to-json");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [notification, setNotification] = useState("");

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(""), 3000);
    };

    const convert = () => {
        setError("");
        setOutput("");

        if (!input.trim()) {
            setError("Please enter some data to convert.");
            return;
        }

        try {
            if (mode === "yaml-to-json") {
                const jsonObj = yaml.load(input);
                setOutput(JSON.stringify(jsonObj, null, 2));
            } else {
                const jsonObj = JSON.parse(input);
                const yamlStr = yaml.dump(jsonObj);
                setOutput(yamlStr);
            }
        } catch (err: any) {
            setError(err.message || "Invalid format.");
        }
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        showNotification("Copied to clipboard!");
    };

    const downloadFile = () => {
        if (!output) return;
        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = mode === "yaml-to-json" ? "converted.json" : "converted.yaml";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification("Download started!");
    };

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
                    <Link href="/converters" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                        <ArrowLeft className="text-zinc-100" />
                    </Link>
                    <div>
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">YAML &lt;&gt; JSON Converter</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">DevOps configuration made easy.</m.p>
                    </div>
                </div>

                <m.div variants={fadeInUp} className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/10">
                    <button
                        onClick={() => { setMode("yaml-to-json"); setInput(""); setOutput(""); setError(""); }}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            mode === "yaml-to-json" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20" : "text-zinc-400 hover:text-white"
                        )}
                    >
                        YAML to JSON
                    </button>
                    <button
                        onClick={() => { setMode("json-to-yaml"); setInput(""); setOutput(""); setError(""); }}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            mode === "json-to-yaml" ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20" : "text-zinc-400 hover:text-white"
                        )}
                    >
                        JSON to YAML
                    </button>
                </m.div>
            </m.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
                {/* Input Panel */}
                <m.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card flex flex-col h-full"
                >
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <div className="flex items-center gap-2 text-zinc-400 font-bold text-sm">
                            {mode === "yaml-to-json" ? <Database size={16} /> : <FileJson size={16} />}
                            <span>Input {mode === "yaml-to-json" ? "YAML" : "JSON"}</span>
                        </div>
                        <button
                            onClick={() => { setInput(""); setOutput(""); setError(""); }}
                            className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors text-zinc-500"
                            title="Clear"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                    <div className="flex-grow relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={mode === "yaml-to-json" ? 'name: John\nage: 30' : '{\n  "name": "John",\n  "age": 30\n}'}
                            className="w-full h-full bg-transparent border-none resize-none p-4 font-mono text-sm focus:ring-0 text-zinc-300 placeholder:text-zinc-700"
                            spellCheck={false}
                        />
                    </div>
                </m.div>

                {/* Output Panel */}
                <m.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card flex flex-col h-full relative"
                >
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                        <div className="flex items-center gap-2 text-zinc-400 font-bold text-sm">
                            {mode === "yaml-to-json" ? <FileJson size={16} /> : <Database size={16} />}
                            <span>Output {mode === "yaml-to-json" ? "JSON" : "YAML"}</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={copyToClipboard}
                                disabled={!output}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 disabled:opacity-50"
                                title="Copy"
                            >
                                <Copy size={16} />
                            </button>
                            <button
                                onClick={downloadFile}
                                disabled={!output}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 disabled:opacity-50"
                                title="Download"
                            >
                                <Download size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="flex-grow relative bg-zinc-950/30">
                        {error ? (
                            <div className="absolute inset-0 flex items-center justify-center text-red-400 gap-2 font-medium">
                                <AlertCircle size={20} />
                                {error}
                            </div>
                        ) : (
                            <textarea
                                readOnly
                                value={output}
                                className="w-full h-full bg-transparent border-none resize-none p-4 font-mono text-sm focus:ring-0 text-purple-400"
                            />
                        )}
                    </div>
                </m.div>
            </div>

            {/* Action Button */}
            <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
            >
                <button
                    onClick={convert}
                    className="group relative px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white font-black text-lg rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-xl shadow-purple-500/20"
                >
                    <ArrowRightLeft className="group-hover:rotate-180 transition-transform duration-500" />
                    Convert Config
                </button>
            </m.div>

            {/* Notification Toast */}
            {notification && (
                <m.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-zinc-900 border border-purple-500/50 rounded-full shadow-2xl flex items-center gap-3 z-50"
                >
                    <CheckCircle2 size={18} className="text-purple-500" />
                    <span className="text-white font-medium">{notification}</span>
                </m.div>
            )}
        </div>
    );
}
