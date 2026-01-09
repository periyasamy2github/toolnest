"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContainerProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

export function AnimatedContainer({ children, className, delay = 0 }: AnimatedContainerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function PageTransition({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}
