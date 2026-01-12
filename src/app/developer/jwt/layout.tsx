import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JWT Debugger - Decode, Verify & Generate JSON Web Tokens | ToolNest",
    description: "Online JWT debugger to decode, verify, and generate JSON Web Tokens (JWT). Support for HS256 and other algorithms. Secure client-side processing.",
    keywords: ["jwt debugger", "decode jwt", "verify jwt", "generate jwt", "json web token", "ToolNest", "developer tools"],
    openGraph: {
        title: "JWT Debugger | ToolNest",
        description: "Decode and verify JSON Web Tokens instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
