"use client";

import { useState } from "react";
import { ArrowLeft, Code2, Copy, Check, RefreshCw, Code } from "lucide-react";
import Link from "next/link";

export default function HtmlToJsxPage() {
    const [html, setHtml] = useState("");
    const [jsx, setJsx] = useState("");
    const [copied, setCopied] = useState(false);

    const convertHtmlToJsx = () => {
        let result = html;

        // Basic replacements for HTML to JSX
        result = result.replace(/class=/g, "className=");
        result = result.replace(/for=/g, "htmlFor=");
        result = result.replace(/tabindex=/g, "tabIndex=");
        result = result.replace(/onclick=/g, "onClick=");
        result = result.replace(/onchange=/g, "onChange=");
        result = result.replace(/autoplay/g, "autoPlay");
        result = result.replace(/srcset=/g, "srcSet=");
        result = result.replace(/crossorigin=/g, "crossOrigin=");

        // Self-closing tags
        const selfClosingTags = ["img", "input", "br", "hr", "meta", "link"];
        selfClosingTags.forEach(tag => {
            const regex = new RegExp(`<${tag}([^>]*[^/])>`, "g");
            result = result.replace(regex, `<${tag}$1 />`);
        });

        // Style attribute conversion (basic)
        result = result.replace(/style="([^"]*)"/g, (match, p1) => {
            const styles = p1.split(";").filter(Boolean).map((s: string) => {
                const [prop, val] = s.split(":").map(x => x.trim());
                const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                return `${camelProp}: "${val}"`;
            }).join(", ");
            return `style={{ ${styles} }}`;
        });

        setJsx(result);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(jsx);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/developer" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">HTML to JSX</h1>
                    <p className="text-zinc-400">Convert standard HTML snippets into React-friendly JSX code.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <Code size={16} />
                            HTML Input
                        </label>
                        <button
                            onClick={convertHtmlToJsx}
                            className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all flex items-center gap-2"
                        >
                            <RefreshCw size={14} />
                            Convert
                        </button>
                    </div>
                    <div className="glass-card p-4 h-[500px]">
                        <textarea
                            value={html}
                            onChange={(e) => setHtml(e.target.value)}
                            className="w-full h-full bg-transparent border-none focus:outline-none text-zinc-200 font-mono text-sm resize-none placeholder:text-zinc-600"
                            placeholder='<div class="container" style="color: red">Hello</div>'
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <Code2 size={16} />
                            JSX Output
                        </label>
                        <button
                            onClick={copyToClipboard}
                            disabled={!jsx}
                            className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                            {copied ? "Copied!" : "Copy JSX"}
                        </button>
                    </div>
                    <div className="glass-card p-4 h-[500px] overflow-auto">
                        <pre className="text-sm font-mono text-purple-400 whitespace-pre-wrap">
                            {jsx || <span className="text-zinc-600">// JSX code will appear here...</span>}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
