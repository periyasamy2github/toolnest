"use client";

import Link from "next/link";
import { categories, toolsIn } from "@/data/categories";
import { tools } from "@/data/tools";

const openSearch = () => window.dispatchEvent(new CustomEvent("open-search"));

export const Footer = () => (
    <footer className="px-4 lg:px-3 pb-3 mt-40">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-2">
            <div className="tile col-span-2 md:col-span-5 p-6 flex flex-col justify-between gap-10 min-h-[220px]">
                <p className="text-2xl leading-snug font-medium tracking-[-0.01em] max-w-[22ch]">
                    {tools.length} tools that do their work on your device, free.
                </p>
                <p className="text-sm text-muted" suppressHydrationWarning>© {new Date().getFullYear()} WebToolNest. No accounts, no uploads, no tracking.</p>
            </div>

            <nav aria-label="Categories" className="tile col-span-1 md:col-span-3 p-6">
                <h2 className="text-sm text-muted mb-3">Categories</h2>
                <ul className="space-y-1.5">
                    {categories.map((c) => (
                        <li key={c.href}>
                            <Link href={c.href} className="text-base hover:text-accent transition-colors">
                                {c.name} <span className="text-muted">{toolsIn(c.key).length}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="tile col-span-1 md:col-span-4 p-6 flex flex-col justify-between gap-6">
                <h2 className="text-sm text-muted">Made by</h2>
                <p className="text-2xl font-medium tracking-[-0.01em]">Periyasamy S</p>
            </div>

            <div className="col-span-2 md:col-span-8 rounded-[var(--radius)] bg-surface text-accent overflow-hidden flex items-center justify-center min-h-[160px] md:min-h-[320px]">
                <p aria-hidden translate="no" className="font-semibold tracking-[-0.045em] leading-none text-[16vw] md:text-[9.4vw] whitespace-nowrap">
                    WebToolNest
                </p>
            </div>

            <button
                onClick={openSearch}
                className="group col-span-2 md:col-span-4 rounded-[var(--radius)] bg-accent text-accent-ink p-6 min-h-[160px] md:min-h-[320px] flex flex-col justify-between text-left transition-transform active:scale-[0.99]"
            >
                <span className="text-[28px] leading-tight font-semibold tracking-[-0.02em]">Find the tool you need</span>
                <svg aria-hidden width="56" height="56" viewBox="0 0 56 56" className="self-end transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <path d="M12 44 L44 12 M20 12 H44 V36" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
            </button>
        </div>
    </footer>
);
