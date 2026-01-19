"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { BookOpen, Copy, Check, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type CitationStyle = "APA" | "MLA" | "Chicago";
type SourceType = "Website" | "Book" | "Journal";

export default function CitationGenerator() {
    const [style, setStyle] = useState<CitationStyle>("APA");
    const [source, setSource] = useState<SourceType>("Website");
    const [citation, setCitation] = useState("");
    const [copied, setCopied] = useState(false);

    // Form Fields
    const [fields, setFields] = useState({
        authorFirst: "",
        authorLast: "",
        title: "",
        containerTitle: "", // Website name, Book title, Journal name
        publisher: "",
        year: "",
        url: "",
        accessDate: new Date().toISOString().split("T")[0]
    });

    const generate = () => {
        const { authorLast, authorFirst, title, containerTitle, publisher, year, url, accessDate } = fields;
        let result = "";

        const author = authorLast && authorFirst ? `${authorLast}, ${authorFirst[0]}.` : authorLast || containerTitle;
        const authorMLA = authorLast && authorFirst ? `${authorLast}, ${authorFirst}.` : authorLast || containerTitle;

        if (style === "APA") {
            // APA 7th Edition
            if (source === "Website") {
                result = `${author} (${year || "n.d."}). ${title}. ${containerTitle}. ${url}`;
            } else if (source === "Book") {
                result = `${author} (${year}). ${title}. ${publisher}.`;
            } else if (source === "Journal") {
                result = `${author} (${year}). ${title}. ${containerTitle}.`;
            }
        } else if (style === "MLA") {
            // MLA 9th Edition
            if (source === "Website") {
                result = `${authorMLA} "${title}." ${containerTitle}, ${publisher}, ${year}, ${url}. Accessed ${accessDate}.`;
            } else if (source === "Book") {
                result = `${authorMLA} ${title}. ${publisher}, ${year}.`;
            } else if (source === "Journal") {
                result = `${authorMLA} "${title}." ${containerTitle}, vol. 1, no. 1, ${year}.`;
            }
        } else if (style === "Chicago") {
            // Chicago 17th Edition
            if (source === "Website") {
                result = `${authorMLA} "${title}." ${containerTitle}. Last modified ${year}. ${url}.`;
            } else if (source === "Book") {
                result = `${authorMLA} ${title}. ${publisher}, ${year}.`;
            } else if (source === "Journal") {
                result = `${authorMLA} "${title}." ${containerTitle} (${year}).`;
            }
        }

        setCitation(result);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(citation);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const reset = () => {
        setFields({
            authorFirst: "",
            authorLast: "",
            title: "",
            containerTitle: "",
            publisher: "",
            year: "",
            url: "",
            accessDate: new Date().toISOString().split("T")[0]
        });
        setCitation("");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Citation <span className="text-teal-500">Generator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Generate citations in APA, MLA, and Chicago formats.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                {/* Controls */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Citation Style</label>
                        <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/10">
                            {(["APA", "MLA", "Chicago"] as CitationStyle[]).map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStyle(s)}
                                    className={cn(
                                        "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                                        style === s ? "bg-teal-500 text-white" : "text-zinc-400 hover:text-white"
                                    )}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Source Type</label>
                        <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/10">
                            {(["Website", "Book", "Journal"] as SourceType[]).map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSource(s)}
                                    className={cn(
                                        "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
                                        source === s ? "bg-teal-500 text-white" : "text-zinc-400 hover:text-white"
                                    )}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Input Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">First Name</label>
                        <input
                            type="text"
                            value={fields.authorFirst}
                            onChange={(e) => setFields({ ...fields, authorFirst: e.target.value })}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-teal-500/50 outline-none"
                            placeholder="John"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Last Name</label>
                        <input
                            type="text"
                            value={fields.authorLast}
                            onChange={(e) => setFields({ ...fields, authorLast: e.target.value })}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-teal-500/50 outline-none"
                            placeholder="Doe"
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-zinc-400">Title</label>
                        <input
                            type="text"
                            value={fields.title}
                            onChange={(e) => setFields({ ...fields, title: e.target.value })}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-teal-500/50 outline-none"
                            placeholder="Article or Book Title"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">
                            {source === "Website" ? "Website Name" : source === "Book" ? "Publisher" : "Journal Name"}
                        </label>
                        <input
                            type="text"
                            value={fields.containerTitle}
                            onChange={(e) => setFields({ ...fields, containerTitle: e.target.value })}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-teal-500/50 outline-none"
                            placeholder="Source Name"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Year Published</label>
                        <input
                            type="number"
                            value={fields.year}
                            onChange={(e) => setFields({ ...fields, year: e.target.value })}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-teal-500/50 outline-none"
                            placeholder="2024"
                        />
                    </div>
                    {source === "Website" && (
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-zinc-400">URL</label>
                            <input
                                type="url"
                                value={fields.url}
                                onChange={(e) => setFields({ ...fields, url: e.target.value })}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-teal-500/50 outline-none"
                                placeholder="https://example.com"
                            />
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={generate}
                        className="flex-1 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors font-bold shadow-lg shadow-teal-500/20"
                    >
                        Generate Citation
                    </button>
                    <button
                        onClick={reset}
                        className="px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-xl transition-colors"
                    >
                        <RefreshCcw size={24} />
                    </button>
                </div>

                {/* Result */}
                {citation && (
                    <div className="animate-in fade-in slide-in-from-bottom duration-500">
                        <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-6 relative group">
                            <h3 className="text-sm font-medium text-teal-400 uppercase tracking-wider mb-2">
                                {style} Citation
                            </h3>
                            <p className="text-lg text-white font-serif leading-relaxed pr-12">
                                {citation}
                            </p>
                            <button
                                onClick={copyToClipboard}
                                className="absolute right-4 top-4 p-2 bg-zinc-900 rounded-lg text-zinc-400 hover:text-white border border-white/10 transition-colors"
                            >
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
