"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
    Code2,
    Copy,
    Check,
    RefreshCw,
    Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function MetaTagGenerator() {
    const [values, setValues] = useState({
        title: "",
        description: "",
        keywords: "",
        author: "",
        viewport: "width=device-width, initial-scale=1.0",
        robots: "index, follow",
        charset: "UTF-8",
        themeColor: "#000000"
    });
    const [code, setCode] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        generateCode();
    }, [values]);

    const generateCode = () => {
        const tags = [
            `<!-- Primary Meta Tags -->`,
            `<meta charset="${values.charset}">`,
            `<meta name="viewport" content="${values.viewport}">`,
            `<title>${values.title}</title>`,
            `<meta name="title" content="${values.title}">`,
            `<meta name="description" content="${values.description}">`,
            values.keywords && `<meta name="keywords" content="${values.keywords}">`,
            values.author && `<meta name="author" content="${values.author}">`,
            `<meta name="robots" content="${values.robots}">`,
            values.themeColor && `<meta name="theme-color" content="${values.themeColor}">`,
        ].filter(Boolean);

        setCode(tags.join("\n"));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Meta Tag <span className="text-pink-500">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Generate SEO-friendly meta tags for your website.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-zinc-400">Page Title</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={values.title}
                                    onChange={(e) => setValues({ ...values, title: e.target.value })}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white placeholder-zinc-600 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none"
                                    placeholder="e.g., My Awesome Website"
                                    maxLength={60}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                                    {values.title.length}/60
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-zinc-400">Description</label>
                            <div className="relative">
                                <textarea
                                    value={values.description}
                                    onChange={(e) => setValues({ ...values, description: e.target.value })}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white placeholder-zinc-600 focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 outline-none resize-none h-32"
                                    placeholder="Brief description of your page content..."
                                    maxLength={160}
                                />
                                <div className="absolute right-4 bottom-4 text-xs text-zinc-500">
                                    {values.description.length}/160
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Keywords</label>
                                <input
                                    type="text"
                                    value={values.keywords}
                                    onChange={(e) => setValues({ ...values, keywords: e.target.value })}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none text-sm"
                                    placeholder="seo, meta, tags"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Author</label>
                                <input
                                    type="text"
                                    value={values.author}
                                    onChange={(e) => setValues({ ...values, author: e.target.value })}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Robots</label>
                                <select
                                    value={values.robots}
                                    onChange={(e) => setValues({ ...values, robots: e.target.value })}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none text-sm"
                                >
                                    <option value="index, follow">Index, Follow</option>
                                    <option value="noindex, follow">No Index, Follow</option>
                                    <option value="index, nofollow">Index, No Follow</option>
                                    <option value="noindex, nofollow">No Index, No Follow</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Theme Color</label>
                                <div className="flex gap-2">
                                    <input
                                        type="color"
                                        value={values.themeColor}
                                        onChange={(e) => setValues({ ...values, themeColor: e.target.value })}
                                        className="h-11 w-12 rounded-xl bg-zinc-950 border border-white/10 p-1 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={values.themeColor}
                                        onChange={(e) => setValues({ ...values, themeColor: e.target.value })}
                                        className="flex-1 bg-zinc-950 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-pink-500/50 outline-none text-sm font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Code2 size={20} className="text-pink-400" />
                                <span className="font-medium text-white">Generated HTML</span>
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="p-2 text-zinc-400 hover:text-white transition-colors"
                            >
                                {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                            </button>
                        </div>

                        <div className="flex-1 bg-zinc-950 border border-white/10 rounded-xl p-4 relative overflow-hidden group">
                            <textarea
                                readOnly
                                value={code}
                                className="w-full h-full bg-transparent border-none resize-none text-zinc-300 font-mono text-sm focus:ring-0 p-0 leading-relaxed"
                            />
                        </div>

                        {/* Preview Snippet */}
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <h3 className="text-sm font-medium text-zinc-400 mb-4 flex items-center gap-2">
                                <Search size={16} />
                                Google Search Preview
                            </h3>
                            <div className="bg-white rounded-xl p-4 max-w-xl">
                                <div className="text-sm text-[#202124] mb-1 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-200" />
                                    <span>example.com</span>
                                </div>
                                <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer mb-1 truncate">
                                    {values.title || "Page Title"}
                                </div>
                                <div className="text-sm text-[#4d5156] line-clamp-2">
                                    {values.description || "This is how your page description will appear in search engine results. Make sure it's compelling and relevant to your content."}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
