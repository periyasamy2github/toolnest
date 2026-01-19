"use client";

import { useState } from "react";
import { FileJson, RefreshCw, Copy, Check, ArrowRightLeft } from "lucide-react";

export default function CsvToJson() {
    const [csv, setCsv] = useState("");
    const [json, setJson] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const convert = () => {
        setError("");
        if (!csv.trim()) {
            setJson("");
            return;
        }

        try {
            const lines = csv.trim().split(/\r?\n/);
            if (lines.length < 2) throw new Error("CSV must have at least a header and one row");

            const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ''));
            const result = [];

            for (let i = 1; i < lines.length; i++) {
                const obj: Record<string, any> = {};
                // Basic CSV parsing (doesn't handle commas inside quotes perfectly, but good for simple use)
                const currentline = lines[i].split(",");

                for (let j = 0; j < headers.length; j++) {
                    let val = currentline[j]?.trim();
                    if (val) val = val.replace(/^"|"$/g, '');
                    obj[headers[j]] = val;
                }
                result.push(obj);
            }

            setJson(JSON.stringify(result, null, 2));
        } catch (e: any) {
            setError("Invalid CSV format: " + e.message);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(json);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    CSV to <span className="text-green-500">JSON</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert Comma Separated Values to JSON format instantly.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400">CSV Input</label>
                    <textarea
                        value={csv}
                        onChange={(e) => setCsv(e.target.value)}
                        placeholder="name,age,city&#10;John,30,New York&#10;Jane,25,London"
                        className="w-full h-96 bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-green-500/50 outline-none font-mono text-sm resize-none"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400">JSON Output</label>
                        {json && (
                            <button
                                onClick={copyToClipboard}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                    <div className="relative h-96">
                        <textarea
                            readOnly
                            value={json}
                            placeholder="{ ... }"
                            className="w-full h-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-green-400 font-mono text-sm resize-none focus:outline-none"
                        />
                        {error && (
                            <div className="absolute inset-0 bg-zinc-950/90 flex items-center justify-center p-6 text-center">
                                <p className="text-red-400">{error}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={convert}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-green-500/20 flex items-center gap-2 transition-all"
                >
                    <ArrowRightLeft size={20} />
                    Convert CSV to JSON
                </button>
            </div>
        </div>
    );
}
