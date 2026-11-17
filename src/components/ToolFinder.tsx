"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { searchTools } from "@/lib/searchTools";

const featured = [
    "/image/compressor", "/pdf/merge", "/developer/json-formatter",
    "/image/remove-bg", "/finance/loan-emi", "/utils/qr-code",
    "/video/compressor", "/text/word-counter", "/health/bmi-calculator",
];
const featuredTools = featured.map((href) => tools.find((t) => t.href === href)!).filter(Boolean);
const categoryName = (key: string) => categories.find((c) => c.key === key)?.name ?? key;

// the hero's live search: the board of tools filters as you type
export const ToolFinder = () => {
    const [query, setQuery] = useState("");
    const matches = query.trim() ? searchTools(query) : featuredTools;
    const shown = matches.slice(0, 9);

    return (
        <div data-ui className="flex flex-col gap-2 h-full">
            <label className="flex items-center gap-3 h-16 px-5 rounded-[var(--radius)] bg-bone text-bark focus-within:outline-2 focus-within:outline-accent">
                <Search size={22} aria-hidden />
                <span className="sr-only">Find a tool</span>
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Find a tool: pdf, json, emi"
                    className="flex-1 min-w-0 bg-transparent outline-none text-lg placeholder:text-clay"
                />
                <span className="text-base text-clay tabular-nums whitespace-nowrap" aria-live="polite">
                    {query.trim() ? `${matches.length} found` : `${tools.length} tools`}
                </span>
            </label>

            {shown.length === 0 ? (
                <div className="flex-1 rounded-[var(--radius)] bg-surface-2 p-6 text-lg">
                    Nothing matches “{query}”. Try a shorter word, such as image or pdf.
                </div>
            ) : (
                <ul className="flex-1 grid grid-cols-2 sm:grid-cols-3 auto-rows-fr gap-2">
                    {shown.map((t) => (
                        <li key={t.href}>
                            <Link
                                href={t.href}
                                className="group h-full min-h-[96px] flex flex-col justify-between gap-3 p-4 rounded-[var(--radius)] bg-surface-2 hover:bg-bark transition-colors"
                            >
                                <t.icon size={22} className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
                                <span>
                                    <span className="block text-base font-medium leading-tight">{t.title}</span>
                                    <span className="block text-sm text-muted">{categoryName(t.category)}</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
