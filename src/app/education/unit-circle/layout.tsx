import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Interactive Unit Circle - Learn Trigonometry Online | ToolNest",
    description: "Explore the unit circle and learn trigonometric functions like sine, cosine, and tangent. Interactive and easy-to-use learning tool. 100% private.",
    keywords: ["unit circle", "trigonometry tool", "sine cosine tangent", "math learning", "ToolNest"],
};

export default function UnitCircleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
