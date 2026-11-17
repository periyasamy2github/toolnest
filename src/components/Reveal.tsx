"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// adds .in to every .reveal element as it scrolls into view; without JS nothing is hidden
export const RevealObserver = () => {
    const pathname = usePathname();

    useEffect(() => {
        const items = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (!e.isIntersecting) continue;
                    e.target.classList.add("in");
                    io.unobserve(e.target);
                }
            },
            { rootMargin: "0px 0px -8% 0px" }
        );
        items.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [pathname]);

    return null;
};
