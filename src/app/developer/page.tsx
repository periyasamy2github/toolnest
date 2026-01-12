"use client";

import Link from "next/link";
import { m } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Code2,
    FileJson,
    FileCode,
    Hash,
    Terminal,
    Database,
    Shield,
    Globe,
    Cpu,
    Braces,
    Palette,
    Clock,
    FileType,
    Scissors,
    FileCode2,
    Code,
    Binary,
    Link as LinkIcon,
    ShieldCheck,
    Fingerprint,
    Lock
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/components/Animations";

const tools = [
    {
        title: "JSON Formatter",
        description: "Beautify, validate, and minify JSON data.",
        icon: FileJson,
        href: "/developer/json-formatter",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        title: "API Tester",
        description: "Test REST APIs with a simple interface.",
        icon: Terminal,
        href: "/developer/api-tester",
        color: "text-green-400",
        bg: "bg-green-400/10",
    },
    {
        title: "Gradient Generator",
        description: "Create beautiful CSS gradients.",
        icon: Palette,
        href: "/developer/gradient-generator",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
    },
    {
        title: "Cron Generator",
        description: "Convert cron expressions to human readable text.",
        icon: Clock,
        href: "/developer/cron-generator",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
    },
    {
        title: "JSON to TypeScript",
        description: "Generate TypeScript interfaces from JSON.",
        icon: FileJson,
        href: "/developer/json-to-ts",
        color: "text-blue-300",
        bg: "bg-blue-300/10",
    },
    {
        title: "SQL Formatter",
        description: "Format SQL queries for better readability.",
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
        color: "text-violet-400",
        bg: "bg-violet-400/10",
    },
    {
        title: "HTML to JSX",
        description: "Convert HTML code to React JSX.",
        icon: Code2,
        href: "/developer/html-to-jsx",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
    },
    {
        title: "CSS Tools",
        description: "Minify, beautify, and format CSS.",
        icon: Scissors,
        href: "/developer/css-tools",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
    },
    {
        title: "Markdown Preview",
        description: "Preview Markdown content in real-time.",
        icon: FileCode2,
        href: "/developer/markdown-preview",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
    },
    {
        title: "HTML Entities",
        description: "Encode and decode HTML entities.",
        icon: Code,
        href: "/developer/html-entities",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
    },
    {
        title: "Regex Tester",
        description: "Test and debug regular expressions.",
        icon: FileCode,
        href: "/developer/regex-tester",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
    },
    {
        title: "Base64 Encoder",
        description: "Encode and decode Base64 strings and files.",
        icon: Binary,
        href: "/developer/base64",
        color: "text-slate-400",
        bg: "bg-slate-400/10",
    },
    {
        title: "URL Encoder",
        description: "Encode and decode URLs and parameters.",
        icon: LinkIcon,
        href: "/developer/url-encoder",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "JWT Tool",
        description: "Decode and analyze JSON Web Tokens.",
        icon: ShieldCheck,
        href: "/developer/jwt",
        color: "text-green-400",
        bg: "bg-green-400/10",
    },
    {
        title: "UUID Generator",
        description: "Generate random v4 UUIDs instantly.",
        icon: Fingerprint,
        href: "/developer/uuid-generator",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        title: "Password Generator",
        description: "Generate secure, random passwords.",
        icon: Lock,
        href: "/developer/password-generator",
        color: "text-red-400",
        bg: "bg-red-400/10",
    },
];

export default function DeveloperToolsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-24 space-y-12">
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
                        <p className="text-zinc-400 text-lg">Essential utilities for developers, processed entirely in your browser.</p>
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
        </div>
    );
}
