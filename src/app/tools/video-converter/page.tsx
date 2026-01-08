"use client";

import { ArrowLeft, Construction } from "lucide-react";
import Link from "next/link";

export default function VideoConverterPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/tools/media" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Video Converter</h1>
                    <p className="text-zinc-400">Convert videos locally.</p>
                </div>
            </div>

            <div className="glass-card p-12 flex flex-col items-center justify-center space-y-4 text-center">
                <Construction className="text-yellow-500" size={48} />
                <h2 className="text-xl font-semibold text-zinc-200">Under Maintenance</h2>
                <p className="text-zinc-400 max-w-md">
                    This tool is currently being updated to ensure the best performance and compatibility.
                    Please check back later.
                </p>
                <Link
                    href="/tools/media"
                    className="mt-4 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                >
                    Back to Media Tools
                </Link>
            </div>
        </div>
    );
}
