"use client";

import { useState } from "react";
import { FileJson, RefreshCw, Copy, Check, ArrowRightLeft } from "lucide-react";

export default function XmlToJson() {
    const [xml, setXml] = useState("");
    const [json, setJson] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const parseXml = (xmlStr: string) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlStr, "text/xml");

        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
            throw new Error("Invalid XML");
        }

        return xmlToJson(xmlDoc);
    };

    const xmlToJson = (xml: any): any => {
        let obj: any = {};

        if (xml.nodeType === 1) { // element
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (let j = 0; j < xml.attributes.length; j++) {
                    const attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType === 3) { // text
            obj = xml.nodeValue;
        }

        if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                const item = xml.childNodes.item(i);
                const nodeName = item.nodeName;

                if (typeof obj[nodeName] === "undefined") {
                    const val = xmlToJson(item);
                    if (nodeName === "#text") {
                        if (val.trim()) return val; // Return text content directly if it's just text
                    } else {
                        obj[nodeName] = val;
                    }
                } else {
                    if (typeof obj[nodeName].push === "undefined") {
                        const old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    };

    const convert = () => {
        setError("");
        if (!xml.trim()) {
            setJson("");
            return;
        }

        try {
            const result = parseXml(xml);
            setJson(JSON.stringify(result, null, 2));
        } catch (e: any) {
            setError("Invalid XML format: " + e.message);
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
                    XML to <span className="text-blue-500">JSON</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert XML data to JSON format instantly.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400">XML Input</label>
                    <textarea
                        value={xml}
                        onChange={(e) => setXml(e.target.value)}
                        placeholder="<root><name>John</name><age>30</age></root>"
                        className="w-full h-96 bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500/50 outline-none font-mono text-sm resize-none"
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
                            className="w-full h-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-blue-400 font-mono text-sm resize-none focus:outline-none"
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
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all"
                >
                    <ArrowRightLeft size={20} />
                    Convert XML to JSON
                </button>
            </div>
        </div>
    );
}
