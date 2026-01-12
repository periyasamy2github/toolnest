"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Timer, Globe, Dices, QrCode, Ruler, PenTool } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/components/Animations";

const tools = [
    {
        title: "Pomodoro Timer",
        description: "Boost productivity with the Pomodoro technique.",
        icon: Clock,
        href: "/utils/pomodoro",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        title: "Signature Generator",
        description: "Create and download digital signatures.",
        icon: PenTool,
        href: "/utils/signature-generator",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
    },
    {
        title: "Stopwatch",
        description: "Precise stopwatch with lap timing capabilities.",
        icon: Timer,
        href: "/utils/stopwatch",
        color: "text-green-400",
        bg: "bg-green-400/10",
    },
    {
        title: "Timer",
        description: "Simple countdown timer for your daily tasks.",
        icon: Timer,
        href: "/utils/timer",
        color: "text-red-400",
        bg: "bg-red-400/10",
    },
    {
        title: "World Clock",
        description: "Track current time across major global cities.",
        icon: Globe,
        href: "/utils/world-clock",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        title: "Random Picker",
        description: "Randomly select options from a list.",
        icon: Dices,
        href: "/utils/random-picker",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
    },
    {
        title: "QR Code Generator",
        description: "Create custom QR codes with colors and logos.",
        icon: QrCode,
        href: "/utils/qr-code",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
    },
    {
        title: "Unit Converter",
        description: "Convert length, weight, temperature, and more.",
        icon: Ruler,
        href: "/utils/unit-converter",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
    },
];

export default function UtilsPage() {
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
                    <h1 className="text-4xl font-black text-gradient">Utility Tools</h1>
                    <p className="text-zinc-400 text-lg">Everyday utilities to boost your productivity with total privacy, right in your browser.</p>
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
    );
}
