"use client";

import { useState } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    UserCircle2,
    Search,
    Copy,
    CheckCircle2,
    RefreshCw,
    Smile
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function SocialBioGeneratorPage() {
    const [about, setAbout] = useState("");
    const [vibe, setVibe] = useState("professional");
    const [bios, setBios] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const vibes = [
        { id: "professional", label: "Professional", icon: "💼" },
        { id: "funny", label: "Funny", icon: "😂" },
        { id: "creative", label: "Creative", icon: "🎨" },
        { id: "minimalist", label: "Minimalist", icon: "✨" }
    ];

    const generateBios = () => {
        if (!about.trim()) return;

        setIsGenerating(true);
        setBios([]);

        // Simulate API call with mock data
        setTimeout(() => {
            let mockBios: string[] = [];

            if (vibe === "professional") {
                mockBios = [
                    `Passionate about ${about}. Building the future of tech. 🚀`,
                    `Helping businesses grow with ${about}. Let's connect! 🤝`,
                    `Expert in ${about}. Sharing insights and tips daily. 📈`,
                    `${about} Enthusiast | Speaker | Mentor`
                ];
            } else if (vibe === "funny") {
                mockBios = [
                    `I do ${about} so you don't have to. 🤷‍♂️`,
                    `Professional ${about} ninja. Coffee addict. ☕`,
                    `Just a human who loves ${about}. And pizza. 🍕`,
                    `Making ${about} look easy since [Year].`
                ];
            } else if (vibe === "creative") {
                mockBios = [
                    `Crafting magic with ${about}. ✨`,
                    `Dreaming in ${about}. Creating reality. 🌟`,
                    `Art + ${about} = My Life. 🎨`,
                    `Exploring the universe of ${about}. 🚀`
                ];
            } else {
                mockBios = [
                    `${about}.`,
                    `Just ${about}.`,
                    `Life • ${about} • Growth`,
                    `${about} // Creator`
                ];
            }

            setBios(mockBios);
            setIsGenerating(false);
        }, 1500);
    };

    const copyBio = (text: string, index: number) => {
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
                    <Link href="/social" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                        <ArrowLeft className="text-zinc-100" />
                    </Link>
                    <div>
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Social Bio Generator</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Craft the perfect first impression.</m.p>
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
                                <label className="text-sm font-bold text-zinc-400">What do you do?</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Web Development, Digital Marketing"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    className="w-full px-4 py-3 bg-zinc-950/50 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-zinc-400">Choose a Vibe</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {vibes.map((v) => (
                                        <button
                                            key={v.id}
                                            onClick={() => setVibe(v.id)}
                                            className={cn(
                                                "p-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center gap-2",
                                                vibe === v.id
                                                    ? "bg-purple-500 text-white border-purple-500"
                                                    : "bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10"
                                            )}
                                        >
                                            <span className="text-xl">{v.icon}</span>
                                            {v.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={generateBios}
                                disabled={isGenerating || !about.trim()}
                                className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGenerating ? (
                                    <>
                                        <RefreshCw size={20} className="animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Smile size={20} />
                                        Generate Bios
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Results Section */}
                        {bios.length > 0 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 pt-6 border-t border-white/10">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <UserCircle2 size={20} className="text-purple-400" />
                                    Bio Suggestions
                                </h3>

                                <div className="grid gap-4">
                                    {bios.map((bio, i) => (
                                        <div
                                            key={i}
                                            className="p-6 rounded-2xl bg-zinc-950/30 border border-white/5 hover:border-purple-500/30 transition-colors group relative"
                                        >
                                            <p className="text-zinc-300 font-medium">{bio}</p>
                                            <button
                                                onClick={() => copyBio(bio, i)}
                                                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                                title="Copy Bio"
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
