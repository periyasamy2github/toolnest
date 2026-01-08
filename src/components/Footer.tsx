import Link from "next/link";
import { Send } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-zinc-950/50 backdrop-blur-xl mt-auto">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            ToolNest
                        </h2>
                        <p className="text-zinc-500 text-sm">
                            Powerful, private, and browser-based tools for everyone.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3">
                        <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            <span>Created by</span>
                            <span className="font-semibold text-zinc-100">Professor</span>
                        </div>
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

                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                    <p className="text-zinc-600 text-xs">
                        © {new Date().getFullYear()} ToolNest. All rights reserved. Built for speed and privacy.
                    </p>
                </div>
            </div>
        </footer>
    );
}
