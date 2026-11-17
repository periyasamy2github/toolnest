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
            className={cn("p-3 rounded-[var(--radius)] bg-surface hover:bg-surface-2 transition-colors active:scale-95", className)}
            aria-label="Go back"
        >
            <ArrowLeft className="text-foreground" />
        </button>
    );
}
