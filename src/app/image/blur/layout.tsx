import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blur Image - Blur Photos or Specific Areas Online | ToolNest",
    description: "Blur images or specific areas for privacy. Easy-to-use online tool to protect sensitive information in your photos. 100% private.",
    keywords: ["blur image", "censor photo", "privacy tool", "blur sensitive info", "ToolNest", "free image blur"],
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
