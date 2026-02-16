"use client";

import { useState } from "react";
import { FileCode2, RefreshCw, Copy, Check, ArrowRightLeft } from "lucide-react";
import yaml from "js-yaml";
import BackButton from "@/components/BackButton";

export default function XmlToYaml() {
    const [xml, setXml] = useState("");
    const [yml, setYml] = useState("");
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const xmlToJson = (xml: any): any => {
        let obj: any = {};

        if (xml.nodeType === 1) { // element
            // attributes
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
                        if (val.trim()) return val;
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
            setYml("");
            return;
        }

        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, "text/xml");

            if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                throw new Error("Invalid XML");
            }

            const json = xmlToJson(xmlDoc);
            const yamlStr = yaml.dump(json);
            setYml(yamlStr);
        } catch (e: any) {
            setError("Invalid XML format: " + e.message);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(yml);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    XML to <span className="text-pink-500">YAML</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert XML data to YAML format instantly.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400">XML Input</label>
                    <textarea
                        value={xml}
                        onChange={(e) => setXml(e.target.value)}
                        placeholder="<root><name>John</name><age>30</age></root>"
                        className="w-full h-96 bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-pink-500/50 outline-none font-mono text-sm resize-none"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400">YAML Output</label>
                        {yml && (
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
                            value={yml}
                            placeholder="name: John..."
                            className="w-full h-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-pink-400 font-mono text-sm resize-none focus:outline-none"
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
                    className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-pink-500/20 flex items-center gap-2 transition-all"
                >
                    <ArrowRightLeft size={20} />
                    Convert XML to YAML
                </button>
            </div>
        </div>
    );
}
