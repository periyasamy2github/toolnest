import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Screen Recorder - Record Screen and Camera Online Free | ToolNest",
    description: "Record your screen, camera, and audio directly in your browser. No installation required. High-quality video recording for free. 100% private.",
    keywords: ["screen recorder", "screen capture", "video recorder", "webcam recorder", "browser recorder"]
};

export default function ScreenRecorderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
