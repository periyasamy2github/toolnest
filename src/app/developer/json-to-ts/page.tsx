"use client";

import { useState } from "react";
import { ArrowLeft, Braces, Copy, Check, RefreshCw, Code } from "lucide-react";
import BackButton from "@/components/BackButton";
import Link from "next/link";

export default function JsonToTsPage() {
    const [json, setJson] = useState("");
    const [ts, setTs] = useState("");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const convertJsonToTs = () => {
        try {
            setError(null);
            const parsed = JSON.parse(json);
            const result = generateInterface(parsed, "RootObject");
            setTs(result);
        } catch (e) {
            setError("Invalid JSON input. Please check your syntax.");
            setTs("");
        }
    };

    const generateInterface = (obj: any, name: string): string => {
        let result = `interface ${name} {\n`;
        const nestedInterfaces: string[] = [];

        for (const key in obj) {
            const value = obj[key];
            const type = typeof value;

            if (value === null) {
                result += `  ${key}: any;\n`;
            } else if (Array.isArray(value)) {
                if (value.length > 0 && typeof value[0] === "object") {
                    const subName = capitalize(key);
                    result += `  ${key}: ${subName}[];\n`;
                    nestedInterfaces.push(generateInterface(value[0], subName));
                } else {
                    result += `  ${key}: ${typeof value[0] || "any"}[];\n`;
                }
            } else if (type === "object") {
                const subName = capitalize(key);
                result += `  ${key}: ${subName};\n`;
                nestedInterfaces.push(generateInterface(value, subName));
            } else {
                result += `  ${key}: ${type};\n`;
            }
        }

        result += "}\n";
        return nestedInterfaces.join("\n") + "\n" + result;
    };

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(ts);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <BackButton />
                <div>
                    <h1 className="text-4xl font-black text-gradient">JSON to TypeScript</h1>
                    <p className="text-zinc-400">Convert JSON objects into TypeScript interfaces instantly.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <Braces size={16} />
                            JSON Input
                        </label>
                        <button
                            onClick={convertJsonToTs}
                            className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all flex items-center gap-2"
                        >
                            <RefreshCw size={14} />
                            Convert
                        </button>
                    </div>
                    <div className="glass-card p-4 h-[500px]">
                        <textarea
                            value={json}
                            onChange={(e) => setJson(e.target.value)}
                            className="w-full h-full bg-transparent border-none focus:outline-none text-zinc-200 font-mono text-sm resize-none placeholder:text-zinc-600"
                            placeholder='{ "name": "WebToolNest", "version": 1.0 }'
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <Code size={16} />
                            TypeScript Interface
                        </label>
                        <button
                            onClick={copyToClipboard}
                            disabled={!ts}
                            className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                            {copied ? "Copied!" : "Copy TS"}
                        </button>
                    </div>
                    <div className="glass-card p-4 h-[500px] overflow-auto">
                        <pre className="text-sm font-mono text-blue-400 whitespace-pre-wrap">
                            {ts || <span className="text-zinc-600">// TypeScript interface will appear here...</span>}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
