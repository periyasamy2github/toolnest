"use client";

import { useState } from "react";
import { ArrowLeft, Copy, Check } from "lucide-react";
import Link from "next/link";

export default function CaseConverterPage() {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    const convert = (type: string) => {
        let newText = "";
        switch (type) {
            case "upper":
                newText = text.toUpperCase();
                break;
            case "lower":
                newText = text.toLowerCase();
                break;
            case "title":
                newText = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                break;
            case "sentence":
                newText = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
                break;
            case "alternating":
                newText = text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
                break;
            case "inverse":
                newText = text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
                break;
        }
        setText(newText);
    };

    const copyToClipboard = () => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/text" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Case Converter</h1>
                    <p className="text-zinc-400">Convert text between different letter cases.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6 h-full relative">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-[400px] bg-transparent border-none focus:outline-none text-zinc-200 resize-none placeholder:text-zinc-600"
                            placeholder="Type or paste your text here..."
                        />
                        <button
                            onClick={copyToClipboard}
                            className="absolute bottom-4 right-4 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border border-white/10"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <button onClick={() => convert("upper")} className="w-full p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-800 hover:border-white/10 transition-all text-left">
                        <div className="font-medium text-zinc-200">UPPERCASE</div>
                        <div className="text-xs text-zinc-500 mt-1">CONVERT TO UPPERCASE</div>
                    </button>
                    <button onClick={() => convert("lower")} className="w-full p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-800 hover:border-white/10 transition-all text-left">
                        <div className="font-medium text-zinc-200">lowercase</div>
                        <div className="text-xs text-zinc-500 mt-1">convert to lowercase</div>
                    </button>
                    <button onClick={() => convert("title")} className="w-full p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-800 hover:border-white/10 transition-all text-left">
                        <div className="font-medium text-zinc-200">Title Case</div>
                        <div className="text-xs text-zinc-500 mt-1">Convert To Title Case</div>
                    </button>
                    <button onClick={() => convert("sentence")} className="w-full p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-800 hover:border-white/10 transition-all text-left">
                        <div className="font-medium text-zinc-200">Sentence case</div>
                        <div className="text-xs text-zinc-500 mt-1">Convert to sentence case.</div>
                    </button>
                    <button onClick={() => convert("alternating")} className="w-full p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-800 hover:border-white/10 transition-all text-left">
                        <div className="font-medium text-zinc-200">aLtErNaTiNg cAsE</div>
                        <div className="text-xs text-zinc-500 mt-1">cOnVeRt tO aLtErNaTiNg cAsE</div>
                    </button>
                </div>
            </div>
        </div>
    );
}
