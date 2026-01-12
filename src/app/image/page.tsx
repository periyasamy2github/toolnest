"use client";

import Link from "next/link";
import { Image as ImageIcon, Crop, Scissors, Wand2, ArrowLeft, Smile, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/components/Animations";

const tools = [
    {
        title: "Image Compressor",
        description: "Compress JPG, PNG, WebP images locally.",
        icon: ImageIcon,
        href: "/image/compressor",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        title: "Resizer & Cropper",
        description: "Resize and crop images to exact dimensions.",
        icon: Crop,
        href: "/image/resizer",
        color: "text-green-400",
        bg: "bg-green-400/10",
    },
    {
        title: "Background Remover",
        description: "Remove image backgrounds automatically.",
        icon: Scissors,
        href: "/image/remove-bg",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        title: "Meme Generator",
        description: "Create viral memes with custom text.",
        icon: Smile,
        href: "/image/meme-generator",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
    },
    {
        title: "Color Palette",
        description: "Extract color palettes from any image.",
        icon: Palette,
        href: "/image/color-palette",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
    },
];

export default function ImageToolsPage() {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-12"
        >
            <motion.div variants={fadeInUp} className="flex items-center gap-6">
                <Link href="/" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                    <ArrowLeft className="text-zinc-100" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Image Tools</h1>
                    <p className="text-zinc-400 text-lg">Edit and optimize images in your browser with total privacy.</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {tools.map((tool) => (
                    <motion.div key={tool.title} variants={fadeInUp} className="h-full">
                        <Link
                            href={tool.href}
                            className="group relative flex flex-col h-full overflow-hidden glass-card p-8"
                        >
                            <div className={`p-4 rounded-2xl ${tool.bg} ${tool.color} w-fit mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                <tool.icon size={32} />
                            </div>

                            <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                                {tool.title}
                            </h2>
                            <p className="text-zinc-400 text-base leading-relaxed group-hover:text-zinc-300 transition-colors flex-grow">
                                {tool.description}
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
