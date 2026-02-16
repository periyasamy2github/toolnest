"use client";

import { useState } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    MessageSquare,
    Search,
    Copy,
    CheckCircle2,
    RefreshCw,
    Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function CaptionGeneratorPage() {
    const [context, setContext] = useState("");
    const [tone, setTone] = useState("casual");
    const [captions, setCaptions] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const tones = [
        { id: "casual", label: "Casual", icon: "😎" },
        { id: "inspirational", label: "Inspiring", icon: "✨" },
        { id: "funny", label: "Funny", icon: "😂" },
        { id: "promotional", label: "Promo", icon: "📢" }
    ];

    const generateCaptions = () => {
        if (!context.trim()) return;

        setIsGenerating(true);
        setCaptions([]);

        // Simulate API call with mock data
        setTimeout(() => {
            let mockCaptions: string[] = [];

            if (tone === "casual") {
                mockCaptions = [
                    `Just another day doing ${context}. ✌️`,
                    `Vibing with ${context}. 🌊`,
                    `Current mood: ${context}.`,
                    `Can't get enough of ${context}. ❤️`
                ];
            } else if (tone === "inspirational") {
                mockCaptions = [
                    `Never stop exploring ${context}. The journey is the reward. 🌟`,
                    `Believe in the power of ${context}. ✨`,
                    `Success starts with ${context}. Keep going. 💪`,
                    `Transform your life with ${context}.`
                ];
            } else if (tone === "funny") {
                mockCaptions = [
                    `If ${context} was a sport, I'd be an Olympian. 🥇`,
                    `Me + ${context} = ❤️`,
                    `Trying to be cool with ${context}. How am I doing? 🤪`,
                    `Send help. I'm addicted to ${context}.`
                ];
            } else {
                mockCaptions = [
                    `Check out our latest ${context}! Link in bio. 🔗`,
                    `Don't miss out on ${context}. Limited time only! ⏳`,
                    `Upgrade your life with ${context}. Shop now. 🛍️`,
                    `The best ${context} solution is here.`
                ];
            }

            setCaptions(mockCaptions);
            setIsGenerating(false);
        }, 1500);
    };

    const copyCaption = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="min-h-screen pb-24 space-y-12">
            {/* Header */}
            <m.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div className="flex items-center gap-6">
                    <BackButton />
                    <div>
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Caption Generator</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Write engaging captions instantly.</m.p>
                    </div>
                </div>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8 lg:col-start-3 space-y-6"
                >
                    <div className="glass-card p-8 space-y-8">
                        {/* Input Section */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-zinc-400">What's your post about?</label>
                                <textarea
                                    placeholder="e.g., A photo of my morning coffee with a view"
                                    value={context}
                                    onChange={(e) => setContext(e.target.value)}
                                    className="w-full h-32 px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-zinc-400">Choose a Tone</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {tones.map((t) => (
                                        <button
                                            key={t.id}
                                            onClick={() => setTone(t.id)}
                                            className={cn(
                                                "p-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center gap-2",
                                                tone === t.id
                                                    ? "bg-green-500 text-white border-green-500"
                                                    : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"
                                            )}
                                        >
                                            <span className="text-xl">{t.icon}</span>
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={generateCaptions}
                                disabled={isGenerating || !context.trim()}
                                className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-lg shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGenerating ? (
                                    <>
                                        <RefreshCw size={20} className="animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <MessageSquare size={20} />
                                        Generate Captions
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Results Section */}
                        {captions.length > 0 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 pt-6 border-t border-white/10">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <ImageIcon size={20} className="text-green-400" />
                                    Caption Ideas
                                </h3>

                                <div className="grid gap-4">
                                    {captions.map((caption, i) => (
                                        <div
                                            key={i}
                                            className="p-6 rounded-2xl bg-zinc-950/30 border border-white/5 hover:border-green-500/30 transition-colors group relative"
                                        >
                                            <p className="text-zinc-300 leading-relaxed">{caption}</p>
                                            <button
                                                onClick={() => copyCaption(caption, i)}
                                                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                                title="Copy Caption"
                                            >
                                                {copiedIndex === i ? <CheckCircle2 size={16} className="text-green-400" /> : <Copy size={16} />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </m.div>
            </div>
        </div>
    );
}
