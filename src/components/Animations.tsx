"use client";

import { Variants } from "framer-motion";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { categories } from "@/data/categories";

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 16 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
    }
};

export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.03
        }
    }
};

const boardRoutes = new Set(["/", ...categories.map((c) => c.href)]);

// home and category boards run edge to edge; tool pages keep a reading-width container
export function PageFrame({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isBoard = boardRoutes.has(pathname);

    // no fade on the frame: the title must paint on the first frame
    return (
        <div className={isBoard ? "px-4 lg:px-3" : "container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16"}>
            {children}
        </div>
    );
}
