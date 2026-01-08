"use client";

import Link from "next/link";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-8 px-4">
            <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
                <AlertTriangle size={120} className="text-red-500 relative z-10" />
            </div>

            <div className="space-y-4 relative z-10">
                <h1 className="text-6xl font-bold text-zinc-100">404</h1>
                <h2 className="text-2xl font-semibold text-zinc-300">Page Not Found</h2>
                <p className="text-zinc-400 max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
            </div>

            <Link
                href="/"
                className="relative z-10 flex items-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-900 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
            >
                <Home size={20} />
                Back to Home
            </Link>
        </div>
    );
}
