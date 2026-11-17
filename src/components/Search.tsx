"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { searchTools } from "@/lib/searchTools";
import { categories } from "@/data/categories";

const categoryName = (key: string) => categories.find((c) => c.key === key)?.name ?? key;

export function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const results = query.trim() === "" ? [] : searchTools(query).slice(0, 8);

    const closeSearch = useCallback(() => {
        setIsOpen(false);
        setQuery("");
        setSelectedIndex(0);
    }, []);

    useEffect(() => {
        const open = () => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 50);
        };
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                open();
            }
            if (e.key === "Escape") closeSearch();
        };
        window.addEventListener("open-search", open);
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("open-search", open);
            window.removeEventListener("keydown", onKey);
        };
    }, [closeSearch]);

    const onInputKey = (e: React.KeyboardEvent) => {
        const count = Math.max(1, results.length);
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((i) => (i + 1) % count);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((i) => (i - 1 + count) % count);
        } else if (e.key === "Enter" && results[selectedIndex]) {
            e.preventDefault();
            router.push(results[selectedIndex].href);
            closeSearch();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-3" role="dialog" aria-modal="true" aria-label="Search tools">
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSearch}
                        className="absolute inset-0 bg-background/85"
                    />

                    <m.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-2xl bg-surface rounded-[var(--radius)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
                    >
                        <div className="flex items-center gap-3 px-5 h-16 bg-surface-2">
                            <SearchIcon size={20} className="text-muted" aria-hidden />
                            <input
                                ref={inputRef}
                                type="search"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                                onKeyDown={onInputKey}
                                aria-label="Search tools"
                                placeholder="Try pdf, json, compress, salary"
                                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted text-lg"
                            />
                            <button onClick={closeSearch} aria-label="Close search" className="p-2 rounded-[var(--radius)] hover:bg-surface text-muted hover:text-foreground">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {query.trim() === "" ? (
                                <div className="p-5">
                                    <p className="text-sm text-muted mb-3">Browse a category</p>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {categories.map((c) => (
                                            <Link key={c.href} href={c.href} onClick={closeSearch} className="px-4 py-3 rounded-[var(--radius)] bg-surface-2 hover:text-accent transition-colors">
                                                {c.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : results.length > 0 ? (
                                <ul className="p-2 space-y-1">
                                    {results.map((tool, index) => (
                                        <li key={tool.href}>
                                            <Link
                                                href={tool.href}
                                                onClick={closeSearch}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                                className={cn(
                                                    "flex items-center gap-4 p-3 rounded-[var(--radius)] transition-colors",
                                                    selectedIndex === index ? "bg-surface-2" : "hover:bg-surface-2"
                                                )}
                                            >
                                                <tool.icon size={22} className="text-accent flex-none" aria-hidden />
                                                <span className="flex-1 min-w-0">
                                                    <span className="block font-medium truncate">{tool.title}</span>
                                                    <span className="block text-sm text-muted truncate">{categoryName(tool.category)} · {tool.description}</span>
                                                </span>
                                                <ArrowRight size={18} aria-hidden className={cn("text-accent transition-opacity", selectedIndex === index ? "opacity-100" : "opacity-0")} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="p-6 text-muted">No tool matches “{query}”. Try a shorter word, such as pdf or image.</p>
                            )}
                        </div>
                    </m.div>
                </div>
            )}
        </AnimatePresence>
    );
}
