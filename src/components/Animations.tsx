"use client";

import { m, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContainerProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 12 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
    }
};

export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.02
        }
    }
};

export const float: Variants = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const glow: Variants = {
    animate: {
        boxShadow: [
            "0 0 20px rgba(59, 130, 246, 0.1)",
            "0 0 40px rgba(139, 92, 246, 0.2)",
            "0 0 20px rgba(59, 130, 246, 0.1)"
        ],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export function AnimatedContainer({ children, className, delay = 0 }: AnimatedContainerProps) {
    return (
        <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </m.div>
    );
}

export function PageTransition({ children }: { children: ReactNode }) {
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </m.div>
    );
}
