"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutGrid,
    Video,
    Image as ImageIcon,
    FileText,
    Wrench,
    Menu,
    X,
    Download,
    Activity,
    ChevronDown,
    Mic,
    Scissors,
    Merge,
    QrCode,
    Lock,
    Ruler,
    Calculator,
    Timer,
    Share2,
    FileVideo,
    Smile,
    Crop,
    Wind,
    Droplets,
    Flame,
    Hash,
    CaseSensitive,
    Type,
    FileDiff,
    Braces,
    Binary,
    Link as LinkIcon,
    ShieldCheck,
    Fingerprint,
    Code,
    Music,
    FileCode
} from "lucide-react";
import { useState } from "react";

const navItems = [
    { name: "All Tools", href: "/", icon: LayoutGrid },
    {
        name: "Downloader",
        href: "/downloader",
        icon: Download,
        subItems: [
            { name: "YouTube Downloader", href: "/downloader/video", icon: Video },
            { name: "Social Downloader", href: "/downloader/social", icon: Share2 },
        ]
    },
    {
        name: "Audio",
        href: "/audio",
        icon: Music,
        subItems: [
            { name: "MP3 Cutter", href: "/audio/cutter", icon: Scissors },
            { name: "Audio Merger", href: "/audio/merger", icon: Merge },
        ]
    },
    {
        name: "Image",
        href: "/image",
        icon: ImageIcon,
        subItems: [
            { name: "Compressor", href: "/image/compressor", icon: ImageIcon },
            { name: "Resizer & Cropper", href: "/image/resizer", icon: Crop },
            { name: "Background Remover", href: "/image/remove-bg", icon: Scissors },
            { name: "Meme Generator", href: "/image/meme-generator", icon: Smile },
        ]
    },
    {
        name: "Health",
        href: "/health",
        icon: Activity,
        subItems: [
            { name: "BMI Calculator", href: "/health/bmi-calculator", icon: Calculator },
            { name: "Body Fat", href: "/health/body-fat-calculator", icon: Activity },
            { name: "Breathing", href: "/health/breathing-exercise", icon: Wind },
            { name: "Water Intake", href: "/health/water-intake-calculator", icon: Droplets },
            { name: "Calories", href: "/health/calories-calculator", icon: Flame },
        ]
    },
    {
        name: "Text",
        href: "/text",
        icon: FileText,
        subItems: [
            { name: "Word Counter", href: "/text/word-counter", icon: Hash },
            { name: "Case Converter", href: "/text/case-converter", icon: CaseSensitive },
            { name: "Lorem Ipsum", href: "/text/lorem-ipsum", icon: Type },
            { name: "Diff Checker", href: "/text/diff-checker", icon: FileDiff },
        ]
    },
    {
        name: "Developer",
        href: "/developer",
        icon: Braces,
        subItems: [
            { name: "JSON Formatter", href: "/developer/json-formatter", icon: Braces },
            { name: "Base64 Encoder", href: "/developer/base64", icon: Binary },
            { name: "URL Encoder", href: "/developer/url-encoder", icon: LinkIcon },
            { name: "HTML Entities", href: "/developer/html-entities", icon: Code },
            { name: "Regex Tester", href: "/developer/regex-tester", icon: FileCode },
            { name: "JWT Tool", href: "/developer/jwt", icon: ShieldCheck },
            { name: "UUID Gen", href: "/developer/uuid-generator", icon: Fingerprint },
            { name: "Password Gen", href: "/developer/password-generator", icon: Lock },
        ]
    },
    {
        name: "Utilities",
        href: "/utils",
        icon: Wrench,
        subItems: [
            { name: "QR Code", href: "/utils/qr-code", icon: QrCode },
            { name: "Unit Converter", href: "/utils/unit-converter", icon: Ruler },
            { name: "Timer", href: "/utils/timer", icon: Timer },
        ]
    },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-zinc-100">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <LayoutGrid size={18} className="text-white" />
                        </div>
                        <span>ToolNest</span>
                    </Link>
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                        <span>Created by</span>
                        <span className="text-zinc-200">Professor</span>
                    </div>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1 mr-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                        const hasSubItems = item.subItems && item.subItems.length > 0;

                        return (
                            <div key={item.href} className="relative group">
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                                        isActive
                                            ? "bg-white/10 text-white"
                                            : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                                    )}
                                >
                                    <item.icon size={16} />
                                    {item.name}
                                    {hasSubItems && <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform" />}
                                </Link>

                                {/* Dropdown */}
                                {hasSubItems && (
                                    <div className="absolute top-full right-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden p-1">
                                            {item.subItems?.map((subItem) => (
                                                <Link
                                                    key={subItem.href}
                                                    href={subItem.href}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors"
                                                >
                                                    <subItem.icon size={16} />
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-zinc-400 hover:text-white"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t border-white/5 bg-zinc-950 px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                        const hasSubItems = item.subItems && item.subItems.length > 0;
                        const isExpanded = mobileExpanded === item.name;

                        return (
                            <div key={item.href}>
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3",
                                            isActive
                                                ? "bg-white/10 text-white"
                                                : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                                        )}
                                    >
                                        <item.icon size={18} />
                                        {item.name}
                                    </Link>
                                    {hasSubItems && (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setMobileExpanded(isExpanded ? null : item.name);
                                            }}
                                            className="p-3 text-zinc-500 hover:text-white"
                                        >
                                            <ChevronDown size={16} className={cn("transition-transform", isExpanded && "rotate-180")} />
                                        </button>
                                    )}
                                </div>

                                {/* Mobile Submenu */}
                                {hasSubItems && isExpanded && (
                                    <div className="pl-4 space-y-1 mt-1 border-l border-white/5 ml-4">
                                        {item.subItems?.map((subItem) => (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block px-4 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-colors flex items-center gap-3"
                                            >
                                                <subItem.icon size={16} />
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </nav>
    );
}
