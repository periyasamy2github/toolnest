"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";

const openSearch = () => window.dispatchEvent(new CustomEvent("open-search"));

export const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // close the phone menu after navigating
    useEffect(() => setIsOpen(false), [pathname]);

    return (
        <header className="sticky top-0 z-50 bg-background px-4 lg:px-3 pt-2">
            <nav aria-label="Main" className="tile flex items-center justify-between gap-4 h-14 pl-5 pr-2">
                <Link href="/" translate="no" className="text-xl font-semibold tracking-[-0.03em] text-foreground hover:text-accent transition-colors">
                    WebToolNest
                </Link>

                <ul className="hidden lg:flex items-center gap-1">
                    {categories.map((c) => {
                        const active = pathname.startsWith(c.href);
                        return (
                            <li key={c.href}>
                                <Link
                                    href={c.href}
                                    aria-current={active ? "page" : undefined}
                                    className={cn(
                                        "block px-3 py-2 rounded-[var(--radius)] text-base transition-colors",
                                        active ? "bg-surface-2 text-accent" : "text-foreground hover:bg-surface-2"
                                    )}
                                >
                                    {c.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="flex items-center gap-2">
                    <button
                        onClick={openSearch}
                        className="flex items-center gap-2 h-10 px-4 rounded-[var(--radius)] bg-accent text-accent-ink font-medium transition-transform hover:-translate-y-px active:translate-y-0 active:scale-[0.98]"
                    >
                        <Search size={18} aria-hidden />
                        <span>Search<span className="hidden sm:inline"> tools</span></span>
                        <kbd className="hidden md:inline text-sm font-sans opacity-70">{"Ctrl K"}</kbd>
                    </button>
                    <button
                        onClick={() => setIsOpen((v) => !v)}
                        aria-expanded={isOpen}
                        aria-controls="phone-menu"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        className="lg:hidden w-10 h-10 grid place-items-center rounded-[var(--radius)] bg-surface-2 text-foreground"
                    >
                        {isOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
                    </button>
                </div>
            </nav>

            {isOpen && (
                <ul id="phone-menu" className="lg:hidden grid grid-cols-2 gap-2 pt-2 pb-2">
                    {categories.map((c) => (
                        <li key={c.href}>
                            <Link href={c.href} className="tile block px-5 py-4 text-lg font-medium hover:bg-surface-2">
                                {c.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
};
