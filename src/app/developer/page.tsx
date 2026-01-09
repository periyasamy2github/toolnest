"use client";

import { ArrowLeft, Braces, Binary, Link as LinkIcon, Code, FileCode, ShieldCheck, Fingerprint, Lock, FileJson, Database, FileType, Code2, Scissors, FileCode2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/components/Animations";

const tools = [
    {
        title: "JSON Formatter",
        description: "Pretty print, validate, and minify JSON data.",
        icon: Braces,
        href: "/developer/json-formatter",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
    },
    {
        title: "JSON to TypeScript",
        description: "Convert JSON to TypeScript interfaces instantly.",
        icon: FileJson,
        href: "/developer/json-to-ts",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "SQL Formatter",
        description: "Beautify and format SQL queries with ease.",
        icon: Database,
        href: "/developer/sql-formatter",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
    },
    {
        title: "YAML to JSON",
        description: "Convert between YAML and JSON formats.",
        icon: FileType,
        href: "/developer/yaml-to-json",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
    },
    {
        title: "HTML to JSX",
        description: "Convert HTML snippets to React JSX code.",
        icon: Code2,
        href: "/developer/html-to-jsx",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
    },
    {
        title: "CSS Tools",
        description: "Minify and beautify your CSS code.",
        icon: Scissors,
        href: "/developer/css-tools",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
    },
    {
        title: "Markdown Preview",
        description: "Live preview for your Markdown content.",
        icon: FileCode2,
        href: "/developer/markdown-preview",
        color: "text-green-400",
        bg: "bg-green-400/10",
    },
    {
        title: "HTML Entities",
        description: "Escape and unescape HTML characters for safety.",
        icon: Code,
        href: "/developer/html-entities",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        title: "Regex Tester",
        description: "Test and debug regular expressions with live matches.",
        icon: FileCode,
        href: "/developer/regex-tester",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
    },
    {
        title: "Base64 Encoder",
        description: "Encode and decode text to/from Base64 format.",
        icon: Binary,
        href: "/developer/base64",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        title: "URL Encoder",
        description: "Safely encode and decode URLs and parameters.",
        icon: LinkIcon,
        href: "/developer/url-encoder",
        color: "text-green-400",
        bg: "bg-green-400/10",
    },
    {
        title: "JWT Tool",
        description: "Generate and decode JSON Web Tokens (JWT).",
        icon: ShieldCheck,
        href: "/developer/jwt",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
    },
    {
        title: "UUID Generator",
        description: "Generate secure random UUIDs (v4).",
        icon: Fingerprint,
        href: "/developer/uuid-generator",
        color: "text-zinc-400",
        bg: "bg-zinc-400/10",
    },
    {
        title: "Password Generator",
        description: "Generate secure, random passwords instantly.",
        icon: Lock,
        href: "/developer/password-generator",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
    },
];

export default function DeveloperToolsPage() {
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
                    <h1 className="text-3xl font-bold text-zinc-100">Developer Tools</h1>
                    <p className="text-zinc-400">Essential utilities for web development and debugging.</p>
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
