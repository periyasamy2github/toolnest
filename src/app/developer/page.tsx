"use client";

import { ArrowLeft, Braces, Binary, Link as LinkIcon, Code, FileCode, ShieldCheck, Fingerprint, Lock } from "lucide-react";
import Link from "next/link";

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
        title: "JWT Tool",
        description: "Generate and decode JSON Web Tokens (JWT).",
        icon: ShieldCheck,
        href: "/developer/jwt",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
    },
    {
        title: "Password Generator",
        description: "Generate secure, random passwords instantly.",
        icon: Lock,
        href: "/developer/password-generator",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
    },
    {
        title: "UUID Generator",
        description: "Generate secure random UUIDs (v4).",
        icon: Fingerprint,
        href: "/developer/uuid-generator",
        color: "text-zinc-400",
        bg: "bg-zinc-400/10",
    },
];

export default function DeveloperToolsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Developer Tools</h1>
                    <p className="text-zinc-400">Essential utilities for web development and debugging.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map((tool) => (
                    <Link
                        key={tool.title}
                        href={tool.href}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 hover:bg-zinc-900/80 transition-all duration-300 hover:border-white/20 hover:shadow-xl"
                    >
                        <div className={`p-3 rounded-xl ${tool.bg} ${tool.color} w-fit mb-4`}>
                            <tool.icon size={24} />
                        </div>

                        <h2 className="text-xl font-semibold mb-2 text-zinc-100 group-hover:text-white">
                            {tool.title}
                        </h2>
                        <p className="text-sm text-zinc-400 group-hover:text-zinc-300">
                            {tool.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
