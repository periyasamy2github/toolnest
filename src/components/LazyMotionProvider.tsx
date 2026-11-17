"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { ReactNode } from "react";

export function LazyMotionProvider({ children }: { children: ReactNode }) {
    return (
        <LazyMotion features={domAnimation}>
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </LazyMotion>
    );
}
