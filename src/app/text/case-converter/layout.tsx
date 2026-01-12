import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Case Converter - Change Text Case Instantly | ToolNest",
    description: "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, and more. Fast, free, and easy-to-use online text case converter.",
    keywords: ["case converter", "text case", "uppercase to lowercase", "title case converter", "sentence case", "ToolNest", "text tools"],
    openGraph: {
        title: "Online Case Converter | ToolNest",
        description: "Change your text case instantly with our free online tool.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
