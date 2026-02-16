"use client";

import { useState } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    FileJson,
    FileCode2,
    ArrowRightLeft,
    Copy,
    Download,
    Trash2,
    AlertCircle,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function JsonXmlPage() {
    const [mode, setMode] = useState<"json-to-xml" | "xml-to-json">("json-to-xml");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [notification, setNotification] = useState("");

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(""), 3000);
    };

    // --- XML Helpers ---
    const jsonToXml = (obj: any): string => {
        let xml = "";
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (Array.isArray(obj[prop])) {
                    for (const item of obj[prop]) {
                        xml += `<${prop}>`;
                        xml += typeof item === "object" ? jsonToXml(item) : item;
                        xml += `</${prop}>`;
                    }
                } else if (typeof obj[prop] === "object" && obj[prop] !== null) {
                    xml += `<${prop}>`;
                    xml += jsonToXml(obj[prop]);
                    xml += `</${prop}>`;
                } else {
                    xml += `<${prop}>${obj[prop]}</${prop}>`;
                }
            }
        }
        return xml;
    };

    const xmlToJson = (xml: Node): any => {
        // Create the return object
        let obj: any = {};

        if (xml.nodeType === 1) { // element
            const element = xml as Element;
            // do attributes
            if (element.attributes && element.attributes.length > 0) {
                obj["@attributes"] = {};
                for (let j = 0; j < element.attributes.length; j++) {
                    const attribute = element.attributes.item(j);
                    if (attribute) {
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            }
        } else if (xml.nodeType === 3) { // text
            obj = xml.nodeValue?.trim();
        }

        // do children
        if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                const item = xml.childNodes.item(i);
                const nodeName = item.nodeName;

                if (nodeName === "#text") {
                    const text = item.nodeValue?.trim();
                    if (text) return text; // If it's just text content
                    continue;
                }

                if (typeof (obj[nodeName]) === "undefined") {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof (obj[nodeName].push) === "undefined") {
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
        setOutput("");

        if (!input.trim()) {
            setError("Please enter some data to convert.");
            return;
        }

        try {
            if (mode === "json-to-xml") {
                const jsonObj = JSON.parse(input);
                const xmlBody = jsonToXml(jsonObj);
                // Wrap in a root element if it's not a single root object (simplified)
                setOutput(`<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${formatXml(xmlBody)}\n</root>`);
            } else {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(input, "text/xml");
                const parseError = xmlDoc.getElementsByTagName("parsererror");
                if (parseError.length > 0) {
                    throw new Error("Invalid XML");
                }
                const jsonResult = xmlToJson(xmlDoc.documentElement);
                // Wrap in root key based on root element name
                const rootName = xmlDoc.documentElement.nodeName;
                const finalObj = { [rootName]: jsonResult };
                setOutput(JSON.stringify(finalObj, null, 2));
            }
        } catch (err: any) {
            setError(mode === "json-to-xml" ? "Invalid JSON format." : "Invalid XML format.");
        }
    };

    // Simple XML formatter for display
    const formatXml = (xml: string) => {
        let formatted = '';
        let reg = /(>)(<)(\/*)/g;
        xml = xml.replace(reg, '$1\r\n$2$3');
        let pad = 0;
        xml.split('\r\n').forEach((node) => {
            let indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indent = 0;
            } else if (node.match(/^<\/\w/)) {
                if (pad !== 0) {
                    pad -= 1;
                }
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                indent = 1;
            } else {
                indent = 0;
            }

            let padding = '';
            for (let i = 0; i < pad; i++) {
                padding += '  ';
            }

            formatted += padding + node + '\r\n';
            pad += indent;
        });
        return formatted.trim();
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
        a.download = mode === "json-to-xml" ? "converted.xml" : "converted.json";
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
                    <BackButton />
                    <div>
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">JSON &lt;&gt; XML Converter</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Seamless API data transformation.</m.p>
                    </div>
                </div>

                <m.div variants={fadeInUp} className="flex bg-zinc-900/50 p-1 rounded-xl border border-white/10">
                    <button
                        onClick={() => { setMode("json-to-xml"); setInput(""); setOutput(""); setError(""); }}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            mode === "json-to-xml" ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-zinc-400 hover:text-white"
                        )}
                    >
                        JSON to XML
                    </button>
                    <button
                        onClick={() => { setMode("xml-to-json"); setInput(""); setOutput(""); setError(""); }}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                            mode === "xml-to-json" ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-zinc-400 hover:text-white"
                        )}
                    >
                        XML to JSON
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
                            {mode === "json-to-xml" ? <FileJson size={16} /> : <FileCode2 size={16} />}
                            <span>Input {mode === "json-to-xml" ? "JSON" : "XML"}</span>
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
                            placeholder={mode === "json-to-xml" ? '{\n  "note": {\n    "to": "Tove",\n    "from": "Jani",\n    "body": "Don\'t forget me this weekend!"\n  }\n}' : '<note>\n  <to>Tove</to>\n  <from>Jani</from>\n  <body>Don\'t forget me this weekend!</body>\n</note>'}
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
                            {mode === "json-to-xml" ? <FileCode2 size={16} /> : <FileJson size={16} />}
                            <span>Output {mode === "json-to-xml" ? "XML" : "JSON"}</span>
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
                                className="w-full h-full bg-transparent border-none resize-none p-4 font-mono text-sm focus:ring-0 text-orange-400"
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
                    className="group relative px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-black text-lg rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-xl shadow-orange-500/20"
                >
                    <ArrowRightLeft className="group-hover:rotate-180 transition-transform duration-500" />
                    Convert Data
                </button>
            </m.div>

            {/* Notification Toast */}
            {notification && (
                <m.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-zinc-900 border border-orange-500/50 rounded-full shadow-2xl flex items-center gap-3 z-50"
                >
                    <CheckCircle2 size={18} className="text-orange-500" />
                    <span className="text-white font-medium">{notification}</span>
                </m.div>
            )}
        </div>
    );
}
