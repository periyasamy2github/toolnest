"use client";

import { useState } from "react";
import { FileCode2, RefreshCw, Copy, Check, ArrowRightLeft } from "lucide-react";

export default function CsvToXml() {
    const [csv, setCsv] = useState("");
    const [xml, setXml] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const convert = () => {
        setError("");
        if (!csv.trim()) {
            setXml("");
            return;
        }

        try {
            const lines = csv.trim().split(/\r?\n/);
            if (lines.length < 2) throw new Error("CSV must have at least a header and one row");

            const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, '').replace(/[^a-zA-Z0-9_-]/g, '_'));
            let xmlResult = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';

            for (let i = 1; i < lines.length; i++) {
                xmlResult += '  <row>\n';
                const currentline = lines[i].split(",");

                for (let j = 0; j < headers.length; j++) {
                    let val = currentline[j]?.trim();
                    if (val) val = val.replace(/^"|"$/g, '');
                    xmlResult += `    <${headers[j]}>${val || ''}</${headers[j]}>\n`;
                }
                xmlResult += '  </row>\n';
            }
            xmlResult += '</root>';

            setXml(xmlResult);
        } catch (e: any) {
            setError("Invalid CSV format: " + e.message);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(xml);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    CSV to <span className="text-orange-500">XML</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert Comma Separated Values to XML format instantly.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400">CSV Input</label>
                    <textarea
                        value={csv}
                        onChange={(e) => setCsv(e.target.value)}
                        placeholder="name,age,city&#10;John,30,New York&#10;Jane,25,London"
                        className="w-full h-96 bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500/50 outline-none font-mono text-sm resize-none"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400">XML Output</label>
                        {xml && (
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
                            value={xml}
                            placeholder="<root>...</root>"
                            className="w-full h-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-orange-400 font-mono text-sm resize-none focus:outline-none"
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
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/20 flex items-center gap-2 transition-all"
                >
                    <ArrowRightLeft size={20} />
                    Convert CSV to XML
                </button>
            </div>
        </div>
    );
}
