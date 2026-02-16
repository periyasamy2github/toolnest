"use client";

import { useState } from "react";
import { FileCode2, RefreshCw, Copy, Check, ArrowRightLeft } from "lucide-react";
import yaml from "js-yaml";
import BackButton from "@/components/BackButton";

export default function YamlToXml() {
    const [yml, setYml] = useState("");
    const [xml, setXml] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const toXml = (obj: any, rootName: string = "root"): string => {
        let xml = "";
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (Array.isArray(obj[prop])) {
                    for (const val of obj[prop]) {
                        xml += `<${prop}>`;
                        xml += typeof val === "object" ? toXml(val) : val;
                        xml += `</${prop}>`;
                    }
                } else if (typeof obj[prop] === "object") {
                    xml += `<${prop}>`;
                    xml += toXml(obj[prop]);
                    xml += `</${prop}>`;
                } else {
                    xml += `<${prop}>${obj[prop]}</${prop}>`;
                }
            }
        }
        return xml;
    };

    const convert = () => {
        setError("");
        if (!yml.trim()) {
            setXml("");
            return;
        }

        try {
            const obj = yaml.load(yml);
            const xmlResult = `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${toXml(obj)}\n</root>`;
            setXml(xmlResult);
        } catch (e: any) {
            setError("Invalid YAML format: " + e.message);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(xml);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    YAML to <span className="text-purple-500">XML</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert YAML data to XML format instantly.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400">YAML Input</label>
                    <textarea
                        value={yml}
                        onChange={(e) => setYml(e.target.value)}
                        placeholder="name: John&#10;age: 30"
                        className="w-full h-96 bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-purple-500/50 outline-none font-mono text-sm resize-none"
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
                            className="w-full h-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-purple-400 font-mono text-sm resize-none focus:outline-none"
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
                    className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-all"
                >
                    <ArrowRightLeft size={20} />
                    Convert YAML to XML
                </button>
            </div>
        </div>
    );
}
