import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/regex-tester" },
    title: "Regex Tester - Test and Debug Regular Expressions Online",
    description: "Test and debug your regular expressions (Regex) online. Supports multiple flavors and provides real-time matching and explanation. 100% private.",
    keywords: ["regex tester", "regular expression", "test regex", "regex debugger", "developer tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Regex Tester",
        description: "Test and debug your regular expressions with ease.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
