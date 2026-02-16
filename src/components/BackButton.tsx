"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
    className?: string;
    href?: string; // Optional fallback if needed, but primary is navigate(-1)
}

export default function BackButton({ className }: BackButtonProps) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className={cn("p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95", className)}
            aria-label="Go back"
        >
            <ArrowLeft className="text-zinc-100" />
        </button>
    );
}
