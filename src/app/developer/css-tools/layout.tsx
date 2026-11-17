import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/css-tools" },
    title: "CSS Tools - Minify, Beautify, and Optimize CSS Online",
    description: "A collection of powerful CSS tools to minify, beautify, and optimize your stylesheets. Improve performance and maintainability of your web projects. 100% private.",
    keywords: ["css tools", "minify css", "beautify css", "css optimizer", "developer tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "CSS Tools",
        description: "Optimize and format your CSS with our professional tools.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
