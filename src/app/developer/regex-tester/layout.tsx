import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Regex Tester - Test and Debug Regular Expressions Online | ToolNest",
    description: "Test and debug your regular expressions (Regex) online. Supports multiple flavors and provides real-time matching and explanation. 100% private.",
    keywords: ["regex tester", "regular expression", "test regex", "regex debugger", "developer tools", "ToolNest"],
    openGraph: {
        title: "Online Regex Tester | ToolNest",
        description: "Test and debug your regular expressions with ease.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
