"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    Merge,
    Scissors,
    FileDown,
    RotateCw,
    GripVertical,
    Type,
    ImageIcon,
    Lock,
    ShieldCheck,
    Hash,
    Trash2,
    ArrowRight,
    FileText
} from "lucide-react";
import { m } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/components/Animations";

import { tools as allTools } from "@/data/tools";

const pdfTools = allTools.filter(tool => tool.category === "pdf");


export default function PDFLandingPage() {
    return (
        <div className="space-y-12 pb-24">
            <m.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="text-center space-y-4 max-w-3xl mx-auto"
            >
                <m.div
                    variants={fadeInUp}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-sm font-medium text-red-400"
                >
                    <FileText size={16} />
                    <span>Premium PDF Suite</span>
                </m.div>
                <m.h1
                    variants={fadeInUp}
                    className="text-4xl md:text-6xl font-bold text-white tracking-tight"
                >
                    Every PDF tool you <span className="text-red-500">need</span>
                </m.h1>
                <m.p
                    variants={fadeInUp}
                    className="text-zinc-400 text-lg md:text-xl leading-relaxed"
                >
                    All the tools you need to work with PDFs in one place. 100% private,
                    secure, and runs entirely in your browser.
                </m.p>
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pdfTools.map((tool, i) => (
                    <m.div
                        key={tool.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Link
                            href={tool.href}
                            className="group flex flex-col h-full p-6 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                                    tool.bg,
                                    tool.color
                                )}>
                                    <tool.icon size={24} />
                                </div>
                                <div className="p-2 rounded-full bg-white/5 text-zinc-400 group-hover:text-red-400 group-hover:bg-red-500/10 transition-colors">
                                    <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                                {tool.title}
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                {tool.description}
                            </p>
                        </Link>
                    </m.div>
                ))}
            </div>

            <div className="glass-card p-6 bg-red-500/5 border-red-500/10 rounded-2xl text-center">
                <p className="text-sm text-zinc-400">
                    <span className="text-red-400 font-semibold">Privacy First:</span> All PDF processing happens locally in your browser. Your files are never uploaded to any server.
                </p>
            </div>
        </div>
    );
}
