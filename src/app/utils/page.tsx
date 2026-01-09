"use client";

import Link from "next/link";
import { QrCode, Lock, Ruler, Calculator, ArrowLeft, Timer, Clock, Globe, Dices } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/components/Animations";

const tools = [
    {
        title: "Pomodoro Timer",
        description: "Stay focused and productive with timed work sessions.",
        icon: Clock,
        href: "/utils/pomodoro",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
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
                    <h1 className="text-3xl font-bold text-zinc-100">Utility Tools</h1>
                    <p className="text-zinc-400">Everyday utilities to boost your productivity.</p>
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
