"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContainerProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
};

export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function PageTransition({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}
