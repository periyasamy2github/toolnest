"use client";

import Link from "next/link";
import { Type, Hash, CaseSensitive, ArrowLeft, FileDiff, Instagram, Newspaper, BookOpen, BarChart3, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/components/Animations";

const tools = [
    {
        title: "Word Counter",
        description: "Count words, characters, and sentences.",
        icon: Hash,
        href: "/text/word-counter",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
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
        <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-12"
        >
            <motion.div variants={fadeInUp} className="flex items-center gap-6">
                <Link href="/" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                    <ArrowLeft className="text-zinc-100" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Text Tools</h1>
                    <p className="text-zinc-400 text-lg">Manipulate and generate text content with total privacy, right in your browser.</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {tools.map((tool) => (
                    <motion.div key={tool.title} variants={fadeInUp} className="h-full">
                        <Link
                            href={tool.href}
                            className="group relative flex flex-col h-full overflow-hidden glass-card p-8"
                        >
                            <div className={`p-4 rounded-2xl ${tool.bg} ${tool.color} w-fit mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                <tool.icon size={32} />
                            </div>

                            <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                                {tool.title}
                            </h2>
                            <p className="text-zinc-400 text-base leading-relaxed group-hover:text-zinc-300 transition-colors flex-grow">
                                {tool.description}
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
