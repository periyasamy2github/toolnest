"use client";

import { useState } from "react";
import { ArrowLeft, Copy, Check, RefreshCw } from "lucide-react";
import Link from "next/link";

const LOREM_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.

Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Fusce convallis.`;

export default function LoremIpsumPage() {
    const [paragraphs, setParagraphs] = useState(3);
    const [generated, setGenerated] = useState("");
    const [copied, setCopied] = useState(false);

    const generate = () => {
        const sourceParagraphs = LOREM_TEXT.split('\n\n');
        let result = [];
        for (let i = 0; i < paragraphs; i++) {
            result.push(sourceParagraphs[i % sourceParagraphs.length]);
        }
        setGenerated(result.join('\n\n'));
        setCopied(false);
    };

    const copyToClipboard = () => {
        if (!generated) return;
        navigator.clipboard.writeText(generated);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Initial generation
    useState(() => {
        generate();
    });

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/text" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Lorem Ipsum Generator</h1>
                    <p className="text-zinc-400">Generate placeholder text for your designs.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Paragraphs: {paragraphs}</label>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={paragraphs}
                                onChange={(e) => setParagraphs(parseInt(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <button
                            onClick={generate}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={20} />
                            Generate
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="glass-card p-6 h-full relative min-h-[400px]">
                        <div className="whitespace-pre-wrap text-zinc-300 leading-relaxed pr-4 h-[500px] overflow-y-auto custom-scrollbar">
                            {generated}
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors border border-white/10 shadow-lg"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
