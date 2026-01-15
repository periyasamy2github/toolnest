"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search as SearchIcon, X, Command, ArrowRight, LayoutGrid } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { tools, Tool } from "@/data/tools";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const filteredTools = query.trim() === ""
        ? []
        : tools.filter(tool =>
            tool.title.toLowerCase().includes(query.toLowerCase()) ||
            tool.description.toLowerCase().includes(query.toLowerCase()) ||
            tool.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        ).slice(0, 8);

    const closeSearch = useCallback(() => {
        setIsOpen(false);
        setQuery("");
        setSelectedIndex(0);
    }, []);

    useEffect(() => {
        const handleOpenSearch = () => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 100);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                handleOpenSearch();
            }
            if (e.key === "Escape") {
                closeSearch();
            }
        };

        window.addEventListener("open-search", handleOpenSearch);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("open-search", handleOpenSearch);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeSearch]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredTools.length));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length));
        } else if (e.key === "Enter" && filteredTools[selectedIndex]) {
            e.preventDefault();
            router.push(filteredTools[selectedIndex].href);
            closeSearch();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSearch}
                        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
                    />

                    <m.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5">
                            <SearchIcon size={20} className="text-zinc-500" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder="Search for tools (e.g. 'pdf', 'json', 'salary')..."
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-500 text-lg"
                            />
                            <div className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 border border-white/5 text-[10px] font-mono text-zinc-400">
                                ESC
                            </div>
                            <button onClick={closeSearch} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                                <X size={20} className="text-zinc-500" />
                            </button>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {query.trim() === "" ? (
                                <div className="p-8 text-center space-y-4">
                                    <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto">
                                        <Command size={32} className="text-zinc-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white font-semibold">Search ToolNest</p>
                                        <p className="text-zinc-500 text-sm">Find any tool instantly by name, description, or tags.</p>
                                    </div>
                                </div>
                            ) : filteredTools.length > 0 ? (
                                <div className="p-2 space-y-1">
                                    {filteredTools.map((tool, index) => (
                                        <Link
                                            key={tool.href}
                                            href={tool.href}
                                            onClick={closeSearch}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            className={cn(
                                                "flex items-center gap-4 p-3 rounded-xl transition-all group",
                                                selectedIndex === index ? "bg-white/10" : "hover:bg-white/5"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                                tool.bg
                                            )}>
                                                <tool.icon size={24} className={tool.color} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-white font-bold truncate">{tool.title}</p>
                                                    <span className="text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/5 text-zinc-500 border border-white/5">
                                                        {tool.category}
                                                    </span>
                                                </div>
                                                <p className="text-zinc-400 text-sm truncate">{tool.description}</p>
                                            </div>
                                            <ArrowRight size={18} className={cn(
                                                "text-zinc-600 transition-all",
                                                selectedIndex === index ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                                            )} />
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center space-y-4">
                                    <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto">
                                        <SearchIcon size={32} className="text-zinc-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white font-semibold">No tools found</p>
                                        <p className="text-zinc-500 text-sm">We couldn't find any tools matching "{query}".</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="px-4 py-3 bg-zinc-950/50 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1.5">
                                    <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/5 text-zinc-400">↑↓</kbd>
                                    Navigate
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/5 text-zinc-400">Enter</kbd>
                                    Select
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <LayoutGrid size={12} />
                                ToolNest Search
                            </div>
                        </div>
                    </m.div>
                </div>
            )}
        </AnimatePresence>
    );
}
