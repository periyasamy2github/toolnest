import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Video Trimmer - Cut and Trim Video Clips Online | ToolNest",
    description: "Trim and cut video clips online with precision. Select start and end points to extract segments instantly. No watermark, no upload required, 100% private.",
    keywords: ["video trimmer", "cut video", "video cutter", "trim mp4", "online video editor", "ToolNest video tools"],
};

export default function VideoTrimmerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
