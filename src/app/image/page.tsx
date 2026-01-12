"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowLeft, ArrowRight, ImageIcon, Crop, Scissors, Smile, Palette, RefreshCw, Sliders, Stamp, LayoutGrid } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/components/Animations";

const tools = [
    {
        title: "Compressor",
        description: "Compress images without quality loss.",
        icon: ImageIcon,
        href: "/image/compressor",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        title: "Resizer",
        description: "Resize images to exact dimensions.",
        icon: Crop,
        href: "/image/resizer",
        color: "text-green-400",
        bg: "bg-green-400/10",
    },
    {
        title: "Cropper",
        description: "Crop, rotate, and flip images.",
        icon: Crop,
        href: "/image/cropper",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
    },
    {
        title: "Converter",
        description: "Convert between JPG, PNG, WEBP, BMP, GIF.",
        icon: RefreshCw,
        href: "/image/converter",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
    },
    {
        title: "Filters & Effects",
        description: "Apply professional filters and adjustments.",
        icon: Sliders,
        href: "/image/filters",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
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
        description: "Create viral memes with multi-layer editing.",
        icon: Smile,
        href: "/image/meme-generator",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
    },
    {
        title: "Watermark",
        description: "Protect your images with custom watermarks.",
        icon: Stamp,
        href: "/image/watermark",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
    },
    {
        title: "Collage Maker",
        description: "Combine photos into beautiful layouts.",
        icon: LayoutGrid,
        href: "/image/collage",
        color: "text-rose-400",
        bg: "bg-rose-400/10",
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
                        <h1 className="text-4xl font-black text-gradient">Image Tools</h1>
                        <p className="text-zinc-400 text-lg">Edit and optimize images in your browser with total privacy.</p>
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
