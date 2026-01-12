import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CSS Tools - Minify, Beautify & Optimize CSS | ToolNest",
    description: "A collection of powerful CSS tools to minify, beautify, and optimize your stylesheets. Improve performance and maintainability of your web projects.",
    keywords: ["css tools", "minify css", "beautify css", "css optimizer", "developer tools", "ToolNest"],
    openGraph: {
        title: "CSS Tools | ToolNest",
        description: "Optimize and format your CSS with our professional tools.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
