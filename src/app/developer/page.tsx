"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowLeft, ArrowRight, Braces, FileJson, Database, FileType, Code2, Scissors, FileCode2, Code, FileCode, Binary, Link as LinkIcon, ShieldCheck, Fingerprint, Lock } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/components/Animations";

const tools = [
    {
        title: "JSON Formatter",
        description: "Validate, format, and minify JSON data.",
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
        <m.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-12"
        >
            <m.div variants={fadeInUp} className="flex items-center gap-6">
                <Link href="/" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                    <ArrowLeft className="text-zinc-100" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Developer Tools</h1>
                    <p className="text-zinc-400 text-lg">Essential utilities for web development and debugging, right in your browser.</p>
                </div>
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {tools.map((tool) => (
                    <m.div key={tool.title} variants={fadeInUp} className="h-full">
                        <Link
                            href={tool.href}
                            className="group relative flex flex-col h-full overflow-hidden glass-card p-8"
                        >
                            <div className={`p-4 rounded-2xl ${tool.bg} ${tool.color} w-fit mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-black/20`}>
                                <tool.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-500">
                                {tool.title}
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow group-hover:text-zinc-300 transition-colors duration-500">
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
