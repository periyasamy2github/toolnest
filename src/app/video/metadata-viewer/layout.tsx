import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Video Metadata Viewer - View Video File Information Online | ToolNest",
    description: "View detailed metadata and information about your video files online. Check resolution, codec, frame rate, and more. 100% private and secure.",
    keywords: ["video metadata", "view video info", "video file details", "check video resolution", "online video tool"],
};

export default function VideoMetadataViewerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
