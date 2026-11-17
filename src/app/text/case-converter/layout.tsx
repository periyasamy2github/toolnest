import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/text/case-converter" },
    title: "Online Case Converter - Change Text Case Instantly",
    description: "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, and more. Fast, free, and easy-to-use online text case converter.",
    keywords: ["case converter", "text case", "uppercase to lowercase", "title case converter", "sentence case", "WebToolNest", "text tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Case Converter",
        description: "Change your text case instantly with our free online tool.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
