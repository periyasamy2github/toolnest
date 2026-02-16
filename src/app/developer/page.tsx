"use client";

import BackButton from "@/components/BackButton";
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
    Lock,
    FileSpreadsheet,
    CaseSensitive
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/components/Animations";

import { tools as allTools } from "@/data/tools";

const tools = allTools.filter(tool => tool.category === "dev-tools");


export default function DeveloperToolsPage() {
    return (
        <div className="space-y-12">
            <m.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="space-y-12"
            >
                <m.div variants={fadeInUp} className="flex items-center gap-6">
                    <BackButton />
                    <div>
                        <div className="flex items-center gap-4">
                            <h1 className="text-4xl font-black text-gradient">Developer Tools</h1>
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-bold text-blue-400">
                                {tools.length} Tools
                            </span>
                        </div>
                        <p className="text-zinc-400 text-lg mt-2">Essential utilities for developers, processed entirely in your browser.</p>
                    </div>
                </m.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 items-stretch">
                    {tools.map((tool) => (
                        <m.div key={tool.title} variants={fadeInUp} className="h-full">
                            <Link
                                href={tool.href}
                                className="group relative flex flex-col items-center text-center h-full overflow-hidden glass-card p-4 hover:bg-white/[0.03] transition-all duration-300"
                                style={{ borderRadius: '0.5rem' }}
                            >
                                <div className={`p-3 rounded-xl ${tool.bg} ${tool.color} w-fit mb-3 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/20`}>
                                    <tool.icon size={32} />
                                </div>
                                <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                                    {tool.title}
                                </h3>
                            </Link>
                        </m.div>
                    ))}
                </div>
            </m.div>
        </div>
    );
}
