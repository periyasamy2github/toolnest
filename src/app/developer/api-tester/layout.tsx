import { Metadata } from "next";

export const metadata: Metadata = {
    title: "API Tester - Test REST APIs Online | ToolNest",
    description: "Test REST APIs directly in your browser. Send GET, POST, PUT, DELETE requests with custom headers and body. Free, private, no signup required.",
    keywords: ["api tester", "rest api tester", "postman alternative", "test api online", "http client", "api testing tool", "ToolNest"],
    openGraph: {
        title: "API Tester | ToolNest",
        description: "Test REST APIs in your browser with custom headers and body. 100% private.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
