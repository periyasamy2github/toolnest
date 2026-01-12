import Link from "next/link";
import { Send, Globe } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/5 glass mt-auto">
            <div className="container mx-auto px-4 py-12 max-w-[1440px]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <h2 className="text-3xl font-black text-gradient">
                            ToolNest
                        </h2>
                        <p className="text-zinc-400 text-base font-medium">
                            Powerful, private, and browser-based tools for everyone.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3">
                        <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            <span>Created by</span>
                            <span className="font-semibold text-zinc-100">Professor</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center md:justify-end gap-4">
                            <Link
                                href="https://uply-monitor.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white transition-all duration-300"
                            >
                                <Globe size={16} className="group-hover:rotate-12 transition-transform" />
                                <span className="font-medium">Uply Monitor</span>
                            </Link>
                            <Link
                                href="https://t.me/hey_mrprofessor"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
                            >
                                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                <span className="font-medium">@hey_mrprofessor</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                    <p className="text-zinc-600 text-xs">
                        © {new Date().getFullYear()} ToolNest. All rights reserved. Built for speed and privacy.
                    </p>
                </div>
            </div>
        </footer>
    );
}
