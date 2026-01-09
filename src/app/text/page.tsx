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
            className="space-y-8"
        >
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Text Tools</h1>
                    <p className="text-zinc-400">Manipulate and generate text content.</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {tools.map((tool) => (
                    <motion.div key={tool.title} variants={fadeInUp} className="h-full">
                        <Link
                            href={tool.href}
                            className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 hover:bg-zinc-900/80 transition-all duration-500 hover:border-white/20 hover:shadow-xl"
                        >
                            <div className={`p-3 rounded-xl ${tool.bg} ${tool.color} w-fit mb-4 group-hover:scale-110 transition-transform duration-500`}>
                                <tool.icon size={24} />
                            </div>

                            <h2 className="text-xl font-semibold mb-2 text-zinc-100 group-hover:text-white transition-colors">
                                {tool.title}
                            </h2>
                            <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors flex-grow">
                                {tool.description}
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
