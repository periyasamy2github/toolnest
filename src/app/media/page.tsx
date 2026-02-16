"use client";

import BackButton from "@/components/BackButton";
import Link from "next/link";
import { m } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    ImageIcon,
    Crop,
    Scissors,
    Smile,
    Palette,
    RefreshCw,
    Sliders,
    Stamp,
    LayoutGrid,
    Film,
    Minimize2,
    MonitorPlay,
    Music,
    Mic,
    Merge,
    Volume2,
    FastForward,
    Rewind
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/components/Animations";

import { tools as allTools } from "@/data/tools";

const tools = allTools.filter(tool => tool.category === "media");


export default function MediaToolsPage() {
    return (
        <div className="space-y-12 pb-24">
            <m.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="space-y-12"
            >
                <m.div variants={fadeInUp} className="flex items-center gap-6">
                    <BackButton />
                    <div>
                        <h1 className="text-4xl font-black text-gradient">Media Tools</h1>
                        <p className="text-zinc-400 text-lg">Edit and optimize images, videos, and audio in your browser with total privacy.</p>
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
