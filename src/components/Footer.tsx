"use client";

import Link from "next/link";
import { Send, Globe } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Footer() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <footer className={cn(
            "mt-auto transition-all duration-300",
            isHome ? "bg-transparent border-none" : "glass border-t border-white/5"
        )}>
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

                    <div className="flex flex-col items-center md:items-end gap-4">
                        <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                            <span>Created by</span>
                            <span className="text-zinc-300">Professor</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
                            <Link
                                href="https://uply-monitor.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-blue-500/50 transition-all duration-500"
                            >
                                <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-md bg-blue-600 text-[8px] font-black uppercase tracking-tighter text-white shadow-lg shadow-blue-600/20">
                                    Future
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <Globe size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-black text-white leading-none">UPLY MONITOR</span>
                                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Next-Gen Uptime</span>
                                </div>
                            </Link>
                            <Link
                                href="https://t.me/hey_mrprofessor"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-500"
                            >
                                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-widest">Contact</span>
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
