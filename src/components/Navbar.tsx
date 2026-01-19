"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutGrid,
    ImageIcon,
    FileText,
    Menu,
    X,
    Activity,
    ChevronDown,
    Scissors,
    Merge,
    QrCode,
    Lock,
    Ruler,
    Calculator,
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
    Instagram,
    FileJson,
    Database,
    Globe,
    Dices,
    Clock,
    Palette,
    FileCode2,
    FileCode,
    FileType,
    Code2,
    Timer,
    Newspaper,
    BookOpen,
    BarChart3,
    Volume2,
    ArrowRight,
    Zap,
    Dumbbell,
    HeartPulse,
    Brain,
    Coins,
    Hourglass,
    Smile,
    RefreshCw,
    Sliders,
    Stamp,
    Mic,
    Eraser,
    PenTool,
    Moon,
    Send,
    FileDown,
    RotateCw,
    GripVertical,
    Trash2,
    Search,
    Banknote,
    TrendingUp,
    Receipt,
    Wallet,
    Share2,
    Youtube,
    Twitter,
    UserCircle2,
    MessageSquare,
    Minimize2,
    MonitorPlay,
    GraduationCap,
    Film,
    ArrowRightLeft,
    FileSpreadsheet,
    PieChart,
    Percent
} from "lucide-react";
import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "All Tools", href: "/", icon: LayoutGrid, color: "text-blue-500", bg: "bg-blue-500/10" },
    {
        name: "Media",
        href: "/media",
        icon: MonitorPlay,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        subItems: [
            // Image Tools
            { name: "Image Compressor", href: "/image/compressor", icon: ImageIcon, color: "text-purple-400" },
            { name: "Image Resizer", href: "/image/resizer", icon: Crop, color: "text-pink-400" },
            { name: "Image Cropper", href: "/image/cropper", icon: Crop, color: "text-emerald-400" },
            { name: "Image Converter", href: "/image/converter", icon: RefreshCw, color: "text-orange-400" },
            { name: "Image Filters", href: "/image/filters", icon: Sliders, color: "text-indigo-400" },
            { name: "Background Remover", href: "/image/remove-bg", icon: Scissors, color: "text-indigo-400" },
            { name: "Meme Generator", href: "/image/meme-generator", icon: Smile, color: "text-yellow-400" },
            { name: "Watermark", href: "/image/watermark", icon: Stamp, color: "text-cyan-400" },
            { name: "Collage Maker", href: "/image/collage", icon: LayoutGrid, color: "text-rose-400" },
            { name: "Color Palette", href: "/image/color-palette", icon: Palette, color: "text-fuchsia-400" },
            // Video Tools
            { name: "Video Compressor", href: "/video/compressor", icon: Minimize2, color: "text-blue-400" },
            { name: "Video Trimmer", href: "/video/trimmer", icon: Scissors, color: "text-red-400" },
            { name: "Video Converter", href: "/video/converter", icon: RefreshCw, color: "text-green-400" },
            { name: "Video to GIF", href: "/video/video-to-gif", icon: Film, color: "text-purple-400" },
            { name: "Thumbnail Downloader", href: "/video/thumbnail-downloader", icon: ImageIcon, color: "text-orange-400" },
            { name: "Screen Recorder", href: "/video/screen-recorder", icon: MonitorPlay, color: "text-pink-400" },
            { name: "Extract Audio", href: "/video/extract-audio", icon: Music, color: "text-cyan-400" },
            { name: "Video Cropper", href: "/video/cropper", icon: Crop, color: "text-yellow-400" },
            // Audio Tools
            { name: "MP3 Cutter", href: "/audio/cutter", icon: Scissors, color: "text-cyan-400" },
            { name: "Audio Merger", href: "/audio/merger", icon: Merge, color: "text-blue-400" },
            { name: "Voice Recorder", href: "/audio/voice-recorder", icon: Mic, color: "text-red-400" },
        ]
    },
    {
        name: "PDF",
        href: "/pdf",
        icon: FileDown,
        color: "text-red-500",
        bg: "bg-red-500/10",
        subItems: [
            { name: "Merge PDF", href: "/pdf/merge", icon: Merge, color: "text-blue-400" },
            { name: "Split PDF", href: "/pdf/split", icon: Scissors, color: "text-green-400" },
            { name: "Compress PDF", href: "/pdf/compress", icon: FileDown, color: "text-purple-400" },
            { name: "Rotate PDF", href: "/pdf/rotate", icon: RotateCw, color: "text-orange-400" },
            { name: "Reorder PDF", href: "/pdf/reorder", icon: GripVertical, color: "text-cyan-400" },
            { name: "Watermark PDF", href: "/pdf/watermark", icon: Type, color: "text-pink-400" },
            { name: "Image to PDF", href: "/pdf/image-to-pdf", icon: ImageIcon, color: "text-emerald-400" },
            { name: "PDF to Image", href: "/pdf/pdf-to-image", icon: ImageIcon, color: "text-amber-400" },
            { name: "Protect PDF", href: "/pdf/protect", icon: Lock, color: "text-red-400" },
            { name: "Unlock PDF", href: "/pdf/unlock", icon: ShieldCheck, color: "text-green-400" },
            { name: "Page Numbers", href: "/pdf/page-numbers", icon: Hash, color: "text-blue-400" },
            { name: "Remove Pages", href: "/pdf/remove-pages", icon: Trash2, color: "text-rose-400" },
        ]
    },
    {
        name: "Writing & Social",
        href: "/writing-social",
        icon: FileText,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        subItems: [
            // Content Tools
            { name: "Word Counter", href: "/text/word-counter", icon: Hash, color: "text-orange-400" },
            { name: "Text Cleaner", href: "/text/text-cleaner", icon: Eraser, color: "text-red-400" },
            { name: "Case Converter", href: "/text/case-converter", icon: CaseSensitive, color: "text-amber-400" },
            { name: "Lorem Ipsum", href: "/text/lorem-ipsum", icon: Type, color: "text-yellow-400" },
            { name: "Diff Checker", href: "/text/diff-checker", icon: FileDiff, color: "text-red-400" },
            { name: "Headline Analyzer", href: "/text/headline-analyzer", icon: Newspaper, color: "text-emerald-400" },
            { name: "Readability Score", href: "/text/readability", icon: BookOpen, color: "text-blue-400" },
            { name: "Keyword Density", href: "/text/keyword-density", icon: BarChart3, color: "text-violet-400" },
            { name: "Text to Speech", href: "/text/text-to-speech", icon: Volume2, color: "text-cyan-400" },
            // Social Tools
            { name: "YouTube Tags", href: "/social/youtube-tag-generator", icon: Youtube, color: "text-red-500" },
            { name: "Instagram Hashtags", href: "/social/instagram-hashtag-generator", icon: Instagram, color: "text-pink-500" },
            { name: "Tweet Generator", href: "/social/twitter", icon: Twitter, color: "text-blue-400" },
            { name: "Bio Generator", href: "/social/social-bio-generator", icon: UserCircle2, color: "text-purple-500" },
            { name: "Caption Generator", href: "/social/caption-generator", icon: MessageSquare, color: "text-green-500" },
        ]
    },
    {
        name: "Dev Tools",
        href: "/developer",
        icon: Braces,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        subItems: [
            // Developer Tools
            { name: "JSON Formatter", href: "/developer/json-formatter", icon: Braces, color: "text-blue-400" },
            { name: "API Tester", href: "/developer/api-tester", icon: Send, color: "text-green-400" },
            { name: "Gradient Generator", href: "/developer/gradient-generator", icon: Palette, color: "text-pink-400" },
            { name: "Cron Generator", href: "/developer/cron-generator", icon: Clock, color: "text-indigo-400" },
            { name: "JSON to TypeScript", href: "/developer/json-to-ts", icon: FileJson, color: "text-blue-300" },
            { name: "SQL Formatter", href: "/developer/sql-formatter", icon: Database, color: "text-indigo-400" },
            { name: "YAML to JSON", href: "/developer/yaml-to-json", icon: FileType, color: "text-violet-400" },
            { name: "HTML to JSX", href: "/developer/html-to-jsx", icon: Code2, color: "text-cyan-400" },
            { name: "CSS Tools", href: "/developer/css-tools", icon: Scissors, color: "text-pink-400" },
            { name: "Markdown Preview", href: "/developer/markdown-preview", icon: FileCode2, color: "text-emerald-400" },
            { name: "HTML Entities", href: "/developer/html-entities", icon: Code, color: "text-amber-400" },
            { name: "Regex Tester", href: "/developer/regex-tester", icon: FileCode, color: "text-orange-400" },
            { name: "Base64 Encoder", href: "/developer/base64", icon: Binary, color: "text-slate-400" },
            { name: "URL Encoder", href: "/developer/url-encoder", icon: LinkIcon, color: "text-blue-500" },
            { name: "JWT Tool", href: "/developer/jwt", icon: ShieldCheck, color: "text-green-400" },
            { name: "UUID Generator", href: "/developer/uuid-generator", icon: Fingerprint, color: "text-purple-400" },
            { name: "Password Generator", href: "/developer/password-generator", icon: Lock, color: "text-red-400" },
            // Converters
            { name: "JSON <> CSV", href: "/converters/json-csv", icon: FileSpreadsheet, color: "text-green-500" },
            { name: "JSON <> XML", href: "/converters/json-xml", icon: FileCode2, color: "text-orange-500" },
            { name: "YAML <> JSON", href: "/converters/yaml-json", icon: Database, color: "text-purple-500" },
            { name: "Number Base", href: "/converters/number-base", icon: Binary, color: "text-blue-500" },
            { name: "Text Case", href: "/converters/text-case", icon: CaseSensitive, color: "text-pink-500" },
        ]
    },
    {
        name: "Business & Finance",
        href: "/finance",
        icon: Wallet,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        subItems: [
            // Finance Tools
            { name: "Loan EMI", href: "/finance/loan-emi", icon: Calculator, color: "text-emerald-400" },
            { name: "SIP Calculator", href: "/finance/sip-calculator", icon: TrendingUp, color: "text-purple-400" },
            { name: "Compound Interest", href: "/finance/compound-interest", icon: TrendingUp, color: "text-amber-400" },
            { name: "FD Calculator", href: "/finance/fd-calculator", icon: Wallet, color: "text-cyan-400" },
            { name: "PPF Calculator", href: "/finance/ppf-calculator", icon: Wallet, color: "text-pink-400" },
            { name: "Income Tax", href: "/finance/income-tax", icon: Receipt, color: "text-red-400" },
            { name: "Net Worth", href: "/finance/net-worth", icon: PieChart, color: "text-green-400" },
            { name: "Retirement", href: "/finance/retirement-planner", icon: Wallet, color: "text-orange-400" },
            { name: "GST Calculator", href: "/finance/gst-calculator", icon: Percent, color: "text-indigo-400" },
            { name: "Currency", href: "/finance/currency-converter", icon: Banknote, color: "text-teal-400" },
            { name: "Home Loan", href: "/finance/home-loan-affordability", icon: Calculator, color: "text-blue-400" },
            { name: "Gratuity", href: "/finance/gratuity", icon: Coins, color: "text-yellow-400" },
            // Productivity Tools
            { name: "Invoice Generator", href: "/utils/invoice-generator", icon: FileText, color: "text-emerald-400" },
            { name: "Pomodoro Timer", href: "/utils/pomodoro", icon: Clock, color: "text-red-400" },
            { name: "Signature Generator", href: "/utils/signature-generator", icon: PenTool, color: "text-pink-400" },
            { name: "Stopwatch", href: "/utils/stopwatch", icon: Timer, color: "text-blue-400" },
            { name: "Timer", href: "/utils/timer", icon: Timer, color: "text-green-400" },
            { name: "World Clock", href: "/utils/world-clock", icon: Globe, color: "text-cyan-400" },
            { name: "Random Picker", href: "/utils/random-picker", icon: Dices, color: "text-purple-400" },
            { name: "QR Code", href: "/utils/qr-code", icon: QrCode, color: "text-slate-200" },
            { name: "Unit Converter", href: "/utils/unit-converter", icon: Ruler, color: "text-orange-400" },
            { name: "Salary Time Value", href: "/utils/salary-time-value", icon: Coins, color: "text-emerald-400" },
        ]
    },
    {
        name: "Life & Learning",
        href: "/health",
        icon: Activity,
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        subItems: [
            // Health Tools
            { name: "BMI Calculator", href: "/health/bmi-calculator", icon: Calculator, color: "text-blue-400" },
            { name: "Sleep Calculator", href: "/health/sleep-calculator", icon: Moon, color: "text-indigo-400" },
            { name: "Body Fat", href: "/health/body-fat-calculator", icon: Activity, color: "text-pink-400" },
            { name: "Breathing", href: "/health/breathing-exercise", icon: Wind, color: "text-cyan-400" },
            { name: "Water Intake", href: "/health/water-intake-calculator", icon: Droplets, color: "text-blue-500" },
            { name: "Calories", href: "/health/calories-calculator", icon: Flame, color: "text-orange-500" },
            { name: "Fitness Age", href: "/health/fitness-age", icon: Dumbbell, color: "text-slate-400" },
            { name: "Health Score", href: "/health/health-score", icon: HeartPulse, color: "text-red-500" },
            { name: "Burnout Risk", href: "/health/burnout-risk", icon: Brain, color: "text-purple-400" },
            { name: "Smoking Cost", href: "/health/smoking-cost", icon: Coins, color: "text-yellow-500" },
            { name: "Life Expectancy", href: "/health/life-expectancy", icon: Hourglass, color: "text-emerald-400" },
            // Education Tools
            { name: "GPA Calculator", href: "/education/gpa-calculator", icon: Calculator, color: "text-indigo-400" },
            { name: "Grade Calculator", href: "/education/grade-calculator", icon: Calculator, color: "text-blue-400" },
        ]
    },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex flex-col fixed top-0 left-0 right-0 z-50">
            <nav className={cn(
                "w-full transition-all duration-500 border-b",
                scrolled
                    ? "bg-zinc-950/80 backdrop-blur-xl border-white/10 py-2"
                    : "bg-transparent border-transparent py-4"
            )}>
                <div className="container mx-auto px-4 flex items-center justify-between max-w-[1440px]">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-600 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="relative w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                                <LayoutGrid size={20} className="text-blue-500 group-hover:scale-110 transition-transform" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tighter text-white leading-none">TOOLNEST</span>
                            <span className="text-[8px] font-bold tracking-[0.3em] text-zinc-500 uppercase">Pro Suite</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                            const hasSubItems = item.subItems && item.subItems.length > 0;

                            return (
                                <div key={item.href} className="relative group">
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "px-3 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 relative",
                                            isActive
                                                ? "text-white"
                                                : "text-zinc-400 hover:text-white"
                                        )}
                                    >
                                        <item.icon size={16} className={cn("transition-colors", isActive ? "text-white" : item.color)} />
                                        {item.name}
                                        {hasSubItems && <ChevronDown size={14} className="opacity-50 group-hover:rotate-180 transition-transform" />}
                                        {isActive && (
                                            <m.div
                                                layoutId="nav-active"
                                                className="absolute inset-0 bg-white/5 rounded-full -z-10 border border-white/10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>

                                    {/* Dropdown */}
                                    <AnimatePresence>
                                        {hasSubItems && (
                                            <div className="absolute top-full right-0 pt-4 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                <div className="bg-zinc-950/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-1.5">
                                                    <div className="grid grid-cols-1 gap-0.5 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                                        {item.subItems?.map((subItem) => (
                                                            <Link
                                                                key={subItem.href}
                                                                href={subItem.href}
                                                                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-zinc-200 hover:text-white hover:bg-white/5 transition-all group/sub"
                                                            >
                                                                <div className={cn(
                                                                    "w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center transition-colors",
                                                                    "group-hover/sub:bg-white/10",
                                                                    subItem.color
                                                                )}>
                                                                    <subItem.icon size={16} />
                                                                </div>
                                                                {subItem.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search Button */}
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
                            className="w-10 h-10 rounded-full bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white hover:border-blue-500/50 hover:bg-zinc-900/80 hover:shadow-[0_0_15px_-5px_rgba(59,130,246,0.5)] transition-all duration-300 flex items-center justify-center group/search relative"
                            title="Search Tools (Ctrl+K)"
                        >
                            <Search size={20} className="group-hover/search:scale-110 group-hover/search:text-blue-400 transition-all duration-300" />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-zinc-800 border border-white/10 text-[8px] font-bold flex items-center justify-center text-zinc-500 group-hover/search:text-blue-400 group-hover/search:border-blue-500/30 group-hover/search:bg-blue-500/10 transition-all duration-300">
                                K
                            </div>
                        </button>

                        {/* Mobile Search Icon */}
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
                            className="sm:hidden w-10 h-10 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-blue-500/50 hover:shadow-[0_0_15px_-5px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center group/search"
                        >
                            <Search size={20} className="group-hover/search:scale-110 transition-transform" />
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isOpen && (
                        <m.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden border-t border-white/5 bg-zinc-950 overflow-hidden"
                        >
                            <div className="container mx-auto px-4 py-6 space-y-2 max-h-[70vh] overflow-y-auto">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                                    const hasSubItems = item.subItems && item.subItems.length > 0;
                                    const isExpanded = mobileExpanded === item.name;

                                    return (
                                        <div key={item.href} className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className={cn(
                                                        "flex-1 px-4 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all flex items-center gap-3",
                                                        isActive
                                                            ? "bg-white/5 text-white border border-white/10"
                                                            : "text-zinc-400 hover:text-white"
                                                    )}
                                                >
                                                    <item.icon size={18} className={item.color} />
                                                    {item.name}
                                                </Link>
                                                {hasSubItems && (
                                                    <button
                                                        onClick={() => setMobileExpanded(isExpanded ? null : item.name)}
                                                        className="p-3 text-zinc-400 hover:text-white"
                                                    >
                                                        <ChevronDown size={18} className={cn("transition-transform duration-300", isExpanded && "rotate-180")} />
                                                    </button>
                                                )}
                                            </div>

                                            {hasSubItems && isExpanded && (
                                                <div className="pl-6 space-y-1 mt-1 border-l border-white/5 ml-6">
                                                    {item.subItems?.map((subItem) => (
                                                        <Link
                                                            key={subItem.href}
                                                            href={subItem.href}
                                                            onClick={() => setIsOpen(false)}
                                                            className="flex items-center gap-3 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-200 hover:text-white transition-colors"
                                                        >
                                                            <subItem.icon size={16} className={subItem.color} />
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>
            </nav>
        </div>
    );
}
