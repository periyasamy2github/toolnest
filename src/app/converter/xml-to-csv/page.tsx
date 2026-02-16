"use client";

import { useState } from "react";
import { FileSpreadsheet, RefreshCw, Copy, Check, ArrowRightLeft } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function XmlToCsv() {
    const [xml, setXml] = useState("");
    const [csv, setCsv] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const convert = () => {
        setError("");
        if (!xml.trim()) {
            setCsv("");
            return;
        }

        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, "text/xml");

            if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                throw new Error("Invalid XML");
            }

            // Assume simple structure: <root><row><col1>val</col1>...</row>...</root>
            const rows = xmlDoc.documentElement.children;
            if (rows.length === 0) throw new Error("No rows found in XML");

            const headers = new Set<string>();
            const data: any[] = [];

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const rowData: any = {};
                for (let j = 0; j < row.children.length; j++) {
                    const col = row.children[j];
                    headers.add(col.nodeName);
                    rowData[col.nodeName] = col.textContent;
                }
                data.push(rowData);
            }

            const headerArray = Array.from(headers);
            let csvResult = headerArray.join(",") + "\n";

            data.forEach(row => {
                const line = headerArray.map(header => {
                    const val = row[header] || "";
                    return `"${val.replace(/"/g, '""')}"`;
                }).join(",");
                csvResult += line + "\n";
            });

            setCsv(csvResult);
        } catch (e: any) {
            setError("Invalid XML format: " + e.message);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(csv);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    XML to <span className="text-emerald-500">CSV</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert XML data to CSV format instantly.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400">XML Input</label>
                    <textarea
                        value={xml}
                        onChange={(e) => setXml(e.target.value)}
                        placeholder="<root><row><name>John</name><age>30</age></row></root>"
                        className="w-full h-96 bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none font-mono text-sm resize-none"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400">CSV Output</label>
                        {csv && (
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
                            value={csv}
                            placeholder="name,age..."
                            className="w-full h-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-emerald-400 font-mono text-sm resize-none focus:outline-none"
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
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
                >
                    <ArrowRightLeft size={20} />
                    Convert XML to CSV
                </button>
            </div>
        </div>
    );
}
