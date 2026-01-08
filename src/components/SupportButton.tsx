import React from 'react';

export function SupportButton() {
    return (
        <div className="fixed bottom-6 z-50 transition-all duration-300 left-6 md:left-auto md:right-6">
            <a
                href="https://chai4.me/mr_professor"
                target="_blank"
                rel="noopener noreferrer"
                title="Support mr_professor on Chai4Me"
                className="inline-flex flex-col items-center justify-center bg-white px-8 py-2 rounded-2xl no-underline border border-zinc-200 shadow-lg transition-all hover:scale-105 active:scale-95 h-[48px]"
            >
                <img
                    src="https://www.chai4.me/icons/wordmark.png"
                    alt="Chai4Me"
                    className="h-8 object-contain"
                />
            </a>
        </div>
    );
}
