'use client';

import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';

export function SupportButton() {
    return (
        <m.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="fixed bottom-6 z-50 left-6 md:left-auto md:right-6"
        >
            <Link
                href="https://chai4.me/mr_professor"
                target="_blank"
                rel="noopener noreferrer"
                title="Support mr_professor on Chai4Me"
                className="inline-flex flex-col items-center justify-center bg-white px-8 py-2 rounded-2xl no-underline border border-zinc-200 shadow-lg transition-all hover:scale-105 active:scale-95 h-[48px]"
            >
                <Image
                    src="https://www.chai4.me/icons/wordmark.png"
                    alt="Chai4Me"
                    width={120}
                    height={32}
                    className="h-8 w-auto object-contain"
                    priority
                />
            </Link>
        </m.div>
    );
}