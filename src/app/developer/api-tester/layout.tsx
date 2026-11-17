import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/api-tester" },
    title: "API Tester - Test REST APIs Online with Custom Headers",
    description: "Test REST APIs directly in your browser. Send GET, POST, PUT, DELETE requests with custom headers and body. 100% private, secure, and no signup required.",
    keywords: ["api tester", "rest api tester", "postman alternative", "test api online", "http client", "api testing tool", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "API Tester",
        description: "Test REST APIs in your browser with custom headers and body. 100% private.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
