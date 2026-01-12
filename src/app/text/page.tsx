"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowLeft, ArrowRight, Hash, CaseSensitive, Type, FileDiff, Instagram, Newspaper, BookOpen, BarChart3, Volume2, Eraser } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/components/Animations";

const tools = [
    {
        title: "Word Counter",
        description: "Count words, characters, and paragraphs in real-time.",
        icon: Hash,
        href: "/text/word-counter",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        title: "Text Cleaner",
        description: "Remove extra spaces, lines, and HTML tags.",
        icon: Eraser,
        href: "/text/text-cleaner",
        color: "text-red-400",
        bg: "bg-red-400/10",
    },
    {
        title: "Case Converter",
        description: "Convert text to UPPERCASE, lowercase, Title Case, etc.",
        icon: CaseSensitive,
        href: "/text/case-converter",
        color: "text-green-400",
        bg: "bg-green-400/10",
    },
    {
        title: "Lorem Ipsum",
        description: "Generate placeholder text for your designs.",
        icon: Type,
        href: "/text/lorem-ipsum",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        title: "Diff Checker",
        description: "Compare two texts and highlight differences.",
        icon: FileDiff,
        href: "/text/diff-checker",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
    },
    {
        title: "Instagram Hashtags",
        description: "Generate trending hashtags for your posts.",
        icon: Instagram,
        href: "/text/instagram-hashtags",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
    },
    {
        title: "Headline Analyzer",
        description: "Score and optimize headlines for engagement.",
        icon: Newspaper,
        href: "/text/headline-analyzer",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
    },
    {
        title: "Readability Score",
        description: "Analyze the readability of your content.",
        icon: BookOpen,
        href: "/text/readability",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
    },
    {
        title: "Keyword Density",
        description: "Analyze keyword frequency in your content.",
        icon: BarChart3,
        href: "/text/keyword-density",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
    },
    {
        title: "Text to Speech",
        description: "Convert text into natural-sounding speech.",
        icon: Volume2,
        href: "/text/text-to-speech",
        color: "text-red-400",
        bg: "bg-red-400/10",
    },
];

export default function TextToolsPage() {
    return (
        <m.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-12 pb-24"
        >
            <m.div variants={fadeInUp} className="flex items-center gap-6">
                <Link href="/" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                    <ArrowLeft className="text-zinc-100" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Text Tools</h1>
                    <p className="text-zinc-400 text-lg">Manipulate and generate text content with total privacy, right in your browser.</p>
                </div>
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {tools.map((tool) => (
                    <m.div key={tool.title} variants={fadeInUp} className="h-full">
                        <Link
                            href={tool.href}
                            className="group relative flex flex-col h-full overflow-hidden glass-card p-6"
                        >
                            <div className={`p-3 rounded-2xl ${tool.bg} ${tool.color} w-fit mb-4 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-black/20`}>
                                <tool.icon size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-500">
                                {tool.title}
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-grow group-hover:text-zinc-300 transition-colors duration-500">
                                {tool.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm font-bold text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                                Open Tool <ArrowRight size={16} />
                            </div>
                        </Link>
                    </m.div>
                ))}
            </div>
        </m.div>
    );
}
