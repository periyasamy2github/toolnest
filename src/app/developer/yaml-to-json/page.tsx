"use client";

import { useState } from "react";
import { ArrowLeft, FileType, Copy, Check, RefreshCw, Braces } from "lucide-react";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import yaml from "js-yaml";

export default function YamlToJsonPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [copied, setCopied] = useState(false);
    const [mode, setMode] = useState<"yaml-to-json" | "json-to-yaml">("yaml-to-json");
    const [error, setError] = useState<string | null>(null);

    const convert = () => {
        try {
            setError(null);
            if (mode === "yaml-to-json") {
                const obj = yaml.load(input);
                setOutput(JSON.stringify(obj, null, 2));
            } else {
                const obj = JSON.parse(input);
                setOutput(yaml.dump(obj));
            }
        } catch (e) {
            setError(`Error converting ${mode === "yaml-to-json" ? "YAML to JSON" : "JSON to YAML"}. Please check your syntax.`);
            setOutput("");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <BackButton />
                <div>
                    <h1 className="text-4xl font-black text-gradient">YAML ↔ JSON Converter</h1>
                    <p className="text-zinc-400">Seamlessly convert between YAML and JSON formats.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                {mode === "yaml-to-json" ? <FileType size={16} /> : <Braces size={16} />}
                                {mode === "yaml-to-json" ? "YAML Input" : "JSON Input"}
                            </label>
                            <button
                                onClick={() => setMode(mode === "yaml-to-json" ? "json-to-yaml" : "yaml-to-json")}
                                className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/10 rounded hover:bg-white/10 text-zinc-400 transition-all"
                            >
                                Switch Mode
                            </button>
                        </div>
                        <button
                            onClick={convert}
                            className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all flex items-center gap-2"
                        >
                            <RefreshCw size={14} />
                            Convert
                        </button>
                    </div>
                    <div className="glass-card p-4 h-[500px]">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-full bg-transparent border-none focus:outline-none text-zinc-200 font-mono text-sm resize-none placeholder:text-zinc-600"
                            placeholder={mode === "yaml-to-json" ? "name: WebToolNest\nversion: 1.0" : '{ "name": "WebToolNest", "version": 1.0 }'}
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            {mode === "yaml-to-json" ? <Braces size={16} /> : <FileType size={16} />}
                            {mode === "yaml-to-json" ? "JSON Output" : "YAML Output"}
                        </label>
                        <button
                            onClick={copyToClipboard}
                            disabled={!output}
                            className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                            {copied ? "Copied!" : "Copy Result"}
                        </button>
                    </div>
                    <div className="glass-card p-4 h-[500px] overflow-auto">
                        <pre className="text-sm font-mono text-blue-400 whitespace-pre-wrap">
                            {output || <span className="text-zinc-600">// Converted output will appear here...</span>}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
