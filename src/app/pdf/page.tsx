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

const pdfTools = [
    {
        name: "Merge PDF",
        description: "Combine multiple PDF files into one document in the order you want.",
        icon: Merge,
        href: "/pdf/merge",
        color: "text-blue-400",
        bg: "bg-blue-400/10"
    },
    {
        name: "Split PDF",
        description: "Extract one or more pages from your PDF or convert each page to a separate PDF.",
        icon: Scissors,
        href: "/pdf/split",
        color: "text-green-400",
        bg: "bg-green-400/10"
    },
    {
        name: "Compress PDF",
        description: "Reduce the file size of your PDF while maintaining the best possible quality.",
        icon: FileDown,
        href: "/pdf/compress",
        color: "text-purple-400",
        bg: "bg-purple-400/10"
    },
    {
        name: "Rotate PDF",
        description: "Rotate your PDF pages just the way you need them. Even multiple PDFs at once!",
        icon: RotateCw,
        href: "/pdf/rotate",
        color: "text-orange-400",
        bg: "bg-orange-400/10"
    },
    {
        name: "Reorder PDF",
        description: "Rearrange the pages of your PDF document using a simple drag and drop interface.",
        icon: GripVertical,
        href: "/pdf/reorder",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10"
    },
    {
        name: "Watermark PDF",
        description: "Add an image or text watermark over your PDF. Choose typography, transparency and position.",
        icon: Type,
        href: "/pdf/watermark",
        color: "text-pink-400",
        bg: "bg-pink-400/10"
    },
    {
        name: "Image to PDF",
        description: "Convert JPG, PNG, BMP, GIF, and TIFF images to PDF in seconds.",
        icon: ImageIcon,
        href: "/pdf/image-to-pdf",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10"
    },
    {
        name: "PDF to Image",
        description: "Extract all images that are inside a PDF or convert each page into a JPG image.",
        icon: ImageIcon,
        href: "/pdf/pdf-to-image",
        color: "text-amber-400",
        bg: "bg-amber-400/10"
    },
    {
        name: "Protect PDF",
        description: "Encrypt your PDF with a password to prevent unauthorized access.",
        icon: Lock,
        href: "/pdf/protect",
        color: "text-red-400",
        bg: "bg-red-400/10"
    },
    {
        name: "Unlock PDF",
        description: "Remove password security from your PDF, so you can use it as you want.",
        icon: ShieldCheck,
        href: "/pdf/unlock",
        color: "text-green-400",
        bg: "bg-green-400/10"
    },
    {
        name: "Page Numbers",
        description: "Add page numbers to your PDF document with ease. Choose position, dimensions and typography.",
        icon: Hash,
        href: "/pdf/page-numbers",
        color: "text-blue-400",
        bg: "bg-blue-400/10"
    },
    {
        name: "Remove Pages",
        description: "Delete one or multiple pages from your PDF document with a simple click.",
        icon: Trash2,
        href: "/pdf/remove-pages",
        color: "text-rose-400",
        bg: "bg-rose-400/10"
    }
];

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
                        key={tool.name}
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
                                {tool.name}
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
